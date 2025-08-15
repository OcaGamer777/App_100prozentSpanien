import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SupportButtonProps {
  className?: string;
  size?: 'small' | 'large';
}

const SupportButton: React.FC<SupportButtonProps> = ({ className = '', size = 'large' }) => {
  const { t } = useLanguage();

  const handleClick = () => {
    window.open('https://www.patreon.com/100spanien?l=es', '_blank');
  };

  const buttonClasses = size === 'large' 
    ? 'px-8 py-4 text-lg' 
    : 'px-4 py-2 text-sm';

  return (
    <button
      onClick={handleClick}
      className={`bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold 
                  rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg 
                  flex items-center gap-2 active:scale-95 animate-pulse hover:animate-none ${buttonClasses} ${className}`}
    >
      <Heart size={size === 'large' ? 24 : 16} fill="currentColor" className="animate-bounce" />
      {t('support')}
    </button>
  );
};

export default SupportButton;