import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = ({ onLoginSuccess, language }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const texts = {
    de: {
      title: "System-Zugang",
      subtitle: "Identifikation erforderlich",
      desc: "Gib deine E-Mail-Adresse ein. Du erhältst einen abhörsicheren Magic Link, um ohne Passwort ins System zu gelangen.",
      emailLabel: "E-Mail-Adresse",
      emailPlaceholder: "deine@email.de",
      btnSend: "Magic Link anfordern",
      btnLoading: "Sende Daten...",
      successMsg: "Link verschickt! Prüfe dein Postfach (auch Spam).",
      errorMsg: "Es gab ein Problem. Bitte versuche es noch einmal."
    },
    en: {
      title: "System Access",
      subtitle: "Identification required",
      desc: "Enter your email address. You will receive a secure Magic Link to enter the system without a password.",
      emailLabel: "Email Address",
      emailPlaceholder: "your@email.com",
      btnSend: "Request Magic Link",
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
        <div className="w-20 h-20 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6 mx-auto">
          <span className="text-4xl">⛩️</span>
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