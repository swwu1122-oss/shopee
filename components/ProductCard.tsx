
import React from 'react';
import { Product } from '../types';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col transition-transform active:scale-[0.98] cursor-pointer"
    >
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={product.name}
        />
        {product.isMall && (
          <div className="absolute top-1 left-1 bg-shopee-orange text-white text-[8px] font-bold px-1 rounded">
            MALL
          </div>
        )}
        {product.discount && (
          <div className="absolute top-0 right-0 bg-yellow-400/90 text-shopee-orange text-[9px] font-bold px-1.5 py-0.5 rounded-bl">
            {product.discount}
          </div>
        )}
      </div>
      
      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-[11px] text-gray-800 line-clamp-2 leading-tight min-h-[2rem]">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-shopee-orange text-xs">$</span>
            <span className="text-shopee-orange font-bold text-base">{product.price.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star size={10} className="text-yellow-400 fill-current" />
              <span className="text-[10px] text-gray-400 ml-0.5">{product.rating}</span>
              <span className="text-[10px] text-gray-400 mx-1">|</span>
              <span className="text-[10px] text-gray-400">已售出 {product.soldCount}</span>
            </div>
          </div>
          
          <div className="text-[9px] text-gray-400 mt-1 text-right">
            {product.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
