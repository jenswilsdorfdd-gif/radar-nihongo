import React from 'react';
import { kanaData } from '../data/kanaData';

const KanaDeck = ({ currentDay, totalDays, mode, onBackToHome, onStartDay, language }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isWrite = mode === 'write';

  // WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      modeLabel: "Modus",
      modeWrite: "Schreiben",
      modeRead: "Lesen",
      title: "KANA DECK",
      subtitleWrite: "Zeichen-Training",
      subtitleRead: "Zeichen-Erkennung",
      day: "Tag",
      of: "von",
      briefingTitle: "System-Einweisung",
      writeBullet1Title: "▶ Präzisionstraining",
      writeBullet1Desc: "Zeichne das geforderte Kana aus dem Gedächtnis auf das Display. Nutze den Finger oder einen Stylus.",
      writeBullet2Title: "▶ Strenge Bewertung",
      writeBullet2Desc: "Beim Prüfen wird das perfekte Zeichen über deine Skizze gelegt. Sei ehrlich zu dir selbst: Wenn die Proportionen nicht stimmen, klicke auf 'Nochmal'.",
      readBullet1Title: "▶ Visuelles Training & Kopfkino",
      readBullet1Desc: "Präge dir das Zeichen über die visuellen Eselsbrücken ein! Du hast ein besseres Bild im Kopf? Klicke auf das ✏️-Symbol auf der Rückseite und speichere deine eigene Eselsbrücke dauerhaft ab.",
      readBullet2Title: "▶ Auditives Lernen",
      readBullet2Desc: "Klicke auf die kleinen 🔊-Buttons, um dir die exakte Aussprache anzuhören. Sprich die Vokabeln und Sätze laut mit, um ein Gefühl für echte japanische Wörter zu bekommen.",
      mechanics: "Mechanik:",
      mechanicsDesc: "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist."
    },
    en: {
      back: "Main Menu",
      modeLabel: "Mode",
      modeWrite: "Write",
      modeRead: "Read",
      title: "KANA DECK",
      subtitleWrite: "Character Training",
      subtitleRead: "Character Recognition",
      day: "Day",
      of: "of",
      briefingTitle: "System Briefing",
      writeBullet1Title: "▶ Precision Training",
      writeBullet1Desc: "Draw the requested Kana from memory onto the display. Use your finger or a stylus.",
      writeBullet2Title: "▶ Strict Evaluation",
      writeBullet2Desc: "When checking, the perfect character is overlaid on your sketch. Be honest with yourself: If the proportions are off, click 'Again'.",
      readBullet1Title: "▶ Visual Training & Mnemonics",
      readBullet1Desc: "Memorize the character using visual mnemonics! Have a better image in mind? Click the ✏️ icon on the back and permanently save your own mnemonic.",
      readBullet2Title: "▶ Auditory Learning",
      readBullet2Desc: "Click the small 🔊 buttons to hear the exact pronunciation. Say the vocabulary and sentences out loud to get a feel for real Japanese words.",
      mechanics: "Mechanics:",
      mechanicsDesc: "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty."
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Navigation & Modus-Anzeige */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; {t.back}
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isWrite ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
          {t.modeLabel}: {isWrite ? t.modeWrite : t.modeRead}
        </span>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <h1 className={`text-3xl font-bold text-center mb-2 tracking-wider ${isWrite ? 'text-blue-400' : 'text-green-400'}`}>
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {isWrite ? t.subtitleWrite : t.subtitleRead}: {t.day} {currentDay} {t.of} {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className={`${isWrite ? 'bg-blue-500' : 'bg-green-500'} h-full transition-all duration-500`} 
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamische System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className={`${isWrite ? 'text-blue-400' : 'text-green-400'} font-bold mb-4 tracking-wide uppercase text-sm`}>
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          {isWrite ? (
            <>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet1Title}</strong>
                {t.writeBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet2Title}</strong>
                {t.writeBullet2Desc}
              </li>
            </>
          ) : (
            <>
              <li>
                <strong className="text-white block mb-1">{t.readBullet1Title}</strong>
                {t.readBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.readBullet2Title}</strong>
                {t.readBullet2Desc}
              </li>
            </>
          )}
          <li className="pt-3 border-t border-gray-700">
            <strong className={isWrite ? 'text-blue-400' : 'text-green-400'}>{t.mechanics}</strong> {t.mechanicsDesc}
          </li>
        </ul>
      </div>

      {/* Raster */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          const deckInfo = kanaData[day];
          const groupTitle = deckInfo?.title && (language === 'en' ? deckInfo.titleEn : deckInfo.title);

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
              <span className="text-lg">{t.day} {day}</span>
              {/* Fallback auf DE, wenn EN-Titel (noch) nicht im kanaData existiert */}
              {deckInfo?.title && (
                <span className="text-[0.65rem] opacity-80 mt-1 uppercase tracking-wider leading-tight">
                  {groupTitle || deckInfo.title}
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