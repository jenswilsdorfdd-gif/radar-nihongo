import React from 'react';
import { radarMissions } from '../data/vocabData';

const Dashboard = ({ currentDay, onStartDay, onBackToHome }) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  
  // Lädt die Mission für den aktuellen Tag oder eine Erfolgsmeldung, wenn alles abgeschlossen ist
  const currentMission = radarMissions[currentDay] || "System erfolgreich abgeschlossen! Du bist bereit für Japan.";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Zurück-Button */}
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Hauptmenü
        </button>
      </div>

      {/* Header & Fortschritt */}
      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-blue-400">RADAR SYSTEM</h1>
        <p className="text-gray-400 text-center mb-4">Überlebens-Training: Tag {currentDay > 21 ? 21 : currentDay} von 21</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, 21) / 21) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Die System-Einweisung für Phase 2 */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-700 shadow-lg">
        <h2 className="text-blue-400 font-bold mb-4 tracking-wide uppercase text-sm">
          System-Einweisung: Die eiserne Struktur
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li>
            <strong className="text-white block mb-1">🌙 Abend-Routine (30 Min)</strong>
            Ungeteilte Konzentration am Schreibtisch. Visuelle, kognitive und motorische Verankerung der Muster.
          </li>
          <li>
            <strong className="text-white block mb-1">☀️ Morgen-Routine (15 Min)</strong>
            Transfer in die Realität. Sie trainieren im Gehen, Handeln und Denken.
          </li>
          <li className="pt-3 border-t border-gray-700">
            <strong className="text-blue-400">Regel:</strong> Kein Zurückgreifen auf Romaji. Sie arbeiten ausschließlich mit japanischen Kana und der deutschen Bedeutung.
          </li>
        </ul>
      </div>

      {/* Die tagesaktuelle Mission */}
      {currentDay <= 21 && (
        <div className="w-full max-w-md bg-blue-900/30 rounded-2xl p-5 mb-8 border border-blue-500/30 shadow-lg">
          <h2 className="text-blue-400 font-bold mb-2 tracking-wide uppercase text-sm">
            Tages-Mission: Tag {currentDay}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed italic">
            "{currentMission}"
          </p>
        </div>
      )}

      {/* Das 21-Tage Raster */}
      <div className="w-full max-w-md grid grid-cols-3 gap-4 mb-8">
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
                ${isCurrent ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-blue-400 border border-blue-500/30 cursor-pointer' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span>Tag</span>
              <span>{day}</span>
            </button>
          );
        })}
      </div>

      {/* Der permanente Fokus-Button für Notfälle */}
      <div className="w-full max-w-md mt-auto pb-4">
        <button 
          onClick={() => onStartDay('emergency')}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 active:scale-95 transition-all"
        >
          NOTFALL-SCAN: トイレ / えき
        </button>
      </div>

    </div>
  );
};

export default Dashboard;