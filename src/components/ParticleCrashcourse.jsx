import React, { useState, useEffect } from 'react';

const ParticleCrashcourse = ({ onBack, language }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  // Phasen: 'intro' (Allgemein) -> 'briefing' (Detail) -> 'drill' (Übung) -> 'feedback' (Auswertung) -> 'result' (Endstand)
  const [currentPhase, setCurrentPhase] = useState('intro'); 
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLessonIndex, currentExerciseIndex, currentPhase]);

  const texts = {
    de: {
      back: "Zurück",
      title: "Die Partikel",
      subtitle: "Grundlagen Crashkurs",
      
      // NEU: Intro Texte
      introTitle: "Was sind Partikel?",
      introP1: "Im Japanischen steht das Verb immer am Ende. Aber woher wissen wir, wer was mit wem macht? Dafür gibt es Partikel!",
      introP2: "Sie sind der 'Kleber' des Satzes. Ein Partikel wird immer direkt HINTER ein Wort gehängt und bestimmt dessen grammatikalische Funktion (Subjekt, Objekt, Ort, Zeit).",
      introP3: "Stell sie dir wie kleine Verkehrsschilder vor, die dem japanischen Gehirn sagen: 'Achtung, das Wort davor ist ein Ort!'",
      introWarning: "Wichtig: Ein Partikel steht niemals am Anfang eines Satzes!",
      btnStartCourse: "Verstanden -> Crashkurs starten",

      lesson: "Lektion",
      exercise: "Übung",
      exampleLabel: "Beispiel:",
      startExerciseBtn: "Verstanden -> Übung starten",
      correctText: "Richtig! 🎯",
      wrongText: "Leider falsch! Richtig wäre:",
      whyText: "Warum?",
      btnNext: "Verstanden -> Weiter",
      successTitle: "Crashkurs abgeschlossen",
      successQuote: "Dein Ergebnis:",
      btnRetry: "Nochmal üben",
      btnHome: "Zurück zur Übersicht"
    },
    en: {
      back: "Back",
      title: "The Particles",
      subtitle: "Basics Crash Course",
      
      // NEW: Intro Texts
      introTitle: "What are Particles?",
      introP1: "In Japanese, the verb is always at the end. But how do we know who is doing what to whom? That's what particles are for!",
      introP2: "They are the 'glue' of the sentence. A particle is always attached directly AFTER a word and determines its grammatical function (subject, object, location, time).",
      introP3: "Think of them like tiny traffic signs telling the Japanese brain: 'Attention, the word before me is a location!'",
      introWarning: "Important: A particle is never placed at the beginning of a sentence!",
      btnStartCourse: "Got it -> Start Crash Course",

      lesson: "Lesson",
      exercise: "Exercise",
      exampleLabel: "Example:",
      startExerciseBtn: "Got it -> Start Exercise",
      correctText: "Correct! 🎯",
      wrongText: "Incorrect! Correct would be:",
      whyText: "Why?",
      btnNext: "Got it -> Next",
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
        exampleTrans: "Ich bin Jens. (Was mich angeht: Jens)"
      },
      en: {
        title: "The Topic [ は ]",
        explanation: "Written as 'ha' but pronounced as 'wa'. It shows what the sentence is about. Think of it like 'As for...'.",
        exampleSentence: "わたし は じぇんす です。",
        exampleTrans: "I am Jens. (As for me: Jens)"
      },
      exercises: [
        { sentence: "わたし [ ? ] ドイツじんです。", de: "Ich bin Deutscher.", en: "I am German." },
        { sentence: "これ [ ? ] みず です。", de: "Das ist Wasser.", en: "This is water." },
        { sentence: "やまださん [ ? ] せんせいです。", de: "Herr Yamada ist Lehrer.", en: "Mr. Yamada is a teacher." }
      ]
    },
    {
      correct: "を",
      options: ["が", "を", "で"],
      de: {
        title: "Das direkte Objekt [ を ]",
        explanation: "Verbindet eine Handlung mit einem Gegenstand. Es zeigt, WAS du isst, trinkst, kaufst oder liest.",
        exampleSentence: "すし を たべる。",
        exampleTrans: "Sushi essen. (WAS isst du? Sushi)"
      },
      en: {
        title: "Direct Object [ を ]",
        explanation: "Connects an action with an object. It shows WHAT you eat, drink, buy, or read.",
        exampleSentence: "すし を たべる。",
        exampleTrans: "Eat sushi. (WHAT do you eat? Sushi)"
      },
      exercises: [
        { sentence: "ほん [ ? ] よむ。", de: "Ein Buch lesen.", en: "Read a book." },
        { sentence: "くるま [ ? ] かう。", de: "Ein Auto kaufen.", en: "Buy a car." },
        { sentence: "コーヒー [ ? ] のむ。", de: "Kaffee trinken.", en: "Drink coffee." }
      ]
    },
    {
      correct: "に",
      options: ["に", "で", "を"],
      de: {
        title: "Das Ziel / Die Zeit [ に ]",
        explanation: "Zeigt das Ziel an, wohin du gehst ('nach', 'zu') oder an welchem genauen Zeitpunkt etwas passiert.",
        exampleSentence: "とうきょう に いきます。",
        exampleTrans: "Ich gehe nach Tokyo."
      },
      en: {
        title: "Destination / Time [ に ]",
        explanation: "Shows your destination ('to') or a specific time when something happens.",
        exampleSentence: "とうきょう に いきます。",
        exampleTrans: "I go to Tokyo."
      },
      exercises: [
        { sentence: "ホテル [ ? ] いきます。", de: "Ich gehe zum Hotel.", en: "I go to the hotel." },
        { sentence: "７じ [ ? ] おきる。", de: "Um 7 Uhr aufstehen.", en: "Wake up at 7 o'clock." },
        { sentence: "あした、かいしゃ [ ? ] いきます。", de: "Morgen gehe ich zur Firma.", en: "Tomorrow I go to the company." }
      ]
    },
    {
      correct: "で",
      options: ["に", "で", "と"],
      de: {
        title: "Ort der Handlung / Mittel [ で ]",
        explanation: "Gibt an, WO du etwas machst, oder WOMIT (z. B. mit welchem Verkehrsmittel oder Werkzeug).",
        exampleSentence: "でんしゃ で いきます。",
        exampleTrans: "Ich fahre mit dem Zug."
      },
      en: {
        title: "Location of Action / Means [ で ]",
        explanation: "Indicates WHERE you do something, or WITH WHAT (like a tool or transport).",
        exampleSentence: "でんしゃ で いきます。",
        exampleTrans: "I go by train."
      },
      exercises: [
        { sentence: "タクシー [ ? ] きた。", de: "Ich bin mit dem Taxi gekommen.", en: "I came by taxi." },
        { sentence: "レストラン [ ? ] たべる。", de: "Im Restaurant essen.", en: "Eat at the restaurant." },
        { sentence: "スマホ [ ? ] みる。", de: "Auf dem Smartphone ansehen.", en: "Watch on the smartphone." }
      ]
    },
    {
      correct: "が",
      options: ["は", "を", "が"],
      de: {
        title: "Das Subjekt [ が ]",
        explanation: "Lenkt die Aufmerksamkeit auf eine Sache. Wird oft genutzt, wenn man beschreibt, was man gerade sieht (z. B. Wetter) oder um zu sagen, dass etwas existiert.",
        exampleSentence: "あめ が ふっています。",
        exampleTrans: "Regen fällt. (Beschreibt, was gerade passiert)"
      },
      en: {
        title: "The Subject [ が ]",
        explanation: "Puts focus on a thing. Often used to describe what you currently see (e.g., weather) or to state that something exists.",
        exampleSentence: "あめ が ふっています。",
        exampleTrans: "Rain is falling. (Describing what is happening)"
      },
      exercises: [
        { sentence: "ゆき [ ? ] ふる。", de: "Schnee fällt.", en: "Snow is falling." },
        { sentence: "おかね [ ? ] あります。", de: "Ich habe Geld. (Geld existiert)", en: "I have money. (Money exists)" },
        { sentence: "だれ [ ? ] いきますか。", de: "Wer geht?", en: "Who is going?" }
      ]
    },
    {
      correct: "と",
      options: ["に", "と", "から"],
      de: {
        title: "Mit / Und [ と ]",
        explanation: "Bedeutet 'und' (wenn man zwei Dinge verbindet) oder 'zusammen mit' (einer Person).",
        exampleSentence: "ともだち と たべる。",
        exampleTrans: "Mit einem Freund essen."
      },
      en: {
        title: "With / And [ と ]",
        explanation: "Means 'and' (when connecting two things) or 'together with' (a person).",
        exampleSentence: "ともだち と たべる。",
        exampleTrans: "Eat with a friend."
      },
      exercises: [
        { sentence: "かぞく [ ? ] はなす。", de: "Mit der Familie sprechen.", en: "Talk with family." },
        { sentence: "パン [ ? ] ぎゅうにゅう。", de: "Brot und Milch.", en: "Bread and milk." },
        { sentence: "せんせい [ ? ] あう。", de: "Sich mit dem Lehrer treffen.", en: "Meet with the teacher." }
      ]
    },
    {
      correct: "から",
      options: ["まで", "から", "で"],
      de: {
        title: "Startpunkt [ から ]",
        explanation: "Bedeutet 'von' oder 'aus'. Zeigt den Anfangspunkt von einem Ort oder einer Uhrzeit an.",
        exampleSentence: "えき から きました。",
        exampleTrans: "Ich bin vom Bahnhof gekommen."
      },
      en: {
        title: "Starting Point [ から ]",
        explanation: "Means 'from'. Shows the starting point of a place or a time.",
        exampleSentence: "えき から きました。",
        exampleTrans: "I came from the station."
      },
      exercises: [
        { sentence: "ドイツ [ ? ] きました。", de: "Ich komme aus Deutschland.", en: "I came from Germany." },
        { sentence: "９じ [ ? ] です。", de: "Es startet ab 9 Uhr.", en: "It starts at 9 o'clock." },
        { sentence: "えき [ ? ] あるく。", de: "Vom Bahnhof aus laufen.", en: "Walk from the station." }
      ]
    },
    {
      correct: "まで",
      options: ["から", "まで", "に"],
      de: {
        title: "Endpunkt [ まで ]",
        explanation: "Bedeutet 'bis'. Zeigt das Ende von einem Weg oder einer Zeitspanne an.",
        exampleSentence: "ホテル まで あるく。",
        exampleTrans: "Bis zum Hotel laufen."
      },
      en: {
        title: "Ending Point [ まで ]",
        explanation: "Means 'until' or 'up to'. Shows the end of a route or time period.",
        exampleSentence: "ホテル まで あるく。",
        exampleTrans: "Walk up to the hotel."
      },
      exercises: [
        { sentence: "５じ [ ? ] はたらく。", de: "Bis 5 Uhr arbeiten.", en: "Work until 5 o'clock." },
        { sentence: "えき [ ? ] おねがいします。", de: "Zum Bahnhof bitte.", en: "To the station, please." },
        { sentence: "あした [ ? ] まつ。", de: "Bis morgen warten.", en: "Wait until tomorrow." }
      ]
    }
  ];

  const advanceToNext = () => {
    setFeedback(null);
    
    if (currentExerciseIndex < 2) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentPhase('drill');
    } else {
      if (currentLessonIndex < lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setCurrentExerciseIndex(0);
        setCurrentPhase('briefing'); 
      } else {
        setCurrentPhase('result');
      }
    }
  };

  const handleAnswer = (selected) => {
    const isCorrect = selected === lessons[currentLessonIndex].correct;
    if (isCorrect) setScore(score + 1);
    
    setFeedback({
      correct: isCorrect,
      selected: selected
    });
    
    setCurrentPhase('feedback');

    if (isCorrect) {
      setTimeout(() => {
        advanceToNext();
      }, 3000); 
    }
  };

  const resetCourse = () => {
    setCurrentLessonIndex(0);
    setCurrentExerciseIndex(0);
    setScore(0);
    setCurrentPhase('intro'); // Nach Reset wieder aufs Intro
  };

  const currentLesson = lessons[currentLessonIndex];
  const currentLessonData = currentLesson[language] || currentLesson.de;
  const currentExercise = currentLesson.exercises[currentExerciseIndex];
  
  const getSolvedSentence = () => {
    return currentExercise.sentence.replace("[ ? ]", `<span class="text-orange-400 font-extrabold mx-1">${currentLesson.correct}</span>`);
  };

  const renderHighlightedText = (text, particle) => {
    if (!text) return null;
    const parts = text.split(particle);
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && <span className="text-orange-400 font-extrabold">{particle}</span>}
      </React.Fragment>
    ));
  };

  const totalExercises = lessons.length * 3;

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

      {/* NEU: INTRO PHASE */}
      {currentPhase === 'intro' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in pb-12">
          <div className="w-full bg-gray-800 rounded-3xl p-6 border border-orange-500/50 shadow-2xl relative mt-4">
            <h2 className="text-2xl font-extrabold text-orange-400 mt-2 mb-4 border-b border-gray-700 pb-2">{t.introTitle}</h2>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed mb-8">
              <p>{t.introP1}</p>
              <p className="p-3 bg-gray-900 rounded-xl border border-gray-700">{t.introP2}</p>
              <p>{t.introP3}</p>
              <p className="text-red-400 font-bold border-l-2 border-red-500 pl-3">{t.introWarning}</p>
            </div>

            <button onClick={() => setCurrentPhase('briefing')} className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-white tracking-widest uppercase shadow-lg shadow-orange-500/20 transition-all active:scale-95">
              {t.btnStartCourse}
            </button>
          </div>
        </div>
      )}

      {currentPhase === 'briefing' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in pb-12">
          <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl relative mt-4">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-orange-500/50 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 whitespace-nowrap">
              {t.lesson} {currentLessonIndex + 1} / {lessons.length}
            </div>
            
            <h2 className="text-xl font-bold text-white mt-4 mb-3 border-b border-gray-700 pb-2">
              {renderHighlightedText(currentLessonData.title, currentLesson.correct)}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{currentLessonData.explanation}</p>
            
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mb-6">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2 block">{t.exampleLabel}</span>
              <p className="text-2xl font-bold text-white mb-1">
                {renderHighlightedText(currentLessonData.exampleSentence, currentLesson.correct)}
              </p>
              <p className="text-gray-400 text-xs italic">{currentLessonData.exampleTrans}</p>
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
            
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-orange-500/50 text-orange-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/10 whitespace-nowrap flex gap-2">
              <span>{t.lesson} {currentLessonIndex + 1}</span>
              <span className="text-gray-500">|</span>
              <span>{t.exercise} {currentExerciseIndex + 1}/3</span>
            </div>
            
            {currentPhase === 'feedback' ? (
              <div className={`mt-6 p-5 rounded-2xl border-2 ${feedback.correct ? 'bg-green-900/30 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-red-900/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]'} animate-fade-in`}>
                <h3 className={`font-bold text-lg text-center mb-4 ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback.correct ? t.correctText : `${t.wrongText} ${currentLesson.correct}`}
                </h3>
                
                <div className="bg-black/30 p-4 rounded-xl text-center border border-gray-700/50">
                  <p 
                    className="text-2xl font-bold text-white mb-2 tracking-wider"
                    dangerouslySetInnerHTML={{ __html: getSolvedSentence() }}
                  ></p>
                  <p className="text-gray-300 text-sm italic">
                    {currentExercise[language] || currentExercise.de}
                  </p>
                </div>

                {!feedback.correct && (
                  <div className="mt-4 p-4 bg-red-900/20 rounded-xl border border-red-500/30 text-left animate-fade-in">
                    <strong className="text-red-400 text-xs uppercase tracking-wider block mb-2">{t.whyText}</strong>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">{currentLessonData.explanation}</p>
                    
                    <button onClick={advanceToNext} className="w-full py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white tracking-widest uppercase transition-colors active:scale-95 shadow-lg shadow-red-900/50">
                      {t.btnNext}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mt-8 mb-8 bg-gray-900 py-6 px-4 rounded-xl border border-gray-700 shadow-inner flex items-center justify-center min-h-[120px]">
                  <h2 className="text-3xl font-bold text-center text-white tracking-wider leading-relaxed">
                    {currentExercise.sentence}
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {currentLesson.options.map((option, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleAnswer(option)}
                      className="py-5 bg-gray-700 hover:bg-orange-600 rounded-xl font-bold text-2xl text-white border-b-4 border-gray-900 hover:border-orange-800 active:border-b-0 active:translate-y-1 transition-all shadow-md"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {currentPhase === 'result' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-fade-in">
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-orange-500/30 text-center shadow-[0_0_30px_rgba(249,115,22,0.15)]">
            <div className="text-6xl mb-6">{score >= 18 ? '🏆' : '👍'}</div>
            <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">{t.successTitle}</h2>
            <p className="text-gray-400 mb-8 font-bold">{t.successQuote} <span className={score >= 18 ? 'text-green-400' : 'text-red-400'}>{score} / {totalExercises}</span></p>
            
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