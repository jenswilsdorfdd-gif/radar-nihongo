import React from 'react';

const Home = ({ onSelectMode, onReset, kanaReadDay, kanaWriteDay, radarDay, kanjiDay }) => {
  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative">
      
      {/* Reset Button Top Right */}
      <div className="absolute top-6 right-6">
        <button onClick={onReset} className="text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase">
          Reset
        </button>
      </div>

      {/* Logo Area */}
      <div className="mt-12 mb-12 flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" viewBox="0 0 100 100" fill="currentColor">
            <text y=".9em" fontSize="90">⛩️</text>
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">RADAR</h1>
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">Nippon Survival System</p>
      </div>

      {/* Navigation Cards */}
      <div className="w-full max-w-sm space-y-4">
        
        {/* Phase 1: KANA LESEN */}
        <button 
          onClick={() => onSelectMode('kana-read')}
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">Phase 1: Kana (Lesen)</h2>
            <span className="text-green-500 text-sm font-bold">Tag {kanaReadDay}/14</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Visuelles Zeichentraining. Die absolute Basis für das Gehirn.</p>
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
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Phase 1: Kana (Schreiben)</h2>
            <span className="text-blue-500 text-sm font-bold">Tag {kanaWriteDay}/14</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Die Meisterklasse. Präge dir die exakte Linienführung ein.</p>
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
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">Phase 2: 21-Tage-Radar</h2>
            <span className="text-yellow-500 text-sm font-bold">Tag {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Stresstest, Wortschatz und Reaktion für das Überleben im Alltag.</p>
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
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Phase 3: Kanji N5</h2>
            <span className="text-purple-500 text-sm font-bold">Tag {kanjiDay}/7</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Lerne Bedeutung, Lesung und Anwendung komplexer Zeichen.</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(kanjiDay / 7) * 100}%` }}></div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default Home;