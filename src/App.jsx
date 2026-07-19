import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import KanaDeck from './components/KanaDeck';
import KanaCard from './components/KanaCard';
import KanjiDeck from './components/KanjiDeck';
import KanjiCard from './components/KanjiCard';

function App() {
  // TEST-HACK: Wir starten direkt in der Flashcard-Ansicht
  const [activeView, setActiveView] = useState('learning-radar'); 
  const [kanaMode, setKanaMode] = useState('read'); // 'read' oder 'write'
  
  // RADAR
  const [currentRadarDay, setCurrentRadarDay] = useState(() => {
    const saved = localStorage.getItem('radarDay');
    return saved ? parseInt(saved, 10) : 1; 
  });
  // TEST-HACK: Wir erzwingen Tag 7
  const [learningRadarDay, setLearningRadarDay] = useState(7);

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
  const kanaTotalDays = 14; // Fest auf 14 Tage gesetzt

  // KANJI
  const [currentKanjiDay, setCurrentKanjiDay] = useState(() => {
    const saved = localStorage.getItem('kanjiDay');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [learningKanjiDay, setLearningKanjiDay] = useState(1);

  // SPEICHERN
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
    if (day === currentKanjiDay && day < 7) setCurrentKanjiDay(prev => prev + 1);
    setActiveView('kanji');
  };

  return (
    <div className="min-h-screen w-screen max-w-full bg-gray-900 overflow-x-hidden font-sans flex flex-col">
      
      {activeView === 'home' && (
        <Home 
          onSelectMode={(mode) => {
            if (mode === 'kana-read') { setKanaMode('read'); setActiveView('kana-deck'); }
            if (mode === 'kana-write') { setKanaMode('write'); setActiveView('kana-deck'); }
            if (mode === 'radar') setActiveView('dashboard');
            if (mode === 'kanji') setActiveView('kanji');
          }} 
          onReset={handleReset}
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