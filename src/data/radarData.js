export const radarData = {
    // TAG 1: DAS ORTUNGS-MUSTER
    1: {
      morningRoutine: "ZIEL: 15 MINUTEN REALITÄTS-TRANSFER\n\nBLOCK 1: Kaltstart am Spiegel (5 Min)\nStellen Sie sich nach dem Aufstehen vor den Spiegel. Blicken Sie sich in die Augen. Feuern Sie 10x entschlossen ab: 'えきは どこですか？' und 10x 'トイレは どこですか？'. Achten Sie auf die Sprachmelodie.\n\nBLOCK 2: Mentale Eskalation (5 Min)\nStellen Sie sich vor, Sie stehen im Bahnhof Shinjuku. Fragen Sie in Gedanken 5 verschiedene fiktive Passanten nach dem Weg zu verschiedenen Orten.\n\nBLOCK 3: Alltags-Verknüpfung (5 Min)\nJedes Mal, wenn Sie heute durch eine Tür gehen, tippen Sie auf den Türrahmen und fragen den Rahmen laut auf Japanisch, wo der Bahnhof ist.",
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
      morningRoutine: "ZIEL: 15 MINUTEN RICHTUNGS-TRANSFER\n\nBLOCK 1: Motorisches Erwachen (5 Min)\nStehen Sie auf. Werfen Sie den rechten Arm hart zur Seite und rufen Sie 'みぎ!'. Dann links: 'ひだり!'. Machen Sie Ausfallschritte nach vorn: 'まっすぐ!'. (Jeweils 10 Wiederholungen im schnellen Wechsel).\n\nBLOCK 2: Der Weg durch den Tag (10 Min)\nDieses Training findet draußen statt. Wenn Sie zur Arbeit fahren oder gehen: Jedes Mal, wenn Sie rechts abbiegen, sagen Sie hörbar 'みぎ'. Bei links 'ひだり'. Gehen Sie über eine Ampel, sagen Sie 'まっすぐ'.",
      scenarios: [
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
        },
        {
          context: "Sie sitzen in einem Bus und möchten dem Fahrer signalisieren, dass es geradeaus weitergeht.",
          physicalAction: "Machen Sie eine hackende Handbewegung nach vorn.",
          userTask: "Rufen Sie entschlossen: 'Geradeaus, bitte.'",
          vocabHint: "Geradeaus = まっすぐ",
          userSpeech: "まっすぐ、おねがいします。",
          npcReply: "つぎの しんごうも まっすぐ ですか？",
          keyword: "まっすぐ",
          options: [
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 0,
          npcTranslation: "An der nächsten Ampel auch geradeaus?"
        },
        {
          context: "Sie stehen an einer Abzweigung und zeigen dem Rikschafahrer den Weg.",
          physicalAction: "Werfen Sie den linken Arm hart nach links.",
          userTask: "Sagen Sie ihm: 'Links, bitte.'",
          vocabHint: "Links = 左{ひだり}",
          userSpeech: "左{ひだり}、おねがいします。",
          npcReply: "かしこまりました。この かどを 左{ひだり} に まがります。",
          keyword: "左{ひだり}",
          options: [
            "右{みぎ} (Rechts)",
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 2,
          npcTranslation: "Verstanden. Wir biegen an dieser Ecke nach links ab."
        },
        {
          context: "Sie fragen einen Passanten, wo der Shinjuku-Bahnhof ist. Achten Sie auf die Antwort!",
          physicalAction: "Zuhören und Richtung lokalisieren.",
          userTask: "Hören Sie sich die Antwort an.",
          vocabHint: "Bahnhof = 駅{えき}",
          userSpeech: "駅{えき}は どこですか？",
          npcReply: "しんじゅくえき ですか？ まっすぐ いくと あります。",
          keyword: "まっすぐ",
          options: [
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 0,
          npcTranslation: "Der Shinjuku-Bahnhof? Den finden Sie, wenn Sie geradeaus gehen."
        },
        {
          context: "Sie suchen das Ticketbüro. Die Reinigungskraft beschreibt den Weg.",
          physicalAction: "Zuhören und Richtung lokalisieren.",
          userTask: "Hören Sie sich die Antwort an.",
          vocabHint: "Ticket = 切符{きっぷ}",
          userSpeech: "切符{きっぷ}は どこですか？",
          npcReply: "きっぷうりば は、かいだんの 右{みぎ} です。",
          keyword: "右{みぎ}",
          options: [
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 2,
          npcTranslation: "Der Ticketverkauf ist rechts neben der Treppe."
        },
        {
          context: "Sie sitzen im Taxi und korrigieren den Fahrer. Sie müssen sofort links abbiegen.",
          physicalAction: "Mit der flachen Hand nach links deuten.",
          userTask: "Sagen Sie eindringlich: 'Links, bitte!'",
          vocabHint: "Links = 左{ひだり}",
          userSpeech: "左{ひだり}、おねがいします。",
          npcReply: "はい！ すぐ 左{ひだり} ですね。",
          keyword: "左{ひだり}",
          options: [
            "まっすぐ (Geradeaus)",
            "左{ひだり} (Links)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja! Sofort links, richtig."
        },
        {
          context: "Sie haben einen Koffer und suchen den Aufzug. Sie fragen den Hotelpagen.",
          physicalAction: "Zuhören und Richtung lokalisieren.",
          userTask: "Hören Sie sich die Antwort an.",
          vocabHint: "Aufzug = エレベーター",
          userSpeech: "エレベーターは どこですか？",
          npcReply: "エレベーターは、ロビーの 右{みぎ} に ございます。",
          keyword: "右{みぎ}",
          options: [
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 0,
          npcTranslation: "Der Aufzug befindet sich auf der rechten Seite der Lobby."
        },
        {
          context: "Sie dirigieren einen Uber-Fahrer durch eine enge Gasse.",
          physicalAction: "Arm nach vorn strecken.",
          userTask: "Sagen Sie: 'Geradeaus, bitte.'",
          vocabHint: "Geradeaus = まっすぐ",
          userSpeech: "まっすぐ、おねがいします。",
          npcReply: "この ほそい みちを まっすぐ ですか？",
          keyword: "まっすぐ",
          options: [
            "左{ひだり} (Links)",
            "右{みぎ} (Rechts)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 2,
          npcTranslation: "Diesen schmalen Weg geradeaus?"
        },
        {
          context: "Sie fragen einen Polizisten nach dem nächsten Krankenhaus.",
          physicalAction: "Zuhören und Richtung lokalisieren.",
          userTask: "Hören Sie sich die Antwort an.",
          vocabHint: "Krankenhaus = 病院{びょういん}",
          userSpeech: "病院{びょういん}は どこですか？",
          npcReply: "つぎの しんごうを 左{ひだり} です。",
          keyword: "左{ひだり}",
          options: [
            "まっすぐ (Geradeaus)",
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)"
          ],
          correctIndex: 2,
          npcTranslation: "An der nächsten Ampel links."
        },
        {
          context: "Mitten in der Kreuzung von Shibuya werden Sie gefragt, wo Ihr Hotel liegt.",
          physicalAction: "Daumen nach rechts zeigen.",
          userTask: "Antworten Sie nur mit der Richtung: 'Rechts, bitte.'",
          vocabHint: "Rechts = 右{みぎ}",
          userSpeech: "右{みぎ}、おねがいします。",
          npcReply: "はい、右{みぎ} の ほうですね。",
          keyword: "右{みぎ}",
          options: [
            "右{みぎ} (Rechts)",
            "左{ひだり} (Links)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, in die rechte Richtung."
        }
      ]
    },
    
    // TAG 3: EXISTENZ & RESTAURANT
    3: {
      morningRoutine: "ZIEL: 15 MINUTEN EXISTENZ-ABFRAGE\n\nBLOCK 1: Kaltstart im Alltag (10 Min)\nGehen Sie durch Ihre Wohnung. Öffnen Sie den Kühlschrank. Zeigen Sie auf die Milch und fragen Sie den Kühlschrank laut: '[Milch] + は ありますか？'. Zeigen Sie auf Ihre Kaffeemaschine und fragen Sie: '[Kaffee] + は ありますか？'.\n\nBLOCK 2: Der Supermarkt-Scanner (5 Min)\nWenn Sie einkaufen gehen, nehmen Sie einen Artikel (z.B. Apfel) in den Fokus, stellen Sie sich vor, er wäre nicht da, und formen Sie leise die Frage an das Personal: '[Apfel] + は ありますか？'.",
      scenarios: [
        {
          context: "Sie betreten ein Café und brauchen dringend Internet für Ihr Laptop.",
          physicalAction: "Hände leicht auf den Tisch stützen.",
          userTask: "Fragen Sie an der Kasse, ob es WLAN gibt.",
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
          context: "Sie sitzen in einem traditionellen Restaurant, sehen aber nur Holzschilder an der Wand.",
          physicalAction: "Die Hand flach auf den Tisch legen.",
          userTask: "Fragen Sie den Kellner, ob er eine Speisekarte hat.",
          vocabHint: "Speisekarte = メニュー",
          userSpeech: "メニューは ありますか？",
          npcReply: "はい、すぐに おもちします。少々{しょうしょう}お待ちください。",
          keyword: "おもちします",
          options: [
            "ありません (Gibt es nicht)",
            "おもちします (Ich bringe sie)",
            "わかりません (Ich weiß es nicht)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja, ich bringe sie sofort. Bitte warten Sie einen Moment."
        },
        {
          context: "Sie suchen im Convenience Store (Konbini) nach frischem Wasser.",
          physicalAction: "Suchend auf die leeren Regale zeigen.",
          userTask: "Fragen Sie den Verkäufer, ob es Wasser gibt.",
          vocabHint: "Wasser = 水{みず}",
          userSpeech: "水{みず}は ありますか？",
          npcReply: "申し訳{もうしわけ}ありません、いま 水{みず}は ありません。",
          keyword: "ありません",
          options: [
            "ありません (Gibt es nicht)",
            "あります (Ja, gibt es)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 0,
          npcTranslation: "Es tut mir leid, im Moment haben wir kein Wasser da."
        },
        {
          context: "Sie sind in einer Bar und möchten auf die Toilette gehen.",
          physicalAction: "Entschuldigend die Hand heben.",
          userTask: "Fragen Sie den Barkeeper, ob es eine Toilette gibt.",
          vocabHint: "Toilette = トイレ",
          userSpeech: "トイレは ありますか？",
          npcReply: "はい、ありますよ。おくの 左{ひだり} です。",
          keyword: "あります",
          options: [
            "ありません (Gibt es nicht)",
            "左{ひだり} (Links)",
            "あります (Ja, gibt es)"
          ],
          correctIndex: 2,
          npcTranslation: "Ja, gibt es. Hinten links."
        },
        {
          context: "Sie haben Kopfschmerzen und sind in einer Apotheke (Yakkyoku).",
          physicalAction: "An den Kopf fassen.",
          userTask: "Fragen Sie, ob es Medizin gibt.",
          vocabHint: "Medizin / Medikamente = 薬{くすり}",
          userSpeech: "薬{くすり}は ありますか？",
          npcReply: "はい、あります。どのような 症状{しょうじょう} ですか？",
          keyword: "あります",
          options: [
            "あります (Ja, gibt es)",
            "ありません (Gibt es nicht)",
            "わかりません (Weiß ich nicht)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, haben wir. Was für Symptome haben Sie?"
        },
        {
          context: "Sie betreten ein Restaurant in einer Touristengegend und sprechen kein Japanisch.",
          physicalAction: "Mit den Schultern zucken.",
          userTask: "Fragen Sie, ob sie ein englisches Menü haben.",
          vocabHint: "Englisches Menü = 英語{えいご}のメニュー",
          userSpeech: "英語{えいご}のメニューは ありますか？",
          npcReply: "えいごのメニューですね。はい、あります。",
          keyword: "あります",
          options: [
            "ありません (Gibt es nicht)",
            "あります (Ja, gibt es)",
            "右{みぎ} (Rechts)"
          ],
          correctIndex: 1,
          npcTranslation: "Ein englisches Menü, ja? Ja, haben wir."
        },
        {
          context: "Sie sind im Bahnhof und brauchen schnell Bargeld.",
          physicalAction: "Formen Sie ein Rechteck wie eine Geldkarte.",
          userTask: "Fragen Sie die Bahnhofsaufsicht, ob es einen Geldautomaten (ATM) gibt.",
          vocabHint: "Geldautomat = ATM{エーティーエム}",
          userSpeech: "ATM{エーティーエム}は ありますか？",
          npcReply: "いいえ、この 駅{えき} には ありません。",
          keyword: "ありません",
          options: [
            "あります (Ja, gibt es)",
            "ありません (Gibt es nicht)",
            "まっすぐ (Geradeaus)"
          ],
          correctIndex: 1,
          npcTranslation: "Nein, an diesem Bahnhof gibt es keinen."
        },
        {
          context: "Sie betreten ein kleines Izakaya (Kneipe). Der Kellner empfängt Sie.",
          physicalAction: "Still stehen und zuhören.",
          userTask: "Antworten Sie nicht, sondern hören Sie genau hin, was er fragt!",
          vocabHint: "Zuhören!",
          userSpeech: "...",
          npcReply: "いらっしゃいませ！ 何名様{なんめいさま} ですか？",
          keyword: "何名様{なんめいさま}",
          options: [
            "何名様{なんめいさま} (Wie viele Personen?)",
            "あります (Ja, gibt es)",
            "どこですか (Wo ist das?)"
          ],
          correctIndex: 0,
          npcTranslation: "Willkommen! Für wie viele Personen?"
        },
        {
          context: "Sie haben keine Gabel am Tisch und können nicht mit Stäbchen essen.",
          physicalAction: "So tun, als würden Sie aufspießen.",
          userTask: "Fragen Sie den Kellner, ob es eine Gabel gibt.",
          vocabHint: "Gabel = フォーク",
          userSpeech: "フォークは ありますか？",
          npcReply: "はい、フォークですね。少々お待ちください。",
          keyword: "はい",
          options: [
            "ありません (Gibt es nicht)",
            "はい (Ja)",
            "いいえ (Nein)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja, eine Gabel. Bitte warten Sie kurz."
        },
        {
          context: "Sie wollen in einem Shop einkaufen, aber haben Ihre Taschen nicht dabei.",
          physicalAction: "So tun, als würden Sie eine Tüte tragen.",
          userTask: "Fragen Sie den Verkäufer, ob es Plastiktüten gibt.",
          vocabHint: "Tüte = 袋{ふくろ}",
          userSpeech: "袋{ふくろ}は ありますか？",
          npcReply: "はい、あります。有料{ゆうりょう}になりますが、よろしいですか？",
          keyword: "あります",
          options: [
            "あります (Ja, gibt es)",
            "ありません (Gibt es nicht)",
            "わかりません (Weiß ich nicht)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, haben wir. Sie kostet aber etwas, ist das in Ordnung?"
        }
      ]
    },
  
    // TAG 4: MENGEN UND ZAHLEN
    4: {
      morningRoutine: "ZIEL: 15 MINUTEN ZÄHL-AUTOMATISMUS\n\nBLOCK 1: Aktives Zählen beim Frühstück (10 Min)\nZählen Sie Ihre Umwelt! Sie bereiten Frühstück vor? Nehmen Sie einen Teller und sagen Sie 'ひとつ'. Zwei Scheiben Brot? 'ふたつ'. Ein Ei? 'ひとつ'.\n\nBLOCK 2: Der Blind-Test (5 Min)\nSchließen Sie die Augen auf dem Weg zur Arbeit. Heben Sie einen Finger und sagen Sie laut 'ひとつ', zwei Finger 'ふたつ', drei Finger 'みっつ'. Wiederholen Sie das vor- und rückwärts in hoher Geschwindigkeit.",
      scenarios: [
        {
          context: "Der Kellner im Restaurant fragt, für wie viele Personen Sie einen Tisch brauchen. Sie sind alleine.",
          physicalAction: "Heben Sie einen Finger.",
          userTask: "Sagen Sie: 'Eine Person.'",
          vocabHint: "Eins (Person/Stück) = 一つ{ひとつ}",
          userSpeech: "一つ{ひとつ}",
          npcReply: "おひとりさま ですね。こちらの 席{せき} へ どうぞ。",
          keyword: "おひとりさま",
          options: [
            "ふたつ (Zwei)",
            "おひとりさま (Eine Person [höflich])",
            "みっつ (Drei)"
          ],
          correctIndex: 1,
          npcTranslation: "Eine Person also. Bitte hier entlang zu diesem Platz."
        },
        {
          context: "Sie stehen an einem Straßenstand und möchten zwei Spieße Yakitori bestellen.",
          physicalAction: "Heben Sie zwei Finger und deuten Sie auf das Essen.",
          userTask: "Sagen Sie: 'Zwei Stück.'",
          vocabHint: "Zwei (Stück) = 二つ{ふたつ}",
          userSpeech: "二つ{ふたつ}",
          npcReply: "はい、ふたつ ですね。すぐ やきます。",
          keyword: "ふたつ",
          options: [
            "ひとつ (Eins)",
            "みっつ (Drei)",
            "ふたつ (Zwei)"
          ],
          correctIndex: 2,
          npcTranslation: "Ja, zwei Stück. Ich grille sie sofort."
        },
        {
          context: "Sie sind mit zwei Freunden unterwegs (insgesamt 3 Personen). Sie betreten ein Café.",
          physicalAction: "Heben Sie drei Finger.",
          userTask: "Antworten Sie auf die Frage des Kellners: 'Drei Personen.'",
          vocabHint: "Drei (Personen/Stück) = 三つ{みっつ}",
          userSpeech: "三つ{みっつ}",
          npcReply: "さんめいさま ですね。テーブル席{せき}へ どうぞ。",
          keyword: "さんめいさま",
          options: [
            "さんめいさま (Drei Personen [höflich])",
            "おひとりさま (Eine Person)",
            "ふたつ (Zwei)"
          ],
          correctIndex: 0,
          npcTranslation: "Drei Personen. Bitte zum Tisch."
        },
        {
          context: "Sie kaufen am Schalter Fahrkarten für sich und Ihren Partner.",
          physicalAction: "Zwei Finger auf den Schalter legen.",
          userTask: "Fordern Sie zwei Tickets: 'Fahrkarten, zwei Stück.'",
          vocabHint: "Ticket, Zwei = 切符{きっぷ}、二つ{ふたつ}",
          userSpeech: "切符{きっぷ}、二つ{ふたつ}",
          npcReply: "きっぷ ふたつ ですね。かしこまりました。",
          keyword: "ふたつ",
          options: [
            "ひとつ (Eins)",
            "ふたつ (Zwei)",
            "みっつ (Drei)"
          ],
          correctIndex: 1,
          npcTranslation: "Zwei Fahrkarten. Verstanden."
        },
        {
          context: "Sie bestellen am Tresen einen Kaffee für sich allein.",
          physicalAction: "Mit dem Zeigefinger auf die Karte tippen.",
          userTask: "Bestellen Sie: 'Kaffee, ein Stück.'",
          vocabHint: "Kaffee, Eins = コーヒー、一つ{ひとつ}",
          userSpeech: "コーヒー、一つ{ひとつ}",
          npcReply: "ホットコーヒー ひとつ ですね。少々お待ちください。",
          keyword: "ひとつ",
          options: [
            "ひとつ (Eins)",
            "ふたつ (Zwei)",
            "みっつ (Drei)"
          ],
          correctIndex: 0,
          npcTranslation: "Ein heißer Kaffee. Bitte warten Sie kurz."
        },
        {
          context: "Sie sind in einer Bäckerei und wollen drei verschiedene Brötchen (Pan).",
          physicalAction: "Kreisende Bewegung über der Auslage, drei Finger heben.",
          userTask: "Sagen Sie: 'Brot (Pan), drei Stück.'",
          vocabHint: "Brot, Drei = パン、三つ{みっつ}",
          userSpeech: "パン、三つ{みっつ}",
          npcReply: "パンを みっつ ですね。ありがとうございます。",
          keyword: "みっつ",
          options: [
            "ひとつ (Eins)",
            "ふたつ (Zwei)",
            "みっつ (Drei)"
          ],
          correctIndex: 2,
          npcTranslation: "Drei Brötchen. Vielen Dank."
        },
        {
          context: "An der Hotelrezeption brauchen Sie zusätzliche Handtücher (Taoru) für Sie und Ihre Frau.",
          physicalAction: "Mit den Händen abtrocknen andeuten, zwei Finger heben.",
          userTask: "Sagen Sie: 'Handtuch, zwei Stück.'",
          vocabHint: "Handtuch, Zwei = タオル、二つ{ふたつ}",
          userSpeech: "タオル、二つ{ふたつ}",
          npcReply: "タオルを ふたつ ですね。すぐ おへやに おもちします。",
          keyword: "ふたつ",
          options: [
            "みっつ (Drei)",
            "ふたつ (Zwei)",
            "ひとつ (Eins)"
          ],
          correctIndex: 1,
          npcTranslation: "Zwei Handtücher. Ich bringe sie sofort auf Ihr Zimmer."
        },
        {
          context: "Der Konbini-Verkäufer fragt, wie viele Tüten (Fukuro) Sie brauchen.",
          physicalAction: "Einen Finger heben.",
          userTask: "Sagen Sie: 'Eine, bitte.' (Eins)",
          vocabHint: "Eins = 一つ{ひとつ}",
          userSpeech: "一つ{ひとつ}",
          npcReply: "ふくろ ひとつ ですね。かしこまりました。",
          keyword: "ひとつ",
          options: [
            "ふたつ (Zwei)",
            "みっつ (Drei)",
            "ひとつ (Eins)"
          ],
          correctIndex: 2,
          npcTranslation: "Eine Tüte. Verstanden."
        },
        {
          context: "Sie möchten drei Wasserflaschen aus dem Regal kaufen.",
          physicalAction: "Auf die Flaschen zeigen, drei Finger spreizen.",
          userTask: "Sagen Sie: 'Wasser, drei Stück.'",
          vocabHint: "Wasser, Drei = 水{みず}、三つ{みっつ}",
          userSpeech: "水{みず}、三つ{みっつ}",
          npcReply: "おみず みっつ で よろしいですか？",
          keyword: "みっつ",
          options: [
            "ひとつ (Eins)",
            "みっつ (Drei)",
            "ふたつ (Zwei)"
          ],
          correctIndex: 1,
          npcTranslation: "Drei Wasser, ist das korrekt?"
        },
        {
          context: "Beim Sushi-Bestellen möchten Sie zwei Portionen Lachs.",
          physicalAction: "Zwei Finger bestimmt auf den Tisch tippen.",
          userTask: "Sagen Sie einfach nur: 'Zwei Stück.'",
          vocabHint: "Zwei = 二つ{ふたつ}",
          userSpeech: "二つ{ふたつ}",
          npcReply: "サーモン ふたつ！ よろこんで！",
          keyword: "ふたつ",
          options: [
            "ふたつ (Zwei)",
            "ひとつ (Eins)",
            "みっつ (Drei)"
          ],
          correctIndex: 0,
          npcTranslation: "Zwei Lachs! Sehr gerne!"
        }
      ]
    },
  
    // TAG 5: ZEITLICHE EINORDNUNG
    5: {
      morningRoutine: "ZIEL: 15 MINUTEN ZEIT-ANKER SETZEN\n\nBLOCK 1: Der Zeit-Kaltstart (10 Min)\nBlicken Sie heute Morgen demonstrativ auf Ihre Armbanduhr oder Ihr Smartphone. Sagen Sie jedes Mal laut und bestimmt: 'いま' (Jetzt). Denken Sie an Ihre Mittagspause, schauen Sie in die Ferne und sagen Sie: 'あとで' (Später).\n\nBLOCK 2: Die Phantom-Frage (5 Min)\nWährend Sie duschen oder sich anziehen: Werfen Sie fragend die Hände hoch und rufen Sie 10 Mal laut in den Raum: 'いつ ですか？' (Wann ist es?).",
      scenarios: [
        {
          context: "Der Empfangschef fragt Sie etwas auf Japanisch bezüglich Ihres Zimmers.",
          physicalAction: "Tippen Sie energisch auf den Tisch oder Tresen.",
          userTask: "Sie wollen jetzt einchecken. Sagen Sie bestimmt: 'Jetzt!'",
          vocabHint: "Jetzt = 今{いま}",
          userSpeech: "今{いま}",
          npcReply: "いま ですか？ はい、かしこまりました。パスワードを おねがいします。",
          keyword: "いま",
          options: [
            "あとで (Später)",
            "いま (Jetzt)",
            "いつ (Wann)"
          ],
          correctIndex: 1,
          npcTranslation: "Jetzt? Ja, verstanden. Ihren Reisepass, bitte."
        },
        {
          context: "Ein Verkäufer drängt Ihnen im Laden etwas auf.",
          physicalAction: "Wischende Handbewegung nach hinten (verschieben).",
          userTask: "Wimmeln Sie ihn ab. Sagen Sie: 'Später.'",
          vocabHint: "Später = あとで",
          userSpeech: "あとで",
          npcReply: "あとで ですね。また おまちしております。",
          keyword: "あとで",
          options: [
            "いま (Jetzt)",
            "いつ (Wann)",
            "あとで (Später)"
          ],
          correctIndex: 2,
          npcTranslation: "Später also. Wir warten auf Ihren erneuten Besuch."
        },
        {
          context: "Sie müssen einen Zug erwischen, aber die Anzeigetafel ist defekt.",
          physicalAction: "Heben Sie fragend beide Hände.",
          userTask: "Fragen Sie das Personal: 'Wann ist es?' (Wann fährt der Zug?)",
          vocabHint: "Wann = いつ",
          userSpeech: "いつですか？",
          npcReply: "でんしゃ は ５分後（ごふんご）です。",
          keyword: "ごふんご",
          options: [
            "いま (Jetzt)",
            "ごふんご (In 5 Minuten)",
            "あとで (Später)"
          ],
          correctIndex: 1,
          npcTranslation: "Der Zug kommt in 5 Minuten."
        },
        {
          context: "Im Restaurant werden Sie gefragt, wann das bestellte Essen gebracht werden soll.",
          physicalAction: "Auf den Tisch deuten.",
          userTask: "Sie haben Hunger. Sagen Sie: 'Jetzt.'",
          vocabHint: "Jetzt = 今{いま}",
          userSpeech: "今{いま}",
          npcReply: "はい、いま すぐに おもちします。",
          keyword: "いま",
          options: [
            "いま (Jetzt)",
            "いつ (Wann)",
            "あとで (Später)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, ich bringe es jetzt sofort."
        },
        {
          context: "Sie möchten das Zimmer im Hotel bezahlen, aber haben Ihr Portemonnaie auf dem Zimmer.",
          physicalAction: "Abwinkende Geste machen.",
          userTask: "Vertrösten Sie den Mitarbeiter an der Kasse: 'Später.'",
          vocabHint: "Später = あとで",
          userSpeech: "あとで",
          npcReply: "わかりました。あとで お支払{しはら}い ください。",
          keyword: "あとで",
          options: [
            "いま (Jetzt)",
            "あとで (Später)",
            "いつ (Wann)"
          ],
          correctIndex: 1,
          npcTranslation: "Verstanden. Bitte bezahlen Sie später."
        },
        {
          context: "Sie haben eine Tischreservierung, der Kellner fragt etwas.",
          physicalAction: "Fragender Blick, auf die imaginäre Uhr tippen.",
          userTask: "Fragen Sie ihn nach der Zeit für die Öffnung: 'Wann ist es?'",
          vocabHint: "Wann = いつ",
          userSpeech: "いつですか？",
          npcReply: "オープンは あとで ６時{ろくじ} に なります。",
          keyword: "あとで",
          options: [
            "あとで (Später)",
            "いま (Jetzt)",
            "いつ (Wann)"
          ],
          correctIndex: 0,
          npcTranslation: "Die Eröffnung ist später um 6 Uhr."
        },
        {
          context: "Der Reinigungsservice klopft an Ihre Zimmertür, Sie sind aber noch im Pyjama.",
          physicalAction: "Leicht in Panik geraten, Hände heben.",
          userTask: "Rufen Sie durch die Tür: 'Später!'",
          vocabHint: "Später = あとで",
          userSpeech: "あとで",
          npcReply: "はい、あとで また きます。",
          keyword: "あとで",
          options: [
            "いつ (Wann)",
            "あとで (Später)",
            "いま (Jetzt)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja, ich komme später noch einmal wieder."
        },
        {
          context: "Der Busfahrer hält draußen, die Türen sind aber zu.",
          physicalAction: "Klopfen Sie an eine imaginäre Scheibe.",
          userTask: "Deuten Sie auf den Bus und rufen Sie: 'Jetzt!' (Machen Sie auf!)",
          vocabHint: "Jetzt = 今{いま}",
          userSpeech: "今{いま}",
          npcReply: "ちょっと まってください！ いま あけます！",
          keyword: "いま",
          options: [
            "あとで (Später)",
            "いつ (Wann)",
            "いま (Jetzt)"
          ],
          correctIndex: 2,
          npcTranslation: "Bitte warten Sie kurz! Ich öffne jetzt!"
        },
        {
          context: "Ihr Freund fragt Sie per Kurznachricht, wann Sie sich treffen wollen.",
          physicalAction: "Tippen Sie imaginär auf Ihr Smartphone.",
          userTask: "Schreiben Sie zurück (sprechen Sie es laut): 'Wann?'",
          vocabHint: "Wann = いつ",
          userSpeech: "いつですか？",
          npcReply: "いま から どうですか？",
          keyword: "いま",
          options: [
            "あとで (Später)",
            "いつ (Wann)",
            "いま (Jetzt)"
          ],
          correctIndex: 2,
          npcTranslation: "Wie wäre es von jetzt an?"
        },
        {
          context: "Der Check-Out im Hotel drängt. Die Rezeption ruft an.",
          physicalAction: "Telefon ans Ohr halten.",
          userTask: "Sagen Sie entschlossen: 'Jetzt.' (Ich komme jetzt runter).",
          vocabHint: "Jetzt = 今{いま}",
          userSpeech: "今{いま}",
          npcReply: "いま チェックアウト ですね。おまちしております。",
          keyword: "いま",
          options: [
            "いま (Jetzt)",
            "あとで (Später)",
            "いつ (Wann)"
          ],
          correctIndex: 0,
          npcTranslation: "Check-Out jetzt also. Wir erwarten Sie."
        }
      ]
    },
  
    // TAG 6: DIE HÖFLICHKEITS-ANKER
    6: {
      morningRoutine: "ZIEL: 15 MINUTEN HÖFLICHKEITS-REFLEX\n\nBLOCK 1: Die Alltags-Routine (15 Min)\nJedes Mal, wenn Sie heute jemanden ansprechen (Bäcker, Kollege, Partner), denken oder murmeln Sie zuerst 'すみません'. Jedes Mal, wenn Sie etwas entgegennehmen (Kaffeetasse, Wechselgeld, Dokument), murmeln Sie 'ありがとうございます'.\n\nBLOCK 2: Die physische Verbeugung (Integriert)\nÜben Sie bei jedem 'ありがとうございます' eine leichte, respektvolle Neigung des Oberkörpers (ca. 15 Grad).",
      scenarios: [
        {
          context: "Sie sitzen im Restaurant und möchten bestellen, aber der Kellner sieht Sie nicht.",
          physicalAction: "Leicht die Hand heben.",
          userTask: "Rufen Sie laut und deutlich, um Aufmerksamkeit zu erregen.",
          vocabHint: "Entschuldigung / Hallo = すみません",
          userSpeech: "すみません",
          npcReply: "はい！ ただいま まいります。",
          keyword: "はい",
          options: [
            "ありがとうございます (Danke)",
            "はい (Ja / Komme)",
            "おねがいします (Bitte)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja! Ich komme sofort."
        },
        {
          context: "Sie überreichen dem Kassierer im Konbini das Geld für Ihre Getränke.",
          physicalAction: "Mit beiden Händen imaginär Geld überreichen.",
          userTask: "Sagen Sie höflich 'Bitte sehr' (Ich bitte darum).",
          vocabHint: "Bitte (um etwas bitten) = お願{ねが}いします",
          userSpeech: "お願{ねが}いします",
          npcReply: "千円{せんえん}から おあずかり いたします。",
          keyword: "おあずかり",
          options: [
            "すみません (Entschuldigung)",
            "おあずかり (Ich nehme an / von 1000 Yen)",
            "ありがとうございます (Danke)"
          ],
          correctIndex: 1,
          npcTranslation: "Ich nehme von 1000 Yen an."
        },
        {
          context: "Ein Fremder hat Ihre verlorene Suica-Karte (Fahrkarte) aufgehoben und gibt sie Ihnen.",
          physicalAction: "Leichte Verbeugung (15 Grad).",
          userTask: "Bedanken Sie sich sehr höflich.",
          vocabHint: "Vielen Dank = ありがとうございます",
          userSpeech: "ありがとうございます",
          npcReply: "どういたしまして。気{き}をつけて。",
          keyword: "どういたしまして",
          options: [
            "どういたしまして (Gern geschehen)",
            "すみません (Entschuldigung)",
            "おねがいします (Bitte)"
          ],
          correctIndex: 0,
          npcTranslation: "Gern geschehen. Passen Sie auf sich auf."
        },
        {
          context: "Sie rempeln versehentlich jemanden in der vollen U-Bahn an.",
          physicalAction: "Erschrocken zusammenzucken, Kopf leicht senken.",
          userTask: "Entschuldigen Sie sich sofort.",
          vocabHint: "Entschuldigung = すみません",
          userSpeech: "すみません",
          npcReply: "いいえ、だいじょうぶ ですよ。",
          keyword: "だいじょうぶ",
          options: [
            "ありがとうございます (Danke)",
            "おねがいします (Bitte)",
            "だいじょうぶ (Ist in Ordnung / Kein Problem)"
          ],
          correctIndex: 2,
          npcTranslation: "Nein, es ist alles in Ordnung."
        },
        {
          context: "Der Taxifahrer hat Ihre Koffer in den Kofferraum geladen.",
          physicalAction: "Stehen bleiben und sich leicht verbeugen.",
          userTask: "Bedanken Sie sich höflich für den Service.",
          vocabHint: "Vielen Dank = ありがとうございます",
          userSpeech: "ありがとうございます",
          npcReply: "どうぞ、おのり ください。",
          keyword: "どうぞ",
          options: [
            "どうぞ (Bitte, steigen Sie ein)",
            "すみません (Entschuldigung)",
            "おねがいします (Bitte)"
          ],
          correctIndex: 0,
          npcTranslation: "Bitte sehr, steigen Sie ein."
        },
        {
          context: "Sie weisen dem Taxifahrer auf einer Karte Ihr Hotel.",
          physicalAction: "Auf eine imaginäre Karte deuten.",
          userTask: "Sagen Sie ihm: 'Dorthin, bitte.'",
          vocabHint: "Bitte = お願{ねが}いします",
          userSpeech: "お願{ねが}いします",
          npcReply: "はい、こちらの ホテルですね。おねがいします。",
          keyword: "おねがいします",
          options: [
            "おねがいします (Bitte sehr / Wir machen das so)",
            "ありがとうございます (Danke)",
            "すみません (Entschuldigung)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, dieses Hotel hier. Wird gemacht (Bitte sehr)."
        },
        {
          context: "Sie möchten sich im engen Izakaya an einem anderen Gast vorbeidrängen.",
          physicalAction: "Handkante vor dem Körper senkrecht auf und ab bewegen (typische Geste).",
          userTask: "Sagen Sie 'Entschuldigung', um Platz zu bekommen.",
          vocabHint: "Entschuldigung = すみません",
          userSpeech: "すみません",
          npcReply: "あ、はい。どうぞ。",
          keyword: "どうぞ",
          options: [
            "ありがとうございます (Danke)",
            "どうぞ (Bitte sehr / Nach Ihnen)",
            "おねがいします (Bitte)"
          ],
          correctIndex: 1,
          npcTranslation: "Ah, ja. Bitte sehr."
        },
        {
          context: "Der Hotelmitarbeiter überreicht Ihnen Ihren Zimmerschlüssel.",
          physicalAction: "Mit beiden Händen den imaginären Schlüssel annehmen, verbeugen.",
          userTask: "Bedanken Sie sich.",
          vocabHint: "Vielen Dank = ありがとうございます",
          userSpeech: "ありがとうございます",
          npcReply: "ごゆっくり おくつろぎ ください。",
          keyword: "ごゆっくり",
          options: [
            "すみません (Entschuldigung)",
            "おねがいします (Bitte)",
            "ごゆっくり (Entspannen Sie sich / Einen schönen Aufenthalt)"
          ],
          correctIndex: 2,
          npcTranslation: "Bitte entspannen Sie sich und genießen Sie den Aufenthalt."
        },
        {
          context: "Sie geben Ihr Gepäck am Flughafen auf dem Band ab.",
          physicalAction: "Schwere Tasche heben und abstellen.",
          userTask: "Sagen Sie dem Personal 'Bitte (kümmern Sie sich darum)'.",
          vocabHint: "Bitte = お願{ねが}いします",
          userSpeech: "お願{ねが}いします",
          npcReply: "はい、おあずかり いたします。",
          keyword: "おあずかり",
          options: [
            "おあずかり (Ich nehme es an)",
            "ありがとうございます (Danke)",
            "すみません (Entschuldigung)"
          ],
          correctIndex: 0,
          npcTranslation: "Ja, ich nehme es in Gewahrsam."
        },
        {
          context: "Sie haben eine Frage an den Schalterbeamten, der gerade Papiere sortiert.",
          physicalAction: "Vorsichtig näher treten.",
          userTask: "Unterbrechen Sie ihn höflich mit 'Entschuldigung'.",
          vocabHint: "Entschuldigung = すみません",
          userSpeech: "すみません",
          npcReply: "はい、なんでしょうか？",
          keyword: "なんでしょうか",
          options: [
            "ありがとうございます (Danke)",
            "なんでしょうか (Ja, was gibt es?)",
            "おねがいします (Bitte)"
          ],
          correctIndex: 1,
          npcTranslation: "Ja, wie kann ich helfen / was gibt es?"
        }
      ]
    }, // <--- WICHTIG: Hier das Komma setzen!

    // TAG 7: WOCHEN-RÜCKBLICK (SYSTEM-ZUSAMMENFÜHRUNG)
    7: {
      morningRoutine: "ZIEL: 15 MINUTEN MENTALE ESKALATION\n\nBLOCK 1: Der Dusch-Simulator (15 Min)\nSpielen Sie unter der Dusche oder beim Anziehen die schlimmstmögliche Orientierungs-Situation durch. Sie sind verloren am Bahnhof. Gehen Sie mental alle Schritte durch: Aufmerksamkeit erregen (すみません), Ort abfragen (えきはどこですか？), Richtung verstehen (みぎ), bedanken (ありがとうございます).",
      scenarios: [
        // TEIL 1: DER GROSSE MUSTER-MIX (Sprache)
        {
          type: "speech",
          context: "MUSTER-MIX: Sie brauchen im Restaurant dringend die Toilette.",
          physicalAction: "Hand heben und Frage stellen.",
          userTask: "Machen Sie den Kellner auf sich aufmerksam und fragen Sie nach der Toilette!",
          vocabHint: "Entschuldigung + Toilette",
          userSpeech: "すみません、トイレはどこですか？",
          npcReply: "はい、あそこの 右{みぎ} です。",
          keyword: "右{みぎ}",
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
          correctIndex: 1,
          npcTranslation: "Ja, dort drüben rechts."
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sind an der Hotel-Rezeption.",
          physicalAction: "Körper verbeugen und lächeln.",
          userTask: "Fragen Sie nach WLAN und sagen Sie danach sofort 'Danke'.",
          vocabHint: "WLAN gibt es? + Danke",
          userSpeech: "ワイファイは ありますか？ ありがとうございます。",
          npcReply: "はい、ございます。こちらこそ、ありがとうございます。",
          keyword: "ございます",
          options: ["ございます (Haben wir [höflich])", "ありません (Haben wir nicht)", "わかりません (Weiß nicht)"],
          correctIndex: 0,
          npcTranslation: "Ja, haben wir. Ich danke ebenfalls."
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sitzen im Taxi. Der Fahrer fragt nach dem Weg.",
          physicalAction: "Mit der Hand nach rechts winken.",
          userTask: "Sagen Sie: 'Rechts, bitte.'",
          vocabHint: "Rechts + Bitte",
          userSpeech: "右{みぎ}、おねがいします。",
          npcReply: "はい、右{みぎ} ですね。かしこまりました。",
          keyword: "右{みぎ}",
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
          correctIndex: 2,
          npcTranslation: "Ja, nach rechts. Verstanden."
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sind im Bahnhof und brauchen drei Tickets für Ihre Gruppe.",
          physicalAction: "Drei Finger hochhalten.",
          userTask: "Fordern Sie drei Fahrkarten an.",
          vocabHint: "Tickets, Drei",
          userSpeech: "切符{きっぷ}、三つ{みっつ}",
          npcReply: "きっぷ みっつ ですね。少々お待ちください。",
          keyword: "みっつ",
          options: ["ひとつ (Eins)", "みっつ (Drei)", "ふたつ (Zwei)"],
          correctIndex: 1,
          npcTranslation: "Drei Tickets. Bitte warten Sie kurz."
        },
        
        // TEIL 2: DER NEUE TEXT-SCANNER
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein unübersichtlicher Blogbeitrag über einen Bahnhof.",
          physicalAction: "Auge scharfstellen, japanische Zeichen ignorieren, nach dem Ziel scannen.",
          userTask: "Lokalisieren Sie sofort die Frage-Struktur (Wo ist?).",
          target: "どこですか？",
          textChunks: [
            "東京駅は", "とても", "大きくて", "複雑です。", "迷子に", "なりました。", "出口は", "どこですか？", "助けて", "ください。"
          ],
          npcReply: "Visuelle Zielerfassung erfolgreich. Sie haben das 'Wo ist?'-Muster im Text gefunden.",
          keyword: "どこですか？",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Die Speisekarte (Izakaya) an der Wand.",
          physicalAction: "Schnell über die Zeichen fliegen.",
          userTask: "Finden Sie die Struktur 'Gibt es das?' (Existenz).",
          target: "ありますか？",
          textChunks: [
            "本日のおすすめ:", "焼き鳥", "ビール", "枝豆", "この店に", "英語のメニューは", "ありますか？", "いいえ", "ありません。"
          ],
          npcReply: "Visuelle Zielerfassung erfolgreich. Sie haben das 'Gibt es?'-Muster im Text gefunden.",
          keyword: "ありますか？",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein Bahnhofs-Schild mit vielen Informationen.",
          physicalAction: "Filtern Sie unwichtige Kanjis aus.",
          userTask: "Lokalisieren Sie sofort das Wort 'Ticket'.",
          target: "切符",
          textChunks: [
            "JR線", "山手線", "乗り場", "は", "あちらです。", "切符", "うりばは", "1階", "です。"
          ],
          npcReply: "Visuelle Zielerfassung erfolgreich. Sie haben das Wort 'Ticket' gefunden.",
          keyword: "切符",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    }
}; // <--- Das ist die allerletzte Klammer, die deine Datei abschließt!