import React from 'react';

const Home = ({ onSelectMode, onReset, kanaDay, kanaTotal, radarDay, kanjiDay }) => {
  const getProgress = (current, total) => `${(Math.min(current, total) / total) * 100}%`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative">
      
      <button 
        onClick={onReset}
        className="absolute top-6 right-6 text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors"
      >
        Reset
      </button>

      {/* --- NEUER LOGO UND TITEL BEREICH --- */}
      <div className="mb-12 text-center mt-8 flex flex-col items-center">
        
        {/* Die Logo-Box */}
        <div className="w-24 h-24 bg-gray-800 rounded-3xl border-2 border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/20 mb-6 relative overflow-hidden group">
          
          {/* Variante 1: Emoji (Aktuell aktiv) */}
          <span className="text-5xl group-hover:scale-110 transition-transform cursor-default select-none">⛩️</span>

          {/* Variante 2: Echtes Bild (Deaktiviert)
              Wenn du ein eigenes Logo hast: Lade es in den Ordner "public" hoch, nenne es "logo.png",
              lösche die <span> Zeile oben und entferne die // vor der nächsten Zeile: */}
          {/* <img src="/logo.png" alt="RADAR Logo" className="w-full h-full object-cover" /> */}
          
        </div>

        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">
          RADAR
        </h1>
        <p className="text-gray-500 tracking-widest text-sm uppercase">Nippon Survival System</p>
      </div>
      {/* ------------------------------------- */}

      <div className="w-full max-w-sm space-y-4 pb-8">
        
        <button 
          onClick={() => onSelectMode('kana')}
          className="w-full bg-gray-800 hover:bg-gray-700 text-left p-5 rounded-2xl shadow-lg border-2 border-transparent focus:border-green-500 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-green-400">Phase 1: Kana-Deck</h2>
            <span className="text-green-500 font-bold text-sm">
              Tag {kanaDay > kanaTotal ? kanaTotal : kanaDay}/{kanaTotal}
            </span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            Visuelles Zeichentraining. Die absolute Basis für das Gehirn.
          </p>
          <div className="w-full bg-gray-900 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: getProgress(kanaDay, kanaTotal) }}></div>
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('radar')}
          className="w-full bg-gray-800 hover:bg-gray-700 text-left p-5 rounded-2xl shadow-lg border-2 border-transparent focus:border-blue-500 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-blue-400">Phase 2: 21-Tage-Radar</h2>
            <span className="text-blue-500 font-bold text-sm">
              Tag {radarDay > 21 ? 21 : radarDay}/21
            </span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            Stresstest, Wortschatz und Reaktion für das Überleben im Alltag.
          </p>
          <div className="w-full bg-gray-900 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: getProgress(radarDay, 21) }}></div>
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('kanji')}
          className="w-full bg-gray-800 hover:bg-gray-700 text-left p-5 rounded-2xl shadow-lg border-2 border-transparent focus:border-purple-500 active:scale-95 transition-all group relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xl font-bold text-purple-400">Phase 3: Kanji N5</h2>
            <span className="text-purple-500 font-bold text-sm">
              Tag {kanjiDay > 7 ? 7 : kanjiDay}/7
            </span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            Meisterklasse. Lerne Bedeutung, Lesung und Anwendung komplexer Zeichen.
          </p>
          <div className="w-full bg-gray-900 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: getProgress(kanjiDay, 7) }}></div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Home;