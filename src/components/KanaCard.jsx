import React, { useState } from 'react';
import { kanaData } from '../data/kanaData';
import DrawCanvas from './DrawCanvas'; 

const KanaCard = ({ day, mode, onBack }) => {
  const deckInfo = kanaData[day];
  
  const [queue, setQueue] = useState(() => {
    return deckInfo && deckInfo.cards ? [...deckInfo.cards] : [{ kana: "ー", romaji: "Keine Daten für diesen Tag" }];
  });
  
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCharacter = queue[0];
  const isWriteMode = mode === 'write';

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
    if (!isFlipped && !isWriteMode) {
      setIsFlipped(true);
      playAudio(currentCharacter.kana);
    }
  };

  const handleNextCard = (success) => {
    if (success) {
      if (queue.length <= 1) onBack();
      else { setQueue(prev => prev.slice(1)); setIsFlipped(false); }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex justify-between items-center z-10 w-full max-w-sm mx-auto">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; Deck
        </button>
        <span className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase bg-gray-800 px-3 py-1 rounded-full">
          {isWriteMode ? 'Schreiben' : 'Lesen'}
        </span>
        <span className={`${isWriteMode ? 'text-blue-500' : 'text-green-500'} text-xs sm:text-sm font-bold`}>
          Tag {day} | Übrig: {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto mt-12 mb-4">
        {deckInfo?.note && (
          <div className="bg-blue-900/40 border border-blue-500/50 p-4 rounded-xl text-sm text-blue-200 shadow-lg mb-4">
            <strong className="text-blue-400 block mb-1 uppercase tracking-wider text-xs">💡 Trainer-Notiz:</strong> 
            {deckInfo.note}
          </div>
        )}
      </div>

      {isWriteMode ? (
        <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Zeichne dieses Kana:</p>
            <h2 className="text-5xl font-bold text-white tracking-widest mb-1">{currentCharacter.romaji}</h2>
            {currentCharacter.vocab && (
              <p className="text-blue-400 text-sm font-medium">Tipp: {currentCharacter.vocabMeaning}</p>
            )}
          </div>
          <DrawCanvas character={currentCharacter.kana} onResult={handleNextCard} />
        </div>
      ) : (
        <>
          <div 
            className={`w-full max-w-[20rem] sm:max-w-sm min-h-[24rem] mx-auto rounded-3xl shadow-2xl flex flex-col items-center p-6 sm:p-8 cursor-pointer transition-all ${isFlipped ? 'bg-gray-800 border-t-4 border-blue-500/50 justify-start' : 'bg-gray-800 border-b-4 border-green-500/50 justify-center active:scale-95'}`}
            onClick={!isFlipped ? handleFlip : undefined}
          >
            {!isFlipped ? (
              <div className="flex flex-col items-center text-center px-4">
                <h1 className="text-7xl sm:text-8xl font-bold text-white tracking-widest mb-4">{currentCharacter.kana}</h1>
                <p className="text-gray-500 text-xs uppercase tracking-widest">Klicken zum Aufdecken</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center w-full h-full overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h2 className="text-5xl font-bold text-green-400 mb-1">{currentCharacter.kana}</h2>
                  <span className="text-gray-400 text-lg uppercase tracking-widest">{currentCharacter.romaji}</span>
                </div>
                
                {/* NEUE VISUELLE ESELSBRÜCKE */}
                {currentCharacter.mnemonic && (
                  <div className="w-full bg-blue-900/30 border border-blue-500/40 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-1">Eselsbrücke</p>
                    <p className="text-gray-200 text-sm font-medium italic leading-snug">"{currentCharacter.mnemonic}"</p>
                  </div>
                )}
                
                {currentCharacter.vocab && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-2">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <p className="text-xl font-bold text-white">{currentCharacter.vocab}</p>
                      <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.vocab); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full active:scale-90 transition-transform">🔊</button>
                    </div>
                    <p className="text-sm text-yellow-400 font-medium mt-1">{currentCharacter.vocabMeaning}</p>
                  </div>
                )}
                
                {currentCharacter.sentence && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">{currentCharacter.sentence}</p>
                      <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.sentence); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full flex-shrink-0 active:scale-90 transition-transform">🔊</button>
                    </div>
                    <p className="text-xs text-blue-300 font-medium italic mt-1">"{currentCharacter.sentenceTranslation}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={`w-full max-w-[20rem] sm:max-w-sm mt-8 mx-auto grid grid-cols-2 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all" onClick={(e) => { e.stopPropagation(); handleNextCard(false); }}>Nochmal</button>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all" onClick={(e) => { e.stopPropagation(); handleNextCard(true); }}>Sitzt</button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanaCard;