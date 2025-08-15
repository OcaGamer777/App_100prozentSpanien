import React from 'react';
import { Youtube } from 'lucide-react';

const YouTubeBranding: React.FC = () => {
  const handleClick = () => {
    window.open('https://www.youtube.com/channel/UCB4Ax9VZP6KwLMj3AR6oC0w?sub_confirmation=1', '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="fixed top-4 left-4 z-50 cursor-pointer group transition-all duration-300 hover:scale-105"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/20 
                      group-hover:bg-white group-hover:shadow-xl transition-all duration-300 
                      transform group-hover:-translate-y-1">
        <div className="flex items-center gap-2">
          <Youtube 
            size={24} 
            className="text-red-600 transition-all duration-300 group-hover:text-red-700 
                       group-hover:scale-110 animate-pulse" 
          />
          <span className="font-bold text-gray-800 text-lg group-hover:text-gray-900 
                           transition-colors duration-300">
            100% Spanien
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubeBranding;