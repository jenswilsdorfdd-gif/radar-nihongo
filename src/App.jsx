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

  // Standardsprache: Immer direkt belegt, damit kein störender Alt-Bildschirm blockiert
  const [appLanguage, setAppLanguage] = useState(() => {
    if (devModeActive) {
      const savedSource = localStorage.getItem('radar_source_lang');
      if (savedSource === 'jp') return 'jpn';
      if (savedSource === 'de') return 'de';
      if (savedSource === 'en') return 'en';
    }
    const saved = localStorage.getItem('appLanguage');
    if (saved) return saved;
    const sourceSaved = localStorage.getItem('radar_source_lang');
    if (sourceSaved) return sourceSaved === 'jp' ? 'jpn' : sourceSaved;
    return 'de';
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

  // --- SPRACHWECHSEL-KONFLIKT STATE ---
  const [langConflict, setLangConflict] = useState(null);

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

        localStorage.setItem('radar_day', String(rDay));
        localStorage.setItem('kana_read_day', String(krDay));
        localStorage.setItem('kana_write_day', String(kwDay));
        localStorage.setItem('reading_day', String(rdDay));
        localStorage.setItem('kanji_day', String(kjDay));

        if (!devModeActive) {
          const dbTarget = data.target_language || 'jp';
          const dbSource = data.source_language || 'de';

          // Prüfen, ob eine Abweichung zwischen lokaler Wahl und Cloud vorliegt
          const hasTargetMismatch = targetLangUpdate && targetLangUpdate !== dbTarget;
          const hasSourceMismatch = sourceLangUpdate && sourceLangUpdate !== dbSource;

          if (hasTargetMismatch || hasSourceMismatch) {
            // Konflikt-Dialog triggern
            setLangConflict({
              userId,
              dbTarget,
              dbSource,
              newTarget: targetLangUpdate || dbTarget,
              newSource: sourceLangUpdate || dbSource
            });
          } else {
            // Kein Konflikt: Cloud-Stand übernehmen
            setTargetLanguage(dbTarget);
            setAppLanguage(dbSource === 'jp' ? 'jpn' : dbSource);
            localStorage.removeItem('radar_target_lang');
            localStorage.removeItem('radar_source_lang');
          }
        }

      } else if (error && error.code === 'PGRST116') {
        if (!devModeActive) {
          const initialTargetLang = targetLangUpdate || 'jp';
          setTargetLanguage(initialTargetLang);
          
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

  // --- KONFLIKT RESOLVER HANDLER ---
  const handleKeepCloudLanguage = () => {
    if (!langConflict) return;
    setTargetLanguage(langConflict.dbTarget);
    setAppLanguage(langConflict.dbSource === 'jp' ? 'jpn' : langConflict.dbSource);
    localStorage.removeItem('radar_target_lang');
    localStorage.removeItem('radar_source_lang');
    setLangConflict(null);
  };

  const handleSwitchToNewLanguage = async () => {
    if (!langConflict) return;
    
    setTargetLanguage(langConflict.newTarget);
    setAppLanguage(langConflict.newSource === 'jp' ? 'jpn' : langConflict.newSource);

    try {
      await supabase.from('user_progress').update({
        target_language: langConflict.newTarget,
        source_language: langConflict.newSource
      }).eq('id', langConflict.userId);
    } catch (err) {
      console.error("Fehler beim Aktualisieren der Sprache:", err);
    }

    localStorage.removeItem('radar_target_lang');
    localStorage.removeItem('radar_source_lang');
    setLangConflict(null);
  };

  // Persistenz-Funktion
  const updateCloudProgress = async (updates) => {
    Object.entries(updates).forEach(([key, val]) => {
      localStorage.setItem(key, String(val));
    });

    if (devModeActive || !session) return;

    try {
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

  const getLangName = (code) => {
    if (code === 'de') return 'Deutsch';
    if (code === 'en') return 'Englisch';
    if (code === 'jp' || code === 'jpn') return 'Japanisch';
    return code;
  };

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
      
      {/* SPRACHWECHSEL-BESTÄTIGUNGSDIALOG */}
      {langConflict && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-gray-800 rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden p-6 text-white text-center">
            <div className="w-14 h-14 bg-cyan-900/40 border border-cyan-500/50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg">
              🌐
            </div>
            
            <h2 className="text-xl font-extrabold tracking-wide uppercase text-cyan-400 mb-2">
              Lernstand gefunden
            </h2>
            
            <p className="text-gray-300 text-xs leading-relaxed mb-6">
              Du hast auf dem Startbildschirm <span className="text-cyan-300 font-bold">{getLangName(langConflict.newSource)} → {getLangName(langConflict.newTarget)}</span> gewählt. In der Cloud ist dein aktueller Lernstand auf <span className="text-green-400 font-bold">{getLangName(langConflict.dbSource)} → {getLangName(langConflict.dbTarget)}</span> eingestellt.
            </p>

            <div className="space-y-3">
              <button 
                onClick={handleKeepCloudLanguage}
                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 rounded-xl font-bold text-white uppercase tracking-wider text-xs shadow-lg active:scale-95 transition-all"
              >
                Mit Cloud-Sprache weiterlernen ({getLangName(langConflict.dbTarget)})
              </button>

              <button 
                onClick={handleSwitchToNewLanguage}
                className="w-full py-3.5 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-xl font-bold text-gray-200 uppercase tracking-wider text-xs active:scale-95 transition-all"
              >
                Cloud auf neue Sprache umstellen ({getLangName(langConflict.newTarget)})
              </button>
            </div>
          </div>
        </div>
      )}

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