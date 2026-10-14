import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { kanaData } from '../data/kanaData';
import { dePhonetikData } from '../data/dePhonetikData';

const KanaDeck = ({ currentDay, totalDays, mode, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isWrite = mode === 'write';
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const normalizedLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = isWrite ? 'phase1_write' : 'phase1_read';

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
        console.error("Fehler beim Laden der Deck-Daten aus Supabase:", err);
      }
    };

    fetchDeckData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  // Lokale Fallback-Datenquelle, falls course_decks für einen Tag noch keinen Eintrag hat
  const localDataSource = (isGermanTarget || isEnglishTarget) ? dePhonetikData : kanaData;

  // LOKALES FALLBACK-WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      modeLabel: "Modus",
      modeWrite: isGermanTarget ? "V2-Satzbau" : (isEnglishTarget ? "Core Vocabulary" : "Schreiben"),
      modeRead: isGermanTarget ? "Lautbildung" : (isEnglishTarget ? "Core Grammar" : "Lesen"),
      title: isGermanTarget ? "PHONETIK DECK" : (isEnglishTarget ? (isWrite ? "VOCABULARY DECK" : "GRAMMAR DECK") : "KANA DECK"),
      subtitleWrite: isGermanTarget ? "V2-Code Training" : (isEnglishTarget ? "Grundwortschatz-Training" : "Zeichen-Training"),
      subtitleRead: isGermanTarget ? "Laut-Erkennung" : (isEnglishTarget ? "Satzstruktur-Training" : "Zeichen-Erkennung"),
      day: isGermanTarget ? "Tag" : "Tag",
      of: "von",
      briefingTitle: isGermanTarget 
        ? "System-Einweisung: Phonetik & V2" 
        : (isEnglishTarget ? "System-Einweisung: Core English" : "System-Einweisung"),
      writeBullet1Title: isGermanTarget 
        ? "▶ V2-Satzbau & Slot-Drill" 
        : (isEnglishTarget ? "▶ Aktiver Grundwortschatz" : "▶ Präzisionstraining"),
      writeBullet1Desc: isGermanTarget 
        ? "Trainiere die feste Verankerung des finiten Verbs auf Position 2 und meistere die Inversion." 
        : (isEnglishTarget 
            ? "Präge dir die wichtigsten britischen Alltagsbegriffe und Kollokationen aktiv ein." 
            : "Zeichne das geforderte Kana aus dem Gedächtnis auf das Display. Nutze den Finger oder einen Stylus."),
      writeBullet2Title: isGermanTarget 
        ? "▶ Strenge Strukturkontrolle" 
        : (isEnglishTarget ? "▶ Kontext & Anwendung" : "▶ Strenge Bewertung"),
      writeBullet2Desc: isGermanTarget 
        ? "Prüfe, ob das Verb strikt an zweiter Stelle steht. Wenn die Satzstruktur abweicht: 'Nochmal'." 
        : (isEnglishTarget 
            ? "Prüfe, ob du das Wort sofort im richtigen Satzkontext abrufen kannst. Bei Unsicherheit: 'Nochmal'." 
            : "Beim Prüfen wird das perfekte Zeichen über deine Skizze gelegt. Sei ehrlich zu dir selbst: Wenn die Proportionen nicht stimmen, klicke auf 'Nochmal'."),
      readBullet1Title: isGermanTarget 
        ? "▶ Mundstellung & Kopfkino" 
        : (isEnglishTarget ? "▶ SVO-Kernsatzbau & Muster" : "▶ Visuelles Training & Kopfkino"),
      readBullet1Desc: isGermanTarget 
        ? "Nutze die physischen Zungen- und Lippenanweisungen für Umlaute (Ä, Ö, Ü) und den Knacklaut." 
        : (isEnglishTarget 
            ? "Verinnerliche die englische Subjekt-Verb-Objekt-Architektur, Fragen und Verneinungen ohne Nachdenken." 
            : "Präge dir das Zeichen über die visuellen Eselsbrücken ein! Du hast ein besseres Bild im Kopf? Klicke auf das ✏️-Symbol auf der Rückseite und speichere deine eigene Eselsbrücke dauerhaft ab."),
      readBullet2Title: isGermanTarget 
        ? "▶ Konsonantenstopp & Audio" 
        : (isEnglishTarget ? "▶ Britische Intonation & Audio" : "▶ Auditives Lernen"),
      readBullet2Desc: isGermanTarget 
        ? "Stoppe Endkonsonanten hart ab (Geld = [ɡɛlt]) ohne Katakana-Vokal. Höre dir die native Aussprache an." 
        : (isEnglishTarget 
            ? "Höre dir die native Aussprache über die 🔊-Buttons an und sprich die Satzmuster laut mit." 
            : "Klicke auf die kleinen 🔊-Buttons, um dir die exakte Aussprache anzuhören. Sprich die Vokabeln und Sätze laut mit, um ein Gefühl für echte japanische Wörter zu bekommen."),
      mechanics: "Mechanik:",
      mechanicsDesc: "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist."
    },
    en: {
      back: "Main Menu",
      modeLabel: "Mode",
      modeWrite: isGermanTarget ? "V2 Structure" : (isEnglishTarget ? "Core Vocabulary" : "Write"),
      modeRead: isGermanTarget ? "Phonetics" : (isEnglishTarget ? "Core Grammar" : "Read"),
      title: isGermanTarget ? "PHONETICS DECK" : (isEnglishTarget ? (isWrite ? "VOCABULARY DECK" : "GRAMMAR DECK") : "KANA DECK"),
      subtitleWrite: isGermanTarget ? "V2-Code Training" : (isEnglishTarget ? "Essential Vocabulary" : "Character Training"),
      subtitleRead: isGermanTarget ? "Sound Recognition" : (isEnglishTarget ? "Sentence Structure" : "Character Recognition"),
      day: "Day",
      of: "of",
      briefingTitle: isGermanTarget 
        ? "System Briefing: Phonetics & V2" 
        : (isEnglishTarget ? "System Briefing: Core English" : "System Briefing"),
      writeBullet1Title: isGermanTarget 
        ? "▶ V2 Structure & Slot Drill" 
        : (isEnglishTarget ? "▶ Active Core Vocabulary" : "▶ Precision Training"),
      writeBullet1Desc: isGermanTarget 
        ? "Train locking the finite verb into slot 2 and master inversion." 
        : (isEnglishTarget 
            ? "Actively memorize the most important everyday British terms and collocations." 
            : "Draw the requested Kana from memory onto the display. Use your finger or a stylus."),
      writeBullet2Title: isGermanTarget 
        ? "▶ Strict Syntax Check" 
        : (isEnglishTarget ? "▶ Context & Recall" : "▶ Strict Evaluation"),
      writeBullet2Desc: isGermanTarget 
        ? "Check if the verb strictly holds position 2. If the structure is off, click 'Again'." 
        : (isEnglishTarget 
            ? "Verify that you can recall the term immediately in its natural sentence context. If unsure, click 'Again'." 
            : "When checking, the perfect character is overlaid on your sketch. Be honest with yourself: If the proportions are off, click 'Again'."),
      readBullet1Title: isGermanTarget 
        ? "▶ Mouth Position & Mnemonics" 
        : (isEnglishTarget ? "▶ SVO Core Architecture" : "▶ Visual Training & Mnemonics"),
      readBullet1Desc: isGermanTarget 
        ? "Use physical tongue and lip instructions for umlaute (Ä, Ö, Ü) and glottal stops." 
        : (isEnglishTarget 
            ? "Internalize English Subject-Verb-Object patterns, questions, and negations until they become automatic." 
            : "Memorize the character using visual mnemonics! Have a better image in mind? Click the ✏️ icon on the back and permanently save your own mnemonic."),
      readBullet2Title: isGermanTarget 
        ? "▶ Consonant Stops & Audio" 
        : (isEnglishTarget ? "▶ British Intonation & Audio" : "▶ Auditory Learning"),
      readBullet2Desc: isGermanTarget 
        ? "Stop final consonants abruptly without trailing vowels. Listen carefully to native audio." 
        : (isEnglishTarget 
            ? "Listen to the native pronunciation via the 🔊 buttons and shadow the sentences out loud." 
            : "Click the small 🔊 buttons to hear the exact pronunciation. Say the vocabulary and sentences out loud to get a feel for real Japanese words."),
      mechanics: "Mechanics:",
      mechanicsDesc: "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty."
    },
    jpn: {
      back: "メインメニュー",
      modeLabel: "モード",
      modeWrite: isGermanTarget ? "V2構文ドリル" : (isEnglishTarget ? "コア語彙" : "書く"),
      modeRead: isGermanTarget ? "発音・調音" : (isEnglishTarget ? "コア文法" : "読む"),
      title: isGermanTarget ? "ドイツ語発音デッキ" : (isEnglishTarget ? (isWrite ? "英語コア語彙デッキ" : "英語コア文法デッキ") : "仮名デッキ"),
      subtitleWrite: isGermanTarget ? "定動詞第2位トレーニング" : (isEnglishTarget ? "必須語彙トレーニング" : "文字トレーニング"),
      subtitleRead: isGermanTarget ? "調音筋肉認識" : (isEnglishTarget ? "文構造トレーニング" : "文字認識"),
      day: "日目",
      of: "/",
      briefingTitle: isGermanTarget 
        ? "システム解説: 発音・調音筋力" 
        : (isEnglishTarget ? "システム解説: 英語コア基礎" : "システム解説"),
      writeBullet1Title: isGermanTarget 
        ? "▶ V2規則スロット演習" 
        : (isEnglishTarget ? "▶ 実践コア語彙の定着" : "▶ 筆記精密トレーニング"),
      writeBullet1Desc: isGermanTarget 
        ? "活用動詞を常に第2スロットに配置し、時間や場所が前に出た際の倒置構文を身体に叩き込みます。" 
        : (isEnglishTarget 
            ? "日常およびビジネスで必須となるイギリス英語の最重要語彙とコロケーションを記憶します。" 
            : "要求された仮名を記憶から画面に描きます。指またはスタイラスペンを使用してください。"),
      writeBullet2Title: isGermanTarget 
        ? "▶ 厳格な構文判定" 
        : (isEnglishTarget ? "▶ 文脈での即応チェック" : "▶ 厳格な自己評価"),
      writeBullet2Desc: isGermanTarget 
        ? "動詞の位置が第2スロットからズレていた場合は、迷わず「もう一度」を選択してください。" 
        : (isEnglishTarget 
            ? "正しい文脈で即座に語彙を引き出せるか確認し、迷いがあれば「もう一度」を選択してください。" 
            : "判定時にお手本が重なります。バランスが崩れていたら「もう一度」をクリックしてください。"),
      readBullet1Title: isGermanTarget 
        ? "▶ 調音点と口唇筋肉の物理制御" 
        : (isEnglishTarget ? "▶ SVOコア文構造の自動化" : "▶ 視覚的記憶とイメージ"),
      readBullet1Desc: isGermanTarget 
        ? "変母音（Ä, Ö, Ü）や声門閉鎖音の舌の位置と唇の突き出しを、物理的な指示通りに固定します。" 
        : (isEnglishTarget 
            ? "英語の基本語順（SVO）、疑問文、否定文の骨格を無意識レベルで組み立てられるように訓練します。" 
            : "イメージ記憶を活用しましょう。裏面の鉛筆マークから自分だけの覚え方を保存できます。"),
      readBullet2Title: isGermanTarget 
        ? "▶ 脱カタカナ語末子音停止" 
        : (isEnglishTarget ? "▶ イギリス英語の発音とリズム" : "▶ 音声学習"),
      readBullet2Desc: isGermanTarget 
        ? "Geld を「ゲルド」と読まず、舌先で息をブロック（[t] 停止）。ネイティブ音声を聴いて模倣します。" 
        : (isEnglishTarget 
            ? "🔊ボタンでネイティブの発音を確認し、声に出して英語本来のリズムとイントネーションを掴みます。" 
            : "🔊ボタンで正確な発音を確認し、声に出して本物の日本語のリズムを掴んでください。"),
      mechanics: "学習ルール:",
      mechanicsDesc: "「もう一度」を押したカードはキューの最後尾へ回ります。全問正解で完了となります。"
    }
  };

  const fallbackT = texts[normalizedLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    modeLabel: dbUiTexts?.modeLabel || fallbackT.modeLabel,
    day: dbUiTexts?.day || fallbackT.day,
    of: dbUiTexts?.of || fallbackT.of,
    mechanics: dbUiTexts?.mechanics || fallbackT.mechanics,
    mechanicsDesc: dbUiTexts?.mechanicsDesc || fallbackT.mechanicsDesc,
    modeWrite: dbCourseManifest?.deck1ModeWrite || fallbackT.modeWrite,
    modeRead: dbCourseManifest?.deck1ModeRead || fallbackT.modeRead,
    title: isWrite
      ? (dbCourseManifest?.deck1TitleWrite || fallbackT.title)
      : (dbCourseManifest?.deck1TitleRead || fallbackT.title),
    subtitleWrite: dbCourseManifest?.deck1SubtitleWrite || fallbackT.subtitleWrite,
    subtitleRead: dbCourseManifest?.deck1SubtitleRead || fallbackT.subtitleRead,
    briefingTitle: dbCourseManifest?.deck1BriefingTitle || fallbackT.briefingTitle,
    writeBullet1Title: dbCourseManifest?.deck1WriteBullet1Title || fallbackT.writeBullet1Title,
    writeBullet1Desc: dbCourseManifest?.deck1WriteBullet1Desc || fallbackT.writeBullet1Desc,
    writeBullet2Title: dbCourseManifest?.deck1WriteBullet2Title || fallbackT.writeBullet2Title,
    writeBullet2Desc: dbCourseManifest?.deck1WriteBullet2Desc || fallbackT.writeBullet2Desc,
    readBullet1Title: dbCourseManifest?.deck1ReadBullet1Title || fallbackT.readBullet1Title,
    readBullet1Desc: dbCourseManifest?.deck1ReadBullet1Desc || fallbackT.readBullet1Desc,
    readBullet2Title: dbCourseManifest?.deck1ReadBullet2Title || fallbackT.readBullet2Title,
    readBullet2Desc: dbCourseManifest?.deck1ReadBullet2Desc || fallbackT.readBullet2Desc
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Navigation & Modus-Anzeige */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; {t.back}
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isWrite ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
          {t.modeLabel}: {isWrite ? t.modeWrite : t.modeRead}
        </span>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <h1 className={`text-3xl font-bold text-center mb-2 tracking-wider ${isWrite ? 'text-blue-400' : 'text-green-400'}`}>
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {isWrite ? t.subtitleWrite : t.subtitleRead}: {t.day} {currentDay} {t.of} {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className={`${isWrite ? 'bg-blue-500' : 'bg-green-500'} h-full transition-all duration-500`} 
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamische System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className={`${isWrite ? 'text-blue-400' : 'text-green-400'} font-bold mb-4 tracking-wide uppercase text-sm`}>
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          {isWrite ? (
            <>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet1Title}</strong>
                {t.writeBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet2Title}</strong>
                {t.writeBullet2Desc}
              </li>
            </>
          ) : (
            <>
              <li>
                <strong className="text-white block mb-1">{t.readBullet1Title}</strong>
                {t.readBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.readBullet2Title}</strong>
                {t.readBullet2Desc}
              </li>
            </>
          )}
          <li className="pt-3 border-t border-gray-700">
            <strong className={isWrite ? 'text-blue-400' : 'text-green-400'}>{t.mechanics}</strong> {t.mechanicsDesc}
          </li>
        </ul>
      </div>

      {/* Raster */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          // Vorrang für course_decks aus Supabase, Fallback auf lokale Datei
          const deckInfo = dbDecksMap?.[day] || localDataSource[day];
          const groupTitle = deckInfo?.title;

          let btnClass = "py-3 px-2 rounded-xl font-bold transition-transform flex flex-col items-center justify-center text-center ";
          
          if (isCurrent) {
            btnClass += isWrite 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 cursor-pointer active:scale-95" 
              : "bg-green-600 text-white shadow-lg shadow-green-500/50 cursor-pointer active:scale-95";
          } else if (isCompleted) {
            btnClass += isWrite 
              ? "bg-gray-700 text-blue-400 border border-blue-500/30 cursor-pointer active:scale-95" 
              : "bg-gray-700 text-green-400 border border-green-500/30 cursor-pointer active:scale-95";
          } else {
            btnClass += "bg-gray-800 text-gray-600 cursor-not-allowed";
          }

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={btnClass}
            >
              <span className="text-lg">{t.day} {day}</span>
              {deckInfo?.title && (
                <span className="text-[0.65rem] opacity-80 mt-1 uppercase tracking-wider leading-tight">
                  {groupTitle}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanaDeck;