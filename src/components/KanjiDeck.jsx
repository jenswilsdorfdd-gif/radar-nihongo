import React from 'react';

const KanjiDeck = ({ currentDay, onBackToHome, onStartDay, language }) => {
  const totalDays = 21; 
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      title: "KANJI DECK",
      subtitle: "Starter N5 Level:",
      day: "Tag",
      of: "von",
      briefingTitle: "System-Einweisung: Kanji",
      briefingIntro: "Japanische Symbole bestehen aus Form, Bedeutung und Lesung. Lerne hier die 121 wichtigsten N5-Kanji aus dem Radar-System.",
      bulletTitle: "▶ Kopfkino & Kontext",
      bulletDesc: "Nutze die Eselsbrücken, um dir das Zeichen einzuprägen. Beim Umdrehen zeigt dir das System echte japanische Beispielsätze (inkl. Lesehilfen und Audio).",
      mechanics: "Mechanik:",
      mechanicsDesc: "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist."
    },
    en: {
      back: "Main Menu",
      title: "KANJI DECK",
      subtitle: "Starter N5 Level:",
      day: "Day",
      of: "of",
      briefingTitle: "System Briefing: Kanji",
      briefingIntro: "Japanese symbols consist of form, meaning, and reading. Learn the 121 most important N5 Kanji from the Radar System here.",
      bulletTitle: "▶ Mnemonics & Context",
      bulletDesc: "Use the mnemonics to memorize the character. When flipped, the system shows you real Japanese example sentences (incl. reading aids and audio).",
      mechanics: "Mechanics:",
      mechanicsDesc: "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty."
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; {t.back}
        </button>
      </div>

      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-purple-400">{t.title}</h1>
        <p className="text-gray-400 text-center mb-4">{t.subtitle} {t.day} {currentDay > totalDays ? totalDays : currentDay} {t.of} {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className="text-purple-400 font-bold mb-2 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          {t.briefingIntro}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white block mb-1">{t.bulletTitle}</strong>
          {t.bulletDesc}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed pt-3 border-t border-gray-700">
          <strong className="text-purple-400">{t.mechanics}</strong> {t.mechanicsDesc}
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
              <span>{t.day}</span>
              <span>{day}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanjiDeck;