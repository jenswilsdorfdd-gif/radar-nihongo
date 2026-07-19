import React, { useState } from 'react';
import { kanaData } from '../data/kanaData';

const KanaCard = ({ day, totalDays, onBack }) => {
  // Lädt die Zeichen in eine Warteschlange
  const [queue, setQueue] = useState(() => {
    const data = kanaData[day];
    return data ? [...data] : [{ kana: "ー", romaji: "Keine Zeichen" }];
  });
  
  const [isFlipped, setIsFlipped] = useState(false);

  // Das aktuelle Zeichen ist immer das erste in der Schlange
  const currentCharacter = queue[0];

  // Die Audio-Funktion für die japanische Aussprache
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stoppt vorherige Töne
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // Minimal langsamer für bessere Verständlichkeit
      window.speechSynthesis.speak(utterance);
    }
  };

  // Dreht die Karte um UND spielt den Ton ab
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      playAudio(currentCharacter.kana);
    }
  };

  // Logik für die Bewertungsbuttons
  const handleNextCard = (success) => {
    if (success) {
      // SITZT: Karte fliegt aus der Warteschlange
      if (queue.length <= 1) {
        onBack();
      } else {
        setQueue(prev => prev.slice(1));
        setIsFlipped(false);
      }
    } else {
      // NOCHMAL: Karte wandert ans Ende der Warteschlange
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative">
      
      {/* Header mit Zurück-Button und Zähler */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <button 
          onClick={onBack} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Deck
        </button>
        <span className="text-green-500 text-sm font-bold">
          Tag {day} | Übrig: {queue.length}
        </span>
      </div>

      {/* Die interaktive Lernkarte */}
      <div 
        className={`w-full max-w-sm aspect-[3/4] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer active:scale-95 transition-all ${isFlipped ? 'bg-gray-700' : 'bg-gray-800 border-b-4 border-green-500/50'}`}
        onClick={handleFlip} 
      >
        {isFlipped ? (
          <div className="flex flex-col items-center text-center">
            <span className="text-gray-400 text-2xl mb-4">{currentCharacter.kana}</span>
            <h2 className="text-6xl font-bold text-green-400 tracking-wider mb-6">{currentCharacter.romaji}</h2>
            
            {/* Der Schreib-Text wird NUR eingeblendet, wenn der 14-Tage-Modus aktiv ist */}
            {currentCharacter.hint && totalDays === 14 && (
              <p className="text-sm text-yellow-400 font-medium px-4 border-t border-gray-600 pt-4">
                {currentCharacter.hint}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-8xl font-bold text-white tracking-widest mb-4">{currentCharacter.kana}</h1>
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
            handleNextCard(false); // Nochmal
          }}
        >
          Nochmal
        </button>
        <button 
          className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all"
          onClick={(e) => { 
            e.stopPropagation(); 
            handleNextCard(true); // Sitzt
          }}
        >
          Sitzt
        </button>
      </div>

    </div>
  );
};

export default KanaCard;