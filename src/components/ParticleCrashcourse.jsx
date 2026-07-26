import React, { useState, useEffect } from 'react';

const ParticleCrashcourse = ({ onBack, language }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Nach oben scrollen, wenn der Modus geladen wird
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const texts = {
    de: {
      back: "Zurück",
      title: "Partikel-Code",
      subtitle: "Crashkurs Arsenal",
      mission: "Mission",
      correctText: "Richtig gesnipert! 🎯",
      wrongText: "Fehlschuss! Richtig wäre:",
      successTitle: "Code entschlüsselt",
      successQuote: "Erfolgsquote:",
      btnRetry: "Nochmal feuern",
      btnHome: "Zurück ins Dojo"
    },
    en: {
      back: "Back",
      title: "Particle Code",
      subtitle: "Crash Course Arsenal",
      mission: "Mission",
      correctText: "Perfect Snipe! 🎯",
      wrongText: "Missed! Correct would be:",
      successTitle: "Code Decrypted",
      successQuote: "Success Rate:",
      btnRetry: "Fire Again",
      btnHome: "Back to Dojo"
    }
  };

  const t = texts[language] || texts.de;

  const questions = [
    {
      sentence: "わたし [ ? ] じぇんす です。",
      correct: "は",
      options: ["は", "を", "に"],
      de: {
        translation: "Ich bin Jens. (Thema des Satzes)",
        explanation: "は (wa) markiert das Thema. 'Was mich betrifft... ich bin Jens.'"
      },
      en: {
        translation: "I am Jens. (Topic of the sentence)",
        explanation: "は (wa) marks the topic. 'As for me... I am Jens.'"
      }
    },
    {
      sentence: "すし [ ? ] たべる。",
      correct: "を",
      options: ["が", "を", "で"],
      de: {
        translation: "Sushi essen. (Objekt, das gegessen wird)",
        explanation: "を (o) markiert das direkte Objekt. Das Sushi wird von der Aktion (essen) getroffen."
      },
      en: {
        translation: "Eat sushi. (Object being eaten)",
        explanation: "を (o) marks the direct object. The action (eating) directly affects the sushi."
      }
    },
    {
      sentence: "とうきょう [ ? ] いきます。",
      correct: "に",
      options: ["に", "で", "を"],
      de: {
        translation: "Ich gehe nach Tokyo. (Ziel der Bewegung)",
        explanation: "に (ni) markiert das Ziel einer Bewegung. (へ 'e' würde auch gehen, aber に ist präziser für den Endpunkt)."
      },
      en: {
        translation: "I go to Tokyo. (Target of movement)",
        explanation: "に (ni) marks the destination. (へ 'e' works too, but に is more precise for the endpoint)."
      }
    },
    {
      sentence: "でんしゃ [ ? ] いきます。",
      correct: "で",
      options: ["に", "で", "と"],
      de: {
        translation: "Ich fahre mit dem Zug. (Mittel / Werkzeug)",
        explanation: "で (de) markiert das Werkzeug oder Transportmittel. 'Mithilfe des Zuges'."
      },
      en: {
        translation: "I travel by train. (Means / Tool)",
        explanation: "で (de) marks the tool or means of transport. 'By means of the train'."
      }
    },
    {
      sentence: "あめ [ ? ] ふっています。",
      correct: "が",
      options: ["は", "を", "が"],
      de: {
        translation: "Der Regen fällt. (Fokus auf das Subjekt)",
        explanation: "が (ga) markiert das Subjekt, besonders bei Naturphänomenen oder neuen Informationen. Nicht 'Der Regen...', sondern 'Regen fällt!'"
      },
      en: {
        translation: "The rain is falling. (Focus on subject)",
        explanation: "が (ga) marks the subject, especially for natural phenomena or new info. Emphasizes 'Rain is falling!'"
      }
    },
    {
      sentence: "ともだち [ ? ] すしをたべる。",
      correct: "と",
      options: ["に", "と", "から"],
      de: {
        translation: "Mit einem Freund Sushi essen.",
        explanation: "と (to) bedeutet 'mit' (einer Person) oder verbindet zwei Nomen wie ein 'und'."
      },
      en: {
        translation: "Eating sushi with a friend.",
        explanation: "と (to) means 'with' (a person) or connects two nouns like 'and'."
      }
    },
    {
      sentence: "えき [ ? ] きました。",
      correct: "から",
      options: ["まで", "から", "で"],
      de: {
        translation: "Ich bin vom Bahnhof gekommen. (Startpunkt)",
        explanation: "から (kara) markiert den Startpunkt in Zeit oder Raum ('von / aus')."
      },
      en: {
        translation: "I came from the station. (Starting point)",
        explanation: "から (kara) marks the starting point in time or space ('from')."
      }
    },
    {
      sentence: "ここ [ ? ] ホテルまで。",
      correct: "から",
      options: ["から", "に", "を"],
      de: {
        translation: "Von hier bis zum Hotel.",
        explanation: "から (kara) = von. Kombiniert mit まで (made) = bis."
      },
      en: {
        translation: "From here to the hotel.",
        explanation: "から (kara) = from. Combined with まで (made) = to/until."
      }
    }
  ];

  const handleAnswer = (selected) => {
    const isCorrect = selected === questions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);
    
    setFeedback({
      correct: isCorrect,
      selected: selected
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 3000); // Zeigt die Erklärung für 3 Sekunden, damit man sie in Ruhe lesen kann
  };

  const resetCourse = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const currentQData = questions[currentQuestion][language] || questions[currentQuestion].de;

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

      {!showResult ? (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in pb-12">
          <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative mt-4">
            
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-orange-500/50 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 whitespace-nowrap">
              {t.mission} {currentQuestion + 1} / {questions.length}
            </div>
            
            <p className="text-gray-400 text-sm text-center mb-6 italic mt-6 border-l-2 border-orange-500/50 pl-3 leading-relaxed">
              {currentQData.translation}
            </p>
            
            <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wider bg-gray-900 py-4 rounded-xl border border-gray-700 shadow-inner">
              {questions[currentQuestion].sentence}
            </h2>

            {feedback ? (
              <div className={`p-5 rounded-2xl border-2 ${feedback.correct ? 'bg-green-900/30 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-900/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'} animate-fade-in`}>
                <h3 className={`font-bold mb-3 ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.correct ? t.correctText : `${t.wrongText} ${questions[currentQuestion].correct}`}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{currentQData.explanation}</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {questions[currentQuestion].options.map((option, idx) => (
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
      ) : (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in">
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-orange-500/30 text-center shadow-[0_0_30px_rgba(249,115,22,0.15)]">
            <div className="text-6xl mb-6">{score >= 6 ? '🏆' : '💀'}</div>
            <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">{t.successTitle}</h2>
            <p className="text-gray-400 mb-8 font-bold">{t.successQuote} <span className={score >= 6 ? 'text-green-400' : 'text-red-400'}>{score} / {questions.length}</span></p>
            
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