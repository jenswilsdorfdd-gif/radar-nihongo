import React from 'react';

const HomeJP = ({ 
  onSelectMode, 
  kanaReadDay, 
  kanaWriteDay, 
  readingDay, 
  radarDay, 
  kanjiDay, 
  devMode, 
  t 
}) => {
  // LOCK MECHANISMUS (Berücksichtigt den Dev Mode)
  const isParticleUnlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14);
  const isPhase2Unlocked = devMode || (kanaReadDay >= 14 && kanaWriteDay >= 14); 
  const isPhase3Unlocked = devMode || (isPhase2Unlocked && readingDay >= 21);
  const isPhase4Unlocked = devMode || (isPhase3Unlocked && radarDay >= 21);
  const isExamUnlocked = devMode || (isPhase4Unlocked && kanjiDay >= 21);

  return (
    <>
      {/* PHASE 1 (Immer frei) */}
      <button onClick={() => onSelectMode('kana-read')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all group text-left relative overflow-hidden">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{t.phase1ReadTitle}</h2>
          <span className="text-green-500 text-sm font-bold">{t.day} {kanaReadDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{t.phase1ReadDesc}</p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${(kanaReadDay / 14) * 100}%` }}></div></div>
      </button>

      <button onClick={() => onSelectMode('kana-write')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group text-left relative overflow-hidden">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{t.phase1WriteTitle}</h2>
          <span className="text-blue-500 text-sm font-bold">{t.day} {kanaWriteDay}/14</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{t.phase1WriteDesc}</p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(kanaWriteDay / 14) * 100}%` }}></div></div>
      </button>

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* PARTIKEL CRASHKURS BUTTON */}
      {isParticleUnlocked ? (
        <button onClick={() => onSelectMode('particle-crashcourse')} className="w-full bg-gray-900 p-5 rounded-2xl border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:border-orange-400 transition-all group text-left relative overflow-hidden flex items-center justify-between active:scale-95">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
          <div>
            <h2 className="text-xl font-extrabold text-orange-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <span>🔑</span> {t.particleTitle}
            </h2>
            <p className="text-gray-400 text-sm italic">{t.particleDesc}</p>
          </div>
          <div className="text-orange-500/50 group-hover:text-orange-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-5 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <h2 className="text-xl font-extrabold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <span>🔒</span> {t.particleTitle}
          </h2>
          <p className="text-gray-500 text-sm italic">{t.particleLockedDesc}</p>
        </div>
      )}

      <div className="py-2">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* PHASE 2 */}
      {isPhase2Unlocked ? (
        <button onClick={() => onSelectMode('reading')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{t.phase2FlowTitle}</h2>
            <span className="text-cyan-500 text-sm font-bold">{t.scenario} {readingDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase2FlowDesc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(readingDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {t.phase2FlowTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">{t.phase2LockedDesc}</p>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden"></div>
        </div>
      )}

      {/* PHASE 3 */}
      {isPhase3Unlocked ? (
        <button onClick={() => onSelectMode('radar')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{t.phase3Title}</h2>
            <span className="text-yellow-500 text-sm font-bold">{t.day} {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase3Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${(radarDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {t.phase3Title}
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
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{t.phase4Title}</h2>
            <span className="text-purple-500 text-sm font-bold">{t.day} {kanjiDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase4Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(kanjiDay / 21) * 100}%` }}></div></div>
        </button>
      ) : (
        <div className="w-full bg-gray-900/50 p-6 rounded-2xl border-2 border-gray-700 opacity-60 flex flex-col justify-center cursor-not-allowed">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-gray-500 flex items-center gap-2">
              <span>🔒</span> {t.phase4Title}
            </h2>
          </div>
          <p className="text-gray-500 text-sm italic mb-4">{t.phase4LockedDesc}</p>
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

export default HomeJP;