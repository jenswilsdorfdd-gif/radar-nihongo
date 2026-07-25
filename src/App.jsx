import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import KanaDeck from './components/KanaDeck';
import KanaCard from './components/KanaCard';
import KanjiDeck from './components/KanjiDeck';
import KanjiCard from './components/KanjiCard';

function App() {
  // --- SPRACHE ---
  const [appLanguage, setAppLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || null;
  });

  const [activeView, setActiveView] = useState('welcome'); 
  const [kanaMode, setKanaMode] = useState('read');
  
  // THEME
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true; 
  });
  
  // RADAR
  const [currentRadarDay, setCurrentRadarDay] = useState(() => {
    const saved = localStorage.getItem('radarDay');
    return saved ? parseInt(saved, 10) : 1; 
  });
  const [learningRadarDay, setLearningRadarDay] = useState(1);

  // KANA
  const [kanaReadDay, setKanaReadDay] = useState(() => {
    const saved = localStorage.getItem('kanaReadDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [kanaWriteDay, setKanaWriteDay] = useState(() => {
    const saved = localStorage.getItem('kanaWriteDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [learningKanaDay, setLearningKanaDay] = useState(1);
  const kanaTotalDays = 14; 

  // KANJI
  const [currentKanjiDay, setCurrentKanjiDay] = useState(() => {
    const saved = localStorage.getItem('kanjiDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [learningKanjiDay, setLearningKanjiDay] = useState(1);

  // SPEICHERN
  useEffect(() => { if (appLanguage) localStorage.setItem('appLanguage', appLanguage); }, [appLanguage]);
  useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); }, [isDarkMode]);
  useEffect(() => { localStorage.setItem('radarDay', currentRadarDay); }, [currentRadarDay]);
  useEffect(() => { localStorage.setItem('kanaReadDay', kanaReadDay); }, [kanaReadDay]);
  useEffect(() => { localStorage.setItem('kanaWriteDay', kanaWriteDay); }, [kanaWriteDay]);
  useEffect(() => { localStorage.setItem('kanjiDay', currentKanjiDay); }, [currentKanjiDay]);

  // RESET
  const handleReset = () => {
    const confirmMsg = appLanguage === 'en' 
      ? "Danger! Do you really want to reset all your progress to Day 1?" 
      : "Gefahr! Willst du deinen gesamten Lern-Fortschritt wirklich auf Tag 1 zurücksetzen?";
      
    if (window.confirm(confirmMsg)) {
      setCurrentRadarDay(1);
      setKanaReadDay(1);
      setKanaWriteDay(1);
      setCurrentKanjiDay(1);
      localStorage.setItem('radarDay', 1);
      localStorage.setItem('kanaReadDay', 1);
      localStorage.setItem('kanaWriteDay', 1);
      localStorage.setItem('kanjiDay', 1);
    }
  };

  const handleFinishRadar = (day) => {
    if (day === currentRadarDay && day < 21) setCurrentRadarDay(prev => prev + 1);
    setActiveView('dashboard');
  };

  const handleFinishKana = (day) => {
    if (kanaMode === 'read') {
      if (day === kanaReadDay && day < kanaTotalDays) setKanaReadDay(prev => prev + 1);
    } else {
      if (day === kanaWriteDay && day < kanaTotalDays) setKanaWriteDay(prev => prev + 1);
    }
    setActiveView('kana-deck');
  };

  const handleFinishKanji = (day) => {
    if (day === currentKanjiDay && day < 21) setCurrentKanjiDay(prev => prev + 1);
    setActiveView('kanji');
  };

  // ------------------------------------------------------------------
  // SPRACHAUSWAHL-SCREEN (wird nur gezeigt, wenn keine Sprache gesetzt ist)
  // ------------------------------------------------------------------
  if (!appLanguage) {
    return (
      <div className="min-h-screen w-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="w-24 h-24 bg-gray-800 rounded-3xl border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10 mb-8">
          <span className="text-5xl">⛩️</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">RADAR SYSTEM</h1>
        <h2 className="text-xl mb-6 text-gray-300">Wähle deine Sprache / Choose your language</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setAppLanguage('de')} 
            className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-xl font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center"
          >
            <span className="text-3xl mb-2">🇩🇪</span> Deutsch
          </button>
          <button 
            onClick={() => setAppLanguage('en')} 
            className="bg-gray-800 hover:bg-gray-700 px-6 py-4 rounded-xl text-xl font-bold border border-gray-700 transition-transform active:scale-95 flex flex-col items-center"
          >
            <span className="text-3xl mb-2">🇬🇧</span> English
          </button>
        </div>
      </div>
    );
  }

  const showThemeSwitcher = activeView === 'welcome' || activeView === 'home';

  return (
    <div 
      className="min-h-screen w-screen max-w-full bg-gray-900 overflow-x-hidden font-sans flex flex-col transition-all duration-300"
      style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}
    >
      
      {showThemeSwitcher && (
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-6 left-6 z-50 w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full border border-gray-700 shadow-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none"
          style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}
          title={isDarkMode ? "In den Hell-Modus wechseln" : "In den Dunkel-Modus wechseln"}
        >
          <span className="text-xl leading-none">{isDarkMode ? '☀️' : '🌙'}</span>
        </button>
      )}

      {activeView === 'welcome' && (
        <Welcome onStart={() => setActiveView('home')} language={appLanguage} />
      )}

      {activeView === 'home' && (
        <Home 
          onSelectMode={(mode) => {
            if (mode === 'kana-read') { setKanaMode('read'); setActiveView('kana-deck'); }
            if (mode === 'kana-write') { setKanaMode('write'); setActiveView('kana-deck'); }
            if (mode === 'radar') setActiveView('dashboard');
            if (mode === 'kanji') setActiveView('kanji');
          }} 
          onReset={handleReset}
          onGoToWelcome={() => setActiveView('welcome')}
          kanaReadDay={kanaReadDay}
          kanaWriteDay={kanaWriteDay}
          radarDay={currentRadarDay}
          kanjiDay={currentKanjiDay}
          language={appLanguage}
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
        />
      )}

      {activeView === 'learning-kana' && (
        <KanaCard 
          day={learningKanaDay} 
          mode={kanaMode} 
          onBack={() => handleFinishKana(learningKanaDay)} 
          language={appLanguage} 
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard 
          currentDay={currentRadarDay} 
          onStartDay={(day) => { setLearningRadarDay(day); setActiveView('learning-radar'); }} 
          onBackToHome={() => setActiveView('home')} 
          language={appLanguage} 
        />
      )}

      {activeView === 'learning-radar' && (
        <Flashcard 
          day={learningRadarDay} 
          onBack={() => handleFinishRadar(learningRadarDay)} 
          language={appLanguage} 
        />
      )}

      {activeView === 'kanji' && (
        <KanjiDeck 
          currentDay={currentKanjiDay} 
          onBackToHome={() => setActiveView('home')} 
          onStartDay={(day) => { setLearningKanjiDay(day); setActiveView('learning-kanji'); }} 
          language={appLanguage} 
        />
      )}

      {activeView === 'learning-kanji' && (
        <KanjiCard 
          day={learningKanjiDay} 
          onBack={() => handleFinishKanji(learningKanjiDay)} 
          language={appLanguage} 
        />
      )}

    </div>
  );
}

export default App;