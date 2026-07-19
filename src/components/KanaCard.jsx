import React, { useState, useEffect, useRef } from 'react';
import { kanaData } from '../data/kanaData';

const KanaCard = ({ day, mode, onBack }) => {
  const currentDeck = kanaData[day] || [];
  const [queue, setQueue] = useState([...currentDeck]);
  const [isFinished, setIsFinished] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    setQueue([...currentDeck]);
    setIsFinished(false);
    setIsRevealed(false);
  }, [day, currentDeck]);

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    e.preventDefault(); 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8; 
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isFinished || queue.length === 0) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">Tag {day}</h1>
        <h2 className="text-green-400 font-bold tracking-widest uppercase mb-12">Perfekt abgeschlossen</h2>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg border border-gray-600 uppercase tracking-widest transition-all active:scale-95">
          Zurück zum Deck
        </button>
      </div>
    );
  }

  const currentCard = queue[0];

  const handleReveal = () => {
    setIsRevealed(true);
    if (mode === 'read') playAudio(currentCard.kana);
  };

  const handleNext = (isCorrect) => {
    if (isCorrect) {
      setQueue(prev => prev.slice(1));
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
    }
    setIsRevealed(false);
    clearCanvas();
  };

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex justify-between items-center z-10 w-full max-w-sm mx-auto">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">&larr; Kana-Deck</button>
        <span className="text-yellow-500 text-xs sm:text-sm font-bold">Übrig: {queue.length}</span>
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mx-auto mt-12 flex flex-col items-center">
        <div className="w-full bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl flex flex-col items-center justify-center min-h-[300px] relative">
          
          <p className="absolute top-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
            {mode === 'read' ? 'Lesen' : 'Schreiben'}
          </p>

          {/* LESE-MODUS */}
          {mode === 'read' && (
            <>
              <div className="text-[6rem] font-bold text-white leading-none mb-4 mt-6">
                {currentCard.kana}
              </div>
              
              {isRevealed ? (
                <div className="flex flex-col items-center animate-fade-in w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-3xl font-extrabold text-blue-400 uppercase tracking-widest">{currentCard.sound}</p>
                    <button onClick={() => playAudio(currentCard.kana)} className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-lg transition-all active:scale-90">🔊</button>
                  </div>
                  
                  {currentCard.vocab && (
                    <div className="w-full bg-gray-900 rounded-xl p-4 border border-gray-700 text-center mt-2">
                      <p className="text-yellow-400 font-bold text-xl mb-1">{currentCard.vocab}</p>
                      <p className="text-gray-300 text-sm mb-3">{currentCard.vocabMeaning}</p>
                      {currentCard.sentence && (
                        <div className="border-t border-gray-700 pt-3">
                          <p className="text-white text-sm font-bold mb-1">{currentCard.sentence}</p>
                          <p className="text-gray-400 text-xs italic">{currentCard.sentenceTranslation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-20 flex items-center justify-center">
                  <p className="text-gray-500 text-sm italic">Laut, Wort & Satz?</p>
                </div>
              )}
            </>
          )}

          {/* SCHREIB-MODUS */}
          {mode === 'write' && (
            <>
              <div className="text-4xl font-extrabold text-blue-400 mt-4 mb-4 uppercase tracking-widest">
                {currentCard.sound}
              </div>
              
              {!isRevealed ? (
                <div className="w-full flex flex-col items-center">
                  <canvas 
                    ref={canvasRef}
                    width={220} 
                    height={220} 
                    className="bg-gray-900 border-2 border-gray-700 rounded-2xl touch-none shadow-inner"
                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                  />
                  <button onClick={clearCanvas} className="mt-3 text-xs text-gray-400 hover:text-white uppercase tracking-widest">Löschen</button>
                </div>
              ) : (
                <div className="flex flex-col items-center animate-fade-in w-full">
                  <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Die Lösung:</p>
                  <div className="text-[6rem] font-bold text-green-400 leading-none mb-4">{currentCard.kana}</div>
                  {currentCard.vocab && (
                    <p className="text-gray-300 text-sm bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
                      Beispiel: <span className="font-bold text-white">{currentCard.vocab}</span> ({currentCard.vocabMeaning})
                    </p>
                  )}
                </div>
              )}
            </>
          )}

        </div>

        {/* BOTTOM CONTROLS */}
        <div className="w-full mt-6 flex flex-col gap-3">
          {!isRevealed ? (
            <button onClick={handleReveal} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest">
              Aufdecken
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => handleNext(false)} className="flex-1 py-4 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-red-600 uppercase tracking-widest text-sm">
                Nochmal
              </button>
              <button onClick={() => handleNext(true)} className="flex-1 py-4 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-green-600 uppercase tracking-widest text-sm">
                Sitzt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanaCard;