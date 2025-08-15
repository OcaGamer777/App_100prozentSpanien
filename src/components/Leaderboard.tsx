import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Load leaderboard data from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const sortedUsers = users
      .map((user: any) => ({
        username: user.username,
        country: user.country,
        totalPoints: user.totalPoints || 0,
        rank: 0
      }))
      .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.totalPoints - a.totalPoints)
      .map((user: LeaderboardEntry, index: number) => ({
        ...user,
        rank: index + 1
      }));
    
    setLeaderboard(sortedUsers);
  }, []);

  const getCountryFlag = (countryCode: string): string => {
    const flags: { [key: string]: string } = {
      'DE': '🇩🇪',
      'AT': '🇦🇹',
      'CH': '🇨🇭',
      'ES': '🇪🇸',
      'FR': '🇫🇷',
      'IT': '🇮🇹',
      'PT': '🇵🇹',
      'NL': '🇳🇱',
      'BE': '🇧🇪',
      'UK': '🇬🇧'
    };
    return flags[countryCode] || '🌍';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={24} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={24} className="text-gray-400" />;
    if (rank === 3) return <Award size={24} className="text-orange-500" />;
    return <span className="text-gray-600 font-bold">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-white/5 rounded-full animate-spin" style={{animationDuration: '12s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-white/10 rounded-full animate-pulse" style={{animationDuration: '3s'}}></div>
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
          {t('topPlayers')}
        </h1>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length > 0 && (
        <div className="max-w-4xl mx-auto mb-8 animate-in fade-in duration-1000" style={{animationDelay: '300ms'}}>
          <div className="flex justify-center items-end gap-4 mb-8 animate-in slide-in-from-bottom duration-700" 
               style={{animationDelay: '500ms'}}>
            {/* 2nd Place */}
            {leaderboard[1] && (
              <div className="text-center animate-in slide-in-from-left duration-500" style={{animationDelay: '700ms'}}>
                <div className="bg-gradient-to-t from-gray-300 to-gray-500 rounded-t-2xl p-6 h-32 flex items-end 
                                hover:scale-105 transition-all duration-300">
                  <div className="text-center w-full">
                    <div className="text-4xl mb-2 animate-bounce">{getCountryFlag(leaderboard[1].country)}</div>
                    <Medal size={32} className="text-gray-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-bold">{leaderboard[1].username}</p>
                    <p className="text-white/80 text-sm">{leaderboard[1].totalPoints}</p>
                  </div>
                </div>
                <div className="bg-gray-400 text-white py-2 rounded-b-2xl font-bold">2°</div>
              </div>
            )}

            {/* 1st Place */}
            <div className="text-center animate-in slide-in-from-bottom duration-500" style={{animationDelay: '600ms'}}>
              <div className="bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-t-2xl p-6 h-40 flex items-end 
                              hover:scale-105 transition-all duration-300">
                <div className="text-center w-full">
                  <div className="text-5xl mb-3 animate-bounce">{getCountryFlag(leaderboard[0].country)}</div>
                  <Trophy size={40} className="text-yellow-200 mx-auto mb-2 animate-pulse" />
                  <p className="text-white font-bold text-lg">{leaderboard[0].username}</p>
                  <p className="text-white/80">{leaderboard[0].totalPoints}</p>
                </div>
              </div>
              <div className="bg-yellow-500 text-white py-2 rounded-b-2xl font-bold text-lg">1°</div>
            </div>

            {/* 3rd Place */}
            {leaderboard[2] && (
              <div className="text-center animate-in slide-in-from-right duration-500" style={{animationDelay: '800ms'}}>
                <div className="bg-gradient-to-t from-orange-400 to-orange-600 rounded-t-2xl p-6 h-28 flex items-end 
                                hover:scale-105 transition-all duration-300">
                  <div className="text-center w-full">
                    <div className="text-4xl mb-2 animate-bounce">{getCountryFlag(leaderboard[2].country)}</div>
                    <Award size={28} className="text-orange-200 mx-auto mb-2 animate-pulse" />
                    <p className="text-white font-bold">{leaderboard[2].username}</p>
                    <p className="text-white/80 text-sm">{leaderboard[2].totalPoints}</p>
                  </div>
                </div>
                <div className="bg-orange-500 text-white py-2 rounded-b-2xl font-bold">3°</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden animate-in slide-in-from-bottom 
                        duration-700 hover:bg-white/95 transition-all hover:shadow-xl" style={{animationDelay: '900ms'}}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 animate-in slide-in-from-top duration-500" 
               style={{animationDelay: '1000ms'}}>
            <h2 className="text-xl font-bold text-white text-center">Clasificación completa</h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.username}
                className={`flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 
                           transition-all duration-300 hover:scale-105 hover:-translate-y-1 
                           animate-in slide-in-from-left ${
                  index < 3 ? 'bg-gradient-to-r from-white to-yellow-50' : ''
                }`}
                style={{animationDelay: `${1100 + index * 50}ms`, animationDuration: '500ms'}}
              >
                {/* Rank */}
                <div className="w-12 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>

                {/* Country Flag */}
                <div className="text-2xl hover:scale-125 transition-all duration-300">
                  {getCountryFlag(entry.country)}
                </div>

                {/* Username */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{entry.username}</p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="font-bold text-blue-600">{entry.totalPoints.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">{t('points')}</p>
                </div>
              </div>
            ))}
          </div>

          {leaderboard.length === 0 && (
            <div className="p-8 text-center text-gray-500 animate-in fade-in duration-700">
              <p>No hay jugadores registrados aún</p>
              <p className="text-sm mt-2">¡Sé el primero en aparecer aquí!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;