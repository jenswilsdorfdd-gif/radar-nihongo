import React from 'react';
import { kanaData } from '../data/kanaData';

const KanaDeck = ({ currentDay, totalDays, mode, onBackToHome, onStartDay }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isWrite = mode === 'write';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Navigation & Modus-Anzeige */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; Hauptmenü
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isWrite ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
          Modus: {isWrite ? 'Schreiben' : 'Lesen'}
        </span>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <h1 className={`text-3xl font-bold text-center mb-2 tracking-wider ${isWrite ? 'text-blue-400' : 'text-green-400'}`}>
          KANA DECK
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {isWrite ? 'Zeichen-Training' : 'Zeichen-Erkennung'}: Tag {currentDay} von {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className={`${isWrite ? 'bg-blue-500' : 'bg-green-500'} h-full transition-all duration-500`} 
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamische System-Einweisung je nach Lernmodus */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className={`${isWrite ? 'text-blue-400' : 'text-green-400'} font-bold mb-4 tracking-wide uppercase text-sm`}>
          System-Einweisung
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          {isWrite ? (
            <>
              <li>
                <strong className="text-white block mb-1">▶ Präzisionstraining</strong>
                Zeichne das geforderte Kana aus dem Gedächtnis auf das Display. Nutze den Finger oder einen Stylus.
              </li>
              <li>
                <strong className="text-white block mb-1">▶ Strenge Bewertung</strong>
                Beim Prüfen wird das perfekte Zeichen über deine Skizze gelegt. Sei ehrlich zu dir selbst: Wenn die Proportionen nicht stimmen, klicke auf "Nochmal".
              </li>
            </>
          ) : (
            <>
              <li>
                <strong className="text-white block mb-1">▶ Visuelles Training</strong>
                Präge dir das Zeichen ein und nutze die Beispielsätze, um ein Gefühl für echte japanische Wörter zu bekommen.
              </li>
              <li>
                <strong className="text-white block mb-1">▶ Auditives Lernen</strong>
                Klicke auf die kleinen 🔊-Buttons, um dir die exakte Aussprache anzuhören. Sprich die Vokabeln und Sätze laut mit!
              </li>
            </>
          )}
          <li className="pt-3 border-t border-gray-700">
            <strong className={isWrite ? 'text-blue-400' : 'text-green-400'}>Mechanik:</strong> Bei "Nochmal" wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist.
          </li>
        </ul>
      </div>

      {/* Das Raster (14 Kacheln mit Gruppen-Titel!) */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          const deckInfo = kanaData[day];

          let btnClass = "py-3 px-2 rounded-xl font-bold transition-transform flex flex-col items-center justify-center text-center ";
          
          if (isCurrent) {
            btnClass += isWrite 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 cursor-pointer active:scale-95" 
              : "bg-green-600 text-white shadow-lg shadow-green-500/50 cursor-pointer active:scale-95";
          } else if (isCompleted) {
            btnClass += isWrite 
              ? "bg-gray-700 text-blue-400 border border-blue-500/30 cursor-pointer active:scale-95" 
              : "bg-gray-700 text-green-400 border border-green-500/30 cursor-pointer active:scale-95";
          } else {
            btnClass += "bg-gray-800 text-gray-600 cursor-not-allowed";
          }

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={btnClass}
            >
              <span className="text-lg">Tag {day}</span>
              {/* Hier wird der Titel der Gruppe aus kanaData geladen */}
              {deckInfo?.title && (
                <span className="text-[0.65rem] opacity-80 mt-1 uppercase tracking-wider leading-tight">
                  {deckInfo.title}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanaDeck;