import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ParticleCrashcourse = ({ onBack, language, targetLanguage = 'jp' }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  // Phasen: 'intro' (Allgemein) -> 'briefing' (Detail) -> 'drill' (Übung) -> 'feedback' (Auswertung) -> 'result' (Endstand)
  const [currentPhase, setCurrentPhase] = useState('intro'); 
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const currentLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'crashcourse';

  // --- SUPABASE STATES (MIT LOCALSTORAGE-CACHE) ---
  const [dbUiTexts, setDbUiTexts] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_ui_trans_${dbSourceLang}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [dbCourseManifest, setDbCourseManifest] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_manifest_${dbSourceLang}_${dbTargetLang}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [dbLessons, setDbLessons] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_decks_${dbTargetLang}_${moduleKey}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentLessonIndex, currentExerciseIndex, currentPhase]);

  // Abruf von ui_translations, course_manifests & course_decks aus Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchCrashcourseData = async () => {
      try {
        const [uiRes, manifestRes, deckRes] = await Promise.all([
          supabase
            .from('ui_translations')
            .select('content')
            .eq('lang_code', dbSourceLang)
            .single(),
          supabase
            .from('course_manifests')
            .select('manifest')
            .eq('source_lang', dbSourceLang)
            .eq('target_lang', dbTargetLang)
            .single(),
          supabase
            .from('course_decks')
            .select('content')
            .eq('target_lang', dbTargetLang)
            .eq('module_key', moduleKey)
            .eq('day_number', 1)
            .maybeSingle()
        ]);

        if (uiRes.data?.content && isMounted) {
          setDbUiTexts(uiRes.data.content);
          localStorage.setItem(`radar_ui_trans_${dbSourceLang}`, JSON.stringify(uiRes.data.content));
        }

        if (manifestRes.data?.manifest && isMounted) {
          setDbCourseManifest(manifestRes.data.manifest);
          localStorage.setItem(`radar_manifest_${dbSourceLang}_${dbTargetLang}`, JSON.stringify(manifestRes.data.manifest));
        }

        const fetchedLessons = deckRes.data?.content?.lessons || (Array.isArray(deckRes.data?.content) ? deckRes.data.content : null);
        if (fetchedLessons && fetchedLessons.length > 0 && isMounted) {
          setDbLessons(fetchedLessons);
          localStorage.setItem(`radar_decks_${dbTargetLang}_${moduleKey}`, JSON.stringify(fetchedLessons));
        }
      } catch (err) {
        console.error("Fehler beim Laden der Crashkurs-Daten aus Supabase:", err);
      }
    };

    fetchCrashcourseData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  const texts = {
    de: {
      back: "Zurück",
      title: isGermanTarget ? "Signal-Bausteine" : (isEnglishTarget ? "Zeiten-Matrix & Signale" : "Die Partikel"),
      subtitle: "Grundlagen Crashkurs",
      
      // Intro Texte
      introTitle: isGermanTarget ? "Was sind Signal-Bausteine?" : (isEnglishTarget ? "Was sind Zeiten-Signale?" : "Was sind Partikel?"),
      introP1: isGermanTarget 
        ? "Im Deutschen verschmelzen Präpositionen und Artikel häufig zu festen Signal-Blöcken (z. B. ZUM, ZUR, MIT DEM, IM)."
        : (isEnglishTarget
            ? "Im britischen Englisch entscheiden kleine Signalwörter (z. B. ALREADY, YET, SINCE, AGO) strikt darüber, welche Zeitform du nutzen musst."
            : "Im Japanischen steht das Verb immer am Ende. Aber woher wissen wir, wer was mit wem macht? Dafür gibt es Partikel!"),
      introP2: isGermanTarget
        ? "Statt im Gespräch komplizierte Fall-Tabellen (Dativ/Akkusativ) im Kopf auszurechnen, nutzt du diese fertigen Bausteine als direkte Wegweiser."
        : (isEnglishTarget
            ? "Sie sind die direkten Trigger für Present Perfect oder Past Simple sowie für präzise Orts- und Zeitpräpositionen (AT, ON, IN)."
            : "Sie sind der 'Kleber' des Satzes. Ein Partikel wird immer direkt HINTER ein Wort gehängt und bestimmt dessen grammatikalische Funktion (Subjekt, Objekt, Ort, Zeit)."),
      introP3: isGermanTarget
        ? "Sie zeigen deinem Gegenüber sofort Richtung, Ort, Transportmittel oder Bestellung an."
        : (isEnglishTarget
            ? "Stell sie dir wie Weichensteller vor: Sobald das Signalwort fällt, steht die Satzstruktur sofort fest."
            : "Stell sie dir wie kleine Verkehrsschilder vor, die dem japanischen Gehirn sagen: 'Achtung, das Wort davor ist ein Ort!'"),
      introWarning: isGermanTarget
        ? "Wichtig: Lerne Signal-Bausteine immer als fertigen Block – niemals isoliert!"
        : (isEnglishTarget
            ? "Wichtig: Kombiniere niemals ein abgeschlossenes Zeit-Signal (wie YESTERDAY) mit dem Present Perfect!"
            : "Wichtig: Ein Partikel steht niemals am Anfang eines Satzes!"),
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
      title: isGermanTarget ? "Signal Chunks" : (isEnglishTarget ? "Tense Matrix & Signals" : "The Particles"),
      subtitle: "Basics Crash Course",
      
      // Intro Texts
      introTitle: isGermanTarget ? "What are Signal Chunks?" : (isEnglishTarget ? "What are Tense Signals?" : "What are Particles?"),
      introP1: isGermanTarget
        ? "In German, prepositions and articles frequently fuse into fixed signal blocks (e.g., ZUM, ZUR, MIT DEM, IM)."
        : (isEnglishTarget
            ? "In British English, specific signal words (e.g., ALREADY, YET, SINCE, AGO) strictly determine which tense must be used."
            : "In Japanese, the verb is always at the end. But how do we know who is doing what to whom? That's what particles are for!"),
      introP2: isGermanTarget
        ? "Instead of calculating complex declension tables in your head while speaking, you deploy these ready-made chunks directly."
        : (isEnglishTarget
            ? "They act as immediate triggers for Present Perfect vs. Past Simple as well as core prepositions (AT, ON, IN)."
            : "They are the 'glue' of the sentence. A particle is always attached directly AFTER a word and determines its grammatical function (subject, object, location, time)."),
      introP3: isGermanTarget
        ? "They immediately signal direction, location, transport, or direct orders."
        : (isEnglishTarget
            ? "Think of them as railway switches: as soon as the signal word appears, the verb form is locked in."
            : "Think of them like tiny traffic signs telling the Japanese brain: 'Attention, the word before me is a location!'"),
      introWarning: isGermanTarget
        ? "Important: Always drill Signal Chunks as a single unit—never isolate the article!"
        : (isEnglishTarget
            ? "Important: Never combine a finished past time marker (like YESTERDAY) with the Present Perfect!"
            : "Important: A particle is never placed at the beginning of a sentence!"),
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
    },
    jpn: {
      back: "戻る",
      title: isGermanTarget ? "6大シグナル・パーツ" : (isEnglishTarget ? "時制マトリックス＆シグナル" : "助詞コード"),
      subtitle: "基礎クラッシュコース",
      
      introTitle: isGermanTarget ? "シグナル・パーツとは？" : (isEnglishTarget ? "時制シグナルとは？" : "助詞（パーティクル）とは？"),
      introP1: isGermanTarget
        ? "ドイツ語では前置詞と冠詞が融合し、ZUM・ZUR・MIT DEM・IM などの固定シグナル塊を作ります。"
        : (isEnglishTarget
            ? "イギリス英語では、ALREADY・YET・SINCE・AGO などのシグナル語が、使うべき時制を厳格に決定します。"
            : "日本語では動詞が常に文末に来ます。誰が・どこで・何を・どうするのかを瞬時に示すのが助詞の役割です。"),
      introP2: isGermanTarget
        ? "会話中に頭の中で複雑な格変化表（3格・4格）を計算する代わりに、これらの完成されたパーツをそのまま射出します。"
        : (isEnglishTarget
            ? "これらは現在完了形と過去形の切り替えや、場所・時間の前置詞（AT, ON, IN）を即座に選択するトリガーとなります。"
            : "助詞は文の「接着剤」です。常に単語の直後に配置され、主題・目的語・場所・時間などの文法的機能を決定します。"),
      introP3: isGermanTarget
        ? "目的地・交通手段・現在地・直接注文を瞬時に伝える交通標識の役割を果たします。"
        : (isEnglishTarget
            ? "シグナル語が見えた瞬間に動詞の形が自動的に決まる「ポイント切り替え機」として機能します。"
            : "直前の単語がどんな役割を持つかを示す「交通標識」として機能します。"),
      introWarning: isGermanTarget
        ? "鉄則：冠詞を単独で暗記せず、常に前置詞とセットの塊で自動化せよ！"
        : (isEnglishTarget
            ? "鉄則：YESTERDAY などの過去確定ワードと現在完了形（have + 過去分詞）を絶対に組み合わせないこと！"
            : "重要：助詞が文頭に来ることは絶対にありません！"),
      btnStartCourse: "理解完了 -> コースを開始",

      lesson: "レッスン",
      exercise: "演習",
      exampleLabel: "例文:",
      startExerciseBtn: "理解完了 -> 演習を開始",
      correctText: "正解！🎯",
      wrongText: "不正解！正解は:",
      whyText: "解説:",
      btnNext: "理解完了 -> 次へ",
      successTitle: "クラッシュコース完了",
      successQuote: "スコア:",
      btnRetry: "もう一度練習する",
      btnHome: "メニューへ戻る"
    }
  };

  const fallbackT = texts[currentLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    lesson: dbUiTexts?.lesson || fallbackT.lesson,
    exercise: dbUiTexts?.exercise || fallbackT.exercise,
    exampleLabel: dbUiTexts?.exampleLabel || fallbackT.exampleLabel,
    startExerciseBtn: dbUiTexts?.startExerciseBtn || fallbackT.startExerciseBtn,
    correctText: dbUiTexts?.correctText || fallbackT.correctText,
    wrongText: dbUiTexts?.wrongText || fallbackT.wrongText,
    whyText: dbUiTexts?.whyText || fallbackT.whyText,
    btnNext: dbUiTexts?.btnNext || fallbackT.btnNext,
    successTitle: dbUiTexts?.successTitle || fallbackT.successTitle,
    successQuote: dbUiTexts?.successQuote || fallbackT.successQuote,
    btnRetry: dbUiTexts?.btnRetry || fallbackT.btnRetry,
    btnHome: dbUiTexts?.btnHome || fallbackT.btnHome,
    title: dbCourseManifest?.crashTitle || fallbackT.title,
    subtitle: dbCourseManifest?.crashSubtitle || fallbackT.subtitle,
    introTitle: dbCourseManifest?.crashIntroTitle || fallbackT.introTitle,
    introP1: dbCourseManifest?.crashIntroP1 || fallbackT.introP1,
    introP2: dbCourseManifest?.crashIntroP2 || fallbackT.introP2,
    introP3: dbCourseManifest?.crashIntroP3 || fallbackT.introP3,
    introWarning: dbCourseManifest?.crashIntroWarning || fallbackT.introWarning,
    btnStartCourse: dbCourseManifest?.crashBtnStart || fallbackT.btnStartCourse
  };

  const fallbackLessons = [
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
      jpn: {
        title: "主題 [ は ]",
        explanation: "「は」と書いて「わ」と発音します。文の主題（「〜については」）を示します。",
        exampleSentence: "わたし は じぇんす です。",
        exampleTrans: "私はイェンスです。"
      },
      exercises: [
        { sentence: "わたし [ ? ] ドイツじんです。", de: "Ich bin Deutscher.", en: "I am German.", jpn: "私はドイツ人です。" },
        { sentence: "これ [ ? ] みず です。", de: "Das ist Wasser.", en: "This is water.", jpn: "これは水です。" },
        { sentence: "やまださん [ ? ] せんせいです。", de: "Herr Yamada ist Lehrer.", en: "Mr. Yamada is a teacher.", jpn: "山田さんは先生です。" }
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
      jpn: {
        title: "直接目的語 [ を ]",
        explanation: "動作の対象（「何を」食べる・飲む・買う・読むか）を示します。",
        exampleSentence: "すし を たべる。",
        exampleTrans: "寿司を食べる。"
      },
      exercises: [
        { sentence: "ほん [ ? ] よむ。", de: "Ein Buch lesen.", en: "Read a book.", jpn: "本を読む。" },
        { sentence: "くるま [ ? ] かう。", de: "Ein Auto kaufen.", en: "Buy a car.", jpn: "車を買う。" },
        { sentence: "コーヒー [ ? ] のむ。", de: "Kaffee trinken.", en: "Drink coffee.", jpn: "コーヒーを飲む。" }
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
      jpn: {
        title: "目的地・時点 [ に ]",
        explanation: "移動の到着点（「〜へ/〜に」）や、具体的な時間を示します。",
        exampleSentence: "とうきょう に いきます。",
        exampleTrans: "東京に行きます。"
      },
      exercises: [
        { sentence: "ホテル [ ? ] いきます。", de: "Ich gehe zum Hotel.", en: "I go to the hotel.", jpn: "ホテルに行きます。" },
        { sentence: "７じ [ ? ] おきる。", de: "Um 7 Uhr aufstehen.", en: "Wake up at 7 o'clock.", jpn: "7時に起きる。" },
        { sentence: "あした、かいしゃ [ ? ] いきます。", de: "Morgen gehe ich zur Firma.", en: "Tomorrow I go to the company.", jpn: "明日、会社に行きます。" }
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
      jpn: {
        title: "動作の場所・手段 [ で ]",
        explanation: "動作を行う場所（「どこで」）や、交通手段・道具（「何で」）を示します。",
        exampleSentence: "でんしゃ で いきます。",
        exampleTrans: "電車で行きます。"
      },
      exercises: [
        { sentence: "タクシー [ ? ] きた。", de: "Ich bin mit dem Taxi gekommen.", en: "I came by taxi.", jpn: "タクシーで来た。" },
        { sentence: "レストラン [ ? ] たべる。", de: "Im Restaurant essen.", en: "Eat at the restaurant.", jpn: "レストランで食べる。" },
        { sentence: "スマホ [ ? ] みる。", de: "Auf dem Smartphone ansehen.", en: "Watch on the smartphone.", jpn: "スマホで見る。" }
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
      jpn: {
        title: "主語・焦点 [ が ]",
        explanation: "目の前の現象（天気など）や存在（「〜がある/いる」）、疑問詞の主語を示します。",
        exampleSentence: "あめ が ふっています。",
        exampleTrans: "雨が降っています。"
      },
      exercises: [
        { sentence: "ゆき [ ? ] ふる。", de: "Schnee fällt.", en: "Snow is falling.", jpn: "雪が降る。" },
        { sentence: "おかね [ ? ] あります。", de: "Ich habe Geld. (Geld existiert)", en: "I have money. (Money exists)", jpn: "お金があります。" },
        { sentence: "だれ [ ? ] いきますか。", de: "Wer geht?", en: "Who is going?", jpn: "誰が行きますか。" }
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
      jpn: {
        title: "共同・並列 [ と ]",
        explanation: "名詞と名詞を繋ぐ「〜と」、または人と行動を共にする「〜と一緒に」を示します。",
        exampleSentence: "ともだち と たべる。",
        exampleTrans: "友達と食べる。"
      },
      exercises: [
        { sentence: "かぞく [ ? ] はなす。", de: "Mit der Familie sprechen.", en: "Talk with family.", jpn: "家族と話す。" },
        { sentence: "パン [ ? ] ぎゅうにゅう。", de: "Brot und Milch.", en: "Bread and milk.", jpn: "パンと牛乳。" },
        { sentence: "せんせい [ ? ] あう。", de: "Sich mit dem Lehrer treffen.", en: "Meet with the teacher.", jpn: "先生と会う。" }
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
      jpn: {
        title: "起点 [ から ]",
        explanation: "場所や時間の出発点・始まり（「〜から」）を示します。",
        exampleSentence: "えき から きました。",
        exampleTrans: "駅から来ました。"
      },
      exercises: [
        { sentence: "ドイツ [ ? ] きました。", de: "Ich komme aus Deutschland.", en: "I came from Germany.", jpn: "ドイツから来ました。" },
        { sentence: "９じ [ ? ] です。", de: "Es startet ab 9 Uhr.", en: "It starts at 9 o'clock.", jpn: "9時からです。" },
        { sentence: "えき [ ? ] あるく。", de: "Vom Bahnhof aus laufen.", en: "Walk from the station.", jpn: "駅から歩く。" }
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
      jpn: {
        title: "終点 [ まで ]",
        explanation: "場所や時間の到達点・終わり（「〜まで」）を示します。",
        exampleSentence: "ホテル まで あるく。",
        exampleTrans: "ホテルまで歩く。"
      },
      exercises: [
        { sentence: "５じ [ ? ] はたらく。", de: "Bis 5 Uhr arbeiten.", en: "Work until 5 o'clock.", jpn: "5時まで働く。" },
        { sentence: "えき [ ? ] おねがいします。", de: "Zum Bahnhof bitte.", en: "To the station, please.", jpn: "駅までお願いします。" },
        { sentence: "あした [ ? ] まつ。", de: "Bis morgen warten.", en: "Wait until tomorrow.", jpn: "明日まで待つ。" }
      ]
    }
  ];

  // Aktives Lektions-Array (Vorrang für Supabase course_decks, sonst lokaler Fallback)
  const lessons = (dbLessons && dbLessons.length > 0) ? dbLessons : fallbackLessons;

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

  const currentLesson = lessons[currentLessonIndex] || fallbackLessons[0];
  const currentLessonData = currentLesson[currentLang] || currentLesson[dbSourceLang] || currentLesson.de;
  const currentExercise = currentLesson.exercises[currentExerciseIndex] || currentLesson.exercises[0];
  
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

      {/* INTRO PHASE */}
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
                    {currentExercise[currentLang] || currentExercise[dbSourceLang] || currentExercise.de}
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