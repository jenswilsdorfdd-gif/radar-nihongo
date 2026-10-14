import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { readingData } from '../data/readingData';
import { deReadingData } from '../data/deReadingData';

const ReadingDeck = ({ currentDay, totalDays, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';
  const isDeOrEnTarget = isGermanTarget || isEnglishTarget;

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const normalizedLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'phase2';

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

  const [dbDecksMap, setDbDecksMap] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_decks_${dbTargetLang}_${moduleKey}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Abruf von ui_translations, course_manifests & course_decks aus Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchDeckData = async () => {
      try {
        const [uiRes, manifestRes, decksRes] = await Promise.all([
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
            .select('day_number, content')
            .eq('target_lang', dbTargetLang)
            .eq('module_key', moduleKey)
        ]);

        if (uiRes.data?.content && isMounted) {
          setDbUiTexts(uiRes.data.content);
          localStorage.setItem(`radar_ui_trans_${dbSourceLang}`, JSON.stringify(uiRes.data.content));
        }

        if (manifestRes.data?.manifest && isMounted) {
          setDbCourseManifest(manifestRes.data.manifest);
          localStorage.setItem(`radar_manifest_${dbSourceLang}_${dbTargetLang}`, JSON.stringify(manifestRes.data.manifest));
        }

        if (decksRes.data && decksRes.data.length > 0 && isMounted) {
          const mapped = {};
          decksRes.data.forEach((row) => {
            mapped[row.day_number] = row.content;
          });
          setDbDecksMap(mapped);
          localStorage.setItem(`radar_decks_${dbTargetLang}_${moduleKey}`, JSON.stringify(mapped));
        }
      } catch (err) {
        console.error("Fehler beim Laden der Phase-2-Deck-Daten aus Supabase:", err);
      }
    };

    fetchDeckData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  // Dynamische lokale Fallback-Datenquelle basierend auf Zielsprache
  const activeDataSource = isDeOrEnTarget ? deReadingData : readingData;

  // LOKALES FALLBACK-WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "SATZKLAMMER FLOW" : (isEnglishTarget ? "CONNECTED SPEECH FLOW" : "KANA FLOW"),
      subtitle: isGermanTarget ? "Flüssige Satzklammern für Radar:" : (isEnglishTarget ? "Flüssiger Satzbau & Phrasal Verbs für Radar:" : "Flüssiges Lesen für Radar:"),
      day: isGermanTarget ? "Satz" : (isEnglishTarget ? "Einheit" : "Text"),
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Satzklammer-Flow" : (isEnglishTarget ? "System-Einweisung: Connected Speech & Tenses" : "System-Einweisung"),
      bullet1Title: isGermanTarget ? "▶ 6 Signal-Bausteine & V2" : (isEnglishTarget ? "▶ Phrasal Verbs & Linking" : "▶ Lautes Lesen (Schattenlesen)"),
      bullet1Desc: isGermanTarget 
        ? "Trainiere die Verschmelzung von Präpositionen und Artikeln (ZUM, ZUR, MIT, IM) sowie den strikten Verbanker auf Position 2." 
        : (isEnglishTarget
            ? "Im echten Britisch verschmelzen Wörter miteinander. Trainiere die häufigsten Phrasal Verbs und Wortverbindungen im flüssigen Satzzusammenhang."
            : "Der Text taucht auf. Versuche ihn sofort laut vorzulesen. Es ist egal, ob du ihn übersetzen kannst! Dein Gehirn soll lernen, die Zeichen schnell zu verbinden."),
      bullet2Title: isGermanTarget ? "▶ Verb-Klammer (Rechte Satzklammer)" : (isEnglishTarget ? "▶ Zeiten-Präzision & Audio-Shadowing" : "▶ Audio-Kontrolle"),
      bullet2Desc: isGermanTarget 
        ? "Modalverben, trennbare Verben und das Perfekt spalten den Prädikatsrahmen. Warte geduldig, bis das finale Verb am Satzende einschlägt!" 
        : (isEnglishTarget
            ? "Höre auf die feinen Unterschiede zwischen Present Perfect und Past Simple. Sprich jeden Satz laut im britischen Rhythmus nach!"
            : "Klicke auf den Audio-Button, nachdem du gelesen hast. Vergleiche deine Geschwindigkeit und Aussprache mit dem Original. Sprich es noch einmal nach!"),
      bullet3Title: isGermanTarget ? "▶ 3 Flow-Stufen" : (isEnglishTarget ? "▶ 3 Flow-Stufen" : "▶ 3 Radar-Stufen"),
      bullet3Desc: isGermanTarget 
        ? "Stufe 1 (Signal-Bausteine), Stufe 2 (Einfache Satzklammern), Stufe 3 (Komplexe Mehrfachklammern & Inversion). Die perfekte Brücke für Phase 3." 
        : (isEnglishTarget
            ? "Stufe 1 (Alltags-Chunks & Linking), Stufe 2 (Zeiten-Wechsel & Phrasal Verbs), Stufe 3 (Reale Dialoge & Höflichkeitsformen)."
            : "Level 1 (Kurz), Level 2 (Mittellang), Level 3 (Reale Dialoge). Dies ist die perfekte Brücke, um in Phase 3 (Radar) zu überleben."),
      lvl1: isGermanTarget ? "Level 1: Die 6 Signal-Bausteine" : (isEnglishTarget ? "Level 1: Connected Speech & Chunks" : "Level 1: Grundlagen"),
      lvl2: isGermanTarget ? "Level 2: Satzklammer-Basis" : (isEnglishTarget ? "Level 2: Tenses & Phrasal Verbs" : "Level 2: Erweiterte Texte"),
      lvl3: isGermanTarget ? "Level 3: Komplexe Klammern & Inversion" : (isEnglishTarget ? "Level 3: Real British Dialogues" : "Level 3: Reale Dialoge")
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "SENTENCE BRACKET FLOW" : (isEnglishTarget ? "CONNECTED SPEECH FLOW" : "KANA FLOW"),
      subtitle: isGermanTarget ? "Fluent sentence framing for Radar:" : (isEnglishTarget ? "Fluent Sentence Flow & Phrasal Verbs for Radar:" : "Fluent Reading for Radar:"),
      day: isGermanTarget ? "Sentence" : (isEnglishTarget ? "Unit" : "Text"),
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: Sentence Brackets" : (isEnglishTarget ? "System Briefing: Connected Speech & Tenses" : "System Briefing"),
      bullet1Title: isGermanTarget ? "▶ 6 Signal Chunks & V2" : (isEnglishTarget ? "▶ Phrasal Verbs & Linking" : "▶ Reading Aloud (Shadowing)"),
      bullet1Desc: isGermanTarget 
        ? "Practice fusing prepositions and articles (ZUM, ZUR, MIT, IM) and anchoring the verb strictly on slot 2." 
        : (isEnglishTarget
            ? "In natural British English, words link together seamlessly. Practice essential phrasal verbs and collocations in full sentence context."
            : "The text appears. Try to read it out loud immediately. It doesn't matter if you can translate it! Your brain needs to learn to connect characters quickly."),
      bullet2Title: isGermanTarget ? "▶ The German Sentence Bracket" : (isEnglishTarget ? "▶ Tense Precision & Shadowing" : "▶ Audio Check"),
      bullet2Desc: isGermanTarget 
        ? "Modal verbs, separable verbs, and perfect tense split the predicate. Wait until the final verb element drops at the sentence end!" 
        : (isEnglishTarget
            ? "Spot the exact triggers for Present Perfect vs. Past Simple and shadow the native British intonation out loud!"
            : "Click the audio button after reading. Compare your speed and pronunciation with the original. Repeat it out loud!"),
      bullet3Title: isGermanTarget ? "▶ 3 Flow Levels" : (isEnglishTarget ? "▶ 3 Flow Levels" : "▶ 3 Radar Levels"),
      bullet3Desc: isGermanTarget 
        ? "Level 1 (Signal Chunks), Level 2 (Basic Brackets), Level 3 (Complex Double-Brackets & Inversion). The bridge to Phase 3." 
        : (isEnglishTarget
            ? "Level 1 (Everyday Chunks & Linking), Level 2 (Tense Shifts & Phrasal Verbs), Level 3 (Real British Dialogues)."
            : "Level 1 (Short), Level 2 (Medium), Level 3 (Real Dialogues). This is the perfect bridge to survive in Phase 3 (Radar)."),
      lvl1: isGermanTarget ? "Level 1: The 6 Signal Chunks" : (isEnglishTarget ? "Level 1: Connected Speech & Chunks" : "Level 1: Basics"),
      lvl2: isGermanTarget ? "Level 2: Basic Brackets" : (isEnglishTarget ? "Level 2: Tenses & Phrasal Verbs" : "Level 2: Extended Texts"),
      lvl3: isGermanTarget ? "Level 3: Complex Brackets & Inversion" : (isEnglishTarget ? "Level 3: Real British Dialogues" : "Level 3: Real Dialogues")
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "枠構造フロー (Satzklammer)" : (isEnglishTarget ? "英語リンキング・フロー" : "仮名フロー"),
      subtitle: isGermanTarget ? "レーダーへ繋ぐ流暢な文構造:" : (isEnglishTarget ? "レーダーへ繋ぐ自然な音声変化と句動詞:" : "レーダーへの流暢な読解:"),
      day: isGermanTarget ? "構文" : (isEnglishTarget ? "ユニット" : "テキスト"),
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 枠構造とシグナル" : (isEnglishTarget ? "システム解説: 音声連結（リンキング）と時制" : "システム解説"),
      bullet1Title: isGermanTarget ? "▶ 6大シグナル・パーツの自動化" : (isEnglishTarget ? "▶ 句動詞（Phrasal Verbs）と音の連結" : "▶ 音読（シャドーイング）"),
      bullet1Desc: isGermanTarget 
        ? "格変化表の計算を捨て、ZUM/ZUR、MIT DEM/DER、IM/IN DER、EINEN などの前置詞融合パーツを瞬時に射出します。" 
        : (isEnglishTarget
            ? "実際のイギリス英語では単語同士が滑らかに連結します。必須の句動詞とチャンクを自然な文脈で即座に読み上げます。"
            : "テキストが表示されたら即座に声に出して読んでください。脳が文字を素早く繋ぐ訓練です。"),
      bullet2Title: isGermanTarget ? "▶ 文末ハサミ撃ち（右枠固定）" : (isEnglishTarget ? "▶ 時制の使い分けとシャドーイング" : "▶ 音声確認"),
      bullet2Desc: isGermanTarget 
        ? "話法助動詞、分離動詞、現在完了形は文末に本動詞が落ちてきます。文末が聞こえるまで意味を決定しない耳のアンカーを鍛えます。" 
        : (isEnglishTarget
            ? "現在完了形と過去形のニュアンスの違いを聴き分け、ネイティブのリズムに合わせて声に出して復唱します。"
            : "読んだ後に音声ボタンをクリックし、発音とスピードを比較して復唱してください。"),
      bullet3Title: isGermanTarget ? "▶ 3段階の実戦フロー" : (isEnglishTarget ? "▶ 3段階の実戦フロー" : "▶ 3段階のレーダー"),
      bullet3Desc: isGermanTarget 
        ? "レベル1（シグナル・パーツ）、レベル2（基本枠構造）、レベル3（倒置＋複合枠構造）。フェーズ3（実戦）への架け橋です。" 
        : (isEnglishTarget
            ? "レベル1（日常チャンクと音変化）、レベル2（時制シフトと句動詞）、レベル3（実戦イギリス英語対話）。"
            : "レベル1（短文）、レベル2（中文）、レベル3（実戦対話）。フェーズ3で生き残るための訓練です。"),
      lvl1: isGermanTarget ? "レベル 1: 6大シグナル・パーツ" : (isEnglishTarget ? "レベル 1: 音声連結＆日常チャンク" : "レベル 1: 基礎"),
      lvl2: isGermanTarget ? "レベル 2: 基本枠構造 (助動詞・分離・完了)" : (isEnglishTarget ? "レベル 2: 時制シフト＆句動詞" : "レベル 2: 拡張テキスト"),
      lvl3: isGermanTarget ? "レベル 3: 複合枠構造＆倒置マスター" : (isEnglishTarget ? "レベル 3: 実戦イギリス対話" : "レベル 3: 実戦対話")
    }
  };

  const fallbackT = texts[normalizedLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    of: dbUiTexts?.of || fallbackT.of,
    title: dbCourseManifest?.deck2Title || fallbackT.title,
    subtitle: dbCourseManifest?.deck2Subtitle || fallbackT.subtitle,
    day: dbCourseManifest?.deck2DayLabel || dbUiTexts?.day || fallbackT.day,
    briefingTitle: dbCourseManifest?.deck2BriefingTitle || fallbackT.briefingTitle,
    bullet1Title: dbCourseManifest?.deck2Bullet1Title || fallbackT.bullet1Title,
    bullet1Desc: dbCourseManifest?.deck2Bullet1Desc || fallbackT.bullet1Desc,
    bullet2Title: dbCourseManifest?.deck2Bullet2Title || fallbackT.bullet2Title,
    bullet2Desc: dbCourseManifest?.deck2Bullet2Desc || fallbackT.bullet2Desc,
    bullet3Title: dbCourseManifest?.deck2Bullet3Title || fallbackT.bullet3Title,
    bullet3Desc: dbCourseManifest?.deck2Bullet3Desc || fallbackT.bullet3Desc,
    lvl1: dbCourseManifest?.deck2Lvl1 || fallbackT.lvl1,
    lvl2: dbCourseManifest?.deck2Lvl2 || fallbackT.lvl2,
    lvl3: dbCourseManifest?.deck2Lvl3 || fallbackT.lvl3
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      <div className="w-full max-w-md flex justify-start mb-6">
        <button onClick={onBackToHome} className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
      </div>

      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-cyan-400">{t.title}</h1>
        <p className="text-gray-400 text-center mb-4">{t.subtitle} {t.day} {currentDay > totalDays ? totalDays : currentDay} {t.of} {totalDays}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div className="bg-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-cyan-900/50 shadow-lg shadow-cyan-500/10">
        <h2 className="text-cyan-400 font-bold mb-4 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li><strong className="text-white block mb-1">{t.bullet1Title}</strong>{t.bullet1Desc}</li>
          <li><strong className="text-white block mb-1">{t.bullet2Title}</strong>{t.bullet2Desc}</li>
          <li><strong className="text-white block mb-1">{t.bullet3Title}</strong>{t.bullet3Desc}</li>
        </ul>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          // Vorrang für course_decks aus Supabase, Fallback auf lokale Datei
          const deckInfo = dbDecksMap?.[day] || activeDataSource[day];
          const groupTitle = deckInfo?.title && (!isDeOrEnTarget && language === 'en' ? (deckInfo.titleEn || deckInfo.title) : deckInfo.title);

          return (
            <React.Fragment key={day}>
              {day === 1 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-2 border-b border-gray-700 pb-1">{t.lvl1}</h3>}
              {day === 8 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-6 border-b border-gray-700 pb-1">{t.lvl2}</h3>}
              {day === 15 && <h3 className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-6 border-b border-gray-700 pb-1">{t.lvl3}</h3>}
              
              <button
                disabled={isLocked}
                onClick={() => { if (isCurrent || isCompleted) onStartDay(day); }}
                className={`py-4 px-4 rounded-xl font-bold transition-transform flex flex-col items-start text-left
                  ${isCurrent ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50 cursor-pointer active:scale-95' : ''}
                  ${isCompleted ? 'bg-gray-700 text-cyan-400 border border-cyan-500/30 cursor-pointer active:scale-95' : ''}
                  ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
                `}
              >
                <span className="text-lg mb-1">{t.day} {day}</span>
                {groupTitle && <span className="text-xs opacity-80 uppercase tracking-wider">{groupTitle}</span>}
              </button>
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};

export default ReadingDeck;