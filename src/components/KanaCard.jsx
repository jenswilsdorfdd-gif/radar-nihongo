import React, { useState, useEffect } from 'react';
import { kanaData } from '../data/kanaData';
import DrawCanvas from './DrawCanvas'; 

const KanaCard = ({ day, mode, onBack, language }) => {
  const deckInfo = kanaData[day];
  
  const [queue, setQueue] = useState(() => {
    return deckInfo && deckInfo.cards ? [...deckInfo.cards] : [];
  });
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentCharacter = queue[0];
  const isWriteMode = mode === 'write';

  const [customMnemonics, setCustomMnemonics] = useState(() => {
    const saved = localStorage.getItem('customKanaMnemonics');
    return saved ? JSON.parse(saved) : {};
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  // Texte für die Sprachweiche
  const texts = {
    de: {
      back: "Deck",
      read: "Lesen",
      write: "Schreiben",
      day: "Tag",
      remaining: "Übrig:",
      noteLabel: "Trainer-Notiz:",
      drawPrompt: "Zeichne dieses Kana:",
      tip: "Tipp:",
      clickToReveal: "Klicken zum Aufdecken",
      mnemonicLabel: "Eselsbrücke",
      placeholder: "Deine eigene, verrückte Idee...",
      cancel: "Abbrechen",
      save: "Speichern",
      again: "Nochmal",
      gotIt: "Sitzt",
      errorMsg: "Keine Daten gefunden.",
      // End-Screen Texte
      finishTitle: "Mission Abgeschlossen",
      finishSub: "Hervorragende Arbeit!",
      finishFinalReadTitle: "Kana Lesen Komplett!",
      finishFinalReadSub: "Dein Auge ist geschärft.",
      finishFinalReadNext: "Weiter zu Phase 1 (Schreiben) →",
      finishFinalWriteTitle: "Kana Schreiben Komplett!",
      finishFinalWriteSub: "Du beherrschst die Zeichen.",
      finishFinalWriteNext: "Weiter zum Partikel-Code 🔑",
      backToMenu: "Zurück zum Deck"
    },
    en: {
      back: "Deck",
      read: "Read",
      write: "Write",
      day: "Day",
      remaining: "Remaining:",
      noteLabel: "Trainer Note:",
      drawPrompt: "Draw this Kana:",
      tip: "Hint:",
      clickToReveal: "Click to reveal",
      mnemonicLabel: "Mnemonic",
      placeholder: "Your own crazy idea...",
      cancel: "Cancel",
      save: "Save",
      again: "Again",
      gotIt: "Got it",
      errorMsg: "No data found.",
      // End-Screen Texts
      finishTitle: "Mission Completed",
      finishSub: "Excellent work!",
      finishFinalReadTitle: "Kana Reading Complete!",
      finishFinalReadSub: "Your eyes are sharp.",
      finishFinalReadNext: "Continue to Phase 1 (Write) →",
      finishFinalWriteTitle: "Kana Writing Complete!",
      finishFinalWriteSub: "You mastered the characters.",
      finishFinalWriteNext: "Continue to Particle Code 🔑",
      backToMenu: "Back to Deck"
    }
  };

  const t = texts[language] || texts.de;

  const displayMnemonic = currentCharacter ? (customMnemonics[currentCharacter.kana] || currentCharacter.mnemonic) : "";

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(displayMnemonic || '');
  };

  const handleSaveMnemonic = (e) => {
    e.stopPropagation();
    const newMnemonics = { ...customMnemonics };
    
    if (editValue.trim() === '') {
      delete newMnemonics[currentCharacter.kana];
    } else {
      newMnemonics[currentCharacter.kana] = editValue;
    }
    
    setCustomMnemonics(newMnemonics);
    localStorage.setItem('customKanaMnemonics', JSON.stringify(newMnemonics));
    setIsEditing(false);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

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
    setIsEditing(false); 
    if (success) {
      if (queue.length <= 1) {
        setIsFinished(true); // Schaltet auf den End-Screen um
      } else {
        setQueue(prev => prev.slice(1));
        setIsFlipped(false);
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
    }
  };

  // --- END SCREENS ---
  if (isFinished) {
    // Wenn es der letzte Tag (14) ist
    if (day === 14) {
      if (!isWriteMode) {
        // Tag 14 LESEN abgeschlossen
        return (
          <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-24 h-24 bg-green-900/30 border-4 border-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">👁️</div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalReadTitle}</h1>
            <h2 className="text-green-400 font-bold tracking-widest uppercase mb-12 text-center">{t.finishFinalReadSub}</h2>
            <div className="w-full max-w-sm space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 uppercase tracking-widest active:scale-95 transition-all">
                {t.finishFinalReadNext}
              </button>
            </div>
          </div>
        );
      } else {
        // Tag 14 SCHREIBEN abgeschlossen
        return (
          <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-24 h-24 bg-blue-900/30 border-4 border-blue-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(59,130,246,0.4)]">✍️</div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalWriteTitle}</h1>
            <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-12 text-center">{t.finishFinalWriteSub}</h2>
            <div className="w-full max-w-sm space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 uppercase tracking-widest active:scale-95 transition-all">
                {t.finishFinalWriteNext}
              </button>
            </div>
          </div>
        );
      }
    }

    // Normaler End-Screen (Tage 1-13)
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-green-400 font-bold tracking-widest uppercase mb-12 text-center">{t.finishSub}</h2>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          {t.backToMenu}
        </button>
      </div>
    );
  }

  if (!currentCharacter) {
    return <div className="text-white text-center mt-20">{t.errorMsg}</div>;
  }

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* HEADER */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 sm:px-6 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase bg-gray-800 px-3 py-1 rounded-full">
          {isWriteMode ? t.write : t.read}
        </span>
        <span className={`${isWriteMode ? 'text-blue-500' : 'text-green-500'} text-xs sm:text-sm font-bold`}>
          {t.day} {day} | {t.remaining} {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto mt-12 mb-4">
        {deckInfo?.note && (
          <div className="bg-blue-900/40 border border-blue-500/50 p-4 rounded-xl text-sm text-blue-200 shadow-lg mb-4">
            <strong className="text-blue-400 block mb-1 uppercase tracking-wider text-xs">💡 {t.noteLabel}</strong> 
            {deckInfo.note}
          </div>
        )}
      </div>

      {isWriteMode ? (
        <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto flex flex-col items-center">
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">{t.drawPrompt}</p>
            <h2 className="text-5xl font-bold text-white tracking-widest mb-1">{currentCharacter.romaji}</h2>
            {currentCharacter.vocab && (
              <p className="text-blue-400 text-sm font-medium">{t.tip} {currentCharacter.vocabMeaning}</p>
            )}
          </div>
          
          <div className="w-full">
            <DrawCanvas character={currentCharacter.kana} onResult={handleNextCard} />
          </div>
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
                <p className="text-gray-500 text-xs uppercase tracking-widest">{t.clickToReveal}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center w-full h-full overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h2 className="text-5xl font-bold text-green-400 mb-1">{currentCharacter.kana}</h2>
                  <span className="text-gray-400 text-lg uppercase tracking-widest">{currentCharacter.romaji}</span>
                </div>
                
                {(displayMnemonic || isEditing) && (
                  <div className="w-full bg-blue-900/30 border border-blue-500/40 rounded-xl p-3 mb-4 text-center">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-6"></div> 
                      <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">
                        {t.mnemonicLabel}
                      </p>
                      {!isEditing ? (
                        <button 
                          onClick={handleEditClick} 
                          className="w-6 h-6 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600 rounded-md transition-colors"
                          title="Eigene Eselsbrücke eintragen"
                        >
                          ✏️
                        </button>
                      ) : (
                        <div className="w-6"></div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex flex-col gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-gray-900 text-white text-sm p-3 rounded-lg border border-blue-500/50 focus:border-blue-400 focus:outline-none resize-none leading-relaxed"
                          rows="3"
                          placeholder={t.placeholder}
                        />
                        <div className="flex justify-end gap-2 mt-1">
                          <button onClick={handleCancelEdit} className="text-xs px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-bold transition-colors">{t.cancel}</button>
                          <button onClick={handleSaveMnemonic} className="text-xs px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-colors shadow-lg">{t.save}</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-200 text-sm font-medium italic leading-relaxed px-1">
                        "{displayMnemonic}"
                      </p>
                    )}
                  </div>
                )}
                
                {currentCharacter.vocab && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-2">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      {/* WHITESPACE-NOWRAP FIX für Vokabeln */}
                      <p className="text-xl font-bold text-white whitespace-nowrap">{currentCharacter.vocab}</p>
                      <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.vocab); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full active:scale-90 transition-transform">🔊</button>
                    </div>
                    <p className="text-sm text-yellow-400 font-medium mt-1 break-words">{currentCharacter.vocabMeaning}</p>
                  </div>
                )}
                
                {currentCharacter.sentence && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-4">
                    <div className="flex flex-col items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {/* BREAK-KEEP FIX für Sätze */}
                        <p className="text-sm sm:text-base font-bold text-white leading-relaxed text-center break-keep" style={{ wordBreak: 'keep-all' }}>{currentCharacter.sentence}</p>
                        <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.sentence); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full flex-shrink-0 active:scale-90 transition-transform">🔊</button>
                      </div>
                    </div>
                    <p className="text-xs text-blue-300 font-medium italic mt-1 break-words">"{currentCharacter.sentenceTranslation}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={`w-full max-w-[20rem] sm:max-w-sm mt-8 mx-auto grid grid-cols-2 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all shadow-lg" onClick={(e) => { e.stopPropagation(); handleNextCard(false); }}>{t.again}</button>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all shadow-lg" onClick={(e) => { e.stopPropagation(); handleNextCard(true); }}>{t.gotIt}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanaCard;