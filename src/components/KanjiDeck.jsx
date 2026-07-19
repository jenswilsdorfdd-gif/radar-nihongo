import React from 'react';

const KanjiDeck = ({ currentDay, onBackToHome, onStartDay }) => {
  const totalDays = 21; // Auf 21 Tage N5 Level angepasst
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Hauptmenü
        </button>
      </div>

      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-purple-400">KANJI DECK</h1>
        <p className="text-gray-400 text-center mb-4">Starter N5 Level: Tag {currentDay > totalDays ? totalDays : currentDay} von {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className="text-purple-400 font-bold mb-2 tracking-wide uppercase text-sm">
          System-Einweisung: Kanji
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          Japanische Symbole bestehen aus Form, Bedeutung und Lesung. Lerne hier die 121 wichtigsten N5-Kanji aus dem Radar-System.
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white block mb-1">▶ Kopfkino & Kontext</strong>
          Nutze die Eselsbrücken, um dir das Zeichen einzuprägen. Beim Umdrehen zeigt dir das System echte japanische Beispielsätze (inkl. Lesehilfen und Audio).
        </p>
        <p className="text-sm text-gray-300 leading-relaxed pt-3 border-t border-gray-700">
          <strong className="text-purple-400">Mechanik:</strong> Bei "Nochmal" wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist.
        </p>
      </div>

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
                ${isCurrent ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-purple-400 border border-purple-500/30 cursor-pointer' : ''}
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

export default KanjiDeck;