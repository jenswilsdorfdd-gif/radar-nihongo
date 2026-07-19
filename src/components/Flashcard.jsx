import React, { useState, useEffect } from 'react';
import { vocabData } from '../data/vocabData';

const Flashcard = ({ day, onBack }) => {
  const isEmergency = day === 'emergency';

  const [queue, setQueue] = useState(() => {
    const data = vocabData[day];
    return data ? [...data] : [{ kana: "ー", german: "Keine Daten" }];
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);

  const currentWord = queue[0];

  useEffect(() => {
    if (isFlipped || timeLeft <= 0 || isEmergency) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); 
    }, 20);

    return () => clearInterval(timer);
  }, [isFlipped, timeLeft, isEmergency]);

  // NEU: Audio-Funktion
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  // NEU: Karte umdrehen + Audio abspielen
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      playAudio(currentWord.kana);
    }
  };

  const handleNextCard = (success) => {
    if (success) {
      if (queue.length <= 1) {
        onBack();
      } else {
        setQueue(prev => prev.slice(1));
        setIsFlipped(false);
        setTimeLeft(100);
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
      setTimeLeft(100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative">
      
      {!isEmergency && (
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
          <div 
            className="h-full bg-red-600 transition-all duration-75 ease-linear"
            style={{ width: `${timeLeft}%` }}
          ></div>
        </div>
      )}

      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <button 
          onClick={onBack} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Menü
        </button>
        <span className={`${isEmergency ? 'text-red-500 font-bold' : 'text-gray-500'} text-sm`}>
          {isEmergency ? 'NOTFALL-SCAN' : `Tag ${day}`} | Übrig: {queue.length}
        </span>
      </div>

      <div 
        className={`w-full max-w-sm aspect-[3/4] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer active:scale-95 transition-all ${isFlipped ? 'bg-gray-700' : 'bg-gray-800'} ${isEmergency && !isFlipped ? 'border-2 border-red-600/50 shadow-red-900/20' : ''}`}
        onClick={handleFlip} // <-- HIER rufen wir die neue Kombi-Funktion auf
      >
        {isFlipped ? (
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-xl mb-4 text-center">{currentWord.kana}</span>
            <h2 className="text-4xl font-bold text-green-400 text-center tracking-wider">{currentWord.german}</h2>
          </div>
        ) : (
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest text-center">{currentWord.kana}</h1>
        )}
      </div>

      <div className={`w-full max-w-sm mt-12 grid grid-cols-2 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNextCard(false);
          }}
        >
          Gezögert
        </button>
        <button 
          className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNextCard(true);
          }}
        >
          Geschafft
        </button>
      </div>

    </div>
  );
};

export default Flashcard;