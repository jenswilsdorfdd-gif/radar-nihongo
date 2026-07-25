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
  const [activeView, setActiveView] = useState('welcome'); 
  const [kanaMode, setKanaMode] = useState('read'); // 'read' oder 'write'
  
  // --- NEU: THEME STATE (Hell/Dunkel) ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true; // Standard ist Dark Mode
  });
  
  // RADAR
  const [currentRadarDay, setCurrentRadarDay] = useState(() => {
    const saved = localStorage.getItem('radarDay');
    return saved ? parseInt(saved, 10) : 1; 
  });
  const [learningRadarDay, setLearningRadarDay] = useState(1);

  // KANA - LESEN
  const [kanaReadDay, setKanaReadDay] = useState(() => {
    const saved = localStorage.getItem('kanaReadDay');
    return saved ? parseInt(saved, 10) : 1;
  });

  // KANA - SCHREIBEN
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
  useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); }, [isDarkMode]);
  useEffect(() => { localStorage.setItem('radarDay', currentRadarDay); }, [currentRadarDay]);
  useEffect(() => { localStorage.setItem('kanaReadDay', kanaReadDay); }, [kanaReadDay]);
  useEffect(() => { localStorage.setItem('kanaWriteDay', kanaWriteDay); }, [kanaWriteDay]);
  useEffect(() => { localStorage.setItem('kanjiDay', currentKanjiDay); }, [currentKanjiDay]);

  // RESET
  const handleReset = () => {
    if (window.confirm("Gefahr! Willst du deinen gesamten Lern-Fortschritt wirklich auf Tag 1 zurücksetzen?")) {
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

  // Sichtbarkeit des Theme-Switches (nur auf Welcome und Home, damit es nicht die Zurück-Buttons beim Lernen verdeckt)
  const showThemeSwitcher = activeView === 'welcome' || activeView === 'home';

  return (
    <div 
      className="min-h-screen w-screen max-w-full bg-gray-900 overflow-x-hidden font-sans flex flex-col transition-all duration-300"
      /* Der Magische Filter: Wenn Light Mode, kehre Farben um und rotiere die Farbtöne zurück! */
      style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}
    >
      
      {/* THEME SWITCHER (Oben Links) */}
      {showThemeSwitcher && (
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-6 left-6 z-50 w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full border border-gray-700 shadow-lg hover:scale-110 transition-transform cursor-pointer focus:outline-none"
          /* Der Button selbst wird doppelt invertiert, damit die Emojis ihre Farben behalten */
          style={!isDarkMode ? { filter: 'invert(1) hue-rotate(180deg)' } : {}}
          title={isDarkMode ? "In den Hell-Modus wechseln" : "In den Dunkel-Modus wechseln"}
        >
          <span className="text-xl leading-none">{isDarkMode ? '☀️' : '🌙'}</span>
        </button>
      )}

      {activeView === 'welcome' && (
        <Welcome onStart={() => setActiveView('home')} />
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
        />
      )}
      
      {activeView === 'kana-deck' && (
        <KanaDeck 
          currentDay={kanaMode === 'read' ? kanaReadDay : kanaWriteDay} 
          totalDays={kanaTotalDays} 
          mode={kanaMode}
          onBackToHome={() => setActiveView('home')}
          onStartDay={(day) => { 
            setLearningKanaDay(day); 
            setActiveView('learning-kana'); 
          }}
        />
      )}

      {activeView === 'learning-kana' && (
        <KanaCard 
          day={learningKanaDay} 
          mode={kanaMode}
          onBack={() => handleFinishKana(learningKanaDay)} 
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard 
          currentDay={currentRadarDay} 
          onStartDay={(day) => { setLearningRadarDay(day); setActiveView('learning-radar'); }} 
          onBackToHome={() => setActiveView('home')}
        />
      )}

      {activeView === 'learning-radar' && (
        <Flashcard day={learningRadarDay} onBack={() => handleFinishRadar(learningRadarDay)} />
      )}

      {activeView === 'kanji' && (
        <KanjiDeck 
          currentDay={currentKanjiDay} 
          onBackToHome={() => setActiveView('home')}
          onStartDay={(day) => { setLearningKanjiDay(day); setActiveView('learning-kanji'); }}
        />
      )}

      {activeView === 'learning-kanji' && (
        <KanjiCard day={learningKanjiDay} onBack={() => handleFinishKanji(learningKanjiDay)} />
      )}

    </div>
  );
}

export default App;