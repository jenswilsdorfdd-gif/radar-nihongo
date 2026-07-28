import React, { useState, useEffect } from 'react';
import { radarData } from '../data/radarData';

const Flashcard = ({ day, onBack, onNextDay, language }) => {
  const dayData = radarData[day] || { scenarios: [{ context: "Keine Daten", userTask: "Tag fehlt." }] };
  
  const [queue, setQueue] = useState([...dayData.scenarios]);
  const [isFinished, setIsFinished] = useState(false);
  
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [speechAttempts, setSpeechAttempts] = useState(0);
  const [speechResult, setSpeechResult] = useState(null); 

  const [wrongScans, setWrongScans] = useState([]); 

  const currentLang = language || 'de';

  const texts = {
    de: {
      back: "Radar-Deck",
      remaining: "Übrig:",
      scenario: "Szenario",
      action: "Aktion ausführen",
      vocabHint: "Vokabel:",
      scanActive: "Radar-Scan Aktiv",
      listenActive: "Hört zu...",
      listenPrompt: "Tippen & Sprechen",
      yourInput: "Deine Eingabe:",
      retrySpeech: "Nicht ganz! Noch",
      retrySpeechSuffix: "Versuch(e)",
      failedSpeech: "3 Fehlversuche. Muster-Lösung:",
      perfectSpeech: "Ziel erfasst! Muster-Lösung:",
      npcReplies: "Gegenüber antwortet",
      instructionPhase2: "Audio abspielen und zuhören. Welche Information erkennst du?",
      targetAcquired: "Ziel erfasst",
      targetFailed: "Fehlerhafte Ortung",
      btnNextPhase: "Gegenüber antwortet (Phase 2)",
      btnRetry: "Nochmal (Ans Ende)",
      btnGotIt: "Sitzt (Nächste)",
      btnSkip: "Überspringen & Hören",
      btnNextCard: "Sitzt (Nächste Karte)",
      finishTitle: "Einsatz Erfolgreich",
      finishSub: "Radar-Mission beendet",
      backToMenu: "Zurück zum Deck",
      errorMsg: "Noch keine Missionen für Tag",
      
      finishFinalTitle: "Phase 3 Komplett!",
      finishFinalSub: "Stresstest ÜBERLEBT! 🥋",
      finishFinalDesc: "Wahnsinn! Du hast dein Gehör an das echte Japan-Tempo gewöhnt. Wenn du jetzt in Tokio an der Kasse stehst, bist du kein hilfloser Tourist mehr. Halte deine Reflexe scharf und wiederhole Missionen, wann immer du willst! Für tägliche Japan-Hacks sehen wir uns auf Insta. Bereit für den Feinschliff?",
      finishFinalNext: "Weiter zu Phase 4 (Kanji) 🏯",

      motivations: {
        1: "Willkommen im Radar! 📡 Das echte Japanisch ist schnell. Keine Panik, wenn du nicht sofort alles verstehst. Wir trainieren jetzt deine Ohren!",
        2: "Einsatz 2 überlebt! 🎧 Dein Gehirn filtert langsam die Füllwörter heraus. Fokussiere dich auf die Keywords, das reicht oft schon.",
        3: "Stark! 🚀 Das Zuhören klappt immer besser. In Tokio wartet niemand, aber du baust dir gerade echte Straßen-Reflexe auf.",
        4: "Tag 4 im Kasten! 🎯 Sprechen und Hören gleichzeitig strengt an, aber genau das löst die Sprachblockade in deinem Kopf.",
        5: "Einsatz 5 erledigt! 🔥 Du fängst an, instinktiv zu antworten, ohne den deutschen Satz im Kopf erst mühsam zu übersetzen. Weiter so!",
        6: "Sechs Tage Radar-Training! ⚡️ Du hast heute wieder Nerven aus Stahl bewiesen. Lass dich von hohem Tempo nicht einschüchtern.",
        7: "Woche 1 im Stresstest geschafft! 🎉 Das war intensiv. Stell dir vor, du stehst im Konbini – du würdest jetzt schon durchkommen! Zur Entspannung gibt's auf Insta echtes Tokio-Feeling.",
        8: "Tag 8 abgehakt! 🔋 Die Sätze werden komplexer, aber du scannst die wichtigen Infos blitzschnell. Genau so macht man das.",
        9: "Einsatz 9 gemeistert! 🥋 Wenn das Sprechen mal hakt, einfach tief durchatmen. Fehler sind hier im Dojo erlaubt, auf der Straße musst du funktionieren.",
        10: "Zweistellig! Tag 10! 🏆 Halbzeit im Radar-Deck. Du kannst verdammt stolz auf deine Disziplin sein!",
        11: "Tag 11 im Sack! 🛡️ Du erkennst Partikel jetzt oft schon am Klang. Das ist ein massives Level-Up für dein Gehirn.",
        12: "Zwölf Tage Radar! 🎌 Echtes Verstehen heißt, Lücken im Satz mental aufzufüllen. Du machst das hervorragend.",
        13: "Einsatz 13 geschafft! ⏳ Du bist extrem fokussiert geblieben. Gönn deinen Ohren jetzt eine kurze Pause.",
        14: "Zwei Wochen Stresstest! 🎉 Dein Sprachzentrum wird gerade komplett neu verdrahtet. Ruh dich kurz aus und hol dir auf TikTok deinen Motivations-Boost!",
        15: "Tag 15 abgehakt! 🚀 Hast du gemerkt, dass dir die Antworten immer schneller auf der Zunge liegen? Das ist der Radar-Effekt.",
        16: "Tag 16 erledigt! 🔥 Wir nähern uns dem Finale. Deine Frustrationstoleranz für schnelle Dialoge ist extrem gestiegen.",
        17: "Einsatz 17 im Kasten! 🎯 Wenn du jetzt nach Japan fliegst, bringt dich so schnell nichts mehr aus der Ruhe.",
        18: "Achtzehn Tage Radar! 🌊 Du hörst nicht mehr nur Laute, du hörst echte Informationen. Spürst du den Unterschied?",
        19: "Tag 19 gemeistert! ⚡️ Fast am Ziel. Bald geht es an die Königsdisziplin: Die Kanji. Aber erst machen wir das Radar fertig!",
        20: "Tag 20! 🏆 Der vorletzte Einsatz. Sammel deine Kräfte für das große Finale morgen. Du bist eine Maschine!"
      }
    },
    en: {
      back: "Radar Deck",
      remaining: "Remaining:",
      scenario: "Scenario",
      action: "Perform Action",
      vocabHint: "Vocabulary:",
      scanActive: "Radar Scan Active",
      listenActive: "Listening...",
      listenPrompt: "Tap & Speak",
      yourInput: "Your Input:",
      retrySpeech: "Not quite! You have",
      retrySpeechSuffix: "attempt(s) left",
      failedSpeech: "3 failed attempts. Correct answer:",
      perfectSpeech: "Target acquired! Correct answer:",
      npcReplies: "NPC Replies",
      instructionPhase2: "Play audio and listen. What information do you recognize?",
      targetAcquired: "Target acquired",
      targetFailed: "Scan failed",
      btnNextPhase: "NPC Replies (Phase 2)",
      btnRetry: "Retry (Move to end)",
      btnGotIt: "Got it (Next)",
      btnSkip: "Skip & Listen",
      btnNextCard: "Got it (Next card)",
      finishTitle: "Mission Successful",
      finishSub: "Radar Mission completed",
      backToMenu: "Back to Deck",
      errorMsg: "No missions yet for Day",
      
      finishFinalTitle: "Phase 3 Complete!",
      finishFinalSub: "Stress Test SURVIVED! 🥋",
      finishFinalDesc: "Amazing! You've tuned your ears to the real Japanese speed. When you stand at a cash register in Tokyo now, you're no helpless tourist anymore. Keep your reflexes sharp and repeat missions whenever you want! Check out our Insta for daily Japan hacks. Ready for the finishing touches?",
      finishFinalNext: "Continue to Phase 4 (Kanji) 🏯",

      motivations: {
        1: "Welcome to the Radar! 📡 Real Japanese is fast. Don't panic if you don't understand everything immediately. We are training your ears now!",
        2: "Mission 2 survived! 🎧 Your brain is slowly filtering out the filler words. Focus on the keywords, that's often enough.",
        3: "Strong! 🚀 Your listening is improving. Nobody waits in Tokyo, but you are building real street reflexes right now.",
        4: "Day 4 in the bag! 🎯 Speaking and listening simultaneously is exhausting, but that's exactly what breaks the language block in your head.",
        5: "Mission 5 done! 🔥 You're starting to answer instinctively without laboriously translating the English sentence in your head first. Keep it up!",
        6: "Six days of Radar training! ⚡️ You've shown nerves of steel today. Don't be intimidated by high speeds.",
        7: "Week 1 of the stress test completed! 🎉 That was intense. Imagine standing in a convenience store – you'd survive right now! Relax with some real Tokyo vibes on our Insta.",
        8: "Day 8 checked off! 🔋 The sentences are getting more complex, but you scan the important info in a flash. That's how it's done.",
        9: "Mission 9 mastered! 🥋 If speaking gets stuck, just take a deep breath. Errors are allowed here in the Dojo, on the street you must function.",
        10: "Double digits! Day 10! 🏆 Halfway through the Radar deck. You can be damn proud of your discipline!",
        11: "Day 11 in the bag! 🛡️ You can often recognize particles just by their sound now. That's a massive level-up for your brain.",
        12: "Twelve days of Radar! 🎌 Real understanding means mentally filling gaps in a sentence. You're doing excellently.",
        13: "Mission 13 done! ⏳ You stayed extremely focused. Give your ears a short break now.",
        14: "Two weeks of stress testing! 🎉 Your language center is being completely rewired. Rest briefly and grab your motivational boost on TikTok!",
        15: "Day 15 checked off! 🚀 Have you noticed that the answers are on the tip of your tongue much faster? That's the Radar effect.",
        16: "Day 16 done! 🔥 We are approaching the finale. Your frustration tolerance for fast dialogues has increased immensely.",
        17: "Mission 17 in the box! 🎯 If you fly to Japan right now, nothing will shake you easily anymore.",
        18: "Eighteen days of Radar! 🌊 You don't just hear sounds anymore, you hear real information. Can you feel the difference?",
        19: "Day 19 mastered! ⚡️ Almost there. Soon we'll move to the ultimate discipline: Kanji. But first, let's finish the Radar!",
        20: "Day 20! 🏆 The second to last mission. Gather your strength for the grand finale tomorrow. You are a machine!"
      }
    }
  };

  const t = texts[currentLang] || texts.de;

  useEffect(() => {
    if (radarData[day]) {
      setQueue([...radarData[day].scenarios]);
      setIsFinished(false);
      resetState();
    }
  }, [day]);

  const currentScenario = queue[0];
  const isScanner = currentScenario?.type === 'scanner'; 

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (speechResult === 'failed' && currentScenario?.userSpeech) {
      playAudio(currentScenario.userSpeech);
    }
  }, [speechResult, currentScenario]);

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Dein Browser unterstützt leider keine Spracherkennung. Bitte nutze Chrome oder Safari auf deinem Handy.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; 
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript(''); 
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      
      const isPerfect = evaluateSpeech(currentScenario.userSpeech, result);
      
      if (isPerfect) {
        setSpeechResult('perfect');
      } else {
        const nextAttempts = speechAttempts + 1;
        setSpeechAttempts(nextAttempts);
        if (nextAttempts >= 3) {
          setSpeechResult('failed');
        } else {
          setSpeechResult('retry');
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Mikrofon-Fehler:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleOptionSelect = (index) => {
    setSelectedIndex(index);
    setStep(3);
  };

  const handleScanClick = (chunk, index) => {
    if (chunk.includes(currentScenario.target)) {
      setSelectedIndex(0); 
      setStep(3); 
    } else {
      setWrongScans(prev => [...prev, index]);
    }
  };

  const advanceQueue = (isCorrect) => {
    if (isCorrect) {
      if (queue.length <= 1) {
        setIsFinished(true); 
      } else {
        setQueue(prev => prev.slice(1));
        resetState();
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      resetState();
    }
  };

  const resetState = () => {
    setStep(1);
    setSelectedIndex(null);
    setTranscript('');
    setSpeechAttempts(0);
    setSpeechResult(null);
    setWrongScans([]); 
  };

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
  const particleRegex = /(から|まで|を|は(?![いじんらかきし])|が(?![っつお])|に(?![くもちほんぎ])|で(?![すしんき])|と(?![もてけきこ])|へ)/g;

  const renderTextWithFuriganaAndParticles = (text) => {
    if (!text) return null;
    
    const parts = text.split(/([^\s、。！？「」]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^\s、。！？「」]+){([^}]+)}/);
      
      if (match) {
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-gray-400 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      
      const subParts = part.split(particleRegex);
      return subParts.map((sub, j) => {
        if (particleInfo[sub]) {
          return (
            <span key={`${i}-${j}`} className="relative group inline-block cursor-help text-orange-400 font-bold mx-[1px] transition-colors hover:text-orange-300">
              {sub}
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-gray-900 text-gray-200 text-xs sm:text-sm p-3 rounded-xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-relaxed font-sans font-normal whitespace-normal block">
                <span className="block text-orange-400 font-bold mb-1 border-b border-gray-700 pb-1 text-lg leading-none">{sub}</span>
                {particleInfo[sub][currentLang]}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500/50"></span>
              </span>
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sub}</span>;
      });
    });
  };

  const renderHighlightedText = (text, keyword, isCorrect) => {
    if (!text || !keyword) return renderTextWithFuriganaAndParticles(text);
    
    const parts = text.split(keyword);
    const highlightColor = isCorrect ? 'text-green-400' : 'text-red-400';
    
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {renderTextWithFuriganaAndParticles(part)}
            {index < parts.length - 1 && (
              <span className={`font-extrabold text-2xl px-1 ${highlightColor}`}>
                {renderTextWithFuriganaAndParticles(keyword)}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const evaluateSpeech = (expectedRaw, transcriptRaw) => {
    if (!transcriptRaw || !expectedRaw) return false;

    let expectedKanji = expectedRaw.replace(/([^{]+){[^}]+}/g, "$1"); 
    let expectedKana = expectedRaw.replace(/[^{]+{([^}]+)}/g, "$1");

    const cleanRegex = /[\s、。！？?]/g;
    expectedKanji = expectedKanji.replace(cleanRegex, '');
    expectedKana = expectedKana.replace(cleanRegex, '');
    let cleanTranscript = transcriptRaw.replace(cleanRegex, '');
    
    const politeRegex = /^(すみません|あの|えっと)/;
    cleanTranscript = cleanTranscript.replace(politeRegex, '');
    expectedKanji = expectedKanji.replace(politeRegex, '');
    expectedKana = expectedKana.replace(politeRegex, '');

    return cleanTranscript.includes(expectedKanji) || cleanTranscript.includes(expectedKana);
  };

  if (isFinished) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 bg-yellow-900/30 border-4 border-yellow-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(234,179,8,0.4)]">
              📡
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">{t.finishFinalTitle}</h1>
            <h2 className="text-yellow-400 font-bold tracking-widest uppercase mb-4">{t.finishFinalSub}</h2>
            <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
              {t.finishFinalDesc}
            </p>
            <div className="w-full space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 uppercase tracking-widest active:scale-95 transition-all">
                {t.finishFinalNext}
              </button>
            </div>
          </div>
        </div>
      );
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">{t.finishTitle}</h1>
          <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4">{t.finishSub}</h2>
          
          <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
            {dailyMotivation}
          </p>

          <button onClick={onBack} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600 uppercase tracking-widest">
            {t.backToMenu}
          </button>
        </div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-yellow-500 mb-4">{t.errorMsg} {day}</h2>
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold">Zurück</button>
      </div>
    );
  }

  const isAnswerCorrect = isScanner ? step === 3 : selectedIndex === currentScenario.correctIndex;

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 sm:px-6 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-yellow-500 text-xs sm:text-sm font-bold">
          Einsatz {day} | {t.remaining} {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mx-auto mt-12 flex flex-col items-center">
        
        <div className="w-full bg-gray-800 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-lg mb-4">
          <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-2">{t.scenario}</p>
          <p className="text-gray-300 text-sm mb-4">{currentScenario.context}</p>
          
          {currentScenario.physicalAction && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-xl p-4 mb-4 text-center">
              <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">{t.action}</p>
              <p className="text-orange-200 font-bold">{currentScenario.physicalAction}</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-700 text-center">
            <p className="text-white font-bold">{currentScenario.userTask}</p>
            
            {currentScenario.vocabHint && (
              <div className="mt-3 inline-block bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5">
                <p className="text-xs text-yellow-400 font-bold tracking-wide uppercase">
                  {t.vocabHint} <span className="text-white ml-1 text-sm">{renderTextWithFuriganaAndParticles(currentScenario.vocabHint)}</span>
                </p>
              </div>
            )}
          </div>
          
          {step === 1 && isScanner && (
            <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-700 w-full text-center">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-4 animate-pulse">{t.scanActive}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentScenario.textChunks.map((chunk, index) => {
                  const isWrong = wrongScans.includes(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleScanClick(chunk, index)}
                      className={`text-lg px-3 py-2 rounded-lg transition-all shadow-md font-bold ${
                        isWrong ? 'bg-red-900/50 text-red-500 border border-red-500/30 scale-95' 
                                : 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 active:scale-95'
                      }`}
                    >
                      {renderTextWithFuriganaAndParticles(chunk)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && !isScanner && speechResult !== 'perfect' && speechResult !== 'failed' && (
            <div className="mt-6 flex flex-col items-center">
              <button 
                onClick={handleListen}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg ${isListening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 active:scale-95'}`}
              >
                🎤
              </button>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                {isListening ? t.listenActive : t.listenPrompt}
              </p>
            </div>
          )}

          {step === 1 && !isScanner && transcript && (
            <div className="mt-6 w-full bg-blue-900/20 rounded-xl p-4 border border-blue-500/30 text-left animate-fade-in">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{t.yourInput}</p>
              <p className={`text-lg font-bold mb-2 ${speechResult === 'perfect' ? 'text-green-400' : 'text-red-500'}`}>
                {transcript}
              </p>

              {speechResult === 'retry' && (
                <div className="bg-red-900/40 p-2 rounded border border-red-500/50 mt-2">
                  <p className="text-red-300 text-xs font-bold uppercase text-center">
                    {t.retrySpeech} {3 - speechAttempts} {t.retrySpeechSuffix}
                  </p>
                </div>
              )}

              {(speechResult === 'failed' || speechResult === 'perfect') && (
                <div className="mt-4 pt-4 border-t border-blue-500/30">
                  {speechResult === 'failed' && (
                    <p className="text-red-400 text-xs font-bold uppercase mb-2">{t.failedSpeech}</p>
                  )}
                  {speechResult === 'perfect' && (
                    <p className="text-green-400 text-xs font-bold uppercase mb-2">{t.perfectSpeech}</p>
                  )}
                  <div className="flex justify-between items-start">
                    <p className="text-xl font-bold text-white leading-relaxed">
                      {renderTextWithFuriganaAndParticles(currentScenario.userSpeech)}
                    </p>
                    <button onClick={() => playAudio(currentScenario.userSpeech)} className="text-blue-400 text-lg ml-2 active:scale-90 flex-shrink-0">🔊</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {step === 2 && !isScanner && (
          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4 animate-fade-in text-center">
            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">{t.npcReplies}</p>
            
            <button 
              onClick={() => playAudio(currentScenario.npcReply)} 
              className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto hover:bg-red-600/40 active:scale-95 transition-all shadow-lg shadow-red-500/10"
            >
              🔊
            </button>
            <p className="text-sm text-gray-300 mb-6 italic">{t.instructionPhase2}</p>

            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white text-left transition-colors"
                >
                  {renderTextWithFuriganaAndParticles(option)}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={`w-full rounded-2xl p-6 border mb-4 animate-fade-in relative overflow-hidden ${isAnswerCorrect ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <p className={`text-xs font-bold tracking-widest uppercase ${isAnswerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isAnswerCorrect ? t.targetAcquired : t.targetFailed}
              </p>
              {!isScanner && (
                <button onClick={() => playAudio(currentScenario.npcReply)} className="text-gray-400 hover:text-white text-lg active:scale-90">🔊</button>
              )}
            </div>

            <p className="text-xl text-white mb-4 leading-relaxed" style={{ wordBreak: 'break-word' }}>
              {isScanner 
                ? renderTextWithFuriganaAndParticles(currentScenario.npcReply) 
                : renderHighlightedText(currentScenario.npcReply, currentScenario.keyword, isAnswerCorrect)
              }
            </p>
            
            <p className="text-sm text-gray-300 italic border-t border-gray-700/50 pt-3">
              "{currentScenario.npcTranslation}"
            </p>
          </div>
        )}

      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mt-4 mx-auto pb-8">
        
        {step === 1 && !isScanner && (
          <div className="space-y-3">
            {(speechResult === 'perfect' || speechResult === 'failed') ? (
              <>
                <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest">
                  {t.btnNextPhase}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => advanceQueue(false)} className="flex-1 py-3 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-red-600">
                    {t.btnRetry}
                  </button>
                  <button onClick={() => advanceQueue(true)} className="flex-1 py-3 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-green-600">
                    {t.btnGotIt}
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setStep(2)} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600">
                {t.btnSkip}
              </button>
            )}
          </div>
        )}
        
        {step === 3 && (
          <button onClick={() => advanceQueue(isAnswerCorrect)} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600">
            {isAnswerCorrect ? t.btnNextCard : t.btnRetry}
          </button>
        )}
      </div>

    </div>
  );
};

export default Flashcard;