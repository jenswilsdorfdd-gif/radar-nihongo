import React, { useState, useEffect, useRef } from 'react';
import { kanjiData } from '../data/kanjiData';
import { deKompositaData } from '../data/deKompositaData';

const KanjiCard = ({ day, mode = 'read', onBack, language, targetLanguage = 'jp' }) => {
  const isGermanTarget = targetLanguage === 'de';
  const currentLang = language || 'de';

  // Datenquelle dynamisch selektieren
  const currentDeck = isGermanTarget ? deKompositaData[day] : kanjiData[day];
  
  const texts = {
    de: {
      error1: "Fehler: Keine Daten für Tag",
      error2: "gefunden.",
      backMenu: "Zurück zum Menü",
      backDeck: isGermanTarget ? "Komposita-Deck" : "Kanji-Deck",
      backBtnSuccess: "Zurück zum Deck",
      remaining: "Übrig:",
      read: "Lesen & Scannen",
      write: "Schreiben",
      hintRead: isGermanTarget ? "Bestandteile, Genus & Bedeutung?" : "Laut, Bedeutung & Satz?",
      solution: "Die Lösung & Dekomposition:",
      clear: "Löschen",
      reveal: "Aufdecken & Zerlegen",
      again: "Nochmal",
      gotIt: "Sitzt",
      mnemonicTitle: isGermanTarget ? "Morphologische Zerlegung (Dekomposition)" : "Eselsbrücke",
      headWordLabel: "Grundwort (bestimmt Genus):",
      elementsTitle: "Einzelbausteine & Bedeutung:",
      ruleTitle: "Morphologische Regel:",
      day: isGermanTarget ? "Thema" : "Tag",
      perfect: "Tagesziel erreicht!",
      finishTitle: "Deck Abgeschlossen",
      
      finishFinalTitle: isGermanTarget ? "Phase 4 Komplett!" : "Phase 4 Komplett!",
      finishFinalSub: isGermanTarget ? "Komposita-Scan MEISTERKLASSE! 🏛️" : "Meisterklasse BESTANDEN! 🏯",
      finishFinalDesc: isGermanTarget
        ? "Du hast alle 21 Tage des Komposita-Trainings durchgezogen. Selbst die längsten deutschen Bandwurmwörter scannst du jetzt mühelos von links nach rechts und bestimmst das Genus am Grundwort. Das gesamte RADAR-System ist damit vollständig gemeistert!"
        : "Du hast alle 21 Tage Kanji-Training durchgezogen. Das ist der Moment, an dem 95% aller Lernenden scheitern. Du nicht! Du hast dir ein massives Arsenal an Wissen aufgebaut. Ruh dich aus, feier dich selbst, bleib über Social Media mit uns connectet und dann... auf zur finalen Prüfung!",
      finishFinalNext: isGermanTarget ? "Zurück zum Hauptmenü 🎓" : "Zur Abschluss-Prüfung 🎓",

      motivations: {
        1: "Erstes Komposita-Deck gemeistert! Die Grundwort-Regel sitzt. Weiter so!",
        2: "Tag 2 im Kasten! Fugen-S nach -ung, -heit und -keit bereitet dir keine Probleme mehr.",
        3: "Starke Leistung! Schwach gebeugte Fugen-N-Verbindungen sitzen felsenfest.",
        4: "Tag 4 abgehakt! Komplexe Bahnbetriebsbegriffe sicher dekomponiert.",
        5: "Fünf Tage Morphologie-Drill! Bahnhofsgebäude und Raumbezeichnungen voll im Griff.",
        6: "Tag 6 gemeistert! Supermarkt- und Pfandbegriffe ohne Zögern zerlegt.",
        7: "Woche 1 in Phase 4 geschafft! Die Grundlagen der deutschen Wortbildung sitzen blind.",
        8: "Tag 8 erledigt! Bäckerei- und Gastronomie-Komposita laufen flüssig.",
        9: "Neun Tage durchgezogen! Medizinische Begriffe und Wirkstoffe zielsicher analysiert.",
        10: "Zweistellig! Tag 10! Zusammengesetzte Schmerz- und Symptombegriffe gemeistert.",
        11: "Tag 11 ist Geschichte! Hotel- und Zimmerausstattungsbegriffe sitzen.",
        12: "Zwölf Tage im Kasten! Verkehrs- und Straßenraumbegriffe sicher segmentiert.",
        13: "Tag 13 geschafft! Finanz- und Bankkomposita bereiten kein Kopfzerbrechen mehr.",
        14: "Zwei Wochen Wortbildungs-Drill! Alltagstransaktionen meisterhaft zerlegt.",
        15: "Tag 15 abgehakt! Behörden- und Bürgeramtsbegriffe dekonstruiert.",
        16: "Tag 16 erledigt! Justiz- und Polizeiprotokolle sprachlich voll unter Kontrolle.",
        17: "Einsatz 17 im Kasten! Steuer- und Finanzamtsbegriffe stellen kein Hindernis mehr dar.",
        18: "Achtzehn Tage durchgezogen! Miet- und Wohnungsbegriffe sauber analysiert.",
        19: "Tag 19 gemeistert! Arbeitsrechtliche Fachbegriffe fehlerfrei dekomponiert.",
        20: "Tag 20! Mammutwörter-Training überstanden. Selbst 4-fach-Verbindungen werfen dich nicht um!",
        21: "Tag 21 vollendet! Meisterklasse der deutschen Morphologie erfolgreich absolviert!"
      }
    },
    en: {
      error1: "Error: No data found for Day",
      error2: ".",
      backMenu: "Back to Menu",
      backDeck: isGermanTarget ? "Compounds Deck" : "Kanji Deck",
      backBtnSuccess: "Back to Deck",
      remaining: "Remaining:",
      read: "Read & Scan",
      write: "Write",
      hintRead: isGermanTarget ? "Components, Gender & Meaning?" : "Sound, Meaning & Sentence?",
      solution: "Solution & Decomposition:",
      clear: "Clear",
      reveal: "Reveal & Deconstruct",
      again: "Again",
      gotIt: "Got it",
      mnemonicTitle: isGermanTarget ? "Morphological Decomposition" : "Mnemonic",
      headWordLabel: "Head word (determines gender):",
      elementsTitle: "Individual elements & meanings:",
      ruleTitle: "Morphological rule:",
      day: isGermanTarget ? "Topic" : "Day",
      perfect: "Daily goal reached!",
      finishTitle: "Deck Completed",
      
      finishFinalTitle: isGermanTarget ? "Phase 4 Complete!" : "Phase 4 Complete!",
      finishFinalSub: isGermanTarget ? "Compound Scanning MASTERCLASS! 🏛️" : "Masterclass PASSED! 🏯",
      finishFinalDesc: isGermanTarget
        ? "You completed all 21 days of compound training. You now effortlessly scan long German words from left to right and determine gender via the head word. The entire RADAR system is now fully mastered!"
        : "You completed all 21 days of Kanji training. This is the point where 95% of all learners fail. Not you! You have built a massive arsenal of knowledge.",
      finishFinalNext: isGermanTarget ? "Back to Main Menu 🎓" : "To the Final Exam 🎓",

      motivations: {
        1: "First compound deck mastered! Head word rule solidified. Keep it up!",
        2: "Day 2 in the bag! Fugen-S after -ung, -heit, and -keit mastered.",
        3: "Strong performance! Weak masculine Fugen-N combinations internalized.",
        4: "Day 4 checked off! Complex rail infrastructure terms decomposed.",
        5: "Five days of morphology drill! Station facilities fully under control.",
        6: "Day 6 mastered! Retail and bottle return vocabulary broken down.",
        7: "Week 1 in Phase 4 done! German word formation fundamentals secured.",
        8: "Day 8 done! Food and bakery compounds flowing smoothly.",
        9: "Nine days straight! Medical and pharmacy terminology analyzed.",
        10: "Double digits! Day 10! Complex symptom and pain terms mastered.",
        11: "Day 11 is history! Hotel equipment terms fully anchored.",
        12: "Twelve days in the box! Urban traffic signage parsed with ease.",
        13: "Day 13 done! Financial and banking terms decomposed quickly.",
        14: "Two weeks of compound training! Daily transactions fully mastered.",
        15: "Day 15 checked off! Administrative and registry terms resolved.",
        16: "Day 16 done! Legal and police protocol language mastered.",
        17: "Mission 17 in the bag! Tax and fiscal compound terms internalized.",
        18: "Eighteen days straight! Rental and lease terms framed accurately.",
        19: "Day 19 mastered! Labor law and employment compounds parsed.",
        20: "Day 20! Monster compounds conquered. Multi-part words are no obstacle!",
        21: "Day 21 complete! Masterclass of German morphology completed!"
      }
    },
    jpn: {
      error1: "エラー: 対象日のデータがありません",
      error2: "",
      backMenu: "メインメニューへ戻る",
      backDeck: isGermanTarget ? "複合語解体デッキ" : "漢字デッキ",
      backBtnSuccess: "デッキ一覧へ戻る",
      remaining: "残り:",
      read: "読解・解体スキャン",
      write: "筆記演習",
      hintRead: isGermanTarget ? "構成パーツ・冠詞・意味は？" : "音・訓・意味・例文は？",
      solution: "形態素解体と正解:",
      clear: "消去",
      reveal: "解体・解答を表示",
      again: "もう一度",
      gotIt: "習得完了",
      mnemonicTitle: isGermanTarget ? "形態素解体（Dekomposition）" : "イメージ連想・記憶法",
      headWordLabel: "基底語（性別決定核）:",
      elementsTitle: "構成要素・形態素一覧:",
      ruleTitle: "語形成ルール:",
      day: isGermanTarget ? "単元" : "日目",
      perfect: "本日の目標達成！",
      finishTitle: "デッキ演習修了",
      
      finishFinalTitle: isGermanTarget ? "第4フェーズ完全修了！" : "第4フェーズ完全修了！",
      finishFinalSub: isGermanTarget ? "複合語解体マスタークラス制覇！🏛️" : "マスタークラス合格！🏯",
      finishFinalDesc: isGermanTarget
        ? "21日間の複合語解体演習を全て突破しました！最長級のドイツ語複合名詞であっても、左から右へパーツを見抜き、末尾の基底語から瞬時に性別（der/die/das）と本質を特定できます。RADARシステム全フェーズの完全制覇です！"
        : "21日間の漢字トレーニングをやり抜きました。膨大な語彙ベースが完成しました！",
      finishFinalNext: isGermanTarget ? "メインメニューへ戻る 🎓" : "最終試験へ進む 🎓",

      motivations: {
        1: "最初の複合語デッキ制覇！末尾名詞による性別決定ルールが定着しました。",
        2: "2日目クリア！-ung, -heit, -keit に続くFugen-Sの挿入を完全攻略。",
        3: "素晴らしい前進！弱変化名詞の複数形に由来するFugen-Nの結合を体得。",
        4: "4日目達成！鉄道インフラの多重複合名詞を即座に分解。",
        5: "5日目完了！駅構内施設・待合空間の用途複合語を攻略。",
        6: "6日目クリア！スーパーのレジ周辺および容器保証金（Pfand）用語を解体。",
        7: "第4フェーズ第1週制覇！ドイツ語の語形成メカニズムの土台が完成。",
        8: "8日目完了！対面パン屋・飲食店のメニュー構成語をスムーズに判別。",
        9: "9日目クリア！薬局・医薬品の部位別および薬剤種別複合語を特定。",
        10: "ついに10日目！身体部位と複数形痛みの結合名詞を完全自動化。",
        11: "11日目達成！ホテルの室内設備および滞在税関連の複合語を解読。",
        12: "12日目完了！都市道路標識・歩行者専用区域などの交通語彙を分解。",
        13: "13日目クリア！銀行口座・送金用紙・決済手段の金融複合名詞を制覇。",
        14: "2週間の解体演習達成！日常トランザクションの全複合語を把握。",
        15: "15日目クリア！市民課役所・外国人局の公的証明書名詞を解析。",
        16: "16日目達成！警察の盗難被害届・調書などの司法法務用語を解体。",
        17: "17日目完了！税務署・確定申告・納税通知の税務複合語を完全スキャン。",
        18: "18日目クリア！賃貸借契約書・敷金・光熱費清算書の構成パーツを特定。",
        19: "19日目達成！雇用契約・就労許可証などの労働法規名詞を解析。",
        20: "20日目！超長大モンスター複合語（Mammutwörter）の解体ドリルを突破。",
        21: "21日目完全制覇！ドイツ語形態素解体マスタークラスの全課程を修了！"
      }
    }
  };

  const t = texts[currentLang === 'jpn' ? 'jpn' : (texts[currentLang] ? currentLang : 'de')] || texts.de;
  
  if (!currentDeck) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <p className="text-red-500 font-bold mb-4">{t.error1} {day} {t.error2}</p>
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold cursor-pointer">{t.backMenu}</button>
      </div>
    );
  }

  // Queue initialisieren: Deutsch nutzt currentDeck.cards, Japanisch currentDeck direkt als Array[cite: 6]
  const [queue, setQueue] = useState(() => {
    if (isGermanTarget) {
      return currentDeck.cards ? [...currentDeck.cards] : [];
    }
    return Array.isArray(currentDeck) ? [...currentDeck] : [];
  });

  const [isFinished, setIsFinished] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isGermanTarget) {
      setQueue(currentDeck.cards ? [...currentDeck.cards] : []);
    } else {
      setQueue(Array.isArray(currentDeck) ? [...currentDeck] : []);
    }
    setIsFinished(false);
    setIsRevealed(false);
  }, [day, currentDeck, isGermanTarget]);

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    e.preventDefault(); 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Sprachsynthese: de-DE für Deutsch, ja-JP für Japanisch[cite: 6]
  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = isGermanTarget
        ? text.replace(/\[.*?\]/g, '').trim()
        : text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isGermanTarget ? 'de-DE' : 'ja-JP';
      utterance.rate = isGermanTarget ? 0.90 : 0.80; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    const parts = text.split(/([^\s]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^{]+){([^}]+)}/);
      if (match) {
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-cyan-300 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Abschluss-Bildschirme[cite: 6]
  if (isFinished || queue.length === 0) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-24 h-24 bg-purple-900/30 border-4 border-purple-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            {isGermanTarget ? "🏛️" : "🏯"}
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalTitle}</h1>
          <h2 className="text-purple-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalSub}</h2>
          <p className="text-gray-300 text-sm text-center max-w-md mb-10 leading-relaxed px-4">
            {t.finishFinalDesc}
          </p>
          <div className="w-full max-w-sm space-y-4">
            <button onClick={onBack} className="w-full py-5 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 uppercase tracking-widest active:scale-95 transition-all cursor-pointer">
              {t.finishFinalNext}
            </button>
          </div>
        </div>
      );
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4 text-center">{t.perfect}</h2>
        <p className="text-gray-300 text-sm text-center max-w-md mb-10 leading-relaxed px-4">
          {dailyMotivation}
        </p>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all cursor-pointer">
          {t.backBtnSuccess}
        </button>
      </div>
    );
  }

  const currentCard = queue[0];

  const handleReveal = () => {
    setIsRevealed(true);
    if (isGermanTarget) {
      playAudio(currentCard.word);
    } else {
      playAudio(currentCard.kanji);
    }
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      if (queue.length <= 1) {
        setIsFinished(true);
      } else {
        setQueue(prev => prev.slice(1));
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
    }
    setIsRevealed(false);
    clearCanvas();
  };

  // --- RENDER-LOGIK FÜR DEUTSCHE KOMPOSITA ---
  const renderGermanCard = () => {
    return (
      <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[340px] relative">
        
        {/* Genus-Badge oben */}
        <div className="absolute top-4 left-6 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
            currentCard.gender === 'der' ? 'bg-blue-900/60 text-blue-400 border border-blue-500/40' :
            currentCard.gender === 'die' || currentCard.gender === 'die (Plural)' ? 'bg-red-900/60 text-red-400 border border-red-500/40' :
            'bg-green-900/60 text-green-400 border border-green-500/40'
          }`}>
            {currentCard.gender}
          </span>
        </div>

        {/* Morphologische Regel des Tages */}
        {currentDeck.rule && (
          <div className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 mb-6 mt-8 text-left">
            <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block mb-0.5">
              💡 {t.ruleTitle}
            </span>
            <p className="text-gray-300 text-xs leading-relaxed">
              {currentDeck.rule}
            </p>
          </div>
        )}

        {/* Deutsches Gesamtwort */}
        <div className="text-center w-full my-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide break-words">
            {currentCard.word}
          </h2>
          <button 
            onClick={() => playAudio(currentCard.word)} 
            className="w-11 h-11 bg-gray-700/80 hover:bg-gray-600 rounded-full inline-flex items-center justify-center text-lg mt-3 transition-all active:scale-90 cursor-pointer"
            title="Aussprache anhören"
          >
            🔊
          </button>
        </div>

        {/* Aufgedeckte Dekomposition & Analyse */}
        {isRevealed ? (
          <div className="flex flex-col items-center animate-fade-in w-full mt-4">
            
            {/* Deutsche Gesamtbedeutung */}
            <p className="text-yellow-400 font-bold text-xl mb-4 text-center">
              "{currentCard.meaning}"
            </p>

            {/* Segmentierungs-Box */}
            <div className="w-full bg-gray-900/90 rounded-2xl p-4 border border-purple-500/30 text-left space-y-3">
              
              {/* Visuelle Zerlegung */}
              <div>
                <span className="text-xs text-purple-400 font-bold tracking-widest uppercase block mb-1">
                  {t.mnemonicTitle}
                </span>
                <p className="font-mono text-base font-extrabold text-cyan-300 tracking-wider">
                  {currentCard.decomposition}
                </p>
              </div>

              {/* Grundwort-Hervorhebung */}
              {currentCard.headWord && (
                <div className="pt-2 border-t border-gray-800">
                  <span className="text-xs text-gray-400 font-bold block mb-0.5">
                    {t.headWordLabel}
                  </span>
                  <p className="text-sm font-bold text-yellow-300">
                    &rarr; {currentCard.headWord}
                  </p>
                </div>
              )}

              {/* Tabelle der Einzelbausteine */}
              {currentCard.elements && currentCard.elements.length > 0 && (
                <div className="pt-2 border-t border-gray-800">
                  <span className="text-xs text-gray-400 font-bold block mb-1.5">
                    {t.elementsTitle}
                  </span>
                  <div className="space-y-1">
                    {currentCard.elements.map((el, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-0.5 border-b border-gray-800/60 last:border-none">
                        <span className="font-mono font-bold text-cyan-400">{el.part}</span>
                        <span className="text-gray-300">{el.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Realsatz-Einsatz */}
              {currentCard.sentence && (
                <div className="pt-3 border-t border-gray-800 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="text-white text-sm font-semibold italic">
                      "{currentCard.sentence}"
                    </p>
                    <button 
                      onClick={() => playAudio(currentCard.sentence)} 
                      className="text-gray-400 hover:text-white active:scale-90 text-sm flex-shrink-0 cursor-pointer"
                    >
                      🔊
                    </button>
                  </div>
                  {currentCard.sentenceTranslation && (
                    <p className="text-gray-400 text-xs">
                      {currentCard.sentenceTranslation}
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="h-16 flex items-center justify-center">
            <p className="text-gray-500 text-sm italic">{t.hintRead}</p>
          </div>
        )}

      </div>
    );
  };

  // --- RENDER-LOGIK FÜR JAPANISCH (KANJI & ZEICHEN-CANVAS) ---[cite: 6]
  const renderJapaneseCard = () => {
    const displayMeaning = currentLang === 'en' && currentCard.meaningEn ? currentCard.meaningEn : currentCard.meaning;
    const displayMnemonic = currentLang === 'en' && currentCard.mnemonicEn ? currentCard.mnemonicEn : currentCard.mnemonic;
    const displaySentenceTrans = currentLang === 'en' && currentCard.sentenceTranslationEn ? currentCard.sentenceTranslationEn : currentCard.sentenceTranslation;

    const renderMerksatzBox = () => {
      return (
        <div className="w-full bg-gray-900 rounded-xl p-4 border border-gray-700 text-center mt-2">
          <p className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-3">
            {t.mnemonicTitle}
          </p>
          <p className="text-gray-300 text-sm mb-3 font-medium italic">{displayMnemonic}</p>
          
          {currentCard.sentence && (
            <div className="border-t border-gray-700 pt-3">
              <div className="flex flex-col items-center justify-center gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <p className="text-white text-lg font-bold leading-relaxed break-keep" style={{ wordBreak: 'keep-all' }}>
                    {renderTextWithFurigana(currentCard.sentence)}
                  </p>
                  <button onClick={() => playAudio(currentCard.sentence)} className="text-gray-400 hover:text-white active:scale-90 transition-all text-lg flex-shrink-0 cursor-pointer">🔊</button>
                </div>
              </div>
              <p className="text-gray-400 text-xs italic mt-1 break-words">{displaySentenceTrans}</p>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[300px] relative">
        <p className="absolute top-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
          {mode === 'read' ? t.read : t.write}
        </p>

        {mode === 'read' && (
          <>
            <div className="text-[5rem] font-bold text-white leading-none mb-4 mt-6">
              {currentCard.kanji}
            </div>
            
            {isRevealed ? (
              <div className="flex flex-col items-center animate-fade-in w-full">
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-2xl font-extrabold text-blue-400 uppercase tracking-widest">{currentCard.reading}</p>
                  <button onClick={() => playAudio(currentCard.kanji)} className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-lg transition-all active:scale-90 cursor-pointer">🔊</button>
                </div>
                <p className="text-yellow-400 font-bold text-xl mb-3">{displayMeaning}</p>
                {renderMerksatzBox()}
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <p className="text-gray-500 text-sm italic">{t.hintRead}</p>
              </div>
            )}
          </>
        )}

        {mode === 'write' && (
          <>
            <div className="text-3xl font-extrabold text-blue-400 mt-4 mb-2 uppercase tracking-widest">
              {currentCard.reading}
            </div>
            <p className="text-yellow-400 font-bold text-lg mb-4">{displayMeaning}</p>
            
            {!isRevealed ? (
              <div className="w-full flex flex-col items-center relative">
                <div className="absolute inset-0 pointer-events-none opacity-20 z-0 top-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-2xl overflow-hidden">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>
                </div>

                <canvas 
                  ref={canvasRef}
                  width={220} 
                  height={220} 
                  className="bg-gray-900 border-2 border-gray-700 rounded-2xl touch-none shadow-inner relative z-10 bg-transparent"
                  onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                />
                <button onClick={clearCanvas} className="mt-3 text-xs text-gray-400 hover:text-white uppercase tracking-widest cursor-pointer">{t.clear}</button>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-fade-in w-full">
                <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">{t.solution}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[5rem] font-bold text-green-400 leading-none">{currentCard.kanji}</div>
                  <button onClick={() => playAudio(currentCard.kanji)} className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-xl transition-all shadow-lg active:scale-90 cursor-pointer">🔊</button>
                </div>
                {renderMerksatzBox()}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Obere Navigation */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold cursor-pointer">
          &larr; {t.backDeck}
        </button>
        <span className="text-purple-400 text-xs sm:text-sm font-bold">
          {t.day} {day} | {t.remaining} {queue.length}
        </span>
      </div>

      <div className="w-full max-w-md mx-auto mt-12 flex flex-col items-center">
        
        {/* Renderung nach Zielsprache */}
        {isGermanTarget ? renderGermanCard() : renderJapaneseCard()}

        {/* Buttonleiste unten */}
        <div className="w-full mt-6 flex flex-col gap-3">
          {!isRevealed ? (
            <button 
              onClick={handleReveal} 
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-purple-500/20 uppercase tracking-widest cursor-pointer"
            >
              {t.reveal}
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => handleNext(false)} 
                className="flex-1 py-4 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-red-600 uppercase tracking-widest text-sm cursor-pointer"
              >
                {t.again}
              </button>
              <button 
                onClick={() => handleNext(true)} 
                className="flex-1 py-4 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-green-600 uppercase tracking-widest text-sm cursor-pointer"
              >
                {t.gotIt}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanjiCard;