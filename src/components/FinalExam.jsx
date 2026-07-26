import React, { useState, useEffect } from 'react';

const FinalExam = ({ onBack, language }) => {
  const [examState, setExamState] = useState('intro'); 
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Stats & Tracking
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); 
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
      introDesc: "30 zufällige Fragen quer durch alle Phasen. Komplexe Laute, Kanjis, Partikel und Hörverstehen (Audio). Mach dich bereit für den echten Einsatz.",
      startBtn: "Prüfung Starten",
      question: "Frage",
      btnNext: "Weiter",
      btnFinish: "Prüfung beenden & Auswerten",
      resultsTitle: "Prüfungs-Auswertung",
      totalScore: "Gesamtergebnis",
      rank: "Dein Rang:",
      recommendations: "Taktische Analyse",
      errorLogTitle: "Fehler-Protokoll",
      errorLogEmpty: "Keine Fehler! Perfekte Mission.",
      yourAnswer: "Deine Wahl:",
      correctAnswer: "Korrekt wäre:",
      btnHome: "Zurück zum Dashboard",
      btnRetry: "Prüfung wiederholen",
      catKana: "Phase 1 (Erweiterte Kana)",
      catKanji: "Phase 4 (Kanji)",
      catParticle: "Partikel-Code",
      catRadar: "Phase 2 & 3 (Hören & Sprechen)",
      evalPerfect: "Hervorragend! Dieses Gebiet sitzt blind im Langzeitgedächtnis.",
      evalGood: "Solide Leistung, aber im Ernstfall noch etwas langsam. Dranbleiben!",
      evalCritical: "Kritisch! Du bist hier ein leichtes Ziel. Unbedingt diese Phase wiederholen!"
    },
    en: {
      back: "Back",
      introTitle: "Final Exam",
      introSub: "The Ultimate Stress Test",
      introDesc: "30 random questions across all phases. Complex sounds, Kanjis, Particles, and Listening Comprehension (Audio). Get ready for real deployment.",
      startBtn: "Start Exam",
      question: "Question",
      btnNext: "Next",
      btnFinish: "Finish Exam & Evaluate",
      resultsTitle: "Exam Results",
      totalScore: "Total Score",
      rank: "Your Rank:",
      recommendations: "Tactical Analysis",
      errorLogTitle: "Error Log",
      errorLogEmpty: "No mistakes! Perfect mission.",
      yourAnswer: "Your choice:",
      correctAnswer: "Correct was:",
      btnHome: "Back to Dashboard",
      btnRetry: "Retry Exam",
      catKana: "Phase 1 (Advanced Kana)",
      catKanji: "Phase 4 (Kanji)",
      catParticle: "Particle Code",
      catRadar: "Phase 2 & 3 (Listen & Speak)",
      evalPerfect: "Excellent! This area is completely locked in your long-term memory.",
      evalGood: "Solid performance, but might be too slow in real situations. Keep practicing!",
      evalCritical: "Critical! You are an easy target here. You must repeat this phase!"
    }
  };

  const t = texts[language] || texts.de;

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      // Säubere Furigana-Klammern falls vorhanden
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  // Der Master-Pool für die Prüfung (Komplett ohne Romaji, Fokus auf Audio & Redewendungen)
  const masterPool = [
    // KANA (Nur die schweren Fälle: Dakuten, Handakuten, Kombos)
    { category: 'kana', q: { de: "Welches Wort bedeutet 'Heute'?", en: "Which word means 'Today'?" }, options: ["きょう", "きよう", "ぎょう", "ぎよう"], correct: 0 },
    { category: 'kana', q: { de: "Was bedeutet das Wort: ぎゅうにゅう", en: "What does the word: ぎゅうにゅう mean?" }, options: ["Kuhmilch", "Krankenhaus", "Rindfleisch", "Zwiebel"], correct: 0 },
    { category: 'kana', q: { de: "Achtung, Verwechslungsgefahr! Welches Wort ist 'Krankenhaus'?", en: "Careful! Which word is 'Hospital'?" }, options: ["びょういん", "びよういん", "ぴょういん", "ひょういん"], correct: 0 },
    { category: 'kana', q: { de: "Finde das Katakana 'pa':", en: "Find the Katakana 'pa':" }, options: ["パ", "バ", "ハ", "ダ"], correct: 0 },
    { category: 'kana', q: { de: "Lies: じゅぎょう", en: "Read: じゅぎょう" }, options: ["Unterricht", "Mitarbeiter", "Krankenhaus", "Firma"], correct: 0 },

    // KANJI
    { category: 'kanji', q: { de: "Was bedeutet das Kanji 水 ?", en: "What does the Kanji 水 mean?" }, options: ["Feuer", "Wasser", "Baum", "Erde"], correct: 1 },
    { category: 'kanji', q: { de: "Was bedeutet das Kanji 木 ?", en: "What does the Kanji 木 mean?" }, options: ["Mensch", "Buch", "Baum/Holz", "Mond"], correct: 2 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Mensch / Person'", en: "Find the Kanji for 'Person'" }, options: ["入", "人", "八", "大"], correct: 1 },
    { category: 'kanji', q: { de: "Welches Kanji bedeutet 'groß'?", en: "Which Kanji means 'big'?" }, options: ["大", "小", "中", "太"], correct: 0 },
    { category: 'kanji', q: { de: "Welches Kana steht für 日 (Sonne/Tag)?", en: "Which Kana stands for 日 (Sun/Day)?" }, options: ["つき", "にち / ひ", "みず", "き"], correct: 1 },
    { category: 'kanji', q: { de: "Was bedeutet 一 ?", en: "What does 一 mean?" }, options: ["Zwei", "Drei", "Eins", "Zehn"], correct: 2 },
    { category: 'kanji', q: { de: "Welches Kanji steht für 'Mund'?", en: "Which Kanji stands for 'Mouth'?" }, options: ["目", "口", "耳", "手"], correct: 1 },
    { category: 'kanji', q: { de: "Bedeutung von 山 ?", en: "Meaning of 山 ?" }, options: ["Fluss", "Berg", "Himmel", "Regen"], correct: 1 },

    // PARTICLE (Kontext-Sätze)
    { category: 'particle', q: { de: "わたし [ ? ] ドイツじんです。", en: "わたし [ ? ] ドイツじんです。" }, options: ["は", "を", "で", "に"], correct: 0 },
    { category: 'particle', q: { de: "レストラン [ ? ] すしを たべる。(Im Restaurant)", en: "レストラン [ ? ] すしを たべる。(At the restaurant)" }, options: ["で", "に", "は", "が"], correct: 0 },
    { category: 'particle', q: { de: "あした、とうきょう [ ? ] いきます。", en: "あした、とうきょう [ ? ] いきます。" }, options: ["を", "に", "で", "が"], correct: 1 },
    { category: 'particle', q: { de: "あめ [ ? ] ふっています。 (Fokus auf das Subjekt: Regen)", en: "あめ [ ? ] ふっています。 (Focus on the subject: rain)" }, options: ["は", "を", "で", "が"], correct: 3 },
    { category: 'particle', q: { de: "ともだち [ ? ] あそぶ。 (Mit einem Freund)", en: "ともだち [ ? ] あそぶ。 (With a friend)" }, options: ["から", "まで", "と", "に"], correct: 2 },
    { category: 'particle', q: { de: "えき [ ? ] きました。 (Vom Bahnhof)", en: "えき [ ? ] きました。 (From the station)" }, options: ["から", "まで", "に", "で"], correct: 0 },
    { category: 'particle', q: { de: "ホテル [ ? ] おねがいします。(Bis zum Hotel, im Taxi)", en: "ホテル [ ? ] おねがいします。(Up to the hotel, in a taxi)" }, options: ["から", "を", "まで", "は"], correct: 2 },
    { category: 'particle', q: { de: "コーヒー [ ? ] のむ。", en: "コーヒー [ ? ] のむ。" }, options: ["が", "を", "に", "で"], correct: 1 },
    
    // RADAR (FLOW & REDEWENDUNGEN - Nur Text)
    { category: 'radar', q: { de: "Wie fragst du, wo die Toilette ist?", en: "How do you ask where the toilet is?" }, options: ["トイレは どこですか。", "トイレは いつですか。", "トイレは なんですか。", "トイレは いくらですか。"], correct: 0 },
    { category: 'radar', q: { de: "Du möchtest im Laden etwas kaufen. Du zeigst darauf und sagst:", en: "You want to buy something. You point at it and say:" }, options: ["これを ください。", "ありがとう。", "わかりません。", "それです。"], correct: 0 },
    { category: 'radar', q: { de: "Jemand redet viel zu schnell. Was sagst du?", en: "Someone is speaking too fast. What do you say?" }, options: ["わかりません。", "わかります。", "しりません。", "ちがいます。"], correct: 0 },
    { category: 'radar', q: { de: "Du verlässt morgens das Haus deiner Gastfamilie:", en: "You leave your host family's house in the morning:" }, options: ["ただいま。", "いってきます。", "おかえり。", "おやすみ。"], correct: 1 },
    { category: 'radar', q: { de: "Du kaufst ein Ticket. Was fragst du den Verkäufer?", en: "You buy a ticket. What do you ask the seller?" }, options: ["いくらですか。", "どこですか。", "なんですか。", "だれですか。"], correct: 0 },

    // RADAR (HÖRVERSTEHEN - Audio!)
    { category: 'radar', audioText: "おなまえは なんですか。", q: { de: "Höre dir das Audio an. Wie antwortest du richtig?", en: "Listen to the audio. How do you reply correctly?" }, options: ["わたしは じぇんす です。", "ドイツから きました。", "はい、そうです。", "ありがとう。"], correct: 0 },
    { category: 'radar', audioText: "どこから きましたか。", q: { de: "Audio abspielen: Was sagst du auf diese Frage?", en: "Play audio: What do you say to this question?" }, options: ["ドイツから きました。", "ベルリンに いきます。", "はい、ドイツです。", "ちがいます。"], correct: 0 },
    { category: 'radar', audioText: "いただきます", q: { de: "Audio abspielen: In welcher Situation sagt man das?", en: "Play audio: In which situation do you say this?" }, options: ["Vor dem Essen.", "Nach dem Essen.", "Beim Betreten eines Ladens.", "Beim Bezahlen."], correct: 0 },
    { category: 'radar', audioText: "ごちそうさまでした", q: { de: "Audio abspielen: In welcher Situation sagt man das?", en: "Play audio: In which situation do you say this?" }, options: ["Nach dem Essen.", "Vor dem Essen.", "Beim Vorstellen.", "Zur Verabschiedung für immer."], correct: 0 },
    { category: 'radar', audioText: "すみません、えきは どこですか。", q: { de: "Audio abspielen: Was möchte diese Person wissen?", en: "Play audio: What does this person want to know?" }, options: ["Sie sucht den Bahnhof.", "Sie sucht die Toilette.", "Sie fragt nach dem Preis.", "Sie fragt nach der Uhrzeit."], correct: 0 },
    { category: 'radar', audioText: "いってらっしゃい", q: { de: "Audio abspielen: Wer sagt das?", en: "Play audio: Who says this?" }, options: ["Jemand, der zu Hause bleibt, wenn ich gehe.", "Ich selbst, wenn ich gehe.", "Ich selbst, wenn ich nach Hause komme.", "Jemand, der mich zu Hause empfängt."], correct: 0 },
    { category: 'radar', audioText: "おかえりなさい", q: { de: "Audio abspielen: Wer sagt das?", en: "Play audio: Who says this?" }, options: ["Jemand, der mich zu Hause empfängt.", "Ich selbst, wenn ich nach Hause komme.", "Ich selbst, wenn ich gehe.", "Jemand, der zu Hause bleibt."], correct: 0 },
    { category: 'radar', audioText: "これ、いくらですか。", q: { de: "Audio abspielen: Was fragt die Person?", en: "Play audio: What is the person asking?" }, options: ["Wie viel das kostet.", "Wo das ist.", "Was das ist.", "Wem das gehört."], correct: 0 },
    { category: 'radar', audioText: "ありがとうございます", q: { de: "Audio abspielen: Wie reagierst du darauf?", en: "Play audio: How do you react to this?" }, options: ["どういたしまして。", "いただきます。", "ごめんなさい。", "ただいま。"], correct: 0 }
  ];

  const startExam = () => {
    // 1. Array komplett mischen
    const shuffledPool = [...masterPool].sort(() => 0.5 - Math.random());
    
    // 2. 30 Fragen auswählen und dabei die Antwort-Optionen mischen!
    const selected = shuffledPool.slice(0, 30).map(q => {
      const correctText = q.options[q.correct];
      const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
      const newCorrectIndex = shuffledOptions.indexOf(correctText);
      
      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrectIndex
      };
    });
    
    setQuestions(selected);
    setScore(0);
    setWrongAnswers([]);
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

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // FEHLER PROTOKOLLIEREN
      setWrongAnswers(prev => [...prev, {
        questionText: currentQ.q[language] || currentQ.q.de,
        userChoice: currentQ.options[selectedAnswer],
        correctChoice: currentQ.options[currentQ.correct]
      }]);
    }
    
    setCategoryStats(prev => ({
      ...prev,
      [currentQ.category]: {
        correct: prev[currentQ.category].correct + (isCorrect ? 1 : 0),
        total: prev[currentQ.category].total + 1
      }
    }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
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

          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-8 min-h-[160px] flex flex-col items-center justify-center text-center">
            
            {/* NEU: AUDIO-BUTTON wenn audioText vorhanden ist */}
            {q.audioText && (
              <button 
                onClick={() => playAudio(q.audioText)}
                className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto hover:bg-blue-600/40 active:scale-95 transition-all shadow-lg shadow-blue-500/10 border border-blue-500/50"
              >
                🔊
              </button>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
              {q.q[language] || q.q.de}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => {
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
            
            <div className="space-y-4 mb-10">
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

            {/* Fehler-Protokoll */}
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⚠️</span> {t.errorLogTitle}
            </h3>
            
            <div className="space-y-4 mb-12">
              {wrongAnswers.length === 0 ? (
                <div className="bg-green-900/30 p-5 rounded-2xl border border-green-500/50 text-center">
                  <p className="text-green-400 font-bold">{t.errorLogEmpty}</p>
                </div>
              ) : (
                wrongAnswers.map((err, i) => (
                  <div key={i} className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                    <p className="text-white font-bold mb-3 border-b border-gray-700 pb-2">{err.questionText}</p>
                    <div className="flex flex-col gap-2">
                      <div className="bg-red-900/20 p-2 rounded-lg border border-red-500/30">
                        <span className="text-xs text-red-400 uppercase tracking-widest block mb-1">{t.yourAnswer}</span>
                        <span className="text-red-300 font-bold">{err.userChoice}</span>
                      </div>
                      <div className="bg-green-900/20 p-2 rounded-lg border border-green-500/30">
                        <span className="text-xs text-green-400 uppercase tracking-widest block mb-1">{t.correctAnswer}</span>
                        <span className="text-green-300 font-bold">{err.correctChoice}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
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