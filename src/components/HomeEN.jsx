import React from 'react';

const HomeEN = ({ 
  onSelectMode, 
  kanaReadDay, // Wird hier für das Grammatik-Tracking genutzt
  kanaWriteDay, // Wird hier für das Vokabel-Tracking genutzt
  readingDay, // Wird hier für das Phrasal-Verbs-Tracking genutzt
  radarDay, // Radar bleibt Radar
  kanjiDay, // Wird hier für Advanced/Business English genutzt
  devMode, 
  t,
  language // Wird zur Ermittlung der Muttersprache genutzt
}) => {
  // Erkennung der UI-Sprache (Fallback über 't', falls 'language' aus Home.jsx nicht übergeben wird)
  const currentLang = language || (t.day === 'Day' ? 'en' : (t.day === '日' ? 'jpn' : 'de'));

  // LOCK MECHANISMUS (Berücksichtigt den Dev Mode)
  const isTenseUnlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14);
  const isPhase2Unlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14); 
  const isPhase3Unlocked = devMode || (isPhase2Unlocked && readingDay >= 21);
  const isPhase4Unlocked = devMode || (isPhase3Unlocked && radarDay >= 21);
  const isExamUnlocked = devMode || (isPhase4Unlocked && kanjiDay >= 21);

  // ENGLISCH-SPEZIFISCHE TEXTE (Überschreiben die Texte aus dem Haupt-Dictionary für dieses Modul)
  const texts = {
    de: {
      phase1GrammarTitle: "Phase 1: Core Grammar",
      phase1GrammarDesc: "Die absoluten Grundlagen der englischen Satzstruktur. Das Fundament für dein Gehirn.",
      phase1VocabTitle: "Phase 1: Core Vocabulary",
      phase1VocabDesc: "Der essenzielle Grundwortschatz. Präge dir die wichtigsten Begriffe des Alltags ein.",
      tenseTitle: "Die Zeiten-Matrix",
      tenseDesc: "Entschlüssele alle englischen Zeitformen auf einen Schlag.",
      tenseLockedDesc: "Schließe Phase 1 komplett ab, um die Zeiten-Matrix freizuschalten.",
      phase2PhrasalTitle: "Phase 2: Phrasal Verbs & Idioms",
      phase2PhrasalDesc: "Lerne, wie Muttersprachler wirklich reden. Weg vom Schulenglisch, hin zum echten Leben.",
      phase2LockedDesc: "Schließe Phase 1 ab, um diese Mission freizuschalten.",
      phase3Title: "Phase 3: 21-Day Radar",
      phase3Desc: "Stresstest, Hörverstehen und Reaktion für das Überleben in englischsprachigen Ländern.",
      phase4Title: "Phase 4: Advanced Fluency",
      phase4Desc: "Business English, komplexe Ausdrucksweisen und Verhandlungsgeschick.",
      phase4LockedDesc: "Schließe Phase 3 (Radar) ab, um das Advanced-Training freizuschalten."
    },
    en: {
      phase1GrammarTitle: "Phase 1: Core Grammar",
      phase1GrammarDesc: "The absolute basics of English sentence structure. The foundation for your brain.",
      phase1VocabTitle: "Phase 1: Core Vocabulary",
      phase1VocabDesc: "The essential basic vocabulary. Memorize the most important everyday terms.",
      tenseTitle: "The Tense Matrix",
      tenseDesc: "Decode all English tenses at a glance.",
      tenseLockedDesc: "Complete Phase 1 entirely to unlock the Tense Matrix.",
      phase2PhrasalTitle: "Phase 2: Phrasal Verbs & Idioms",
      phase2PhrasalDesc: "Learn how native speakers actually talk. Away from school English, into real life.",
      phase2LockedDesc: "Complete Phase 1 to unlock this mission.",
      phase3Title: "Phase 3: 21-Day Radar",
      phase3Desc: "Stress test, listening comprehension, and reaction for surviving in English-speaking countries.",
      phase4Title: "Phase 4: Advanced Fluency",
      phase4Desc: "Business English, complex expressions, and negotiation skills.",
      phase4LockedDesc: "Complete Phase 3 (Radar) to unlock Advanced Training."
    },
    jpn: {
      phase1GrammarTitle: "フェーズ 1: コア文法 (Core Grammar)",
      phase1GrammarDesc: "英語の文法構造の絶対的な基礎。脳のための土台。",
      phase1VocabTitle: "フェーズ 1: コア語彙 (Core Vocabulary)",
      phase1VocabDesc: "必須の基礎語彙。最も重要な日常用語を記憶する。",
      tenseTitle: "時制マトリックス (Tense Matrix)",
      tenseDesc: "すべての英語の時制を一目で解読する。",
      tenseLockedDesc: "時制マトリックスをアンロックするには、フェーズ1を完全にクリアしてください。",
      phase2PhrasalTitle: "フェーズ 2: 句動詞とイディオム (Phrasal Verbs)",
      phase2PhrasalDesc: "ネイティブの実際の話し方を学ぶ。学校英語から離れ、現実の生活へ。",
      phase2LockedDesc: "このミッションをアンロックするには、フェーズ1をクリアしてください。",
      phase3Title: "フェーズ 3: 21日間レーダー (21-Day Radar)",
      phase3Desc: "英語圏で生き残るためのストレステスト、リスニング理解、そして反応力。",
      phase4Title: "フェーズ 4: 上級の流暢さ (Advanced Fluency)",
      phase4Desc: "ビジネス英語、複雑な表現、交渉スキル。",
      phase4LockedDesc: "上級トレーニングをアンロックするには、フェーズ3（レーダー）をクリアしてください。"
    }
  };

  const enTexts = texts[currentLang] || texts.de;

  return (
    <>
      {/* PHASE 1 (Immer frei) */}
      <button onClick={() => onSelectMode('kana-read')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all group text-left relative overflow-hidden">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{enTexts.phase1GrammarTitle}</h2>
          <span className="text-green-500 text-sm font-bold">{t.day} {kanaReadDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{enTexts.phase1GrammarDesc}</p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${(kanaReadDay / 14) * 100}%` }}></div></div>
      </button>

      <button onClick={() => onSelectMode('kana-write')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group text-left relative overflow-hidden">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{enTexts.phase1VocabTitle}</h2>
          <span className="text-blue-500 text-sm font-bold">{t.day} {kanaWriteDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{enTexts.phase1VocabDesc}</p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(kanaWriteDay / 14) * 100}%` }}></div></div>
      </button>

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* SPECIAL CRASHKURS BUTTON (Zeiten-Matrix) */}
      {isTenseUnlocked ? (
        <button onClick={() => onSelectMode('particle-crashcourse')} className="w-full bg-gray-900 p-5 rounded-2xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-400 transition-all group text-left relative overflow-hidden flex items-center justify-between active:scale-95">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <div>
            <h2 className="text-xl font-extrabold text-orange-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <span>⏱️</span> {enTexts.tenseTitle}
            </h2>
            <p className="text-gray-400 text-sm italic">{enTexts.tenseDesc}</p>
          </div>
          <div className="text-orange-500/50 group-hover:text-orange-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-5 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <h2 className="text-xl font-extrabold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <span>🔒</span> {enTexts.tenseTitle}
          </h2>
          <p className="text-gray-500 text-sm italic">{enTexts.tenseLockedDesc}</p>
        </div>
      )}

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* PHASE 2 */}
      {isPhase2Unlocked ? (
        <button onClick={() => onSelectMode('reading')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{enTexts.phase2PhrasalTitle}</h2>
            <span className="text-cyan-500 text-sm font-bold">{t.day} {readingDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{enTexts.phase2PhrasalDesc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(readingDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {enTexts.phase2PhrasalTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">{enTexts.phase2LockedDesc}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      {/* PHASE 3 */}
      {isPhase3Unlocked ? (
        <button onClick={() => onSelectMode('radar')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{enTexts.phase3Title}</h2>
            <span className="text-yellow-500 text-sm font-bold">{t.day} {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{enTexts.phase3Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${(radarDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {enTexts.phase3Title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">{t.phase3LockedDesc}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      {/* PHASE 4 */}
      {isPhase4Unlocked ? (
        <button onClick={() => onSelectMode('kanji')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{enTexts.phase4Title}</h2>
            <span className="text-purple-500 text-sm font-bold">{t.day} {kanjiDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{enTexts.phase4Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(kanjiDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {enTexts.phase4Title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">{enTexts.phase4LockedDesc}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
      </div>

      {/* PRÜFUNGS BUTTON */}
      {isExamUnlocked ? (
        <button onClick={() => onSelectMode('final-exam')} className="w-full bg-red-900/40 p-6 rounded-2xl border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:border-red-400 transition-all group text-left relative overflow-hidden flex flex-col justify-center active:scale-95">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-all"></div>
          <h2 className="text-2xl font-extrabold text-red-400 tracking-widest uppercase mb-2 flex items-center gap-3">
            <span>🎓</span> {t.examTitle}
          </h2>
          <p className="text-gray-300 text-sm italic">{t.examDesc}</p>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <h2 className="text-xl font-extrabold text-gray-500 tracking-widest uppercase mb-2 flex items-center gap-3">
            <span>🔒</span> {t.examLockedTitle}
          </h2>
          <p className="text-gray-500 text-sm italic">{t.examLockedDesc}</p>
        </div>
      )}
    </>
  );
};

export default HomeEN;