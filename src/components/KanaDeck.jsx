import React from 'react';

const KanaDeck = ({ currentDay, totalDays, setTotalDays, onBackToHome, onStartDay }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Navigation & Modus-Weiche */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Hauptmenü
        </button>

        <div className="flex gap-1 bg-gray-800 p-1 rounded-lg">
          <button 
            onClick={() => setTotalDays(7)}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${totalDays === 7 ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            7 TAGE
          </button>
          <button 
            onClick={() => setTotalDays(14)}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${totalDays === 14 ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            14 TAGE
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-green-400">KANA DECK</h1>
        <p className="text-gray-400 text-center mb-4">Zeichen-Erkennung: Tag {currentDay} von {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* NEU: Die Lerninhaltbeschreibung (Info-Box) */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className="text-green-400 font-bold mb-4 tracking-wide uppercase text-sm">
          System-Einweisung
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li>
            <strong className="text-white block mb-1">▶ 14 Tage (Starter & Intensivlerner)</strong>
            Der perfekte Start. Inklusive geführter Schreibübungen und mentaler Eselsbrücken zur tiefen Verankerung. <span className="text-yellow-400">Zettel und Stift bereithalten!</span>
          </li>
          <li>
            <strong className="text-white block mb-1">▶ 7 Tage (Fortgeschrittene & Wiederholer)</strong>
            Der Speedrun. Reines visuelles Erkennen und mentales Training ohne Schreibteil. Ideal zum Auffrischen.
          </li>
          <li className="pt-3 border-t border-gray-700">
            <strong className="text-green-400">Mechanik:</strong> Karte antippen zum Aufdecken. Bei "Nochmal" wandert die Karte gnadenlos ans Ende des Stapels. Der Tag ist erst beendet, wenn der Stapel leer ist.
          </li>
        </ul>
      </div>

      {/* Das Raster (7 oder 14 Kacheln) */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={`py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 flex flex-col items-center justify-center
                ${isCurrent ? 'bg-green-600 text-white shadow-lg shadow-green-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-green-400 border border-green-500/30 cursor-pointer' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span>Tag</span>
              <span>{day}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanaDeck;