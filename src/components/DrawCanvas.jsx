import React, { useRef, useState, useEffect } from 'react';

const DrawCanvas = ({ character, onResult }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#ffffff'; 
    ctx.lineWidth = 8;
  }, []);

  const startDrawing = (e) => {
    if (isRevealed) return; 
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing || isRevealed) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsRevealed(false);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  // Dynamische Textgröße abhängig von der Zeichenlänge (für kawa, kya etc.)
  const getTextSizeClass = (charLength) => {
    if (charLength === 1) return 'text-[10rem]';
    if (charLength === 2) return 'text-[7rem]';
    return 'text-[4.5rem]';
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      <div className="relative w-full max-w-[18rem] aspect-square bg-gray-800 rounded-2xl shadow-inner border-2 border-gray-700 overflow-hidden mb-6 touch-none flex items-center justify-center">
        
        {/* NEU: Das japanische Schreib-Raster (Kreuz-Muster) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
          </svg>
        </div>

        {/* Hologramm/Materialisierungs-Animation mit dynamischer Größe und ohne Zeilenumbruch */}
        <div 
          className={`absolute flex items-center justify-center font-bold text-green-500/60 select-none z-10 transition-all duration-700 ease-out drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] whitespace-nowrap
            ${isRevealed ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-50 blur-xl'}
            ${getTextSizeClass(character ? character.length : 1)}
          `}
        >
          {character}
        </div>

        {/* Die eigentliche Zeichenfläche */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20 cursor-crosshair bg-transparent"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {!isRevealed ? (
        <div className="flex gap-4 w-full max-w-[18rem]">
          <button 
            onClick={clearCanvas}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-gray-300 active:scale-95 transition-all"
          >
            Löschen
          </button>
          <button 
            onClick={handleReveal}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
          >
            Prüfen
          </button>
        </div>
      ) : (
        <div className="flex gap-4 w-full max-w-[18rem] animate-fade-in">
          <button 
            onClick={() => { clearCanvas(); onResult(false); }}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all"
          >
            Nochmal
          </button>
          <button 
            onClick={() => { clearCanvas(); onResult(true); }}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all"
          >
            Sitzt
          </button>
        </div>
      )}

    </div>
  );
};

export default DrawCanvas;