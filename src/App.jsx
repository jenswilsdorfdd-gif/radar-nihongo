import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import KanaDeck from './components/KanaDeck';
import KanaCard from './components/KanaCard';
import KanjiDeck from './components/KanjiDeck';
import KanjiCard from './components/KanjiCard';
import ReadingDeck from './components/ReadingDeck';
import ReadingCard from './components/ReadingCard';
import ParticleCrashcourse from './components/ParticleCrashcourse';
import FinalExam from './components/FinalExam';

function App() {
  // --- AUTH & CLOUD STATE ---
  const [session, setSession] = useState(null);
  const [isCloudLoading, setIsCloudLoading] = useState(true);

  const [appLanguage, setAppLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || null;
  });

  const [activeView, setActiveView] = useState('welcome'); 
  const [kanaMode, setKanaMode] = useState('read');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true; 
  });
  
  // Startwerte auf 1 (werden nach Login aus der Cloud überschrieben)
  const [currentRadarDay, setCurrentRadarDay] = useState(1);
  const [kanaReadDay, setKanaReadDay] = useState(1);
  const [kanaWriteDay, setKanaWriteDay] = useState(1);
  const [readingDay, setReadingDay] = useState(1);
  const [currentKanjiDay, setCurrentKanjiDay] = useState(1);

  const [learningRadarDay, setLearningRadarDay] = useState(1);
  const [learningKanaDay, setLearningKanaDay] = useState(1);
  const [learningReadingDay, setLearningReadingDay] = useState(1);
  const [learningKanjiDay, setLearningKanjiDay] = useState(1);
  
  const kanaTotalDays = 14; 
  const readingTotalDays = 21; 

  // --- SESSION CHECK & DB FETCH ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchCloudProgress(session.user.id);
      } else {
        setIsCloudLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchCloudProgress(session.user.id);
        if (activeView === 'auth') setActiveView('home');
      } else {
        setIsCloudLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [activeView]);

  const fetchCloudProgress = async (userId) => {
    setIsCloudLoading(true);
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('id', userId)
      .single();

    // Sprachen aus dem Onboarding (localStorage) holen
    const targetLangUpdate = localStorage.getItem('radar_target_lang');
    const sourceLangUpdate = localStorage.getItem('radar_source_lang');

    if (data) {
      setCurrentRadarDay(data.radar_day || 1);
      setKanaReadDay(data.kana_read_day || 1);
      setKanaWriteDay(data.kana_write_day || 1);
      setReadingDay(data.reading_day || 1);
      setCurrentKanjiDay(data.kanji_day || 1);

      // Wenn frische Sprachdaten existieren -> in die Cloud pushen
      if (targetLangUpdate || sourceLangUpdate) {
        const updates = {};
        if (targetLangUpdate) updates.target_language = targetLangUpdate;
        if (sourceLangUpdate) updates.source_language = sourceLangUpdate;
        
        await supabase.from('user_progress').update(updates).eq('id', userId);
        
        // Danach lokal löschen, damit es später keine Cloud-Werte überschreibt
        localStorage.removeItem('radar_target_lang');
        localStorage.removeItem('radar_source_lang');
      }

    } else if (error && error.code === 'PGRST116') {
      // User existiert noch nicht in der Tabelle -> neu anlegen inkl. Sprachen
      await supabase.from('user_progress').insert([{ 
        id: userId,
        target_language: targetLangUpdate || 'jp',
        source_language: sourceLangUpdate || 'de'
      }]);

      localStorage.removeItem('radar_target_lang');
      localStorage.removeItem('radar_source_lang');
    }
    setIsCloudLoading(false);
  };

  const updateCloudProgress = async (updates) => {
    if (!session) return;
    const { error } = await supabase
      .from('user_progress')
      .update(updates)
      .eq('id', session.user.id);
      
    if (error) console.error("Cloud-Save Error:", error);
  };

  useEffect(() => { if (appLanguage) localStorage.setItem('appLanguage', appLanguage); }, [appLanguage]);
  useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); }, [isDarkMode]);

  // --- PROGRESS HANDLER MIT CLOUD-UPDATE ---
  const handleReset = () => {
    const confirmMsg = appLanguage === 'en' 
      ? "Danger! Do you really want to reset all your progress to Day 1?" 
      : "Gefahr! Willst du deinen gesamten Lern-Fortschritt wirklich auf Tag 1 zurücksetzen?";
      
    if (window.confirm(confirmMsg)) {
      setCurrentRadarDay(1);
      setKanaReadDay(1);
      setKanaWriteDay(1);
      setReadingDay(1);
      setCurrentKanjiDay(1);
      
      updateCloudProgress({
        radar_day: 1,
        kana_read_day: 1,
        kana_write_day: 1,
        reading_day: 1,
        kanji_day: 1
      });
    }
  };

  const handleFinishRadar = (day) => {
    if (day === currentRadarDay && day < 21) {
      const nextDay = currentRadarDay + 1;
      setCurrentRadarDay(nextDay);
      updateCloudProgress({ radar_day: nextDay });
    }
    setActiveView('dashboard');
  };

  const handleFinishKana = (day) => {
    if (kanaMode === 'read') {
      if (day === kanaReadDay && day < kanaTotalDays) {
        const nextDay = kanaReadDay + 1;
        setKanaReadDay(nextDay);
        updateCloudProgress({ kana_read_day: nextDay });
      }
    } else {
      if (day === kanaWriteDay && day < kanaTotalDays) {
        const nextDay = kanaWriteDay + 1;
        setKanaWriteDay(nextDay);
        updateCloudProgress({ kana_write_day: nextDay });
      }
    }
    setActiveView('kana-deck');
  };

  const handleFinishReading = (day) => {
    if (day === readingDay && day < readingTotalDays) {
      const nextDay = readingDay + 1;
      setReadingDay(nextDay);
      updateCloudProgress({ reading_day: nextDay });
    }
    setActiveView('reading-deck');
  };

  const handleFinishKanji = (day) => {
    if (day === currentKanjiDay && day < 21) {
      const nextDay = currentKanjiDay + 1;
      setCurrentKanjiDay(nextDay);
      updateCloudProgress({ kanji_day: nextDay });
    }
    setActiveView('kanji');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveView('welcome');
  };

  // Sprachwähler-Funktion entfernt, da nicht mehr benötigt

  if (!appLanguage) {
    return (
      <div className="min-h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        
        <div className="w-24 h-24 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-8 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-green-400 relative z-10">
            <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8 text-center uppercase">RADAR Lernplattform</h1>
        <h2 className="text-xl mb-6 text-gray-300 text-center">Wähle deine Sprache / Select Language / 言語を選択</h2>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={() => setAppLanguage('de')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32">
            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-green-500 shadow-sm flex items-center justify-center bg-gray-900 text-green-400 text-xl">DE</div>Deutsch
          </button>
          <button onClick={() => setAppLanguage('en')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32">
            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm flex items-center justify-center bg-gray-900 text-blue-400 text-xl">EN</div>English
          </button>
          <button onClick={() => setAppLanguage('jpn')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32">
            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-red-500 shadow-sm flex items-center justify-center bg-gray-900 text-red-400 text-xl">JP</div>日本語
          </button>
        </div>
      </div>
    );
  }

  if (isCloudLoading) {
    return (
      <div className="min-h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-green-400 font-bold tracking-widest uppercase text-sm animate-pulse">
        <div className="w-16 h-16 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-400 relative z-10">
            <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>
        System wird autorisiert...
      </div>
    );
  }

  // Zeigt die Controls (Darkmode & Logout) NUR noch im Home-Bereich an
  const showControls = activeView === 'home';

  return (
    <div className="min-h-screen w-screen max-w-full bg-gray-900 overflow-x-hidden font-sans flex flex-col transition-all duration-300" style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}>
      {showControls && (
        <div className="fixed top-6 left-6 z-50 flex gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full border border-gray-700 shadow-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none" style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}} title={isDarkMode ? "In den Hell-Modus wechseln" : "In den Dunkel-Modus wechseln"}><span className="text-xl leading-none">{isDarkMode ? '☀️' : '🌙'}</span></button>
          
          {session && (
            <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center bg-red-900/30 text-red-500 rounded-full border border-red-500/50 shadow-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none" title="Logout">
              <span className="text-lg leading-none">🚪</span>
            </button>
          )}
        </div>
      )}

      {activeView === 'welcome' && <Welcome onStart={() => setActiveView(session ? 'home' : 'auth')} language={appLanguage} />}
      
      {activeView === 'auth' && <Auth onLoginSuccess={() => setActiveView('home')} language={appLanguage} />}

      {activeView === 'home' && (
        <Home 
          onSelectMode={(mode) => {
            if (mode === 'kana-read') { setKanaMode('read'); setActiveView('kana-deck'); }
            if (mode === 'kana-write') { setKanaMode('write'); setActiveView('kana-deck'); }
            if (mode === 'reading') setActiveView('reading-deck');
            if (mode === 'radar') setActiveView('dashboard');
            if (mode === 'kanji') setActiveView('kanji');
            if (mode === 'particle-crashcourse') setActiveView('particle-crashcourse');
            if (mode === 'final-exam') setActiveView('final-exam');
          }} 
          onReset={handleReset} 
          onGoToWelcome={() => setActiveView('welcome')} 
          
          kanaReadDay={kanaReadDay} 
          setKanaReadDay={(val) => { setKanaReadDay(val); updateCloudProgress({ kana_read_day: val }); }}
          kanaWriteDay={kanaWriteDay} 
          setKanaWriteDay={(val) => { setKanaWriteDay(val); updateCloudProgress({ kana_write_day: val }); }}
          readingDay={readingDay} 
          setReadingDay={(val) => { setReadingDay(val); updateCloudProgress({ reading_day: val }); }}
          radarDay={currentRadarDay} 
          setRadarDay={(val) => { setCurrentRadarDay(val); updateCloudProgress({ radar_day: val }); }}
          kanjiDay={currentKanjiDay} 
          setKanjiDay={(val) => { setCurrentKanjiDay(val); updateCloudProgress({ kanji_day: val }); }}
          
          language={appLanguage}
        />
      )}
      {activeView === 'kana-deck' && <KanaDeck currentDay={kanaMode === 'read' ? kanaReadDay : kanaWriteDay} totalDays={kanaTotalDays} mode={kanaMode} onBackToHome={() => setActiveView('home')} onStartDay={(day) => { setLearningKanaDay(day); setActiveView('learning-kana'); }} language={appLanguage} />}
      {activeView === 'learning-kana' && <KanaCard day={learningKanaDay} mode={kanaMode} onBack={() => handleFinishKana(learningKanaDay)} language={appLanguage} />}
      {activeView === 'reading-deck' && <ReadingDeck currentDay={readingDay} totalDays={readingTotalDays} onBackToHome={() => setActiveView('home')} onStartDay={(day) => { setLearningReadingDay(day); setActiveView('learning-reading'); }} language={appLanguage} />}
      {activeView === 'learning-reading' && <ReadingCard day={learningReadingDay} onBack={() => handleFinishReading(learningReadingDay)} language={appLanguage} />}
      {activeView === 'dashboard' && <Dashboard currentDay={currentRadarDay} onStartDay={(day) => { setLearningRadarDay(day); setActiveView('learning-radar'); }} onBackToHome={() => setActiveView('home')} language={appLanguage} />}
      {activeView === 'learning-radar' && <Flashcard day={learningRadarDay} onBack={() => handleFinishRadar(learningRadarDay)} onNextDay={() => { handleFinishRadar(learningRadarDay); setActiveView('dashboard'); }} language={appLanguage} />}
      {activeView === 'kanji' && <KanjiDeck currentDay={currentKanjiDay} onBackToHome={() => setActiveView('home')} onStartDay={(day) => { setLearningKanjiDay(day); setActiveView('learning-kanji'); }} language={appLanguage} />}
      {activeView === 'learning-kanji' && <KanjiCard day={learningKanjiDay} onBack={() => handleFinishKanji(learningKanjiDay)} language={appLanguage} />}
      
      {activeView === 'particle-crashcourse' && (
        <ParticleCrashcourse language={appLanguage} onBack={() => setActiveView('home')} />
      )}

      {activeView === 'final-exam' && (
        <FinalExam language={appLanguage} onBack={() => setActiveView('home')} />
      )}
    </div>
  );
}

export default App;