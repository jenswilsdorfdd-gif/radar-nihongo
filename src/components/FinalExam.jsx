import React, { useState, useEffect } from 'react';

const FinalExam = ({ onBack, language }) => {
  const [examState, setExamState] = useState('intro'); // intro, exam, result
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Stats
  const [score, setScore] = useState(0);
  const [categoryStats, setCategoryStats] = useState({
    kana: { correct: 0, total: 0 },
    kanji: { correct: 0, total: 0 },
    particle: { correct: 0, total: 0 },
    radar: { correct: 0, total: 0 }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examState, currentIndex]);

  const texts = {
    de: {
      back: "Zurück",
      introTitle: "Die Abschluss-Prüfung",
      introSub: "Der ultimative Stresstest",
      introDesc: "30 zufällige Fragen quer durch alle Phasen (Kana, Kanji, Partikel, Radar). Beweise, dass du für den japanischen Alltag bereit bist. Es gibt kein Feedback zwischendurch – erst am Ende zeigt sich dein wahrer Rang.",
      startBtn: "Prüfung Starten",
      question: "Frage",
      btnNext: "Weiter",
      btnFinish: "Prüfung beenden & Auswerten",
      resultsTitle: "Prüfungs-Auswertung",
      totalScore: "Gesamtergebnis",
      rank: "Dein Rang:",
      recommendations: "Taktische Analyse",
      btnHome: "Zurück zum Dashboard",
      btnRetry: "Prüfung wiederholen",
      catKana: "Phase 1 (Kana)",
      catKanji: "Phase 4 (Kanji)",
      catParticle: "Partikel-Code",
      catRadar: "Phase 2 & 3 (Flow & Radar)",
      evalPerfect: "Hervorragend! Dieses Gebiet sitzt blind im Langzeitgedächtnis.",
      evalGood: "Solide Leistung, aber im Ernstfall noch etwas langsam. Dranbleiben!",
      evalCritical: "Kritisch! Du bist hier ein leichtes Ziel. Unbedingt diese Phase wiederholen!"
    },
    en: {
      back: "Back",
      introTitle: "Final Exam",
      introSub: "The Ultimate Stress Test",
      introDesc: "30 random questions across all phases (Kana, Kanji, Particles, Radar). Prove that you are ready for everyday life in Japan. There is no feedback in between – your true rank will be revealed at the end.",
      startBtn: "Start Exam",
      question: "Question",
      btnNext: "Next",
      btnFinish: "Finish Exam & Evaluate",
      resultsTitle: "Exam Results",
      totalScore: "Total Score",
      rank: "Your Rank:",
      recommendations: "Tactical Analysis",
      btnHome: "Back to Dashboard",
      btnRetry: "Retry Exam",
      catKana: "Phase 1 (Kana)",
      catKanji: "Phase 4 (Kanji)",
      catParticle: "Particle Code",
      catRadar: "Phase 2 & 3 (Flow & Radar)",
      evalPerfect: "Excellent! This area is completely locked in your long-term memory.",
      evalGood: "Solid performance, but might be too slow in real situations. Keep practicing!",
      evalCritical: "Critical! You are an easy target here. You must repeat this phase!"
    }
  };

  const t = texts[language] || texts.de;

  // Der Master-Pool für die Prüfung (36 Fragen) - KOMPLETT OHNE ROMAJI
  const masterPool = [
    // KANA
    { category: 'kana', q: { de: "Welches Kana ist 'a'?", en: "Which Kana is 'a'?" }, options: ["あ", "お", "め", "ぬ"], correct: 0 },
    { category: 'kana', q: { de: "Welches Kana ist 'shi'?", en: "Which Kana is 'shi'?" }, options: ["さ", "し", "き", "い"], correct: 1 },
    { category: 'kana', q: { de: "Was bedeutet das Wort: くるま", en: "What does the word: くるま mean?" }, options: ["Auto", "Kirsche", "Medizin", "Puppe"], correct: 0 },
    { category: 'kana', q: { de: "Wie schreibt man 'Sushi' in Hiragana?", en: "How to write 'Sushi' in Hiragana?" }, options: ["さし", "すし", "そし", "せし"], correct: 1 },
    { category: 'kana', q: { de: "Welches Katakana ist 'ka'?", en: "Which Katakana is 'ka'?" }, options: ["カ", "キ", "ク", "ケ"], correct: 0 },
    { category: 'kana', q: { de: "Was bedeutet das Wort: カメラ", en: "What does the word: カメラ mean?" }, options: ["Kamera", "Karate", "Gespräch", "Klasse"], correct: 0 },
    { category: 'kana', q: { de: "Welches Zeichen ist 'tsu'?", en: "Which character is 'tsu'?" }, options: ["う", "つ", "て", "と"], correct: 1 },
    { category: 'kana', q: { de: "Wie schreibt man Katze?", en: "How to write cat?" }, options: ["ねこ", "ぬこ", "にこ", "のこ"], correct: 0 },
    { category: 'kana', q: { de: "Welches Zeichen ist 'ya'?", en: "Which character is 'ya'?" }, options: ["ゆ", "よ", "や", "わ"], correct: 2 },
    // KANJI
    { category: 'kanji', q: { de: "Was bedeutet das Kanji 水 ?", en: "What does the Kanji 水 mean?" }, options: ["Feuer", "Wasser", "Baum", "Erde"], correct: 1 },
    { category: 'kanji', q: { de: "Was bedeutet das Kanji 木 ?", en: "What does the Kanji 木 mean?" }, options: ["Mensch", "Buch", "Baum/Holz", "Mond"], correct: 2 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Mensch / Person'", en: "Find the Kanji for 'Person'" }, options: ["入", "人", "八", "大"], correct: 1 },
    { category: 'kanji', q: { de: "Welches Kanji bedeutet 'groß'?", en: "Which Kanji means 'big'?" }, options: ["大", "小", "中", "太"], correct: 0 },
    { category: 'kanji', q: { de: "Welches Kana steht für 日 (Sonne/Tag)?", en: "Which Kana stands for 日 (Sun/Day)?" }, options: ["つき", "にち / ひ", "みず", "き"], correct: 1 },
    { category: 'kanji', q: { de: "Was bedeutet 一 ?", en: "What does 一 mean?" }, options: ["Zwei", "Drei", "Eins", "Zehn"], correct: 2 },
    { category: 'kanji', q: { de: "Welches Kanji steht für 'Mund'?", en: "Which Kanji stands for 'Mouth'?" }, options: ["目", "口", "耳", "手"], correct: 1 },
    { category: 'kanji', q: { de: "Bedeutung von 山 ?", en: "Meaning of 山 ?" }, options: ["Fluss", "Berg", "Himmel", "Regen"], correct: 1 },
    { category: 'kanji', q: { de: "Welches Kanji ist 'Buch/Ursprung'?", en: "Which Kanji is 'Book/Origin'?" }, options: ["本", "木", "休", "体"], correct: 0 },
    // PARTICLE
    { category: 'particle', q: { de: "わたし [ ? ] ドイツじんです。", en: "わたし [ ? ] ドイツじんです。" }, options: ["は", "を", "で", "に"], correct: 0 },
    { category: 'particle', q: { de: "すし [ ? ] たべる。", en: "すし [ ? ] たべる。" }, options: ["に", "は", "を", "が"], correct: 2 },
    { category: 'particle', q: { de: "とうきょう [ ? ] いきます。", en: "とうきょう [ ? ] いきます。" }, options: ["を", "に", "で", "が"], correct: 1 },
    { category: 'particle', q: { de: "でんしゃ [ ? ] いきます。 (Mit dem Zug)", en: "でんしゃ [ ? ] いきます。 (By train)" }, options: ["で", "に", "を", "は"], correct: 0 },
    { category: 'particle', q: { de: "あめ [ ? ] ふっています。 (Regen fällt)", en: "あめ [ ? ] ふっています。 (Rain is falling)" }, options: ["は", "を", "で", "が"], correct: 3 },
    { category: 'particle', q: { de: "ともだち [ ? ] あそぶ。 (Mit einem Freund)", en: "ともだち [ ? ] あそぶ。 (With a friend)" }, options: ["から", "まで", "と", "に"], correct: 2 },
    { category: 'particle', q: { de: "えき [ ? ] きました。 (Vom Bahnhof)", en: "えき [ ? ] きました。 (From the station)" }, options: ["から", "まで", "に", "で"], correct: 0 },
    { category: 'particle', q: { de: "ホテル [ ? ] おねがいします。(Bis zum Hotel)", en: "ホテル [ ? ] おねがいします。(Up to the hotel)" }, options: ["から", "を", "まで", "は"], correct: 2 },
    { category: 'particle', q: { de: "コーヒー [ ? ] のむ。", en: "コーヒー [ ? ] のむ。" }, options: ["が", "を", "に", "で"], correct: 1 },
    // RADAR (FLOW & CONTEXT) - REIN IN KANA/KANJI!
    { category: 'radar', q: { de: "Du gehst ins Restaurant. Was sagst du?", en: "You enter a restaurant. What do you say?" }, options: ["すみません！", "ありがとう！", "さようなら！", "おやすみ！"], correct: 0 },
    { category: 'radar', q: { de: "Jemand bedankt sich bei dir. Du antwortest:", en: "Someone thanks you. You reply:" }, options: ["ごめんなさい。", "どういたしまして。", "いただきます。", "こんにちは。"], correct: 1 },
    { category: 'radar', q: { de: "Vor dem Essen sagst du:", en: "Before eating, you say:" }, options: ["ごちそうさま", "いただきます", "ただいま", "おかえり"], correct: 1 },
    { category: 'radar', q: { de: "Was bedeutet 「えきは どこ ですか」?", en: "What does 「えきは どこ ですか」 mean?" }, options: ["Wie spät ist es?", "Wo ist der Bahnhof?", "Wie viel kostet das?", "Was ist das?"], correct: 1 },
    { category: 'radar', q: { de: "Du kaufst ein und fragst nach dem Preis:", en: "You are shopping and ask for the price:" }, options: ["いくらですか。", "どこですか。", "なんですか。", "いつですか。"], correct: 0 },
    { category: 'radar', q: { de: "Du verlässt das Haus und sagst:", en: "You leave the house and say:" }, options: ["ただいま", "いってきます", "おかえり", "おやすみ"], correct: 1 },
    { category: 'radar', q: { de: "Übersetze: 「これを ください」", en: "Translate: 「これを ください」" }, options: ["Das ist lecker.", "Das hier bitte.", "Wo ist das?", "Wie viel ist das?"], correct: 1 },
    { category: 'radar', q: { de: "Du verstehst etwas nicht:", en: "You don't understand something:" }, options: ["わかりません。", "わかります。", "しりません。", "ちがいます。"], correct: 0 },
    { category: 'radar', q: { de: "Nach dem Essen sagst du:", en: "After eating, you say:" }, options: ["いただきます", "ごちそうさまでした", "こんにちは", "すみません"], correct: 1 }
  ];

  const startExam = () => {
    const shuffled = [...masterPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 30);
    
    setQuestions(selected);
    setScore(0);
    setCategoryStats({
      kana: { correct: 0, total: 0 },
      kanji: { correct: 0, total: 0 },
      particle: { correct: 0, total: 0 },
      radar: { correct: 0, total: 0 }
    });
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setExamState('exam');
  };

  const handleSelectOption = (idx) => {
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const currentQ = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQ.correct;

    // Werte berechnen und speichern
    if (isCorrect) setScore(prev => prev + 1);
    
    setCategoryStats(prev => ({
      ...prev,
      [currentQ.category]: {
        correct: prev[currentQ.category].correct + (isCorrect ? 1 : 0),
        total: prev[currentQ.category].total + 1
      }
    }));

    // Weitergehen oder Auswertung anzeigen
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null); // Auswahl zurücksetzen für nächste Frage
    } else {
      setExamState('result');
    }
  };

  const getRank = (percentage) => {
    if (percentage >= 90) return { title: "SHOGUN 👑", desc: "Meister des Systems", color: "text-yellow-400" };
    if (percentage >= 75) return { title: "SAMURAI ⚔️", desc: "Elite-Kämpfer", color: "text-cyan-400" };
    if (percentage >= 50) return { title: "NINJA 🥷", desc: "Schattenläufer", color: "text-green-400" };
    return { title: "RONIN 🚶", desc: "Herrenloser Krieger", color: "text-red-400" };
  };

  const getRecommendation = (correct, total) => {
    if (total === 0) return "-";
    const pct = (correct / total) * 100;
    if (pct >= 80) return t.evalPerfect;
    if (pct >= 50) return t.evalGood;
    return t.evalCritical;
  };

  if (examState === 'intro') {
    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto">
        <div className="absolute top-6 left-6 z-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors active:scale-95">
            &larr; {t.back}
          </button>
        </div>
        
        <div className="mt-20 flex flex-col items-center max-w-sm text-center animate-fade-in">
          <div className="w-24 h-24 bg-red-900/30 rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] mb-6">
            <span className="text-5xl">⛩️</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-widest text-red-500 uppercase mb-2">{t.introTitle}</h1>
          <h2 className="text-gray-300 font-bold uppercase tracking-widest mb-6">{t.introSub}</h2>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-12 border-l-2 border-red-500/50 pl-4 text-left">
            {t.introDesc}
          </p>
          
          <button onClick={startExam} className="w-full py-5 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-red-500/20 active:scale-95 transition-all">
            {t.startBtn}
          </button>
        </div>
      </div>
    );
  }

  if (examState === 'exam') {
    const q = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    
    // Kategorie-Farben
    const catColors = {
      kana: "text-blue-400 border-blue-500/50 bg-blue-900/20",
      kanji: "text-purple-400 border-purple-500/50 bg-purple-900/20",
      particle: "text-orange-400 border-orange-500/50 bg-orange-900/20",
      radar: "text-green-400 border-green-500/50 bg-green-900/20"
    };
    
    const catLabels = {
      kana: "KANA", kanji: "KANJI", particle: "PARTICLE", radar: "RADAR"
    };

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-hidden">
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-800">
          <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${((currentIndex) / 30) * 100}%` }}></div>
        </div>

        <div className="w-full max-w-sm flex justify-between items-center mt-6 mb-8">
          <button onClick={onBack} className="text-gray-500 text-xs uppercase font-bold tracking-widest hover:text-white">
            X Abbrechen
          </button>
          <span className="text-gray-400 text-xs font-bold tracking-widest">
            {t.question} {currentIndex + 1} / 30
          </span>
        </div>

        <div className="w-full max-w-sm flex flex-col animate-fade-in flex-1">
          
          {/* Kategorie-Badge */}
          <div className="flex justify-center mb-6">
            <span className={`text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${catColors[q.category]}`}>
              {catLabels[q.category]}
            </span>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-8 min-h-[160px] flex items-center justify-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
              {q.q[language] || q.q.de}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => {
              // Neutrales Styling: Blau/Cyan wenn ausgewählt, sonst Standard
              const isSelected = selectedAnswer === idx;
              const btnClass = isSelected 
                ? "bg-cyan-900/50 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]" 
                : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-750 hover:border-gray-500";

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-5 rounded-xl border-2 font-bold text-lg transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto pb-6">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full py-5 rounded-xl font-bold text-white text-lg tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
                selectedAnswer !== null 
                  ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 shadow-red-500/20" 
                  : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {isLastQuestion ? t.btnFinish : t.btnNext}
            </button>
          </div>

        </div>
      </div>
    );
  }

  if (examState === 'result') {
    const percentage = Math.round((score / 30) * 100);
    const rankInfo = getRank(percentage);

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
        
        <div className="mt-8 mb-8 flex flex-col items-center w-full max-w-md text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6">{t.resultsTitle}</h1>
          
          {/* Main Score Card */}
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden mb-8">
            <div className={`absolute top-0 left-0 w-full h-2 ${percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{t.totalScore}</p>
            <div className="text-6xl font-extrabold text-white mb-6">
              {score}<span className="text-2xl text-gray-500">/30</span>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t.rank}</p>
              <h2 className={`text-3xl font-extrabold tracking-wider ${rankInfo.color}`}>{rankInfo.title}</h2>
              <p className="text-sm text-gray-300 italic mt-1">{rankInfo.desc}</p>
            </div>
          </div>

          {/* Detaillierte Analyse */}
          <div className="w-full text-left">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>📊</span> {t.recommendations}
            </h3>
            
            <div className="space-y-4 mb-8">
              {/* Kana Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-blue-400">{t.catKana}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.kana.correct}/{categoryStats.kana.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${categoryStats.kana.total > 0 ? (categoryStats.kana.correct / categoryStats.kana.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.kana.correct, categoryStats.kana.total)}</p>
              </div>

              {/* Kanji Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-purple-400">{t.catKanji}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.kanji.correct}/{categoryStats.kanji.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${categoryStats.kanji.total > 0 ? (categoryStats.kanji.correct / categoryStats.kanji.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.kanji.correct, categoryStats.kanji.total)}</p>
              </div>

              {/* Particle Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-orange-400">{t.catParticle}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.particle.correct}/{categoryStats.particle.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${categoryStats.particle.total > 0 ? (categoryStats.particle.correct / categoryStats.particle.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.particle.correct, categoryStats.particle.total)}</p>
              </div>

              {/* Radar Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-green-400">{t.catRadar}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.radar.correct}/{categoryStats.radar.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${categoryStats.radar.total > 0 ? (categoryStats.radar.correct / categoryStats.radar.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.radar.correct, categoryStats.radar.total)}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 pb-12">
              <button onClick={startExam} className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl font-bold text-white tracking-widest uppercase transition-colors active:scale-95">
                {t.btnRetry}
              </button>
              <button onClick={onBack} className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/20 rounded-xl font-bold text-white tracking-widest uppercase transition-all active:scale-95">
                {t.btnHome}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FinalExam;