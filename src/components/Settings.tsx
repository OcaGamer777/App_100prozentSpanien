import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Globe, Moon, Sun, Lock } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';

interface SettingsProps {
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const { t, language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Here you would typically make an API call to change the password
    setMessage('Contraseña cambiada exitosamente');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-44 h-44 bg-white/5 rounded-full animate-spin" style={{animationDuration: '18s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-white/10 rounded-full animate-pulse" style={{animationDuration: '4s'}}></div>
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
          {t('settings')}
        </h1>
      </div>

      {/* Settings Content */}
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-1000" style={{animationDelay: '300ms'}}>
        {/* Language Setting */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-in slide-in-from-left duration-500 
                        hover:bg-white/95 transition-all hover:shadow-xl transform hover:-translate-y-1" 
             style={{animationDelay: '500ms'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full hover:scale-110 transition-all duration-300 animate-pulse">
              <Globe size={24} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{t('language')}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setLanguage('de')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                language === 'de'
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">🇩🇪</div>
              <div className="font-semibold">Deutsch</div>
            </button>
            
            <button
              onClick={() => setLanguage('es')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                language === 'es'
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">🇪🇸</div>
              <div className="font-semibold">Español</div>
            </button>
          </div>
        </div>

        {/* Theme Setting */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-in slide-in-from-right duration-500 
                        hover:bg-white/95 transition-all hover:shadow-xl transform hover:-translate-y-1" 
             style={{animationDelay: '600ms'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-full hover:scale-110 transition-all duration-300 animate-pulse">
              {theme === 'light' ? (
                <Sun size={24} className="text-purple-600" />
              ) : (
                <Moon size={24} className="text-purple-600" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{t('theme')}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 
                         transform hover:scale-105 hover:-translate-y-1 ${
                theme === 'light'
                  ? 'border-purple-500 bg-purple-50 text-purple-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Sun size={20} />
              <span className="font-semibold">Claro</span>
            </button>
            
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 
                         transform hover:scale-105 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'border-purple-500 bg-purple-50 text-purple-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Moon size={20} />
              <span className="font-semibold">Oscuro</span>
            </button>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-in slide-in-from-left duration-500 
                        hover:bg-white/95 transition-all hover:shadow-xl transform hover:-translate-y-1" 
             style={{animationDelay: '700ms'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full hover:scale-110 transition-all duration-300 animate-pulse">
              <Lock size={24} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{t('changePassword')}</h2>
          </div>
          
          {!showChangePassword ? (
            <button
              onClick={() => setShowChangePassword(true)}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 
                         transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              {t('changePassword')}
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-red-500 transition-all duration-300 hover:border-red-300 focus:scale-105"
                  placeholder="Nueva contraseña"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-red-500 transition-all duration-300 hover:border-red-300 focus:scale-105"
                  placeholder="Confirmar contraseña"
                />
              </div>
              
              {message && (
                <div className={`text-sm p-3 rounded-lg animate-in fade-in slide-in-from-top duration-300 ${
                  message.includes('exitosamente') 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  {message}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 
                           transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    setMessage('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 
                           transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={() => setMessage('Configuración guardada')}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold 
                     hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg 
                     transform hover:scale-105 hover:-translate-y-1 active:scale-95 animate-in slide-in-from-bottom" 
          style={{animationDelay: '800ms'}}
        >
          {t('saveChanges')}
        </button>

        {message && !showChangePassword && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-center animate-in fade-in slide-in-from-bottom duration-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;