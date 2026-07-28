import React, { useState, useEffect } from 'react';
import { readingData } from '../data/readingData';

const ReadingCard = ({ day, onBack, language }) => {
  const deckInfo = readingData[day];
  
  const texts = {
    de: {
      back: "Flow-Deck",
      remaining: "Übrig:",
      revealTrans: "Übersetzung aufdecken",
      next: "Nächster Text",
      finishTitle: "Szenario abgeschlossen",
      finishSub: "Hervorragend gelesen!",
      backToMenu: "Zurück zum Deck",
      error: "Keine Daten gefunden."
    },
    en: {
      back: "Flow Deck",
      remaining: "Remaining:",
      revealTrans: "Reveal translation",
      next: "Next Text",
      finishTitle: "Scenario completed",
      finishSub: "Excellent reading!",
      backToMenu: "Back to Deck",
      error: "No data found."
    }
  };

  const t = texts[language] || texts.de;

  // Das Lexikon für den Smart-Scanner (Tooltips)
  const particleInfo = {
    "は": { de: "Thema ('Was ... angeht')", en: "Topic ('As for...')" },
    "を": { de: "Objekt (Ziel der Handlung)", en: "Object (Target of action)" },
    "に": { de: "Ziel/Zeit (Wohin/Wann)", en: "Target/Time (Where to/When)" },
    "で": { de: "Ort/Mittel (Wo/Womit)", en: "Location/Means (Where/With what)" },
    "が": { de: "Subjekt (Wer/Was)", en: "Subject (Who/What)" },
    "と": { de: "Mit/Und (Zusammen mit)", en: "With/And (Together with)" },
    "へ": { de: "Richtung (Nach/Zu)", en: "Direction (Towards)" },
    "から": { de: "Start (Von/Aus/Ab)", en: "Starting point (From/Since)" },
    "まで": { de: "Endpunkt (Bis)", en: "Ending point (Until/Up to)" }
  };

  // Smarter Regex-Scanner (Geupdatet für N5-Ausnahmen wie asagohan, totemo, densha etc.)
  const particleRegex = /(から|まで|を|は(?![いじんらかきし])|が(?![っつお])|に(?![くもちほんぎ])|で(?![すしんき])|と(?![もてけきこ])|へ)/g;

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

  // FURIGANA & PARTIKEL RENDERER (Furigana Zentrierung optimiert)
  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    
    // 1. Zuerst nach Furigana splitten, damit wir Wörter in {} nicht zerstören
    const parts = text.split(/([^\s、。！？「」]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^\s、。！？「」]+){([^}]+)}/);
      
      if (match) {
        // Normaler Furigana-Block (Zentriert und Padding repariert)
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-cyan-300 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      
      // 2. Normaler Textblock: Hier wird der Smart-Scanner auf Partikel losgelassen
      const subParts = part.split(particleRegex);
      return subParts.map((sub, j) => {
        if (particleInfo[sub]) {
          return (
            <span key={`${i}-${j}`} className="relative group inline-block cursor-help text-orange-400 font-extrabold mx-[2px] transition-colors hover:text-orange-300">
              {sub}
              
              {/* TOOLTIP BOX */}
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-gray-900 text-gray-200 text-xs sm:text-sm p-3 rounded-xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-relaxed font-sans font-normal whitespace-normal block">
                <span className="block text-orange-400 font-bold mb-1 border-b border-gray-700 pb-1 text-lg leading-none">{sub}</span>
                {particleInfo[sub][language]}
                
                {/* Kleiner Pfeil nach unten am Tooltip */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500/50"></span>
              </span>
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sub}</span>;
      });
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
        
        <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[350px] relative">
          
          <div className="text-center w-full flex-1 flex flex-col items-center justify-center">
            
            {/* Hier wird die neue render-Funktion aufgerufen */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-loose tracking-wide mb-8" style={{ wordBreak: 'break-word' }}>
              {renderTextWithFurigana(currentSentence.text)}
            </h2>
            
            <button 
              onClick={() => playAudio(currentSentence.text)}
              className="w-16 h-16 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg active:scale-90 border border-cyan-500/30 mb-8"
            >
              🔊
            </button>

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