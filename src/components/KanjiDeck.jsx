import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { kanjiData } from '../data/kanjiData';
import { deKompositaData } from '../data/deKompositaData';

const KanjiDeck = ({ currentDay, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const totalDays = 21; 
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';
  const isDeOrEnTarget = isGermanTarget || isEnglishTarget;

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const normalizedLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'phase4';

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
        console.error("Fehler beim Laden der Phase-4-Deck-Daten aus Supabase:", err);
      }
    };

    fetchDeckData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  // Lokale Fallback-Datenquelle
  const localDataSource = isDeOrEnTarget ? deKompositaData : kanjiData;

  // LOKALES FALLBACK-WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "KOMPOSITA DECK" : (isEnglishTarget ? "ADVANCED FLUENCY DECK" : "KANJI DECK"),
      subtitle: isGermanTarget ? "Wortbildungs- & Morphologie-Training:" : (isEnglishTarget ? "Business, Register & Nuancen-Training:" : "Starter N5 Level:"),
      day: isDeOrEnTarget ? "Thema" : "Tag",
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Komposita-Dekomposition" : (isEnglishTarget ? "System-Einweisung: Advanced Fluency & Nuance" : "System-Einweisung: Kanji"),
      briefingIntro: isGermanTarget 
        ? "Lange deutsche Wörter sind keine Zufallskonstrukte, sondern logisch geschachtelte Wortketten. Lerne hier die systematische Dekomposition in Bestimmungswort, Fugenelement und Grundwort."
        : (isEnglishTarget
            ? "Britisches Englisch lebt von diplomatischem Understatement, festen Kollokationen und präzisem Register. Lerne hier die Zerlegung und den Einsatz fortgeschrittener Ausdrücke."
            : "Japanische Symbole bestehen aus Form, Bedeutung und Lesung. Lerne hier die 121 wichtigsten N5-Kanji aus dem Radar-System."),
      bulletTitle: isGermanTarget ? "▶ Die Grundwort-Rechtsregel" : (isEnglishTarget ? "▶ Register & Struktur-Analyse" : "▶ Kopfkino & Kontext"),
      bulletDesc: isGermanTarget 
        ? "Das letzte Nomen (Grundwort) bestimmt immer zu 100 % das grammatikalische Geschlecht (der/die/das) und den Kern des Begriffs. Alle davor liegenden Wörter beschreiben das Grundwort nur näher."
        : (isEnglishTarget
            ? "Erkenne sofort den Kern eines Ausdrucks (Formal, Idiom, Business) und wie die Einzelbausteine die eigentliche Aussage höflich, aber glasklar transportieren."
            : "Nutze die Eselsbrücken, um dir das Zeichen einzuprägen. Beim Umdrehen zeigt dir das System echte japanische Beispielsätze (inkl. Lesehilfen und Audio)."),
      mechanics: "Mechanik:",
      mechanicsDesc: isGermanTarget
        ? "Trainiere die Zerlegung und Bedeutung der Einzelbestandteile. Bei 'Nochmal' wandert die Karte ans Ende der Tages-Warteschlange."
        : (isEnglishTarget
            ? "Trainiere die Bedeutung und Nuance jedes Ausdrucks. Bei 'Nochmal' wandert die Karte ans Ende der Tages-Warteschlange."
            : "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist.")
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "COMPOUNDS DECK" : (isEnglishTarget ? "ADVANCED FLUENCY DECK" : "KANJI DECK"),
      subtitle: isGermanTarget ? "Word Formation & Morphology Training:" : (isEnglishTarget ? "Business, Register & Nuance Training:" : "Starter N5 Level:"),
      day: isDeOrEnTarget ? "Topic" : "Day",
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: Compound Decomposition" : (isEnglishTarget ? "System Briefing: Advanced Fluency & Nuance" : "System Briefing: Kanji"),
      briefingIntro: isGermanTarget
        ? "Long German words are logically nested chains. Learn systematic decomposition into modifying element, connecting element, and head word."
        : (isEnglishTarget
            ? "British English thrives on diplomatic understatement, fixed collocations, and precise register. Master the breakdown and real-world use of advanced expressions here."
            : "Japanese symbols consist of form, meaning, and reading. Learn the 121 most important N5 Kanji from the Radar System here."),
      bulletTitle: isGermanTarget ? "▶ The Right-Hand Head Rule" : (isEnglishTarget ? "▶ Register & Structural Breakdown" : "▶ Mnemonics & Context"),
      bulletDesc: isGermanTarget
        ? "The final noun (head word) strictly determines 100% of the grammatical gender (der/die/das) and core meaning. All preceding parts merely specify it."
        : (isEnglishTarget
            ? "Identify the core register (Formal, Idiom, Business) immediately and see how each building block conveys the exact message politely yet unmistakably."
            : "Use the mnemonics to memorize the character. When flipped, the system shows you real Japanese example sentences (incl. reading aids and audio)."),
      mechanics: "Mechanics:",
      mechanicsDesc: isGermanTarget
        ? "Drill morphological breakdown. Clicking 'Again' moves the card to the end of the daily queue."
        : (isEnglishTarget
            ? "Drill the meaning and nuance of each expression. Clicking 'Again' moves the card to the end of the daily queue."
            : "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty.")
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "複合語解体デッキ" : (isEnglishTarget ? "上級表現・ビジネスデッキ" : "漢字デッキ"),
      subtitle: isGermanTarget ? "語形成・形態素解析トレーニング:" : (isEnglishTarget ? "ビジネス・レジスター＆ニュアンス演習:" : "スターター N5 レベル:"),
      day: isDeOrEnTarget ? "単元" : "日目",
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 複合名詞の解体法則" : (isEnglishTarget ? "システム解説: 上級表現とニュアンス解体" : "システム解説: 漢字"),
      briefingIntro: isGermanTarget
        ? "一見長大で威圧的なドイツ語の名詞は、規則的なパーツの組み合わせに過ぎません。左から右へ分解し、修飾語・結合要素（Fugen）・基底語の構造をスキャンします。"
        : (isEnglishTarget
            ? "イギリス英語の真髄は控えめな表現（アンダーステートメント）、定型コロケーション、正確なレジスターの使い分けにあります。高度な表現構造を体系的に習得します。"
            : "日本の漢字は形・意味・読みで構成されます。ここではレーダーシステムにおける必須N5漢字121文字を定着させます。"),
      bulletTitle: isGermanTarget ? "▶ 基底語（Grundwort）の絶対右端ルール" : (isEnglishTarget ? "▶ レジスターと表現核の特定" : "▶ イメージ連想と文脈"),
      bulletDesc: isGermanTarget
        ? "どれほど長い単語であっても、文末（最後）に位置する名詞が全体の文法上の性（der/die/das）と本質的意味を100%決定します。"
        : (isEnglishTarget
            ? "表現のトーン（フォーマル・イディオム・ビジネス）を瞬時に見抜き、各パーツがどのように丁寧かつ的確に意図を伝えているかを解析します。"
            : "連想法を使って文字を記憶してください。カードをめくると実戦例文（読み・音声付き）が表示されます。"),
      mechanics: "演習ルール:",
      mechanicsDesc: isGermanTarget
        ? "各要素の役割と意味を確認しながら反復します。「もう一度」を押すと未習得カードが末尾へ再配置されます。"
        : (isEnglishTarget
            ? "各表現の構造とニュアンスを確認しながら反復します。「もう一度」を押すと未習得カードが末尾へ再配置されます。"
            : "「もう一度」を押すとカードがキューの末尾へ移動します。カードがなくなるまで継続してください。")
    }
  };

  const fallbackT = texts[normalizedLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    of: dbUiTexts?.of || fallbackT.of,
    mechanics: dbUiTexts?.mechanics || fallbackT.mechanics,
    title: dbCourseManifest?.deck4Title || fallbackT.title,
    subtitle: dbCourseManifest?.deck4Subtitle || fallbackT.subtitle,
    day: dbCourseManifest?.deck4DayLabel || dbUiTexts?.day || fallbackT.day,
    briefingTitle: dbCourseManifest?.deck4BriefingTitle || fallbackT.briefingTitle,
    briefingIntro: dbCourseManifest?.deck4BriefingIntro || fallbackT.briefingIntro,
    bulletTitle: dbCourseManifest?.deck4BulletTitle || fallbackT.bulletTitle,
    bulletDesc: dbCourseManifest?.deck4BulletDesc || fallbackT.bulletDesc,
    mechanicsDesc: dbCourseManifest?.deck4MechanicsDesc || dbUiTexts?.mechanicsDesc || fallbackT.mechanicsDesc
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Zurück-Button */}
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold cursor-pointer"
        >
          &larr; {t.back}
        </button>
      </div>

      {/* Header & Fortschritt */}
      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-purple-400">
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {t.subtitle} {t.day} {currentDay > totalDays ? totalDays : currentDay} {t.of} {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className="text-purple-400 font-bold mb-2 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          {t.briefingIntro}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white block mb-1">{t.bulletTitle}</strong>
          {t.bulletDesc}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed pt-3 border-t border-gray-700">
          <strong className="text-purple-400">{t.mechanics}</strong> {t.mechanicsDesc}
        </p>
      </div>

      {/* 21-Tage Raster */}
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;

          // Vorrang für course_decks aus Supabase, Fallback auf lokale Datei
          const deckEntry = dbDecksMap?.[day] || localDataSource[day];
          const dayTitle = deckEntry?.title || null;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={`py-4 px-4 rounded-xl font-bold transition-transform active:scale-95 flex flex-col items-center justify-center text-center
                ${isCurrent ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-purple-400 border border-purple-500/30 cursor-pointer' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span className="text-lg">{t.day} {day}</span>
              {dayTitle && (
                <span className="text-xs font-normal text-purple-200/80 mt-1 line-clamp-1">
                  {dayTitle}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanjiDeck;