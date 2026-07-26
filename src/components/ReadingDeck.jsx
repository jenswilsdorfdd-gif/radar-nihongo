import React from 'react';
import { readingData } from '../data/readingData';

const ReadingDeck = ({ currentDay, totalDays, onBackToHome, onStartDay, language }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // WÖRTERBUCH FÜR DIE UI
  const texts = {
    de: {
      back: "Hauptmenü",
      title: "KANA FLOW",
      subtitle: "Flüssiges Lesen im Kontext:",
      day: "Szenario",
      of: "von",
      briefingTitle: "System-Einweisung",
      bullet1Title: "▶ Lautes Lesen (Schattenlesen)",
      bullet1Desc: "Der Satz taucht auf. Versuche ihn sofort laut vorzulesen. Es ist völlig egal, ob du ihn übersetzen kannst! Es geht nur darum, dass dein Gehirn die Zeichen flüssig verbindet.",
      bullet2Title: "▶ Audio-Kontrolle",
      bullet2Desc: "Klicke auf den großen Audio-Button, nachdem du gelesen hast. Vergleiche deine Geschwindigkeit und Aussprache mit dem Original. Sprich es danach noch einmal nach!",
      bullet3Title: "▶ On-Demand Übersetzung",
      bullet3Desc: "Du bist neugierig, was du da eigentlich gelesen hast? Klicke auf 'Übersetzung aufdecken'. Aber Achtung: Mach das erst NACH dem Lesen, damit dein Gehirn nicht wieder faul wird und Deutsch liest."
    },
    en: {
      back: "Main Menu",
      title: "KANA FLOW",
      subtitle: "Fluent reading in context:",
      day: "Scenario",
      of: "of",
      briefingTitle: "System Briefing",
      bullet1Title: "▶ Reading Aloud (Shadowing)",
      bullet1Desc: "The sentence appears. Try to read it out loud immediately. It doesn't matter if you can translate it! The goal is for your brain to connect the characters fluently.",
      bullet2Title: "▶ Audio Check",
      bullet2Desc: "Click the big audio button after reading. Compare your speed and pronunciation with the original. Repeat it out loud afterwards!",
      bullet3Title: "▶ On-Demand Translation",
      bullet3Desc: "Curious about what you just read? Click 'Reveal Translation'. But beware: Do this AFTER reading so your brain doesn't get lazy and read English instead."
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      <div className="w-full max-w-md flex justify-start mb-6">
        <button onClick={onBackToHome} className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
      </div>

      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-cyan-400">{t.title}</h1>
        <p className="text-gray-400 text-center mb-4">{t.subtitle} {t.day} {currentDay} {t.of} {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(currentDay / totalDays) * 100}%` }}></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-cyan-900/50 shadow-lg shadow-cyan-500/10">
        <h2 className="text-cyan-400 font-bold mb-4 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li>
            <strong className="text-white block mb-1">{t.bullet1Title}</strong>
            {t.bullet1Desc}
          </li>
          <li>
            <strong className="text-white block mb-1">{t.bullet2Title}</strong>
            {t.bullet2Desc}
          </li>
          <li>
            <strong className="text-white block mb-1">{t.bullet3Title}</strong>
            {t.bullet3Desc}
          </li>
        </ul>
      </div>

      <div className="w-full max-w-md grid grid-cols-1 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          const deckInfo = readingData[day];
          const groupTitle = deckInfo?.title && (language === 'en' ? deckInfo.titleEn : deckInfo.title);

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => { if (isCurrent || isCompleted) onStartDay(day); }}
              className={`py-4 px-4 rounded-xl font-bold transition-transform flex flex-col items-start text-left
                ${isCurrent ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 cursor-pointer active:scale-95' : ''}
                ${isCompleted ? 'bg-gray-700 text-cyan-400 border border-cyan-500/30 cursor-pointer active:scale-95' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span className="text-lg mb-1">{t.day} {day}</span>
              {groupTitle && <span className="text-xs opacity-80 uppercase tracking-wider">{groupTitle}</span>}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default ReadingDeck;