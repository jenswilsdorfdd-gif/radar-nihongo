import React from 'react';
import { kanjiData } from '../data/kanjiData';
import { deKompositaData } from '../data/deKompositaData';

const KanjiDeck = ({ currentDay, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const totalDays = 21; 
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isGermanTarget = targetLanguage === 'de';

  // Wörterbuch & Lokalisierung
  const texts = {
    de: {
      back: "Hauptmenü",
      title: isGermanTarget ? "KOMPOSITA DECK" : "KANJI DECK",
      subtitle: isGermanTarget ? "Wortbildungs- & Morphologie-Training:" : "Starter N5 Level:",
      day: isGermanTarget ? "Thema" : "Tag",
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Komposita-Dekomposition" : "System-Einweisung: Kanji",
      briefingIntro: isGermanTarget 
        ? "Lange deutsche Wörter sind keine Zufallskonstrukte, sondern logisch geschachtelte Wortketten. Lerne hier die systematische Dekomposition in Bestimmungswort, Fugenelement und Grundwort."
        : "Japanische Symbole bestehen aus Form, Bedeutung und Lesung. Lerne hier die 121 wichtigsten N5-Kanji aus dem Radar-System.",
      bulletTitle: isGermanTarget ? "▶ Die Grundwort-Rechtsregel" : "▶ Kopfkino & Kontext",
      bulletDesc: isGermanTarget 
        ? "Das letzte Nomen (Grundwort) bestimmt immer zu 100 % das grammatikalische Geschlecht (der/die/das) und den Kern des Begriffs. Alle davor liegenden Wörter beschreiben das Grundwort nur näher."
        : "Nutze die Eselsbrücken, um dir das Zeichen einzuprägen. Beim Umdrehen zeigt dir das System echte japanische Beispielsätze (inkl. Lesehilfen und Audio).",
      mechanics: "Mechanik:",
      mechanicsDesc: isGermanTarget
        ? "Trainiere die Zerlegung und Bedeutung der Einzelbestandteile. Bei 'Nochmal' wandert die Karte ans Ende der Tages-Warteschlange."
        : "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist."
    },
    en: {
      back: "Main Menu",
      title: isGermanTarget ? "COMPOUNDS DECK" : "KANJI DECK",
      subtitle: isGermanTarget ? "Word Formation & Morphology Training:" : "Starter N5 Level:",
      day: isGermanTarget ? "Topic" : "Day",
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: Compound Decomposition" : "System Briefing: Kanji",
      briefingIntro: isGermanTarget
        ? "Long German words are logically nested chains. Learn systematic decomposition into modifying element, connecting element, and head word."
        : "Japanese symbols consist of form, meaning, and reading. Learn the 121 most important N5 Kanji from the Radar System here.",
      bulletTitle: isGermanTarget ? "▶ The Right-Hand Head Rule" : "▶ Mnemonics & Context",
      bulletDesc: isGermanTarget
        ? "The final noun (head word) strictly determines 100% of the grammatical gender (der/die/das) and core meaning. All preceding parts merely specify it."
        : "Use the mnemonics to memorize the character. When flipped, the system shows you real Japanese example sentences (incl. reading aids and audio).",
      mechanics: "Mechanics:",
      mechanicsDesc: isGermanTarget
        ? "Drill morphological breakdown. Clicking 'Again' moves the card to the end of the daily queue."
        : "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty."
    },
    jpn: {
      back: "メインメニュー",
      title: isGermanTarget ? "複合語解体デッキ" : "漢字デッキ",
      subtitle: isGermanTarget ? "語形成・形態素解析トレーニング:" : "スターター N5 レベル:",
      day: isGermanTarget ? "単元" : "日目",
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 複合名詞の解体法則" : "システム解説: 漢字",
      briefingIntro: isGermanTarget
        ? "一見長大で威圧的なドイツ語の名詞は、規則的なパーツの組み合わせに過ぎません。左から右へ分解し、修飾語・結合要素（Fugen）・基底語の構造をスキャンします。"
        : "日本の漢字は形・意味・読みで構成されます。ここではレーダーシステムにおける必須N5漢字121文字を定着させます。",
      bulletTitle: isGermanTarget ? "▶ 基底語（Grundwort）の絶対右端ルール" : "▶ イメージ連想と文脈",
      bulletDesc: isGermanTarget
        ? "どれほど長い単語であっても、文末（最後）に位置する名詞が全体の文法上の性（der/die/das）と本質的意味を100%決定します。"
        : "連想法を使って文字を記憶してください。カードをめくると実戦例文（読み・音声付き）が表示されます。",
      mechanics: "演習ルール:",
      mechanicsDesc: isGermanTarget
        ? "各要素の役割と意味を確認しながら反復します。「もう一度」を押すと未習得カードが末尾へ再配置されます。"
        : "「もう一度」を押すとカードがキューの末尾へ移動します。カードがなくなるまで継続してください。"
    }
  };

  const t = texts[language === 'jpn' ? 'jpn' : (texts[language] ? language : 'de')] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Zurück-Button */}
      <div className="w-full max-w-md flex justify-start mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold cursor-pointer"
        >
          &larr; {t.back}
        </button>
      </div>

      {/* Header & Fortschritt */}
      <div className="w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wider text-purple-400">
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {t.subtitle} {t.day} {currentDay > totalDays ? totalDays : currentDay} {t.of} {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${(Math.min(currentDay, totalDays) / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className="text-purple-400 font-bold mb-2 tracking-wide uppercase text-sm">
          {t.briefingTitle}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          {t.briefingIntro}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          <strong className="text-white block mb-1">{t.bulletTitle}</strong>
          {t.bulletDesc}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed pt-3 border-t border-gray-700">
          <strong className="text-purple-400">{t.mechanics}</strong> {t.mechanicsDesc}
        </p>
      </div>

      {/* 21-Tage Raster */}
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;

          // Dynamischer Themenschwerpunkt bei Deutsch aus deKompositaData
          const dayTitle = isGermanTarget ? deKompositaData[day]?.title : null;

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={`py-4 px-4 rounded-xl font-bold transition-transform active:scale-95 flex flex-col items-center justify-center text-center
                ${isCurrent ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 cursor-pointer' : ''}
                ${isCompleted ? 'bg-gray-700 text-purple-400 border border-purple-500/30 cursor-pointer' : ''}
                ${isLocked ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : ''}
              `}
            >
              <span className="text-lg">{t.day} {day}</span>
              {dayTitle && (
                <span className="text-xs font-normal text-purple-200/80 mt-1 line-clamp-1">
                  {dayTitle}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanjiDeck;