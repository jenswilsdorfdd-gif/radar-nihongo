import React, { useState, useEffect, useRef } from 'react';
import { kanjiData } from '../data/kanjiData';

const KanjiCard = ({ day, mode = 'read', onBack, language }) => {
  const currentDeck = kanjiData[day];
  const currentLang = language || 'de';
  
  const texts = {
    de: {
      error1: "Fehler: Keine Daten für Tag",
      error2: "gefunden.",
      backMenu: "Zurück zum Menü",
      backDeck: "Kanji-Deck",
      backBtnSuccess: "Zurück zum Deck",
      remaining: "Übrig:",
      read: "Lesen",
      write: "Schreiben",
      hintRead: "Laut, Bedeutung & Satz?",
      solution: "Die Lösung:",
      clear: "Löschen",
      reveal: "Aufdecken",
      again: "Nochmal",
      gotIt: "Sitzt",
      mnemonicTitle: "Eselsbrücke",
      day: "Tag",
      perfect: "Tagesziel erreicht!",
      finishTitle: "Deck Abgeschlossen",
      
      // Meilenstein Tag 21 (Abschluss Phase 4)
      finishFinalTitle: "Phase 4 Komplett!",
      finishFinalSub: "Meisterklasse BESTANDEN! 🏯",
      finishFinalDesc: "Du hast alle 21 Tage Kanji-Training durchgezogen. Das ist der Moment, an dem 95% aller Lernenden scheitern. Du nicht! Du hast dir ein massives Arsenal an Wissen aufgebaut. Ruh dich aus, feier dich selbst und dann... auf zur finalen Prüfung!",
      finishFinalNext: "Zur Abschluss-Prüfung 🎓",

      // Tägliche Motivationen (1-20)
      motivations: {
        1: "Erstes Kanji-Deck gemeistert! 🏯 Du steigst jetzt in die echte japanische Schrift ein. Respekt für diesen Schritt!",
        2: "Tag 2 im Kasten! 🖌️ Jedes Zeichen, das du heute gelernt hast, wirst du in Japan auf Straßenschildern sehen. Mach weiter so!",
        3: "Starke Leistung! 🐉 Kanjis sind wie kleine Bildergeschichten. Je mehr du kennst, desto logischer wird die Sprache.",
        4: "Tag 4 abgehakt! ⚡️ Du ziehst das härteste Training der App durch. Das erfordert massive Disziplin. Stark!",
        5: "Fünf Tage Kanji-Drill! 🔥 Du baust dir gerade ein unglaubliches Vokabular auf. Ruh deinen Kopf jetzt ein wenig aus.",
        6: "Tag 6 gemeistert! 🥋 Wenn ein Zeichen mal absolut nicht in den Kopf will: Nutz die Eselsbrücken! Die helfen extrem.",
        7: "Woche 1 in Phase 4 geschafft! 🎉 Schau dir an, wie viele komplexe Zeichen du schon lesen kannst. Purer Wahnsinn!",
        8: "Tag 8 erledigt! 🔋 Du bist voll im Kanji-Flow. Dein Gehirn gewöhnt sich an die vielen Striche und Muster.",
        9: "Neun Tage durchgezogen! 🚀 Verzweifle nicht an ähnlichen Zeichen. Das Auge lernt die winzigen Unterschiede mit der Zeit.",
        10: "Zweistellig! Tag 10! 🏆 Halbzeit in der Königsdisziplin. Du beweist gerade, dass du es absolut ernst meinst mit Japanisch!",
        11: "Tag 11 ist Geschichte! ⚔️ Du machst das hervorragend. Ein Kanji pro Tag mehr, ist ein Straßenschild in Tokio weniger, das dich verwirrt.",
        12: "Zwölf Tage im Kasten! 🛡️ Du fängst an, die Bedeutung von Wörtern am Zeichen zu erraten, oder? Das ist der Kanji-Effekt!",
        13: "Tag 13 geschafft! ⏳ Halte den Fokus aufrecht. Es ist anstrengend, aber der Payoff am Ende ist gewaltig.",
        14: "Zwei Wochen Kanji-Training! 🎉 Du hast dir ein enormes Arsenal an Zeichen erarbeitet. Gönn dir heute ein kleines Stück Schokolade!",
        15: "Tag 15 abgehakt! 🌟 Das Ende ist in Sicht. Jetzt bloß nicht nachlassen, du bist auf der Zielgeraden!",
        16: "Tag 16 erledigt! 🔥 Dein Auge scannt die Striche mittlerweile automatisch. Die harte Arbeit zahlt sich aus.",
        17: "Einsatz 17 im Kasten! 🎯 Erinnere dich daran, wie Kanjis vor ein paar Wochen noch wie unlesbare Kunstwerke aussahen. Jetzt liest du sie!",
        18: "Achtzehn Tage durchgezogen! 🌊 Fast geschafft. Jedes weitere Deck macht dein Japanisch mächtiger.",
        19: "Tag 19 gemeistert! ⚡️ Du hast unglaubliche Ausdauer bewiesen. Bald bist du bereit für den ultimativen Endgegner.",
        20: "Tag 20! 🏆 Das vorletzte Deck. Du stehst kurz vor dem Abschluss des gesamten Systems. Hol nochmal alles aus dir raus!"
      }
    },
    en: {
      error1: "Error: No data found for Day",
      error2: ".",
      backMenu: "Back to Menu",
      backDeck: "Kanji Deck",
      backBtnSuccess: "Back to Deck",
      remaining: "Remaining:",
      read: "Read",
      write: "Write",
      hintRead: "Sound, Meaning & Sentence?",
      solution: "The solution:",
      clear: "Clear",
      reveal: "Reveal",
      again: "Again",
      gotIt: "Got it",
      mnemonicTitle: "Mnemonic",
      day: "Day",
      perfect: "Daily goal reached!",
      finishTitle: "Deck Completed",
      
      finishFinalTitle: "Phase 4 Complete!",
      finishFinalSub: "Masterclass PASSED! 🏯",
      finishFinalDesc: "You completed all 21 days of Kanji training. This is the point where 95% of all learners fail. Not you! You have built a massive arsenal of knowledge. Rest up, celebrate yourself, and then... on to the final exam!",
      finishFinalNext: "To the Final Exam 🎓",

      motivations: {
        1: "First Kanji deck mastered! 🏯 You are now entering the real Japanese writing system. Respect for taking this step!",
        2: "Day 2 in the bag! 🖌️ Every character you learned today will be seen on street signs in Japan. Keep it up!",
        3: "Strong performance! 🐉 Kanji are like little picture stories. The more you know, the more logical the language becomes.",
        4: "Day 4 checked off! ⚡️ You are pushing through the hardest training in the app. That requires massive discipline. Strong!",
        5: "Five days of Kanji drill! 🔥 You are building an incredible vocabulary right now. Rest your head a bit.",
        6: "Day 6 mastered! 🥋 If a character absolutely won't stick in your head: Use the mnemonics! They help tremendously.",
        7: "Week 1 in Phase 4 done! 🎉 Look at how many complex characters you can already read. Pure madness!",
        8: "Day 8 done! 🔋 You are fully in the Kanji flow. Your brain is getting used to the many strokes and patterns.",
        9: "Nine days straight! 🚀 Don't despair over similar characters. The eye learns the tiny differences over time.",
        10: "Double digits! Day 10! 🏆 Halfway through the masterclass. You are proving that you are absolutely serious about Japanese!",
        11: "Day 11 is history! ⚔️ You are doing great. One more Kanji a day is one less street sign in Tokyo that confuses you.",
        12: "Twelve days in the box! 🛡️ You're starting to guess the meaning of words from the character, right? That's the Kanji effect!",
        13: "Day 13 done! ⏳ Keep up the focus. It's exhausting, but the payoff at the end is massive.",
        14: "Two weeks of Kanji training! 🎉 You've built an enormous arsenal of characters. Treat yourself to a piece of chocolate today!",
        15: "Day 15 checked off! 🌟 The end is in sight. Don't let up now, you're on the home stretch!",
        16: "Day 16 done! 🔥 Your eye scans the strokes automatically by now. The hard work is paying off.",
        17: "Mission 17 in the bag! 🎯 Remember how Kanji looked like unreadable artwork a few weeks ago. Now you read them!",
        18: "Eighteen days straight! 🌊 Almost there. Every additional deck makes your Japanese more powerful.",
        19: "Day 19 mastered! ⚡️ You have shown incredible stamina. Soon you'll be ready for the ultimate final boss.",
        20: "Day 20! 🏆 The second to last deck. You are about to complete the entire system. Give it everything you've got!"
      }
    }
  };

  const t = texts[currentLang] || texts.de;
  
  if (!currentDeck) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold mb-4">{t.error1} {day} {t.error2}</p>
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold">{t.backMenu}</button>
      </div>
    );
  }

  const [queue, setQueue] = useState([...currentDeck]);
  const [isFinished, setIsFinished] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    setQueue([...currentDeck]);
    setIsFinished(false);
    setIsRevealed(false);
  }, [day, currentDeck]);

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    e.preventDefault(); 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    const parts = text.split(/([^\s]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^{]+){([^}]+)}/);
      if (match) {
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-cyan-300 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // --- END SCREENS MIT MOTIVATION ---
  if (isFinished || queue.length === 0) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-24 h-24 bg-purple-900/30 border-4 border-purple-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)]">🏯</div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalTitle}</h1>
          <h2 className="text-purple-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalSub}</h2>
          <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
            {t.finishFinalDesc}
          </p>
          <div className="w-full max-w-sm space-y-4">
            <button onClick={onBack} className="w-full py-5 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white shadow-lg shadow-red-500/20 uppercase tracking-widest active:scale-95 transition-all">
              {t.finishFinalNext}
            </button>
          </div>
        </div>
      );
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4 text-center">{t.perfect}</h2>
        <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
          {dailyMotivation}
        </p>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          {t.backBtnSuccess}
        </button>
      </div>
    );
  }

  const currentCard = queue[0];
  
  const displayMeaning = currentLang === 'en' && currentCard.meaningEn ? currentCard.meaningEn : currentCard.meaning;
  const displayMnemonic = currentLang === 'en' && currentCard.mnemonicEn ? currentCard.mnemonicEn : currentCard.mnemonic;
  const displaySentenceTrans = currentLang === 'en' && currentCard.sentenceTranslationEn ? currentCard.sentenceTranslationEn : currentCard.sentenceTranslation;

  const handleReveal = () => {
    setIsRevealed(true);
    playAudio(currentCard.kanji);
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      if (queue.length <= 1) {
        setIsFinished(true);
      } else {
        setQueue(prev => prev.slice(1));
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
    }
    setIsRevealed(false);
    clearCanvas();
  };

  const renderMerksatzBox = () => {
    return (
      <div className="w-full bg-gray-900 rounded-xl p-4 border border-gray-700 text-center mt-2">
        <p className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-3">
          {t.mnemonicTitle}
        </p>
        <p className="text-gray-300 text-sm mb-3 font-medium italic">{displayMnemonic}</p>
        
        {currentCard.sentence && (
          <div className="border-t border-gray-700 pt-3">
            <div className="flex flex-col items-center justify-center gap-2 mb-1">
              <div className="flex items-center gap-2">
                <p className="text-white text-lg font-bold leading-relaxed break-keep" style={{ wordBreak: 'keep-all' }}>
                  {renderTextWithFurigana(currentCard.sentence)}
                </p>
                <button onClick={() => playAudio(currentCard.sentence)} className="text-gray-400 hover:text-white active:scale-90 transition-all text-lg flex-shrink-0">🔊</button>
              </div>
            </div>
            <p className="text-gray-400 text-xs italic mt-1 break-words">{displaySentenceTrans}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* HEADER FIX: left-1/2 -translate-x-1/2 zentriert perfekt, px-4 schützt den Rand */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 sm:px-6 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">&larr; {t.backDeck}</button>
        <span className="text-purple-400 text-xs sm:text-sm font-bold">{t.day} {day} | {t.remaining} {queue.length}</span>
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mx-auto mt-12 flex flex-col items-center">
        <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[300px] relative">
          
          <p className="absolute top-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
            {mode === 'read' ? t.read : t.write}
          </p>

          {mode === 'read' && (
            <>
              <div className="text-[5rem] font-bold text-white leading-none mb-4 mt-6">
                {currentCard.kanji}
              </div>
              
              {isRevealed ? (
                <div className="flex flex-col items-center animate-fade-in w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-2xl font-extrabold text-blue-400 uppercase tracking-widest">{currentCard.reading}</p>
                    <button onClick={() => playAudio(currentCard.kanji)} className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-lg transition-all active:scale-90">🔊</button>
                  </div>
                  <p className="text-yellow-400 font-bold text-xl mb-3">{displayMeaning}</p>
                  
                  {renderMerksatzBox()}
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center">
                  <p className="text-gray-500 text-sm italic">{t.hintRead}</p>
                </div>
              )}
            </>
          )}

          {mode === 'write' && (
            <>
              <div className="text-3xl font-extrabold text-blue-400 mt-4 mb-2 uppercase tracking-widest">
                {currentCard.reading}
              </div>
              <p className="text-yellow-400 font-bold text-lg mb-4">{displayMeaning}</p>
              
              {!isRevealed ? (
                <div className="w-full flex flex-col items-center relative">
                  
                  {/* Das japanische Schreib-Raster hinter dem Canvas */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 z-0 top-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-2xl overflow-hidden">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                    </svg>
                  </div>

                  <canvas 
                    ref={canvasRef}
                    width={220} 
                    height={220} 
                    className="bg-gray-900 border-2 border-gray-700 rounded-2xl touch-none shadow-inner relative z-10 bg-transparent"
                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                  />
                  <button onClick={clearCanvas} className="mt-3 text-xs text-gray-400 hover:text-white uppercase tracking-widest">{t.clear}</button>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-fade-in w-full">
                  <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">{t.solution}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-[5rem] font-bold text-green-400 leading-none">{currentCard.kanji}</div>
                    <button onClick={() => playAudio(currentCard.kanji)} className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xl transition-all shadow-lg active:scale-90">🔊</button>
                  </div>
                  
                  {renderMerksatzBox()}
                </div>
              )}
            </>
          )}

        </div>

        <div className="w-full mt-6 flex flex-col gap-3">
          {!isRevealed ? (
            <button onClick={handleReveal} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest">
              {t.reveal}
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => handleNext(false)} className="flex-1 py-4 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-red-600 uppercase tracking-widest text-sm">
                {t.again}
              </button>
              <button onClick={() => handleNext(true)} className="flex-1 py-4 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-green-600 uppercase tracking-widest text-sm">
                {t.gotIt}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanjiCard;