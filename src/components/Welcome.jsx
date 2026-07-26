import React, { useEffect } from 'react';

const Welcome = ({ onStart, language }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const texts = {
    de: {
      title: "RADAR",
      subtitle: "Nippon Survival System",
      greeting: "Willkommen beim Nippon Survival Training!",
      p1: "Konnichiwa! Auf meinen eigenen Reisen habe ich schnell gemerkt: Echtes Japanisch auf der Straße funktioniert nicht wie im Lehrbuch. Wenn du in Tokio an der Kasse stehst, hast du keine Zeit für Grammatikregeln. Du musst blitzschnell reagieren. Genau dafür ist dieses System!",
      romajiTitle: "Warum absolut kein Romaji?",
      romajiText: "Romaji (die lateinische Umschrift) ist eine Falle! Dein Gehirn ist faul und liest unbewusst Deutsch. Wir reißen dieses Pflaster sofort ab. Es wird anfangs hart, aber nur so lernst du, japanische Wortbilder als Ganzes zu erfassen.",
      foundationTitle: "Dein Fundament",
      kanaText: "Wir starten mit Hiragana (für Grammatik) und Katakana (für englische Lehnwörter).",
      kanjiText: "Später kommen die chinesischen Kanji dazu. Du musst sie nicht zwingend schreiben können, aber sie zu erkennen, ist vor Ort ein absoluter Gamechanger!",
      dojoTitle: "Das Ziel: Das Live Dojo!",
      dojoText: "Trainiere hier in der App deine Reflexe. Sobald die Basics sitzen, wartet der ultimative Stresstest auf dich: Im Hauptmenü kannst du dich für unser Live Dojo (Gruppen-Training) eintragen! In interaktiven Videocalls wenden wir das Erlernte live an.",
      outro: "Mach dich bereit, bleib eisern und vertrau dem Prozess. Viel Erfolg! Dein Jens",
      btn: "⛩️ ZUM HAUPTMENÜ"
    },
    en: {
      title: "RADAR",
      subtitle: "Nippon Survival System",
      greeting: "Welcome to Nippon Survival Training!",
      p1: "Konnichiwa! On my own travels, I quickly realized: Real Japanese on the streets doesn't work like in a textbook. When you're at a checkout in Tokyo, you don't have time for grammar rules. You need to react lightning fast. That's exactly what this system is for!",
      romajiTitle: "Why absolutely no Romaji?",
      romajiText: "Romaji (the Latin transcription) is a trap! Your brain is lazy and unconsciously reads English. We're ripping this band-aid off immediately. It will be hard at first, but it's the only way to learn to grasp Japanese word images as a whole.",
      foundationTitle: "Your Foundation",
      kanaText: "We start with Hiragana (for grammar) and Katakana (for English loanwords).",
      kanjiText: "Later, the Chinese Kanji are added. You don't necessarily have to be able to write them, but recognizing them is an absolute gamechanger on site!",
      dojoTitle: "The Goal: The Live Dojo!",
      dojoText: "Train your reflexes here in the app. Once the basics are set, the ultimate stress test awaits you: In the main menu you can register for our Live Dojo (Group Training)! In interactive video calls we will apply what we have learned live.",
      outro: "Get ready, stay ironclad and trust the process. Good luck! Yours, Jens",
      btn: "⛩️ TO MAIN MENU"
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 animate-fade-in relative overflow-y-auto">
      
      <div className="w-full max-w-md bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl p-8 my-8 flex flex-col items-center">
        
        {/* LOGO & HEADER */}
        <div className="w-20 h-20 bg-gray-900 rounded-3xl border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10 mb-6">
          <span className="text-5xl">⛩️</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-8 border-b border-gray-700 pb-4 w-full text-center">
          {t.subtitle}
        </p>

        {/* TEXT INHALT */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed w-full">
          
          <div>
            <h2 className="text-lg font-bold text-white mb-2">{t.greeting}</h2>
            <p>{t.p1}</p>
          </div>

          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-xl">
            <h3 className="font-bold text-red-400 mb-1">{t.romajiTitle}</h3>
            <p>{t.romajiText}</p>
          </div>

          <div>
            <h3 className="font-bold text-green-400 mb-1">{t.foundationTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t.kanaText}</li>
              <li>{t.kanjiText}</li>
            </ul>
          </div>

          <div className="bg-pink-900/20 border-l-4 border-pink-500 p-4 rounded-r-xl">
            <h3 className="font-bold text-pink-400 mb-1 uppercase tracking-wider">{t.dojoTitle}</h3>
            <p>{t.dojoText}</p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="font-medium text-white italic">{t.outro}</p>
          </div>

        </div>

        {/* BUTTON */}
        <button 
          onClick={onStart} 
          className="w-full mt-10 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-white tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase"
        >
          {t.btn}
        </button>

      </div>
    </div>
  );
};

export default Welcome;