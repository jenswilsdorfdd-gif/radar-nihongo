export const radarData = {
    // TAG 1: DAS ORTUNGS-MUSTER (10 diverse Survival-Szenarien)
    1: {
      scenarios: [
        {
          context: "Sie irren durch ein gigantisches Kaufhaus in Tokio und müssen dringend auf die Toilette.",
          physicalAction: "Hand heben (Aufmerksamkeit erregen).",
          userTask: "Sprechen Sie eine Reinigungskraft an und fragen Sie nach der Toilette.",
          vocabHint: "Toilette = トイレ",
          userSpeech: "トイレは どこですか？",
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
          context: "Sie haben sich am Flughafen verlaufen und brauchen eine Bahn-Anbindung.",
          physicalAction: "Blicken Sie sich suchend im Raum um.",
          userTask: "Stoppen Sie einen Passanten und fragen Sie nach dem Bahnhof.",
          vocabHint: "Bahnhof = 駅{えき}",
          userSpeech: "駅{えき}は どこですか？",
          npcReply: "しんごうを 左{ひだり} に まがってください。",
          keyword: "左{ひだり}",
          options: [
            "右{みぎ} (Rechts)",
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 2,
          npcTranslation: "Biegen Sie an der Ampel links ab."
        },
        {
          context: "Sie sind am Bahnhof angekommen, haben aber noch keine Fahrkarte.",
          physicalAction: "Formen Sie mit den Händen ein kleines Rechteck.",
          userTask: "Fragen Sie den Schalterbeamten nach dem Ticket(büro).",
          vocabHint: "Ticket / Fahrkarte = 切符{きっぷ}",
          userSpeech: "切符{きっぷ}は どこですか？",
          npcReply: "きっぷうりば は、まっすぐ いくと あります。",
          keyword: "まっすぐ",
          options: [
            "左{ひだり} (Links)",
            "右{みぎ} (Rechts)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 2,
          npcTranslation: "Der Ticketverkauf ist, wenn Sie geradeaus gehen."
        },
        {
          context: "Sie betreten die Hotel-Lobby mit schwerem Gepäck und suchen den Check-In.",
          physicalAction: "Körper leicht nach vorne neigen.",
          userTask: "Fragen Sie einen Pagen nach der Rezeption (Front Desk).",
          vocabHint: "Rezeption = フロント",
          userSpeech: "フロントは どこですか？",
          npcReply: "フロントは、エントランスの 右{みぎ} に ございます。",
          keyword: "右{みぎ}",
          options: [
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 0,
          npcTranslation: "Die Rezeption befindet sich rechts vom Eingang."
        },
        {
          context: "Es ist ein Notfall, Sie haben sich verletzt.",
          physicalAction: "Auf der Stelle trippeln, dringend gucken.",
          userTask: "Sprechen Sie einen Polizisten an und fragen nach dem Krankenhaus.",
          vocabHint: "Krankenhaus = 病院{びょういん}",
          userSpeech: "病院{びょういん}は どこですか？",
          npcReply: "びょういん ですね。この みちを まっすぐ です。",
          keyword: "まっすぐ",
          options: [
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 0,
          npcTranslation: "Das Krankenhaus. Das ist auf dieser Straße geradeaus."
        },
        {
          context: "Sie verlassen das Hotel und brauchen einen Wagen.",
          physicalAction: "Zeigefinger fragend heben.",
          userTask: "Fragen Sie den Portier nach dem Taxi(-Stand).",
          vocabHint: "Taxi = タクシー",
          userSpeech: "タクシーは どこですか？",
          npcReply: "タクシーのりば は、でぐちの 左{ひだり} です。",
          keyword: "左{ひだり}",
          options: [
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 0,
          npcTranslation: "Der Taxistand ist links vom Ausgang."
        },
        {
          context: "Sie haben Hunger und suchen im Kaufhaus die Fressmeile.",
          physicalAction: "Hand auf den Magen legen.",
          userTask: "Fragen Sie an der Information nach dem Restaurant.",
          vocabHint: "Restaurant = レストラン",
          userSpeech: "レストランは どこですか？",
          npcReply: "レストランですか？ かいだんの 右{みぎ} に なります。",
          keyword: "右{みぎ}",
          options: [
            "右{みぎ} (Rechts)",
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 0,
          npcTranslation: "Ein Restaurant? Das befindet sich rechts von der Treppe."
        },
        {
          context: "Sie haben einen schweren Koffer und können die Rolltreppe nicht nutzen.",
          physicalAction: "Drehen Sie sich einmal im Kreis.",
          userTask: "Fragen Sie einen Passanten nach dem Aufzug (Elevator).",
          vocabHint: "Aufzug = エレベーター",
          userSpeech: "エレベーターは どこですか？",
          npcReply: "エレベーターは、そこの かどを 左{ひだり} です。",
          keyword: "左{ひだり}",
          options: [
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 2,
          npcTranslation: "Der Aufzug ist dort an der Ecke nach links."
        },
        {
          context: "Sie wollen in einem Shop bar bezahlen, haben aber kein Bargeld mehr.",
          physicalAction: "Tippen Sie jemandem imaginär auf die Schulter.",
          userTask: "Fragen Sie das Personal nach dem Geldautomaten (ATM).",
          vocabHint: "Geldautomat = ATM{エーティーエム}",
          userSpeech: "ATM{エーティーエム}は どこですか？",
          npcReply: "ATMは おくです。 まっすぐ いってください。",
          keyword: "まっすぐ",
          options: [
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 0,
          npcTranslation: "Der Geldautomat ist hinten. Bitte gehen Sie geradeaus."
        },
        {
          context: "Es ist spät nachts, Sie brauchen dringend Wasser und Snacks.",
          physicalAction: "Hände leicht anspannen, fokussiert blicken.",
          userTask: "Fragen Sie jemanden auf der Straße nach dem Convenience Store (Konbini).",
          vocabHint: "Convenience Store = コンビニ",
          userSpeech: "コンビニは どこですか？",
          npcReply: "コンビニなら、すぐ そこです！ 右{みぎ} に あります！",
          keyword: "右{みぎ}",
          options: [
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 2,
          npcTranslation: "Ein Konbini ist gleich da vorne! Es ist auf der rechten Seite!"
        }
      ]
    },
  
    // TAG 2: RICHTUNGEN VERSTEHEN
    2: {
      scenarios: [
        {
          context: "Sie fragen nach dem Weg zum Shinjuku-Bahnhof.",
          physicalAction: "Auf der Stelle gehen und sofort stoppen.",
          userTask: "Wie fragen Sie nach dem Weg?",
          vocabHint: "Shinjuku-Bahnhof = 新宿駅{しんじゅくえき}",
          userSpeech: "新宿駅{しんじゅくえき}は、どこですか？",
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
          vocabHint: "Rechts = 右{みぎ}",
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
      ]
    },
    
    // TAG 3: EXISTENZ & RESTAURANT
    3: {
      scenarios: [
        {
          context: "Sie betreten ein Café und brauchen dringend Internet.",
          physicalAction: "Hände leicht auf den Tisch stützen (wie an der Rezeption).",
          userTask: "Fragen Sie an der Kasse nach WLAN.",
          vocabHint: "WLAN = ワイファイ",
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
          vocabHint: "Zuhören!",
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
    }
  };