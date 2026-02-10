
import React, { useState, useEffect } from 'react';

const banners = [
  'https://picsum.photos/seed/shopee1/800/400',
  'https://picsum.photos/seed/shopee2/800/400',
  'https://picsum.photos/seed/shopee3/800/400',
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm">
      <div 
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((src, idx) => (
          <img key={idx} src={src} className="w-full h-full object-cover flex-shrink-0" alt={`Banner ${idx}`} />
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {banners.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all ${idx === current ? 'w-4 bg-shopee-orange' : 'w-1.5 bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
