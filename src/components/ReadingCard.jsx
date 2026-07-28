import React, { useState, useEffect } from 'react';
import { readingData } from '../data/readingData';

const ReadingCard = ({ day, onBack, language }) => {
  const deckInfo = readingData[day];
  const currentLang = language || 'de';
  
  const texts = {
    de: {
      back: "Flow-Deck",
      remaining: "Übrig:",
      revealTrans: "Übersetzung aufdecken",
      next: "Nächster Text",
      finishTitle: "Szenario abgeschlossen",
      finishSub: "Hervorragend gelesen!",
      backToMenu: "Zurück zum Deck",
      error: "Keine Daten gefunden.",
      
      // Meilenstein Tag 21
      finishFinalTitle: "Phase 2 Komplett!",
      finishFinalSub: "Kana Flow ABGESCHLOSSEN! 🎯",
      finishFinalDesc: "Du hast gelernt, japanische Sätze fließend zu scannen. Wahnsinnsleistung! Komm jederzeit zurück, um dein Lese-Tempo frisch zu halten. Mach dich bereit für Phase 3: Das Radar!",
      finishFinalNext: "Weiter ins Radar-Training 📡",

      // Tägliche Motivationen (1-20)
      motivations: {
        1: "Wieder ein Text gemeistert! 📖 Das war echtes, ungefiltertes Japanisch. Dein Auge wird jeden Tag schneller. Dranbleiben!",
        2: "Tag 2 im Flow! 🔥 Merkst du, wie dein Gehirn anfängt, die Zeichen als Worte zu sehen, statt einzeln zu buchstabieren? Weiter so!",
        3: "Starke Leistung! 🌊 Aller Anfang ist schwer, aber du beißt dich durch die echten Sätze. Gönn dir eine kurze Pause!",
        4: "Vier Tage Lese-Training! 🎯 Sätze zu scannen verbraucht viel Energie, aber dein Gehirn baut gerade Autobahnen. Großartig!",
        5: "Tag 5 abgehakt! 🚀 So baut man echtes Sprachgefühl auf. Du liest kein Lehrbuch-Japanisch, sondern echtes Leben!",
        6: "Sechs Tage im Flow-Zustand! 🥋 Verlass dich auf dein Bauchgefühl. Wenn es mal hakt, einfach tief durchatmen.",
        7: "Woche 1 von Phase 2 geschafft! 🎉 Schau mal zurück, wo du vor einer Woche standest. Das ist purer Fortschritt!",
        8: "Tag 8 erledigt! 🔋 Text für Text wirst du sicherer. Mach genau so weiter, du bist auf einem super Weg!",
        9: "Neun Tage durchgezogen! ⚡️ Auch wenn ein Satz mal fies ist: Du trainierst gerade deine Frustrationstoleranz für Tokio.",
        10: "Zweistellig! Tag 10! 🏆 Halbe Strecke in Phase 2. Du kannst richtig stolz auf deine Konstanz sein!",
        11: "Tag 11 im Kasten! 🛡️ Dein Auge springt jetzt schon viel natürlicher von Partikel zu Partikel, oder?",
        12: "Tag 12 gemeistert! 🎌 Echtes Lesen bedeutet auch mal, Wörter aus dem Kontext zu raten. Du machst das super!",
        13: "Dreizehn Tage! ⏳ Du baust dir gerade den wichtigsten Skill auf: Schnelle Informationsaufnahme. Sehr stark!",
        14: "Zwei Wochen Lese-Drill! 🎉 Wahnsinn, was du hier an Durchhaltevermögen zeigst. Ruh dich kurz aus, dann geht's weiter!",
        15: "Tag 15 abgehakt! 🚀 Der Flow ist jetzt definitiv da. Die Zeichen sind keine Fremdkörper mehr für dich.",
        16: "Tag 16 geschafft! 🔥 Wir nähern uns dem Finale von Phase 2. Lass jetzt nicht nach, zieh durch!",
        17: "Tag 17 im Sack! 🎯 Partikel scannen wird langsam zur Gewohnheit. Genau das wollen wir erreichen!",
        18: "Achtzehn Tage Flow! 🌊 Deine Lese-Geschwindigkeit hat sich massiv gesteigert. Spürst du das Level-Up?",
        19: "Tag 19 erledigt! ⚡️ Fast am Ziel. Bald geht es ins Radar-Training, wo du diese Leseskills dringend brauchst!",
        20: "Tag 20! 🏆 Der vorletzte Text. Mach dich bereit für den Abschluss von Phase 2. Du bist eine Maschine!"
      }
    },
    en: {
      back: "Flow Deck",
      remaining: "Remaining:",
      revealTrans: "Reveal translation",
      next: "Next Text",
      finishTitle: "Scenario completed",
      finishSub: "Excellent reading!",
      backToMenu: "Back to Deck",
      error: "No data found.",
      
      // Milestone Day 21
      finishFinalTitle: "Phase 2 Complete!",
      finishFinalSub: "Kana Flow COMPLETED! 🎯",
      finishFinalDesc: "You've learned to scan Japanese sentences fluently. Amazing achievement! Come back anytime to keep your reading speed fresh. Get ready for Phase 3: The Radar!",
      finishFinalNext: "Continue to Radar Training 📡",

      // Daily Motivations (1-20)
      motivations: {
        1: "Another text mastered! 📖 That was real, unfiltered Japanese. Your eyes are getting faster every day. Keep it up!",
        2: "Day 2 in the flow! 🔥 Notice how your brain is starting to see the characters as words instead of spelling them out individually? Keep going!",
        3: "Strong performance! 🌊 Every beginning is hard, but you're pushing through real sentences. Take a short break!",
        4: "Four days of reading training! 🎯 Scanning sentences burns a lot of energy, but your brain is building highways right now. Great job!",
        5: "Day 5 checked off! 🚀 That's how you build real language intuition. You're not reading textbook Japanese, you're reading real life!",
        6: "Six days in a flow state! 🥋 Trust your gut feeling. If you get stuck, just take a deep breath.",
        7: "Week 1 of Phase 2 done! 🎉 Look back at where you were a week ago. That is pure progress!",
        8: "Day 8 done! 🔋 Text by text you're getting more confident. Keep doing exactly what you're doing, you're on a great path!",
        9: "Nine days straight! ⚡️ Even if a sentence is nasty: You are currently training your frustration tolerance for Tokyo.",
        10: "Double digits! Day 10! 🏆 Halfway through Phase 2. You can be really proud of your consistency!",
        11: "Day 11 in the bag! 🛡️ Your eyes are already jumping from particle to particle much more naturally, right?",
        12: "Day 12 mastered! 🎌 Real reading sometimes means guessing words from context. You're doing great!",
        13: "Thirteen days! ⏳ You are building the most important skill right now: Fast information processing. Very strong!",
        14: "Two weeks of reading drills! 🎉 Amazing stamina you're showing here. Rest up briefly, then keep going!",
        15: "Day 15 checked off! 🚀 The flow is definitely there now. The characters aren't alien to you anymore.",
        16: "Day 16 done! 🔥 We are approaching the finale of Phase 2. Don't let up now, push through!",
        17: "Day 17 in the bag! 🎯 Scanning particles is slowly becoming a habit. That is exactly what we want to achieve!",
        18: "Eighteen days of flow! 🌊 Your reading speed has increased massively. Do you feel the level-up?",
        19: "Day 19 done! ⚡️ Almost at the finish line. Soon you'll move to radar training, where you'll desperately need these reading skills!",
        20: "Day 20! 🏆 The second to last text. Get ready for the completion of Phase 2. You are a machine!"
      }
    }
  };

  const t = texts[currentLang] || texts.de;

  // Das Lexikon für den Smart-Scanner (Tooltips)
  const particleInfo = {
    "は": { de: "Thema ('Was ... angeht')", en: "Topic ('As for...')" },
    "を": { de: "Objekt (Ziel der Handlung)", en: "Object (Target of action)" },
    "に": { de: "Ziel/Zeit (Wohin/Wann)", en: "Target/Time (Where to/When)" },
    "で": { de: "Ort/Mittel (Wo/Womit)", en: "Location/Means (Where/With what)" },
    "が": { de: "Subjekt (Wer/Was)", en: "Subject (Who/What)" },
    "と": { de: "Mit/Und (Zusammen mit)", en: "With/And (Together with)" },
    "へ": { de: "Richtung (Nach/Zu)", en: "Direction (Towards)" },
    "から": { de: "Start (Von/Aus/Ab)", en: "Starting point (From/Since)" },
    "まで": { de: "Endpunkt (Bis)", en: "Ending point (Until/Up to)" }
  };

  // Smarter Regex-Scanner (Geupdatet für N5-Ausnahmen wie asagohan, totemo, densha etc.)
  const particleRegex = /(から|まで|を|は(?![いじんらかきし])|が(?![っつお])|に(?![くもちほんぎ])|で(?![すしんき])|と(?![もてけきこ])|へ)/g;

  if (!deckInfo) {
    return <div className="text-white text-center mt-20">{t.error}</div>;
  }

  const [queue, setQueue] = useState([...deckInfo.sentences]);
  const [isFinished, setIsFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    setQueue([...deckInfo.sentences]);
    setIsFinished(false);
    setShowTranslation(false);
  }, [day, deckInfo]);

  const currentSentence = queue[0];

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (queue.length <= 1) {
      setIsFinished(true);
    } else {
      setQueue(prev => prev.slice(1));
      setShowTranslation(false);
    }
  };

  // FURIGANA & PARTIKEL RENDERER (Furigana Zentrierung optimiert)
  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    
    // 1. Zuerst nach Furigana splitten, damit wir Wörter in {} nicht zerstören
    const parts = text.split(/([^\s、。！？「」]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^\s、。！？「」]+){([^}]+)}/);
      
      if (match) {
        // Normaler Furigana-Block (Zentriert und Padding repariert)
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-cyan-300 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      
      // 2. Normaler Textblock: Hier wird der Smart-Scanner auf Partikel losgelassen
      const subParts = part.split(particleRegex);
      return subParts.map((sub, j) => {
        if (particleInfo[sub]) {
          return (
            <span key={`${i}-${j}`} className="relative group inline-block cursor-help text-orange-400 font-extrabold mx-[2px] transition-colors hover:text-orange-300">
              {sub}
              
              {/* TOOLTIP BOX */}
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-gray-900 text-gray-200 text-xs sm:text-sm p-3 rounded-xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-relaxed font-sans font-normal whitespace-normal block">
                <span className="block text-orange-400 font-bold mb-1 border-b border-gray-700 pb-1 text-lg leading-none">{sub}</span>
                {particleInfo[sub][currentLang]}
                
                {/* Kleiner Pfeil nach unten am Tooltip */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500/50"></span>
              </span>
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sub}</span>;
      });
    });
  };

  // --- END SCREENS MIT MOTIVATION ---
  if (isFinished) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-24 h-24 bg-cyan-900/30 border-4 border-cyan-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(6,182,212,0.4)]">🌊</div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalTitle}</h1>
          <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalSub}</h2>
          <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
            {t.finishFinalDesc}
          </p>
          <div className="w-full max-w-sm space-y-4">
            <button onClick={onBack} className="w-full py-5 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-white shadow-lg shadow-yellow-500/20 uppercase tracking-widest active:scale-95 transition-all">
              {t.finishFinalNext}
            </button>
          </div>
        </div>
      );
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-cyan-900/30 border-2 border-cyan-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishSub}</h2>
        <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
          {dailyMotivation}
        </p>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          {t.backToMenu}
        </button>
      </div>
    );
  }

  const translationText = currentLang === 'en' ? currentSentence.translationEn : currentSentence.translationDe;

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-cyan-500 text-xs font-bold">{t.remaining} {queue.length}</span>
      </div>

      <div className="w-full max-w-sm mx-auto mt-12 flex flex-col items-center">
        
        <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[350px] relative">
          
          <div className="text-center w-full flex-1 flex flex-col items-center justify-center">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-loose tracking-wide mb-8" style={{ wordBreak: 'break-word' }}>
              {renderTextWithFurigana(currentSentence.text)}
            </h2>
            
            <button 
              onClick={() => playAudio(currentSentence.text)}
              className="w-16 h-16 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg active:scale-90 border border-cyan-500/30 mb-8"
            >
              🔊
            </button>

            <div className="w-full min-h-[40px] flex items-center justify-center">
              {!showTranslation ? (
                <button 
                  onClick={() => setShowTranslation(true)}
                  className="text-xs text-gray-500 hover:text-gray-300 uppercase tracking-widest font-bold border-b border-gray-600 pb-1"
                >
                  {t.revealTrans}
                </button>
              ) : (
                <p className="text-sm text-yellow-400 font-medium italic animate-fade-in px-4">
                  "{translationText}"
                </p>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleNext} 
          className="w-full mt-8 py-5 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
        >
          {t.next} &rarr;
        </button>

      </div>
    </div>
  );
};

export default ReadingCard;