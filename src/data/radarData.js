export const radarData = {
    // TAG 1: DAS ORTUNGS-MUSTER
    1: [
      {
        context: "Sie irren durch ein gigantisches Kaufhaus in Tokio und müssen dringend auf die Toilette.",
        userTask: "Sprechen Sie eine Reinigungskraft an und fragen Sie nach der Toilette.",
        userSpeech: "すみません、トイレはどこですか？",
        userRomaji: "Sumimasen, toire wa doko desu ka?",
        npcReply: "トイレですか？ あそこの みぎ です。",
        npcRomaji: "Toire desu ka? Asoko no migi desu.",
        keyword: "みぎ",
        options: [
          "まっすぐ (Geradeaus)",
          "みぎ (Rechts)",
          "ひだり (Links)"
        ],
        correctIndex: 1,
        npcTranslation: "Die Toilette? Die ist dort drüben rechts."
      },
      {
        context: "Sie haben sich komplett verlaufen und brauchen eine Bahn-Anbindung.",
        userTask: "Stoppen Sie einen Passanten und fragen Sie nach dem Bahnhof.",
        userSpeech: "えきはどこですか？",
        userRomaji: "Eki wa doko desu ka?",
        npcReply: "しんごうを ひだり に まがってください。",
        npcRomaji: "Shingou o hidari ni magatte kudasai.",
        keyword: "ひだり",
        options: [
          "みぎ (Rechts)",
          "まっすぐ (Geradeaus)",
          "ひだり (Links)"
        ],
        correctIndex: 2,
        npcTranslation: "Biegen Sie an der Ampel links ab."
      }
    ],
  
    // TAG 2: RICHTUNGEN VERSTEHEN
    2: [
      {
        context: "Sie fragen nach dem Weg zum Shinjuku-Bahnhof.",
        userTask: "Wie fragen Sie nach dem Weg?",
        userSpeech: "しんじゅくえきは、どこですか？",
        userRomaji: "Shinjuku-eki wa, doko desu ka?",
        npcReply: "まっすぐ いくと、えきがあります。",
        npcRomaji: "Massugu iku to, eki ga arimasu.",
        keyword: "まっすぐ",
        options: [
          "まっすぐ (Geradeaus)",
          "みぎ (Rechts)",
          "ひだり (Links)"
        ],
        correctIndex: 0,
        npcTranslation: "Wenn Sie geradeaus gehen, kommt dort der Bahnhof."
      },
      {
        context: "Der Taxifahrer fragt Sie nach der Richtung an der nächsten Kreuzung.",
        userTask: "Sagen Sie ihm: 'Rechts, bitte.'",
        userSpeech: "みぎ、おねがいします。",
        userRomaji: "Migi, onegaishimasu.",
        npcReply: "はい、かしこまりました。みぎ ですね。",
        npcRomaji: "Hai, kashikomarimashita. Migi desu ne.",
        keyword: "みぎ",
        options: [
          "ひだり (Links)",
          "まっすぐ (Geradeaus)",
          "みぎ (Rechts)"
        ],
        correctIndex: 2,
        npcTranslation: "Ja, verstanden. Nach rechts also."
      }
    ],
    
    // TAG 3: EXISTENZ & RESTAURANT
    3: [
      {
        context: "Sie betreten ein Café und brauchen dringend Internet.",
        userTask: "Fragen Sie an der Kasse nach WLAN.",
        userSpeech: "ワイファイはありますか？",
        userRomaji: "Waifai wa arimasu ka?",
        npcReply: "はい、あります。パスワードはこちらです。",
        npcRomaji: "Hai, arimasu. Pasuwaado wa kochira desu.",
        keyword: "あります",
        options: [
          "ありません (Gibt es nicht)",
          "あります (Ja, gibt es)",
          "わかりません (Weiß ich nicht)"
        ],
        correctIndex: 1,
        npcTranslation: "Ja, haben wir. Das Passwort ist hier."
      },
      {
        context: "Sie betreten ein Restaurant. Der Kellner begrüßt Sie herzlich.",
        userTask: "Antworten Sie nicht, sondern hören Sie genau zu, was er fragt!",
        userSpeech: "(Zuhören)",
        userRomaji: "-",
        npcReply: "いらっしゃいませ！ なんめいさまですか？",
        npcRomaji: "Irasshaimase! Nanmei-sama desu ka?",
        keyword: "なんめいさま",
        options: [
          "なんめいさま (Wie viele Personen?)",
          "いくらですか (Wie viel kostet das?)",
          "どこですか (Wo ist das?)"
        ],
        correctIndex: 0,
        npcTranslation: "Willkommen! Für wie viele Personen?"
      }
    ]
  };