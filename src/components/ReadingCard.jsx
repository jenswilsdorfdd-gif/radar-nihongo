import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { readingData } from '../data/readingData';
import { deReadingData } from '../data/deReadingData';

const ReadingCard = ({ day, onBack, language, targetLanguage = 'jp' }) => {
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';
  const isDeOrEnTarget = isGermanTarget || isEnglishTarget;

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const currentLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'phase2';

  // Dynamische lokale Fallback-Datenquelle basierend auf der Zielsprache
  const localDeck = isDeOrEnTarget ? deReadingData[day] : readingData[day];

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

  const [dbDayDeck, setDbDayDeck] = useState(() => {
    try {
      const cachedMap = localStorage.getItem(`radar_decks_${dbTargetLang}_${moduleKey}`);
      if (cachedMap) {
        const parsed = JSON.parse(cachedMap);
        return parsed?.[day] || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Aktives Tages-Deck (Vorrang für Supabase course_decks, sonst lokaler Fallback)
  const deckInfo = dbDayDeck || localDeck;

  // Hilfsfunktion zum Extrahieren der Queue (unterstützt sowohl sentences-Arrays als auch strukturierte Einzel-Szenarien)
  const buildQueueFromDeck = (deck) => {
    if (!deck) return [];
    if (Array.isArray(deck.sentences)) {
      return [...deck.sentences];
    }
    if (deck.german || deck.english || deck.text) {
      return [{
        text: deck.text || deck.german || deck.english,
        translation: deck.translation || deck.japanese,
        translationDe: deck.translationDe || deck.translation,
        translationEn: deck.translationEn || deck.translation,
        breakdown: deck.breakdown,
        title: deck.title,
        context: deck.context
      }];
    }
    if (Array.isArray(deck.cards)) {
      return [...deck.cards];
    }
    return [];
  };

  const [queue, setQueue] = useState(() => buildQueueFromDeck(deckInfo));
  const [isFinished, setIsFinished] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Abruf von ui_translations, course_manifests & course_decks (für diesen Tag) aus Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchCardData = async () => {
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
            .eq('day_number', day)
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

        if (deckRes.data?.content && isMounted) {
          setDbDayDeck(deckRes.data.content);
          const loadedQueue = buildQueueFromDeck(deckRes.data.content);
          if (loadedQueue.length > 0) {
            setQueue(loadedQueue);
          }
        }
      } catch (err) {
        console.error("Fehler beim Laden der Phase-2-Kartendaten aus Supabase:", err);
      }
    };

    fetchCardData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey, day]);

  // Queue zurücksetzen, wenn sich Tag oder Deck ändert
  useEffect(() => {
    const activeDeck = dbDayDeck || localDeck;
    setQueue(buildQueueFromDeck(activeDeck));
    setIsFinished(false);
    setShowTranslation(false);
  }, [day, dbTargetLang, dbDayDeck, localDeck]);

  // LOKALES FALLBACK-WÖRTERBUCH
  const texts = {
    de: {
      back: isGermanTarget ? "Satzklammer-Deck" : (isEnglishTarget ? "Connected-Speech-Deck" : "Flow-Deck"),
      remaining: "Übrig:",
      revealTrans: "Übersetzung aufdecken",
      next: isGermanTarget ? "Nächster Satz" : (isEnglishTarget ? "Nächste Einheit" : "Nächster Text"),
      finishTitle: isGermanTarget ? "Satzanalyse abgeschlossen" : (isEnglishTarget ? "Satz-Flow abgeschlossen" : "Szenario abgeschlossen"),
      finishSub: isGermanTarget ? "Hervorragend analysiert!" : (isEnglishTarget ? "Hervorragend gemeistert!" : "Hervorragend gelesen!"),
      backToMenu: "Zurück zum Deck",
      error: "Keine Daten gefunden.",
      contextLabel: "Kontext & Signal:",
      breakdownTitle: "Satzklammer- & Signal-Analyse:",
      
      finishFinalTitle: "Phase 2 Komplett!",
      finishFinalSub: isGermanTarget ? "Satzklammer Flow ABGESCHLOSSEN! 🎯" : (isEnglishTarget ? "Connected Speech Flow ABGESCHLOSSEN! 🎯" : "Kana Flow ABGESCHLOSSEN! 🎯"),
      finishFinalDesc: isGermanTarget 
        ? "Du beherrschst die 6 Signal-Bausteine und scannst deutsche Satzklammern ohne Verzögerung. Mach dich bereit für Phase 3: Das 21-Tage D/A/CH-Survival-Radar!"
        : (isEnglishTarget
            ? "Du beherrschst die wichtigsten Phrasal Verbs, Zeiten-Trigger und den natürlichen britischen Satzfluss. Mach dich bereit für Phase 3: Das 21-Tage UK-Survival-Radar!"
            : "Du hast gelernt, japanische Sätze fließend zu scannen. Wahnsinnsleistung! Komm jederzeit zurück, um dein Lese-Tempo frisch zu halten. Vergiss nicht, uns auf Insta & TikTok für tägliche Hacks zu folgen. Mach dich bereit für Phase 3: Das Radar!"),
      finishFinalNext: isGermanTarget ? "Weiter ins D/A/CH-Radar 📡" : (isEnglishTarget ? "Weiter ins UK-Radar 📡" : "Weiter ins Radar-Training 📡"),

      motivations: {
        1: "Signal-Bausteine gemeistert! ZUM und ZUR sitzen ohne Zögern. Dranbleiben!",
        2: "Starke Leistung! Ziel- und Bewegungssignale werden zur zweiten Natur.",
        3: "Tag 3 im Kasten! Transportmittel mit MIT DEM und MIT DER laufen flüssig.",
        4: "Vier Tage im Flow! Bezahl-Signale mit Karte und bar sitzen felsenfest.",
        5: "Tag 5 abgehakt! Standorte im Raum (IM / IN DER) präzise verknüpft.",
        6: "Sechs Tage geschafft! Direkte 4-Größen-Bestellungen (EINEN/EINE/EIN) sitzen blind.",
        7: "Woche 1 von Phase 2 durch! Die Signal-Bausteine ersetzen starre Deklinationstabellen.",
        8: "Tag 8 gemeistert! Die Modalverb-Klammer schlägt am Satzende sauber ein.",
        9: "Neun Tage durchgezogen! Reservierungs- und Wunschsätze sitzen felsenfest.",
        10: "Zweistellig! Tag 10! Umsteige- und Reiseanweisungen werden reflexartig erfasst.",
        11: "Tag 11 im Kasten! Trennbare Verben schleudern ihr Präfix zielsicher ans Satzende.",
        12: "Tag 12 gemeistert! Bahnsteig- und Einstiegsaufforderungen blind verstanden.",
        13: "Dreizehn Tage! Kommunikationsflüsse und Anrufe sitzen im Timing.",
        14: "Zwei Wochen Satzklammer-Drill! Perfekt-Klammern mit haben/sein meisterhaft gebildet.",
        15: "Tag 15 abgehakt! Richtungswechsel und Bewegungsverben im Perfekt sitzen.",
        16: "Tag 16 geschafft! Kombinierte Bausteine mit Verkehrsmitteln laufen flüssig.",
        17: "Tag 17 im Sack! Geschäfts- und Apothekentransaktionen souverän gerahmt.",
        18: "Achtzehn Tage Flow! Zeit-Inversion und Trennverb gleichzeitig kontrolliert.",
        19: "Tag 19 erledigt! Bestellungen und Reklamationen im Perfekt automatisiert.",
        20: "Tag 20! Der vorletzte Satzklammer-Einsatz. Entwerter- und Fahrtpflichten sitzen!",
        21: "Tag 21 gemeistert! Die Königsdisziplin der deutschen Satzklammer ist vollbracht!"
      }
    },
    en: {
      back: isGermanTarget ? "Sentence Bracket Deck" : (isEnglishTarget ? "Connected Speech Deck" : "Flow Deck"),
      remaining: "Remaining:",
      revealTrans: "Reveal translation",
      next: isGermanTarget ? "Next Sentence" : (isEnglishTarget ? "Next Unit" : "Next Text"),
      finishTitle: isGermanTarget ? "Sentence analysis complete" : (isEnglishTarget ? "Flow analysis complete" : "Scenario completed"),
      finishSub: isGermanTarget ? "Excellent analysis!" : (isEnglishTarget ? "Excellent mastery!" : "Excellent reading!"),
      backToMenu: "Back to Deck",
      error: "No data found.",
      contextLabel: "Context & Signal:",
      breakdownTitle: "Sentence Bracket & Signal Analysis:",
      
      finishFinalTitle: "Phase 2 Complete!",
      finishFinalSub: isGermanTarget ? "Sentence Bracket Flow COMPLETED! 🎯" : (isEnglishTarget ? "Connected Speech Flow COMPLETED! 🎯" : "Kana Flow COMPLETED! 🎯"),
      finishFinalDesc: isGermanTarget
        ? "You have mastered the 6 Signal Chunks and sentence brackets without delay. Get ready for Phase 3: The 21-Day D/A/CH Survival Radar!"
        : (isEnglishTarget
            ? "You have mastered key phrasal verbs, tense triggers, and natural British sentence flow. Get ready for Phase 3: The 21-Day UK Survival Radar!"
            : "You've learned to scan Japanese sentences fluently. Amazing achievement! Come back anytime to keep your reading speed fresh. Don't forget to follow us on Insta & TikTok for daily hacks. Get ready for Phase 3: The Radar!"),
      finishFinalNext: isGermanTarget ? "Continue to D/A/CH Radar 📡" : (isEnglishTarget ? "Continue to UK Radar 📡" : "Continue to Radar Training 📡"),

      motivations: {
        1: "Signal Chunks locked in! ZUM and ZUR executed smoothly.",
        2: "Strong performance! Destination and direction signals running fast.",
        3: "Day 3 in the bag! Transport tools with MIT DEM and MIT DER working.",
        4: "Four days in flow! Payment signals with Karte and bar memorized.",
        5: "Day 5 checked off! Location markers (IM / IN DER) locked.",
        6: "Six days done! Direct ordering chunks (EINEN/EINE/EIN) running blindly.",
        7: "Week 1 of Phase 2 complete! Signal Chunks completely replace declension tables.",
        8: "Day 8 mastered! Modal verb brackets drop properly at sentence end.",
        9: "Nine days straight! Reservation and request sentences solidified.",
        10: "Double digits! Day 10! Transfer and travel commands parsed quickly.",
        11: "Day 11 in the bag! Separable prefixes fire to sentence end reliably.",
        12: "Day 12 mastered! Platform announcements understood without hesitation.",
        13: "Thirteen days! Phone and contact patterns running smoothly.",
        14: "Two weeks of bracket drills! Perfect tense frames with haben/sein mastered.",
        15: "Day 15 checked off! Travel verbs in perfect tense established.",
        16: "Day 16 done! Combined signals with transport options flowing nicely.",
        17: "Day 17 in the bag! Pharmacy and retail transactions framed accurately.",
        18: "Eighteen days of flow! Time inversion plus separable verb controlled.",
        19: "Day 19 done! Counter orders in perfect tense fully automated.",
        20: "Day 20! The second-to-last bracket mission. Validation rules internalized!",
        21: "Day 21 mastered! The master class of German sentence framing is complete!"
      }
    },
    jpn: {
      back: isGermanTarget ? "枠構造デッキ" : (isEnglishTarget ? "リンキング・デッキ" : "フローデッキ"),
      remaining: "残り:",
      revealTrans: "日本語訳・構造を表示",
      next: isGermanTarget ? "次の構文へ" : (isEnglishTarget ? "次のユニットへ" : "次のテキスト"),
      finishTitle: isGermanTarget ? "構文分析ミッション完了" : (isEnglishTarget ? "音声連結ミッション完了" : "シナリオ完了"),
      finishSub: isGermanTarget ? "素晴らしい分析力です！" : (isEnglishTarget ? "素晴らしい分析と発音です！" : "素晴らしい読解力です！"),
      backToMenu: "デッキ一覧へ戻る",
      error: "データが見つかりません。",
      contextLabel: "現場文脈・シグナル:",
      breakdownTitle: "枠構造・シグナル形態素解体:",
      
      finishFinalTitle: "第2フェーズ完全制覇！",
      finishFinalSub: isGermanTarget ? "枠構造フロー修了！🎯" : (isEnglishTarget ? "英語リンキング・フロー修了！🎯" : "仮名フロー修了！🎯"),
      finishFinalDesc: isGermanTarget 
        ? "6大シグナル・パーツと文末ハサミ撃ち（枠構造）が完全に身体に定着しました。次は第3フェーズ：21日間実戦D/A/CHサバイバルレーダーへ突入します！"
        : (isEnglishTarget
            ? "必須の句動詞（Phrasal Verbs）と時制の使い分け、イギリス英語の自然な音声連結が完全に定着しました。次は第3フェーズ：21日間実戦UKサバイバルレーダーへ突入します！"
            : "日本語の文を流暢にスキャンできるようになりました。素晴らしい成果です！いつでも復習に戻れます。次は第3フェーズ（レーダー）へ進みましょう！"),
      finishFinalNext: isGermanTarget ? "実戦D/A/CHレーダーへ進む 📡" : (isEnglishTarget ? "実戦UKレーダーへ進む 📡" : "レーダートレーニングへ進む 📡"),

      motivations: {
        1: "目的地シグナル完了！ZUMとZURが反射的に口から出るようになりました。",
        2: "素晴らしい前進！女性名詞目的地（ZUR）への即座ルート確定。",
        3: "3日目クリア！交通手段（MIT DEM / MIT DER）の結合パーツが定着しました。",
        4: "4日目完了！レジ決済パーツ（mit Karte / bar）の即答体制が完成。",
        5: "5日目クリア！建物内部の静止所在（IM / IN DER）が自動化されました。",
        6: "6日目達成！飲食店や売店での直接注文4格（EINEN/EINE/EIN）を瞬時に射出。",
        7: "第2フェーズ第1週制覇！格変化表を捨て、シグナル塊で話す感覚が身につきました。",
        8: "8日目完了！話法助動詞の右枠（文末動詞原形）をしっかり聞き取る耳ができました。",
        9: "9日目クリア！券売機での座席予約構文を文末までホールド。",
        10: "ついに2桁、10日目！乗り換え義務の助動詞枠構造を完全攻略。",
        11: "11日目達成！分離動詞の前つづり（ab）が文末へ弾き飛ばされる感覚を体得。",
        12: "12日目クリア！車掌の乗車指示（einsteigen）を文末枠構造で瞬時に識別。",
        13: "13日目完了！電話連絡（anrufen）の日常分離構文がスムーズに流れます。",
        14: "2週間の枠構造演習達成！過去のトラブル申告を完了枠（habe ... verloren）で構築。",
        15: "15日目クリア！移動動詞の完了形（ist ... abgefahren）を文末までスキャン。",
        16: "16日目達成！目的地と交通手段を同時に挟み込む長文助動詞枠を制覇。",
        17: "17日目完了！薬局での決済枠構造。複数のシグナル・パーツが有機的に結合。",
        18: "18日目クリア！第1スロットに時間を置いた倒置と分離動詞の同時制御を達成。",
        19: "19日目達成！カウンター注文と完了形の複合構文をスムーズに展開。",
        20: "20日目！打刻義務の3重枠構造（muss ... entwerten）を完全自動化。",
        21: "21日目完全制覇！全シグナル・パーツと枠構造の集大成。現地実戦の準備完了です！"
      }
    }
  };

  const fallbackT = texts[currentLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    remaining: dbUiTexts?.remaining || fallbackT.remaining,
    revealTrans: dbUiTexts?.revealTrans || fallbackT.revealTrans,
    backToMenu: dbUiTexts?.backToMenu || fallbackT.backToMenu,
    error: dbUiTexts?.errorMsg || fallbackT.error,
    contextLabel: dbUiTexts?.contextLabel || fallbackT.contextLabel,
    breakdownTitle: dbUiTexts?.breakdownTitle || fallbackT.breakdownTitle,
    motivations: {
      ...fallbackT.motivations,
      ...(dbUiTexts?.motivationsPhase2 || {})
    },
    back: dbCourseManifest?.card2BackDeck || fallbackT.back,
    next: dbCourseManifest?.card2NextBtn || fallbackT.next,
    finishTitle: dbCourseManifest?.card2FinishTitle || fallbackT.finishTitle,
    finishSub: dbCourseManifest?.card2FinishSub || fallbackT.finishSub,
    finishFinalTitle: dbCourseManifest?.card2FinishFinalTitle || fallbackT.finishFinalTitle,
    finishFinalSub: dbCourseManifest?.card2FinishFinalSub || fallbackT.finishFinalSub,
    finishFinalDesc: dbCourseManifest?.card2FinishFinalDesc || fallbackT.finishFinalDesc,
    finishFinalNext: dbCourseManifest?.card2FinishFinalNext || fallbackT.finishFinalNext
  };

  const fallbackParticleInfo = {
    "は": { de: "Thema ('Was ... angeht')", en: "Topic ('As for...')", jpn: "主題（〜は）" },
    "を": { de: "Objekt (Ziel der Handlung)", en: "Object (Target of action)", jpn: "目的語（〜を）" },
    "に": { de: "Ziel/Zeit (Wohin/Wann)", en: "Target/Time (Where to/When)", jpn: "到着点・時間（〜に）" },
    "で": { de: "Ort/Mittel (Wo/Womit)", en: "Location/Means (Where/With what)", jpn: "場所・手段（〜で）" },
    "が": { de: "Subjekt (Wer/Was)", en: "Subject (Who/What)", jpn: "主語（〜が）" },
    "と": { de: "Mit/Und (Zusammen mit)", en: "With/And (Together with)", jpn: "共同・並列（〜と）" },
    "へ": { de: "Richtung (Nach/Zu)", en: "Direction (Towards)", jpn: "方向（〜へ）" },
    "から": { de: "Start (Von/Aus/Ab)", en: "Starting point (From/Since)", jpn: "起点（〜から）" },
    "まで": { de: "Endpunkt (Bis)", en: "Ending point (Until/Up to)", jpn: "終点（〜まで）" }
  };

  const particleRegex = /(から|まで|を|は(?![いじんらかきし])|が(?![っつお])|に(?![くもちほんぎ])|で(?![すしんき])|と(?![もてけきこ])|へ)/g;

  if (!deckInfo) {
    return <div className="text-white text-center mt-20">{t.error}</div>;
  }

  const currentSentence = queue[0];

  // Sprachsynthese: Dynamische Weiche für Deutsch ('de-DE'), Britisches Englisch ('en-GB') & Japanisch ('ja-JP')
  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = isDeOrEnTarget
        ? text.replace(/\[.*?\]/g, '').trim()
        : text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isGermanTarget ? 'de-DE' : (isEnglishTarget ? 'en-GB' : 'ja-JP');
      utterance.rate = isDeOrEnTarget ? 0.90 : 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (queue.length <= 1) {
      setIsFinished(true);
    } else {
      setQueue(prev => prev.slice(1));
      setShowTranslation(false);
    }
  };

  // Furigana-Renderer ausschließlich für Zielsprache Japanisch
  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    const parts = text.split(/([^\s、。！？「」]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^\s、。！？「」]+){([^}]+)}/);
      
      if (match) {
        return (
          <ruby key={i} className="mx-1" style={{ rubyAlign: 'center', textAlign: 'center' }}>
            {match[1]}
            <rt className="text-[0.55em] text-cyan-300 text-center leading-none tracking-tighter">{match[2]}</rt>
          </ruby>
        );
      }
      
      const subParts = part.split(particleRegex);
      return subParts.map((sub, j) => {
        if (fallbackParticleInfo[sub]) {
          const tooltipText = dbUiTexts?.particleInfo?.[sub] || fallbackParticleInfo[sub][currentLang] || fallbackParticleInfo[sub].de;
          return (
            <span key={`${i}-${j}`} className="relative group inline-block cursor-help text-orange-400 font-extrabold mx-[2px] transition-colors hover:text-orange-300">
              {sub}
              <span className="absolute bottom-[120%] left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-gray-900 text-gray-200 text-xs sm:text-sm p-3 rounded-xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-relaxed font-sans font-normal whitespace-normal block">
                <span className="block text-orange-400 font-bold mb-1 border-b border-gray-700 pb-1 text-lg leading-none">{sub}</span>
                {tooltipText}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500/50"></span>
              </span>
            </span>
          );
        }
        return <span key={`${i}-${j}`}>{sub}</span>;
      });
    });
  };

  if (isFinished) {
    if (day === 21) {
      return (
        <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
          <div className="w-24 h-24 bg-cyan-900/30 border-4 border-cyan-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(6,182,212,0.4)]">🌊</div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalTitle}</h1>
          <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalSub}</h2>
          <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
            {t.finishFinalDesc}
          </p>
          <div className="w-full max-w-sm space-y-4">
            <button onClick={onBack} className="w-full py-5 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-white shadow-lg shadow-yellow-500/20 uppercase tracking-widest active:scale-95 transition-all">
              {t.finishFinalNext}
            </button>
          </div>
        </div>
      );
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-cyan-900/30 border-2 border-cyan-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishSub}</h2>
        <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
          {dailyMotivation}
        </p>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          {t.backToMenu}
        </button>
      </div>
    );
  }

  if (!currentSentence) {
    return <div className="text-white text-center mt-20">{t.error}</div>;
  }

  // Übersetzungsauswahl
  const translationText = isDeOrEnTarget
    ? (currentSentence.translation || (currentLang === 'en' ? currentSentence.translationEn : currentSentence.translationDe))
    : (currentLang === 'en' ? (currentSentence.translationEn || currentSentence.translation) : (currentSentence.translationDe || currentSentence.translation));

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Obere Navigationsleiste */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-cyan-500 text-xs font-bold">{t.remaining} {queue.length}</span>
      </div>

      <div className="w-full max-w-md mx-auto mt-12 flex flex-col items-center">
        
        {/* Kontext-Box für die Zielsprache Deutsch / Englisch */}
        {isDeOrEnTarget && currentSentence.context && (
          <div className="w-full bg-cyan-950/40 border border-cyan-500/40 rounded-2xl p-4 mb-4 text-left shadow-lg">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider block mb-1">
              💡 {t.contextLabel}
            </span>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {currentSentence.context}
            </p>
          </div>
        )}

        {/* Zentrale Karte */}
        <div className="w-full bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[350px] relative">
          
          <div className="text-center w-full flex-1 flex flex-col items-center justify-center">
            
            {/* Satzanzeige */}
            {isDeOrEnTarget ? (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-relaxed tracking-wide mb-6 text-center">
                {currentSentence.text}
              </h2>
            ) : (
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-loose tracking-wide mb-8 text-center" style={{ wordBreak: 'break-word' }}>
                {renderTextWithFurigana(currentSentence.text)}
              </h2>
            )}
            
            {/* Audio-Trigger */}
            <button 
              onClick={() => playAudio(currentSentence.text)}
              className="w-16 h-16 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg active:scale-90 border border-cyan-500/30 mb-6"
              title="Aussprache anhören"
            >
              🔊
            </button>

            {/* Übersetzungs- & Analyse-Bereich */}
            <div className="w-full min-h-[40px] flex flex-col items-center justify-center">
              {!showTranslation ? (
                <button 
                  onClick={() => setShowTranslation(true)}
                  className="text-xs text-gray-500 hover:text-gray-300 uppercase tracking-widest font-bold border-b border-gray-600 pb-1 cursor-pointer transition-colors"
                >
                  {t.revealTrans}
                </button>
              ) : (
                <div className="w-full animate-fade-in space-y-4">
                  <p className="text-base sm:text-lg text-yellow-400 font-medium italic px-2 text-center">
                    "{translationText}"
                  </p>

                  {/* Satzklammer- & Signal-Aufschlüsselung (Breakdown) */}
                  {isDeOrEnTarget && currentSentence.breakdown && (
                    <div className="w-full bg-gray-900/80 rounded-2xl p-4 border border-cyan-500/30 text-left mt-4">
                      <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider block mb-2 border-b border-gray-700 pb-1">
                        {t.breakdownTitle}
                      </span>
                      <div className="space-y-2">
                        {currentSentence.breakdown.map((item, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:justify-between text-xs py-1 border-b border-gray-800/80 last:border-none">
                            <span className="font-mono font-bold text-cyan-300">{item.chunk}</span>
                            <span className="text-gray-400 italic">{item.role} &rarr; <span className="text-yellow-400 font-medium not-italic">{item.meaning}</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nächster Schritt Button */}
        <button 
          onClick={handleNext} 
          className="w-full mt-6 py-5 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-cyan-500/20 active:scale-95 transition-transform"
        >
          {t.next} &rarr;
        </button>

      </div>
    </div>
  );
};

export default ReadingCard;