import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import LoginRegister from './components/LoginRegister';
import MainMenu from './components/MainMenu';
import LevelSelection from './components/LevelSelection';
import Exercise from './components/Exercise';
import ExerciseResults from './components/ExerciseResults';
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';
import { allQuestions } from './data/questions';
import { GameResult } from './types';

type Screen = 'login' | 'menu' | 'levels' | 'exercise' | 'results' | 'leaderboard' | 'settings';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [exerciseResults, setExerciseResults] = useState<GameResult[]>([]);

  // Get questions for selected level
  const getLevelQuestions = (level: number) => {
    const levelQuestions = allQuestions.filter(q => q.level === level);
    // Randomly select 10 questions for the exercise
    const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  };

  const canAdvanceToNextLevel = (results: GameResult[]): boolean => {
    const correctAnswers = results.filter(r => r.correct).length;
    const accuracy = correctAnswers / results.length;
    return accuracy >= 0.7; // 70% accuracy required to advance
  };

  const handleExerciseComplete = (results: GameResult[]) => {
    setExerciseResults(results);
    setCurrentScreen('results');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
    setCurrentScreen('exercise');
  };

  const handleNextLevel = () => {
    if (selectedLevel < 5) {
      setSelectedLevel(selectedLevel + 1);
      setCurrentScreen('exercise');
    } else {
      setCurrentScreen('menu');
    }
  };

  const handleRetryExercise = () => {
    setCurrentScreen('exercise');
  };

  // If user is not logged in, show login screen
  if (!user) {
    return <LoginRegister />;
  }

  // Navigate based on current screen
  switch (currentScreen) {
    case 'menu':
      return <MainMenu onNavigate={handleNavigate} />;
      
    case 'levels':
      return (
        <LevelSelection
          onBack={() => setCurrentScreen('menu')}
          onSelectLevel={handleSelectLevel}
        />
      );
      
    case 'exercise':
      return (
        <Exercise
          level={selectedLevel}
          questions={getLevelQuestions(selectedLevel)}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentScreen('levels')}
        />
      );
      
    case 'results':
      return (
        <ExerciseResults
          results={exerciseResults}
          level={selectedLevel}
          onRetry={handleRetryExercise}
          onNextLevel={handleNextLevel}
          onHome={() => setCurrentScreen('menu')}
          canAdvance={canAdvanceToNextLevel(exerciseResults)}
        />
      );
      
    case 'leaderboard':
      return <Leaderboard onBack={() => setCurrentScreen('menu')} />;
      
    case 'settings':
      return <Settings onBack={() => setCurrentScreen('menu')} />;
      
    default:
      return <MainMenu onNavigate={handleNavigate} />;
  }
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;