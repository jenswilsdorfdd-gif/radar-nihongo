import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Welcome from './components/Welcome';
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

  // DEV MODE CHECK
  const devModeActive = localStorage.getItem('radarDevMode') === 'true';

  const [appLanguage, setAppLanguage] = useState(() => {
    // Im Dev Mode synchronisieren wir die App-Sprache direkt mit der gespeicherten Quellsprache (source_lang)
    if (devModeActive) {
      const savedSource = localStorage.getItem('radar_source_lang');
      if (savedSource === 'jp') return 'jpn';
      if (savedSource === 'de') return 'de';
      if (savedSource === 'en') return 'en';
    }
    return localStorage.getItem('appLanguage') || null;
  });

  const [activeView, setActiveView] = useState('welcome'); 
  const [kanaMode, setKanaMode] = useState('read');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true; 
  });

  // Zielsprache mit direktem LocalStorage-Fallback
  const [targetLanguage, setTargetLanguage] = useState(() => {
    return localStorage.getItem('radar_target_lang') || 'jp';
  });

  // Startwerte mit direktem LocalStorage-Fallback für Gast-Nutzer
  const [currentRadarDay, setCurrentRadarDay] = useState(() => {
    return Number(localStorage.getItem('radar_day')) || 1;
  });
  const [kanaReadDay, setKanaReadDay] = useState(() => {
    return Number(localStorage.getItem('kana_read_day')) || 1;
  });
  const [kanaWriteDay, setKanaWriteDay] = useState(() => {
    return Number(localStorage.getItem('kana_write_day')) || 1;
  });
  const [readingDay, setReadingDay] = useState(() => {
    return Number(localStorage.getItem('reading_day')) || 1;
  });
  const [currentKanjiDay, setCurrentKanjiDay] = useState(() => {
    return Number(localStorage.getItem('kanji_day')) || 1;
  });

  const [learningRadarDay, setLearningRadarDay] = useState(1);
  const [learningKanaDay, setLearningKanaDay] = useState(1);
  const [learningReadingDay, setLearningReadingDay] = useState(1);
  const [learningKanjiDay, setLearningKanjiDay] = useState(1);
  
  const kanaTotalDays = 14; 
  const readingTotalDays = 21; 

  // Synchronisation von targetLanguage in den LocalStorage
  useEffect(() => {
    if (targetLanguage) {
      localStorage.setItem('radar_target_lang', targetLanguage);
    }
  }, [targetLanguage]);

  // Synchronisation von appLanguage & Theme
  useEffect(() => { 
    if (appLanguage) localStorage.setItem('appLanguage', appLanguage); 
  }, [appLanguage]);

  useEffect(() => { 
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); 
  }, [isDarkMode]);

  // --- SESSION CHECK & DB FETCH ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchCloudProgress(session.user.id);
        setActiveView(prev => (prev === 'welcome' ? 'home' : prev));
      } else {
        setIsCloudLoading(false);
        // Direkt zur Home-Ansicht, wenn Dev Mode aktiv ist
        if (devModeActive) {
          const savedTarget = localStorage.getItem('radar_target_lang');
          const savedSource = localStorage.getItem('radar_source_lang');
          if (savedTarget) setTargetLanguage(savedTarget);
          if (savedSource) {
            setAppLanguage(savedSource === 'jp' ? 'jpn' : savedSource);
          }
          setActiveView('home');
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchCloudProgress(session.user.id);
        setActiveView(prev => (prev === 'welcome' ? 'home' : prev));
      } else {
        setIsCloudLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCloudProgress = async (userId) => {
    setIsCloudLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', userId)
        .single();

      const targetLangUpdate = localStorage.getItem('radar_target_lang');
      const sourceLangUpdate = localStorage.getItem('radar_source_lang');

      if (data) {
        const rDay = data.radar_day || 1;
        const krDay = data.kana_read_day || 1;
        const kwDay = data.kana_write_day || 1;
        const rdDay = data.reading_day || 1;
        const kjDay = data.kanji_day || 1;

        setCurrentRadarDay(rDay);
        setKanaReadDay(krDay);
        setKanaWriteDay(kwDay);
        setReadingDay(rdDay);
        setCurrentKanjiDay(kjDay);

        // Lokalen Cache für Offline/Fallback aktualisieren
        localStorage.setItem('radar_day', String(rDay));
        localStorage.setItem('kana_read_day', String(krDay));
        localStorage.setItem('kana_write_day', String(kwDay));
        localStorage.setItem('reading_day', String(rdDay));
        localStorage.setItem('kanji_day', String(kjDay));

        if (!devModeActive) {
          setTargetLanguage(data.target_language || 'jp');

          if (targetLangUpdate || sourceLangUpdate) {
            const updates = {};
            if (targetLangUpdate) {
              updates.target_language = targetLangUpdate;
              setTargetLanguage(targetLangUpdate);
            }
            if (sourceLangUpdate) updates.source_language = sourceLangUpdate;
            
            await supabase.from('user_progress').update(updates).eq('id', userId);
            
            localStorage.removeItem('radar_target_lang');
            localStorage.removeItem('radar_source_lang');
          }
        }

      } else if (error && error.code === 'PGRST116') {
        if (!devModeActive) {
          const initialTargetLang = targetLangUpdate || 'jp';
          setTargetLanguage(initialTargetLang);
          
          // Initialen Eintrag per upsert absichern
          await supabase.from('user_progress').upsert([{ 
            id: userId,
            target_language: initialTargetLang,
            source_language: sourceLangUpdate || 'de',
            radar_day: currentRadarDay,
            kana_read_day: kanaReadDay,
            kana_write_day: kanaWriteDay,
            reading_day: readingDay,
            kanji_day: currentKanjiDay
          }]);

          localStorage.removeItem('radar_target_lang');
          localStorage.removeItem('radar_source_lang');
        }
      } else if (error) {
        console.error("Supabase Database Error:", error);
      }
    } catch (err) {
      console.error("Unexpected fetch error:", err);
    } finally {
      setIsCloudLoading(false);
    }
  };

  // Persistenz-Funktion: Sichert in Supabase (per upsert) UND im LocalStorage
  const updateCloudProgress = async (updates) => {
    // 1. Immer lokal persistieren (für Gast und als Offline-Fallback)
    Object.entries(updates).forEach(([key, val]) => {
      localStorage.setItem(key, String(val));
    });

    if (devModeActive) {
      console.log("Dev Mode Aktiv: Cloud-Update blockiert (Bypass Modus)", updates);
      return;
    }

    if (!session) return;

    try {
      // 2. Garantiertes Sichern in Supabase per upsert
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          id: session.user.id,
          ...updates,
          updated_at: new Date().toISOString()
        });
        
      if (error) console.error("Cloud-Save Error:", error);
    } catch (err) {
      console.error("Unexpected Cloud Save Error:", err);
    }
  };

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

  if (!appLanguage) {
    return (
      <div className="min-h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-8 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-green-400 relative z-10">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8 text-center uppercase">RADAR Lernplattform</h1>
        <h2 className="text-xl mb-6 text-gray-300 text-center">Wähle deine Sprache / Select Language / 言語を選択</h2>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={() => setAppLanguage('de')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32 cursor-pointer">
            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-green-500 shadow-sm flex items-center justify-center bg-gray-900 text-green-400 text-xl">DE</div>Deutsch
          </button>
          <button onClick={() => setAppLanguage('en')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32 cursor-pointer">
            <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm flex items-center justify-center bg-gray-900 text-blue-400 text-xl">EN</div>English
          </button>
          <button onClick={() => setAppLanguage('jpn')} className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-lg font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center w-32 cursor-pointer">
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-400 relative z-10">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M8.5 8.5a5 5 0 0 0 0 7"></path>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M5 5a10 10 0 0 0 0 14"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        </div>
        System arbeitet...
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-screen max-w-full bg-gray-900 overflow-hidden font-sans flex flex-col transition-all duration-300" style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}>
      
      {activeView === 'welcome' && (
        <Welcome 
          onStart={() => {
            const isDev = localStorage.getItem('radarDevMode') === 'true';
            if (isDev) {
              const savedTarget = localStorage.getItem('radar_target_lang');
              const savedSource = localStorage.getItem('radar_source_lang');
              if (savedTarget) setTargetLanguage(savedTarget);
              if (savedSource) {
                const mappedLang = savedSource === 'jp' ? 'jpn' : savedSource;
                setAppLanguage(mappedLang);
              }
            }
            setActiveView('home');
          }} 
          language={appLanguage} 
        />
      )}

      {/* HOME WIRD IMMER DIREKT GERENDERT & ERHÄLT DIE USER-EMAIL ALS PROP */}
      {activeView === 'home' && (
        <Home 
          onSelectMode={(mode) => {
            // Standard-Routing (Japanisch & Englisch)
            if (mode === 'kana-read') { setKanaMode('read'); setActiveView('kana-deck'); }
            if (mode === 'kana-write') { setKanaMode('write'); setActiveView('kana-deck'); }
            if (mode === 'reading') setActiveView('reading-deck');
            if (mode === 'radar') setActiveView('dashboard');
            if (mode === 'kanji') setActiveView('kanji');
            if (mode === 'particle-crashcourse') setActiveView('particle-crashcourse');
            if (mode === 'final-exam') setActiveView('final-exam');

            // Spezifisches Routing für Deutsch-Lernpfad (HomeDE)
            if (mode === 'de-phonetik') { setKanaMode('read'); setActiveView('kana-deck'); }
            if (mode === 'de-v2') { setKanaMode('write'); setActiveView('kana-deck'); }
            if (mode === 'de-signals') setActiveView('particle-crashcourse');
            if (mode === 'de-klammer') setActiveView('reading-deck');
            if (mode === 'de-radar') setActiveView('dashboard');
            if (mode === 'de-komposita') setActiveView('kanji');
            if (mode === 'final-exam-de') setActiveView('final-exam');
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
          targetLanguage={targetLanguage} 
          
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onLogout={handleLogout}
          userEmail={session?.user?.email || null}
        />
      )}
      
      {/* WEITERE VIEWS MIT DURCHGEREICHTER targetLanguage */}
      {activeView === 'kana-deck' && (
        <KanaDeck 
          currentDay={kanaMode === 'read' ? kanaReadDay : kanaWriteDay} 
          totalDays={kanaTotalDays} 
          mode={kanaMode} 
          onBackToHome={() => setActiveView('home')} 
          onStartDay={(day) => { setLearningKanaDay(day); setActiveView('learning-kana'); }} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'learning-kana' && (
        <KanaCard 
          day={learningKanaDay} 
          mode={kanaMode} 
          onBack={() => handleFinishKana(learningKanaDay)} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'reading-deck' && (
        <ReadingDeck 
          currentDay={readingDay} 
          totalDays={readingTotalDays} 
          onBackToHome={() => setActiveView('home')} 
          onStartDay={(day) => { setLearningReadingDay(day); setActiveView('learning-reading'); }} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'learning-reading' && (
        <ReadingCard 
          day={learningReadingDay} 
          onBack={() => handleFinishReading(learningReadingDay)} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'dashboard' && (
        <Dashboard 
          currentDay={currentRadarDay} 
          onStartDay={(day) => { setLearningRadarDay(day); setActiveView('learning-radar'); }} 
          onBackToHome={() => setActiveView('home')} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'learning-radar' && (
        <Flashcard 
          day={learningRadarDay} 
          onBack={() => handleFinishRadar(learningRadarDay)} 
          onNextDay={() => { handleFinishRadar(learningRadarDay); setActiveView('dashboard'); }} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'kanji' && (
        <KanjiDeck 
          currentDay={currentKanjiDay} 
          onBackToHome={() => setActiveView('home')} 
          onStartDay={(day) => { setLearningKanjiDay(day); setActiveView('learning-kanji'); }} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      {activeView === 'learning-kanji' && (
        <KanjiCard 
          day={learningKanjiDay} 
          onBack={() => handleFinishKanji(learningKanjiDay)} 
          language={appLanguage} 
          targetLanguage={targetLanguage}
        />
      )}
      
      {activeView === 'particle-crashcourse' && (
        <ParticleCrashcourse 
          language={appLanguage} 
          targetLanguage={targetLanguage}
          onBack={() => setActiveView('home')} 
        />
      )}

      {activeView === 'final-exam' && (
        <FinalExam 
          language={appLanguage} 
          targetLanguage={targetLanguage}
          onBack={() => setActiveView('home')} 
        />
      )}
    </div>
  );
}

export default App;