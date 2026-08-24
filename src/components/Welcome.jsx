import React, { useState } from 'react';

const Welcome = ({ onStart, language }) => {
  // Als Default für die Quellsprache nehmen wir die aktuelle UI-Sprache
  const [sourceLang, setSourceLang] = useState(language === 'jpn' ? 'jp' : language || 'de');
  const [targetLang, setTargetLang] = useState('jp');

  // --- GOD MODE TRIGGER ---
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      // Sprachen beim Dev Mode Bypass ebenfalls im LocalStorage sichern
      localStorage.setItem('radar_target_lang', targetLang);
      localStorage.setItem('radar_source_lang', sourceLang);
      
      localStorage.setItem('radarDevMode', 'true');
      setClickCount(0);
      onStart(); // Leitet direkt zur App.jsx weiter
    }
    
    setTimeout(() => setClickCount(0), 2000);
  };

  const texts = {
    de: {
      title: "RADAR Lernsystem",
      subtitle: "Willkommen",
      intro: "RADAR ist ein bidirektionales System, das dich blitzschnell auf echte Konversationen vorbereitet. Wähle nun dein Lernprofil aus, um deinen persönlichen Bereich einzurichten.",
      targetLabel: "Ich möchte lernen:",
      sourceLabel: "Meine Ausgangssprache ist:",
      btnStart: "System betreten",
      langs: { jp: "Japanisch", de: "Deutsch", en: "Englisch" }
    },
    en: {
      title: "RADAR Learning System",
      subtitle: "Welcome",
      intro: "RADAR is a bidirectional system designed to prepare you for real conversations at lightning speed. Select your learning profile now to set up your personal space.",
      targetLabel: "I want to learn:",
      sourceLabel: "My base language is:",
      btnStart: "Enter System",
      langs: { jp: "Japanese", de: "German", en: "English" }
    },
    jpn: {
      title: "RADAR 学習システム",
      subtitle: "ようこそ",
      intro: "RADARは、実際の会話に瞬時に対応できるよう設計された双方向システムです。学習プロフィールを選択して、パーソナルスペースを設定してください。",
      targetLabel: "学びたい言語:",
      sourceLabel: "出発言語 (母国語):",
      btnStart: "システムに入る",
      langs: { jp: "日本語", de: "ドイツ語", en: "英語" }
    }
  };

  // Live-Übersetzung basierend auf der aktuellen Dropdown-Auswahl der Muttersprache
  const activeTextKey = sourceLang === 'jp' ? 'jpn' : sourceLang;
  const t = texts[activeTextKey] || texts.de;

  const handleEnter = () => {
    // Auswahl im Browser zwischenspeichern, um den Magic-Link-Reload zu überleben
    localStorage.setItem('radar_target_lang', targetLang);
    localStorage.setItem('radar_source_lang', sourceLang);
    onStart(); // Leitet weiter zur Auth.jsx
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-6 sm:p-8 text-white min-h-screen relative overflow-hidden">
      
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative text-center animate-fade-in flex flex-col items-center">
        
        {/* Neues, schlankeres Sonar Logo (Dünne Linien, offenes O) */}
        <div className="w-24 h-24 bg-gray-900 rounded-full border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.1)] mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-green-400">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>

        <h1 
          onClick={handleSecretClick}
          className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2 uppercase cursor-pointer select-none"
        >
          {t.title}
        </h1>
        <h2 className="text-green-400 text-xs font-bold tracking-widest uppercase mb-6">
          {t.subtitle}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {t.intro}
        </p>

        <div className="w-full space-y-6 text-left mb-8">
          
          {/* 1. QUELLSPRACHE (Ausgangssprache) ZUERST */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t.sourceLabel}</label>
            <div className="relative">
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none p-4 text-sm appearance-none cursor-pointer"
              >
                <option value="de">🇩🇪 {t.langs.de}</option>
                <option value="en">🇬🇧 {t.langs.en}</option>
                <option value="jp">🇯🇵 {t.langs.jp}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {/* 2. ZIELSPRACHE ZWEITENS */}
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t.targetLabel}</label>
            <div className="relative">
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none p-4 text-sm appearance-none cursor-pointer"
              >
                <option value="en">🇬🇧 {t.langs.en}</option>
                <option value="de">🇩🇪 {t.langs.de}</option>
                <option value="jp">🇯🇵 {t.langs.jp}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

        </div>

        <button 
          onClick={handleEnter}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 rounded-xl font-bold text-white uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
        >
          {t.btnStart}
        </button>

      </div>
    </div>
  );
};

export default Welcome;