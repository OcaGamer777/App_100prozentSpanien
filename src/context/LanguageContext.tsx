import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  de: {
    // Login/Register
    'login': 'Anmelden',
    'register': 'Registrieren',
    'username': 'Benutzername',
    'password': 'Passwort',
    'country': 'Land',
    'enter': 'Eintreten',
    'createAccount': 'Konto erstellen',
    'alreadyExists': 'Benutzer existiert bereits',
    'wrongCredentials': 'Falsche Anmeldedaten',
    'fillAllFields': 'Bitte alle Felder ausfüllen',
    
    // Main menu
    'learn': 'Lernen',
    'topPlayers': 'Top Spieler',
    'support': 'Unterstütze uns!',
    'logout': 'Abmelden',
    'settings': 'Einstellungen',
    
    // Levels
    'level': 'Niveau',
    'locked': 'Gesperrt',
    'pointsRequired': 'Punkte erforderlich',
    'back': 'Zurück',
    
    // Exercise
    'timeLeft': 'Zeit übrig',
    'points': 'Punkte',
    'correct': 'Richtig!',
    'incorrect': 'Falsch!',
    'next': 'Weiter',
    'finish': 'Beenden',
    
    // Results
    'exerciseComplete': 'Übung abgeschlossen!',
    'pointsEarned': 'Punkte erhalten',
    'averageTime': 'Durchschnittszeit',
    'nextLevel': 'Nächstes Niveau',
    'retry': 'Wiederholen',
    'home': 'Startseite',
    
    // Leaderboard
    'rank': 'Rang',
    'player': 'Spieler',
    'totalPoints': 'Gesamtpunkte',
    
    // Settings
    'language': 'Sprache',
    'theme': 'Thema',
    'changePassword': 'Passwort ändern',
    'saveChanges': 'Änderungen speichern'
  },
  es: {
    // Login/Register
    'login': 'Iniciar sesión',
    'register': 'Registrarse',
    'username': 'Usuario',
    'password': 'Contraseña',
    'country': 'País',
    'enter': 'Entrar',
    'createAccount': 'Crear cuenta',
    'alreadyExists': 'El usuario ya existe',
    'wrongCredentials': 'Credenciales incorrectas',
    'fillAllFields': 'Por favor completa todos los campos',
    
    // Main menu
    'learn': 'Aprender',
    'topPlayers': 'Mejores Jugadores',
    'support': '¡Apóyanos!',
    'logout': 'Cerrar sesión',
    'settings': 'Configuración',
    
    // Levels
    'level': 'Nivel',
    'locked': 'Bloqueado',
    'pointsRequired': 'Puntos requeridos',
    'back': 'Atrás',
    
    // Exercise
    'timeLeft': 'Tiempo restante',
    'points': 'Puntos',
    'correct': '¡Correcto!',
    'incorrect': '¡Incorrecto!',
    'next': 'Siguiente',
    'finish': 'Finalizar',
    
    // Results
    'exerciseComplete': '¡Ejercicio completado!',
    'pointsEarned': 'Puntos obtenidos',
    'averageTime': 'Tiempo promedio',
    'nextLevel': 'Siguiente nivel',
    'retry': 'Reintentar',
    'home': 'Inicio',
    
    // Leaderboard
    'rank': 'Posición',
    'player': 'Jugador',
    'totalPoints': 'Puntos totales',
    
    // Settings
    'language': 'Idioma',
    'theme': 'Tema',
    'changePassword': 'Cambiar contraseña',
    'saveChanges': 'Guardar cambios'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['de']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};