import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Trophy, Settings, LogOut, Globe } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';
import SupportButton from './SupportButton';

interface MainMenuProps {
  onNavigate: (screen: 'levels' | 'leaderboard' | 'settings') => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const getPointsForNextLevel = (currentPoints: number): number => {
    const levels = [0, 500, 1500, 3000, 5000, 8000];
    const currentLevel = levels.findIndex(points => currentPoints < points) - 1;
    return currentLevel >= 0 && currentLevel < levels.length - 1 
      ? levels[currentLevel + 1] - currentPoints 
      : 0;
  };

  const getProgressPercentage = (currentPoints: number): number => {
    const levels = [0, 500, 1500, 3000, 5000, 8000];
    const currentLevelIndex = levels.findIndex(points => currentPoints < points) - 1;
    
    if (currentLevelIndex < 0) return 0;
    if (currentLevelIndex >= levels.length - 1) return 100;
    
    const currentLevelPoints = levels[currentLevelIndex];
    const nextLevelPoints = levels[currentLevelIndex + 1];
    const progress = (currentPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
    
    return Math.min(100, Math.max(0, progress * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
      </div>
      
      <YouTubeBranding />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-white animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-3xl font-bold animate-in fade-in duration-1000">100 % Spanien</h1>
          <p className="text-white/80 animate-in fade-in duration-1000" style={{animationDelay: '200ms'}}>
            ¡Hola, {user?.username}!
          </p>
        </div>
        
        <div className="flex gap-2 animate-in fade-in slide-in-from-right duration-700">
          <button
            onClick={() => setLanguage(language === 'de' ? 'es' : 'de')}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 
                       transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <Globe size={20} />
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 
                       transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={logout}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 
                       transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom 
                      duration-700 hover:bg-white/95 transition-all hover:shadow-xl transform hover:-translate-y-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600 text-sm">{t('totalPoints')}</p>
            <p className="text-3xl font-bold text-blue-600">{user?.totalPoints || 0}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">{t('level')}</p>
            <p className="text-3xl font-bold text-green-600">{user?.currentLevel || 1}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000 
                       animate-pulse"
            style={{ width: `${getProgressPercentage(user?.totalPoints || 0)}%` }}
          ></div>
        </div>
        
        <p className="text-gray-600 text-sm text-center">
          {getPointsForNextLevel(user?.totalPoints || 0)} {t('pointsRequired').toLowerCase()}
        </p>
      </div>

      {/* Main Navigation */}
      <div className="space-y-4 max-w-md mx-auto animate-in fade-in duration-1000" style={{animationDelay: '400ms'}}>
        <button
          onClick={() => onNavigate('levels')}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 hover:bg-white 
                     transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl 
                     hover:-translate-y-2 animate-in slide-in-from-left duration-700"
        >
          <div className="bg-blue-500 p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <BookOpen size={32} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">{t('learn')}</h3>
            <p className="text-gray-600">¡Practica español ahora!</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('leaderboard')}
          className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex items-center gap-4 hover:bg-white 
                     transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl 
                     hover:-translate-y-2 animate-in slide-in-from-right duration-700"
        >
          <div className="bg-yellow-500 p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Trophy size={32} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">{t('topPlayers')}</h3>
            <p className="text-gray-600">Vergleiche deinen Fortschritt</p>
          </div>
        </button>

        <div className="text-center pt-4 animate-in fade-in duration-1000" style={{animationDelay: '800ms'}}>
          <SupportButton />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;