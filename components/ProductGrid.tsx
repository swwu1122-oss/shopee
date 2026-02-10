
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: '【官方正貨】頂級智慧降噪耳機 限量發售',
    price: 8900,
    image: 'https://picsum.photos/seed/p1/400/400',
    soldCount: 1200,
    rating: 4.9,
    isMall: true,
    discount: '8.5折',
    location: '台北市'
  },
  {
    id: '2',
    name: '夏季新款透氣涼感上衣 男女皆可穿 舒適百搭',
    price: 399,
    image: 'https://picsum.photos/seed/p2/400/400',
    soldCount: 3500,
    rating: 4.8,
    discount: '5折',
    location: '台中市'
  },
  {
    id: '3',
    name: '高質感皮革簡約後背包 筆電層設計 黑色',
    price: 1250,
    image: 'https://picsum.photos/seed/p3/400/400',
    soldCount: 800,
    rating: 4.7,
    isMall: true,
    location: '新北市'
  },
  {
    id: '4',
    name: '天然有機保養套組 買一送一 數量有限',
    price: 2400,
    image: 'https://picsum.photos/seed/p4/400/400',
    soldCount: 500,
    rating: 5.0,
    discount: '買一送一',
    location: '桃園市'
  },
  {
    id: '5',
    name: '多功能電動按摩球 隨身攜帶 緩解痠痛',
    price: 680,
    image: 'https://picsum.photos/seed/p5/400/400',
    soldCount: 150,
    rating: 4.6,
    location: '高雄市'
  },
  {
    id: '6',
    name: '專業級手沖咖啡組 附濾紙、不鏽鋼壺',
    price: 1850,
    image: 'https://picsum.photos/seed/p6/400/400',
    soldCount: 45,
    rating: 4.9,
    isMall: true,
    location: '台南市'
  }
];

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {mockProducts.map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => onProductClick(p)} />
      ))}
    </div>
  );
};

export default ProductGrid;
