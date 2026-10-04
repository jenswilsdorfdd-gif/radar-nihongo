import React from 'react';
import { readingData } from '../data/readingData';
import { deReadingData } from '../data/deReadingData';

const ReadingDeck = ({ currentDay, totalDays, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';

  // Dynamische Datenquelle basierend auf Zielsprache
  const activeDataSource = isGermanTarget ? deReadingData : readingData;

  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "SATZKLAMMER FLOW" : "KANA FLOW",
      subtitle: isGermanTarget ? "Flüssige Satzklammern für Radar:" : "Flüssiges Lesen für Radar:",
      day: isGermanTarget ? "Satz" : "Text",
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Satzklammer-Flow" : "System-Einweisung",
      bullet1Title: isGermanTarget ? "▶ 6 Signal-Bausteine & V2" : "▶ Lautes Lesen (Schattenlesen)",
      bullet1Desc: isGermanTarget 
        ? "Trainiere die Verschmelzung von Präpositionen und Artikeln (ZUM, ZUR, MIT, IM) sowie den strikten Verbanker auf Position 2." 
        : "Der Text taucht auf. Versuche ihn sofort laut vorzulesen. Es ist egal, ob du ihn übersetzen kannst! Dein Gehirn soll lernen, die Zeichen schnell zu verbinden.",
      bullet2Title: isGermanTarget ? "▶ 文末ハサミ撃ち (Verb-Klammer)" : "▶ Audio-Kontrolle",
      bullet2Desc: isGermanTarget 
        ? "Modalverben, trennbare Verben und das Perfekt spalten den Prädikatsrahmen. Warte geduldig, bis das finale Verb am Satzende einschlägt!" 
        : "Klicke auf den Audio-Button, nachdem du gelesen hast. Vergleiche deine Geschwindigkeit und Aussprache mit dem Original. Sprich es noch einmal nach!",
      bullet3Title: isGermanTarget ? "▶ 3 Flow-Stufen" : "▶ 3 Radar-Stufen",
      bullet3Desc: isGermanTarget 
        ? "Stufe 1 (Signal-Bausteine), Stufe 2 (Einfache Satzklammern), Stufe 3 (Komplexe Mehrfachklammern & Inversion). Die perfekte Brücke für Phase 3." 
        : "Level 1 (Kurz), Level 2 (Mittellang), Level 3 (Reale Dialoge). Dies ist die perfekte Brücke, um in Phase 3 (Radar) zu überleben.",
      lvl1: isGermanTarget ? "Level 1: Die 6 Signal-Bausteine" : "Level 1: Grundlagen",
      lvl2: isGermanTarget ? "Level 2: Satzklammer-Basis" : "Level 2: Erweiterte Texte",
      lvl3: isGermanTarget ? "Level 3: Komplexe Klammern & Inversion" : "Level 3: Reale Dialoge"
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "SENTENCE BRACKET FLOW" : "KANA FLOW",
      subtitle: isGermanTarget ? "Fluent sentence framing for Radar:" : "Fluent Reading for Radar:",
      day: isGermanTarget ? "Sentence" : "Text",
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: Sentence Brackets" : "System Briefing",
      bullet1Title: isGermanTarget ? "▶ 6 Signal Chunks & V2" : "▶ Reading Aloud (Shadowing)",
      bullet1Desc: isGermanTarget 
        ? "Practice fusing prepositions and articles (ZUM, ZUR, MIT, IM) and anchoring the verb strictly on slot 2." 
        : "The text appears. Try to read it out loud immediately. It doesn't matter if you can translate it! Your brain needs to learn to connect characters quickly.",
      bullet2Title: isGermanTarget ? "▶ The German Sentence Bracket" : "▶ Audio Check",
      bullet2Desc: isGermanTarget 
        ? "Modal verbs, separable verbs, and perfect tense split the predicate. Wait until the final verb element drops at the sentence end!" 
        : "Click the audio button after reading. Compare your speed and pronunciation with the original. Repeat it out loud!",
      bullet3Title: isGermanTarget ? "▶ 3 Flow Levels" : "▶ 3 Radar Levels",
      bullet3Desc: isGermanTarget 
        ? "Level 1 (Signal Chunks), Level 2 (Basic Brackets), Level 3 (Complex Double-Brackets & Inversion). The bridge to Phase 3." 
        : "Level 1 (Short), Level 2 (Medium), Level 3 (Real Dialogues). This is the perfect bridge to survive in Phase 3 (Radar).",
      lvl1: isGermanTarget ? "Level 1: The 6 Signal Chunks" : "Level 1: Basics",
      lvl2: isGermanTarget ? "Level 2: Basic Brackets" : "Level 2: Extended Texts",
      lvl3: isGermanTarget ? "Level 3: Complex Brackets & Inversion" : "Level 3: Real Dialogues"
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "枠構造フロー (Satzklammer)" : "仮名フロー",
      subtitle: isGermanTarget ? "レーダーへ繋ぐ流暢な文構造:" : "レーダーへの流暢な読解:",
      day: isGermanTarget ? "構文" : "テキスト",
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 枠構造とシグナル" : "システム解説",
      bullet1Title: isGermanTarget ? "▶ 6大シグナル・パーツの自動化" : "▶ 音読（シャドーイング）",
      bullet1Desc: isGermanTarget 
        ? "格変化表の計算を捨て、ZUM/ZUR、MIT DEM/DER、IM/IN DER、EINEN などの前置詞融合パーツを瞬時に射出します。" 
        : "テキストが表示されたら即座に声に出して読んでください。脳が文字を素早く繋ぐ訓練です。",
      bullet2Title: isGermanTarget ? "▶ 文末ハサミ撃ち（右枠固定）" : "▶ 音声確認",
      bullet2Desc: isGermanTarget 
        ? "話法助動詞、分離動詞、現在完了形は文末に本動詞が落ちてきます。文末が聞こえるまで意味を決定しない耳のアンカーを鍛えます。" 
        : "読んだ後に音声ボタンをクリックし、発音とスピードを比較して復唱してください。",
      bullet3Title: isGermanTarget ? "▶ 3段階の実戦フロー" : "▶ 3段階のレーダー",
      bullet3Desc: isGermanTarget 
        ? "レベル1（シグナル・パーツ）、レベル2（基本枠構造）、レベル3（倒置＋複合枠構造）。フェーズ3（実戦）への架け橋です。" 
        : "レベル1（短文）、レベル2（中文）、レベル3（実戦対話）。フェーズ3で生き残るための訓練です。",
      lvl1: isGermanTarget ? "レベル 1: 6大シグナル・パーツ" : "レベル 1: 基礎",
      lvl2: isGermanTarget ? "レベル 2: 基本枠構造 (助動詞・分離・完了)" : "レベル 2: 拡張テキスト",
      lvl3: isGermanTarget ? "レベル 3: 複合枠構造＆倒置マスター" : "レベル 3: 実戦対話"
    }
  };

  const t = texts[language === 'jpn' ? 'jpn' : (texts[language] ? language : 'de')] || texts.de;

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
          
          const deckInfo = activeDataSource[day];
          const groupTitle = deckInfo?.title && (!isGermanTarget && language === 'en' ? (deckInfo.titleEn || deckInfo.title) : deckInfo.title);

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