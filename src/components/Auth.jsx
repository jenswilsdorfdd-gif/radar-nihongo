import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = ({ onLoginSuccess, language }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const texts = {
    de: {
      title: "RADAR Lernplattform",
      subtitle: "System-Zugang",
      desc: "Gib deine E-Mail-Adresse ein. Diese Anmeldeform dient dazu, deinen Lernfortschritt sicher in der Cloud zu erfassen. So kannst du das System jederzeit verlassen und später exakt an deinem letzten Speicherpunkt wieder einsteigen – komplett ohne Passwort.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "deine@email.de",
      btnSend: "Systemzugang anfordern",
      btnLoading: "Sende Daten...",
      successMsg: "Link verschickt! Prüfe dein Postfach (auch Spam).",
      errorMsg: "Es gab ein Problem. Bitte versuche es noch einmal."
    },
    en: {
      title: "RADAR Learning Platform",
      subtitle: "System Access",
      desc: "Enter your email address. This login method is used to securely track your learning progress in the cloud. You can leave the system at any time and return exactly to your last save point later – completely without a password.",
      emailLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      btnSend: "Request System Access",
      btnLoading: "Sending data...",
      successMsg: "Link sent! Check your inbox (and spam folder).",
      errorMsg: "There was a problem. Please try again."
    }
  };

  const t = texts[language] || texts.de;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: {
        // Leitet nach dem Klick in der E-Mail zurück auf deine App
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      setMessage(t.errorMsg);
      console.error("Auth Error:", error);
    } else {
      setMessage(t.successMsg);
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center justify-center p-6 text-white min-h-screen relative animate-fade-in">
      <div className="w-full max-w-sm bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden text-center">
        
        {/* Neues Sonar-Logo mit pulsierendem Effekt */}
        <div className="w-20 h-20 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-green-400 relative z-10">
            {/* Zentraler Punkt */}
            <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
            {/* Innere Wellen */}
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            {/* Äußere Wellen */}
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-extrabold tracking-widest text-white uppercase mb-1">{t.title}</h1>
        <h2 className="text-green-400 text-xs font-bold tracking-widest uppercase mb-6">{t.subtitle}</h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-green-500/50 pl-3 text-left">
          {t.desc}
        </p>

        {message ? (
          <div className={`p-4 rounded-xl mb-6 font-bold text-sm ${message === t.successMsg ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'}`}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col text-left">
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
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all"
            >
              {loading ? t.btnLoading : t.btnSend}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;