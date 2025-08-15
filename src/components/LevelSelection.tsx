import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Star, ArrowLeft } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';

interface LevelSelectionProps {
  onBack: () => void;
  onSelectLevel: (level: number) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({ onBack, onSelectLevel }) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const levels = [
    {
      level: 1,
      name: 'Principiante',
      description: 'Saludos y frases básicas',
      color: 'from-green-400 to-green-600',
      pointsRequired: 0,
      icon: '👋'
    },
    {
      level: 2,
      name: 'Básico',
      description: 'Verbos y gramática simple',
      color: 'from-blue-400 to-blue-600',
      pointsRequired: 500,
      icon: '📚'
    },
    {
      level: 3,
      name: 'Intermedio',
      description: 'Subjuntivo y expresiones',
      color: 'from-purple-400 to-purple-600',
      pointsRequired: 1500,
      icon: '🎯'
    },
    {
      level: 4,
      name: 'Avanzado',
      description: 'Estructuras complejas',
      color: 'from-red-400 to-red-600',
      pointsRequired: 3000,
      icon: '🚀'
    },
    {
      level: 5,
      name: 'Experto',
      description: 'Dominio del idioma',
      color: 'from-yellow-400 to-orange-500',
      pointsRequired: 5000,
      icon: '👑'
    }
  ];

  const isLevelUnlocked = (level: number, pointsRequired: number): boolean => {
    return (user?.totalPoints || 0) >= pointsRequired;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-white/5 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>
      
      <YouTubeBranding />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 
                     transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-white animate-in fade-in slide-in-from-right duration-700">
          {t('level')} Selection
        </h1>
      </div>

      {/* Levels Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 
                      animate-in fade-in duration-1000" style={{animationDelay: '300ms'}}>
        {levels.map((levelData) => {
          const unlocked = isLevelUnlocked(levelData.level, levelData.pointsRequired);
          
          return (
            <div
              key={levelData.level}
              className={`relative rounded-2xl p-6 text-center transition-all duration-300 transform 
                         hover:scale-105 hover:-translate-y-2 animate-in slide-in-from-bottom ${
                unlocked 
                  ? 'cursor-pointer shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm hover:bg-white/95' 
                  : 'cursor-not-allowed bg-gray-300/50 backdrop-blur-sm'
              }`}
              style={{animationDelay: `${levelData.level * 100}ms`}}
              onClick={() => unlocked && onSelectLevel(levelData.level)}
            >
              {!unlocked && (
                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center 
                                animate-pulse">
                  <div className="bg-white/90 rounded-full p-4 animate-bounce">
                    <Lock size={32} className="text-gray-600" />
                  </div>
                </div>
              )}
              
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${levelData.color} 
                              flex items-center justify-center text-3xl transition-all duration-300 
                              hover:scale-110 hover:rotate-12`}>
                {unlocked ? levelData.icon : <Lock size={24} className="text-white" />}
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                {t('level')} {levelData.level}
              </h3>
              <p className={`text-lg font-semibold mb-2 ${unlocked ? 'text-blue-600' : 'text-gray-400'}`}>
                {levelData.name}
              </p>
              <p className={`text-sm mb-4 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                {levelData.description}
              </p>
              
              {!unlocked && (
                <p className="text-sm text-red-500 font-medium">
                  {levelData.pointsRequired} {t('pointsRequired').toLowerCase()}
                </p>
              )}
              
              {unlocked && (
                <div className="flex justify-center">
                  <div className="flex gap-1 animate-pulse">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className="text-yellow-400 transition-all duration-300 hover:scale-125"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelection;