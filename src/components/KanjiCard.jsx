import React, { useState } from 'react';
import { kanjiData } from '../data/kanjiData';

const KanjiCard = ({ day, onBack }) => {
  const [queue, setQueue] = useState(() => {
    const data = kanjiData[day];
    return data ? [...data] : [{ kanji: "ー", kana: "-", german: "Keine Daten", example: "-" }];
  });
  
  const [isFlipped, setIsFlipped] = useState(false);

  const currentKanji = queue[0];

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      // Spielt beim Umdrehen nur die isolierte Aussprache des Zeichens ab
      if (currentKanji.tts) playAudio(currentKanji.tts);
    }
  };

  // NEU: Die Funktion für den Beispielsatz-Knopf
  const playExample = (e) => {
    e.stopPropagation(); // Verhindert, dass das Klicken des Knopfes die Karte beeinflusst
    if (currentKanji.example) {
      // Trick: Schneidet den Text vor der "(" ab. "駅は... (Wo ist...)" wird zu "駅は..."
      const japanesePart = currentKanji.example.split('(')[0].trim();
      playAudio(japanesePart);
    }
  };

  const handleNextCard = (success) => {
    if (success) {
      if (queue.length <= 1) {
        onBack();
      } else {
        setQueue(prev => prev.slice(1));
        setIsFlipped(false);
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative">
      
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <button 
          onClick={onBack} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Deck
        </button>
        <span className="text-purple-400 text-sm font-bold">
          Tag {day} | Übrig: {queue.length}
        </span>
      </div>

      {/* Die Kanji-Karte */}
      <div 
        className={`w-full max-w-md aspect-[4/5] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer active:scale-95 transition-all ${isFlipped ? 'bg-gray-800' : 'bg-gray-800 border-b-4 border-purple-500/50'}`}
        onClick={handleFlip} 
      >
        {isFlipped ? (
          <div className="flex flex-col items-center text-center w-full relative">
            <h1 className="text-6xl font-bold text-white mb-2">{currentKanji.kanji}</h1>
            <span className="text-purple-400 font-bold text-xl mb-4 tracking-widest">{currentKanji.kana}</span>
            <div className="w-full h-px bg-gray-700 mb-4"></div>
            <h2 className="text-3xl font-bold text-green-400 mb-6">{currentKanji.german}</h2>
            
            {/* Box für den Beispielsatz */}
            <div className="bg-gray-900 w-full p-4 rounded-xl border border-gray-700 flex flex-col items-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Beispielsatz</p>
              <p className="text-sm text-yellow-400 leading-relaxed font-medium mb-4">{currentKanji.example}</p>
              
              {/* NEU: Der Audio-Knopf für den Satz */}
              <button
                onClick={playExample}
                className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border border-purple-500/30 active:scale-95"
              >
                <span className="text-lg">🔊</span> Satz vorlesen
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-9xl font-bold text-white tracking-widest mb-6">{currentKanji.kanji}</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Klicken zum Aufdecken</p>
          </div>
        )}
      </div>

      {/* Die Bewertungs-Buttons */}
      <div className={`w-full max-w-sm mt-12 grid grid-cols-2 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNextCard(false);
          }}
        >
          Nochmal
        </button>
        <button 
          className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-purple-400 active:scale-95 transition-all"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNextCard(true);
          }}
        >
          Sitzt
        </button>
      </div>

    </div>
  );
};

export default KanjiCard;