import React from 'react';

const HomeDE = ({ 
  onSelectMode, 
  kanaReadDay, 
  kanaWriteDay, 
  readingDay, 
  radarDay, 
  kanjiDay, 
  devMode, 
  t,
  language
}) => {
  // Erkennung der UI-Sprache (Muttersprache/Base) mit Fallback über 't.day'
  const normalizedLang = (language === 'jp' || language === 'jpn') ? 'jpn' : language;
  const currentLang = normalizedLang || (t?.day === 'Day' ? 'en' : (t?.day === '日' ? 'jpn' : 'de'));

  // Lock-Mechanismus für Deutsch (analog zu HomeJP/HomeEN)
  const isSignalUnlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14);
  const isPhase2Unlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14); 
  const isPhase3Unlocked = devMode || (isPhase2Unlocked && readingDay >= 21);
  const isPhase4Unlocked = devMode || (isPhase3Unlocked && radarDay >= 21);
  const isExamUnlocked = devMode || (isPhase4Unlocked && kanjiDay >= 21);

  // SPRACH-WÖRTERBUCH FÜR DAS DEUTSCH-DASHBOARD (Base: EN, JPN, DE)
  const texts = {
    en: {
      phase1PhonetikTitle: "Phase 1: Phonetics & Articulation (Phonetik)",
      phase1PhonetikDesc: "Master German sounds: Physical training for Umlauts (Ä, Ö, Ü), glottal stops, and final consonant devoicing.",
      phase1V2Title: "Phase 1: Verb-Second Code (V2-Regel)",
      phase1V2Desc: "Crack the German sentence structure: Keep the finite verb strictly in slot 2 and master time/place inversions.",
      signalTitle: "The 6 Signal Blocks (Signal-Code)",
      signalDesc: "Forget endless case tables: ZUM/ZUR, MIT, IM, EINEN, VON...BIS, BITTE",
      signalLockedDesc: "Complete Phase 1 to unlock the Signal Blocks.",
      phase2KlammerTitle: "Phase 2: Sentence Bracket Flow (Satzklammer)",
      phase2KlammerDesc: "Automate the German framing structure: Modal verbs, separable verbs, and present perfect (haben/sein + participle).",
      phase2LockedDesc: "Complete Phase 1 to unlock the Sentence Bracket mission.",
      phase3RadarTitle: "Phase 3: 21-Day Real-Life Radar (D/A/CH Survival)",
      phase3RadarDesc: "On-site survival: Deutsche Bahn ticket validation, bakery counter orders, fast supermarket checkouts, and tipping.",
      phase3LockedDesc: "Complete Phase 2 to unlock the Real-Life Radar.",
      phase4KompositaTitle: "Phase 4: Compound Words & Signs (Komposita)",
      phase4KompositaDesc: "Split long compound nouns in 1 second (SEV, Entwerter) and decode warning/contract signs (Kartenzahlung ab 10€, Außer Betrieb).",
      phase4LockedDesc: "Complete Phase 3 to unlock Compound Word Scanning.",
      examTitle: "Final 30-Question Stress Test (Final Exam)",
      examDesc: "The ultimate 12-week assessment: 10 audio scans, 10 V2 transformations, and 10 real-life transaction reflexes.",
      examLockedTitle: "Final Exam Locked (Final Exam)",
      examLockedDesc: "Complete all phases entirely to unlock the Final Exam."
    },
    jpn: {
      phase1PhonetikTitle: "フェーズ 1: 発音矯正＆調音筋トレ (Phonetik)",
      phase1PhonetikDesc: "脱カタカナ発音。ウムラウト（Ä, Ö, Ü）・声門閉鎖音・語末子音停止の物理トレーニング。",
      phase1V2Title: "フェーズ 1: 定動詞第2位コード (V2-Regel)",
      phase1V2Desc: "SOV語順の解体。動詞が第2スロットを死守する文構造と時間・場所の倒置構文スライド。",
      signalTitle: "6大シグナル・パーツ (Signal-Code)",
      signalDesc: "格変化表の完全撤廃：ZUM/ZUR, MIT, IM, EINEN, VON...BIS, BITTE",
      signalLockedDesc: "フェーズ1を完了してシグナル・パーツをアンロック",
      phase2KlammerTitle: "フェーズ 2: 枠構造フロー (Satzklammer)",
      phase2KlammerDesc: "文末ハサミ撃ち構造の自動化：話法助動詞・分離動詞・現在完了（haben/sein＋過去分詞）。",
      phase2LockedDesc: "フェーズ1を完了して枠構造ミッションをアンロック",
      phase3RadarTitle: "フェーズ 3: 21日間実戦レーダー (D/A/CH Survival)",
      phase3RadarDesc: "現地サバイバル：ドイツ鉄道の信用乗車と打刻、パン屋対面注文、スーパー高速レジ、外食チップ会計。",
      phase3LockedDesc: "フェーズ2を完了して実戦レーダーをアンロック",
      phase4KompositaTitle: "フェーズ 4: 複合語・標識スピードスキャン (Komposita)",
      phase4KompositaDesc: "長大複合名詞の1秒解体（SEV、Entwerter）と契約・警告標識（Kartenzahlung ab 10€、Außer Betrieb）。",
      phase4LockedDesc: "フェーズ3を完了して複合語スキャンをアンロック",
      examTitle: "最終30問ストレステスト (Final Exam)",
      examDesc: "全12週間の総括判定：音響スキャン10問・V2構文変形10問・現場トランザクション即応10問。",
      examLockedTitle: "最終試験ロック中 (Final Exam)",
      examLockedDesc: "全フェーズを完全にクリアして最終試験をアンロック"
    },
    de: {
      phase1PhonetikTitle: "Phase 1: Lautbildung & Phonetik",
      phase1PhonetikDesc: "Physisches Aussprachetraining: Umlaute (Ä, Ö, Ü), Knacklaut und Auslautverhärtung sauber meistern.",
      phase1V2Title: "Phase 1: Verb-Zweit-Code (V2-Regel)",
      phase1V2Desc: "Satzstruktur knacken: Das Verb verteidigt Position 2 – inklusive Zeit- und Orts-Inversion.",
      signalTitle: "Die 6 Signal-Bausteine (Signal-Code)",
      signalDesc: "Schluss mit Deklinationstabellen: ZUM/ZUR, MIT, IM, EINEN, VON...BIS, BITTE",
      signalLockedDesc: "Schließe Phase 1 komplett ab, um die Signal-Bausteine freizuschalten.",
      phase2KlammerTitle: "Phase 2: Satzklammer-Flow (Satzklammer)",
      phase2KlammerDesc: "Automatisiere die deutsche Satzklammer: Modalverben, trennbare Verben und Perfekt (haben/sein + Partizip).",
      phase2LockedDesc: "Schließe Phase 1 ab, um die Satzklammer-Mission freizuschalten.",
      phase3RadarTitle: "Phase 3: 21-Tage Praxis-Radar (D/A/CH Survival)",
      phase3RadarDesc: "Alltags-Survival: DB-Ticketentwertung, Bäckerei-Bestellung, Supermarkt-Kasse und Trinkgeld im Restaurant.",
      phase3LockedDesc: "Schließe Phase 2 ab, um das Praxis-Radar freizuschalten.",
      phase4KompositaTitle: "Phase 4: Komposita & Schilder-Scan (Komposita)",
      phase4KompositaDesc: "Lange zusammengesetzte Nomen in 1 Sekunde zerlegen (SEV, Entwerter) und Hinweisschilder sofort verstehen.",
      phase4LockedDesc: "Schließe Phase 3 ab, um den Komposita-Scan freizuschalten.",
      examTitle: "Finale 30-Fragen-Prüfung (Final Exam)",
      examDesc: "Der 12-Wochen-Stresstest: 10x Audio-Scan, 10x V2-Satzbau und 10x Alltags-Reaktion.",
      examLockedTitle: "Prüfung Gesperrt (Final Exam)",
      examLockedDesc: "Schließe alle Phasen komplett ab, um die Abschlussprüfung freizuschalten."
    }
  };

  const deTexts = texts[currentLang] || texts.en;

  return (
    <>
      {/* PHASE 1: LAUTBILDUNG & PHONETIK */}
      <button 
        onClick={() => onSelectMode('de-phonetik')} 
        className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all group text-left relative overflow-hidden"
      >
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
            {deTexts.phase1PhonetikTitle}
          </h2>
          <span className="text-green-500 text-sm font-bold">{t.day} {kanaReadDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          {deTexts.phase1PhonetikDesc}
        </p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-green-500 h-full transition-all duration-500" 
            style={{ width: `${(kanaReadDay / 14) * 100}%` }}
          ></div>
        </div>
      </button>

      {/* PHASE 1: VERB-ZWEIT-CODE */}
      <button 
        onClick={() => onSelectMode('de-v2')} 
        className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group text-left relative overflow-hidden"
      >
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {deTexts.phase1V2Title}
          </h2>
          <span className="text-blue-500 text-sm font-bold">{t.day} {kanaWriteDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          {deTexts.phase1V2Desc}
        </p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-500" 
            style={{ width: `${(kanaWriteDay / 14) * 100}%` }}
          ></div>
        </div>
      </button>

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* SIGNAL-BAUSTEINE SPECIAL CRASHKURS */}
      {isSignalUnlocked ? (
        <button 
          onClick={() => onSelectMode('de-signals')} 
          className="w-full bg-gray-900 p-5 rounded-2xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-400 transition-all group text-left relative overflow-hidden flex items-center justify-between active:scale-95"
        >
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <div>
            <h2 className="text-xl font-extrabold text-orange-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <span>🔑</span> {deTexts.signalTitle}
            </h2>
            <p className="text-gray-400 text-sm italic">
              {deTexts.signalDesc}
            </p>
          </div>
          <div className="text-orange-500/50 group-hover:text-orange-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-5 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <h2 className="text-xl font-extrabold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <span>🔒</span> {deTexts.signalTitle}
          </h2>
          <p className="text-gray-500 text-sm italic">
            {deTexts.signalLockedDesc}
          </p>
        </div>
      )}

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* PHASE 2: VERB-KLAMMER & SATZKLAMMER */}
      {isPhase2Unlocked ? (
        <button 
          onClick={() => onSelectMode('de-klammer')} 
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {deTexts.phase2KlammerTitle}
            </h2>
            <span className="text-cyan-500 text-sm font-bold">{t.day} {readingDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {deTexts.phase2KlammerDesc}
          </p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-500 h-full transition-all duration-500" 
              style={{ width: `${(readingDay / 21) * 100}%` }}
            ></div>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {deTexts.phase2KlammerTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">
            {deTexts.phase2LockedDesc}
          </p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      {/* PHASE 3: 21-TAGE D/A/CH-SURVIVAL */}
      {isPhase3Unlocked ? (
        <button 
          onClick={() => onSelectMode('de-radar')} 
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              {deTexts.phase3RadarTitle}
            </h2>
            <span className="text-yellow-500 text-sm font-bold">{t.day} {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {deTexts.phase3RadarDesc}
          </p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-yellow-500 h-full transition-all duration-500" 
              style={{ width: `${(radarDay / 21) * 100}%` }}
            ></div>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {deTexts.phase3RadarTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">
            {deTexts.phase3LockedDesc}
          </p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      {/* PHASE 4: KOMPOSITA-SPEED-SCAN */}
      {isPhase4Unlocked ? (
        <button 
          onClick={() => onSelectMode('de-komposita')} 
          className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group text-left relative overflow-hidden"
        >
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {deTexts.phase4KompositaTitle}
            </h2>
            <span className="text-purple-500 text-sm font-bold">{t.day} {kanjiDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {deTexts.phase4KompositaDesc}
          </p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-purple-500 h-full transition-all duration-500" 
              style={{ width: `${(kanjiDay / 21) * 100}%` }}
            ></div>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {deTexts.phase4KompositaTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">
            {deTexts.phase4LockedDesc}
          </p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
      </div>

      {/* ABSCHLUSSPRÜFUNG: 30-FRAGEN-STRESSTEST */}
      {isExamUnlocked ? (
        <button 
          onClick={() => onSelectMode('final-exam-de')} 
          className="w-full bg-red-900/40 p-6 rounded-2xl border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:border-red-400 transition-all group text-left relative overflow-hidden flex flex-col justify-center active:scale-95"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-all"></div>
          <h2 className="text-2xl font-extrabold text-red-400 tracking-widest uppercase mb-2 flex items-center gap-3">
            <span>🎓</span> {deTexts.examTitle}
          </h2>
          <p className="text-gray-300 text-sm italic">
            {deTexts.examDesc}
          </p>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <h2 className="text-xl font-extrabold text-gray-500 tracking-widest uppercase mb-2 flex items-center gap-3">
            <span>🔒</span> {deTexts.examLockedTitle}
          </h2>
          <p className="text-gray-500 text-sm italic">
            {deTexts.examLockedDesc}
          </p>
        </div>
      )}
    </>
  );
};

export default HomeDE;