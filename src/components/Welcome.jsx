import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Welcome = ({ onStart }) => {
  // 1. Zuerst im LocalStorage nachschauen, ansonsten harter Fallback auf Englisch
  const [sourceLang, setSourceLang] = useState(() => {
    return localStorage.getItem('radar_source_lang') || 'en';
  });
  
  // 2. Zuerst im LocalStorage nachschauen, ansonsten harter Fallback auf Japanisch
  const [targetLang, setTargetLang] = useState(() => {
    return localStorage.getItem('radar_target_lang') || 'jp';
  });

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      onStart(); // Leitet direkt zur App.jsx weiter (Dev-Mode Bypass)
    }
    
    setTimeout(() => setClickCount(0), 2000);
  };

  const texts = {
    de: {
      title: "RADAR Lernsystem",
      subtitle: "System-Zugang",
      intro: "Wähle dein Profil und gib deine E-Mail-Adresse ein, um deinen Lernfortschritt sicher in der Cloud zu speichern – komplett ohne Passwort.",
      targetLabel: "Ich möchte lernen (Target):",
      sourceLabel: "Meine Ausgangssprache (Base):",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "deine@email.de",
      btnStart: "System betreten",
      btnLoading: "Sende Daten...",
      successMsg: "Link verschickt! Prüfe dein Postfach (auch Spam).",
      errorMsg: "Es gab ein Problem. Bitte versuche es noch einmal.",
      langs: { jp: "Japanisch (Japanese)", de: "Deutsch (German)", en: "Englisch (English)" }
    },
    en: {
      title: "RADAR Learning System",
      subtitle: "System Access",
      intro: "Choose your profile and enter your email to securely track your learning progress in the cloud – completely without a password.",
      targetLabel: "I want to learn (Target):",
      sourceLabel: "My base language (Base):",
      emailLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      btnStart: "Enter System",
      btnLoading: "Sending data...",
      successMsg: "Link sent! Check your inbox (and spam folder).",
      errorMsg: "There was a problem. Please try again.",
      langs: { jp: "Japanese", de: "German", en: "English" }
    },
    jpn: {
      title: "RADAR 学習システム",
      subtitle: "システムアクセス",
      intro: "プロフィールを選択し、メールアドレスを入力して、学習の進捗状況をクラウドに安全に保存します。パスワードは完全に不要です。",
      targetLabel: "学びたい言語 (Target):",
      sourceLabel: "出発言語 (Base):",
      emailLabel: "メールアドレス",
      emailPlaceholder: "your@email.com",
      btnStart: "システムに入る",
      btnLoading: "送信中...",
      successMsg: "リンクを送信しました！受信トレイ（迷惑メールも）を確認してください。",
      errorMsg: "問題が発生しました。もう一度お試しください。",
      langs: { jp: "日本語 (Japanese)", de: "ドイツ語 (German)", en: "英語 (English)" }
    }
  };

  // Live-Übersetzung basierend auf der aktuellen Dropdown-Auswahl der Muttersprache
  const activeTextKey = sourceLang === 'jp' ? 'jpn' : sourceLang;
  const t = texts[activeTextKey] || texts.de;

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Zwingend vor dem Login speichern, damit das System sich die Wahl merkt!
    localStorage.setItem('radar_target_lang', targetLang);
    localStorage.setItem('radar_source_lang', sourceLang);

    setLoading(true);
    setMessage('');

    try {
      // Supabase Magic Link
      const supabaseCall = supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });

      // 4-Sekunden-Notbremse (wie vorher)
      const timeoutPromise = new Promise((resolve) => 
        setTimeout(() => resolve({ timeout: true }), 4000)
      );

      const result = await Promise.race([supabaseCall, timeoutPromise]);

      if (result && result.timeout) {
        setMessage(t.successMsg);
      } else if (result.error) {
        setMessage(t.errorMsg);
        console.error("Auth Error:", result.error.message, result.error);
      } else {
        setMessage(t.successMsg);
      }
    } catch (err) {
      setMessage(t.errorMsg);
      console.error("Unexpected Auth Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Flaggen-Helfer
  const getFlagUrl = (langCode) => {
    switch(langCode) {
      case 'jp': return "https://flagcdn.com/w40/jp.png";
      case 'de': return "https://flagcdn.com/w40/de.png";
      case 'en': return "https://flagcdn.com/w40/gb.png";
      default: return "";
    }
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-6 sm:p-8 text-white min-h-screen relative overflow-hidden">
      
      <div className="w-full max-w-md bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative text-center animate-fade-in flex flex-col items-center">
        
        {/* Neues schlankes Sonar-Logo mit pulsierendem Effekt */}
        <div className="w-20 h-20 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-green-400 relative z-10">
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

        {message ? (
          <div className={`w-full p-4 rounded-xl mb-6 font-bold text-sm ${message === t.successMsg ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'}`}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="w-full space-y-6 text-left">
            
            {/* 1. QUELLSPRACHE */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t.sourceLabel}</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none">
                  <img src={getFlagUrl(sourceLang)} alt="Flag" className="w-6 rounded-sm shadow-sm" />
                </div>
                <select 
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none py-4 pl-14 pr-10 text-sm appearance-none cursor-pointer"
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

            {/* 2. ZIELSPRACHE */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t.targetLabel}</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 pointer-events-none">
                  <img src={getFlagUrl(targetLang)} alt="Flag" className="w-6 rounded-sm shadow-sm" />
                </div>
                <select 
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none py-4 pl-14 pr-10 text-sm appearance-none cursor-pointer"
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

            {/* 3. EMAIL FELD */}
            <div className="flex flex-col mt-4">
              <label className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t.emailLabel}</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full bg-gray-900 text-white rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none p-4 text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
            >
              {loading ? t.btnLoading : t.btnStart}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Welcome;