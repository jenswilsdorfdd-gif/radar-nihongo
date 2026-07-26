import React from 'react';
import { readingData } from '../data/readingData';

const ReadingDeck = ({ currentDay, totalDays, onBackToHome, onStartDay, language }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const texts = {
    de: {
      back: "Hauptmenü",
      title: "KANA FLOW",
      subtitle: "Flüssiges Lesen für Radar:",
      day: "Text",
      of: "von",
      briefingTitle: "System-Einweisung",
      bullet1Title: "▶ Lautes Lesen (Schattenlesen)",
      bullet1Desc: "Der Text taucht auf. Versuche ihn sofort laut vorzulesen. Es ist egal, ob du ihn übersetzen kannst! Dein Gehirn soll lernen, die Zeichen schnell zu verbinden.",
      bullet2Title: "▶ Audio-Kontrolle",
      bullet2Desc: "Klicke auf den Audio-Button, nachdem du gelesen hast. Vergleiche deine Geschwindigkeit und Aussprache mit dem Original. Sprich es noch einmal nach!",
      bullet3Title: "▶ 3 Radar-Stufen",
      bullet3Desc: "Level 1 (Kurz), Level 2 (Mittellang), Level 3 (Reale Dialoge). Dies ist die perfekte Brücke, um in Phase 3 (Radar) zu überleben.",
      lvl1: "Level 1: Grundlagen",
      lvl2: "Level 2: Erweiterte Texte",
      lvl3: "Level 3: Reale Dialoge"
    },
    en: {
      back: "Main Menu",
      title: "KANA FLOW",
      subtitle: "Fluent Reading for Radar:",
      day: "Text",
      of: "of",
      briefingTitle: "System Briefing",
      bullet1Title: "▶ Reading Aloud (Shadowing)",
      bullet1Desc: "The text appears. Try to read it out loud immediately. It doesn't matter if you can translate it! Your brain needs to learn to connect characters quickly.",
      bullet2Title: "▶ Audio Check",
      bullet2Desc: "Click the audio button after reading. Compare your speed and pronunciation with the original. Repeat it out loud!",
      bullet3Title: "▶ 3 Radar Levels",
      bullet3Desc: "Level 1 (Short), Level 2 (Medium), Level 3 (Real Dialogues). This is the perfect bridge to survive in Phase 3 (Radar).",
      lvl1: "Level 1: Basics",
      lvl2: "Level 2: Extended Texts",
      lvl3: "Level 3: Real Dialogues"
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
        <p className="text-gray-400 text-center mb-4">{t.subtitle} {t.day} {currentDay > totalDays ? totalDays : currentDay} {t.of} {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-cyan-900/50 shadow-lg shadow-cyan-500/10">
        <h2 className="text-cyan-400 font-bold mb-4 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li><strong className="text-white block mb-1">{t.bullet1Title}</strong>{t.bullet1Desc}</li>
          <li><strong className="text-white block mb-1">{t.bullet2Title}</strong>{t.bullet2Desc}</li>
          <li><strong className="text-white block mb-1">{t.bullet3Title}</strong>{t.bullet3Desc}</li>
        </ul>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          const deckInfo = readingData[day];
          const groupTitle = deckInfo?.title && (language === 'en' ? deckInfo.titleEn : deckInfo.title);

          return (
            <React.Fragment key={day}>
              {day === 1 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-2 border-b border-gray-700 pb-1">{t.lvl1}</h3>}
              {day === 8 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-6 border-b border-gray-700 pb-1">{t.lvl2}</h3>}
              {day === 15 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-6 border-b border-gray-700 pb-1">{t.lvl3}</h3>}
              
              <button
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
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};

export default ReadingDeck;