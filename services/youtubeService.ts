
import { YouTubeVideo } from "../types";

const YT_API_KEY = "AIzaSyBCQTKjsSxSpgPqkQW9BAwEBmCjVm8cb0g";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

/**
 * 搜尋與商品相關的開箱影片
 */
export async function searchProductReviews(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query + " 開箱")}&type=video&maxResults=5&key=${YT_API_KEY}`
    );
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    return [];
  }
}

/**
 * 獲取購物相關的熱門直播/影片
 */
export async function getTrendingShoppingVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=shopee+unboxing+live&type=video&eventType=none&maxResults=10&key=${YT_API_KEY}`
    );
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("YouTube Trending Error:", error);
    return [];
  }
}
