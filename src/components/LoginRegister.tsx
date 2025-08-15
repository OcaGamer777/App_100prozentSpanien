import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Settings, Globe } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('DE');
  const [error, setError] = useState('');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);

  const { login, register } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const countries = [
    { code: 'DE', name: 'Deutschland', flag: '🇩🇪' },
    { code: 'AT', name: 'Österreich', flag: '🇦🇹' },
    { code: 'CH', name: 'Schweiz', flag: '🇨🇭' },
    { code: 'ES', name: 'España', flag: '🇪🇸' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IT', name: 'Italia', flag: '🇮🇹' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'NL', name: 'Nederland', flag: '🇳🇱' },
    { code: 'BE', name: 'België', flag: '🇧🇪' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || (!isLogin && !country)) {
      setError(t('fillAllFields'));
      return;
    }

    let success: boolean;
    if (isLogin) {
      success = await login(username, password);
      if (!success) {
        setError(t('wrongCredentials'));
      }
    } else {
      success = await register(username, password, country);
      if (!success) {
        setError(t('alreadyExists'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
      </div>
      
      <YouTubeBranding />
      
      {/* Language selector */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setShowLanguageSelect(!showLanguageSelect)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 
                       transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <Globe size={24} />
          </button>
          
          {showLanguageSelect && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl p-2 min-w-[150px] 
                            animate-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => {
                  setLanguage('de');
                  setShowLanguageSelect(false);
                }}
                className={`w-full text-left p-2 rounded hover:bg-gray-100 transition-all duration-200 
                           hover:translate-x-1 ${language === 'de' ? 'bg-blue-100' : ''}`}
              >
                🇩🇪 Deutsch
              </button>
              <button
                onClick={() => {
                  setLanguage('es');
                  setShowLanguageSelect(false);
                }}
                className={`w-full text-left p-2 rounded hover:bg-gray-100 transition-all duration-200 
                           hover:translate-x-1 ${language === 'es' ? 'bg-blue-100' : ''}`}
              >
                🇪🇸 Español
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 
                      hover:shadow-3xl animate-in fade-in-50 slide-in-from-bottom-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
                         animate-in fade-in duration-700 slide-in-from-top-2">
            100 % Spanien
          </h1>
          <p className="text-gray-600 mt-2 animate-in fade-in duration-700 slide-in-from-top-4" style={{animationDelay: '200ms'}}>
            {isLogin ? 'Willkommen zurück!' : '¡Bienvenido!'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1 animate-in fade-in duration-700" style={{animationDelay: '400ms'}}>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              isLogin 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:scale-105'
            }`}
          >
            {t('login')}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              !isLogin 
                ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                : 'text-gray-600 hover:text-blue-500 hover:scale-105'
            }`}
          >
            {t('register')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-700" style={{animationDelay: '600ms'}}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {t('username')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                         hover:border-blue-300 focus:scale-105"
              placeholder={t('username')}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                         hover:border-blue-300 focus:scale-105"
              placeholder={t('password')}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {t('country')}
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                           hover:border-blue-300 focus:scale-105"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg animate-in 
                            fade-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold 
                       hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg 
                       transform hover:scale-105 hover:-translate-y-1 active:scale-95"
          >
            {isLogin ? t('enter') : t('createAccount')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;