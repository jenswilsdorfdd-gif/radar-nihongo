import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="flex-1 bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center overflow-y-auto scrollbar-hide">
      
      <div className="w-full max-w-lg mt-8 mb-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-800 rounded-full border-2 border-red-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-4">
          <span className="text-5xl">🇯🇵</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-wide text-center leading-tight mb-2">
          Willkommen beim <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Nippon Survival Training!</span>
        </h1>
      </div>

      <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl p-6 border border-gray-700 shadow-xl space-y-6 text-gray-300 text-[0.95rem] leading-relaxed">
        
        <p>
          <strong className="text-white text-lg">Konnichiwa! Schön, dass du hier bist.</strong><br/>
          Lass mich dir kurz erzählen, wie diese App entstanden ist. Auf meinen eigenen Reisen und beim Lernen habe ich schnell gemerkt: Echtes Japanisch auf der Straße funktioniert nicht wie im Lehrbuch. Wenn du in Tokio an der Kasse stehst oder am Bahnhof nach dem Weg fragst, hast du keine Zeit, Grammatikregeln im Kopf umzustellen. 
          Was du brauchst, ist <strong>verstehendes Hören und blitzschnelles Reagieren</strong>. Genau dafür habe ich dieses Survival-System entwickelt!
        </p>

        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
          <strong className="text-red-400 block mb-2">Warum gibt es hier absolut kein Romaji?</strong>
          Aus meiner eigenen Erfahrung kann ich dir sagen: Romaji (die lateinische Umschrift) ist eine Falle! Dein Gehirn ist faul. Wenn lateinische Buchstaben unter den japanischen stehen, liest du unbewusst Deutsch. Das ruiniert deine Aussprache und verhindert, dass du japanische Wortbilder als Ganzes erfasst. Wir reißen dieses Pflaster hier sofort ab! Es wird die ersten Tage hart sein, aber danach wirst du Japanisch <em>fühlen</em>.
        </div>

        <div>
          <strong className="text-green-400 block mb-2">Das Fundament der Sprache</strong>
          Die Japaner hatten früher keine eigene Schrift und haben vor über 1500 Jahren die komplizierten chinesischen Bildzeichen (<strong>Kanji</strong>) importiert. Daraus haben sie zwei eigene Alphabete abgeleitet: 
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Hiragana:</strong> Für alles Ur-Japanische und die Grammatik.</li>
            <li><strong>Katakana:</strong> Die eckigen Zeichen, heute meist für ausländische Lehnwörter (wie "Kamera" oder "Computer") genutzt.</li>
          </ul>
        </div>

        <p>
          Die <strong>Kanji</strong> selbst sind heute unser Starter-Bonus: Du musst sie anfangs nicht zwingend schreiben können, aber sie zu <em>erkennen</em>, ist ein absoluter Gamechanger, um sich vor Ort in Japan zurechtzufinden.
        </p>

        <div className="border-t border-gray-700 pt-5 mt-5">
          <strong className="text-white block mb-2">Wie geht es weiter?</strong>
          Trainiere hier regelmäßig deine Reflexe. Sobald die Basics sitzen, planen wir <strong>Gruppenveranstaltungen als Live-Videocalls</strong>. Dort werden wir das Erlernte live und direkt mit Muttersprachlern anwenden. Das wird der ultimative Stresstest!
          <br/><br/>
          Mach dich bereit, bleib eisern und vertrau dem Prozess.<br/>
          <span className="text-blue-400 font-bold block mt-2">Viel Erfolg! Dein Jens</span>
        </div>

      </div>

      <button 
        onClick={onStart} 
        className="w-full max-w-lg mt-8 mb-12 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-white text-lg tracking-widest shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
      >
        ⛩️ ZUM HAUPTMENÜ
      </button>

    </div>
  );
};

export default Welcome;