import React, { useState, useEffect } from 'react';
import { radarData } from '../data/radarData';

const Flashcard = ({ day, onBack, onNextDay }) => {
  const dayData = radarData[day] || { scenarios: [{ context: "Keine Daten", userTask: "Tag fehlt." }] };
  
  const [queue, setQueue] = useState([...dayData.scenarios]);
  const [isFinished, setIsFinished] = useState(false);
  
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [speechAttempts, setSpeechAttempts] = useState(0);
  const [speechResult, setSpeechResult] = useState(null); 

  // NEU: Für den Scanner-Modus
  const [wrongScans, setWrongScans] = useState([]); 

  useEffect(() => {
    if (radarData[day]) {
      setQueue([...radarData[day].scenarios]);
      setIsFinished(false);
      resetState();
    }
  }, [day]);

  const currentScenario = queue[0];
  const isScanner = currentScenario?.type === 'scanner'; // NEU: Checkt, ob es eine Scanner-Karte ist

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (speechResult === 'failed' && currentScenario?.userSpeech) {
      playAudio(currentScenario.userSpeech);
    }
  }, [speechResult, currentScenario]);

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Dein Browser unterstützt leider keine Spracherkennung. Bitte nutze Chrome oder Safari auf deinem Handy.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; 
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript(''); 
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      
      const isPerfect = evaluateSpeech(currentScenario.userSpeech, result);
      
      if (isPerfect) {
        setSpeechResult('perfect');
      } else {
        const nextAttempts = speechAttempts + 1;
        setSpeechAttempts(nextAttempts);
        if (nextAttempts >= 3) {
          setSpeechResult('failed');
        } else {
          setSpeechResult('retry');
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Mikrofon-Fehler:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleOptionSelect = (index) => {
    setSelectedIndex(index);
    setStep(3);
  };

  // NEU: Scanner-Klick auswerten
  const handleScanClick = (chunk, index) => {
    if (chunk.includes(currentScenario.target)) {
      setSelectedIndex(0); // Dummy-Index für korrekte Auswertung in Step 3
      setStep(3); // Direkt zur Erfolgs-Ansicht springen (Phase 2 wird übersprungen)
    } else {
      setWrongScans(prev => [...prev, index]);
    }
  };

  const advanceQueue = (isCorrect) => {
    if (isCorrect) {
      if (queue.length <= 1) {
        setIsFinished(true); 
      } else {
        setQueue(prev => prev.slice(1));
        resetState();
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      resetState();
    }
  };

  const resetState = () => {
    setStep(1);
    setSelectedIndex(null);
    setTranscript('');
    setSpeechAttempts(0);
    setSpeechResult(null);
    setWrongScans([]); // Scanner Reset
  };

  const renderTextWithFurigana = (text) => {
    if (!text) return null;
    const parts = text.split(/([^\s]+{[^}]+})/g);
    
    return parts.map((part, i) => {
      const match = part.match(/([^{]+){([^}]+)}/);
      if (match) {
        return (
          <ruby key={i} className="px-0.5">
            {match[1]}
            <rt className="text-[0.6em] text-gray-400">{match[2]}</rt>
          </ruby>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderHighlightedText = (text, keyword, isCorrect) => {
    if (!text || !keyword) return renderTextWithFurigana(text);
    
    const parts = text.split(keyword);
    const highlightColor = isCorrect ? 'text-green-400' : 'text-red-400';
    
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {renderTextWithFurigana(part)}
            {index < parts.length - 1 && (
              <span className={`font-extrabold text-2xl px-1 ${highlightColor}`}>
                {renderTextWithFurigana(keyword)}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  const evaluateSpeech = (expectedRaw, transcriptRaw) => {
    if (!transcriptRaw || !expectedRaw) return false;

    let expectedKanji = expectedRaw.replace(/([^{]+){[^}]+}/g, "$1"); 
    let expectedKana = expectedRaw.replace(/[^{]+{([^}]+)}/g, "$1");

    const cleanRegex = /[\s、。！？?]/g;
    expectedKanji = expectedKanji.replace(cleanRegex, '');
    expectedKana = expectedKana.replace(cleanRegex, '');
    let cleanTranscript = transcriptRaw.replace(cleanRegex, '');
    
    const politeRegex = /^(すみません|あの|えっと)/;
    cleanTranscript = cleanTranscript.replace(politeRegex, '');
    expectedKanji = expectedKanji.replace(politeRegex, '');
    expectedKana = expectedKana.replace(politeRegex, '');

    return cleanTranscript.includes(expectedKanji) || cleanTranscript.includes(expectedKana);
  };

  if (isFinished) {
    return (
      <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2">Abend-Routine</h1>
          <h2 className="text-green-400 font-bold tracking-widest uppercase mb-12">Abgeschlossen</h2>

          <div className="w-full space-y-4">
            <button onClick={onBack} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600 uppercase tracking-widest">
              Mission Beenden
            </button>
            <button onClick={onNextDay} className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-green-500/20 uppercase tracking-widest">
              Weiter geht's (Schnelllerner)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-yellow-500 mb-4">Noch keine Missionen für Tag {day}</h2>
        <button onClick={onBack} className="bg-gray-700 py-3 px-6 rounded-xl font-bold">Zurück</button>
      </div>
    );
  }

  // Für Scanner reicht es, wenn es in Step 3 gelandet ist. Für Speech werten wir den Index aus.
  const isAnswerCorrect = isScanner ? step === 3 : selectedIndex === currentScenario.correctIndex;

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-4 right-4 sm:left-6 sm:right-6 flex justify-between items-center z-10 w-full max-w-sm mx-auto">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; Radar-Deck
        </button>
        <span className="text-yellow-500 text-xs sm:text-sm font-bold">
          Einsatz {day} | Übrig: {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[22rem] sm:max-w-sm mx-auto mt-12 flex flex-col items-center">
        
        {/* PHASE 1: SITUATION & EINGABE (SPRACHE ODER SCANNER) */}
        <div className="w-full bg-gray-800 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-lg mb-4">
          <p className="text-yellow-500 text-xs font-bold tracking-widest uppercase mb-2">Szenario</p>
          <p className="text-gray-300 text-sm mb-4">{currentScenario.context}</p>
          
          {currentScenario.physicalAction && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-xl p-4 mb-4 text-center">
              <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">Aktion ausführen</p>
              <p className="text-orange-200 font-bold">{currentScenario.physicalAction}</p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-700 text-center">
            <p className="text-white font-bold">{currentScenario.userTask}</p>
            
            {currentScenario.vocabHint && (
              <div className="mt-3 inline-block bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5">
                <p className="text-xs text-yellow-400 font-bold tracking-wide uppercase">
                  Vokabel: <span className="text-white ml-1 text-sm">{renderTextWithFurigana(currentScenario.vocabHint)}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* NEU: MODUS-WEICHE -> Scanner ODER Mikrofon */}
          {step === 1 && isScanner && (
            <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-700 w-full text-center">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-4 animate-pulse">Radar-Scan Aktiv</p>
              <div className="flex flex-wrap justify-center gap-2">
                {currentScenario.textChunks.map((chunk, index) => {
                  const isWrong = wrongScans.includes(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleScanClick(chunk, index)}
                      className={`text-lg px-3 py-2 rounded-lg transition-all shadow-md font-bold ${
                        isWrong ? 'bg-red-900/50 text-red-500 border border-red-500/30 scale-95' 
                                : 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 active:scale-95'
                      }`}
                    >
                      {chunk}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && !isScanner && speechResult !== 'perfect' && speechResult !== 'failed' && (
            <div className="mt-6 flex flex-col items-center">
              <button 
                onClick={handleListen}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg ${isListening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 active:scale-95'}`}
              >
                🎤
              </button>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                {isListening ? 'Hört zu...' : 'Tippen & Sprechen'}
              </p>
            </div>
          )}

          {/* Direktes Sprach-Feedback (nur bei Sprache) */}
          {step === 1 && !isScanner && transcript && (
            <div className="mt-6 w-full bg-blue-900/20 rounded-xl p-4 border border-blue-500/30 text-left animate-fade-in">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Deine Eingabe:</p>
              <p className={`text-lg font-bold mb-2 ${speechResult === 'perfect' ? 'text-green-400' : 'text-red-500'}`}>
                {transcript}
              </p>

              {speechResult === 'retry' && (
                <div className="bg-red-900/40 p-2 rounded border border-red-500/50 mt-2">
                  <p className="text-red-300 text-xs font-bold uppercase text-center">
                    Nicht ganz! Noch {3 - speechAttempts} Versuch(e)
                  </p>
                </div>
              )}

              {(speechResult === 'failed' || speechResult === 'perfect') && (
                <div className="mt-4 pt-4 border-t border-blue-500/30">
                  {speechResult === 'failed' && (
                    <p className="text-red-400 text-xs font-bold uppercase mb-2">3 Fehlversuche. Muster-Lösung:</p>
                  )}
                  {speechResult === 'perfect' && (
                    <p className="text-green-400 text-xs font-bold uppercase mb-2">Ziel erfasst! Muster-Lösung:</p>
                  )}
                  <div className="flex justify-between items-start">
                    <p className="text-xl font-bold text-white leading-relaxed">
                      {renderTextWithFurigana(currentScenario.userSpeech)}
                    </p>
                    <button onClick={() => playAudio(currentScenario.userSpeech)} className="text-blue-400 text-lg ml-2 active:scale-90 flex-shrink-0">🔊</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PHASE 2: AUDIO & MULTIPLE CHOICE (Wird beim Scanner übersprungen) */}
        {step === 2 && !isScanner && (
          <div className="w-full bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4 animate-fade-in text-center">
            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">Gegenüber antwortet</p>
            
            <button 
              onClick={() => playAudio(currentScenario.npcReply)} 
              className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto hover:bg-red-600/40 active:scale-95 transition-all shadow-lg shadow-red-500/10"
            >
              🔊
            </button>
            <p className="text-sm text-gray-300 mb-6 italic">Audio abspielen und zuhören. Welche Information erkennst du?</p>

            <div className="space-y-3">
              {currentScenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white text-left transition-colors"
                >
                  {renderTextWithFurigana(option)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: AUFLÖSUNG & KONTROLLE */}
        {step === 3 && (
          <div className={`w-full rounded-2xl p-6 border mb-4 animate-fade-in relative overflow-hidden ${isAnswerCorrect ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className={`absolute top-0 left-0 w-1 h-full ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <p className={`text-xs font-bold tracking-widest uppercase ${isAnswerCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isAnswerCorrect ? 'Ziel erfasst' : 'Fehlerhafte Ortung'}
              </p>
              {!isScanner && (
                <button onClick={() => playAudio(currentScenario.npcReply)} className="text-gray-400 hover:text-white text-lg active:scale-90">🔊</button>
              )}
            </div>

            <p className="text-xl text-white mb-4 leading-relaxed">
              {isScanner ? currentScenario.npcReply : renderHighlightedText(currentScenario.npcReply, currentScenario.keyword, isAnswerCorrect)}
            </p>
            
            <p className="text-sm text-gray-300 italic border-t border-gray-700/50 pt-3">
              "{currentScenario.npcTranslation}"
            </p>
          </div>
        )}

      </div>

      {/* STEUERUNG BOTTOM */}
      <div className="w-full max-w-[22rem] sm:max-w-sm mt-4 mx-auto pb-8">
        
        {/* Kontrollen in Phase 1 (nur bei Sprache, Scanner schaltet automatisch weiter) */}
        {step === 1 && !isScanner && (
          <div className="space-y-3">
            {(speechResult === 'perfect' || speechResult === 'failed') ? (
              <>
                <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest">
                  Gegenüber antwortet (Phase 2)
                </button>
                <div className="flex gap-2">
                  <button onClick={() => advanceQueue(false)} className="flex-1 py-3 bg-red-700/80 hover:bg-red-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-red-600">
                    Nochmal (Ans Ende)
                  </button>
                  <button onClick={() => advanceQueue(true)} className="flex-1 py-3 bg-green-700/80 hover:bg-green-600 rounded-xl font-bold text-white text-sm active:scale-95 transition-all shadow-lg border border-green-600">
                    Sitzt (Nächste)
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setStep(2)} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600">
                Überspringen & Hören
              </button>
            )}
          </div>
        )}
        
        {/* Kontrollen in Phase 3 */}
        {step === 3 && (
          <button onClick={() => advanceQueue(isAnswerCorrect)} className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white active:scale-95 transition-all shadow-lg border border-gray-600">
            {isAnswerCorrect ? 'Sitzt (Nächste Karte)' : 'Nochmal (Ans Ende)'}
          </button>
        )}
      </div>

    </div>
  );
};

export default Flashcard;