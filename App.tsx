
import React, { useState, useEffect } from 'react';
import { TabType, Product } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import MallView from './components/MallView';
import LiveView from './components/LiveView';
import NotificationsView from './components/NotificationsView';
import MeView from './components/MeView';
import BottomNav from './components/BottomNav';
import ProductDetailView from './components/ProductDetailView';
import CategoryDetailView from './components/CategoryDetailView';
import OrderListView from './components/OrderListView';
import NotificationDetailView from './components/NotificationDetailView';
import CheckoutView from './components/CheckoutView';
import OrderSuccessView from './components/OrderSuccessView';
import CartView from './components/CartView';
import ShopeeGamesView from './components/ShopeeGamesView';
import SearchView from './components/SearchView';
import SearchSuggestionsView from './components/SearchSuggestionsView';
import ImageSearchView from './components/ImageSearchView';
import ChatCenterView from './components/ChatCenterView';
import InfoPageView from './components/InfoPageView';
import LiveRoomView from './components/LiveRoomView';
import CouponListView from './components/CouponListView';
import NextDayDeliveryView from './components/NextDayDeliveryView';
import AddressManagementView from './components/AddressManagementView';
import ValueAddedCenterView from './components/ValueAddedCenterView';
import ShopeeMartView from './components/ShopeeMartView';
import ShopeeStationView from './components/ShopeeStationView';
import ShopeeFoodView from './components/ShopeeFoodView';
import MemberPrivilegeView from './components/MemberPrivilegeView';

type DrillDownView = 
  | { type: 'product'; data: Product }
  | { type: 'category'; data: string }
  | { type: 'orders'; data: string }
  | { type: 'notification'; data: any }
  | { type: 'checkout'; data: Product }
  | { type: 'orderSuccess'; data: any }
  | { type: 'cart'; data: null }
  | { type: 'games'; data: null }
  | { type: 'search'; data: string }
  | { type: 'searchSuggestions'; data: null }
  | { type: 'imageSearch'; data: null }
  | { type: 'chats'; data: null }
  | { type: 'info'; data: { title: string; context?: string } }
  | { type: 'liveRoom'; data: any }
  | { type: 'coupons'; data: string }
  | { type: 'nextDay'; data: null }
  | { type: 'address'; data: null }
  | { type: 'valueAdded'; data: null }
  | { type: 'mart'; data: null }
  | { type: 'station'; data: null }
  | { type: 'food'; data: null }
  | { type: 'privilege'; data: null }
  | null;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [drillDown, setDrillDown] = useState<DrillDownView>(null);
  
  const [userData, setUserData] = useState({
    name: 'tom',
    phone: '0912-345-678',
    address: '台北市信義區信義路五段7號 (台北101)',
    city: '台北市',
    district: '信義區'
  });

  const navigateToProduct = (product: Product) => setDrillDown({ type: 'product', data: product });
  const navigateToCategory = (label: string) => setDrillDown({ type: 'category', data: label });
  const navigateToSearch = (query: string) => setDrillDown({ type: 'search', data: query });
  const navigateToSearchSuggestions = () => setDrillDown({ type: 'searchSuggestions', data: null });
  const navigateToImageSearch = () => setDrillDown({ type: 'imageSearch', data: null });
  const navigateToCart = () => setDrillDown({ type: 'cart', data: null });
  const navigateToChats = () => setDrillDown({ type: 'chats', data: null });
  const navigateToOrders = (status: string) => setDrillDown({ type: 'orders', data: status });
  const navigateToNotification = (item: any) => setDrillDown({ type: 'notification', data: item });
  const navigateToCheckout = (product: Product) => setDrillDown({ type: 'checkout', data: product });
  const navigateToOrderSuccess = (orderData: any) => setDrillDown({ type: 'orderSuccess', data: orderData });
  const navigateToGames = () => setDrillDown({ type: 'games', data: null });
  const navigateToInfo = (title: string, context?: string) => setDrillDown({ type: 'info', data: { title, context } });
  const navigateToLiveRoom = (live: any) => setDrillDown({ type: 'liveRoom', data: live });
  const navigateToCoupons = (category: string = '全部') => setDrillDown({ type: 'coupons', data: category });
  const navigateToNextDay = () => setDrillDown({ type: 'nextDay', data: null });
  const navigateToAddress = () => setDrillDown({ type: 'address', data: null });
  const navigateToValueAdded = () => setDrillDown({ type: 'valueAdded', data: null });
  const navigateToMart = () => setDrillDown({ type: 'mart', data: null });
  const navigateToStation = () => setDrillDown({ type: 'station', data: null });
  const navigateToFood = () => setDrillDown({ type: 'food', data: null });
  const navigateToPrivilege = () => setDrillDown({ type: 'privilege', data: null });
  const goBack = () => setDrillDown(null);

  const renderContent = () => {
    if (drillDown) {
      switch (drillDown.type) {
        case 'product': return <ProductDetailView product={drillDown.data} onBack={goBack} onBuyNow={navigateToCheckout} />;
        case 'category': return <CategoryDetailView label={drillDown.data} onBack={goBack} onProductClick={navigateToProduct} />;
        case 'search': return <SearchView query={drillDown.data} onBack={goBack} onProductClick={navigateToProduct} />;
        case 'searchSuggestions': return <SearchSuggestionsView onBack={goBack} onSearch={navigateToSearch} />;
        case 'imageSearch': return <ImageSearchView onBack={goBack} onProductClick={navigateToProduct} />;
        case 'chats': return <ChatCenterView onBack={goBack} />;
        case 'orders': return <OrderListView status={drillDown.data} onBack={goBack} />;
        case 'notification': return <NotificationDetailView item={drillDown.data} onBack={goBack} />;
        case 'checkout': return <CheckoutView initialUserData={userData} product={drillDown.data} onBack={goBack} onOrderComplete={navigateToOrderSuccess} />;
        case 'orderSuccess': return <OrderSuccessView orderData={drillDown.data} onBackToHome={() => { setDrillDown(null); setActiveTab('Home'); }} />;
        case 'cart': return <CartView onBack={goBack} onCheckout={() => navigateToCheckout({ id: 'cart-item', name: '購物車結帳組合', price: 999, image: 'https://picsum.photos/seed/cart/400/400', soldCount: 0, rating: 5, location: '台北市' })} />;
        case 'games': return <ShopeeGamesView onBack={goBack} />;
        case 'info': return <InfoPageView title={drillDown.data.title} context={drillDown.data.context} onBack={goBack} />;
        case 'liveRoom': return <LiveRoomView live={drillDown.data} onBack={goBack} />;
        case 'coupons': return <CouponListView onBack={goBack} initialCategory={drillDown.data} />;
        case 'nextDay': return <NextDayDeliveryView onBack={goBack} onProductClick={navigateToProduct} />;
        case 'address': return <AddressManagementView initialUserData={userData} onSave={(data) => setUserData(prev => ({ ...prev, ...data }))} onBack={goBack} />;
        case 'valueAdded': return <ValueAddedCenterView onBack={goBack} />;
        case 'mart': return <ShopeeMartView onBack={goBack} onProductClick={navigateToProduct} />;
        case 'station': return <ShopeeStationView onBack={goBack} />;
        case 'food': return <ShopeeFoodView onBack={goBack} />;
        case 'privilege': return <MemberPrivilegeView onBack={goBack} />;
      }
    }

    if (activeTab === 'Home') return <HomeView onProductClick={navigateToProduct} onLiveClick={navigateToLiveRoom} onCategoryClick={(label) => {
      if (label === '蝦皮遊戲') return navigateToGames();
      if (label === '全站大免運' || label === '免運專區') return navigateToCoupons('免運券');
      if (label === '折價券') return navigateToCoupons('全站券');
      if (label === '隔日到貨' || label === '限時特賣') return navigateToNextDay();
      if (label === '加值中心') return navigateToValueAdded();
      if (label === '蝦皮超市') return navigateToMart();
      if (label === '蝦皮店到店') return navigateToStation();
      if (label === '蝦皮美食外送') return navigateToFood();
      if (label === '會員特權') return navigateToPrivilege();
      if (label === '蝦皮直播') { setActiveTab('Live'); return; }
      if (label.startsWith('品牌故事:')) {
        const brandName = label.replace('品牌故事: ', '');
        return navigateToInfo(label, `這是 ${brandName} 旗艦店的官方資歷與深度介紹。該品牌以高品質商品聞名，並在蝦拼商城提供 100% 正品保障與快速售後服務。`);
      }
      navigateToCategory(label);
    }} />;
    if (activeTab === 'Mall') return <MallView onProductClick={navigateToProduct} onBrandClick={(b) => navigateToInfo(`品牌故事: ${b}`, `深入了解 ${b} 的品牌文化與精選商品。作為商城旗艦店，我們致力於提供您最頂級的購物體驗。`)} />;
    if (activeTab === 'Live') return <LiveView onLiveClick={navigateToLiveRoom} />;
    if (activeTab === 'Notifications') return <NotificationsView onNotifyClick={navigateToNotification} />;
    if (activeTab === 'Me') return <MeView userName={userData.name} onOrderClick={navigateToOrders} onMenuClick={(label) => {
      if (label === '蝦幣中心') return navigateToInfo('蝦幣中心', '查看您的蝦幣餘額與折抵紀錄。蝦幣可用於購物折抵現金，1 蝦幣等於 1 元。');
      if (label === '優惠券') return navigateToCoupons('全部');
      if (label === '我的地址') return navigateToAddress();
      navigateToInfo(label, `這是 ${label} 的詳細頁面資訊。`);
    }} />;
    
    return <HomeView onProductClick={navigateToProduct} onCategoryClick={navigateToCategory} />;
  };

  return (
    <div className="min-h-screen pb-20 max-w-md mx-auto bg-gray-100 relative shadow-xl ring-1 ring-gray-200 overflow-x-hidden">
      {!drillDown && activeTab !== 'Live' && activeTab !== 'Me' && (
        <Header scrolled={false} activeTab={activeTab} onSearchClick={navigateToSearchSuggestions} onImageSearchClick={navigateToImageSearch} onCartClick={navigateToCart} onChatClick={navigateToChats} />
      )}
      <main style={{ minHeight: '100vh' }}>
        {renderContent()}
      </main>
      {!drillDown && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default App;
