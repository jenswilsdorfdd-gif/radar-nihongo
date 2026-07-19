import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import KanaDeck from './components/KanaDeck';
import KanaCard from './components/KanaCard';
import KanjiDeck from './components/KanjiDeck';
import KanjiCard from './components/KanjiCard';

function App() {
  const [activeView, setActiveView] = useState('home'); 
  
  // RADAR
  const [currentRadarDay, setCurrentRadarDay] = useState(() => {
    const saved = localStorage.getItem('radarDay');
    return saved ? parseInt(saved, 10) : 1; 
  });
  const [learningRadarDay, setLearningRadarDay] = useState(1);

  // KANA
  const [currentKanaDay, setCurrentKanaDay] = useState(() => {
    const saved = localStorage.getItem('kanaDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [learningKanaDay, setLearningKanaDay] = useState(1);
  const [kanaTotalDays, setKanaTotalDays] = useState(() => {
    const saved = localStorage.getItem('kanaTotalDays');
    return saved ? parseInt(saved, 10) : 14;
  });

  // KANJI
  const [currentKanjiDay, setCurrentKanjiDay] = useState(() => {
    const saved = localStorage.getItem('kanjiDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [learningKanjiDay, setLearningKanjiDay] = useState(1);

  // SPEICHERN
  useEffect(() => {
    localStorage.setItem('radarDay', currentRadarDay);
  }, [currentRadarDay]);

  useEffect(() => {
    localStorage.setItem('kanaDay', currentKanaDay);
  }, [currentKanaDay]);

  useEffect(() => {
    localStorage.setItem('kanaTotalDays', kanaTotalDays);
  }, [kanaTotalDays]);

  useEffect(() => {
    localStorage.setItem('kanjiDay', currentKanjiDay);
  }, [currentKanjiDay]);

  // RESET
  const handleReset = () => {
    if (window.confirm("Gefahr! Willst du deinen gesamten Lern-Fortschritt wirklich auf Tag 1 zurücksetzen?")) {
      setCurrentRadarDay(1);
      setCurrentKanaDay(1);
      setCurrentKanjiDay(1);
      localStorage.setItem('radarDay', 1);
      localStorage.setItem('kanaDay', 1);
      localStorage.setItem('kanjiDay', 1);
    }
  };

  const handleFinishRadar = (day) => {
    if (day === currentRadarDay && day < 21) {
      setCurrentRadarDay(prev => prev + 1);
    }
    setActiveView('dashboard');
  };

  const handleFinishKana = (day) => {
    if (day === currentKanaDay && day < kanaTotalDays) {
      setCurrentKanaDay(prev => prev + 1);
    }
    setActiveView('kana');
  };

  const handleFinishKanji = (day) => {
    if (day === currentKanjiDay && day < 7) {
      setCurrentKanjiDay(prev => prev + 1);
    }
    setActiveView('kanji');
  };

  // ROUTING
  const handleSelectMode = (mode) => {
    if (mode === 'radar') setActiveView('dashboard');
    if (mode === 'kana') setActiveView('kana');
    if (mode === 'kanji') setActiveView('kanji');
  };

  return (
    <div className="min-h-screen w-screen max-w-full bg-gray-900 overflow-x-hidden font-sans flex flex-col">
      {/* min-h-screen, w-screen und max-w-full sorgen für 100%ige Passform auf Handys */}
      
      {activeView === 'home' && (
        <Home 
          onSelectMode={handleSelectMode} 
          onReset={handleReset}
          kanaDay={currentKanaDay}
          kanaTotal={kanaTotalDays}
          radarDay={currentRadarDay}
          kanjiDay={currentKanjiDay}
        />
      )}
      
      {activeView === 'kana' && (
        <KanaDeck 
          currentDay={currentKanaDay} 
          totalDays={kanaTotalDays} 
          setTotalDays={setKanaTotalDays}
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
          totalDays={kanaTotalDays} 
          onBack={() => handleFinishKana(learningKanaDay)} 
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard 
          currentDay={currentRadarDay} 
          onStartDay={(day) => { 
            setLearningRadarDay(day); 
            setActiveView('learning-radar'); 
          }} 
          onBackToHome={() => setActiveView('home')}
        />
      )}

      {activeView === 'learning-radar' && (
        <Flashcard 
          day={learningRadarDay} 
          onBack={() => handleFinishRadar(learningRadarDay)} 
        />
      )}

      {activeView === 'kanji' && (
        <KanjiDeck 
          currentDay={currentKanjiDay} 
          onBackToHome={() => setActiveView('home')}
          onStartDay={(day) => { 
            setLearningKanjiDay(day); 
            setActiveView('learning-kanji'); 
          }}
        />
      )}

      {activeView === 'learning-kanji' && (
        <KanjiCard 
          day={learningKanjiDay} 
          onBack={() => handleFinishKanji(learningKanjiDay)} 
        />
      )}

    </div>
  );
}

export default App;