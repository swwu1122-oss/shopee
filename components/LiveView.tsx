
import React, { useState, useEffect } from 'react';
import { Eye, Heart, ShoppingCart, Loader2, Youtube, Play } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { getTrendingShoppingVideos } from '../services/youtubeService';

interface LiveViewProps {
  onLiveClick?: (live: any) => void;
}

const LiveView: React.FC<LiveViewProps> = ({ onLiveClick }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const results = await getTrendingShoppingVideos();
      setVideos(results);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 min-h-screen bg-black">
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
           <div className="bg-red-600 p-1 rounded">
             <Youtube size={18} className="text-white" />
           </div>
           <h1 className="text-xl font-bold italic">影音直播</h1>
        </div>
        <div className="flex gap-3">
          <ShoppingCart size={24} />
          <Heart size={24} />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
           <Loader2 className="animate-spin text-[#ee4d2d]" size={40} />
           <p className="text-white text-sm font-bold">獲取熱門影音中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1 p-1 pt-16">
          {videos.map(video => (
            <div 
              key={video.id} 
              onClick={() => onLiveClick?.({ ...video, host: video.channelTitle, viewers: 'YouTube' })}
              className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer active:opacity-80"
            >
              <img src={video.thumbnail} className="absolute inset-0 w-full h-full object-cover" alt="Live" />
              
              {/* YouTube Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                 <div className="bg-red-600 p-2 rounded-full opacity-80 group-hover:scale-125 transition-transform">
                    <Play className="text-white fill-white" size={20} />
                 </div>
              </div>

              {/* Live Tag */}
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                VIDEO
              </div>

              {/* Viewers */}
              <div className="absolute top-2 right-2 bg-black/40 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                <Eye size={10} /> YT 熱搜
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-bold line-clamp-2 leading-tight h-8">{video.title}</p>
                <p className="text-gray-300 text-[10px] mt-1">@{video.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveView;
