import React from 'react';
import { kanaData } from '../data/kanaData';
import { dePhonetikData } from '../data/dePhonetikData';

const KanaDeck = ({ currentDay, totalDays, mode, onBackToHome, onStartDay, language, targetLanguage = 'jp' }) => {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const isWrite = mode === 'write';
  const isGermanTarget = targetLanguage === 'de';

  // Dynamische Datenquelle basierend auf Zielsprache
  const activeDataSource = isGermanTarget ? dePhonetikData : kanaData;

  // WÖRTERBUCH
  const texts = {
    de: {
      back: "Hauptmenü",
      modeLabel: "Modus",
      modeWrite: isGermanTarget ? "V2-Satzbau" : "Schreiben",
      modeRead: isGermanTarget ? "Lautbildung" : "Lesen",
      title: isGermanTarget ? "PHONETIK DECK" : "KANA DECK",
      subtitleWrite: isGermanTarget ? "V2-Code Training" : "Zeichen-Training",
      subtitleRead: isGermanTarget ? "Laut-Erkennung" : "Zeichen-Erkennung",
      day: isGermanTarget ? "Tag" : "Tag",
      of: "von",
      briefingTitle: isGermanTarget ? "System-Einweisung: Phonetik & V2" : "System-Einweisung",
      writeBullet1Title: isGermanTarget ? "▶ V2-Satzbau & Slot-Drill" : "▶ Präzisionstraining",
      writeBullet1Desc: isGermanTarget 
        ? "Trainiere die feste Verankerung des finiten Verbs auf Position 2 und meistere die Inversion." 
        : "Zeichne das geforderte Kana aus dem Gedächtnis auf das Display. Nutze den Finger oder einen Stylus.",
      writeBullet2Title: isGermanTarget ? "▶ Strenge Strukturkontrolle" : "▶ Strenge Bewertung",
      writeBullet2Desc: isGermanTarget 
        ? "Prüfe, ob das Verb strikt an zweiter Stelle steht. Wenn die Satzstruktur abweicht: 'Nochmal'." 
        : "Beim Prüfen wird das perfekte Zeichen über deine Skizze gelegt. Sei ehrlich zu dir selbst: Wenn die Proportionen nicht stimmen, klicke auf 'Nochmal'.",
      readBullet1Title: isGermanTarget ? "▶ Mundstellung & Kopfkino" : "▶ Visuelles Training & Kopfkino",
      readBullet1Desc: isGermanTarget 
        ? "Nutze die physischen Zungen- und Lippenanweisungen für Umlaute (Ä, Ö, Ü) und den Knacklaut." 
        : "Präge dir das Zeichen über die visuellen Eselsbrücken ein! Du hast ein besseres Bild im Kopf? Klicke auf das ✏️-Symbol auf der Rückseite und speichere deine eigene Eselsbrücke dauerhaft ab.",
      readBullet2Title: isGermanTarget ? "▶ Konsonantenstopp & Audio" : "▶ Auditives Lernen",
      readBullet2Desc: isGermanTarget 
        ? "Stoppe Endkonsonanten hart ab (Geld = [ɡɛlt]) ohne Katakana-Vokal. Höre dir die native Aussprache an." 
        : "Klicke auf die kleinen 🔊-Buttons, um dir die exakte Aussprache anzuhören. Sprich die Vokabeln und Sätze laut mit, um ein Gefühl für echte japanische Wörter zu bekommen.",
      mechanics: "Mechanik:",
      mechanicsDesc: "Bei 'Nochmal' wandert die Karte ans Ende der Warteschlange. Der Tag ist erst abgeschlossen, wenn der Stapel leer ist."
    },
    en: {
      back: "Main Menu",
      modeLabel: "Mode",
      modeWrite: isGermanTarget ? "V2 Structure" : "Write",
      modeRead: isGermanTarget ? "Phonetics" : "Read",
      title: isGermanTarget ? "PHONETICS DECK" : "KANA DECK",
      subtitleWrite: isGermanTarget ? "V2-Code Training" : "Character Training",
      subtitleRead: isGermanTarget ? "Sound Recognition" : "Character Recognition",
      day: "Day",
      of: "of",
      briefingTitle: isGermanTarget ? "System Briefing: Phonetics & V2" : "System Briefing",
      writeBullet1Title: isGermanTarget ? "▶ V2 Structure & Slot Drill" : "▶ Precision Training",
      writeBullet1Desc: isGermanTarget 
        ? "Train locking the finite verb into slot 2 and master inversion." 
        : "Draw the requested Kana from memory onto the display. Use your finger or a stylus.",
      writeBullet2Title: isGermanTarget ? "▶ Strict Syntax Check" : "▶ Strict Evaluation",
      writeBullet2Desc: isGermanTarget 
        ? "Check if the verb strictly holds position 2. If the structure is off, click 'Again'." 
        : "When checking, the perfect character is overlaid on your sketch. Be honest with yourself: If the proportions are off, click 'Again'.",
      readBullet1Title: isGermanTarget ? "▶ Mouth Position & Mnemonics" : "▶ Visual Training & Mnemonics",
      readBullet1Desc: isGermanTarget 
        ? "Use physical tongue and lip instructions for umlaute (Ä, Ö, Ü) and glottal stops." 
        : "Memorize the character using visual mnemonics! Have a better image in mind? Click the ✏️ icon on the back and permanently save your own mnemonic.",
      readBullet2Title: isGermanTarget ? "▶ Consonant Stops & Audio" : "▶ Auditory Learning",
      readBullet2Desc: isGermanTarget 
        ? "Stop final consonants abruptly without trailing vowels. Listen carefully to native audio." 
        : "Click the small 🔊 buttons to hear the exact pronunciation. Say the vocabulary and sentences out loud to get a feel for real Japanese words.",
      mechanics: "Mechanics:",
      mechanicsDesc: "Clicking 'Again' moves the card to the end of the queue. The day is only complete when the stack is empty."
    },
    jpn: {
      back: "メインメニュー",
      modeLabel: "モード",
      modeWrite: isGermanTarget ? "V2構文ドリル" : "書く",
      modeRead: isGermanTarget ? "発音・調音" : "読む",
      title: isGermanTarget ? "ドイツ語発音デッキ" : "仮名デッキ",
      subtitleWrite: isGermanTarget ? "定動詞第2位トレーニング" : "文字トレーニング",
      subtitleRead: isGermanTarget ? "調音筋肉認識" : "文字認識",
      day: "日目",
      of: "/",
      briefingTitle: isGermanTarget ? "システム解説: 発音・調音筋力" : "システム解説",
      writeBullet1Title: isGermanTarget ? "▶ V2規則スロット演習" : "▶ 筆記精密トレーニング",
      writeBullet1Desc: isGermanTarget 
        ? "活用動詞を常に第2スロットに配置し、時間や場所が前に出た際の倒置構文を身体に叩き込みます。" 
        : "要求された仮名を記憶から画面に描きます。指またはスタイラスペンを使用してください。",
      writeBullet2Title: isGermanTarget ? "▶ 厳格な構文判定" : "▶ 厳格な自己評価",
      writeBullet2Desc: isGermanTarget 
        ? "動詞の位置が第2スロットからズレていた場合は、迷わず「もう一度」を選択してください。" 
        : "判定時にお手本が重なります。バランスが崩れていたら「もう一度」をクリックしてください。",
      readBullet1Title: isGermanTarget ? "▶ 調音点と口唇筋肉の物理制御" : "▶ 視覚的記憶とイメージ",
      readBullet1Desc: isGermanTarget 
        ? "変母音（Ä, Ö, Ü）や声門閉鎖音の舌の位置と唇の突き出しを、物理的な指示通りに固定します。" 
        : "イメージ記憶を活用しましょう。裏面の鉛筆マークから自分だけの覚え方を保存できます。",
      readBullet2Title: isGermanTarget ? "▶ 脱カタカナ語末子音停止" : "▶ 音声学習",
      readBullet2Desc: isGermanTarget 
        ? "Geld を「ゲルド」と読まず、舌先で息をブロック（[t] 停止）。ネイティブ音声を聴いて模倣します。" 
        : "🔊ボタンで正確な発音を確認し、声に出して本物の日本語のリズムを掴んでください。",
      mechanics: "学習ルール:",
      mechanicsDesc: "「もう一度」を押したカードはキューの最後尾へ回ります。全問正解で完了となります。"
    }
  };

  const t = texts[language] || texts.de;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      
      {/* Navigation & Modus-Anzeige */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button 
          onClick={onBackToHome} 
          className="text-gray-400 hover:text-white text-sm uppercase tracking-widest font-bold"
        >
          &larr; {t.back}
        </button>
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg ${isWrite ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
          {t.modeLabel}: {isWrite ? t.modeWrite : t.modeRead}
        </span>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-6">
        <h1 className={`text-3xl font-bold text-center mb-2 tracking-wider ${isWrite ? 'text-blue-400' : 'text-green-400'}`}>
          {t.title}
        </h1>
        <p className="text-gray-400 text-center mb-4">
          {isWrite ? t.subtitleWrite : t.subtitleRead}: {t.day} {currentDay} {t.of} {totalDays}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className={`${isWrite ? 'bg-blue-500' : 'bg-green-500'} h-full transition-all duration-500`} 
            style={{ width: `${(currentDay / totalDays) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Dynamische System-Einweisung */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-5 mb-8 border border-gray-700 shadow-lg">
        <h2 className={`${isWrite ? 'text-blue-400' : 'text-green-400'} font-bold mb-4 tracking-wide uppercase text-sm`}>
          {t.briefingTitle}
        </h2>
        <ul className="space-y-4 text-sm text-gray-300 leading-relaxed">
          {isWrite ? (
            <>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet1Title}</strong>
                {t.writeBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.writeBullet2Title}</strong>
                {t.writeBullet2Desc}
              </li>
            </>
          ) : (
            <>
              <li>
                <strong className="text-white block mb-1">{t.readBullet1Title}</strong>
                {t.readBullet1Desc}
              </li>
              <li>
                <strong className="text-white block mb-1">{t.readBullet2Title}</strong>
                {t.readBullet2Desc}
              </li>
            </>
          )}
          <li className="pt-3 border-t border-gray-700">
            <strong className={isWrite ? 'text-blue-400' : 'text-green-400'}>{t.mechanics}</strong> {t.mechanicsDesc}
          </li>
        </ul>
      </div>

      {/* Raster */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 pb-8">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay;
          
          const deckInfo = activeDataSource[day];
          const groupTitle = deckInfo?.title;

          let btnClass = "py-3 px-2 rounded-xl font-bold transition-transform flex flex-col items-center justify-center text-center ";
          
          if (isCurrent) {
            btnClass += isWrite 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 cursor-pointer active:scale-95" 
              : "bg-green-600 text-white shadow-lg shadow-green-500/50 cursor-pointer active:scale-95";
          } else if (isCompleted) {
            btnClass += isWrite 
              ? "bg-gray-700 text-blue-400 border border-blue-500/30 cursor-pointer active:scale-95" 
              : "bg-gray-700 text-green-400 border border-green-500/30 cursor-pointer active:scale-95";
          } else {
            btnClass += "bg-gray-800 text-gray-600 cursor-not-allowed";
          }

          return (
            <button
              key={day}
              disabled={isLocked}
              onClick={() => {
                if (isCurrent || isCompleted) onStartDay(day);
              }}
              className={btnClass}
            >
              <span className="text-lg">{t.day} {day}</span>
              {deckInfo?.title && (
                <span className="text-[0.65rem] opacity-80 mt-1 uppercase tracking-wider leading-tight">
                  {groupTitle}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default KanaDeck;