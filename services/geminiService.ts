
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Product } from "../types";

// 全域本地快取，避免重複請求相同內容
const apiCache = new Map<string, any>();

/**
 * 具備智慧重試與降級機制的 API 調用包裝器
 */
async function callWithRetry<T>(fn: () => Promise<T>, retries = 1, delay = 1500): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
    const isQuotaError = errorMsg.includes("429") || errorMsg.includes("QUOTA_EXHAUSTED") || errorMsg.includes("quota");
    
    if (isQuotaError && retries > 0) {
      console.warn(`[Gemini] 配額限制 (429)，正在進行自動重試...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function askShoppingAssistant(prompt: string) {
  const cacheKey = `assistant_${prompt}`;
  if (apiCache.has(cacheKey)) return apiCache.get(cacheKey);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "你是一位蝦皮購物親切的小助手。如果遇到問題，請保持禮貌並給予建議。",
      }
    }));
    const text = response.text || "目前連線較為擁擠，請稍後再試！";
    apiCache.set(cacheKey, text);
    return text;
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    if (error.message?.includes("429")) return "系統配額已達上限，請稍後再試，或點擊「我的 -> 切換 API 金鑰」更換金鑰。";
    return "連線不穩定，正在嘗試恢復中。";
  }
}

export async function findNearbyLockers(lat: number, lng: number) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await callWithRetry(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "尋找附近的『蝦皮智取店』。",
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: { latitude: lat, longitude: lng }
          }
        }
      },
    }));

    return {
      text: response.text || "為您找到以下門市：",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps AI Error:", error);
    return { text: "目前地圖服務忙碌，請點擊下方清單選擇。", chunks: [] };
  }
}

export async function searchProductsWithAI(query: string): Promise<Product[]> {
  const cacheKey = `search_${query}`;
  if (apiCache.has(cacheKey)) return apiCache.get(cacheKey);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `我想在蝦皮搜尋「${query}」，請生成 8 個真實熱銷的商品資料 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              price: { type: Type.NUMBER },
              image: { type: Type.STRING },
              soldCount: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              location: { type: Type.STRING }
            },
            required: ["id", "name", "price", "image", "soldCount", "rating", "location"]
          }
        }
      }
    }));

    const products = JSON.parse(response.text || '[]');
    apiCache.set(cacheKey, products);
    return products;
  } catch (error) {
    console.error("AI Search Error:", error);
    // 降級回傳 mock 資料，不讓 UI 空白
    return [
      { id: 'm1', name: `${query} 精選好物 A`, price: 499, image: 'https://picsum.photos/seed/m1/400/400', soldCount: 100, rating: 5.0, location: '台北市' },
      { id: 'm2', name: `${query} 熱銷款 B`, price: 880, image: 'https://picsum.photos/seed/m2/400/400', soldCount: 50, rating: 4.8, location: '台中市' }
    ];
  }
}

export async function generateProductComments(productName: string) {
  const cacheKey = `comments_${productName}`;
  if (apiCache.has(cacheKey)) return apiCache.get(cacheKey);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response: GenerateContentResponse = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `為商品「${productName}」生成 5 則評價 JSON。`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              username: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              comment: { type: Type.STRING },
              date: { type: Type.STRING },
              avatar: { type: Type.STRING }
            },
            required: ["username", "rating", "comment", "date", "avatar"]
          }
        }
      }
    }));

    const results = JSON.parse(response.text || '[]');
    apiCache.set(cacheKey, results);
    return results;
  } catch (error: any) {
    console.error("AI Comments Error:", error);
    return [
      { username: "購物專家", rating: 5, comment: "這款商品真的很推薦，質感超好！", date: "2025-01-20", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=expert" },
      { username: "省錢達人", rating: 4, comment: "出貨速度很快，包裝也很完整。", date: "2025-01-21", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=saver" }
    ];
  }
}
