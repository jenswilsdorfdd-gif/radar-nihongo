import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient'; 
import HomeJP from './HomeJP'; 
import HomeEN from './HomeEN'; // <-- NEU: Import der Englisch-Komponente

const Home = ({ 
  onSelectMode, 
  onReset, 
  onGoToWelcome, 
  kanaReadDay, setKanaReadDay, 
  kanaWriteDay, setKanaWriteDay, 
  readingDay, setReadingDay, 
  radarDay, setRadarDay, 
  kanjiDay, setKanjiDay, 
  language,
  targetLanguage = 'jp', 
  isDarkMode,
  setIsDarkMode,
  onLogout
}) => {
  const containerRef = useRef(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // State für das Mobile Hamburger-Menü
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  // --- GOD MODE / DEV MODE ---
  const [devMode, setDevMode] = useState(() => {
    return localStorage.getItem('radarDevMode') === 'true';
  });
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      const newDevMode = !devMode;
      setDevMode(newDevMode);
      localStorage.setItem('radarDevMode', newDevMode);
      setClickCount(0);
    }
    
    setTimeout(() => setClickCount(0), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // AUTO-POPUP LOGIK FÜR DAS INTRO-MODAL
    const hasSeenIntro = localStorage.getItem('radar_has_seen_intro');
    if (!hasSeenIntro) {
      setShowInfoModal(true);
      localStorage.setItem('radar_has_seen_intro', 'true');
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
      subtitle: "Language Survival System",
      phase1ReadTitle: "Phase 1: Kana (Lesen)",
      phase1ReadDesc: "Visuelles Zeichentraining. Die absolute Basis für das Gehirn.",
      phase1WriteTitle: "Phase 1: Kana (Schreiben)",
      phase1WriteDesc: "Die Meisterklasse. Präge dir die exakte Linienführung ein.",
      particleTitle: "Der Partikel-Code",
      particleDesc: "Entschlüssele die Matrix.",
      particleLockedDesc: "Schließe Phase 1 komplett ab, um den Partikel-Code freizuschalten.",
      phase2FlowTitle: "Phase 2: Kana Flow",
      phase2FlowDesc: "Brücken-Training zum Radar: Trainiere das flüssige Lesen in 3 Stufen (Alltag, Texte, Dialoge).",
      phase2LockedDesc: "Schließe Phase 1 ab, um diese Mission freizuschalten.",
      phase3Title: "Phase 3: 21-Tage-Radar",
      phase3Desc: "Stresstest, Wortschatz und Reaktion für das Überleben im Alltag.",
      phase3LockedDesc: "Schließe Phase 2 (Kana Flow) ab, um das Radar freizuschalten.",
      phase4Title: "Phase 4: Kanji N5",
      phase4Desc: "Lerne Bedeutung, Lesung und Anwendung komplexer Zeichen.",
      phase4LockedDesc: "Schließe Phase 3 (Radar) ab, um das Kanji-Training freizuschalten.",
      examTitle: "Abschluss-Prüfung",
      examDesc: "Der finale 30-Fragen Stresstest. Beweise, was du gelernt hast.",
      examLockedTitle: "Prüfung Gesperrt",
      examLockedDesc: "Schließe alle Phasen komplett ab, um den finalen Test freizuschalten.",
      groupTitle: "Live Dojo: Gruppen-Training",
      groupDesc: "Wende dein Wissen an! Melde dich hier für die interaktiven Live-Übungen an.",
      groupBtn: "Jetzt Registrieren",
      day: "Tag",
      scenario: "Text",
      socialTitle: "Tägliche Sprach-Hacks",
      socialDesc: (
        <>
          Hol dir Tipps, Vokabeln & Motivation direkt auf dein Handy.<br />
          Bleib bei der Stange!
        </>
      ),
      modalTitle: "Der 8-Wochen-Fahrplan",
      modalIntro: "Dieses System ist kein klassischer Vokabeltrainer, sondern ein taktisches Trainingslager für den echten Alltag. Praxis vor Theorie!",
      modalW1Title: "Woche 1 & 2: Das Fundament",
      modalW1Desc: "Täglich 1x Phase 1 (Lesen) und direkt danach Phase 1 (Schreiben). Nach 14 Tagen sitzt die absolute Basis blind.",
      modalW3Title: "Woche 3 bis 5: Der Einsatz",
      modalW3Desc: "Jetzt laufen Phase 2 (Flow) und Phase 3 (Radar) parallel! Starte mit einem Text zum Aufwärmen und absolviere danach den Radar-Einsatz des Tages.",
      modalW6Title: "Woche 6 bis 8: Der Feinschliff",
      modalW6Desc: "Phase 4. Jeden Tag ein neues Deck. Wiederhole nebenbei alte Radar-Einsätze, um deine Reaktionszeit zu pushen.",
      modalCtaTitle: "Ab Woche 8: Das Live Dojo",
      modalCtaDesc: "Wissen allein reicht nicht – du musst es anwenden! Melde dich für unser interaktives Gruppentraining an und trainiere deine Reflexe in echten Gesprächen.",
      modalCtaBtn: "Jetzt fürs Dojo registrieren",
      modalClose: "Verstanden",
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
      counterText: "Teilnehmer angemeldet",
      themeDark: "Dunkel-Modus",
      themeLight: "Hell-Modus",
      logoutBtn: "Logout",
      contentPrepTitle: "Fahrplan in Vorbereitung",
      contentPrepDesc: "Die Lerninhalte für diese Zielsprache werden aktuell geladen."
    },
    en: {
      reset: "Reset",
      info: "Roadmap",
      subtitle: "Language Survival System",
      phase1ReadTitle: "Phase 1: Kana (Read)",
      phase1ReadDesc: "Visual character training. The absolute basis for your brain.",
      phase1WriteTitle: "Phase 1: Kana (Write)",
      phase1WriteDesc: "The masterclass. Memorize the exact stroke order.",
      particleTitle: "The Particle Code",
      particleDesc: "Decode the Matrix.",
      particleLockedDesc: "Complete Phase 1 entirely to unlock the Particle Code.",
      phase2FlowTitle: "Phase 2: Kana Flow",
      phase2FlowDesc: "Radar Bridge Training: Practice fluent reading in 3 levels (Daily, Texts, Dialogues).",
      phase2LockedDesc: "Complete Phase 1 to unlock this mission.",
      phase3Title: "Phase 3: 21-Day Radar",
      phase3Desc: "Stress test, vocabulary, and reaction for everyday survival.",
      phase3LockedDesc: "Complete Phase 2 (Kana Flow) to unlock the Radar.",
      phase4Title: "Phase 4: Kanji N5",
      phase4Desc: "Learn meaning, reading, and application of complex characters.",
      phase4LockedDesc: "Complete Phase 3 (Radar) to unlock Kanji training.",
      examTitle: "Final Exam",
      examDesc: "The ultimate 30-question stress test. Prove your skills.",
      examLockedTitle: "Exam Locked",
      examLockedDesc: "Complete all phases entirely to unlock the final test.",
      groupTitle: "Live Dojo: Group Training",
      groupDesc: "Apply your knowledge! Register here for interactive live exercises.",
      groupBtn: "Register Now",
      day: "Day",
      scenario: "Text",
      socialTitle: "Daily Language Hacks",
      socialDesc: (
        <>
          Get tips, vocabulary & motivation straight to your phone.<br />
          Stay focused!
        </>
      ),
      modalTitle: "The 8-Week Roadmap",
      modalIntro: "This system is not a classic vocabulary trainer, but a tactical boot camp for everyday life. Practice over theory!",
      modalW1Title: "Week 1 & 2: The Foundation",
      modalW1Desc: "Daily 1x Phase 1 (Read) followed by Phase 1 (Write). After 14 days the absolute basis is set blindly.",
      modalW3Title: "Week 3 to 5: The Mission",
      modalW3Desc: "Now Phase 2 (Flow) and Phase 3 (Radar) run in parallel! Start with a text to warm up and then complete the Radar mission of the day.",
      modalW6Title: "Week 6 to 8: The Polish",
      modalW6Desc: "Phase 4. One new deck every day. Repeat old Radar missions on the side to push your reaction time.",
      modalCtaTitle: "Week 8+: The Live Dojo",
      modalCtaDesc: "Knowledge alone isn't enough – you have to apply it! Sign up for our interactive group training and test your reflexes in real conversations.",
      modalCtaBtn: "Register for the Dojo now",
      modalClose: "Got it",
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
      counterText: "participants registered",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      logoutBtn: "Logout",
      contentPrepTitle: "Roadmap in Preparation",
      contentPrepDesc: "The learning content for this target language is currently being loaded."
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

  const getTargetLanguageIcon = () => {
    switch(targetLanguage) {
      case 'jp': return <img src="https://flagcdn.com/w80/jp.png" alt="JP" className="w-10 rounded-sm shadow-sm" />;
      case 'de': return <img src="https://flagcdn.com/w80/de.png" alt="DE" className="w-10 rounded-sm shadow-sm" />;
      case 'en': return <img src="https://flagcdn.com/w80/gb.png" alt="EN" className="w-10 rounded-sm shadow-sm" />;
      default: return <span className="text-5xl">🏳️</span>;
    }
  };

  return (
    <div ref={containerRef} className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
      
      {/* VEREINTES TOP-MENÜ */}
      <div className="absolute top-6 right-6 z-50">
        
        {/* Desktop Ansicht: Inline Menü */}
        <div className="hidden md:flex gap-3 items-center">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full border border-gray-700 shadow-lg hover:scale-110 transition-transform focus:outline-none" 
            style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}} 
            title={isDarkMode ? t.themeLight : t.themeDark}
          >
            <span className="text-xl leading-none">{isDarkMode ? '☀️' : '🌙'}</span>
          </button>

          <button onClick={() => setShowInfoModal(true)} className="text-cyan-400 hover:text-cyan-300 text-xs font-bold tracking-widest uppercase flex items-center gap-1 bg-cyan-900/30 px-4 py-2.5 rounded-full border border-cyan-500/50 transition-all shadow-lg active:scale-95">
            <span>ℹ️</span> {t.info}
          </button>
          
          <button onClick={onReset} className="text-red-500 hover:text-red-400 text-xs font-bold tracking-widest uppercase bg-red-900/20 px-4 py-2.5 rounded-full border border-red-500/30 transition-all shadow-lg active:scale-95 mx-1">
            {t.reset}
          </button>

          <button 
            onClick={onLogout} 
            className="w-10 h-10 flex items-center justify-center bg-red-900/30 text-red-500 rounded-full border border-red-500/50 shadow-lg hover:scale-110 transition-transform focus:outline-none" 
            title={t.logoutBtn}
          >
            <span className="text-xl font-bold leading-none mb-0.5">✖</span>
          </button>
        </div>

        {/* Mobile Ansicht: Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-xl border border-gray-700 shadow-lg active:scale-95 transition-transform focus:outline-none"
          >
            <span className="text-2xl leading-none text-gray-300">
              {isMobileMenuOpen ? '✖' : '☰'}
            </span>
          </button>
        </div>

        {/* Mobile Ansicht: Dropdown Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-0 w-56 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl flex flex-col p-2 gap-2 md:hidden animate-fade-in">
            <button 
              onClick={() => { setIsDarkMode(!isDarkMode); setIsMobileMenuOpen(false); }} 
              className="flex items-center justify-between p-3.5 hover:bg-gray-700 rounded-xl text-white text-sm font-bold tracking-wide transition-colors"
            >
              <span>{isDarkMode ? t.themeLight : t.themeDark}</span>
              <span className="text-lg" style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}>{isDarkMode ? '☀️' : '🌙'}</span>
            </button>
            
            <button 
              onClick={() => { setShowInfoModal(true); setIsMobileMenuOpen(false); }} 
              className="flex items-center justify-between p-3.5 hover:bg-gray-700 rounded-xl text-cyan-400 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              <span>{t.info}</span>
              <span className="text-lg">ℹ️</span>
            </button>
            
            <button 
              onClick={() => { onReset(); setIsMobileMenuOpen(false); }} 
              className="flex items-center justify-between p-3.5 hover:bg-gray-700 rounded-xl text-red-500 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              <span>{t.reset}</span>
              <span className="text-lg font-black leading-none">↺</span>
            </button>
            
            <div className="h-px bg-gray-700 my-1 mx-2"></div>
            
            <button 
              onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} 
              className="flex items-center justify-between p-3.5 hover:bg-red-900/30 rounded-xl text-red-500 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              <span>{t.logoutBtn}</span>
              <span className="text-lg font-black leading-none mb-0.5">✖</span>
            </button>
          </div>
        )}
      </div>

      {/* --- HEADER BEREICH --- */}
      <div className="mt-16 mb-10 flex flex-col items-center">
        <button onClick={onGoToWelcome} className="w-20 h-20 bg-gray-800 rounded-3xl border border-green-500/30 hover:border-green-400 flex items-center justify-center shadow-lg shadow-green-500/10 mb-4 transition-colors cursor-pointer active:scale-95 focus:outline-none">
          {getTargetLanguageIcon()}
        </button>
        
        <h1 
          onClick={handleSecretClick} 
          className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2 cursor-pointer select-none"
        >
          RADAR
        </h1>
        <p className="text-gray-400 text-xs tracking-widest uppercase">{t.subtitle}</p>
        
        {devMode && (
          <span className="text-pink-500 text-[10px] font-bold tracking-widest uppercase mt-2 animate-pulse bg-pink-500/10 px-2 py-1 rounded">
            Dev Mode Aktiv
          </span>
        )}
      </div>

      <div className="w-full max-w-sm space-y-4 pb-12">
        
        {/* DEV TOOLS ADMIN PANEL */}
        {devMode && (
          <div className="w-full bg-black/60 border-2 border-pink-500/50 rounded-2xl p-4 mb-6 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
            <h3 className="text-pink-400 font-bold text-xs tracking-widest uppercase mb-4 text-center flex items-center justify-center gap-2">
              <span>🛠</span> Level Selector
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                <label className="text-xs text-green-400 font-bold uppercase tracking-wider">Kana Read</label>
                <input type="number" min="1" max="14" value={kanaReadDay} onChange={(e) => setKanaReadDay && setKanaReadDay(Number(e.target.value))} className="w-14 bg-gray-900 text-white text-sm text-center py-1 rounded border border-gray-600 focus:border-pink-500 outline-none" />
              </div>
              <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                <label className="text-xs text-blue-400 font-bold uppercase tracking-wider">Kana Write</label>
                <input type="number" min="1" max="14" value={kanaWriteDay} onChange={(e) => setKanaWriteDay && setKanaWriteDay(Number(e.target.value))} className="w-14 bg-gray-900 text-white text-sm text-center py-1 rounded border border-gray-600 focus:border-pink-500 outline-none" />
              </div>
              <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                <label className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Kana Flow</label>
                <input type="number" min="1" max="21" value={readingDay} onChange={(e) => setReadingDay && setReadingDay(Number(e.target.value))} className="w-14 bg-gray-900 text-white text-sm text-center py-1 rounded border border-gray-600 focus:border-pink-500 outline-none" />
              </div>
              <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                <label className="text-xs text-yellow-400 font-bold uppercase tracking-wider">Radar</label>
                <input type="number" min="1" max="21" value={radarDay} onChange={(e) => setRadarDay && setRadarDay(Number(e.target.value))} className="w-14 bg-gray-900 text-white text-sm text-center py-1 rounded border border-gray-600 focus:border-pink-500 outline-none" />
              </div>
              <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                <label className="text-xs text-purple-400 font-bold uppercase tracking-wider">Kanji N5</label>
                <input type="number" min="1" max="21" value={kanjiDay} onChange={(e) => setKanjiDay && setKanjiDay(Number(e.target.value))} className="w-14 bg-gray-900 text-white text-sm text-center py-1 rounded border border-gray-600 focus:border-pink-500 outline-none" />
              </div>
            </div>
            <p className="text-gray-500 text-[10px] mt-3 text-center uppercase tracking-widest">Die Änderungen sind sofort live.</p>
          </div>
        )}

        {/* --- DYNAMISCHE ZIELSPRACHEN-WEICHE START --- */}
        {targetLanguage === 'jp' && (
          <HomeJP 
            onSelectMode={onSelectMode}
            kanaReadDay={kanaReadDay}
            kanaWriteDay={kanaWriteDay}
            readingDay={readingDay}
            radarDay={radarDay}
            kanjiDay={kanjiDay}
            devMode={devMode}
            t={t}
          />
        )}

        {targetLanguage === 'en' && (
          <HomeEN 
            onSelectMode={onSelectMode}
            kanaReadDay={kanaReadDay}
            kanaWriteDay={kanaWriteDay}
            readingDay={readingDay}
            radarDay={radarDay}
            kanjiDay={kanjiDay}
            devMode={devMode}
            t={t}
          />
        )}

        {targetLanguage !== 'jp' && targetLanguage !== 'en' && (
          /* --- ALTERNATIVER FAHRPLAN (PLATZHALTER FÜR WEITERE SPRACHEN) --- */
          <div className="w-full bg-gray-800/80 p-8 rounded-3xl border border-gray-700 text-center relative overflow-hidden shadow-xl mb-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>
            
            <span className="text-5xl mb-4 block relative z-10">🚧</span>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 tracking-widest uppercase mb-4 relative z-10">
              {t.contentPrepTitle}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
              {t.contentPrepDesc}
            </p>
            <div className="mt-8">
               <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}
        {/* --- DYNAMISCHE ZIELSPRACHEN-WEICHE ENDE --- */}

        <div className="py-2"><hr className="border-gray-700" /></div>

        <div className="w-full bg-gradient-to-br from-pink-900/40 to-purple-900/40 p-6 rounded-2xl border-2 border-pink-500/50 shadow-lg shadow-pink-500/20 text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl"></div>
          <h2 className="text-2xl font-extrabold text-pink-400 mb-2 tracking-wide uppercase">{t.groupTitle}</h2>
          <p className="text-gray-300 text-sm mb-6 relative z-10">{t.groupDesc}</p>
          <button onClick={() => setShowRegModal(true)} className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all uppercase tracking-widest relative z-10">
            {t.groupBtn}
          </button>
        </div>

        {/* SOCIAL MEDIA FOOTER */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center pb-6">
          <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-3 text-sm">{t.socialTitle}</h3>
          <p className="text-gray-500 text-xs mb-6 px-4 leading-relaxed">{t.socialDesc}</p>
          
          <div className="flex justify-center gap-4">
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-4.27.2-5.78 1.71-5.98 5.98C1.01 8.33 1 8.74 1 12s.01 3.67.07 4.95c.2 4.27 1.71 5.78 5.98 5.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.27-.2 5.78-1.71 5.98-5.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.27-1.71-5.78-5.98-5.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-9.44a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>
            </a>
          </div>
        </div>

      </div>

      {/* FAHRPLAN MODAL */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-gray-800 rounded-3xl border border-gray-600 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gray-900 border-b border-gray-700 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold tracking-widest uppercase text-cyan-400">{t.modalTitle}</h2>
              <button onClick={() => setShowInfoModal(false)} className="text-gray-400 hover:text-white text-3xl leading-none">×</button>
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
              {!isSubmitted && <button onClick={closeRegistration} className="text-gray-400 hover:text-white text-3xl leading-none">×</button>}
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