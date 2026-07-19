import React, { useState } from 'react';
import { radarData } from '../data/radarData';

const Flashcard = ({ day, onBack }) => {
  const [queue, setQueue] = useState(() => {
    const data = radarData[day];
    return data ? [...data] : [{ context: "Keine Daten", userTask: "Tag fehlt." }];
  });
  
  // step 1: Szenario -> step 2: Audio & Multiple Choice -> step 3: Auflösung
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const currentScenario = queue[0];

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartListening = () => {
    setStep(2);
    playAudio(currentScenario.npcReply);
  };

  const handleOptionSelect = (index) => {
    setSelectedIndex(index);
    setStep(3);
  };

  const handleNextCard = () => {
    const isCorrect = selectedIndex === currentScenario.correctIndex;
    if (isCorrect) {
      // Karte fliegt aus dem Deck
      if (queue.length <= 1) {
        onBack();
      } else {
        setQueue(prev => prev.slice(1));
        resetState();
      }
    } else {
      // Falsch: Karte wandert ans Ende
      setQueue(prev => [...prev.slice(1), prev[0]]);
      resetState();
    }
  };

  const resetState = () => {
    setStep(1);
    setSelectedIndex(null);
  };

  // Hilfsfunktion: Hebt das Keyword im Satz farblich hervor
  const renderHighlightedText = (text, keyword, isCorrect) => {
    if (!text || !keyword) return text;
    const parts = text.split(keyword);
    const highlightColor = isCorrect ? 'text-green-400' : 'text-red-400';
    
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className={`font-extrabold text-2xl px-1 ${highlightColor}`}>
                {keyword}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (!currentScenario.userSpeech) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-yellow-500 mb-4">Noch keine Missionen für Tag {day}</h2>
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold">Zurück</button>
      </div>
    );
  }

  const isAnswerCorrect = selectedIndex === currentScenario.correctIndex;

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Header */}
      <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex justify-between items-center z-10 w-full max-w-sm mx-auto">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; Radar-Deck
        </button>
        <span className="text-yellow-500 text-xs sm:text-sm font-bold">
          Einsatz {day} | Übrig: {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mx-auto mt-12 flex flex-col items-center">
        
        {/* PHASE 1: SITUATION */}
        <div className="w-full bg-gray-800 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-lg mb-4">
          <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-2">Szenario</p>
          <p className="text-gray-300 text-sm">{currentScenario.context}</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-white font-bold">{currentScenario.userTask}</p>
          </div>
        </div>

        {/* DEIN EINSATZ (Ab Phase 2 sichtbar) */}
        {step >= 2 && (
          <div className="w-full bg-blue-900/20 rounded-2xl p-6 border border-blue-500/30 mb-4 animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase">Du sagst:</p>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{currentScenario.userSpeech}</p>
            <p className="text-xs text-gray-400">{currentScenario.userRomaji}</p>
          </div>
        )}

        {/* PHASE 2: AUDIO & MULTIPLE CHOICE */}
        {step === 2 && (
          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4 animate-fade-in text-center">
            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">Gegenüber antwortet</p>
            
            <button 
              onClick={() => playAudio(currentScenario.npcReply)} 
              className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto hover:bg-red-600/40 active:scale-95 transition-all"
            >
              🔊
            </button>
            <p className="text-sm text-gray-300 mb-6 italic">Audio genau anhören. Welche Information hast du erkannt?</p>

            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white text-left transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: AUFLÖSUNG & KONTROLLE */}
        {step === 3 && (
          <div className={`w-full rounded-2xl p-6 border mb-4 animate-fade-in relative overflow-hidden ${isAnswerCorrect ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <p className={`text-xs font-bold tracking-widest uppercase ${isAnswerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isAnswerCorrect ? 'Ziel erfasst' : 'Fehlerhafte Ortung'}
              </p>
              <button onClick={() => playAudio(currentScenario.npcReply)} className="text-gray-400 hover:text-white text-lg">🔊</button>
            </div>

            {/* Schriftform zur Nachkontrolle mit farbigem Keyword */}
            <p className="text-xl text-white mb-2 leading-relaxed">
              {renderHighlightedText(currentScenario.npcReply, currentScenario.keyword, isAnswerCorrect)}
            </p>
            
            <p className="text-xs text-gray-400 mb-4">{currentScenario.npcRomaji}</p>
            <p className="text-sm text-gray-300 italic border-t border-gray-700/50 pt-3">
              "{currentScenario.npcTranslation}"
            </p>
          </div>
        )}

      </div>

      {/* STEUERUNG (Nur Phase 1 & 3) */}
      <div className="w-full max-w-[22rem] sm:max-w-sm mt-4 mx-auto">
        {step === 1 && (
          <button onClick={handleStartListening} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20">
            Meinen Satz prüfen & Hören
          </button>
        )}
        
        {step === 3 && (
          <button onClick={handleNextCard} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-gray-900/50">
            {isAnswerCorrect ? 'Sitzt (Nächste Karte)' : 'Nochmal (Ans Ende)'}
          </button>
        )}
      </div>

    </div>
  );
};

export default Flashcard;