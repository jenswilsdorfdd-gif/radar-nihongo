import React, { useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PremiumWall = ({ hasBookedDojo, onPaymentSuccess, language = 'de' }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const texts = {
    de: {
      titleStandard: "System-Zugang (1 Jahr)",
      descStandard: "Sichere dir für 149 € den vollständigen Zugang zur RADAR Lernplattform für ein ganzes Jahr.",
      priceStandard: "149.00",
      titleUpsell: "Lifetime-Upgrade & Neue Sprache",
      descUpsell: "Als Dojo-Teilnehmer erhältst du für nur 49 € lebenslangen Zugang und eine zusätzliche Sprache.",
      priceUpsell: "49.00",
      errorMsg: "Zahlung fehlgeschlagen oder abgebrochen. Bitte versuche es erneut.",
      processing: "Zahlung wird verarbeitet..."
    },
    en: {
      titleStandard: "System Access (1 Year)",
      descStandard: "Get full access to the RADAR learning platform for a whole year for 149 €.",
      priceStandard: "149.00",
      titleUpsell: "Lifetime Upgrade & New Language",
      descUpsell: "As a Dojo participant, you get lifetime access and an additional language for only 49 €.",
      priceUpsell: "49.00",
      errorMsg: "Payment failed or cancelled. Please try again.",
      processing: "Processing payment..."
    },
    jpn: {
      titleStandard: "システムアクセス (1年)",
      descStandard: "149 € でRADAR学習プラットフォームへの1年間のフルアクセスを確保します。",
      priceStandard: "149.00",
      titleUpsell: "ライフタイムアップグレード",
      descUpsell: "道場参加者は、わずか 49 € で生涯アクセスと追加言語を取得できます。",
      priceUpsell: "49.00",
      errorMsg: "支払いに失敗したか、キャンセルされました。もう一度お試しください。",
      processing: "支払いを処理しています..."
    }
  };

  const t = texts[language] || texts.de;

  // Dynamische Anpassung basierend auf dem Dojo-Status
  const currentTitle = hasBookedDojo ? t.titleUpsell : t.titleStandard;
  const currentDesc = hasBookedDojo ? t.descUpsell : t.descStandard;
  const currentPrice = hasBookedDojo ? t.priceUpsell : t.priceStandard;

  // PayPal: Bestellung erstellen
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: currentTitle,
          amount: {
            currency_code: "EUR",
            value: currentPrice,
          },
        },
      ],
    });
  };

  // PayPal: Wenn der User erfolgreich bezahlt hat
  const onApprove = async (data, actions) => {
    setIsProcessing(true);
    setError(null);
    try {
      const details = await actions.order.capture();
      console.log("PayPal Transaction Success:", details);
      
      // Übergibt die Order-ID an die Eltern-Komponente (für die spätere Backend-Verifizierung)
      if (onPaymentSuccess) {
        onPaymentSuccess(details.id); 
      }
    } catch (err) {
      console.error("PayPal Capture Error:", err);
      setError(t.errorMsg);
      setIsProcessing(false); // Bei Fehler Lade-Status wieder aufheben
    }
  };

  // PayPal: Wenn ein Fehler auftritt (z.B. Fenster geschlossen)
  const onError = (err) => {
    console.error("PayPal Button Error:", err);
    setError(t.errorMsg);
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden animate-fade-in">
      <div className="p-8 text-center border-b border-gray-700 bg-gray-900">
        <div className="w-16 h-16 bg-gray-900 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)] mx-auto mb-6 relative overflow-hidden">
          <span className="text-3xl relative z-10">💎</span>
          <div className="absolute inset-0 bg-green-500/10 animate-ping opacity-20 rounded-full"></div>
        </div>
        
        <h2 className="text-xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 uppercase mb-4">
          {currentTitle}
        </h2>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {currentDesc}
        </p>
        
        <div className="text-4xl font-black text-white">
          {currentPrice.replace('.', ',')} €
        </div>
      </div>
      
      <div className="p-8 bg-gray-800 relative">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/30 text-red-400 border border-red-500/30 text-xs font-bold text-center uppercase tracking-wider">
            {error}
          </div>
        )}
        
        {/* Lade-Overlay, falls processing */}
        {isProcessing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-800/90 rounded-b-3xl">
            <div className="text-center text-green-400 font-bold animate-pulse text-sm uppercase tracking-widest py-4">
              {t.processing}
            </div>
          </div>
        )}
        
        {/* Buttons bleiben im DOM, werden bei processing nur deaktiviert */}
        <div className={isProcessing ? "opacity-50 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
          <PayPalButtons 
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumWall;