
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  soldCount: number;
  rating: number;
  isMall?: boolean;
  discount?: string;
  location: string;
}

export interface Game {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export type TabType = 'Home' | 'Mall' | 'Live' | 'Notifications' | 'Me';
