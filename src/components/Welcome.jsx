import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Welcome = ({ onStart, language }) => {
  const [showRegModal, setShowRegModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dojoCount, setDojoCount] = useState(7); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDojoCount = async () => {
      const { count, error } = await supabase
        .from('dojo_registrations')
        .select('*', { count: 'exact', head: true });
        
      if (!error && count !== null) {
        setDojoCount(7 + count); 
      }
    };

    fetchDojoCount();
  }, []);

  const texts = {
    de: {
      title: "RADAR",
      subtitle: "Nippon Survival System",
      heading: "Willkommen beim Nippon Survival Training!",
      para1: "Konnichiwa! Auf meinen eigenen Reisen habe ich schnell gemerkt: Echtes Japanisch auf der Straße funktioniert nicht wie im Lehrbuch. Wenn du in Tokio an der Kasse stehst, hast du keine Zeit für Grammatikregeln. Du musst blitzschnell reagieren. Genau dafür ist dieses System!",
      romajiTitle: "Warum absolut kein Romaji?",
      romajiText: "Romaji (die lateinische Umschrift) ist eine Falle! Dein Gehirn ist faul und liest unbewusst Deutsch. Wir reißen dieses Pflaster sofort ab. Es wird anfangs hart, aber nur so lernst du, japanische Wortbilder als Ganzes zu erfassen.",
      foundationTitle: "Dein Fundament",
      foundationText: "Wir starten mit Hiragana (für Grammatik) und Katakana (für englische Lehnwörter). Später kommen die chinesischen Kanji dazu. Du musst sie nicht zwingend schreiben können, aber sie zu erkennen, ist vor Ort ein absoluter Gamechanger!",
      dojoTitle: "Das Ziel: Das Live Dojo!",
      dojoText: "Trainiere hier in der App deine Reflexe. Sobald die Basics sitzen, wartet der ultimative Stresstest auf dich: Trage dich für unser Live Dojo (Gruppen-Training) ein! In interaktiven Videocalls wenden wir das Erlernte live an.",
      dojoBtn: "Jetzt fürs Live Dojo eintragen",
      outro: "Mach dich bereit, bleib eisern und vertrau dem Prozess. Viel Erfolg! Dein Jens",
      startBtn: "⛩️ ZUM HAUPTMENÜ",

      // Modal Texte
      regTitle: "Dojo Registrierung",
      regSubtitle: "Trage dich für das Live-Training ein.",
      fName: "Vorname",
      lName: "Nachname",
      phone: "Telefonnummer",
      email: "E-Mail-Adresse",
      submitBtn: "Verbindlich Anmelden",
      cancelBtn: "Abbrechen",
      successTitle: "Erfolgreich registriert!",
      successText: "Du erhältst in Kürze eine E-Mail mit weiteren Informationen von uns.",
      closeBtn: "Schließen",
      counterText: "Teilnehmer angemeldet"
    },
    en: {
      title: "RADAR",
      subtitle: "Nippon Survival System",
      heading: "Welcome to Nippon Survival Training!",
      para1: "Konnichiwa! On my own travels, I quickly realized: Real Japanese on the street doesn't work like in a textbook. When you're at a cash register in Tokyo, you don't have time for grammar rules. You have to react in a flash. That's exactly what this system is for!",
      romajiTitle: "Why absolutely no Romaji?",
      romajiText: "Romaji (the Latin alphabet) is a trap! Your brain is lazy and unconsciously reads English. We're ripping this band-aid off immediately. It will be tough at first, but it's the only way to learn to grasp Japanese word images as a whole.",
      foundationTitle: "Your Foundation",
      foundationText: "We start with Hiragana (for grammar) and Katakana (for English loanwords). Later, Chinese Kanji will be added. You don't necessarily have to be able to write them, but recognizing them is an absolute game-changer on site!",
      dojoTitle: "The Goal: The Live Dojo!",
      dojoText: "Train your reflexes here in the app. Once you have the basics down, the ultimate stress test awaits you: Sign up for our Live Dojo (group training)! In interactive video calls, we apply what we've learned live.",
      dojoBtn: "Register for Live Dojo now",
      outro: "Get ready, stay disciplined, and trust the process. Good luck! Yours, Jens",
      startBtn: "⛩️ TO MAIN MENU",

      // Modal Texts
      regTitle: "Dojo Registration",
      regSubtitle: "Sign up for the live training.",
      fName: "First Name",
      lName: "Last Name",
      phone: "Phone Number",
      email: "Email Address",
      submitBtn: "Confirm Registration",
      cancelBtn: "Cancel",
      successTitle: "Registration successful!",
      successText: "You will receive an email with further information shortly.",
      closeBtn: "Close",
      counterText: "participants registered"
    }
  };

  const t = texts[language] || texts.de;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('dojo_registrations')
      .insert([
        { 
          first_name: formData.firstName, 
          last_name: formData.lastName, 
          phone: formData.phone, 
          email: formData.email 
        }
      ]);

    if (error) {
      console.error("Datenbank-Fehler:", error);
      alert("Es gab ein Problem bei der Übertragung. Bitte versuche es noch einmal.");
      return; 
    }

    const WEBHOOK_URL = "https://hook.eu1.make.com/wmaxaao1iy2shoyk09mx6r2nyrv6awwt"; 
    
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (webhookError) {
      console.error("Webhook Error:", webhookError);
    }

    setDojoCount(prev => prev + 1);
    setIsSubmitted(true);
  };

  const closeRegistration = () => {
    setShowRegModal(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
    }, 300);
  };

  return (
    <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 sm:p-8 text-white min-h-screen overflow-y-auto scrollbar-hide">
      
      <div className="mt-12 mb-8 flex flex-col items-center animate-fade-in text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase mb-8">
          {t.subtitle}
        </p>
      </div>

      <div className="w-full max-w-lg bg-gray-800 rounded-3xl p-6 sm:p-10 border border-gray-700 shadow-2xl animate-fade-in mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center leading-snug">
          {t.heading}
        </h2>
        
        <div className="space-y-8 text-gray-300 text-sm sm:text-base leading-relaxed">
          <p>{t.para1}</p>

          <div>
            <h3 className="font-bold text-red-400 mb-2 uppercase tracking-wide">{t.romajiTitle}</h3>
            <p className="border-l-2 border-red-500/50 pl-3">{t.romajiText}</p>
          </div>

          <div>
            <h3 className="font-bold text-blue-400 mb-2 uppercase tracking-wide">{t.foundationTitle}</h3>
            <p className="border-l-2 border-blue-500/50 pl-3">{t.foundationText}</p>
          </div>

          <div className="bg-pink-900/20 p-5 rounded-2xl border border-pink-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 blur-xl rounded-full"></div>
            <h3 className="font-bold text-pink-400 mb-2 uppercase tracking-wide relative z-10 flex items-center gap-2">
              <span>🔥</span> {t.dojoTitle}
            </h3>
            <p className="mb-5 relative z-10">{t.dojoText}</p>
            <button 
              onClick={() => setShowRegModal(true)}
              className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest relative z-10 text-xs sm:text-sm"
            >
              {t.dojoBtn}
            </button>
          </div>

          <p className="text-center italic text-gray-400 pt-4">
            {t.outro}
          </p>
        </div>
      </div>

      <button 
        onClick={onStart} 
        className="w-full max-w-sm py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-green-500/20 active:scale-95 transition-all mb-12 animate-fade-in"
      >
        {t.startBtn}
      </button>

      {/* REGISTRATION MODAL */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-gray-800 rounded-3xl border border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.2)] overflow-hidden flex flex-col">
            
            <div className="p-6 bg-gray-900 border-b border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold tracking-widest uppercase text-pink-400">{t.regTitle}</h2>
                <p className="text-gray-400 text-xs mt-1">{t.regSubtitle}</p>
                
                <div className="mt-3 inline-block bg-pink-900/40 border border-pink-500/30 text-pink-300 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
                  🔥 Bereits {dojoCount} {t.counterText}!
                </div>
              </div>
              {!isSubmitted && <button onClick={closeRegistration} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>}
            </div>
            
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.fName}</label>
                      <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.lName}</label>
                      <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.phone}</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.email}</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="button" onClick={closeRegistration} className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white uppercase tracking-widest text-xs transition-colors">{t.cancelBtn}</button>
                    <button type="submit" className="flex-[2] py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl font-bold text-white uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all">{t.submitBtn}</button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-pink-900/30 border-2 border-pink-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(236,72,153,0.4)]">✓</div>
                  <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
                  <p className="text-gray-400 mb-8">{t.successText}</p>
                  <button onClick={closeRegistration} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white uppercase tracking-widest transition-all active:scale-95">{t.closeBtn}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Welcome;