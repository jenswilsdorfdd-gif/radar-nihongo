import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient'; 

const Home = ({ onSelectMode, onReset, onGoToWelcome, kanaReadDay, kanaWriteDay, readingDay, radarDay, kanjiDay, language }) => {
  const containerRef = useRef(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // REGISTRIERUNG & LIVE-COUNTER
  const [showRegModal, setShowRegModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dojoCount, setDojoCount] = useState(7); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  // LOCK MECHANISMUS
  const isParticleUnlocked = kanaReadDay >= 14 && kanaWriteDay >= 14;
  const isExamUnlocked = kanaReadDay >= 14 && kanaWriteDay >= 14 && readingDay >= 21 && radarDay >= 21 && kanjiDay >= 21;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

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
      reset: "Reset",
      info: "Fahrplan",
      subtitle: "Nippon Survival System",
      phase1ReadTitle: "Phase 1: Kana (Lesen)",
      phase1ReadDesc: "Visuelles Zeichentraining. Die absolute Basis für das Gehirn.",
      phase1WriteTitle: "Phase 1: Kana (Schreiben)",
      phase1WriteDesc: "Die Meisterklasse. Präge dir die exakte Linienführung ein.",
      particleTitle: "Der Partikel-Code",
      particleDesc: "Entschlüssele die Matrix.",
      particleLockedDesc: "Schließe Phase 1 komplett ab, um den Partikel-Code freizuschalten.",
      phase2FlowTitle: "Phase 2: Kana Flow",
      phase2FlowDesc: "Brücken-Training zum Radar: Trainiere das flüssige Lesen in 3 Stufen (Alltag, Texte, Dialoge).",
      phase3Title: "Phase 3: 21-Tage-Radar",
      phase3Desc: "Stresstest, Wortschatz und Reaktion für das Überleben im Alltag.",
      phase4Title: "Phase 4: Kanji N5",
      phase4Desc: "Lerne Bedeutung, Lesung und Anwendung komplexer Zeichen.",
      
      // PRÜFUNG TEXTE
      examTitle: "Abschluss-Prüfung",
      examDesc: "Der finale 30-Fragen Stresstest. Beweise, was du gelernt hast.",
      examLockedTitle: "Prüfung Gesperrt",
      examLockedDesc: "Schließe alle Phasen komplett ab, um den finalen Test freizuschalten.",
      
      groupTitle: "Live Dojo: Gruppen-Training",
      groupDesc: "Wende dein Wissen an! Melde dich hier für die interaktiven Live-Übungen an.",
      groupBtn: "Jetzt Registrieren",
      day: "Tag",
      scenario: "Text",
      
      // FAHRPLAN MODAL TEXTE
      modalTitle: "Der 8-Wochen-Fahrplan",
      modalIntro: "Dieses System ist kein klassischer Vokabeltrainer, sondern ein taktisches Trainingslager für den echten Alltag in Japan. Praxis vor Theorie!",
      modalW1Title: "Woche 1 & 2: Das Fundament",
      modalW1Desc: "Täglich 1x Phase 1 (Lesen) und direkt danach Phase 1 (Schreiben). Nach 14 Tagen kannst du Hiragana und Katakana blind.",
      modalW3Title: "Woche 3 bis 5: Der Einsatz",
      modalW3Desc: "Jetzt laufen Phase 2 (Flow) und Phase 3 (Radar) parallel! Starte mit einem Text zum Aufwärmen und absolviere danach den Radar-Einsatz des Tages.",
      modalW6Title: "Woche 6 bis 8: Der Feinschliff",
      modalW6Desc: "Phase 4 (Kanji). Jeden Tag ein neues Deck. Wiederhole nebenbei alte Radar-Einsätze, um deine Reaktionszeit zu pushen.",
      modalCtaTitle: "Ab Woche 8: Das Live Dojo",
      modalCtaDesc: "Wissen allein reicht nicht – du musst es anwenden! Melde dich für unser interaktives Gruppentraining an und trainiere deine Reflexe in echten Gesprächen.",
      modalCtaBtn: "Jetzt fürs Dojo registrieren",
      modalClose: "Verstanden",
      
      // REGISTRIERUNG MODAL TEXTE
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
      reset: "Reset",
      info: "Roadmap",
      subtitle: "Nippon Survival System",
      phase1ReadTitle: "Phase 1: Kana (Read)",
      phase1ReadDesc: "Visual character training. The absolute basis for your brain.",
      phase1WriteTitle: "Phase 1: Kana (Write)",
      phase1WriteDesc: "The masterclass. Memorize the exact stroke order.",
      particleTitle: "The Particle Code",
      particleDesc: "Decode the Matrix.",
      particleLockedDesc: "Complete Phase 1 entirely to unlock the Particle Code.",
      phase2FlowTitle: "Phase 2: Kana Flow",
      phase2FlowDesc: "Radar Bridge Training: Practice fluent reading in 3 levels (Daily, Texts, Dialogues).",
      phase3Title: "Phase 3: 21-Day Radar",
      phase3Desc: "Stress test, vocabulary, and reaction for everyday survival.",
      phase4Title: "Phase 4: Kanji N5",
      phase4Desc: "Learn meaning, reading, and application of complex characters.",
      
      // EXAM TEXTS
      examTitle: "Final Exam",
      examDesc: "The ultimate 30-question stress test. Prove your skills.",
      examLockedTitle: "Exam Locked",
      examLockedDesc: "Complete all phases entirely to unlock the final test.",
      
      groupTitle: "Live Dojo: Group Training",
      groupDesc: "Apply your knowledge! Register here for interactive live exercises.",
      groupBtn: "Register Now",
      day: "Day",
      scenario: "Text",
      
      // ROADMAP MODAL TEXTS
      modalTitle: "The 8-Week Roadmap",
      modalIntro: "This system is not a classic vocabulary trainer, but a tactical boot camp for everyday life in Japan. Practice over theory!",
      modalW1Title: "Week 1 & 2: The Foundation",
      modalW1Desc: "Daily 1x Phase 1 (Read) followed by Phase 1 (Write). After 14 days you will know Hiragana and Katakana blindly.",
      modalW3Title: "Week 3 to 5: The Mission",
      modalW3Desc: "Now Phase 2 (Flow) and Phase 3 (Radar) run in parallel! Start with a text to warm up and then complete the Radar mission of the day.",
      modalW6Title: "Week 6 to 8: The Polish",
      modalW6Desc: "Phase 4 (Kanji). One new deck every day. Repeat old Radar missions on the side to push your reaction time.",
      modalCtaTitle: "Week 8+: The Live Dojo",
      modalCtaDesc: "Knowledge alone isn't enough – you have to apply it! Sign up for our interactive group training and test your reflexes in real conversations.",
      modalCtaBtn: "Register for the Dojo now",
      modalClose: "Got it",
      
      // REGISTRATION MODAL TEXTS
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
    <div ref={containerRef} className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
      
      <div className="absolute top-6 right-6 z-10 flex gap-4 items-center">
        <button onClick={() => setShowInfoModal(true)} className="text-cyan-400 hover:text-cyan-300 text-xs font-bold tracking-widest uppercase flex items-center gap-1 bg-cyan-900/30 px-3 py-1.5 rounded-full border border-cyan-500/50 transition-all active:scale-95">
          <span>ℹ️</span> {t.info}
        </button>
        <button onClick={onReset} className="text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase">
          {t.reset}
        </button>
      </div>

      <button onClick={onGoToWelcome} className="mt-16 mb-10 flex flex-col items-center group cursor-pointer transition-transform active:scale-95 focus:outline-none">
        <div className="w-20 h-20 bg-gray-800 rounded-3xl border border-green-500/30 group-hover:border-green-400 flex items-center justify-center shadow-lg shadow-green-500/10 mb-4 transition-colors">
          <span className="text-5xl">⛩️</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">RADAR</h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase group-hover:text-gray-300 transition-colors">{t.subtitle}</p>
      </button>

      <div className="w-full max-w-sm space-y-4 pb-12">
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

        {/* PARTIKEL CRASHKURS BUTTON - Mit Sperr-Logik */}
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

        <button onClick={() => onSelectMode('reading')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{t.phase2FlowTitle}</h2>
            <span className="text-cyan-500 text-sm font-bold">{t.scenario} {readingDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase2FlowDesc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${(readingDay / 21) * 100}%` }}></div></div>
        </button>

        <button onClick={() => onSelectMode('radar')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{t.phase3Title}</h2>
            <span className="text-yellow-500 text-sm font-bold">{t.day} {radarDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase3Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-yellow-500 h-full transition-all duration-500" style={{ width: `${(radarDay / 21) * 100}%` }}></div></div>
        </button>

        <button onClick={() => onSelectMode('kanji')} className="w-full bg-gray-800 hover:bg-gray-750 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all group text-left relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{t.phase4Title}</h2>
            <span className="text-purple-500 text-sm font-bold">{t.day} {kanjiDay}/21</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t.phase4Desc}</p>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(kanjiDay / 21) * 100}%` }}></div></div>
        </button>

        <div className="py-2">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
        </div>

        {/* PRÜFUNGS BUTTON - Mit Sperr-Logik */}
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

        <div className="py-2"><hr className="border-gray-700" /></div>

        <div className="w-full bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-6 rounded-2xl border-2 border-pink-500/50 shadow-lg shadow-pink-500/20 text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
          <h2 className="text-2xl font-extrabold text-pink-400 mb-2 tracking-wide uppercase">{t.groupTitle}</h2>
          <p className="text-gray-300 text-sm mb-6 relative z-10">{t.groupDesc}</p>
          <button onClick={() => setShowRegModal(true)} className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest relative z-10">
            {t.groupBtn}
          </button>
        </div>
      </div>

      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-gray-800 rounded-3xl border border-gray-600 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gray-900 border-b border-gray-700 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold tracking-widest uppercase text-cyan-400">{t.modalTitle}</h2>
              <button onClick={() => setShowInfoModal(false)} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-gray-300 text-sm leading-relaxed italic border-l-4 border-cyan-500 pl-3">{t.modalIntro}</p>
              <div><h3 className="font-bold text-green-400 mb-1">{t.modalW1Title}</h3><p className="text-gray-400 text-sm leading-relaxed">{t.modalW1Desc}</p></div>
              <div><h3 className="font-bold text-yellow-400 mb-1">{t.modalW3Title}</h3><p className="text-gray-400 text-sm leading-relaxed">{t.modalW3Desc}</p></div>
              <div><h3 className="font-bold text-purple-400 mb-1">{t.modalW6Title}</h3><p className="text-gray-400 text-sm leading-relaxed">{t.modalW6Desc}</p></div>
              
              <div className="mt-4 p-5 bg-pink-900/20 border border-pink-500/30 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 blur-xl rounded-full"></div>
                <h3 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
                  <span>🔥</span> {t.modalCtaTitle}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 relative z-10">{t.modalCtaDesc}</p>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    setTimeout(() => setShowRegModal(true), 200); 
                  }}
                  className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all relative z-10"
                >
                  {t.modalCtaBtn}
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-gray-900 border-t border-gray-700 shrink-0">
              <button onClick={() => setShowInfoModal(false)} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white tracking-widest uppercase transition-colors">{t.modalClose}</button>
            </div>
          </div>
        </div>
      )}

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
                    <div className="flex flex-col"><label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.fName}</label><input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" /></div>
                    <div className="flex flex-col"><label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.lName}</label><input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" /></div>
                  </div>
                  <div className="flex flex-col"><label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.phone}</label><input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" /></div>
                  <div className="flex flex-col"><label className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{t.email}</label><input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none p-3 text-sm" /></div>

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

export default Home;