export const radarData = {
    // TAG 1: DAS ORTUNGS-MUSTER
    1: [
      {
        context: "Sie irren durch ein gigantisches Kaufhaus in Tokio und müssen dringend auf die Toilette.",
        physicalAction: "Hand heben (Aufmerksamkeit erregen).",
        userTask: "Sprechen Sie eine Reinigungskraft an und fragen Sie nach der Toilette.",
        userSpeech: "すみません、トイレは どこですか？",
        npcReply: "トイレですか？ あそこの 右{みぎ} です。",
        keyword: "右{みぎ}",
        options: [
          "まっすぐ (Geradeaus)",
          "右{みぎ} (Rechts)",
          "左{ひだり} (Links)"
        ],
        correctIndex: 1,
        npcTranslation: "Die Toilette? Die ist dort drüben rechts."
      },
      {
        context: "Sie haben sich komplett verlaufen und brauchen eine Bahn-Anbindung.",
        physicalAction: "Blicken Sie sich suchend im Raum um.",
        userTask: "Stoppen Sie einen Passanten und fragen Sie nach dem Bahnhof.",
        userSpeech: "えきは どこですか？",
        npcReply: "しんごうを 左{ひだり} に まがってください。",
        keyword: "左{ひだり}",
        options: [
          "右{みぎ} (Rechts)",
          "まっすぐ (Geradeaus)",
          "左{ひだり} (Links)"
        ],
        correctIndex: 2,
        npcTranslation: "Biegen Sie an der Ampel links ab."
      }
    ],
  
    // TAG 2: RICHTUNGEN VERSTEHEN
    2: [
      {
        context: "Sie fragen nach dem Weg zum Shinjuku-Bahnhof.",
        physicalAction: "Auf der Stelle gehen und sofort stoppen.",
        userTask: "Wie fragen Sie nach dem Weg?",
        userSpeech: "しんじゅくえきは、どこですか？",
        npcReply: "まっすぐ いくと、えきがあります。",
        keyword: "まっすぐ",
        options: [
          "まっすぐ (Geradeaus)",
          "右{みぎ} (Rechts)",
          "左{ひだり} (Links)"
        ],
        correctIndex: 0,
        npcTranslation: "Wenn Sie geradeaus gehen, kommt dort der Bahnhof."
      },
      {
        context: "Der Taxifahrer fragt Sie nach der Richtung an der nächsten Kreuzung.",
        physicalAction: "Zeichnen Sie 'みぎ' groß in die Luft und werfen Sie den rechten Arm nach rechts.",
        userTask: "Sagen Sie ihm: 'Rechts, bitte.'",
        userSpeech: "右{みぎ}、おねがいします。",
        npcReply: "はい、かしこまりました。右{みぎ} ですね。",
        keyword: "右{みぎ}",
        options: [
          "左{ひだり} (Links)",
          "まっすぐ (Geradeaus)",
          "右{みぎ} (Rechts)"
        ],
        correctIndex: 2,
        npcTranslation: "Ja, verstanden. Nach rechts also."
      }
    ],
    
    // TAG 3: EXISTENZ & RESTAURANT
    3: [
      {
        context: "Sie betreten ein Café und brauchen dringend Internet.",
        physicalAction: "Hände leicht auf den Tisch stützen (wie an der Rezeption).",
        userTask: "Fragen Sie an der Kasse nach WLAN.",
        userSpeech: "ワイファイは ありますか？",
        npcReply: "はい、あります。パスワードはこちらです。",
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
        physicalAction: "Körperhaltung aufrecht, still stehen und zuhören.",
        userTask: "Antworten Sie nicht, sondern hören Sie genau zu, was er fragt!",
        userSpeech: "...",
        npcReply: "いらっしゃいませ！ 何名様{なんめいさま} ですか？",
        keyword: "何名様{なんめいさま}",
        options: [
          "何名様{なんめいさま} (Wie viele Personen?)",
          "いくらですか (Wie viel kostet das?)",
          "どこですか (Wo ist das?)"
        ],
        correctIndex: 0,
        npcTranslation: "Willkommen! Für wie viele Personen?"
      }
    ]
  };