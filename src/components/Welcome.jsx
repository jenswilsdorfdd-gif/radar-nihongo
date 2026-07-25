import React from 'react';

const Welcome = ({ onStart, language }) => {
  
  // WÖRTERBUCH
  const texts = {
    de: {
      welcome: "Willkommen beim",
      subtitle: "Konnichiwa! Schön, dass du hier bist.",
      intro: "Lass mich dir kurz erzählen, wie diese App entstanden ist. Auf meinen eigenen Reisen und beim Lernen habe ich schnell gemerkt: Echtes Japanisch auf der Straße funktioniert nicht wie im Lehrbuch. Wenn du in Tokio an der Kasse stehst oder am Bahnhof nach dem Weg fragst, hast du keine Zeit, Grammatikregeln im Kopf umzustellen. Was du brauchst, ist ",
      boldIntro: "verstehendes Hören und blitzschnelles Reagieren",
      introEnd: ". Genau dafür habe ich dieses Survival-System entwickelt!",
      whyNoRomaji: "Warum gibt es hier absolut kein Romaji?",
      romajiText: "Aus meiner eigenen Erfahrung kann ich dir sagen: Romaji (die lateinische Umschrift) ist eine Falle! Dein Gehirn ist faul. Wenn lateinische Buchstaben unter den japanischen stehen, liest du unbewusst Deutsch. Das ruiniert deine Aussprache und verhindert, dass du japanische Wortbilder als Ganzes erfasst. Wir reißen dieses Pflaster hier sofort ab! Es wird die ersten Tage hart sein, aber danach wirst du Japanisch ",
      romajiFeel: "fühlen",
      foundation: "Das Fundament der Sprache",
      foundationText: "Die Japaner hatten früher keine eigene Schrift und haben vor über 1500 Jahren die komplizierten chinesischen Bildzeichen importiert. Daraus haben sie zwei eigene Alphabete abgeleitet:",
      hiragana: "Für alles Ur-Japanische und die Grammatik.",
      katakana: "Die eckigen Zeichen, heute meist für ausländische Lehnwörter (wie 'Kamera' oder 'Computer') genutzt.",
      kanji: "Die ",
      kanjiBold: "Kanji",
      kanjiEnd: " selbst sind heute unser Starter-Bonus: Du musst sie anfangs nicht zwingend schreiben können, aber sie zu erkennen, ist ein absoluter Gamechanger, um sich vor Ort in Japan zurechtzufinden.",
      whatsNext: "Wie geht es weiter?",
      nextText: "Trainiere hier regelmäßig deine Reflexe. Sobald die Basics sitzen, planen wir ",
      nextBold: "Gruppenveranstaltungen als Live-Videocalls",
      nextEnd: ". Dort werden wir das Erlernte live und direkt mit Muttersprachlern anwenden. Das wird der ultimative Stresstest!",
      cheers: "Mach dich bereit, bleib eisern und vertrau dem Prozess.",
      signature: "Viel Erfolg! Dein Jens",
      btn: "⛩️ ZUM HAUPTMENÜ"
    },
    en: {
      welcome: "Welcome to the",
      subtitle: "Konnichiwa! Great to have you here.",
      intro: "Let me briefly tell you how this app came to be. During my own travels and studies, I quickly realized: Real Japanese on the streets doesn't work like it does in textbooks. When you're at a cash register in Tokyo or asking for directions at a station, you don't have time to rearrange grammar rules in your head. What you need is ",
      boldIntro: "comprehension by listening and lightning-fast reactions",
      introEnd: ". That is exactly why I developed this survival system!",
      whyNoRomaji: "Why is there absolutely no Romaji here?",
      romajiText: "Speaking from my own experience: Romaji (the Latin alphabet transcription) is a trap! Your brain is lazy. If Latin letters are placed below the Japanese ones, you subconsciously read English/German. This ruins your pronunciation and prevents you from grasping Japanese word images as a whole. We are ripping that band-aid off right now! It will be tough the first few days, but after that, you will ",
      romajiFeel: "feel",
      foundation: "The Foundation of the Language",
      foundationText: "The Japanese originally had no writing system of their own and imported complex Chinese characters over 1500 years ago. From these, they derived two native alphabets:",
      hiragana: "For everything natively Japanese and for grammar.",
      katakana: "The angular characters, mostly used today for foreign loanwords (like 'Kamera' or 'Computer').",
      kanji: "The ",
      kanjiBold: "Kanji",
      kanjiEnd: " themselves are our starter bonus today: You don't necessarily have to be able to write them at first, but simply recognizing them is an absolute gamechanger for navigating your way around Japan.",
      whatsNext: "What's next?",
      nextText: "Train your reflexes regularly here. Once the basics are solid, we are planning ",
      nextBold: "group events as live video calls",
      nextEnd: ". There we will apply what we have learned live and directly with native speakers. It will be the ultimate stress test!",
      cheers: "Get ready, stay disciplined, and trust the process.",
      signature: "Much success! Yours, Jens",
      btn: "⛩️ TO MAIN MENU"
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="flex-1 bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center overflow-y-auto scrollbar-hide">
      
      <div className="w-full max-w-lg mt-10 mb-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10 mb-4">
          <span className="text-5xl">⛩️</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          RADAR
        </h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
          Nippon Survival System
        </p>

        <h2 className="text-3xl font-extrabold tracking-wide text-center leading-tight mb-2">
          {t.welcome} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Nippon Survival Training!</span>
        </h2>
      </div>

      <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl p-6 border border-gray-700 shadow-xl space-y-6 text-gray-300 text-[0.95rem] leading-relaxed">
        
        <p>
          <strong className="text-white text-lg">{t.subtitle}</strong><br/>
          {t.intro}<strong>{t.boldIntro}</strong>{t.introEnd}
        </p>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
          <strong className="text-red-400 block mb-2">{t.whyNoRomaji}</strong>
          {t.romajiText}<em>{t.romajiFeel}</em>.
        </div>

        <div>
          <strong className="text-green-400 block mb-2">{t.foundation}</strong>
          {t.foundationText}
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Hiragana:</strong> {t.hiragana}</li>
            <li><strong>Katakana:</strong> {t.katakana}</li>
          </ul>
        </div>

        <p>
          {t.kanji}<strong>{t.kanjiBold}</strong>{t.kanjiEnd}
        </p>

        <div className="border-t border-gray-700 pt-5 mt-5">
          <strong className="text-white block mb-2">{t.whatsNext}</strong>
          {t.nextText}<strong>{t.nextBold}</strong>{t.nextEnd}
          <br/><br/>
          {t.cheers}<br/>
          <span className="text-blue-400 font-bold block mt-2">{t.signature}</span>
        </div>

      </div>

      <button 
        onClick={onStart} 
        className="w-full max-w-lg mt-8 mb-12 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-white text-lg tracking-widest shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
      >
        {t.btn}
      </button>

    </div>
  );
};

export default Welcome;