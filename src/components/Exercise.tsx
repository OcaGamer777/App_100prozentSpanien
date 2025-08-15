import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Question, GameResult } from '../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import YouTubeBranding from './YouTubeBranding';
import SupportButton from './SupportButton';

interface ExerciseProps {
  level: number;
  questions: Question[];
  onComplete: (results: GameResult[]) => void;
  onBack: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ level, questions, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState<GameResult[]>([]);
  const [draggedItem, setDraggedItem] = useState<string>('');
  const [startTime, setStartTime] = useState(Date.now());
  const [userAnswered, setUserAnswered] = useState(false);

  const { t } = useLanguage();
  const { updateUserPoints } = useAuth();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setStartTime(Date.now());
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const calculatePoints = (timeSpent: number): number => {
    if (timeSpent < 2) return 100;
    if (timeSpent < 4) return 90;
    if (timeSpent < 6) return 80;
    if (timeSpent < 8) return 70;
    if (timeSpent < 10) return 60;
    if (timeSpent < 12) return 50;
    if (timeSpent < 14) return 40;
    if (timeSpent < 16) return 30;
    if (timeSpent < 18) return 20;
    return 10;
  };

  const handleAnswer = (answer: string) => {
    if (userAnswered) return; // Prevenir respuestas múltiples
    setUserAnswered(true);
    
    const timeSpent = (Date.now() - startTime) / 1000;
    const correct = answer === currentQuestion.correctAnswer;
    const points = correct ? calculatePoints(timeSpent) : 0;

    setIsCorrect(correct);
    setShowResult(true);

    const result: GameResult = {
      questionId: currentQuestion.id,
      timeSpent,
      pointsEarned: points,
      correct
    };

    setResults(prev => [...prev, result]);

    if (correct) {
      updateUserPoints(points);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleTimeUp = () => {
    handleAnswer(''); // Empty answer for timeout
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setTimeLeft(20);
      setUserAnswered(false);
    } else {
      onComplete(results);
    }
  };

  const handleDragStart = (answer: string) => {
    setDraggedItem(answer);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      handleAnswer(draggedItem);
      setDraggedItem('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
      </div>
      
      <YouTubeBranding />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 
                     transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          ← {t('back')}
        </button>
        
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 
                        animate-pulse transition-all duration-300 hover:scale-105">
          <Clock size={20} className="text-blue-600" />
          <span className={`font-bold transition-all duration-300 ${
            timeLeft <= 5 ? 'text-red-500 animate-bounce' : 'text-blue-600'
          }`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-green-500 h-3 rounded-full transition-all duration-1000 
                       animate-pulse"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-white/80 text-center mt-2">
          {currentQuestionIndex + 1} / {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-6 animate-in fade-in slide-in-from-bottom 
                        duration-500 hover:bg-white/95 transition-all hover:shadow-xl">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-gray-800 mb-4 animate-in fade-in duration-700">
              {currentQuestion.sentence}
            </p>
            {currentQuestion.translation && (
              <p className="text-gray-600 italic animate-in fade-in duration-700" style={{animationDelay: '200ms'}}>
                ({currentQuestion.translation})
              </p>
            )}
          </div>

          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-4 animate-in fade-in duration-500" style={{animationDelay: '400ms'}}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !userAnswered && handleAnswer(option)}
                  disabled={userAnswered}
                  className={`w-full p-4 rounded-xl text-lg font-semibold transition-all duration-300 
                             transform hover:scale-105 hover:-translate-y-1 ${
                    userAnswered && showResult
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white animate-pulse'
                        : option === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white animate-bounce'
                        : 'bg-gray-200 text-gray-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Drag and Drop */}
          {currentQuestion.type === 'drag-drop' && (
            <div className="animate-in fade-in duration-500" style={{animationDelay: '400ms'}}>
              <div 
                className="border-4 border-dashed border-blue-300 rounded-xl p-8 mb-6 min-h-[100px] 
                           flex items-center justify-center bg-blue-50 text-lg transition-all duration-300 
                           hover:border-blue-400 hover:bg-blue-100"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {draggedItem ? (
                  <span className="text-blue-600 font-semibold animate-bounce">{draggedItem}</span>
                ) : (
                  <span className="text-blue-400 animate-pulse">Arrastra la respuesta aquí</span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => handleDragStart(option)}
                    className={`p-4 rounded-xl text-center font-semibold cursor-move transition-all duration-300 
                               transform hover:scale-105 hover:-translate-y-1 ${
                      userAnswered && showResult
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white animate-pulse'
                          : 'bg-gray-200 text-gray-600'
                        : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500 active:scale-95'
                    }`}
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center animate-in fade-in slide-in-from-bottom duration-500">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-lg ${
              isCorrect ? 'bg-green-500 animate-bounce' : 'bg-red-500 animate-pulse'
            } transition-all duration-300 transform hover:scale-105`}>
              {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
              {isCorrect ? t('correct') : t('incorrect')}
            </div>
            {isCorrect && (
              <p className="text-white mt-2 animate-in fade-in duration-500" style={{animationDelay: '200ms'}}>
                +{results[results.length - 1]?.pointsEarned || 0} {t('points')}
              </p>
            )}
          </div>
        )}

        {/* Support Button */}
        <div className="text-center mt-8 animate-in fade-in duration-700" style={{animationDelay: '600ms'}}>
          <SupportButton size="small" />
        </div>
      </div>
    </div>
  );
};

export default Exercise;