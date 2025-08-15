import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GameResult } from '../types';
import { Trophy, Clock, Target, Home, RotateCcw } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';
import SupportButton from './SupportButton';

interface ExerciseResultsProps {
  results: GameResult[];
  level: number;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
  canAdvance: boolean;
}

const ExerciseResults: React.FC<ExerciseResultsProps> = ({
  results,
  level,
  onRetry,
  onNextLevel,
  onHome,
  canAdvance
}) => {
  const { t } = useLanguage();

  const totalPoints = results.reduce((sum, result) => sum + result.pointsEarned, 0);
  const correctAnswers = results.filter(result => result.correct).length;
  const averageTime = results.reduce((sum, result) => sum + result.timeSpent, 0) / results.length;
  const accuracy = (correctAnswers / results.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
      </div>
      
      <YouTubeBranding />
      
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in duration-1000">
          <div className="bg-white/90 backdrop-blur-sm rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4 
                          animate-bounce hover:scale-110 transition-all duration-300">
            <Trophy size={48} className="text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-in fade-in duration-700" style={{animationDelay: '200ms'}}>
            {t('exerciseComplete')}
          </h1>
          <p className="text-white/80 animate-in fade-in duration-700" style={{animationDelay: '400ms'}}>
            {t('level')} {level} - ¡Bien hecho!
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-in slide-in-from-bottom 
                        duration-700 hover:bg-white/95 transition-all hover:shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-in fade-in duration-1000" 
               style={{animationDelay: '600ms'}}>
            {/* Total Points */}
            <div className="text-center animate-in slide-in-from-left duration-500" style={{animationDelay: '800ms'}}>
              <div className="bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2 
                              hover:scale-110 transition-all duration-300 animate-pulse">
                <Trophy size={24} className="text-green-600" />
              </div>
              <p className="text-gray-600 text-sm">{t('pointsEarned')}</p>
              <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
            </div>

            {/* Accuracy */}
            <div className="text-center animate-in slide-in-from-left duration-500" style={{animationDelay: '900ms'}}>
              <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2 
                              hover:scale-110 transition-all duration-300 animate-pulse">
                <Target size={24} className="text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm">Precisión</p>
              <p className="text-2xl font-bold text-blue-600">{accuracy.toFixed(0)}%</p>
            </div>

            {/* Correct Answers */}
            <div className="text-center animate-in slide-in-from-right duration-500" style={{animationDelay: '1000ms'}}>
              <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2 
                              hover:scale-110 transition-all duration-300 animate-pulse">
                <div className="text-purple-600 font-bold text-lg">
                  {correctAnswers}/{results.length}
                </div>
              </div>
              <p className="text-gray-600 text-sm">Correctas</p>
              <p className="text-2xl font-bold text-purple-600">{correctAnswers}</p>
            </div>

            {/* Average Time */}
            <div className="text-center animate-in slide-in-from-right duration-500" style={{animationDelay: '1100ms'}}>
              <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-2 
                              hover:scale-110 transition-all duration-300 animate-pulse">
                <Clock size={24} className="text-orange-600" />
              </div>
              <p className="text-gray-600 text-sm">{t('averageTime')}</p>
              <p className="text-2xl font-bold text-orange-600">{averageTime.toFixed(1)}s</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 animate-in fade-in duration-700" style={{animationDelay: '1200ms'}}>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso del nivel</span>
              <span>{accuracy.toFixed(0)}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-2000 
                           animate-pulse"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-6">
            {accuracy >= 80 ? (
              <div className="text-green-600">
                <p className="font-semibold">¡Excelente trabajo!</p>
                <p className="text-sm">Tu español está mejorando mucho</p>
              </div>
            ) : accuracy >= 60 ? (
              <div className="text-blue-600">
                <p className="font-semibold">¡Buen trabajo!</p>
                <p className="text-sm">Sigue practicando para mejorar</p>
              </div>
            ) : (
              <div className="text-orange-600">
                <p className="font-semibold">Sigue intentando</p>
                <p className="text-sm">La práctica hace al maestro</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-in fade-in duration-1000" style={{animationDelay: '1400ms'}}>
          {canAdvance && (
            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold 
                         hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg 
                         transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              {t('nextLevel')} →
            </button>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onRetry}
              className="bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-semibold hover:bg-white 
                         transition-all duration-300 shadow-lg flex items-center justify-center gap-2 
                         transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <RotateCcw size={20} />
              {t('retry')}
            </button>
            
            <button
              onClick={onHome}
              className="bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-semibold hover:bg-white 
                         transition-all duration-300 shadow-lg flex items-center justify-center gap-2 
                         transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <Home size={20} />
              {t('home')}
            </button>
          </div>
        </div>

        {/* Support Button */}
        <div className="text-center mt-8 animate-in fade-in duration-1000" style={{animationDelay: '1600ms'}}>
          <SupportButton />
        </div>
      </div>
    </div>
  );
};

export default ExerciseResults;