import React, { useState, useEffect } from 'react';
import { kanaData } from '../data/kanaData';
import { dePhonetikData } from '../data/dePhonetikData';
import DrawCanvas from './DrawCanvas'; 

const KanaCard = ({ day, mode, onBack, language, targetLanguage = 'jp' }) => {
  const isGermanTarget = targetLanguage === 'de';
  const activeDataSource = isGermanTarget ? dePhonetikData : kanaData;
  const deckInfo = activeDataSource[day];
  
  const [queue, setQueue] = useState(() => {
    return deckInfo && deckInfo.cards ? [...deckInfo.cards] : [];
  });
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const currentCharacter = queue[0];
  const isWriteMode = mode === 'write';

  const [customMnemonics, setCustomMnemonics] = useState(() => {
    const saved = localStorage.getItem('customKanaMnemonics');
    return saved ? JSON.parse(saved) : {};
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const currentLang = language || 'de';

  const texts = {
    de: {
      back: "Deck",
      read: isGermanTarget ? "Lautbildung" : "Lesen",
      write: isGermanTarget ? "V2-Code" : "Schreiben",
      day: "Tag",
      remaining: "Übrig:",
      noteLabel: isGermanTarget ? "Trainer-Notiz (Phonetik):" : "Trainer-Notiz:",
      drawPrompt: isGermanTarget ? "Audio abspielen & Lautform einprägen:" : "Audio abspielen & Zeichnen:",
      listenAction: "Wort anhören",
      tip: "Bedeutung:",
      clickToReveal: "Klicken zum Aufdecken",
      mnemonicLabel: isGermanTarget ? "Physische Mundstellung" : "Eselsbrücke",
      placeholder: "Deine eigene Notiz...",
      cancel: "Abbrechen",
      save: "Speichern",
      again: "Nochmal",
      gotIt: "Sitzt",
      errorMsg: "Keine Daten gefunden.",
      finishTitle: "Mission Abgeschlossen",
      finishSub: "Tagesziel erreicht!",
      
      finishFinalReadTitle: isGermanTarget ? "Lautbildung Komplett!" : "Kana Lesen Komplett!",
      finishFinalReadSub: isGermanTarget ? "14 Tage Phonetik gemeistert! 🏆" : "Wahnsinn! 🏆 14 Tage eisern geblieben.",
      finishFinalReadDesc: isGermanTarget 
        ? "Deine Mundmuskeln und dein Gehör sind auf Standard-Hochdeutsch kalibriert. Wiederhole alte Decks jederzeit nach Bedarf!"
        : "Dein Auge ist geschärft. Du kannst jederzeit alte Decks wiederholen, falls du merkst, dass du etwas hängst. Und vergiss nicht: Hol dir auf TikTok oder Insta deine tägliche Dosis Tokio-Vibes ab! Auf zur Schreib-Mission!",
      finishFinalReadNext: isGermanTarget ? "Weiter zu Phase 1 (V2-Code) →" : "Weiter zu Phase 1 (Schreiben) →",
      
      finishFinalWriteTitle: isGermanTarget ? "V2-Code Komplett!" : "Kana Schreiben Komplett!",
      finishFinalWriteSub: "Phase 1: ABGESCHLOSSEN! 🎖️",
      finishFinalWriteDesc: isGermanTarget
        ? "Fundament gegossen! Die Verb-Zweit-Regel sitzt blind. Bereit für die Signal-Bausteine?"
        : "Fundament gegossen! Du kennst die Zeichen jetzt blind. Komm jederzeit für ein Warm-Up zurück. Bereit für den echten Einsatz? Folge uns auf Insta für den täglichen Boost und dann ab in den Partikel-Code!",
      finishFinalWriteNext: isGermanTarget ? "Weiter zu den Signal-Bausteinen 🔑" : "Weiter zum Partikel-Code 🔑",
      
      backToMenu: "Zurück zum Deck",

      motivations: {
        1: "Tag 1 im Kasten! Ein starker Anfang. Dein Gehirn verknüpft gerade völlig neue Muster. Ruh dich kurz aus!",
        2: "Saubere Arbeit an Tag 2! Die Laute werden vertrauter. Du bist auf dem absolut richtigen Weg. Dranbleiben!",
        3: "Tag 3 geschafft! Wiederholung ist der Schlüssel. Lass dich nicht entmutigen!",
        4: "Tag 4 im Sack! Du baust dir gerade ein solides Fundament auf. Gönn dir eine kurze Pause!",
        5: "Fünf Tage durchgezogen! Respekt! Merkst du, wie es langsam 'Klick' macht?",
        6: "Tag 6 gemeistert! Sehr stark! Sprache lernen ist ein Marathon, kein Sprint.",
        7: "Halbzeit der Phase 1! Tag 7 ist durch. Feier diesen kleinen Meilenstein!",
        8: "Tag 8 erledigt! Zungenstellung und Rhythmus sitzen immer sicherer.",
        9: "Tag 9 im Kasten! Du bist voll im Flow!",
        10: "Zweistellig! Tag 10! Darauf kannst du stolz sein.",
        11: "Tag 11 ist Geschichte! Die Zielgerade von Phase 1 rückt in Sicht.",
        12: "Tag 12 abgehakt! Du hast schon so viele Muster in deinem Arsenal.",
        13: "Tag 13 geschafft! Nur noch ein Tag bis zum Boss-Level. Sammel deine Kräfte!"
      }
    },
    en: {
      back: "Deck",
      read: isGermanTarget ? "Phonetics" : "Read",
      write: isGermanTarget ? "V2 Structure" : "Write",
      day: "Day",
      remaining: "Remaining:",
      noteLabel: isGermanTarget ? "Trainer Note (Phonetics):" : "Trainer Note:",
      drawPrompt: isGermanTarget ? "Play audio & memorize sound pattern:" : "Play audio & draw:",
      listenAction: "Listen to word",
      tip: "Meaning:",
      clickToReveal: "Click to reveal",
      mnemonicLabel: isGermanTarget ? "Mouth Articulation" : "Mnemonic",
      placeholder: "Your own notes...",
      cancel: "Cancel",
      save: "Save",
      again: "Again",
      gotIt: "Got it",
      errorMsg: "No data found.",
      finishTitle: "Mission Completed",
      finishSub: "Daily goal reached!",
      
      finishFinalReadTitle: isGermanTarget ? "Phonetics Complete!" : "Kana Reading Complete!",
      finishFinalReadSub: isGermanTarget ? "14 Days of Phonetics mastered! 🏆" : "Amazing! 🏆 14 days going strong.",
      finishFinalReadDesc: isGermanTarget
        ? "Your articulation and auditory perception are now calibrated to Standard German."
        : "Your eyes are sharp. You can always repeat old decks if you feel stuck.",
      finishFinalReadNext: isGermanTarget ? "Continue to Phase 1 (V2 Structure) →" : "Continue to Phase 1 (Write) →",
      
      finishFinalWriteTitle: isGermanTarget ? "V2 Structure Complete!" : "Kana Writing Complete!",
      finishFinalWriteSub: "Phase 1: COMPLETED! 🎖️",
      finishFinalWriteDesc: isGermanTarget
        ? "Foundation built! Verb-second rule is locked in. Ready for Signal Chunks?"
        : "Foundation built! You know the characters blindly now.",
      finishFinalWriteNext: isGermanTarget ? "Continue to Signal Chunks 🔑" : "Continue to Particle Code 🔑",
      
      backToMenu: "Back to Deck",

      motivations: {
        1: "Day 1 in the books! A strong start. Keep it up!",
        2: "Great work on Day 2! The patterns are getting familiar.",
        3: "Day 3 complete! Repetition is key.",
        4: "Day 4 in the bag! Solid foundation built.",
        5: "Five days straight! Respect!",
        6: "Day 6 mastered! Exactly the right discipline.",
        7: "Halfway through Phase 1! Celebrate this milestone!",
        8: "Day 8 done! Articulation is getting cleaner.",
        9: "Day 9 in the box! You are totally in the flow.",
        10: "Double digits! Day 10! You can be proud.",
        11: "Day 11 is history! The home stretch is in sight.",
        12: "Day 12 checked off! Trust the process.",
        13: "Day 13 done! Gather your strength for the finale!"
      }
    },
    jpn: {
      back: "デッキ一覧",
      read: isGermanTarget ? "調音発音" : "読む",
      write: isGermanTarget ? "V2構文" : "書く",
      day: "日目",
      remaining: "残り:",
      noteLabel: isGermanTarget ? "調音筋肉指導メモ:" : "トレーナーノート:",
      drawPrompt: isGermanTarget ? "音声を再生して調音点を確認:" : "音声を再生して書く:",
      listenAction: "単語の音声を聴く",
      tip: "意味:",
      clickToReveal: "タップして解説を表示",
      mnemonicLabel: isGermanTarget ? "物理的調音ポイント・口腔指示" : "記憶のEselsbrücke",
      placeholder: "自分だけの覚え方メモ...",
      cancel: "キャンセル",
      save: "保存",
      again: "もう一度",
      gotIt: "習得完了",
      errorMsg: "データが見つかりません。",
      finishTitle: "ミッション完了",
      finishSub: "本日の目標を達成しました！",
      
      finishFinalReadTitle: isGermanTarget ? "発音矯正カリキュラム完了！" : "仮名読み取り完了！",
      finishFinalReadSub: isGermanTarget ? "14日間の調音筋トレ達成！🏆" : "14日間やり切りました！🏆",
      finishFinalReadDesc: isGermanTarget
        ? "喉の奥、舌の位置、唇の突き出しが標準ドイツ語仕様に再配線されました。いつでも復習可能です！"
        : "視覚的な文字認識が完成しました。いつでも復習に戻れます。",
      finishFinalReadNext: isGermanTarget ? "フェーズ 1 (定動詞第2位コード) へ進む →" : "フェーズ 1 (書く) へ進む →",
      
      finishFinalWriteTitle: isGermanTarget ? "V2構文コード完了！" : "仮名筆記完了！",
      finishFinalWriteSub: "フェーズ 1: 完全クリア！🎖️",
      finishFinalWriteDesc: isGermanTarget
        ? "強固な土台が完成しました！定動詞第2位と倒置構文が自動化されました。次はシグナル・パーツへ！"
        : "文字が完全に定着しました。次は助詞コードへ進みましょう！",
      finishFinalWriteNext: isGermanTarget ? "6大シグナル・パーツへ進む 🔑" : "助詞コードへ進む 🔑",
      
      backToMenu: "デッキ一覧へ戻る",

      motivations: {
        1: "1日目クリア！⛩️ 素晴らしいスタートです。脳が新しい音響パターンを形成しています。",
        2: "2日目完了！🔥 音の響きが耳に馴染んできました。その調子です！",
        3: "3日目達成！🎯 反復こそが言語習得の鍵です。焦らず継続しましょう！",
        4: "4日目クリア！⚡️️ 確固たる基礎が築かれています。少し休んで次に備えましょう！",
        5: "5日間継続！🏆 素晴らしい集中力です。発音のコツが掴めてきましたか？",
        6: "6日目マスター！🥋 言語習得はマラソンです。正しい規律が身についています。",
        7: "フェーズ1の前半戦クリア！🎌 7日目完了。この小さなマイルストーンを祝いましょう！",
        8: "8日目完了！🔋 舌の筋肉のコントロールが劇的に正確になっています。",
        9: "9日目クリア！🚀 脳がドイツ語の音響体系に慣れてきました。完璧なフローです！",
        10: "ついに2桁、10日目！🎉 誇りに思ってください。大半の学習者がここで脱落します。",
        11: "11日目達成！⚔️ ゴールラインが見えてきました。集中を維持しましょう。",
        12: "12日目クリア！🛡️ 膨大な音のストックが頭の中に出来上がっています。",
        13: "13日目完了！⏳ あと1日で第1フェーズ完全制覇です。最終日に備えて力を蓄えましょう！"
      }
    }
  };

  const t = texts[currentLang] || texts.de;

  const displayMnemonic = currentCharacter ? (customMnemonics[currentCharacter.kana] || currentCharacter.mnemonic) : "";

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(displayMnemonic || '');
  };

  const handleSaveMnemonic = (e) => {
    e.stopPropagation();
    const newMnemonics = { ...customMnemonics };
    
    if (editValue.trim() === '') {
      delete newMnemonics[currentCharacter.kana];
    } else {
      newMnemonics[currentCharacter.kana] = editValue;
    }
    
    setCustomMnemonics(newMnemonics);
    localStorage.setItem('customKanaMnemonics', JSON.stringify(newMnemonics));
    setIsEditing(false);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  // Sprachsynthese: Schaltet dynamisch auf Deutsch bei targetLanguage === 'de'
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // IPA-Klammern und Formatierungen entfernen für reine Aussprache
      const cleanText = text.replace(/\[.*?\]/g, '').replace(/[\/\(\)]/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText || text);
      utterance.lang = isGermanTarget ? 'de-DE' : 'ja-JP';
      utterance.rate = isGermanTarget ? 0.88 : 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    if (!isFlipped && !isWriteMode) {
      setIsFlipped(true);
      playAudio(currentCharacter.vocab || currentCharacter.kana);
    }
  };

  const handleNextCard = (success) => {
    setIsEditing(false); 
    if (success) {
      if (queue.length <= 1) {
        setIsFinished(true); 
      } else {
        setQueue(prev => prev.slice(1));
        setIsFlipped(false);
      }
    } else {
      setQueue(prev => [...prev.slice(1), prev[0]]);
      setIsFlipped(false);
    }
  };

  // --- END SCREENS MIT MOTIVATION ---
  if (isFinished) {
    if (day === 14) {
      if (!isWriteMode) {
        return (
          <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-24 h-24 bg-green-900/30 border-4 border-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">👁️</div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalReadTitle}</h1>
            <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalReadSub}</h2>
            <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
              {t.finishFinalReadDesc}
            </p>
            <div className="w-full max-w-sm space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 uppercase tracking-widest active:scale-95 transition-all">
                {t.finishFinalReadNext}
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
            <div className="w-24 h-24 bg-blue-900/30 border-4 border-blue-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(59,130,246,0.4)]">✍️</div>
            <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishFinalWriteTitle}</h1>
            <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishFinalWriteSub}</h2>
            <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
              {t.finishFinalWriteDesc}
            </p>
            <div className="w-full max-w-sm space-y-4">
              <button onClick={onBack} className="w-full py-5 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 uppercase tracking-widest active:scale-95 transition-all">
                {t.finishFinalWriteNext}
              </button>
            </div>
          </div>
        );
      }
    }

    const dailyMotivation = t.motivations[day] || t.motivations[1];

    return (
      <div className="flex-1 w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center animate-fade-in">
        <div className="w-20 h-20 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">✓</div>
        <h1 className="text-3xl font-extrabold text-white tracking-widest uppercase mb-2 text-center">{t.finishTitle}</h1>
        <h2 className="text-green-400 font-bold tracking-widest uppercase mb-4 text-center">{t.finishSub}</h2>
        <p className="text-gray-300 text-sm text-center max-w-sm mb-12 leading-relaxed px-4">
          {dailyMotivation}
        </p>
        <button onClick={onBack} className="w-full max-w-sm py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-white shadow-lg uppercase tracking-widest active:scale-95 transition-all">
          {t.backToMenu}
        </button>
      </div>
    );
  }

  if (!currentCharacter) {
    return <div className="text-white text-center mt-20">{t.errorMsg}</div>;
  }

  return (
    <div className="flex-1 w-full max-w-full bg-gray-900 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 sm:px-6 flex justify-between items-center z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-bold">
          &larr; {t.back}
        </button>
        <span className="text-gray-400 text-xs sm:text-sm tracking-widest uppercase bg-gray-800 px-3 py-1 rounded-full">
          {isWriteMode ? t.write : t.read}
        </span>
        <span className={`${isWriteMode ? 'text-blue-500' : 'text-green-500'} text-xs sm:text-sm font-bold`}>
          {t.day} {day} | {t.remaining} {queue.length}
        </span>
      </div>

      <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto mt-12 mb-4">
        {deckInfo?.note && (
          <div className="bg-blue-900/40 border border-blue-500/50 p-4 rounded-xl text-sm text-blue-200 shadow-lg mb-4">
            <strong className="text-blue-400 block mb-1 uppercase tracking-wider text-xs">💡 {t.noteLabel}</strong> 
            {deckInfo.note}
          </div>
        )}
      </div>

      {isWriteMode ? (
        <div className="w-full max-w-[20rem] sm:max-w-sm mx-auto flex flex-col items-center">
          <div className="text-center mb-6 w-full">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">{t.drawPrompt}</p>
            
            <div className="flex flex-col items-center justify-center gap-3 mb-2">
              <button 
                onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.vocab || currentCharacter.kana); }}
                className="w-20 h-20 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-full flex items-center justify-center text-4xl transition-all shadow-lg active:scale-90 border border-blue-500/30"
              >
                🔊
              </button>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{t.listenAction}</p>
            </div>

            {currentCharacter.vocab && (
              <p className="text-blue-400 text-sm font-medium mt-4">{t.tip} {currentCharacter.vocabMeaning}</p>
            )}
          </div>
          
          <div className="w-full">
            <DrawCanvas character={currentCharacter.kana} onResult={handleNextCard} />
          </div>
        </div>
      ) : (
        <>
          <div 
            className={`w-full max-w-[20rem] sm:max-w-sm min-h-[24rem] mx-auto rounded-3xl shadow-2xl flex flex-col items-center p-6 sm:p-8 cursor-pointer transition-all ${isFlipped ? 'bg-gray-800 border-t-4 border-blue-500/50 justify-start' : 'bg-gray-800 border-b-4 border-green-500/50 justify-center active:scale-95'}`}
            onClick={!isFlipped ? handleFlip : undefined}
          >
            {!isFlipped ? (
              <div className="flex flex-col items-center text-center px-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-wide mb-4 leading-tight">
                  {currentCharacter.kana}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-widest">{t.clickToReveal}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center w-full h-full overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h2 className="text-4xl font-bold text-green-400 mb-1">{currentCharacter.kana}</h2>
                  <span className="text-gray-400 text-lg uppercase tracking-widest">{currentCharacter.romaji}</span>
                </div>
                
                {(displayMnemonic || isEditing) && (
                  <div className="w-full bg-blue-900/30 border border-blue-500/40 rounded-xl p-3 mb-4 text-center">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-6"></div> 
                      <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">
                        {t.mnemonicLabel}
                      </p>
                      {!isEditing ? (
                        <button 
                          onClick={handleEditClick} 
                          className="w-6 h-6 flex items-center justify-center bg-gray-700/50 hover:bg-gray-600 rounded-md transition-colors"
                          title="Eigene Notiz eintragen"
                        >
                          ✏️
                        </button>
                      ) : (
                        <div className="w-6"></div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex flex-col gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-gray-900 text-white text-sm p-3 rounded-lg border border-blue-500/50 focus:border-blue-400 focus:outline-none resize-none leading-relaxed"
                          rows="3"
                          placeholder={t.placeholder}
                        />
                        <div className="flex justify-end gap-2 mt-1">
                          <button onClick={handleCancelEdit} className="text-xs px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 font-bold transition-colors">{t.cancel}</button>
                          <button onClick={handleSaveMnemonic} className="text-xs px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold transition-colors shadow-lg">{t.save}</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-200 text-sm font-medium italic leading-relaxed px-1">
                        "{displayMnemonic}"
                      </p>
                    )}
                  </div>
                )}
                
                {currentCharacter.vocab && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-2">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <p className="text-xl font-bold text-white whitespace-nowrap">{currentCharacter.vocab}</p>
                      <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.vocab); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full active:scale-90 transition-transform">🔊</button>
                    </div>
                    <p className="text-sm text-yellow-400 font-medium mt-1 break-words">{currentCharacter.vocabMeaning}</p>
                  </div>
                )}
                
                {currentCharacter.sentence && (
                  <div className="w-full border-t border-gray-700 pt-4 mt-4">
                    <div className="flex flex-col items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base font-bold text-white leading-relaxed text-center break-keep" style={{ wordBreak: 'keep-all' }}>{currentCharacter.sentence}</p>
                        <button onClick={(e) => { e.stopPropagation(); playAudio(currentCharacter.sentence); }} className="text-blue-400 hover:text-blue-300 bg-blue-500/10 p-2 rounded-full flex-shrink-0 active:scale-90 transition-transform">🔊</button>
                      </div>
                    </div>
                    <p className="text-xs text-blue-300 font-medium italic mt-1 break-words">"{currentCharacter.sentenceTranslation}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={`w-full max-w-[20rem] sm:max-w-sm mt-8 mx-auto grid grid-cols-2 gap-4 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-red-400 active:scale-95 transition-all shadow-lg" onClick={(e) => { e.stopPropagation(); handleNextCard(false); }}>{t.again}</button>
            <button className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-green-400 active:scale-95 transition-all shadow-lg" onClick={(e) => { e.stopPropagation(); handleNextCard(true); }}>{t.gotIt}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default KanaCard;