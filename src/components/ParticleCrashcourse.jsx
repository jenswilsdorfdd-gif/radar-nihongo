import React, { useState, useEffect } from 'react';

const ParticleCrashcourse = ({ onBack, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Phasen: 'briefing' (Erklärung) -> 'drill' (Übung) -> 'feedback' (Auswertung) -> 'result' (Endstand)
  const [currentPhase, setCurrentPhase] = useState('briefing'); 
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex, currentPhase]);

  const texts = {
    de: {
      back: "Zurück",
      title: "Die Partikel",
      subtitle: "Grundlagen Crashkurs",
      lesson: "Lektion",
      exampleLabel: "Beispiel:",
      startExerciseBtn: "Verstanden -> Übung starten",
      correctText: "Richtig! 🎯",
      wrongText: "Leider falsch! Richtig wäre:",
      successTitle: "Crashkurs abgeschlossen",
      successQuote: "Dein Ergebnis:",
      btnRetry: "Nochmal üben",
      btnHome: "Zurück zur Übersicht"
    },
    en: {
      back: "Back",
      title: "The Particles",
      subtitle: "Basics Crash Course",
      lesson: "Lesson",
      exampleLabel: "Example:",
      startExerciseBtn: "Got it -> Start Exercise",
      correctText: "Correct! 🎯",
      wrongText: "Incorrect! Correct would be:",
      successTitle: "Crash Course Completed",
      successQuote: "Your Score:",
      btnRetry: "Practice Again",
      btnHome: "Back to Overview"
    }
  };

  const t = texts[language] || texts.de;

  const lessons = [
    {
      correct: "は",
      options: ["は", "を", "に"],
      de: {
        title: "Das Thema [ は ]",
        explanation: "Wird als 'ha' geschrieben, aber wie 'wa' ausgesprochen. Es zeigt, worüber der Satz spricht. Stell es dir vor wie 'Was ... angeht'.",
        exampleSentence: "わたし は じぇんす です。",
        exampleTrans: "Ich bin Jens. (Was mich angeht: Jens)",
        exerciseSentence: "きょう [ ? ] いい てんき です。",
        exerciseTrans: "Heute ist schönes Wetter."
      },
      en: {
        title: "The Topic [ は ]",
        explanation: "Written as 'ha' but pronounced as 'wa'. It shows what the sentence is about. Think of it like 'As for...'.",
        exampleSentence: "わたし は じぇんす です。",
        exampleTrans: "I am Jens. (As for me: Jens)",
        exerciseSentence: "きょう [ ? ] いい てんき です。",
        exerciseTrans: "Today is good weather."
      }
    },
    {
      correct: "を",
      options: ["が", "を", "で"],
      de: {
        title: "Das direkte Objekt [ を ]",
        explanation: "Verbindet eine Handlung mit einem Gegenstand. Es zeigt, WAS du isst, trinkst, kaufst oder liest.",
        exampleSentence: "すし を たべる。",
        exampleTrans: "Sushi essen. (WAS isst du? Sushi)",
        exerciseSentence: "みず [ ? ] のむ。",
        exerciseTrans: "Wasser trinken."
      },
      en: {
        title: "Direct Object [ を ]",
        explanation: "Connects an action with an object. It shows WHAT you eat, drink, buy, or read.",
        exampleSentence: "すし を たべる。",
        exampleTrans: "Eat sushi. (WHAT do you eat? Sushi)",
        exerciseSentence: "みず [ ? ] のむ。",
        exerciseTrans: "Drink water."
      }
    },
    {
      correct: "に",
      options: ["に", "で", "を"],
      de: {
        title: "Das Ziel / Die Zeit [ に ]",
        explanation: "Zeigt das Ziel an, wohin du gehst ('nach', 'zu') oder an welchem genauen Zeitpunkt etwas passiert.",
        exampleSentence: "とうきょう に いきます。",
        exampleTrans: "Ich gehe nach Tokyo.",
        exerciseSentence: "がっこう [ ? ] きます。",
        exerciseTrans: "Ich komme zur Schule."
      },
      en: {
        title: "Destination / Time [ に ]",
        explanation: "Shows your destination ('to') or a specific time when something happens.",
        exampleSentence: "とうきょう に いきます。",
        exampleTrans: "I go to Tokyo.",
        exerciseSentence: "がっこう [ ? ] きます。",
        exerciseTrans: "I come to school."
      }
    },
    {
      correct: "で",
      options: ["に", "で", "と"],
      de: {
        title: "Ort der Handlung / Mittel [ で ]",
        explanation: "Gibt an, WO du etwas machst, oder WOMIT (z. B. mit welchem Verkehrsmittel oder Werkzeug).",
        exampleSentence: "でんしゃ で いきます。",
        exampleTrans: "Ich fahre mit dem Zug.",
        exerciseSentence: "くるま [ ? ] かえる。",
        exerciseTrans: "Mit dem Auto zurückkehren."
      },
      en: {
        title: "Location of Action / Means [ で ]",
        explanation: "Indicates WHERE you do something, or WITH WHAT (like a tool or transport).",
        exampleSentence: "でんしゃ で いきます。",
        exampleTrans: "I go by train.",
        exerciseSentence: "くるま [ ? ] かえる。",
        exerciseTrans: "Return by car."
      }
    },
    {
      correct: "が",
      options: ["は", "を", "が"],
      de: {
        title: "Das Subjekt [ が ]",
        explanation: "Lenkt die Aufmerksamkeit auf eine Sache. Wird oft genutzt, wenn man beschreibt, was man gerade sieht (z. B. Wetter) oder um zu sagen, dass etwas existiert.",
        exampleSentence: "あめ が ふっています。",
        exampleTrans: "Regen fällt. (Beschreibt, was gerade passiert)",
        exerciseSentence: "じかん [ ? ] ありません。",
        exerciseTrans: "Es gibt keine Zeit. (Zeit ist nicht vorhanden)"
      },
      en: {
        title: "The Subject [ が ]",
        explanation: "Puts focus on a thing. Often used to describe what you currently see (e.g., weather) or to state that something exists.",
        exampleSentence: "あめ が ふっています。",
        exampleTrans: "Rain is falling. (Describing what is happening)",
        exerciseSentence: "じかん [ ? ] ありません。",
        exerciseTrans: "There is no time. (Time does not exist)"
      }
    },
    {
      correct: "と",
      options: ["に", "と", "から"],
      de: {
        title: "Mit / Und [ と ]",
        explanation: "Bedeutet 'und' (wenn man zwei Dinge verbindet) oder 'zusammen mit' (einer Person).",
        exampleSentence: "ともだち と たべる。",
        exampleTrans: "Mit einem Freund essen.",
        exerciseSentence: "かぞく [ ? ] いく。",
        exerciseTrans: "Mit der Familie gehen."
      },
      en: {
        title: "With / And [ と ]",
        explanation: "Means 'and' (when connecting two things) or 'together with' (a person).",
        exampleSentence: "ともだち と たべる。",
        exampleTrans: "Eat with a friend.",
        exerciseSentence: "かぞく [ ? ] いく。",
        exerciseTrans: "Go with family."
      }
    },
    {
      correct: "から",
      options: ["まで", "から", "で"],
      de: {
        title: "Startpunkt [ から ]",
        explanation: "Bedeutet 'von' oder 'aus'. Zeigt den Anfangspunkt von einem Ort oder einer Uhrzeit an.",
        exampleSentence: "えき から きました。",
        exampleTrans: "Ich bin vom Bahnhof gekommen.",
        exerciseSentence: "ドイツ [ ? ] きました。",
        exerciseTrans: "Ich bin aus Deutschland gekommen."
      },
      en: {
        title: "Starting Point [ から ]",
        explanation: "Means 'from'. Shows the starting point of a place or a time.",
        exampleSentence: "えき から きました。",
        exampleTrans: "I came from the station.",
        exerciseSentence: "ドイツ [ ? ] きました。",
        exerciseTrans: "I came from Germany."
      }
    },
    {
      correct: "まで",
      options: ["から", "まで", "に"],
      de: {
        title: "Endpunkt [ まで ]",
        explanation: "Bedeutet 'bis'. Zeigt das Ende von einem Weg oder einer Zeitspanne an.",
        exampleSentence: "ホテル まで あるく。",
        exampleTrans: "Bis zum Hotel laufen.",
        exerciseSentence: "くじ [ ? ] はたらく。",
        exerciseTrans: "Bis 9 Uhr arbeiten."
      },
      en: {
        title: "Ending Point [ まで ]",
        explanation: "Means 'until' or 'up to'. Shows the end of a route or time period.",
        exampleSentence: "ホテル まで あるく。",
        exampleTrans: "Walk up to the hotel.",
        exerciseSentence: "くじ [ ? ] はたらく。",
        exerciseTrans: "Work until 9 o'clock."
      }
    }
  ];

  const handleAnswer = (selected) => {
    const isCorrect = selected === lessons[currentIndex].correct;
    if (isCorrect) setScore(score + 1);
    
    setFeedback({
      correct: isCorrect,
      selected: selected
    });
    
    setCurrentPhase('feedback');

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < lessons.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentPhase('briefing'); 
      } else {
        setCurrentPhase('result');
      }
    }, 2500); 
  };

  const resetCourse = () => {
    setCurrentIndex(0);
    setScore(0);
    setCurrentPhase('briefing');
  };

  const currentData = lessons[currentIndex]?.[language] || lessons[currentIndex]?.de;

  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
      
      <div className="absolute top-6 left-6 z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-1 active:scale-95">
          <span>&larr;</span> {t.back}
        </button>
      </div>

      <div className="mt-16 mb-8 flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 bg-orange-900/30 rounded-3xl border border-orange-500/50 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4">
          <span className="text-4xl">🔑</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-widest text-orange-400 uppercase text-center">{t.title}</h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase mt-2">{t.subtitle}</p>
      </div>

      {currentPhase === 'briefing' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in pb-12">
          <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative mt-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-orange-500/50 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 whitespace-nowrap">
              {t.lesson} {currentIndex + 1} / {lessons.length}
            </div>
            
            <h2 className="text-xl font-bold text-white mt-4 mb-3 border-b border-gray-700 pb-2">{currentData.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{currentData.explanation}</p>
            
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mb-6">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 block">{t.exampleLabel}</span>
              <p className="text-2xl font-bold text-white mb-1">{currentData.exampleSentence}</p>
              <p className="text-gray-400 text-xs italic">{currentData.exampleTrans}</p>
            </div>

            <button onClick={() => setCurrentPhase('drill')} className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-white tracking-widest uppercase shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              {t.startExerciseBtn}
            </button>
          </div>
        </div>
      )}

      {(currentPhase === 'drill' || currentPhase === 'feedback') && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in pb-12">
          <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative mt-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-orange-500/50 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 whitespace-nowrap">
              {t.lesson} {currentIndex + 1} / {lessons.length}
            </div>
            
            <p className="text-gray-400 text-sm text-center mb-6 italic mt-6 border-l-2 border-orange-500/50 pl-3 leading-relaxed">
              {currentData.exerciseTrans}
            </p>
            
            <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wider bg-gray-900 py-4 rounded-xl border border-gray-700 shadow-inner">
              {currentData.exerciseSentence}
            </h2>

            {currentPhase === 'feedback' ? (
              <div className={`p-5 rounded-2xl border-2 ${feedback.correct ? 'bg-green-900/30 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-900/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'} animate-fade-in`}>
                <h3 className={`font-bold text-lg text-center ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.correct ? t.correctText : `${t.wrongText} ${lessons[currentIndex].correct}`}
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {lessons[currentIndex].options.map((option, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleAnswer(option)}
                    className="py-5 bg-gray-700 hover:bg-orange-600 rounded-xl font-bold text-2xl text-white border-b-4 border-gray-900 hover:border-orange-800 active:border-b-0 active:translate-y-1 transition-all shadow-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {currentPhase === 'result' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in">
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-orange-500/30 text-center shadow-[0_0_30px_rgba(249,115,22,0.15)]">
            <div className="text-6xl mb-6">{score >= 6 ? '🏆' : '👍'}</div>
            <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">{t.successTitle}</h2>
            <p className="text-gray-400 mb-8 font-bold">{t.successQuote} <span className={score >= 6 ? 'text-green-400' : 'text-red-400'}>{score} / {lessons.length}</span></p>
            
            <div className="space-y-4">
              <button onClick={resetCourse} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white tracking-widest uppercase transition-colors active:scale-95">
                {t.btnRetry}
              </button>
              <button onClick={onBack} className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-white tracking-widest uppercase shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                {t.btnHome}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticleCrashcourse;