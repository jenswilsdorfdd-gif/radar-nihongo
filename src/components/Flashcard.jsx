import React, { useState, useEffect } from 'react';
import { radarData } from '../data/radarData';
import { deRadarData } from '../data/deRadarData';

const Flashcard = ({ day, onBack, onNextDay, language, targetLanguage = 'jp' }) => {
  const isGermanTarget = targetLanguage === 'de';
  const currentLang = language || 'de';

  // Notfall-Szenarien für Deutsch (day === 'emergency')
  const emergencyScenariosDE = [
    {
      context: "Notrufzentrale (Notarzt / 112). Eine Person liegt bewusstlos am Bahnsteig.",
      userTask: "Setze den Notruf 112 ab und fordere sofortige Hilfe an.",
      german: "Notruf! Hier ist eine Person bewusstlos am Hauptbahnhof! Schicken Sie sofort einen Notarzt!",
      audioText: "Notruf! Hier ist eine Person bewusstlos am Hauptbahnhof! Schicken Sie sofort einen Notarzt!",
      translation: "緊急通報です！中央駅で人が意識を失っています！至急救急医を派遣してください！",
      counterpart: "Notrufzentrale. Wo genau am Bahnhof? Atmet die Person noch? Bleiben Sie am Telefon!",
      counterpartTranslation: "緊急指令センターです。駅の正確にはどこですか？呼吸はしていますか？電話を切らずに！",
      survivalHack: "112 ist der EU-Notruf für Notarzt und Feuerwehr. Bleibe am Telefon und nenne den genauen Standort."
    },
    {
      context: "Polizeinotruf 110. Du wirst bedroht oder bestohlen und brauchst Schutz.",
      userTask: "Wähle 110 und melde den Übergriff mit Standortangabe.",
      german: "Polizei-Notruf! Ich werde bedroht und brauche sofort Hilfe!",
      audioText: "Polizei-Notruf! Ich werde bedroht und brauche sofort Hilfe!",
      translation: "警察緊急通報です！私は脅迫されており、今すぐ助けが必要です！",
      counterpart: "Polizei. Nennen Sie uns Ihren genauen Standort! Ein Streifenwagen ist unterwegs.",
      counterpartTranslation: "警察です。正確な現在地を言ってください！パトカーが向かっています。",
      survivalHack: "110 ist die Direktwahl zur Landespolizei in Deutschland. Keine Vorwahl nötig."
    },
    {
      context: "Fahrkartenkontrolle in der S-Bahn. Ticket nicht entwertet oder verloren.",
      userTask: "Erkläre dem Kontrolleur sofort sachlich die Situation.",
      german: "Entschuldigung, ich habe mein Ticket verloren. Kann ich hier nachlösen?",
      audioText: "Entschuldigung, ich habe mein Ticket verloren. Kann ich hier nachlösen?",
      translation: "すみません、切符を紛失してしまいました。ここで精算できますか？",
      counterpart: "Nein, im Zug gibt es keinen Verkauf. Bitte zeigen Sie Ihren Ausweis für das Erhöhte Beförderungsentgelt.",
      counterpartTranslation: "いいえ、車内販売はありません。割増運賃の手続きのため身分証をご提示ください。",
      survivalHack: "In deutschen Verkehrsmitteln gibt es keine Nachlösung. Ruhe bewahren und Verlustanzeige anfordern."
    }
  ];

  // Datenquelle initialisieren
  const getInitialQueue = () => {
    if (isGermanTarget) {
      if (day === 'emergency') {
        return emergencyScenariosDE;
      }
      const deItem = deRadarData[day];
      if (deItem) {
        return [deItem];
      }
      return [{
        context: "Keine Daten gefunden",
        userTask: "Dieser Tag ist noch nicht eingepflegt.",
        german: "",
        translation: "",
        counterpart: "",
        counterpartTranslation: "",
        survivalHack: ""
      }];
    }

    const jpData = radarData[day] || { scenarios: [{ context: "Keine Daten", userTask: "Tag fehlt." }] };
    return jpData.scenarios ? [...jpData.scenarios] : [];
  };

  const [queue, setQueue] = useState(getInitialQueue);
  const [isFinished, setIsFinished] = useState(false);
  
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [speechAttempts, setSpeechAttempts] = useState(0);
  const [speechResult, setSpeechResult] = useState(null); 

  const [wrongScans, setWrongScans] = useState([]); 

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
      failedSpeech: "Muster-Lösung:",
      perfectSpeech: "Ziel erfasst! Muster-Lösung:",
      npcReplies: "Gegenüber antwortet",
      instructionPhase2: isGermanTarget 
        ? "Audio abspielen. Wie lautet die typische Reaktion vor Ort?"
        : "Audio abspielen und zuhören. Welche Information erkennst du?",
      targetAcquired: "Ziel erfasst",
      targetFailed: "Fehlerhafte Ortung",
      btnNextPhase: "Gegenüber antwortet (Phase 2)",
      btnRetry: "Nochmal (Ans Ende)",
      btnGotIt: "Sitzt (Nächste)",
      btnSkip: "Überspringen & Aufdecken",
      btnNextCard: "Sitzt (Nächste Mission)",
      finishTitle: "Einsatz Erfolgreich",
      finishSub: "Radar-Mission beendet",
      backToMenu: "Zurück zum Deck",
      errorMsg: "Noch keine Missionen für Tag",
      survivalHackTitle: "D/A/CH-Survival Hack:",
      
      finishFinalTitle: isGermanTarget ? "D/A/CH Radar Komplett!" : "Phase 3 Komplett!",
      finishFinalSub: isGermanTarget ? "21 Tage Survival GEMEISTERT! 🛡️" : "Stresstest ÜBERLEBT! 🥋",
      finishFinalDesc: isGermanTarget 
        ? "Großartige Leistung! Du hast alle 21 kritischen Alltagstransaktionen in Deutschland, Österreich und der Schweiz trainiert. Bereit für Phase 4: Komposita-Scan?"
        : "Wahnsinn! Du hast dein Gehör an das echte Japan-Tempo gewöhnt. Wenn du jetzt in Tokio an der Kasse stehst, bist du kein hilfloser Tourist mehr. Halte deine Reflexe scharf und wiederhole Missionen, wann immer du willst! Für tägliche Japan-Hacks sehen wir uns auf Insta. Bereit für den Feinschliff?",
      finishFinalNext: isGermanTarget ? "Weiter zu Phase 4 (Komposita) 🏛️" : "Weiter zu Phase 4 (Kanji) 🏯",

      motivations: {
        1: "Willkommen im Radar! Die ersten Signale im Nahverkehr sitzen. Weiter so!",
        2: "Einsatz 2 überlebt! Fahrplanänderungen bringen dich nicht mehr aus dem Konzept.",
        3: "Stark! Verspätungen und Anschlussverbindungen hast du voll im Griff.",
        4: "Tag 4 im Kasten! Taxifahrten und Zielangaben laufen flüssig.",
        5: "Einsatz 5 erledigt! Hotel-Check-in ohne Reibungsverluste gemeistert.",
        6: "Sechs Tage Radar-Training! An der Bäckerei-Theke bestellst du wie ein Einheimischer.",
        7: "Woche 1 im Stresstest geschafft! Supermarktkasse und Warentrenner sitzen blind.",
        8: "Tag 8 abgehakt! Pfandautomat und Kassenbon souverän geregelt.",
        9: "Einsatz 9 gemeistert! Wasser- und Kaffeebestellungen präzise formuliert.",
        10: "Zweistellig! Tag 10! Tisch-Rechnung und Trinkgeld-Rundung automatisiert.",
        11: "Tag 11 im Sack! Getrennte Rechnungen im Restaurant problemlos abgewickelt.",
        12: "Zwölf Tage Radar! Apotheke von Drogerie sicher unterschieden.",
        13: "Einsatz 13 geschafft! Symptome und Schmerzstellen exakt lokalisiert.",
        14: "Zwei Wochen Stresstest! Arztbesuch und Versicherungsnachweis im Griff.",
        15: "Tag 15 abgehakt! Verlustanzeige bei der Polizei souverän diktiert.",
        16: "Tag 16 erledigt! Notruf 112 ruhig und strukturiert abgesetzt.",
        17: "Einsatz 17 im Kasten! Polizei-Notruf 110 mit Standortmeldung sitzt.",
        18: "Achtzehn Tage Radar! Zimmerreklamationen klar und bestimmt formuliert.",
        19: "Tag 19 gemeistert! Gepäckaufbewahrung und Schließfächer fehlerfrei bedient.",
        20: "Tag 20! Vorletzter Einsatz. Wegbeschreibungen akustisch sicher gefiltert.",
        21: "Tag 21 vollbracht! Alle 21 D/A/CH-Survival-Situationen blind gemeistert!"
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
      failedSpeech: "Target solution:",
      perfectSpeech: "Target acquired! Solution:",
      npcReplies: "Counterpart replies",
      instructionPhase2: isGermanTarget 
        ? "Play audio. How does the local counterpart respond?"
        : "Play audio and listen. What information do you recognize?",
      targetAcquired: "Target acquired",
      targetFailed: "Scan failed",
      btnNextPhase: "Counterpart replies (Phase 2)",
      btnRetry: "Retry (Move to end)",
      btnGotIt: "Got it (Next)",
      btnSkip: "Skip & Reveal",
      btnNextCard: "Got it (Next card)",
      finishTitle: "Mission Successful",
      finishSub: "Radar Mission completed",
      backToMenu: "Back to Deck",
      errorMsg: "No missions yet for Day",
      survivalHackTitle: "D/A/CH Survival Hack:",
      
      finishFinalTitle: isGermanTarget ? "D/A/CH Radar Complete!" : "Phase 3 Complete!",
      finishFinalSub: isGermanTarget ? "21 Days of Survival MASTERED! 🛡️" : "Stress Test SURVIVED! 🥋",
      finishFinalDesc: isGermanTarget
        ? "Outstanding performance! You have mastered all 21 everyday transactions in Germany, Austria, and Switzerland. Ready for Phase 4: Compound Words?"
        : "Amazing! You've tuned your ears to the real Japanese speed. When you stand at a cash register in Tokyo now, you're no helpless tourist anymore.",
      finishFinalNext: isGermanTarget ? "Continue to Phase 4 (Compounds) 🏛️" : "Continue to Phase 4 (Kanji) 🏯",

      motivations: {
        1: "Welcome to Radar! First signals in local transit are locked in.",
        2: "Mission 2 survived! Track changes won't throw you off anymore.",
        3: "Strong! Delays and connections are under control.",
        4: "Day 4 in the bag! Taxi rides and destinations flow smoothly.",
        5: "Mission 5 done! Hotel check-in handled flawlessly.",
        6: "Six days of Radar! Ordering at the bakery counter like a local.",
        7: "Week 1 stress test complete! Checkout conveyor rules internalized.",
        8: "Day 8 checked off! Bottle return and receipts managed.",
        9: "Mission 9 mastered! Coffee and water orders placed cleanly.",
        10: "Double digits! Day 10! Tipping and bill rounding fully automated.",
        11: "Day 11 in the bag! Split bills resolved without confusion.",
        12: "Twelve days of Radar! Pharmacy and drugstore strictly distinguished.",
        13: "Mission 13 done! Medical symptoms communicated accurately.",
        14: "Two weeks of stress testing! Doctor visit protocol secured.",
        15: "Day 15 checked off! Police theft report filed clearly.",
        16: "Day 16 done! Emergency 112 called in calmly.",
        17: "Mission 17 in the box! Police 110 with location dispatch ready.",
        18: "Eighteen days of Radar! Room complaints articulated firmly.",
        19: "Day 19 mastered! Luggage storage requested smoothly.",
        20: "Day 20! Almost there. Street directions filtered quickly.",
        21: "Day 21 complete! All 21 D/A/CH survival transactions mastered!"
      }
    },
    jpn: {
      back: "レーダー一覧",
      remaining: "残り:",
      scenario: "現場シチュエーション",
      action: "必須アクション",
      vocabHint: "重要語彙:",
      scanActive: "レーダースキャン作動中",
      listenActive: "音声を認識中...",
      listenPrompt: "タップして発話",
      yourInput: "あなたの発言:",
      retrySpeech: "惜しい！残り",
      retrySpeechSuffix: "回",
      failedSpeech: "模範解答:",
      perfectSpeech: "即応成功！模範解答:",
      npcReplies: "相手の定型応答",
      instructionPhase2: isGermanTarget 
        ? "音声を再生して相手（店員・駅員・警察）の応答を確認せよ。"
        : "音声を再生して内容を聞き取ってください。",
      targetAcquired: "目標捕捉",
      targetFailed: "応答不一致",
      btnNextPhase: "相手の応答へ進む (第2段階)",
      btnRetry: "もう一度 (末尾へ移動)",
      btnGotIt: "習得完了 (次へ)",
      btnSkip: "スキップして模範確認",
      btnNextCard: "次へ進む",
      finishTitle: "ミッション遂行完了",
      finishSub: "レーダー演習終了",
      backToMenu: "レーダー一覧へ戻る",
      errorMsg: "対象日のデータがありません",
      survivalHackTitle: "D/A/CHサバイバル鉄則:",
      
      finishFinalTitle: "実戦D/A/CHレーダー完全クリア！",
      finishFinalSub: "21日間サバイバル制覇！🛡️",
      finishFinalDesc: "圧倒的成果です！ドイツ・オーストリア・スイスの21大現場トランザクションをすべて反射レベルでクリアしました。次は第4フェーズ：複合語スキャン（Komposita）へ進みます！",
      finishFinalNext: "第4フェーズ（複合語スキャン）へ進む 🏛️",

      motivations: {
        1: "レーダーへようこそ！信用乗車の打刻確認が身体に染み込みました。",
        2: "2日目クリア！番線変更のアナウンスにも動じず対応できます。",
        3: "接続列車の確認完了！遅延時の即座交渉力が身についています。",
        4: "4日目達成！タクシーの目的地指示パーツ（Zum/Zur）が即座に出ます。",
        5: "5日目完了！ホテルのチェックイン手続きをスムーズに完結。",
        6: "6日目クリア！対面パン屋での個数注文が完全に自動化。",
        7: "第1週制覇！スーパーの猛烈なレジ会計と袋の要求をクリア。",
        8: "8日目完了！空き瓶回収機（Pfand）の換金手順を制覇。",
        9: "9日目クリア！炭酸なし水の明示注文でトラブルを回避。",
        10: "ついに10日目！テーブル会計の端数切り上げチップ話法を体得。",
        11: "11日目達成！飲食店での別々会計（Getrennt）を即座に宣言。",
        12: "12日目完了！薬局（Apotheke）とドラッグストアの境界線を完璧に識別。",
        13: "13日目クリア！身体部位と痛みの表現を薬剤師へ正確に伝達。",
        14: "2週間の実戦演習達成！医院での急患交渉手順を確立。",
        15: "15日目クリア！警察署での盗難届調書（Protokoll）作成を突破。",
        16: "16日目達成！人命救助の緊急通報112を冷静にコール。",
        17: "17日目完了！警察通報110での現在地報告が完璧に機能。",
        18: "18日目クリア！ホテルの設備不良（暖房故障）を毅然と抗議。",
        19: "19日目達成！スーツケース預かりの交渉と保管札の受領を完了。",
        20: "20日目！交差点や方角の案内（直進・左折・右折）を即座に聴取。",
        21: "21日目完全制覇！不測の事態（代行バス＋カード決済）を乗り越えました！"
      }
    }
  };

  const t = texts[currentLang === 'jpn' ? 'jpn' : (texts[currentLang] ? currentLang : 'de')] || texts.de;

  useEffect(() => {
    setQueue(getInitialQueue());
    setIsFinished(false);
    resetState();
  }, [day, targetLanguage]);

  const currentScenario = queue[0];
  const isScanner = !isGermanTarget && currentScenario?.type === 'scanner'; 

  // Sprachsynthese: Dynamisch de-DE oder ja-JP
  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = isGermanTarget
        ? text.replace(/\[.*?\]/g, '').trim()
        : text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isGermanTarget ? 'de-DE' : 'ja-JP';
      utterance.rate = isGermanTarget ? 0.92 : 0.90; 
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (speechResult === 'failed' && currentScenario) {
      const speechToPlay = isGermanTarget ? currentScenario.audioText : currentScenario.userSpeech;
      if (speechToPlay) playAudio(speechToPlay);
    }
  }, [speechResult, currentScenario, isGermanTarget]);

  // Spracherkennung[cite: 4]
  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Dein Browser unterstützt leider keine Spracherkennung. Bitte nutze Chrome oder Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = isGermanTarget ? 'de-DE' : 'ja-JP'; 
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
      
      const expectedText = isGermanTarget ? currentScenario.german : currentScenario.userSpeech;
      const isPerfect = isGermanTarget 
        ? evaluateSpeechDE(expectedText, result)
        : evaluateSpeechJP(expectedText, result);
      
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

  // Tolerante Erkennung für deutsche Transkriptionen
  const evaluateSpeechDE = (expectedRaw, transcriptRaw) => {
    if (!transcriptRaw || !expectedRaw) return false;
    const clean = (s) => s.toLowerCase().replace(/[^a-zäöüß0-9]/gi, '');
    const cleanExpected = clean(expectedRaw);
    const cleanInput = clean(transcriptRaw);
    return cleanInput.includes(cleanExpected) || cleanExpected.includes(cleanInput);
  };

  // Ursprüngliche Erkennung für Japanisch[cite: 4]
  const evaluateSpeechJP = (expectedRaw, transcriptRaw) => {
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
    if (isGermanTarget) return <span>{text}</span>;
    
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

  if (isFinished) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-md mx-auto flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 bg-yellow-900/30 border-4 border-yellow-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(234,179,8,0.4)]">
              📡
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">{t.finishFinalTitle}</h1>
            <h2 className="text-yellow-400 font-bold tracking-widest uppercase mb-4">{t.finishFinalSub}</h2>
            <p className="text-gray-300 text-sm text-center max-w-md mb-10 leading-relaxed px-4">
              {t.finishFinalDesc}
            </p>
            <div className="w-full space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 uppercase tracking-widest active:scale-95 transition-all cursor-pointer">
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
        <div className="w-full max-w-md mx-auto flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">{t.finishTitle}</h1>
          <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4">{t.finishSub}</h2>
          
          <p className="text-gray-300 text-sm text-center max-w-md mb-10 leading-relaxed px-4">
            {dailyMotivation}
          </p>

          <button onClick={onBack} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600 uppercase tracking-widest cursor-pointer">
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
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold cursor-pointer">Zurück</button>
      </div>
    );
  }

  const isAnswerCorrect = isGermanTarget ? true : (isScanner ? step === 3 : selectedIndex === currentScenario.correctIndex);

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Obere Navigationsleiste */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold cursor-pointer">
          &larr; {t.back}
        </button>
        <span className="text-yellow-500 text-xs sm:text-sm font-bold">
          {day === 'emergency' ? 'NOTFALL' : `Einsatz ${day}`} | {t.remaining} {queue.length}
        </span>
      </div>

      <div className="w-full max-w-md mx-auto mt-12 flex flex-col items-center">
        
        {/* Phase 1: Szenario-Karte */}
        <div className="w-full bg-gray-800 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-lg mb-4">
          <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-2">{t.scenario}</p>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{currentScenario.context || currentScenario.scenario}</p>
          
          {currentScenario.physicalAction && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-xl p-4 mb-4 text-center">
              <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">{t.action}</p>
              <p className="text-orange-200 font-bold">{currentScenario.physicalAction}</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-700 text-center">
            <p className="text-white font-bold leading-relaxed">{currentScenario.userTask || currentScenario.trigger}</p>
            
            {currentScenario.vocabHint && (
              <div className="mt-3 inline-block bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5">
                <p className="text-xs text-yellow-400 font-bold tracking-wide uppercase">
                  {t.vocabHint} <span className="text-white ml-1 text-sm">{renderTextWithFuriganaAndParticles(currentScenario.vocabHint)}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Scanner-Optionen für Japanisch */}
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
                      className={`text-lg px-3 py-2 rounded-lg transition-all shadow-md font-bold cursor-pointer ${
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

          {/* Spracheingabe Trigger */}
          {step === 1 && !isScanner && speechResult !== 'perfect' && speechResult !== 'failed' && (
            <div className="mt-6 flex flex-col items-center">
              <button 
                onClick={handleListen}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg cursor-pointer ${isListening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 active:scale-95'}`}
                title="Mikrofon starten"
              >
                🎤
              </button>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                {isListening ? t.listenActive : t.listenPrompt}
              </p>
            </div>
          )}

          {/* Transkription & Ergebnis */}
          {step === 1 && !isScanner && transcript && (
            <div className="mt-6 w-full bg-blue-900/20 rounded-xl p-4 border border-blue-500/30 text-left animate-fade-in">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{t.yourInput}</p>
              <p className={`text-base font-bold mb-2 ${speechResult === 'perfect' ? 'text-green-400' : 'text-red-500'}`}>
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
                    <p className="text-lg font-bold text-white leading-relaxed">
                      {isGermanTarget ? currentScenario.german : renderTextWithFuriganaAndParticles(currentScenario.userSpeech)}
                    </p>
                    <button 
                      onClick={() => playAudio(isGermanTarget ? currentScenario.german : currentScenario.userSpeech)} 
                      className="text-blue-400 text-lg ml-2 active:scale-90 flex-shrink-0 cursor-pointer"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Überspringen Button in Phase 1 */}
          {step === 1 && speechResult !== 'perfect' && speechResult !== 'failed' && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => setSpeechResult('failed')} 
                className="text-xs text-gray-500 hover:text-gray-300 uppercase tracking-widest font-bold underline cursor-pointer"
              >
                {t.btnSkip}
              </button>
            </div>
          )}
        </div>

        {/* Phase 2: Gegenüber antwortet (nur Japanisch) */}
        {step === 2 && !isGermanTarget && !isScanner && (
          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4 animate-fade-in text-center">
            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">{t.npcReplies}</p>
            
            <button 
              onClick={() => playAudio(currentScenario.npcReply)} 
              className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto hover:bg-red-600/40 active:scale-95 transition-all shadow-lg shadow-red-500/10 cursor-pointer"
            >
              🔊
            </button>
            <p className="text-sm text-gray-300 mb-6 italic">{t.instructionPhase2}</p>

            <div className="space-y-3">
              {currentScenario.options && currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white text-left transition-colors cursor-pointer"
                >
                  {renderTextWithFuriganaAndParticles(option)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2 für Deutsch: Gegenüber antwortet & Survival Hack */}
        {step === 2 && isGermanTarget && (
          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-blue-500/40 mb-4 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <p className="text-blue-400 text-xs font-bold tracking-widest uppercase">{t.npcReplies}</p>
              <button 
                onClick={() => playAudio(currentScenario.counterpart)} 
                className="text-blue-400 hover:text-white text-xl cursor-pointer"
              >
                🔊
              </button>
            </div>

            <p className="text-lg font-bold text-white mb-2 leading-relaxed">
              "{currentScenario.counterpart}"
            </p>
            <p className="text-sm text-yellow-400 italic mb-6">
              "{currentScenario.counterpartTranslation}"
            </p>

            {currentScenario.survivalHack && (
              <div className="bg-blue-950/60 border border-blue-500/40 rounded-xl p-4">
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  💡 {t.survivalHackTitle}
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentScenario.survivalHack}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Abschluss/Auswertung für Japanisch */}
        {step === 3 && !isGermanTarget && (
          <div className={`w-full rounded-2xl p-6 border mb-4 animate-fade-in relative overflow-hidden ${isAnswerCorrect ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <p className={`text-xs font-bold tracking-widest uppercase ${isAnswerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isAnswerCorrect ? t.targetAcquired : t.targetFailed}
              </p>
              {!isScanner && (
                <button onClick={() => playAudio(currentScenario.npcReply)} className="text-gray-400 hover:text-white text-lg active:scale-90 cursor-pointer">🔊</button>
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

      {/* Button-Leiste unten */}
      <div className="w-full max-w-md mt-4 mx-auto pb-8">
        
        {step === 1 && !isScanner && (
          <div className="space-y-3">
            {(speechResult === 'perfect' || speechResult === 'failed') && (
              <>
                <button 
                  onClick={() => setStep(2)} 
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest cursor-pointer"
                >
                  {t.btnNextPhase}
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => advanceQueue(false)} 
                    className="flex-1 py-3 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-red-600 cursor-pointer"
                  >
                    {t.btnRetry}
                  </button>
                  <button 
                    onClick={() => advanceQueue(true)} 
                    className="flex-1 py-3 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-green-600 cursor-pointer"
                  >
                    {t.btnGotIt}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Next Card Trigger bei Deutsch in Phase 2 */}
        {step === 2 && isGermanTarget && (
          <div className="flex gap-2">
            <button 
              onClick={() => advanceQueue(false)} 
              className="flex-1 py-4 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-red-600 uppercase tracking-wider cursor-pointer"
            >
              {t.btnRetry}
            </button>
            <button 
              onClick={() => advanceQueue(true)} 
              className="flex-1 py-4 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-green-600 uppercase tracking-wider cursor-pointer"
            >
              {t.btnNextCard}
            </button>
          </div>
        )}
        
        {/* Next Card Trigger bei Japanisch in Phase 3 */}
        {step === 3 && !isGermanTarget && (
          <button 
            onClick={() => advanceQueue(isAnswerCorrect)} 
            className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600 cursor-pointer"
          >
            {isAnswerCorrect ? t.btnNextCard : t.btnRetry}
          </button>
        )}
      </div>

    </div>
  );
};

export default Flashcard;