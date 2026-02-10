
import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading, color = 'bg-[#ee4d2d]' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      setProgress(0);
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev; // 停在 95% 等待完成
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      setProgress(100);
      const timeout = window.setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-100 overflow-hidden max-w-md mx-auto">
      <div 
        className={`h-full ${color} transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
