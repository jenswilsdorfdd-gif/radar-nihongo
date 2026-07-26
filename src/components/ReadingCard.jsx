import React, { useState, useEffect } from 'react';
import { readingData } from '../data/readingData';

const ReadingCard = ({ day, onBack, language }) => {
  const deckInfo = readingData[day];
  
  const texts = {
    de: {
      back: "Flow-Deck",
      remaining: "Übrig:",
      revealTrans: "Übersetzung aufdecken",
      next: "Nächster Funkspruch",
      finishTitle: "Szenario abgeschlossen",
      finishSub: "Hervorragend gelesen!",
      backToMenu: "Zurück zum Deck",
      error: "Keine Daten gefunden."
    },
    en: {
      back: "Flow Deck",
      remaining: "Remaining:",
      revealTrans: "Reveal translation",
      next: "Next Message",
      finishTitle: "Scenario completed",
      finishSub: "Excellent reading!",
      backToMenu: "Back to Deck",
      error: "No data found."
    }
  };

  const t = texts[language] || texts.de;

  if (!deckInfo) {
    return <div className="text-white text-center mt-20">{t.error}</div>;
  }

  const [queue, setQueue] = useState([...deckInfo.sentences]);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setQueue([...deckInfo.sentences]);
    setIsFinished(false);
    setShowTranslation(false);
  }, [day, deckInfo]);

  const currentSentence = queue[0];

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (queue.length <= 1) {
      setIsFinished(true);
    } else {
      setQueue(prev => prev.slice(1));
      setShowTranslation(false);
    }
  };

  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    const parts = text.split(/([^\s]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^{]+){([^}]+)}/);
      if (match) {
        return (
          <ruby key={i} className="px-1">
            {match[1]}
            <rt className="text-[0.5em] text-cyan-300">{match[2]}</rt>
          </ruby>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (isFinished) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-cyan-900/30 border-2 border-cyan-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">{t.finishTitle}</h1>
        <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-12">{t.finishSub}</h2>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest">
          {t.backToMenu}
        </button>
      </div>
    );
  }

  const translationText = language === 'en' ? currentSentence.translationEn : currentSentence.translationDe;

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-cyan-500 text-xs font-bold">{t.remaining} {queue.length}</span>
      </div>

      <div className="w-full max-w-sm mx-auto mt-12 flex flex-col items-center">
        
        {/* TELEPROMPTER BOX */}
        <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[350px] relative">
          
          <div className="text-center w-full flex-1 flex flex-col items-center justify-center">
            {/* Der japanische Text mit Lesehilfen (Furigana) */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-loose tracking-wide mb-8">
              {renderTextWithFurigana(currentSentence.text)}
            </h2>
            
            {/* AUDIO BUTTON */}
            <button 
              onClick={() => playAudio(currentSentence.text)}
              className="w-16 h-16 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg active:scale-90 border border-cyan-500/30 mb-8"
            >
              🔊
            </button>

            {/* ÜBERSETZUNG (ON DEMAND) */}
            <div className="w-full min-h-[40px] flex items-center justify-center">
              {!showTranslation ? (
                <button 
                  onClick={() => setShowTranslation(true)}
                  className="text-xs text-gray-500 hover:text-gray-300 uppercase tracking-widest font-bold border-b border-gray-600 pb-1"
                >
                  {t.revealTrans}
                </button>
              ) : (
                <p className="text-sm text-yellow-400 font-medium italic animate-fade-in px-4">
                  "{translationText}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* WEITER BUTTON */}
        <button 
          onClick={handleNext} 
          className="w-full mt-8 py-5 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
        >
          {t.next} &rarr;
        </button>

      </div>
    </div>
  );
};

export default ReadingCard;