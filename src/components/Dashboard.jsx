import React from 'react';
import { radarMissions } from '../data/vocabData';
import { deRadarData } from '../data/deRadarData';

const Dashboard = ({ currentDay, onStartDay, onBackToHome, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';
  const currentLang = language || 'de';

  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "D/A/CH RADAR" : "RADAR SYSTEM",
      subtitle: isGermanTarget ? "Überlebens-Training D/A/CH:" : "Überlebens-Training:",
      dayLabel: "Tag",
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Die 3-Sekunden-Reaktion" : "System-Einweisung: Die eiserne Struktur",
      routineEveningTitle: isGermanTarget ? "🌙 Abend-Routine (20 Min)" : "🌙 Abend-Routine (30 Min)",
      routineEveningDesc: isGermanTarget 
        ? "Akustische und visuelle Einspeisung der deutschen Realtransaktion. Trainiere die Satzmuster, bis die Signal-Bausteine ohne Nachdenken abrufbar sind." 
        : "Ungeteilte Konzentration am Schreibtisch. Visuelle, kognitive und motorische Verankerung der Muster.",
      routineMorningTitle: isGermanTarget ? "☀️ Morgen-Routine (10 Min)" : "☀️ Morgen-Routine (15 Min)",
      routineMorningDesc: isGermanTarget 
        ? "Kaltstart-Transfer in den Alltag. Sprich die deutschen Reaktionen laut vor dich hin, als stündest du direkt am Schalter oder an der Kasse." 
        : "Transfer in die Realität. Sie trainieren im Gehen, Handeln und Denken.",
      ruleLabel: isGermanTarget ? "Eiserne Regel:" : "Regel:",
      ruleDesc: isGermanTarget 
        ? "Keine grammatikalischen Tabellenberechnungen im Kopf. Bei Kontrollen, Kassen und Notfällen zählt nur die sofortige Artikulation des Signal-Chunks." 
        : "Kein Zurückgreifen auf Romaji. Sie arbeiten ausschließlich mit japanischen Kana und der deutschen Bedeutung.",
      missionHeader: "Tages-Mission: Tag",
      missionComplete: isGermanTarget 
        ? "Radar-Einsatztraining erfolgreich abgeschlossen! Du beherrschst alle 21 realen Alltagstransaktionen in D/A/CH." 
        : "System erfolgreich abgeschlossen! Du bist bereit für Japan.",
      emergencyBtn: isGermanTarget ? "NOTFALL-SCAN: 112 / NOTRUF / ENTWERTEN" : "NOTFALL-SCAN: トイレ / えき"
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "D/A/CH RADAR" : "RADAR SYSTEM",
      subtitle: isGermanTarget ? "Survival Training D/A/CH:" : "Survival Training:",
      dayLabel: "Day",
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: The 3-Second Reflex" : "System Briefing: The Strict Routine",
      routineEveningTitle: isGermanTarget ? "🌙 Evening Routine (20 Min)" : "🌙 Evening Routine (30 Min)",
      routineEveningDesc: isGermanTarget 
        ? "Auditory and visual ingestion of real-world German transactions. Drill sentence chunks until they fire automatically." 
        : "Undivided desk focus. Visual, cognitive, and motor consolidation of patterns.",
      routineMorningTitle: isGermanTarget ? "☀️ Morning Routine (10 Min)" : "☀️ Morning Routine (15 Min)",
      routineMorningDesc: isGermanTarget 
        ? "Cold-start transfer into reality. Speak the German chunks aloud as if facing a ticket inspector or cashier." 
        : "Transfer to reality. Train while walking, acting, and thinking.",
      ruleLabel: isGermanTarget ? "Iron Rule:" : "Rule:",
      ruleDesc: isGermanTarget 
        ? "Zero mental declension calculations. In DB trains, supermarkets, and emergencies, only immediate chunk articulation counts." 
        : "No reliance on Romaji. Work exclusively with Japanese Kana and the target meaning.",
      missionHeader: "Daily Mission: Day",
      missionComplete: isGermanTarget 
        ? "Radar training completed! You master all 21 real-world daily survival scenarios in Germany, Austria, and Switzerland." 
        : "System successfully completed! You are ready for Japan.",
      emergencyBtn: isGermanTarget ? "EMERGENCY SCAN: 112 / POLICE / VALIDATION" : "EMERGENCY SCAN: Toilet / Station"
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "実戦D/A/CHレーダー" : "レーダーシステム",
      subtitle: isGermanTarget ? "21日間日常実戦サバイバル:" : "サバイバルトレーニング:",
      dayLabel: "日目",
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 3秒即応反射ルール" : "システム解説: 鉄のルーティン",
      routineEveningTitle: isGermanTarget ? "🌙 夜のルーティン (20分)" : "🌙 夜のルーティン (30分)",
      routineEveningDesc: isGermanTarget 
        ? "現地リアル・トランザクションの音響・視覚インプット。シグナル結合パーツが反射的に出るまで口頭反復。" 
        : "机上での集中演習。視覚・認知・運動神経によるパターンの完全定着。",
      routineMorningTitle: isGermanTarget ? "☀️ 朝のルーティン (10分)" : "☀️ 朝のルーティン (15分)",
      routineMorningDesc: isGermanTarget 
        ? "現実へのコールドスタート。駅窓口やスーパーレジに立っている想定で、ドイツ語文を声に出して射出する。" 
        : "現実空間での思考・歩行・行動を伴うトランスファートレーニング。",
      ruleLabel: isGermanTarget ? "鉄則:" : "ルール:",
      ruleDesc: isGermanTarget 
        ? "頭の中で格変化表を計算することを禁止する。検札・レジ・緊急事態ではシグナル塊の即時射出のみが身を救う。" 
        : "ローマ字に頼らないこと。日本語の仮名とターゲット意味だけで直接思考する。",
      missionHeader: "本日のミッション: 第",
      missionComplete: isGermanTarget 
        ? "レーダートレーニング完全完了！ドイツ・オーストリア・スイスの21大現場サバイバルを完全に制覇しました。" 
        : "システム完了！日本で生き残る準備が整いました。",
      emergencyBtn: isGermanTarget ? "緊急スキャン: 112 / 警察 / 打刻機" : "緊急スキャン: トイレ / 駅"
    }
  };

  const t = texts[currentLang === 'jpn' ? 'jpn' : (texts[currentLang] ? currentLang : 'de')] || texts.de;

  // Ermittlung der aktuellen Tages-Mission je nach Zielsprache
  let currentMissionText = t.missionComplete;
  if (currentDay <= 21) {
    if (isGermanTarget) {
      const deMission = deRadarData[currentDay];
      currentMissionText = deMission ? `${deMission.title} — ${deMission.scenario}` : t.missionComplete;
    } else {
      currentMissionText = radarMissions[currentDay] || t.missionComplete;
    }
  }

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
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-blue-400">
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {t.subtitle} {t.dayLabel} {currentDay > 21 ? 21 : currentDay} {t.of} 21
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, 21) / 21) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-700 shadow-lg">
        <h2 className="text-blue-400 font-bold mb-4 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <li>
            <strong className="text-white block mb-1">{t.routineEveningTitle}</strong>
            {t.routineEveningDesc}
          </li>
          <li>
            <strong className="text-white block mb-1">{t.routineMorningTitle}</strong>
            {t.routineMorningDesc}
          </li>
          <li className="pt-3 border-t border-gray-700">
            <strong className="text-blue-400">{t.ruleLabel}</strong> {t.ruleDesc}
          </li>
        </ul>
      </div>

      {/* Die tagesaktuelle Mission */}
      {currentDay <= 21 && (
        <div className="w-full max-w-md bg-blue-900/30 rounded-2xl p-5 mb-8 border border-blue-500/30 shadow-lg">
          <h2 className="text-blue-400 font-bold mb-2 tracking-wide uppercase text-sm">
            {t.missionHeader} {currentDay} {currentLang === 'jpn' ? '日目' : ''}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed italic">
            "{currentMissionText}"
          </p>
        </div>
      )}

      {/* Das 21-Tage Raster */}
      <div className="w-full max-w-md grid grid-cols-3 gap-4 mb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={`py-4 rounded-xl font-bold text-lg transition-transform active:scale-95 flex flex-col items-center justify-center
                ${isCurrent ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-blue-400 border border-blue-500/30 cursor-pointer' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span>{t.dayLabel}</span>
              <span>{day}</span>
            </button>
          );
        })}
      </div>

      {/* Permanenter Notfall-Scan Button */}
      <div className="w-full max-w-md mt-auto pb-4">
        <button 
          onClick={() => onStartDay('emergency')}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 active:scale-95 transition-all uppercase tracking-wider text-sm cursor-pointer"
        >
          {t.emergencyBtn}
        </button>
      </div>

    </div>
  );
};

export default Dashboard;