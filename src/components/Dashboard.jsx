import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { radarMissions } from '../data/vocabData';
import { deRadarData } from '../data/deRadarData';

const Dashboard = ({ currentDay, onStartDay, onBackToHome, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';
  const isDeOrEnTarget = isGermanTarget || isEnglishTarget;

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const currentLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'phase3';

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

    const fetchDashboardData = async () => {
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
        console.error("Fehler beim Laden der Phase-3-Dashboard-Daten aus Supabase:", err);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  // LOKALES FALLBACK-WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "D/A/CH RADAR" : (isEnglishTarget ? "UK SURVIVAL RADAR" : "RADAR SYSTEM"),
      subtitle: isGermanTarget ? "Überlebens-Training D/A/CH:" : (isEnglishTarget ? "Überlebens-Training UK:" : "Überlebens-Training:"),
      dayLabel: "Tag",
      of: "von",
      briefingTitle: isDeOrEnTarget ? "System-Einweisung: Die 3-Sekunden-Reaktion" : "System-Einweisung: Die eiserne Struktur",
      routineEveningTitle: isDeOrEnTarget ? "🌙 Abend-Routine (20 Min)" : "🌙 Abend-Routine (30 Min)",
      routineEveningDesc: isGermanTarget 
        ? "Akustische und visuelle Einspeisung der deutschen Realtransaktion. Trainiere die Satzmuster, bis die Signal-Bausteine ohne Nachdenken abrufbar sind." 
        : (isEnglishTarget
            ? "Akustische und visuelle Einspeisung realer britischer Alltagsszenarien. Trainiere die Satzmuster, bis die höflichen Signal-Chunks reflexartig sitzen."
            : "Ungeteilte Konzentration am Schreibtisch. Visuelle, kognitive und motorische Verankerung der Muster."),
      routineMorningTitle: isDeOrEnTarget ? "☀️ Morgen-Routine (10 Min)" : "☀️ Morgen-Routine (15 Min)",
      routineMorningDesc: isGermanTarget 
        ? "Kaltstart-Transfer in den Alltag. Sprich die deutschen Reaktionen laut vor dich hin, als stündest du direkt am Schalter oder an der Kasse." 
        : (isEnglishTarget
            ? "Kaltstart-Transfer in die Praxis. Sprich die britischen Reaktionen laut vor dich hin, als stündest du direkt in London am Schalter oder im Pub."
            : "Transfer in die Realität. Sie trainieren im Gehen, Handeln und Denken."),
      ruleLabel: isDeOrEnTarget ? "Eiserne Regel:" : "Regel:",
      ruleDesc: isGermanTarget 
        ? "Keine grammatikalischen Tabellenberechnungen im Kopf. Bei Kontrollen, Kassen und Notfällen zählt nur die sofortige Artikulation des Signal-Chunks." 
        : (isEnglishTarget
            ? "Kein wörtliches Übersetzen aus dem Deutschen. Nutze im UK-Alltag sofort die authentischen britischen Höflichkeits- und Reaktions-Chunks."
            : "Kein Zurückgreifen auf Romaji. Sie arbeiten ausschließlich mit japanischen Kana und der deutschen Bedeutung."),
      missionHeader: "Tages-Mission: Tag",
      missionComplete: isGermanTarget 
        ? "Radar-Einsatztraining erfolgreich abgeschlossen! Du beherrschst alle 21 realen Alltagstransaktionen in D/A/CH." 
        : (isEnglishTarget
            ? "UK-Radar-Training erfolgreich abgeschlossen! Du beherrschst alle 21 realen Alltagstransaktionen in Großbritannien."
            : "System erfolgreich abgeschlossen! Du bist bereit für Japan."),
      emergencyBtn: isGermanTarget ? "NOTFALL-SCAN: 112 / NOTRUF / ENTWERTEN" : (isEnglishTarget ? "NOTFALL-SCAN: 999 / NHS 111 / TUBE & RAIL" : "NOTFALL-SCAN: トイレ / えき")
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "D/A/CH RADAR" : (isEnglishTarget ? "UK SURVIVAL RADAR" : "RADAR SYSTEM"),
      subtitle: isGermanTarget ? "Survival Training D/A/CH:" : (isEnglishTarget ? "Survival Training UK:" : "Survival Training:"),
      dayLabel: "Day",
      of: "of",
      briefingTitle: isDeOrEnTarget ? "System Briefing: The 3-Second Reflex" : "System Briefing: The Strict Routine",
      routineEveningTitle: isDeOrEnTarget ? "🌙 Evening Routine (20 Min)" : "🌙 Evening Routine (30 Min)",
      routineEveningDesc: isGermanTarget 
        ? "Auditory and visual ingestion of real-world German transactions. Drill sentence chunks until they fire automatically." 
        : (isEnglishTarget
            ? "Auditory and visual ingestion of real-world British transactions. Drill polite sentence chunks until they fire automatically."
            : "Undivided desk focus. Visual, cognitive, and motor consolidation of patterns."),
      routineMorningTitle: isDeOrEnTarget ? "☀️ Morning Routine (10 Min)" : "☀️ Morning Routine (15 Min)",
      routineMorningDesc: isGermanTarget 
        ? "Cold-start transfer into reality. Speak the German chunks aloud as if facing a ticket inspector or cashier." 
        : (isEnglishTarget
            ? "Cold-start transfer into reality. Speak the British chunks aloud as if facing a station staff member, GP receptionist, or bartender."
            : "Transfer to reality. Train while walking, acting, and thinking."),
      ruleLabel: isDeOrEnTarget ? "Iron Rule:" : "Rule:",
      ruleDesc: isGermanTarget 
        ? "Zero mental declension calculations. In DB trains, supermarkets, and emergencies, only immediate chunk articulation counts." 
        : (isEnglishTarget
            ? "Zero hesitation. In the Tube, pharmacies, and emergencies, only immediate idiomatic British chunk articulation counts."
            : "No reliance on Romaji. Work exclusively with Japanese Kana and the target meaning."),
      missionHeader: "Daily Mission: Day",
      missionComplete: isGermanTarget 
        ? "Radar training completed! You master all 21 real-world daily survival scenarios in Germany, Austria, and Switzerland." 
        : (isEnglishTarget
            ? "UK Radar training completed! You master all 21 real-world daily survival scenarios in the United Kingdom."
            : "System successfully completed! You are ready for Japan."),
      emergencyBtn: isGermanTarget ? "EMERGENCY SCAN: 112 / POLICE / VALIDATION" : (isEnglishTarget ? "EMERGENCY SCAN: 999 / NHS 111 / TUBE & RAIL" : "EMERGENCY SCAN: Toilet / Station")
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "実戦D/A/CHレーダー" : (isEnglishTarget ? "実戦UKサバイバルレーダー" : "レーダーシステム"),
      subtitle: isGermanTarget ? "21日間日常実戦サバイバル:" : (isEnglishTarget ? "21日間イギリス日常実戦サバイバル:" : "サバイバルトレーニング:"),
      dayLabel: "日目",
      of: "/",
      briefingTitle: isDeOrEnTarget ? "システム解説: 3秒即応反射ルール" : "システム解説: 鉄のルーティン",
      routineEveningTitle: isDeOrEnTarget ? "🌙 夜のルーティン (20分)" : "🌙 夜のルーティン (30分)",
      routineEveningDesc: isGermanTarget 
        ? "現地リアル・トランザクションの音響・視覚インプット。シグナル結合パーツが反射的に出るまで口頭反復。" 
        : (isEnglishTarget
            ? "現地イギリスのリアル・トランザクションの音響・視覚インプット。丁寧なシグナル表現が反射的に出るまで口頭反復。"
            : "机上での集中演習。視覚・認知・運動神経によるパターンの完全定着。"),
      routineMorningTitle: isDeOrEnTarget ? "☀️ 朝のルーティン (10分)" : "☀️ 朝のルーティン (15分)",
      routineMorningDesc: isGermanTarget 
        ? "現実へのコールドスタート。駅窓口やスーパーレジに立っている想定で、ドイツ語文を声に出して射出する。" 
        : (isEnglishTarget
            ? "現実へのコールドスタート。ロンドンの駅窓口やパブ、薬局に立っている想定で、イギリス英語チャンクを声に出して射出する。"
            : "現実空間での思考・歩行・行動を伴うトランスファートレーニング。"),
      ruleLabel: isDeOrEnTarget ? "鉄則:" : "ルール:",
      ruleDesc: isGermanTarget 
        ? "頭の中で格変化表を計算することを禁止する。検札・レジ・緊急事態ではシグナル塊の即時射出のみが身を救う。" 
        : (isEnglishTarget
            ? "頭の中で直訳文を組み立てることを禁止する。地下鉄・レジ・緊急事態ではイギリス英語チャンクの即時射出のみが身を救う。"
            : "ローマ字に頼らないこと。日本語の仮名とターゲット意味だけで直接思考する。"),
      missionHeader: "本日のミッション: 第",
      missionComplete: isGermanTarget 
        ? "レーダートレーニング完全完了！ドイツ・オーストリア・スイスの21大現場サバイバルを完全に制覇しました。" 
        : (isEnglishTarget
            ? "UKレーダートレーニング完全完了！イギリスの21大現場サバイバルを完全に制覇しました。"
            : "システム完了！日本で生き残る準備が整いました。"),
      emergencyBtn: isGermanTarget ? "緊急スキャン: 112 / 警察 / 打刻機" : (isEnglishTarget ? "緊急スキャン: 999 / NHS 111 / 鉄道・地下鉄" : "緊急スキャン: トイレ / 駅")
    }
  };

  const fallbackT = texts[currentLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    dayLabel: dbUiTexts?.day || fallbackT.dayLabel,
    of: dbUiTexts?.of || fallbackT.of,
    missionHeader: dbUiTexts?.missionHeader || fallbackT.missionHeader,
    title: dbCourseManifest?.deck3Title || fallbackT.title,
    subtitle: dbCourseManifest?.deck3Subtitle || fallbackT.subtitle,
    briefingTitle: dbCourseManifest?.deck3BriefingTitle || fallbackT.briefingTitle,
    routineEveningTitle: dbCourseManifest?.deck3RoutineEveningTitle || fallbackT.routineEveningTitle,
    routineEveningDesc: dbCourseManifest?.deck3RoutineEveningDesc || fallbackT.routineEveningDesc,
    routineMorningTitle: dbCourseManifest?.deck3RoutineMorningTitle || fallbackT.routineMorningTitle,
    routineMorningDesc: dbCourseManifest?.deck3RoutineMorningDesc || fallbackT.routineMorningDesc,
    ruleLabel: dbCourseManifest?.deck3RuleLabel || fallbackT.ruleLabel,
    ruleDesc: dbCourseManifest?.deck3RuleDesc || fallbackT.ruleDesc,
    missionComplete: dbCourseManifest?.deck3MissionComplete || fallbackT.missionComplete,
    emergencyBtn: dbCourseManifest?.deck3EmergencyBtn || fallbackT.emergencyBtn
  };

  // Ermittlung der aktuellen Tages-Mission je nach Zielsprache (Vorrang für Supabase course_decks)
  let currentMissionText = t.missionComplete;
  if (currentDay <= 21) {
    const dbDayContent = dbDecksMap?.[currentDay];
    if (dbDayContent?.mission) {
      currentMissionText = dbDayContent.mission;
    } else if (dbDayContent?.title && dbDayContent?.scenario) {
      currentMissionText = `${dbDayContent.title} — ${dbDayContent.scenario}`;
    } else if (dbDayContent?.title) {
      currentMissionText = dbDayContent.title;
    } else if (isDeOrEnTarget) {
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