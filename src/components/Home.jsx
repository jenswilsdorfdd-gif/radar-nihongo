import React, { useEffect, useRef } from 'react';

const Home = ({ onSelectMode, onReset, onGoToWelcome, kanaReadDay, kanaWriteDay, radarDay, kanjiDay, language }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // WÖRTERBUCH
  const texts = {
    de: {
      reset: "Reset",
      subtitle: "Nippon Survival System",
      phase1ReadTitle: "Phase 1: Kana (Lesen)",
      phase1ReadDesc: "Visuelles Zeichentraining. Die absolute Basis für das Gehirn.",
      phase1WriteTitle: "Phase 1: Kana (Schreiben)",
      phase1WriteDesc: "Die Meisterklasse. Präge dir die exakte Linienführung ein.",
      phase2Title: "Phase 2: 21-Tage-Radar",
      phase2Desc: "Stresstest, Wortschatz und Reaktion für das Überleben im Alltag.",
      phase3Title: "Phase 3: Kanji N5",
      phase3Desc: "Lerne Bedeutung, Lesung und Anwendung komplexer Zeichen.",
      day: "Tag"
    },
    en: {
      reset: "Reset",
      subtitle: "Nippon Survival System",
      phase1ReadTitle: "Phase 1: Kana (Read)",
      phase1ReadDesc: "Visual character training. The absolute basis for your brain.",
      phase1WriteTitle: "Phase 1: Kana (Write)",
      phase1WriteDesc: "The masterclass. Memorize the exact stroke order.",
      phase2Title: "Phase 2: 21-Day Radar",
      phase2Desc: "Stress test, vocabulary, and reaction for everyday survival.",
      phase3Title: "Phase 3: Kanji N5",
      phase3Desc: "Learn meaning, reading, and application of complex characters.",
      day: "Day"
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div ref={containerRef} className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
      
      <div className="absolute top-6 right-6 z-10">
        <button onClick={onReset} className="text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase">
          {t.reset}
        </button>
      </div>

      <button 
        onClick={onGoToWelcome}
        className="mt-12 mb-10 flex flex-col items-center group cursor-pointer transition-transform active:scale-95 focus:outline-none"
      >
        <div className="w-20 h-20 bg-gray-800 rounded-3xl border border-green-500/30 group-hover:border-green-400 flex items-center justify-center shadow-lg shadow-green-500/10 mb-4 transition-colors">
          <span className="text-5xl">⛩️</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">RADAR</h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase group-hover:text-gray-300 transition-colors">{t.subtitle}</p>
      </button>

      <div className="w-full max-w-sm space-y-4 pb-12">
        
        {/* Phase 1: KANA LESEN */}
        <button 
          onClick={() => onSelectMode('kana-read')}
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{t.phase1ReadTitle}</h2>
            <span className="text-green-500 text-sm font-bold">{t.day} {kanaReadDay}/14</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase1ReadDesc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${(kanaReadDay / 14) * 100}%` }}></div>
          </div>
        </button>

        {/* Phase 1: KANA SCHREIBEN */}
        <button 
          onClick={() => onSelectMode('kana-write')}
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{t.phase1WriteTitle}</h2>
            <span className="text-blue-500 text-sm font-bold">{t.day} {kanaWriteDay}/14</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase1WriteDesc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(kanaWriteDay / 14) * 100}%` }}></div>
          </div>
        </button>

        {/* Phase 2: RADAR */}
        <button 
          onClick={() => onSelectMode('radar')}
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{t.phase2Title}</h2>
            <span className="text-yellow-500 text-sm font-bold">{t.day} {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase2Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${(radarDay / 21) * 100}%` }}></div>
          </div>
        </button>

        {/* Phase 3: KANJI */}
        <button 
          onClick={() => onSelectMode('kanji')}
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{t.phase3Title}</h2>
            <span className="text-purple-500 text-sm font-bold">{t.day} {kanjiDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase3Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(kanjiDay / 21) * 100}%` }}></div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Home;