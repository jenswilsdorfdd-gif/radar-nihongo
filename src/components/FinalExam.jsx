import React, { useState, useEffect } from 'react';

const FinalExam = ({ onBack, language }) => {
  const [examState, setExamState] = useState('intro'); // intro, exam, result
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
      introDesc: "30 zufällige Fragen aus einem riesigen Pool. Komplexe Laute, N5-Kanjis, Partikel-Matrix und vor allem pures Audio-Hörverstehen (Radar). Kein Romaji. Fast kein Deutsch. Überlebe!",
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
      catKana: "Kana-Matrix (Erweitert)",
      catKanji: "N5 Kanji (Bedeutung & Lesung)",
      catParticle: "Partikel-Code",
      catRadar: "Radar (Audio & Dialoge)",
      evalPerfect: "Hervorragend! Dieses Gebiet sitzt blind im Langzeitgedächtnis.",
      evalGood: "Solide Leistung, aber im Ernstfall noch etwas langsam. Dranbleiben!",
      evalCritical: "Kritisch! Du bist hier ein leichtes Ziel. Unbedingt diese Phase wiederholen!"
    },
    en: {
      back: "Back",
      introTitle: "Final Exam",
      introSub: "The Ultimate Stress Test",
      introDesc: "30 random questions from a massive pool. Complex sounds, N5 Kanjis, Particle Matrix and pure audio listening comprehension (Radar). No Romaji. Survive!",
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
      catKana: "Kana Matrix (Advanced)",
      catKanji: "N5 Kanji (Meaning & Reading)",
      catParticle: "Particle Code",
      catRadar: "Radar (Audio & Dialogues)",
      evalPerfect: "Excellent! This area is completely locked in your long-term memory.",
      evalGood: "Solid performance, but might be too slow in real situations. Keep practicing!",
      evalCritical: "Critical! You are an easy target here. You must repeat this phase!"
    }
  };

  const t = texts[language] || texts.de;

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

  // MONSTER-POOL: ~100 Fragen, Fokus auf Japanisch und Audio!
  const masterPool = [
    // --- KANA (Fiese Laute & Verlängerungen) ---
    { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びょういん", en: "Hospital or Hairdresser? Read: びょういん" }, options: ["Krankenhaus", "Friseur", "Arzt", "Schönheit"], correct: 0 },
    { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びよういん", en: "Hospital or Hairdresser? Read: びよういん" }, options: ["Friseur", "Krankenhaus", "Firma", "Schule"], correct: 0 },
    { category: 'kana', q: { de: "Oma oder Tante? Lies: おばあさん", en: "Grandma or Aunt? Read: おばあさん" }, options: ["Oma / Ältere Frau", "Tante", "Mutter", "Schwester"], correct: 0 },
    { category: 'kana', q: { de: "Lies das Katakana-Wort: コンピューター", en: "Read the Katakana: コンピューター" }, options: ["Computer", "Kamera", "Kaffee", "Konzert"], correct: 0 },
    { category: 'kana', q: { de: "Was bedeutet: ぎゅうにゅう", en: "What means: ぎゅうにゅう" }, options: ["Kuhmilch", "Rindfleisch", "Schwein", "Zwiebel"], correct: 0 },
    { category: 'kana', q: { de: "Lies: じゅぎょう", en: "Read: じゅぎょう" }, options: ["Unterricht", "Firma", "Mitarbeiter", "Schüler"], correct: 0 },
    { category: 'kana', q: { de: "Finde: 'pya'", en: "Find: 'pya'" }, options: ["ぴゃ", "びゃ", "ひゃ", "ぱや"], correct: 0 },
    { category: 'kana', q: { de: "Lies: きょう", en: "Read: きょう" }, options: ["Heute", "Morgen", "Gestern", "Kaiser"], correct: 0 },
    { category: 'kana', q: { de: "Finde das Katakana 'shi':", en: "Find Katakana 'shi':" }, options: ["シ", "ツ", "ソ", "ン"], correct: 0 },
    { category: 'kana', q: { de: "Lies: がっこう", en: "Read: がっこう" }, options: ["Schule", "Schüler", "Lehrer", "Firma"], correct: 0 },
    { category: 'kana', q: { de: "Lies: しゅくだい", en: "Read: しゅくだい" }, options: ["Hausaufgaben", "Unterricht", "Prüfung", "Lehrer"], correct: 0 },
    { category: 'kana', q: { de: "Lies das Katakana: コーヒー", en: "Read Katakana: コーヒー" }, options: ["Kaffee", "Kola", "Kuchen", "Kopie"], correct: 0 },
    { category: 'kana', q: { de: "Was bedeutet: ちょっと", en: "What means: ちょっと" }, options: ["Ein bisschen", "Viel", "Warte", "Schnell"], correct: 0 },
    { category: 'kana', q: { de: "Finde: 'gyo'", en: "Find: 'gyo'" }, options: ["ぎょ", "ぎゅ", "きゃ", "きょ"], correct: 0 },

    // --- KANJI (N5) ---
    { category: 'kanji', q: { de: "Lies: 今日", en: "Read: 今日" }, options: ["きょう", "まいにち", "あした", "きのう"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 毎日", en: "Read: 毎日" }, options: ["まいにち", "きょう", "いつか", "にちようび"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 日本", en: "What means: 日本" }, options: ["Japan", "Sonntag", "Buch", "Heute"], correct: 0 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Mensch/Person':", en: "Find Kanji for 'Person':" }, options: ["人", "入", "八", "大"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 水曜日", en: "Read: 水曜日" }, options: ["すいようび (Mittwoch)", "かようび (Dienstag)", "もくようび (Donnerstag)", "きんようび (Freitag)"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 休み", en: "What means: 休み" }, options: ["Pause / Ruhen", "Baum", "Buch", "Körper"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 月", en: "Read: 月" }, options: ["つき / げつ", "ひ / にち", "き", "みず"], correct: 0 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Baum/Holz':", en: "Find Kanji for 'Tree':" }, options: ["木", "本", "休", "体"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 男の人", en: "What means: 男の人" }, options: ["Mann", "Frau", "Kind", "Mädchen"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 山川さん", en: "What means: 山川さん" }, options: ["Yamakawa-san (Name)", "Fluss und Berg", "Herr Berg", "Frau Fluss"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 食べます", en: "Read: 食べます" }, options: ["たべます", "のみます", "みます", "いきます"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 飲みます", en: "Read: 飲みます" }, options: ["のみます", "たべます", "よみます", "かきます"], correct: 0 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Groß':", en: "Find Kanji for 'Big':" }, options: ["大", "小", "中", "太"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 行きます", en: "Read: 行きます" }, options: ["いきます", "きます", "みます", "します"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 百", en: "What means: 百" }, options: ["Hundert", "Tausend", "Zehntausend", "Weiß"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 千円", en: "What means: 千円" }, options: ["1000 Yen", "100 Yen", "10000 Yen", "Yen"], correct: 0 },
    { category: 'kanji', q: { de: "Finde das Kanji für 'Auge':", en: "Find Kanji for 'Eye':" }, options: ["目", "日", "口", "耳"], correct: 0 },
    { category: 'kanji', q: { de: "Was bedeutet: 天気", en: "What means: 天気" }, options: ["Wetter", "Himmel", "Luft", "Geist"], correct: 0 },
    { category: 'kanji', q: { de: "Finde: 車", en: "Find: 車" }, options: ["くるま (Auto)", "でんしゃ (Zug)", "じてんしゃ (Fahrrad)", "えき (Bahnhof)"], correct: 0 },
    { category: 'kanji', q: { de: "Lies: 見ます", en: "Read: 見ます" }, options: ["みます", "ききます", "はなします", "かきます"], correct: 0 },

    // --- PARTICLE MATRIX ---
    { category: 'particle', q: { de: "わたし [ ? ] ドイツじんです。", en: "わたし [ ? ] ドイツじんです。" }, options: ["は", "を", "で", "に"], correct: 0 },
    { category: 'particle', q: { de: "みず [ ? ] のみます。", en: "みず [ ? ] のみます。" }, options: ["を", "は", "に", "が"], correct: 0 },
    { category: 'particle', q: { de: "あした、とうきょう [ ? ] いきます。", en: "あした、とうきょう [ ? ] いきます。" }, options: ["へ / に", "を", "で", "が"], correct: 0 },
    { category: 'particle', q: { de: "レストラン [ ? ] すしを たべる。", en: "レストラン [ ? ] すしを たべる。" }, options: ["で", "に", "は", "が"], correct: 0 },
    { category: 'particle', q: { de: "タクシー [ ? ] かえります。", en: "タクシー [ ? ] かえります。" }, options: ["で", "に", "を", "は"], correct: 0 },
    { category: 'particle', q: { de: "あめ [ ? ] ふっています。(Fokus!)", en: "あめ [ ? ] ふっています。(Focus!)" }, options: ["が", "を", "で", "は"], correct: 0 },
    { category: 'particle', q: { de: "ともだち [ ? ] えいがを みます。", en: "ともだち [ ? ] えいがを みます。" }, options: ["と", "から", "まで", "に"], correct: 0 },
    { category: 'particle', q: { de: "あさ、９じ [ ? ] おきます。", en: "あさ、９じ [ ? ] おきます。" }, options: ["に", "で", "を", "は"], correct: 0 },
    { category: 'particle', q: { de: "えき [ ? ] きました。(Startpunkt)", en: "えき [ ? ] きました。(Start point)" }, options: ["から", "まで", "に", "で"], correct: 0 },
    { category: 'particle', q: { de: "ホテル [ ? ] おねがいします。(Endpunkt)", en: "ホテル [ ? ] おねがいします。(End point)" }, options: ["まで", "を", "から", "は"], correct: 0 },
    { category: 'particle', q: { de: "ほん [ ? ] ノートを かいます。(Und)", en: "ほん [ ? ] ノートを かいます。(And)" }, options: ["と", "に", "で", "が"], correct: 0 },
    { category: 'particle', q: { de: "だれ [ ? ] きますか。(Fokus/Subjekt)", en: "だれ [ ? ] きますか。(Focus/Subject)" }, options: ["が", "は", "を", "で"], correct: 0 },
    { category: 'particle', q: { de: "にほんご [ ? ] はなします。", en: "にほんご [ ? ] はなします。" }, options: ["を / で", "に", "が", "から"], correct: 0 },
    { category: 'particle', q: { de: "スマホ [ ? ] しゃしんを とる。(Mittel)", en: "スマホ [ ? ] しゃしんを とる。(Means)" }, options: ["で", "に", "を", "は"], correct: 0 },
    { category: 'particle', q: { de: "ドイツ [ ? ] 日本まで。", en: "ドイツ [ ? ] 日本まで。" }, options: ["から", "に", "を", "が"], correct: 0 },

    // --- RADAR: PURES AUDIO & SITUATIONEN ---
    { category: 'radar', audioText: "おなまえは なんですか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["じぇんす です。", "ドイツから きました。", "はい、そうです。", "ありがとう。"], correct: 0 },
    { category: 'radar', audioText: "どこから きましたか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["ドイツから きました。", "ベルリンに いきます。", "はい、ドイツです。", "ちがいます。"], correct: 0 },
    { category: 'radar', audioText: "いただきます", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Vor dem Essen / Before eating", "Nach dem Essen / After eating", "Beim Betreten eines Ladens / Entering a store", "Beim Bezahlen / Paying"], correct: 0 },
    { category: 'radar', audioText: "ごちそうさまでした", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Nach dem Essen / After eating", "Vor dem Essen / Before eating", "Beim Vorstellen / Introducing", "Zur Verabschiedung / Farewell"], correct: 0 },
    { category: 'radar', audioText: "すみません、えきは どこですか。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: ["Sucht den Bahnhof / Looks for station", "Sucht die Toilette / Looks for toilet", "Fragt nach dem Preis / Asks for price", "Fragt nach der Zeit / Asks for time"], correct: 0 },
    { category: 'radar', audioText: "いらっしゃいませ", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: ["Verkäufer/Personal / Shop staff", "Ich selbst / Myself", "Gastfamilie / Host family", "Passant / Stranger"], correct: 0 },
    { category: 'radar', audioText: "これ、いくらですか。", q: { de: "🎧 Was fragt die Person?", en: "🎧 What is asked?" }, options: ["Wie viel das kostet / How much", "Wo das ist / Where it is", "Was das ist / What it is", "Wem das gehört / Whose it is"], correct: 0 },
    { category: 'radar', audioText: "これを おねがいします。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Man möchte etwas kaufen/bestellen / Buying/Ordering", "Man fragt nach dem Weg / Asking directions", "Man verabschiedet sich / Saying goodbye", "Man entschuldigt sich / Apologizing"], correct: 0 },
    { category: 'radar', audioText: "ありがとうございます", q: { de: "🎧 Deine Antwort?", en: "🎧 Your reply?" }, options: ["どういたしまして。", "いただきます。", "ごめんなさい。", "ただいま。"], correct: 0 },
    { category: 'radar', audioText: "おかいけい、おねがいします。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: ["Die Rechnung bitte / The bill please", "Speisekarte bitte / Menu please", "Wasser bitte / Water please", "Wo ist die Kasse? / Where is the register?"], correct: 0 },
    { category: 'radar', audioText: "ちょっと まってください。", q: { de: "🎧 Was passiert?", en: "🎧 What is happening?" }, options: ["Du sollst kurz warten / Wait a moment", "Jemand geht weg / Someone is leaving", "Jemand redet zu schnell / Speaking too fast", "Der Preis ist zu hoch / Price is too high"], correct: 0 },
    { category: 'radar', audioText: "いってきます", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: ["Die Person, die das Haus verlässt / Person leaving", "Die Person, die zu Hause bleibt / Person staying", "Die Person, die nach Hause kommt / Person arriving", "Der Verkäufer im Laden / Shop staff"], correct: 0 },
    { category: 'radar', audioText: "いってらっしゃい", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: ["Die Person, die zu Hause bleibt / Person staying", "Die Person, die das Haus verlässt / Person leaving", "Die Person, die nach Hause kommt / Person arriving", "Der Verkäufer im Laden / Shop staff"], correct: 0 },
    { category: 'radar', audioText: "ただいま", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: ["Die Person, die nach Hause kommt / Person arriving", "Die Person, die zu Hause bleibt / Person staying", "Die Person, die das Haus verlässt / Person leaving", "Der Verkäufer im Laden / Shop staff"], correct: 0 },
    { category: 'radar', audioText: "おかえりなさい", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: ["Die Person, die zu Hause bleibt (als Antwort) / Person staying (reply)", "Die Person, die nach Hause kommt / Person arriving", "Die Person, die das Haus verlässt / Person leaving", "Der Verkäufer im Laden / Shop staff"], correct: 0 },
    { category: 'radar', audioText: "もういちど おねがいします。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: ["Bitte wiederholen Sie das / Please repeat", "Bitte warten Sie / Please wait", "Bitte sprechen Sie langsamer / Please speak slower", "Ich verstehe nicht / I don't understand"], correct: 0 },
    { category: 'radar', audioText: "ゆっくり はなして ください。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: ["Bitte sprechen Sie langsamer / Please speak slower", "Bitte wiederholen Sie das / Please repeat", "Bitte warten Sie / Please wait", "Ich verstehe nicht / I don't understand"], correct: 0 },
    { category: 'radar', audioText: "えいごを はなしますか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["はい、はなします。", "えいごです。", "わかりません。", "ちがいます。"], correct: 0 },
    { category: 'radar', audioText: "トイレは どこですか。", q: { de: "🎧 Was fragt der NPC?", en: "🎧 What does the NPC ask?" }, options: ["Wo die Toilette ist / Where the toilet is", "Ob es eine Toilette gibt / If there is a toilet", "Wie viel es kostet / How much it costs", "Wer auf der Toilette ist / Who is in the toilet"], correct: 0 },
    { category: 'radar', audioText: "あした、なにを しますか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["とうきょうへ いきます。", "きのうです。", "にほんじんです。", "はい、そうです。"], correct: 0 },
    { category: 'radar', audioText: "これは なんですか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["それは ほんです。", "そこは ほんです。", "あそこです。", "ちがいます。"], correct: 0 },
    { category: 'radar', audioText: "カードで いいですか。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Bezahlen (Kartenzahlung ok?) / Paying (Card ok?)", "Nach dem Namen fragen / Asking for name", "Ticketkontrolle im Zug / Ticket check", "Einen Brief einwerfen / Mailing a letter"], correct: 0 },
    { category: 'radar', audioText: "ふくろは いりますか。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["An der Kasse (Tüte gefällig?) / Register (Need a bag?)", "Im Restaurant (Getränke?) / Restaurant (Drinks?)", "Auf der Straße (Hilfe?) / Street (Help?)", "Im Hotel (Schlüssel?) / Hotel (Key?)"], correct: 0 },
    { category: 'radar', audioText: "ちがいます。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: ["Das ist falsch / Das stimmt nicht / That's wrong", "Ich weiß nicht / I don't know", "Ich verstehe nicht / I don't understand", "Es tut mir leid / I'm sorry"], correct: 0 },
    { category: 'radar', audioText: "わかりません。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: ["Ich verstehe nicht / I don't understand", "Ich weiß nicht / I don't know", "Das ist falsch / That's wrong", "Es tut mir leid / I'm sorry"], correct: 0 },
    { category: 'radar', audioText: "えきまで おねがいします。", q: { de: "🎧 Wo bist du?", en: "🎧 Where are you?" }, options: ["Im Taxi / In a taxi", "Im Restaurant / In a restaurant", "Im Supermarkt / In a supermarket", "Auf der Post / At the post office"], correct: 0 },
    { category: 'radar', audioText: "ごめんください", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Man betritt das Haus von jemandem / Entering someone's house", "Man entschuldigt sich für einen Fehler / Apologizing for a mistake", "Man verlässt ein Geschäft / Leaving a store", "Man geht ans Telefon / Answering the phone"], correct: 0 },
    { category: 'radar', audioText: "もしもし", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: ["Am Telefon / On the phone", "Beim Anklopfen / Knocking on a door", "Jemanden auf der Straße rufen / Calling someone on the street", "Im Restaurant / In a restaurant"], correct: 0 },
    { category: 'radar', audioText: "なんめいさま ですか。", q: { de: "🎧 Wo bist du?", en: "🎧 Where are you?" }, options: ["Empfang im Restaurant (Wie viele Personen?) / Restaurant reception", "Am Bahnhof (Welcher Zug?) / Station", "Im Taxi (Wohin?) / Taxi", "Im Konbini (Tüte?) / Convenience store"], correct: 0 },
    { category: 'radar', audioText: "ふたりです。", q: { de: "🎧 Auf welche Frage antwortest du?", en: "🎧 Which question are you answering?" }, options: ["なんめいさま ですか。", "おなまえは なんですか。", "いくつですか。", "いくらですか。"], correct: 0 },
    { category: 'radar', audioText: "だいじょうぶ ですか。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: ["Ist alles in Ordnung? / Is everything ok?", "Wie spät ist es? / What time is it?", "Wer ist das? / Who is that?", "Wo ist das? / Where is that?"], correct: 0 },
    { category: 'radar', audioText: "はい、だいじょうぶ です。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: ["Ja, alles in Ordnung. / Yes, everything is ok.", "Ja, bitte. / Yes, please.", "Nein, danke. / No, thank you.", "Das ist falsch. / That's wrong."], correct: 0 },
    { category: 'radar', audioText: "いいえ、けっこうです。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: ["Nein, danke (ich brauche nichts). / No thank you.", "Das ist falsch. / That's wrong.", "Ich verstehe nicht. / I don't understand.", "Entschuldigung. / Excuse me."], correct: 0 }
  ];

  const startExam = () => {
    // 1. Master Pool durchmischen
    const shuffledPool = [...masterPool].sort(() => 0.5 - Math.random());
    
    // 2. Genau 30 Fragen picken und deren Optionen shuffeln
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
      // Wenn es eine Audio-Frage ist, speichern wir den Audio-Text als Kontext
      const questionPrompt = currentQ.audioText 
        ? `🎧 (Audio: ${currentQ.audioText})` 
        : (currentQ.q[language] || currentQ.q.de);

      setWrongAnswers(prev => [...prev, {
        questionText: questionPrompt,
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
          
          <div className="flex justify-center mb-6">
            <span className={`text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${catColors[q.category]}`}>
              {catLabels[q.category]}
            </span>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-8 min-h-[160px] flex flex-col items-center justify-center text-center">
            
            {q.audioText && (
              <button 
                onClick={() => playAudio(q.audioText)}
                className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto hover:bg-blue-600/40 active:scale-95 transition-all shadow-lg shadow-blue-500/10 border border-blue-500/50"
              >
                🔊
              </button>
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
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