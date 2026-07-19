export const radarData = {
    // ==========================================
    // WOCHE 1: GRUNDLAGEN & ORTUNG
    // ==========================================
  
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
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
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
          options: ["右{みぎ} (Rechts)", "まっすぐ (Geradeaus)", "左{ひだり} (Links)"],
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
          options: ["左{ひだり} (Links)", "右{みぎ} (Rechts)", "まっすぐ (Geradeaus)"],
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
          options: ["右{みぎ} (Rechts)", "左{ひだり} (Links)", "まっすぐ (Geradeaus)"],
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
          options: ["まっすぐ (Geradeaus)", "左{ひだり} (Links)", "右{みぎ} (Rechts)"],
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
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
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
          options: ["右{みぎ} (Rechts)", "まっすぐ (Geradeaus)", "左{ひだり} (Links)"],
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
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
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
          options: ["まっすぐ (Geradeaus)", "左{ひだり} (Links)", "右{みぎ} (Rechts)"],
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
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
          correctIndex: 2,
          npcTranslation: "Ein Konbini ist gleich da vorne! Es ist auf der rechten Seite!"
        }
      ]
    },
  
    // TAG 2: RICHTUNGEN VERSTEHEN
    2: {
      morningRoutine: "ZIEL: 15 MINUTEN RICHTUNGS-TRANSFER\n\nBLOCK 1: Motorisches Erwachen (5 Min)\nStehen Sie auf. Werfen Sie den rechten Arm hart zur Seite und rufen Sie 'みぎ!'. Dann links: 'ひだり!'. Machen Sie Ausfallschritte nach vorn: 'まっすぐ!'.\n\nBLOCK 2: Der Weg durch den Tag (10 Min)\nDieses Training findet draußen statt. Wenn Sie zur Arbeit fahren oder gehen: Jedes Mal, wenn Sie rechts abbiegen, sagen Sie hörbar 'みぎ'. Bei links 'ひだり'.",
      scenarios: [
        {
          context: "Der Taxifahrer fragt Sie nach der Richtung an der nächsten Kreuzung.",
          physicalAction: "Zeichnen Sie 'みぎ' groß in die Luft und werfen Sie den rechten Arm nach rechts.",
          userTask: "Sagen Sie ihm: 'Rechts, bitte.'",
          vocabHint: "Rechts = 右{みぎ}",
          userSpeech: "右{みぎ}、おねがいします。",
          npcReply: "はい、かしこまりました。右{みぎ} ですね。",
          keyword: "右{みぎ}",
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
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
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
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
          options: ["右{みぎ} (Rechts)", "まっすぐ (Geradeaus)", "左{ひだり} (Links)"],
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
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
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
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
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
          options: ["まっすぐ (Geradeaus)", "左{ひだり} (Links)", "右{みぎ} (Rechts)"],
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
          options: ["右{みぎ} (Rechts)", "左{ひだり} (Links)", "まっすぐ (Geradeaus)"],
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
          options: ["左{ひだり} (Links)", "右{みぎ} (Rechts)", "まっすぐ (Geradeaus)"],
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
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
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
          options: ["右{みぎ} (Rechts)", "左{ひだり} (Links)", "まっすぐ (Geradeaus)"],
          correctIndex: 0,
          npcTranslation: "Ja, in die rechte Richtung."
        }
      ]
    },
    
    // TAG 3: EXISTENZ & RESTAURANT
    3: {
      morningRoutine: "ZIEL: 15 MINUTEN EXISTENZ-ABFRAGE\n\nBLOCK 1: Kaltstart im Alltag (10 Min)\nGehen Sie durch Ihre Wohnung. Öffnen Sie den Kühlschrank. Zeigen Sie auf die Milch und fragen Sie den Kühlschrank laut: '[Milch] + は ありますか？'. Zeigen Sie auf Ihre Kaffeemaschine und fragen Sie: '[Kaffee] + は ありますか？'.",
      scenarios: [
        {
          context: "Sie betreten ein Café und brauchen dringend Internet für Ihr Laptop.",
          physicalAction: "Hände leicht auf den Tisch stützen.",
          userTask: "Fragen Sie an der Kasse, ob es WLAN gibt.",
          vocabHint: "WLAN = ワイファイ",
          userSpeech: "ワイファイは ありますか？",
          npcReply: "はい、あります。パスワードはこちらです。",
          keyword: "あります",
          options: ["ありません (Gibt es nicht)", "あります (Ja, gibt es)", "わかりません (Weiß ich nicht)"],
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
          options: ["ありません (Gibt es nicht)", "おもちします (Ich bringe sie)", "わかりません (Ich weiß es nicht)"],
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
          options: ["ありません (Gibt es nicht)", "あります (Ja, gibt es)", "右{みぎ} (Rechts)"],
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
          options: ["ありません (Gibt es nicht)", "左{ひだり} (Links)", "あります (Ja, gibt es)"],
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
          options: ["あります (Ja, gibt es)", "ありません (Gibt es nicht)", "わかりません (Weiß ich nicht)"],
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
          options: ["ありません (Gibt es nicht)", "あります (Ja, gibt es)", "右{みぎ} (Rechts)"],
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
          options: ["あります (Ja, gibt es)", "ありません (Gibt es nicht)", "まっすぐ (Geradeaus)"],
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
          options: ["何名様{なんめいさま} (Wie viele Personen?)", "あります (Ja, gibt es)", "どこですか (Wo ist das?)"],
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
          options: ["ありません (Gibt es nicht)", "はい (Ja)", "いいえ (Nein)"],
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
          options: ["あります (Ja, gibt es)", "ありません (Gibt es nicht)", "わかりません (Weiß ich nicht)"],
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
          options: ["ふたつ (Zwei)", "おひとりさま (Eine Person [höflich])", "みっつ (Drei)"],
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
          options: ["ひとつ (Eins)", "みっつ (Drei)", "ふたつ (Zwei)"],
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
          options: ["さんめいさま (Drei Personen [höflich])", "おひとりさま (Eine Person)", "ふたつ (Zwei)"],
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
          options: ["ひとつ (Eins)", "ふたつ (Zwei)", "みっつ (Drei)"],
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
          options: ["ひとつ (Eins)", "ふたつ (Zwei)", "みっつ (Drei)"],
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
          options: ["ひとつ (Eins)", "ふたつ (Zwei)", "みっつ (Drei)"],
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
          options: ["みっつ (Drei)", "ふたつ (Zwei)", "ひとつ (Eins)"],
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
          options: ["ふたつ (Zwei)", "みっつ (Drei)", "ひとつ (Eins)"],
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
          options: ["ひとつ (Eins)", "みっつ (Drei)", "ふたつ (Zwei)"],
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
          options: ["ふたつ (Zwei)", "ひとつ (Eins)", "みっつ (Drei)"],
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
          options: ["あとで (Später)", "いま (Jetzt)", "いつ (Wann)"],
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
          options: ["いま (Jetzt)", "いつ (Wann)", "あとで (Später)"],
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
          options: ["いま (Jetzt)", "ごふんご (In 5 Minuten)", "あとで (Später)"],
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
          options: ["いま (Jetzt)", "いつ (Wann)", "あとで (Später)"],
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
          options: ["いま (Jetzt)", "あとで (Später)", "いつ (Wann)"],
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
          options: ["あとで (Später)", "いま (Jetzt)", "いつ (Wann)"],
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
          options: ["いつ (Wann)", "あとで (Später)", "いま (Jetzt)"],
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
          options: ["あとで (Später)", "いつ (Wann)", "いま (Jetzt)"],
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
          options: ["あとで (Später)", "いつ (Wann)", "いま (Jetzt)"],
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
          options: ["いま (Jetzt)", "あとで (Später)", "いつ (Wann)"],
          correctIndex: 0,
          npcTranslation: "Check-Out jetzt also. Wir erwarten Sie."
        }
      ]
    },
  
    // TAG 6: DIE HÖFLICHKEITS-ANKER
    6: {
      morningRoutine: "ZIEL: 15 MINUTEN HÖFLICHKEITS-REFLEX\n\nBLOCK 1: Die Alltags-Routine (15 Min)\nJedes Mal, wenn Sie heute jemanden ansprechen (Bäcker, Kollege, Partner), denken oder murmeln Sie zuerst 'すみません'. Jedes Mal, wenn Sie etwas entgegennehmen (Kaffeetasse, Wechselgeld, Dokument), murmeln Sie 'ありがとうございます'.",
      scenarios: [
        {
          context: "Sie sitzen im Restaurant und möchten bestellen, aber der Kellner sieht Sie nicht.",
          physicalAction: "Leicht die Hand heben.",
          userTask: "Rufen Sie laut und deutlich, um Aufmerksamkeit zu erregen.",
          vocabHint: "Entschuldigung / Hallo = すみません",
          userSpeech: "すみません",
          npcReply: "はい！ ただいま まいります。",
          keyword: "はい",
          options: ["ありがとうございます (Danke)", "はい (Ja / Komme)", "おねがいします (Bitte)"],
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
          options: ["すみません (Entschuldigung)", "おあずかり (Ich nehme an / von 1000 Yen)", "ありがとうございます (Danke)"],
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
          options: ["どういたしまして (Gern geschehen)", "すみません (Entschuldigung)", "おねがいします (Bitte)"],
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
          options: ["ありがとうございます (Danke)", "おねがいします (Bitte)", "だいじょうぶ (Ist in Ordnung / Kein Problem)"],
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
          options: ["どうぞ (Bitte, steigen Sie ein)", "すみません (Entschuldigung)", "おねがいします (Bitte)"],
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
          options: ["おねがいします (Bitte sehr / Wir machen das so)", "ありがとうございます (Danke)", "すみません (Entschuldigung)"],
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
          options: ["ありがとうございます (Danke)", "どうぞ (Bitte sehr / Nach Ihnen)", "おねがいします (Bitte)"],
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
          options: ["すみません (Entschuldigung)", "おねがいします (Bitte)", "ごゆっくり (Entspannen Sie sich / Einen schönen Aufenthalt)"],
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
          options: ["おあずかり (Ich nehme es an)", "ありがとうございます (Danke)", "すみません (Entschuldigung)"],
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
          options: ["ありがとうございます (Danke)", "なんでしょうか (Ja, was gibt es?)", "おねがいします (Bitte)"],
          correctIndex: 1,
          npcTranslation: "Ja, wie kann ich helfen / was gibt es?"
        }
      ]
    },
  
    // TAG 7: WOCHEN-RÜCKBLICK (SYSTEM-ZUSAMMENFÜHRUNG)
    7: {
      morningRoutine: "ZIEL: 15 MINUTEN MENTALE ESKALATION\n\nBLOCK 1: Der Dusch-Simulator (15 Min)\nSpielen Sie unter der Dusche oder beim Anziehen die schlimmstmögliche Orientierungs-Situation durch. Sie sind verloren am Bahnhof. Gehen Sie mental alle Schritte durch: Aufmerksamkeit erregen (すみません), Ort abfragen (えきはどこですか？), Richtung verstehen (みぎ), bedanken (ありがとうございます).",
      scenarios: [
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
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein unübersichtlicher Blogbeitrag über einen Bahnhof.",
          physicalAction: "Auge scharfstellen, japanische Zeichen ignorieren, nach dem Ziel scannen.",
          userTask: "Lokalisieren Sie sofort die Frage-Struktur (Wo ist?).",
          target: "どこですか？",
          textChunks: ["東京駅は", "とても", "大きくて", "複雑です。", "迷子に", "なりました。", "出口は", "どこですか？", "助けて", "ください。"],
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
          textChunks: ["本日のおすすめ:", "焼き鳥", "ビール", "枝豆", "この店に", "英語のメニューは", "ありますか？", "いいえ", "ありません。"],
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
          textChunks: ["JR線", "山手線", "乗り場", "は", "あちらです。", "切符", "うりばは", "1階", "です。"],
          npcReply: "Visuelle Zielerfassung erfolgreich. Sie haben das Wort 'Ticket' gefunden.",
          keyword: "切符",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // ==========================================
    // WOCHE 2: ÜBERLEBEN IM ALLTAG (Hardcore-Drill)
    // ==========================================
  
    // TAG 8: RESTAURANT & ESSEN
    8: {
      morningRoutine: "ZIEL: 15 MINUTEN KULINARISCHER DRILL\n\nBLOCK 1: Bestellen am Frühstückstisch (10 Min)\nZeigen Sie auf jeden Gegenstand, den Sie essen oder trinken möchten (Kaffee, Toast), und kommandieren Sie: '[Gegenstand]、おねがいします'.\n\nBLOCK 2: Die Rechnung anfordern (5 Min)\nBevor Sie das Haus verlassen, tun Sie so, als würden Sie von einem Tisch aufstehen. Verschränken Sie die Finger leicht (das japanische Handzeichen für Rechnung) und sagen Sie laut: 'お会計、おねがいします' (Die Rechnung, bitte).",
      scenarios: [
        {
          type: "speech",
          context: "Sie schauen auf die Speisekarte und möchten das Set-Menü bestellen.",
          physicalAction: "Mit dem Zeigefinger auf die imaginäre Karte tippen.",
          userTask: "Sagen Sie: 'Das hier, bitte.'",
          vocabHint: "Das hier = これ",
          userSpeech: "これ、お願{ねが}いします。",
          npcReply: "はい、こちらの セットですね。かしこまりました。",
          keyword: "セット",
          options: ["セット (Set-Menü)", "おかいけい (Rechnung)", "みず (Wasser)"],
          correctIndex: 0,
          npcTranslation: "Ja, dieses Set-Menü. Verstanden."
        },
        {
          type: "speech",
          context: "Sie haben extremen Durst nach dem Spaziergang und sitzen im Izakaya.",
          physicalAction: "Wisch-Bewegung über die Stirn.",
          userTask: "Bestellen Sie: 'Wasser, bitte.'",
          vocabHint: "Wasser = 水{みず}",
          userSpeech: "水{みず}、お願{ねが}いします。",
          npcReply: "おみず ですね。ただいま おもちします。",
          keyword: "おもちします",
          options: ["ありません (Gibt es nicht)", "おもちします (Ich bringe es)", "これ (Das hier)"],
          correctIndex: 1,
          npcTranslation: "Wasser also. Ich bringe es sofort."
        },
        {
          type: "speech",
          context: "Sie können sich nicht entscheiden und fragen den Kellner nach einer Empfehlung.",
          physicalAction: "Fragend die Hände öffnen.",
          userTask: "Fragen Sie: 'Was ist Ihre Empfehlung?'",
          vocabHint: "Empfehlung = おすすめ",
          userSpeech: "おすすめは どれですか？",
          npcReply: "おすすめは、こちらの ラーメン です。",
          keyword: "ラーメン",
          options: ["ラーメン (Ramen)", "おみず (Wasser)", "メニュー (Menü)"],
          correctIndex: 0,
          npcTranslation: "Die Empfehlung ist diese Ramen hier."
        },
        {
          type: "speech",
          context: "Sie sind fertig mit dem Essen und möchten bezahlen.",
          physicalAction: "Mit den Zeigefingern ein kleines X formen (Japanische Geste für Rechnung).",
          userTask: "Sagen Sie: 'Die Rechnung, bitte.'",
          vocabHint: "Rechnung = お会計{かいけい}",
          userSpeech: "お会計{かいけい}、お願{ねが}いします。",
          npcReply: "おかいけい ですね。レジへ どうぞ。",
          keyword: "レジ",
          options: ["レジ (Kasse)", "おみず (Wasser)", "これ (Das hier)"],
          correctIndex: 0,
          npcTranslation: "Die Rechnung. Bitte gehen Sie zur Kasse."
        },
        {
          type: "speech",
          context: "Der Kellner bringt Ihnen ein Gericht, das Sie nicht bestellt haben.",
          physicalAction: "Abwehrend die Hand heben.",
          userTask: "Machen Sie höflich auf den Fehler aufmerksam: 'Entschuldigung, das ist falsch.'",
          vocabHint: "Falsch / Anders = 違{ちが}います",
          userSpeech: "すみません、違{ちが}います。",
          npcReply: "申し訳{もうしわけ}ありません！ すぐに かえます。",
          keyword: "かえます",
          options: ["かえます (Ich tausche es um)", "レジ (Kasse)", "おみず (Wasser)"],
          correctIndex: 0,
          npcTranslation: "Es tut mir aufrichtig leid! Ich tausche es sofort um."
        },
        {
          type: "speech",
          context: "Sie möchten das Essen mitnehmen (Take-out).",
          physicalAction: "Auf die eigene Tasche deuten.",
          userTask: "Fragen Sie: 'Kann ich das mitnehmen?'",
          vocabHint: "Mitnehmen = 持ち帰り{もちかえり}",
          userSpeech: "持ち帰り{もちかえり}は できますか？",
          npcReply: "はい、テイクアウト できますよ。",
          keyword: "テイクアウト",
          options: ["テイクアウト (Take-out/Mitnehmen)", "レジ (Kasse)", "これ (Das hier)"],
          correctIndex: 0,
          npcTranslation: "Ja, Take-out ist möglich."
        },
        {
          type: "speech",
          context: "Sie haben eine Nuss-Allergie und prüfen das Menü.",
          physicalAction: "Auf die eigene Brust tippen.",
          userTask: "Sagen Sie wichtig: 'Ich habe eine Allergie.'",
          vocabHint: "Allergie = アレルギー",
          userSpeech: "アレルギーが あります。",
          npcReply: "アレルギー ですね。かくにん いたします。",
          keyword: "かくにん",
          options: ["かくにん (Ich überprüfe das)", "おかいけい (Rechnung)", "かえます (Ich tausche es)"],
          correctIndex: 0,
          npcTranslation: "Eine Allergie. Ich werde das überprüfen."
        },
        {
          type: "speech",
          context: "Sie bestellen in einer Bar ein Bier.",
          physicalAction: "So tun, als würden Sie ein Glas halten.",
          userTask: "Sagen Sie: 'Bier, ein Stück (Glas).' (Kombination aus Tag 4)",
          vocabHint: "Bier, Eins = ビール、一つ{ひとつ}",
          userSpeech: "ビール、一つ{ひとつ}",
          npcReply: "生{なま}ビール ひとつ、かしこまりました。",
          keyword: "生{なま}ビール",
          options: ["生{なま}ビール (Fassbier)", "おみず (Wasser)", "おすすめ (Empfehlung)"],
          correctIndex: 0,
          npcTranslation: "Ein Fassbier, verstanden."
        },
        {
          type: "speech",
          context: "Sie haben versehentlich Ihre Stäbchen (Hashi) fallen gelassen.",
          physicalAction: "Entschuldigend lächeln.",
          userTask: "Rufen Sie den Kellner und fragen Sie: 'Gibt es Stäbchen?' (Kombination aus Tag 3)",
          vocabHint: "Stäbchen = 箸{はし}",
          userSpeech: "すみません、箸{はし}は ありますか？",
          npcReply: "はい、あたらしい おはしを おもちします。",
          keyword: "あたらしい",
          options: ["あたらしい (Neu)", "ちがいます (Falsch)", "レジ (Kasse)"],
          correctIndex: 0,
          npcTranslation: "Ja, ich bringe Ihnen neue Stäbchen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein Menü-Schild vor einem Restaurant.",
          physicalAction: "Suchen Sie gezielt nach dem Wort für Rechnung/Kasse.",
          userTask: "Finden Sie das Wort 'Rechnung'.",
          target: "お会計",
          textChunks: ["当店は", "現金のみ", "です。", "お会計", "は", "テーブルで", "お願します。"],
          npcReply: "Visuelle Zielerfassung: Sie haben 'Rechnung' gefunden.",
          keyword: "お会計",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 9: BAHNHOF & TRANSPORT 2.0
    9: {
      morningRoutine: "ZIEL: 15 MINUTEN BAHN-ROUTINE\n\nBLOCK 1: Gleis-Ausruf (10 Min)\nGehen Sie durch die Wohnung. Jedes Zimmer ist ein Gleis. Betreten Sie das Wohnzimmer und rufen Sie: '1番線 (Ichibansen)'. Küche: '2番線 (Nibansen)'. Flur: '3番線 (Sanbansen)'.\n\nBLOCK 2: Der Ticket-Scan (5 Min)\nNehmen Sie eine alte Fahrkarte oder eine Quittung in die Hand und fragen Sie imaginäres Personal laut: 'どこで 乗り換えますか？' (Wo muss ich umsteigen?).",
      scenarios: [
        {
          type: "speech",
          context: "Sie stehen im Bahnhofsgewirr und haben Ihr Gleis vergessen.",
          physicalAction: "Suchend nach oben auf Anzeigetafeln gucken.",
          userTask: "Fragen Sie den Wärter: 'Welches Gleis ist das?'",
          vocabHint: "Welches Gleis = 何番線{なんばんせん}",
          userSpeech: "何番線{なんばんせん}ですか？",
          npcReply: "しんかんせん は、１１番線{じゅういちばんせん} です。",
          keyword: "１１番線",
          options: ["１番線 (Gleis 1)", "１１番線 (Gleis 11)", "３番線 (Gleis 3)"],
          correctIndex: 1,
          npcTranslation: "Der Shinkansen fährt auf Gleis 11."
        },
        {
          type: "speech",
          context: "Sie müssen mit dem Schnellzug fahren und wissen nicht, wo Sie umsteigen sollen.",
          physicalAction: "Mit zwei Fingern eine gehende Bewegung machen und stoppen.",
          userTask: "Fragen Sie: 'Wo muss ich umsteigen?'",
          vocabHint: "Umsteigen = 乗{の}り換{か}え",
          userSpeech: "どこで 乗り換{のりか}えますか？",
          npcReply: "つぎの 駅{えき} で のりかえ です。",
          keyword: "つぎの 駅",
          options: ["つぎの 駅 (Nächster Bahnhof)", "１番線 (Gleis 1)", "いま (Jetzt)"],
          correctIndex: 0,
          npcTranslation: "Sie steigen am nächsten Bahnhof um."
        },
        {
          type: "speech",
          context: "Sie wollen wissen, ob dieser Zug am Bahnhof Kyoto hält.",
          physicalAction: "Mit dem Finger auf den stehenden Zug zeigen.",
          userTask: "Fragen Sie: 'Fährt dieser nach Kyoto?'",
          vocabHint: "Nach Kyoto = 京都{きょうと}まで",
          userSpeech: "京都{きょうと}まで 行{い}きますか？",
          npcReply: "はい、きょうと まで いきますよ。",
          keyword: "いきます",
          options: ["いきません (Fährt nicht)", "いきます (Fährt dorthin)", "のりかえ (Umsteigen)"],
          correctIndex: 1,
          npcTranslation: "Ja, der fährt bis Kyoto."
        },
        {
          type: "speech",
          context: "Sie sind in einen falschen Zug gestiegen und wollen sofort raus.",
          physicalAction: "Auf die geschlossene Tür deuten.",
          userTask: "Fragen Sie panisch: 'Welcher Bahnhof ist das hier?'",
          vocabHint: "Welcher Bahnhof = 何駅{なにえき}",
          userSpeech: "ここは 何駅{なにえき} ですか？",
          npcReply: "ここは しながわえき です。",
          keyword: "しながわえき",
          options: ["きょうとえき (Kyoto)", "しながわえき (Shinagawa)", "とうきょうえき (Tokio)"],
          correctIndex: 1,
          npcTranslation: "Das hier ist der Bahnhof Shinagawa."
        },
        {
          type: "speech",
          context: "Sie suchen den richtigen Ausgang aus dem riesigen Bahnhof Shinjuku.",
          physicalAction: "Mit der Hand suchend in die Ferne deuten.",
          userTask: "Fragen Sie nach dem Ausgang.",
          vocabHint: "Ausgang = 出口{でぐち}",
          userSpeech: "出口{でぐち}は どこですか？",
          npcReply: "でぐち は、あそこの かいかいだん を のぼってください。",
          keyword: "かいだん",
          options: ["かいだん (Treppe)", "のりかえ (Umsteigen)", "１番線 (Gleis 1)"],
          correctIndex: 0,
          npcTranslation: "Der Ausgang? Bitte steigen Sie dort drüben die Treppe hinauf."
        },
        {
          type: "speech",
          context: "Sie wollen ein Ticket kaufen, aber der Automat ist kompliziert.",
          physicalAction: "Auf den Bildschirm des Automaten tippen.",
          userTask: "Rufen Sie das Personal und fragen: 'Wie kaufe ich das?'",
          vocabHint: "Wie kaufen = どうやって 買{か}いますか",
          userSpeech: "どうやって 買{か}いますか？",
          npcReply: "まず、ここを おしてください。",
          keyword: "おして",
          options: ["のりかえ (Umsteigen)", "でぐち (Ausgang)", "おして (Drücken Sie)"],
          correctIndex: 2,
          npcTranslation: "Zuerst drücken Sie bitte hier."
        },
        {
          type: "speech",
          context: "Sie haben Ihre IC-Karte (Suica) verloren und stehen vor der Schranke.",
          physicalAction: "Verzweifelt die Taschen abtasten.",
          userTask: "Sagen Sie dem Wärter: 'Ich habe mein Ticket verloren.'",
          vocabHint: "Verloren = 無くしました{なくしました}",
          userSpeech: "切符{きっぷ}を 無くしました{なくしました}。",
          npcReply: "きっぷ を なくしたんですね。どこから のりましたか？",
          keyword: "どこから",
          options: ["どこから (Von wo?)", "１番線 (Gleis 1)", "おして (Drücken)"],
          correctIndex: 0,
          npcTranslation: "Sie haben das Ticket verloren, ja? Von wo sind Sie eingestiegen?"
        },
        {
          type: "speech",
          context: "Der Zug hat Verspätung und Sie haben einen Termin.",
          physicalAction: "Auf die Uhr tippen.",
          userTask: "Fragen Sie: 'Wann kommt er an?'",
          vocabHint: "Wann ankommen = いつ 着{つ}きますか",
          userSpeech: "いつ 着{つ}きますか？",
          npcReply: "あと １０分（じゅっぷん）で つきます。",
          keyword: "１０分",
          options: ["１番線 (Gleis 1)", "１０分 (10 Minuten)", "でぐち (Ausgang)"],
          correctIndex: 1,
          npcTranslation: "Er kommt in 10 Minuten an."
        },
        {
          type: "speech",
          context: "Sie fragen nach dem Preis für eine Fahrt nach Osaka.",
          physicalAction: "Geldschein-Geste machen.",
          userTask: "Fragen Sie: 'Wie viel kostet das?'",
          vocabHint: "Wie viel = いくら",
          userSpeech: "いくらですか？",
          npcReply: "おおさか まで は、１万４千円（いちまんよんせんえん）です。",
          keyword: "１万４千円",
          options: ["１万４千円 (14.000 Yen)", "のりかえ (Umsteigen)", "１０分 (10 Min)"],
          correctIndex: 0,
          npcTranslation: "Bis Osaka kostet es 14.000 Yen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Sie starren auf eine komplexe digitale Anzeigetafel.",
          physicalAction: "Scannen Sie nach der Gleisnummer.",
          userTask: "Finden Sie das Wort 'Gleis' (番線).",
          target: "番線",
          textChunks: ["特急", "のぞみ", "東京行き", "は", "14", "番線", "から", "発車します"],
          npcReply: "Visuelle Zielerfassung: 'Gleis' gefunden.",
          keyword: "番線",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 10: HOTEL & UNTERKUNFT
    10: {
      morningRoutine: "ZIEL: 15 MINUTEN GAST-REFLEX\n\nBLOCK 1: Der Check-out Drill (10 Min)\nPacken Sie symbolisch eine Tasche. Gehen Sie zur Haustür (Ihre 'Rezeption'). Sagen Sie zum Türrahmen laut: 'チェックアウト おねがいします' (Check-out, bitte).\n\nBLOCK 2: Uhrzeiten abfragen (5 Min)\nFragen Sie Ihre Kaffeemaschine: '朝食は 何時ですか？' (Um wie viel Uhr ist Frühstück?).",
      scenarios: [
        {
          type: "speech",
          context: "Sie stehen an der Hotelrezeption und möchten einchecken.",
          physicalAction: "Pass bereithalten und lächeln.",
          userTask: "Sagen Sie klar und deutlich: 'Check-in, bitte.'",
          vocabHint: "Check-in = チェックイン",
          userSpeech: "チェックイン、お願{ねが}いします。",
          npcReply: "はい、チェックインですね。おなまえ を おねがいします。",
          keyword: "おなまえ",
          options: ["おなまえ (Ihr Name)", "なんじ (Wie viel Uhr)", "あさごはん (Frühstück)"],
          correctIndex: 0,
          npcTranslation: "Ja, Check-in. Ihren Namen, bitte."
        },
        {
          type: "speech",
          context: "Sie haben gebucht, aber der Mitarbeiter findet Sie nicht.",
          physicalAction: "Auf sich selbst deuten.",
          userTask: "Sagen Sie: 'Ich habe eine Reservierung.'",
          vocabHint: "Reservierung = 予約{よやく}",
          userSpeech: "予約{よやく} しています。",
          npcReply: "よやく ですね。かくにん いたします。",
          keyword: "かくにん",
          options: ["かくにん (Ich überprüfe)", "おなまえ (Name)", "チェックアウト (Check-out)"],
          correctIndex: 0,
          npcTranslation: "Eine Reservierung. Ich werde das überprüfen."
        },
        {
          type: "speech",
          context: "Sie sind hungrig und wollen die Frühstückszeiten wissen.",
          physicalAction: "Ess-Bewegung andeuten, dann auf die Uhr tippen.",
          userTask: "Fragen Sie: 'Um wie viel Uhr ist das Frühstück?'",
          vocabHint: "Frühstück, Wie viel Uhr = 朝食{ちょうしょく}、何時{なんじ}",
          userSpeech: "朝食{ちょうしょく}は 何時{なんじ}ですか？",
          npcReply: "あさごはんは、あさ ７時（しちじ）からです。",
          keyword: "７時",
          options: ["７時 (7 Uhr)", "よやく (Reservierung)", "かくにん (Überprüfen)"],
          correctIndex: 0,
          npcTranslation: "Das Frühstück beginnt morgens um 7 Uhr."
        },
        {
          type: "speech",
          context: "Sie müssen früh zum Flughafen und wollen die Abreise planen.",
          physicalAction: "Koffer-Zieh-Bewegung andeuten.",
          userTask: "Fragen Sie nach der Zeit: 'Um wie viel Uhr ist der Check-out?'",
          vocabHint: "Check-out, Wie viel Uhr = チェックアウト、何時{なんじ}",
          userSpeech: "チェックアウトは 何時{なんじ}ですか？",
          npcReply: "チェックアウトは １１時（じゅういちじ）に なります。",
          keyword: "１１時",
          options: ["７時 (7 Uhr)", "１１時 (11 Uhr)", "おなまえ (Name)"],
          correctIndex: 1,
          npcTranslation: "Der Check-out ist um 11 Uhr."
        },
        {
          type: "speech",
          context: "Ihr Zimmer ist im 5. Stock, aber Sie haben den Schlüssel verloren.",
          physicalAction: "Taschen hektisch abtasten.",
          userTask: "Sagen Sie der Rezeption: 'Ich habe den Schlüssel verloren.'",
          vocabHint: "Schlüssel, Verloren = 鍵{かぎ}、無くしました{なくしました}",
          userSpeech: "鍵{かぎ}を 無くしました{なくしました}。",
          npcReply: "かぎ を なくしたんですね。おへやの ばんごう は？",
          keyword: "ばんごう",
          options: ["ばんごう (Nummer)", "なんじ (Wie viel Uhr)", "よやく (Reservierung)"],
          correctIndex: 0,
          npcTranslation: "Schlüssel verloren. Wie lautet Ihre Zimmernummer?"
        },
        {
          type: "speech",
          context: "Das WLAN im Zimmer funktioniert nicht.",
          physicalAction: "Handy frustriert hochhalten.",
          userTask: "Melden Sie an der Rezeption: 'WLAN funktioniert nicht.'",
          vocabHint: "WLAN, Funktioniert nicht = ワイファイ、使えません{つかえません}",
          userSpeech: "ワイファイが 使えません{つかえません}。",
          npcReply: "つかえませんか？ もうしわけありません、しらべます。",
          keyword: "しらべます",
          options: ["しらべます (Ich untersuche das)", "ばんごう (Nummer)", "チェックイン (Check-in)"],
          correctIndex: 0,
          npcTranslation: "Es geht nicht? Entschuldigung, ich werde das überprüfen."
        },
        {
          type: "speech",
          context: "Sie reisen ab, haben aber noch den ganzen Tag in Tokio und wollen den Koffer nicht mitschleppen.",
          physicalAction: "Auf den Koffer zeigen und abwartend gucken.",
          userTask: "Fragen Sie: 'Können Sie mein Gepäck aufbewahren?'",
          vocabHint: "Gepäck, Aufbewahren = 荷物{にもつ}、預かれますか{あずかれますか}",
          userSpeech: "荷物{にもつ}は 預かれますか{あずかれますか}？",
          npcReply: "はい、にもつ を おあずかり いたします。何時（なんじ）までですか？",
          keyword: "なんじまで",
          options: ["なんじまで (Bis wie viel Uhr?)", "しらべます (Untersuchen)", "かぎ (Schlüssel)"],
          correctIndex: 0,
          npcTranslation: "Ja, wir bewahren Ihr Gepäck auf. Bis wie viel Uhr?"
        },
        {
          type: "speech",
          context: "Sie rufen den Zimmerservice an.",
          physicalAction: "Telefonhörer-Geste.",
          userTask: "Sagen Sie: 'Zimmerservice, bitte.'",
          vocabHint: "Zimmerservice = ルームサービス",
          userSpeech: "ルームサービス、お願{ねが}いします。",
          npcReply: "はい、ルームサービス です。ごちゅうもん は？",
          keyword: "ごちゅうもん",
          options: ["ごちゅうもん (Ihre Bestellung?)", "にもつ (Gepäck)", "かぎ (Schlüssel)"],
          correctIndex: 0,
          npcTranslation: "Ja, Zimmerservice. Was möchten Sie bestellen?"
        },
        {
          type: "speech",
          context: "Das Zimmer ist zu laut, Sie können nicht schlafen.",
          physicalAction: "Hände an die Ohren halten.",
          userTask: "Beschweren Sie sich: 'Es ist laut.'",
          vocabHint: "Laut = うるさい",
          userSpeech: "うるさいです。",
          npcReply: "うるさいですか？ たいへん もうしわけありません。",
          keyword: "もうしわけありません",
          options: ["もうしわけありません (Es tut mir sehr leid)", "ごちゅうもん (Bestellung)", "チェックイン (Check-in)"],
          correctIndex: 0,
          npcTranslation: "Es ist laut? Das tut mir aufrichtig leid."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein Informationsblatt in Ihrem Hotelzimmer.",
          physicalAction: "Filtern Sie die Zeiten heraus.",
          userTask: "Scannen Sie nach dem Wort 'Frühstück'.",
          target: "朝食",
          textChunks: ["当ホテルの", "朝食", "は", "午前", "7時", "から", "9時", "まで", "です。"],
          npcReply: "Visuelle Zielerfassung: 'Frühstück' gefunden.",
          keyword: "朝食",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 11: SHOPPING & KONBINI
    11: {
      morningRoutine: "ZIEL: 15 MINUTEN KAUFRAUSCH\n\nBLOCK 1: Der Preis-Drill (10 Min)\nNehmen Sie verschiedene Gegenstände in Ihrer Wohnung in die Hand. Heben Sie sie hoch und fragen Sie energisch: 'いくらですか？' (Wie viel kostet das?).\n\nBLOCK 2: Kreditkarten-Zücken (5 Min)\nNehmen Sie Ihre EC- oder Kreditkarte. Tun Sie so, als würden Sie an einer Kasse stehen, zeigen Sie die Karte und sagen Sie: 'カードは 使えますか？' (Kann ich mit Karte zahlen?).",
      scenarios: [
        {
          type: "speech",
          context: "Sie haben im Geschäft eine tolle Jacke gefunden, sehen aber kein Preisschild.",
          physicalAction: "Auf das Schildchen suchen.",
          userTask: "Fragen Sie den Verkäufer: 'Wie viel kostet das?'",
          vocabHint: "Wie viel = いくら",
          userSpeech: "いくらですか？",
          npcReply: "こちらは ５千円（ごせんえん）に なります。",
          keyword: "５千円",
          options: ["５千円 (5.000 Yen)", "カード (Karte)", "サイズ (Größe)"],
          correctIndex: 0,
          npcTranslation: "Das hier kostet 5.000 Yen."
        },
        {
          type: "speech",
          context: "Sie haben kein Bargeld mehr, nur noch Plastik.",
          physicalAction: "Eine imaginäre Karte hochhalten.",
          userTask: "Fragen Sie an der Kasse: 'Kann ich eine Karte benutzen?'",
          vocabHint: "Karte, Benutzen = カード、使えますか{つかえますか}",
          userSpeech: "カードは 使えますか{つかえますか}？",
          npcReply: "はい、クレジットカード つかえますよ。",
          keyword: "クレジットカード",
          options: ["いくら (Wie viel)", "クレジットカード (Kreditkarte)", "サイズ (Größe)"],
          correctIndex: 1,
          npcTranslation: "Ja, Sie können Kreditkarten benutzen."
        },
        {
          type: "speech",
          context: "Sie möchten das T-Shirt anprobieren, bevor Sie es kaufen.",
          physicalAction: "T-Shirt an den eigenen Körper halten.",
          userTask: "Fragen Sie: 'Kann ich das anprobieren?'",
          vocabHint: "Anprobieren (Versuchen) = 着{き}てもいいですか",
          userSpeech: "着{き}てもいいですか？",
          npcReply: "はい、しちゃくしつ は あちらです。",
          keyword: "しちゃくしつ",
          options: ["しちゃくしつ (Umkleidekabine)", "カード (Karte)", "いくら (Wie viel)"],
          correctIndex: 0,
          npcTranslation: "Ja, die Umkleidekabine ist dort drüben."
        },
        {
          type: "speech",
          context: "Die Schuhe sind zu klein. Sie brauchen eine andere Größe.",
          physicalAction: "Auf den Fuß zeigen und Kopf schütteln.",
          userTask: "Sagen Sie: 'Haben Sie eine andere Größe?'",
          vocabHint: "Andere Größe = 違{ちが}うサイズ",
          userSpeech: "違{ちが}うサイズは ありますか？",
          npcReply: "はい、すこし おおきい サイズを おもちします。",
          keyword: "おおきい",
          options: ["おおきい (Groß)", "カード (Karte)", "しちゃくしつ (Umkleide)"],
          correctIndex: 0,
          npcTranslation: "Ja, ich bringe eine etwas größere Größe."
        },
        {
          type: "speech",
          context: "Die Farbe gefällt Ihnen nicht, Sie hätten es lieber in Schwarz.",
          physicalAction: "Am Stoff zupfen.",
          userTask: "Fragen Sie: 'Gibt es das in Schwarz?'",
          vocabHint: "Schwarz = 黒{くろ}",
          userSpeech: "黒{くろ}は ありますか？",
          npcReply: "くろ は、いま ありません。もうしわけありません。",
          keyword: "ありません",
          options: ["ありません (Gibt es nicht)", "おおきい (Groß)", "いくら (Wie viel)"],
          correctIndex: 0,
          npcTranslation: "Schwarz haben wir im Moment nicht. Es tut mir leid."
        },
        {
          type: "speech",
          context: "Sie haben sich entschieden und wollen den Artikel kaufen.",
          physicalAction: "Den Gegenstand bestimmt auf den Tresen legen.",
          userTask: "Sagen Sie: 'Ich nehme das.' (Das hier, bitte).",
          vocabHint: "Das hier = これ",
          userSpeech: "これを お願{ねが}いします。",
          npcReply: "ありがとうございます。レジへ どうぞ。",
          keyword: "レジ",
          options: ["くろ (Schwarz)", "レジ (Kasse)", "おおきい (Groß)"],
          correctIndex: 1,
          npcTranslation: "Vielen Dank. Zur Kasse, bitte."
        },
        {
          type: "speech",
          context: "Der Konbini-Verkäufer fragt, ob Sie die Bento-Box warm gemacht haben möchten.",
          physicalAction: "Zuhören, er hält die Box hoch.",
          userTask: "Er fragt auf Japanisch, Sie sagen einfach: 'Ja, bitte.'",
          vocabHint: "Ja, Bitte = はい、お願{ねが}いします",
          userSpeech: "はい、お願{ねが}いします。",
          npcReply: "おべんとう、あたためますね。少々お待ちください。",
          keyword: "あたためます",
          options: ["あたためます (Ich wärme es auf)", "レジ (Kasse)", "くろ (Schwarz)"],
          correctIndex: 0,
          npcTranslation: "Ich wärme die Bento-Box auf. Bitte warten Sie kurz."
        },
        {
          type: "speech",
          context: "Sie kaufen ein Geschenk und möchten, dass es eingepackt wird.",
          physicalAction: "Eine Schleifen-Bewegung andeuten.",
          userTask: "Sagen Sie: 'Geschenkverpackung, bitte.'",
          vocabHint: "Geschenk = プレゼント",
          userSpeech: "プレゼント用{よう}に お願{ねが}いします。",
          npcReply: "プレゼントよう ですね。かしこまりました。",
          keyword: "プレゼントよう",
          options: ["プレゼントよう (Für ein Geschenk)", "あたためます (Aufwärmen)", "いくら (Wie viel)"],
          correctIndex: 0,
          npcTranslation: "Als Geschenk verpackt, ja. Verstanden."
        },
        {
          type: "speech",
          context: "Sie suchen im Supermarkt frisches Sushi, sehen aber keins.",
          physicalAction: "Suchend durch die Gänge blicken.",
          userTask: "Fragen Sie das Personal: 'Gibt es Sushi?'",
          vocabHint: "Sushi = 寿司{すし}",
          userSpeech: "寿司{すし}は ありますか？",
          npcReply: "すし は、あちらの コーナー に ございます。",
          keyword: "コーナー",
          options: ["コーナー (Ecke / Bereich)", "プレゼント (Geschenk)", "あたためます (Aufwärmen)"],
          correctIndex: 0,
          npcTranslation: "Sushi befindet sich dort drüben in dem Bereich."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein rotes Schild im Schaufenster.",
          physicalAction: "Scharfstellen auf das Wesentliche.",
          userTask: "Finden Sie das Wort 'Wie viel' (Preis).",
          target: "いくら",
          textChunks: ["本日の", "大安売り！", "これは", "いくら", "ですか？", "驚きの", "100円", "です！"],
          npcReply: "Visuelle Zielerfassung: 'Wie viel' gefunden.",
          keyword: "いくら",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 12: NOTFALL & HILFE
    12: {
      morningRoutine: "ZIEL: 15 MINUTEN KRISEN-PRÄVENTION\n\nBLOCK 1: Der Panik-Ruf (10 Min)\nLaufen Sie schnell auf der Stelle. Stoppen Sie abrupt, reißen Sie die Augen auf und rufen Sie laut: '助けてください！' (Helfen Sie mir!). Machen Sie das 5 Mal, um den Reflex für echte Notfälle zu schärfen.\n\nBLOCK 2: Die Schmerz-Lokalisierung (5 Min)\nTippen Sie auf verschiedene Körperteile (Kopf, Bauch, Bein) und rufen Sie jedes Mal schmerzverzerrt: '痛いです！' (Es tut weh!).",
      scenarios: [
        {
          type: "speech",
          context: "Sie wurden bestohlen und geraten in Panik.",
          physicalAction: "Wild mit den Armen fuchteln.",
          userTask: "Rufen Sie einen Passanten an: 'Helfen Sie mir, bitte!'",
          vocabHint: "Helfen = 助{たす}けて",
          userSpeech: "助{たす}けてください！",
          npcReply: "どうしましたか！？ だいじょうぶ ですか！？",
          keyword: "どうしましたか",
          options: ["どうしましたか (Was ist passiert?)", "いたい (Tut weh)", "パスポート (Pass)"],
          correctIndex: 0,
          npcTranslation: "Was ist passiert!? Ist alles in Ordnung!?"
        },
        {
          type: "speech",
          context: "Sie müssen den Diebstahl melden. Sie eilen zur Koban (Polizeibox).",
          physicalAction: "Atemlos an den Tresen stützen.",
          userTask: "Sagen Sie: 'Rufen Sie die Polizei!' (Falls Sie noch auf der Straße sind).",
          vocabHint: "Polizei = 警察{けいさつ}",
          userSpeech: "警察{けいさつ}を 呼{よ}んでください！",
          npcReply: "けいさつ を よびます！ 落ち着いて（おちついて）ください。",
          keyword: "おちついて",
          options: ["おちついて (Beruhigen Sie sich)", "どうしましたか (Was ist passiert?)", "いたい (Tut weh)"],
          correctIndex: 0,
          npcTranslation: "Ich rufe die Polizei! Bitte beruhigen Sie sich."
        },
        {
          type: "speech",
          context: "Sie haben extreme Schmerzen im Bauch und sind im Krankenhaus.",
          physicalAction: "Den Bauch halten und das Gesicht verziehen.",
          userTask: "Sagen Sie dem Arzt: 'Es tut weh.'",
          vocabHint: "Tut weh = 痛{いた}いです",
          userSpeech: "痛{いた}いです。",
          npcReply: "どこが いたい ですか？",
          keyword: "どこ",
          options: ["どこ (Wo?)", "おちついて (Beruhigen)", "けいさつ (Polizei)"],
          correctIndex: 0,
          npcTranslation: "Wo tut es weh?"
        },
        {
          type: "speech",
          context: "Sie haben Ihren Reisepass verloren, der Super-GAU.",
          physicalAction: "Hände vors Gesicht schlagen.",
          userTask: "Sagen Sie auf der Botschaft/Polizei: 'Ich habe meinen Pass verloren.'",
          vocabHint: "Pass = パスポート",
          userSpeech: "パスポートを 無くしました{なくしました}。",
          npcReply: "パスポートですね。いつ なくしましたか？",
          keyword: "いつ",
          options: ["いつ (Wann?)", "どこ (Wo?)", "いたい (Tut weh)"],
          correctIndex: 0,
          npcTranslation: "Ihren Pass. Wann haben Sie ihn verloren?"
        },
        {
          type: "speech",
          context: "Ein Unfall ist passiert, jemand ist schwer verletzt.",
          physicalAction: "Auf den Verletzten deuten.",
          userTask: "Rufen Sie Umstehenden zu: 'Rufen Sie einen Krankenwagen!'",
          vocabHint: "Krankenwagen = 救急車{きゅうきゅうしゃ}",
          userSpeech: "救急車{きゅうきゅうしゃ}を 呼{よ}んでください！",
          npcReply: "すぐ に きゅうきゅうしゃ を よびます！",
          keyword: "すぐに",
          options: ["すぐに (Sofort)", "いつ (Wann)", "おちついて (Beruhigen)"],
          correctIndex: 0,
          npcTranslation: "Ich rufe sofort einen Krankenwagen!"
        },
        {
          type: "speech",
          context: "Sie haben im Zug Ihr Portemonnaie liegen lassen.",
          physicalAction: "Verzweifelt in die leere Tasche greifen.",
          userTask: "Sagen Sie am Fundbüro: 'Ich habe mein Portemonnaie verloren.'",
          vocabHint: "Portemonnaie = 財布{さいふ}",
          userSpeech: "財布{さいふ}を 無くしました{なくしました}。",
          npcReply: "さいふ ですね。どんな 色（いろ） ですか？",
          keyword: "いろ",
          options: ["いろ (Farbe)", "すぐに (Sofort)", "いつ (Wann)"],
          correctIndex: 0,
          npcTranslation: "Ihr Portemonnaie. Was für eine Farbe hat es?"
        },
        {
          type: "speech",
          context: "Mitten in der Nacht brennt es im Hotel.",
          physicalAction: "Wild winken und auf den Flur rennen.",
          userTask: "Rufen Sie so laut Sie können: 'Feuer!'",
          vocabHint: "Feuer = 火事{かじ}",
          userSpeech: "火事{かじ}だ！",
          npcReply: "にげてください！ ひなん してください！",
          keyword: "にげてください",
          options: ["にげてください (Fliehen Sie!)", "いろ (Farbe)", "すぐに (Sofort)"],
          correctIndex: 0,
          npcTranslation: "Fliehen Sie! Bitte evakuieren Sie sich!"
        },
        {
          type: "speech",
          context: "Die Erde bebt stark. (Erdbeben)",
          physicalAction: "Unter einen imaginären Tisch ducken.",
          userTask: "Rufen Sie instinktiv: 'Erdbeben!'",
          vocabHint: "Erdbeben = 地震{じしん}",
          userSpeech: "地震{じしん}だ！",
          npcReply: "あたま を まもって ください！",
          keyword: "あたま",
          options: ["あたま (Kopf)", "かじ (Feuer)", "いろ (Farbe)"],
          correctIndex: 0,
          npcTranslation: "Bitte schützen Sie Ihren Kopf!"
        },
        {
          type: "speech",
          context: "Sie fühlen sich extrem unwohl und stehen kurz vor der Ohnmacht.",
          physicalAction: "An die Wand lehnen, schwer atmen.",
          userTask: "Sagen Sie einem Passanten: 'Mir ist schlecht.' (Fühle mich schlecht).",
          vocabHint: "Schlecht fühlen = 気分{きぶん}が悪{わる}いです",
          userSpeech: "気分{きぶん}が悪{わる}いです。",
          npcReply: "だいじょうぶ ですか？ すわって ください。",
          keyword: "すわって",
          options: ["すわって (Setzen Sie sich)", "あたま (Kopf)", "かじ (Feuer)"],
          correctIndex: 0,
          npcTranslation: "Alles in Ordnung? Bitte setzen Sie sich."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein roter Warnhinweis im Aufzug.",
          physicalAction: "Im Notfall keine Kanjis entschlüsseln, nur Schlüsselwörter finden.",
          userTask: "Lokalisieren Sie sofort das Wort 'Erdbeben'.",
          target: "地震",
          textChunks: ["火事", "や", "地震", "の", "場合は", "エレベーターを", "使わないで", "ください。"],
          npcReply: "Visuelle Zielerfassung: 'Erdbeben' gefunden.",
          keyword: "地震",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 13: VERFEINERUNG & VERSTÄNDNIS
    13: {
      morningRoutine: "ZIEL: 15 MINUTEN KOMMUNIKATIONS-KONTROLLE\n\nBLOCK 1: Die 'Stopp'-Geste (10 Min)\nStellen Sie sich vor, der Radio- oder Fernsehmoderator spricht zu schnell. Heben Sie die Hände abwehrend und rufen Sie: 'ゆっくり おねがいします' (Bitte langsamer).\n\nBLOCK 2: Der 'Nochmal'-Reflex (5 Min)\nTun Sie so, als hätten Sie eine Durchsage nicht verstanden. Halten Sie die Hand ans Ohr und sagen Sie: 'もう一度 おねがいします' (Bitte noch einmal).",
      scenarios: [
        {
          type: "speech",
          context: "Der Bahnhofswärter erklärt Ihnen den Weg, aber er redet wie ein Maschinengewehr.",
          physicalAction: "Die flachen Hände sanft nach unten drücken (Geste für langsam).",
          userTask: "Bitten Sie ihn: 'Langsamer, bitte.'",
          vocabHint: "Langsam = ゆっくり",
          userSpeech: "ゆっくり お願{ねが}いします。",
          npcReply: "あ、すみません。もういちど、ゆっくり はなします。",
          keyword: "もういちど",
          options: ["もういちど (Noch einmal)", "わかりません (Weiß nicht)", "えいご (Englisch)"],
          correctIndex: 0,
          npcTranslation: "Ah, Entschuldigung. Ich spreche noch einmal, langsam."
        },
        {
          type: "speech",
          context: "Der Kassierer hat etwas gemurmelt, Sie haben kein Wort verstanden.",
          physicalAction: "Hand ans Ohr legen.",
          userTask: "Sagen Sie: 'Noch einmal, bitte.'",
          vocabHint: "Noch einmal = もう一度{いちど}",
          userSpeech: "もう一度{いちど} お願{ねが}いします。",
          npcReply: "ポイントカードは おもちですか？",
          keyword: "ポイントカード",
          options: ["ポイントカード (Punkte-Karte)", "もういちど (Noch einmal)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Haben Sie eine Punktekarte?"
        },
        {
          type: "speech",
          context: "Jemand fragt Sie auf der Straße auf fließendem Japanisch nach dem Weg.",
          physicalAction: "Kopf schütteln, abwinken.",
          userTask: "Seien Sie ehrlich: 'Ich verstehe nicht.'",
          vocabHint: "Verstehe nicht = 分{わ}かりません",
          userSpeech: "分{わ}かりません。",
          npcReply: "そうですか。すみません。",
          keyword: "そうですか",
          options: ["そうですか (Ach so / Verstehe)", "ゆっくり (Langsam)", "もういちど (Noch einmal)"],
          correctIndex: 0,
          npcTranslation: "Ach so. Entschuldigung."
        },
        {
          type: "speech",
          context: "Der Hotelmitarbeiter redet auf Sie ein. Sie wollen wissen, ob er Englisch spricht.",
          physicalAction: "Fragend die Hände öffnen.",
          userTask: "Fragen Sie: 'Sprechen Sie Englisch?'",
          vocabHint: "Englisch = 英語{えいご}",
          userSpeech: "英語{えいご}を 話{はな}しますか？",
          npcReply: "はい、すこし えいご が はなせます。",
          keyword: "すこし",
          options: ["すこし (Ein bisschen)", "わかりません (Weiß nicht)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Ja, ich kann ein bisschen Englisch sprechen."
        },
        {
          type: "speech",
          context: "Sie sitzen im Taxi und möchten wissen, wie lange die Fahrt dauert.",
          physicalAction: "Auf die Uhr deuten.",
          userTask: "Fragen Sie: 'Wie lange dauert es?'",
          vocabHint: "Wie lange = どのくらい",
          userSpeech: "どのくらい かかりますか？",
          npcReply: "あと ２０分（にじゅっぷん）くらい です。",
          keyword: "２０分",
          options: ["２０分 (20 Minuten)", "すこし (Ein bisschen)", "わかりません (Verstehe nicht)"],
          correctIndex: 0,
          npcTranslation: "Es dauert noch etwa 20 Minuten."
        },
        {
          type: "speech",
          context: "Der Arzt erklärt Ihnen die Diagnose, Sie nicken verstehend.",
          physicalAction: "Kräftig nicken.",
          userTask: "Sagen Sie: 'Ich habe verstanden.'",
          vocabHint: "Verstanden = 分{わ}かりました",
          userSpeech: "分{わ}かりました。",
          npcReply: "では、おだいじに。",
          keyword: "おだいじに",
          options: ["おだいじに (Gute Besserung)", "２０分 (20 Minuten)", "すこし (Ein bisschen)"],
          correctIndex: 0,
          npcTranslation: "Nun dann, gute Besserung."
        },
        {
          type: "speech",
          context: "Jemand hat ein extrem langes japanisches Wort gesagt. Sie wollen, dass er es aufschreibt.",
          physicalAction: "Schreibbewegung auf der Handfläche.",
          userTask: "Sagen Sie: 'Schreiben Sie es bitte auf.'",
          vocabHint: "Schreiben = 書{か}いて",
          userSpeech: "書{か}いて ください。",
          npcReply: "はい、ここに かきますね。",
          keyword: "かきます",
          options: ["かきます (Ich schreibe)", "おだいじに (Gute Besserung)", "わかりました (Verstanden)"],
          correctIndex: 0,
          npcTranslation: "Ja, ich schreibe es hierhin."
        },
        {
          type: "speech",
          context: "Sie haben ein Foto auf dem Handy und fragen, was das auf Japanisch heißt.",
          physicalAction: "Auf das Foto zeigen.",
          userTask: "Fragen Sie: 'Was ist das?'",
          vocabHint: "Was = 何{なん}",
          userSpeech: "これは 何{なん}ですか？",
          npcReply: "それは、「おまもり」 です。",
          keyword: "おまもり",
          options: ["おまもり (Omamori / Amulett)", "かきます (Ich schreibe)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Das da ist ein 'Omamori' (Amulett)."
        },
        {
          type: "speech",
          context: "Der Schaffner fragt Sie etwas. Sie wollen sagen, dass Sie nur ein bisschen Japanisch können.",
          physicalAction: "Daumen und Zeigefinger zeigen 'ein bisschen'.",
          userTask: "Sagen Sie: 'Ein bisschen.'",
          vocabHint: "Ein bisschen = 少{すこ}し",
          userSpeech: "少{すこ}し わかります。",
          npcReply: "にほんご、じょうず ですね！",
          keyword: "じょうず",
          options: ["じょうず (Gut / Geschickt)", "おまもり (Amulett)", "かきます (Ich schreibe)"],
          correctIndex: 0,
          npcTranslation: "Ihr Japanisch ist aber gut!"
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein Sprachführer-Buch im Hostel.",
          physicalAction: "Scannen nach dem Hilferuf der Sprache.",
          userTask: "Finden Sie das Wort 'Englisch'.",
          target: "英語",
          textChunks: ["すみません、", "私は", "日本語が", "分かりません。", "英語", "を", "話せる人は", "いますか？"],
          npcReply: "Visuelle Zielerfassung: 'Englisch' gefunden.",
          keyword: "英語",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 14: DIE GROSSE WOCHENPRÜFUNG 2
    14: {
      morningRoutine: "ZIEL: 15 MINUTEN TOTALER STRESS-TEST\n\nBLOCK 1: Der ultimative Dusch-Simulator (15 Min)\nKombinieren Sie alles. Ein Erdbeben im Restaurant. Sie rufen nach Hilfe (助けて). Sie fragen nach dem Ausgang (出口はどこですか). Der Kellner redet zu schnell, Sie stoppen ihn (ゆっくりおねがいします).",
      scenarios: [
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sind im Konbini und wollen eine Bento-Box kaufen, aber auch wissen, ob Sie mit Karte zahlen können.",
          physicalAction: "Karte in der Hand halten, auf Box zeigen.",
          userTask: "Sagen Sie: 'Das hier, bitte. Kann ich eine Karte benutzen?'",
          vocabHint: "Das hier + Karte benutzen",
          userSpeech: "これを お願{ねが}いします。カードは 使えますか{つかえますか}？",
          npcReply: "はい、カードでのおしはらい、だいじょうぶです。",
          keyword: "だいじょうぶ",
          options: ["だいじょうぶ (Ist in Ordnung)", "わかりません (Weiß nicht)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Ja, Zahlung mit Karte ist in Ordnung."
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Es brennt im Hotel. Sie rennen zur Rezeption.",
          physicalAction: "Wild fuchteln.",
          userTask: "Rufen Sie: 'Feuer! Rufen Sie die Polizei!'",
          vocabHint: "Feuer + Polizei",
          userSpeech: "火事{かじ}だ！警察{けいさつ}を 呼{よ}んでください！",
          npcReply: "ひなんしてください！ すぐに よびます！",
          keyword: "すぐに",
          options: ["すぐに (Sofort)", "だいじょうぶ (In Ordnung)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Bitte evakuieren Sie! Ich rufe sie sofort!"
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sitzen im Taxi. Der Fahrer fährt in die falsche Richtung.",
          physicalAction: "Hände abwehrend heben.",
          userTask: "Rufen Sie: 'Falsch! Links, bitte.'",
          vocabHint: "Falsch/Anders + Links",
          userSpeech: "違{ちが}います！左{ひだり}、お願{ねが}いします。",
          npcReply: "あ、すみません！ 左{ひだり}ですね。",
          keyword: "すみません",
          options: ["すみません (Entschuldigung)", "すぐに (Sofort)", "だいじょうぶ (In Ordnung)"],
          correctIndex: 0,
          npcTranslation: "Ah, Entschuldigung! Links, ja."
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie sind im Bahnhof und haben Ihr Ticket verloren.",
          physicalAction: "Taschen abtasten.",
          userTask: "Sagen Sie dem Personal: 'Entschuldigung, ich habe mein Ticket verloren.'",
          vocabHint: "Entschuldigung + Ticket verloren",
          userSpeech: "すみません、切符{きっぷ}を 無くしました{なくしました}。",
          npcReply: "どこから のりましたか？",
          keyword: "どこから",
          options: ["どこから (Von wo?)", "すみません (Entschuldigung)", "すぐに (Sofort)"],
          correctIndex: 0,
          npcTranslation: "Von wo sind Sie eingestiegen?"
        },
        {
          type: "speech",
          context: "MUSTER-MIX: Sie fragen an der Rezeption, wann das WLAN funktioniert.",
          physicalAction: "Auf Handy zeigen und fragend gucken.",
          userTask: "Fragen Sie: 'WLAN, wann ist das?'",
          vocabHint: "WLAN + Wann",
          userSpeech: "ワイファイは いつですか？",
          npcReply: "ワイファイは、あとで つかえます。",
          keyword: "あとで",
          options: ["あとで (Später)", "どこから (Von wo)", "すぐに (Sofort)"],
          correctIndex: 0,
          npcTranslation: "Das WLAN können Sie später benutzen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Ein panischer Blick auf die Anzeigetafel bei Verspätungen.",
          physicalAction: "Trotz Stress nur nach dem entscheidenden Kanji suchen.",
          userTask: "Lokalisieren Sie sofort das Wort 'Umsteigen'.",
          target: "乗り換え",
          textChunks: ["本日は", "遅延が", "発生しています。", "新宿駅での", "乗り換え", "は", "できません。", "ご注意ください。"],
          npcReply: "Visuelle Zielerfassung: 'Umsteigen' gefunden.",
          keyword: "乗り換え",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Sie prüfen eine Rechnung auf versteckte Kosten.",
          physicalAction: "Kalt und präzise scannen.",
          userTask: "Finden Sie das Wort 'Karte' (für Zahlung).",
          target: "カード",
          textChunks: ["お支払いは", "現金、", "または", "クレジットカード", "の", "カード", "決済が", "可能です。"],
          npcReply: "Visuelle Zielerfassung: 'Karte' gefunden.",
          keyword: "カード",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          context: "TEXT-SCANNER: Eine Notfall-Nachricht auf Ihrem Handy.",
          physicalAction: "Sofort das Schlüsselwort erfassen.",
          userTask: "Finden Sie das Wort 'Erdbeben'.",
          target: "地震",
          textChunks: ["緊急速報：", "先ほど", "関東地方で", "強い", "地震", "が", "ありました。", "安全を", "確保してください。"],
          npcReply: "Visuelle Zielerfassung: 'Erdbeben' gefunden.",
          keyword: "地震",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    }, // <--- HIER IST DAS KOMMA NACH TAG 14 (Überschreibe das Ende deiner Datei ab hier)

    // ==========================================
    // WOCHE 3: TIME-ATTACK & REFLEX-DRILL
    // ==========================================
  
    // TAG 15: TRANSPORT SPEEDRUN (4 Sekunden Limit)
    15: {
      morningRoutine: "ZIEL: 15 MINUTEN KALTSTART-STRESS\n\nBLOCK 1: Wenn heute jemand eine Frage an Sie richtet (egal auf welcher Sprache), formen Sie zuerst in Gedanken sofort die japanische Antwort auf die Frage 'Wo ist der Bahnhof?', bevor Sie der Person auf Deutsch antworten.",
      scenarios: [
        {
          type: "speech",
          timeLimit: 4,
          context: "Der Zug fährt gleich ab. Sie müssen wissen, wo das Ticketbüro ist.",
          physicalAction: "Tippen Sie ungeduldig mit dem Fuß.",
          userTask: "Fragen Sie blitzschnell: 'Wo ist das Ticketbüro?'",
          vocabHint: "Ticket = 切符{きっぷ}",
          userSpeech: "切符{きっぷ}は どこですか？",
          npcReply: "あっちの 右{みぎ} です！急いで！",
          keyword: "右{みぎ}",
          options: ["右{みぎ} (Rechts)", "左{ひだり} (Links)", "まっすぐ (Geradeaus)"],
          correctIndex: 0,
          npcTranslation: "Dort drüben rechts! Beeilen Sie sich!"
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Der Taxifahrer wartet auf Ihre Anweisung an der Kreuzung.",
          physicalAction: "Zeigen Sie sofort nach links.",
          userTask: "Befehlen Sie: 'Links, bitte!'",
          vocabHint: "Links = 左{ひだり}",
          userSpeech: "左{ひだり}、おねがいします。",
          npcReply: "はい、左{ひだり}ですね！",
          keyword: "左{ひだり}",
          options: ["まっすぐ (Geradeaus)", "右{みぎ} (Rechts)", "左{ひだり} (Links)"],
          correctIndex: 2,
          npcTranslation: "Ja, links!"
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Sie müssen wissen, welches Gleis das ist, der Zug rollt ein.",
          physicalAction: "Auf den Zug deuten.",
          userTask: "Fragen Sie: 'Welches Gleis ist das?'",
          vocabHint: "Welches Gleis = 何番線{なんばんせん}",
          userSpeech: "何番線{なんばんせん}ですか？",
          npcReply: "ここは ３番線{さんばんせん} です！",
          keyword: "３番線",
          options: ["１番線 (Gleis 1)", "３番線 (Gleis 3)", "１０番線 (Gleis 10)"],
          correctIndex: 1,
          npcTranslation: "Das hier ist Gleis 3!"
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Eine Rolltreppe ist kaputt, Sie suchen den Aufzug.",
          physicalAction: "Schweres Gepäck andeuten.",
          userTask: "Fragen Sie sofort: 'Wo ist der Aufzug?'",
          vocabHint: "Aufzug = エレベーター",
          userSpeech: "エレベーターは どこですか？",
          npcReply: "エレベーターは まっすぐ です！",
          keyword: "まっすぐ",
          options: ["左{ひだり} (Links)", "まっすぐ (Geradeaus)", "右{みぎ} (Rechts)"],
          correctIndex: 1,
          npcTranslation: "Der Aufzug ist geradeaus!"
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Sie wollen wissen, wann der Bus ankommt.",
          physicalAction: "Schnell auf die Uhr tippen.",
          userTask: "Fragen Sie: 'Wann kommt er an?'",
          vocabHint: "Ankommen = 着{つ}きますか",
          userSpeech: "いつ 着{つ}きますか？",
          npcReply: "５分後（ごふんご）です！",
          keyword: "５分",
          options: ["１０分 (10 Min)", "５分 (5 Min)", "１分 (1 Min)"],
          correctIndex: 1,
          npcTranslation: "In 5 Minuten!"
        }
      ]
    },
  
    // TAG 16: RESTAURANT SPEEDRUN (4 Sekunden Limit)
    16: {
      morningRoutine: "ZIEL: 15 MINUTEN KULINARISCHER STRESS\n\nBLOCK 1: Benennen Sie beim Frühstück Ihre Handlungen laut auf Japanisch in Rekordzeit. 'Wasser! Eins!' (水、一つ).",
      scenarios: [
        {
          type: "speech",
          timeLimit: 4,
          context: "Der Kellner läuft vorbei, Sie wollen bezahlen.",
          physicalAction: "X mit den Fingern formen.",
          userTask: "Rufen Sie sofort: 'Die Rechnung, bitte!'",
          vocabHint: "Rechnung = お会計{かいけい}",
          userSpeech: "お会計{かいけい}、お願{ねが}いします。",
          npcReply: "はい、おかいけい ですね。レジへ どうぞ。",
          keyword: "レジ",
          options: ["レジ (Kasse)", "おみず (Wasser)", "メニュー (Menü)"],
          correctIndex: 0,
          npcTranslation: "Ja, die Rechnung. Bitte zur Kasse."
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Sie zeigen schnell auf das Bild im Menü, bevor der Kellner geht.",
          physicalAction: "Energisch auf die Karte tippen.",
          userTask: "Bestellen Sie: 'Das hier, bitte!'",
          vocabHint: "Das hier = これ",
          userSpeech: "これを お願{ねが}いします。",
          npcReply: "こちらですね、かしこまりました。",
          keyword: "こちら",
          options: ["あちら (Dort drüben)", "こちら (Das hier)", "どこ (Wo)"],
          correctIndex: 1,
          npcTranslation: "Das hier, verstanden."
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Sie verschlucken sich, Sie brauchen sofort Wasser.",
          physicalAction: "An den Hals fassen.",
          userTask: "Befehlen Sie: 'Wasser, bitte!'",
          vocabHint: "Wasser = 水{みず}",
          userSpeech: "水{みず}、お願{ねが}いします。",
          npcReply: "はい！ すぐ おもちします！",
          keyword: "すぐ",
          options: ["すぐ (Sofort)", "あとで (Später)", "ゆっくり (Langsam)"],
          correctIndex: 0,
          npcTranslation: "Ja! Ich bringe es sofort!"
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Der Kellner fragt, für wie viele Personen der Tisch ist.",
          physicalAction: "Zwei Finger hochreißen.",
          userTask: "Antworten Sie: 'Zwei Personen/Stück!'",
          vocabHint: "Zwei = 二つ{ふたつ}",
          userSpeech: "二つ{ふたつ}。",
          npcReply: "おふたりさま ですね。どうぞ。",
          keyword: "おふたりさま",
          options: ["おひとりさま (Eine Person)", "おふたりさま (Zwei Personen)", "さんめいさま (Drei Personen)"],
          correctIndex: 1,
          npcTranslation: "Zwei Personen, ja. Bitte."
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "Sie haben eine Nussallergie und der Kellner serviert Nüsse.",
          physicalAction: "Panisch abwinken.",
          userTask: "Sagen Sie: 'Ich habe eine Allergie!'",
          vocabHint: "Allergie = アレルギー",
          userSpeech: "アレルギーが あります。",
          npcReply: "えっ！ もうしわけありません、すぐ さげます！",
          keyword: "さげます",
          options: ["さげます (Ich nehme es weg)", "おもちします (Ich bringe es)", "かえます (Ich tausche es)"],
          correctIndex: 0,
          npcTranslation: "Oh! Es tut mir aufrichtig leid, ich nehme es sofort weg!"
        }
      ]
    },
  
    // TAG 17: NOTFALL SPEEDRUN (3.5 Sekunden Limit)
    17: {
      morningRoutine: "ZIEL: 15 MINUTEN ADRENALIN\n\nBLOCK 1: Üben Sie lautes Rufen. Stellen Sie sich einen Taschendieb vor. Rufen Sie '助けてください！' innerhalb einer Sekunde, sobald Sie die Haustür öffnen.",
      scenarios: [
        {
          type: "speech",
          timeLimit: 3.5,
          context: "Feueralarm im Gebäude!",
          physicalAction: "Aufspringen.",
          userTask: "Rufen Sie sofort: 'Feuer!'",
          vocabHint: "Feuer = 火事{かじ}",
          userSpeech: "火事{かじ}だ！",
          npcReply: "はやく にげて！",
          keyword: "にげて",
          options: ["にげて (Fliehen!)", "とまれ (Stopp!)", "おちついて (Beruhigen)"],
          correctIndex: 0,
          npcTranslation: "Fliehen Sie schnell!"
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "Jemand bricht auf der Straße zusammen.",
          physicalAction: "Auf die Person deuten.",
          userTask: "Rufen Sie: 'Krankenwagen, bitte!'",
          vocabHint: "Krankenwagen = 救急車{きゅうきゅうしゃ}",
          userSpeech: "救急車{きゅうきゅうしゃ}を 呼{よ}んでください！",
          npcReply: "すぐ よびます！",
          keyword: "すぐ",
          options: ["あとで (Später)", "すぐ (Sofort)", "わかりません (Weiß nicht)"],
          correctIndex: 1,
          npcTranslation: "Ich rufe sofort!"
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "Ein Dieb entreißt Ihnen die Tasche.",
          physicalAction: "Hinterher rufen.",
          userTask: "Schreien Sie: 'Polizei!'",
          vocabHint: "Polizei = 警察{けいさつ}",
          userSpeech: "警察{けいさつ}を 呼{よ}んでください！",
          npcReply: "どろぼう ですか！？ まて！",
          keyword: "まて",
          options: ["まて (Warte / Halt!)", "にげて (Fliehe)", "おちついて (Beruhige dich)"],
          correctIndex: 0,
          npcTranslation: "Ein Dieb!? Halt!"
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "Sie haben einen starken Schmerz in der Brust.",
          physicalAction: "An die Brust greifen.",
          userTask: "Sagen Sie: 'Es tut weh!'",
          vocabHint: "Tut weh = 痛{いた}いです",
          userSpeech: "痛{いた}いです。",
          npcReply: "きゅうきゅうしゃ を よびますか！？",
          keyword: "きゅうきゅうしゃ",
          options: ["けいさつ (Polizei)", "きゅうきゅうしゃ (Krankenwagen)", "かじ (Feuer)"],
          correctIndex: 1,
          npcTranslation: "Soll ich einen Krankenwagen rufen!?"
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "Sie stehen an der Rezeption und vermissen Ihren Pass.",
          physicalAction: "Taschen hektisch abtasten.",
          userTask: "Sagen Sie: 'Ich habe meinen Pass verloren.'",
          vocabHint: "Verloren = 無くしました{なくしました}",
          userSpeech: "パスポートを 無くしました{なくしました}。",
          npcReply: "おちついて ください。さがしましょう。",
          keyword: "おちついて",
          options: ["にげて (Fliehen)", "おちついて (Beruhigen Sie sich)", "まて (Halt)"],
          correctIndex: 1,
          npcTranslation: "Bitte beruhigen Sie sich. Lassen Sie uns suchen."
        }
      ]
    },
  
    // TAG 18: SCANNER SPEEDRUN (2.5 Sekunden Limit)
    18: {
      morningRoutine: "ZIEL: 15 MINUTEN VISUELLE ERFASSUNG\n\nBLOCK 1: Wenn Sie heute einen Text (egal in welcher Sprache) vor sich haben, versuchen Sie innerhalb von 2 Sekunden genau EIN Wort zu finden (z.B. ein Verb oder einen Namen).",
      scenarios: [
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "TEXT-SCANNER: Sie laufen durch einen Bahnhof, die Türen schließen.",
          physicalAction: "Keine Zeit zum Lesen. Nur Kanjis scannen.",
          userTask: "Finden Sie das Wort 'Ausgang' (出口).",
          target: "出口",
          textChunks: ["中央線の", "乗り場", "は", "あちらです。", "出口", "は", "右側", "です。"],
          npcReply: "Zielerfassung: 'Ausgang' gefunden. Flucht geglückt.",
          keyword: "出口",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "TEXT-SCANNER: Ein Angebotsschild im Supermarkt blitzt auf.",
          physicalAction: "Auge scharfstellen.",
          userTask: "Finden Sie das Wort 'Wie viel' (いくら).",
          target: "いくら",
          textChunks: ["特別価格！", "この", "商品は", "いくら", "ですか？", "特価", "です！"],
          npcReply: "Zielerfassung: 'Wie viel' gefunden.",
          keyword: "いくら",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "TEXT-SCANNER: Notfall-Bildschirm im TV bricht das Programm ab.",
          physicalAction: "Gefahr erkennen.",
          userTask: "Finden Sie das Wort 'Erdbeben' (地震).",
          target: "地震",
          textChunks: ["ニュース速報：", "関東地方に", "強い", "地震", "が", "発生しました。"],
          npcReply: "Zielerfassung: 'Erdbeben' gefunden. Schutz suchen!",
          keyword: "地震",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "TEXT-SCANNER: Rechnung im Restaurant wird Ihnen hingelegt.",
          physicalAction: "Kasse finden.",
          userTask: "Finden Sie das Wort 'Rechnung' (お会計).",
          target: "お会計",
          textChunks: ["ご飲食代", "3500円。", "お会計", "は", "レジにて", "お願いします。"],
          npcReply: "Zielerfassung: 'Rechnung' gefunden.",
          keyword: "お会計",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "TEXT-SCANNER: Sie suchen die Umkleidekabine im Kaufhaus.",
          physicalAction: "Schilder scannen.",
          userTask: "Finden Sie das Wort 'Anprobieren' (着てもいいですか) oder das Kanji für 'Tragen/Anziehen' (着).",
          target: "着",
          textChunks: ["お客様へ、", "こちらの商品は", "自由に", "着", "てみることが", "可能です。"],
          npcReply: "Zielerfassung: 'Anziehen/Anprobieren' gefunden.",
          keyword: "着",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        }
      ]
    },
  
    // TAG 19: MENGEN & ZEITEN EXTREM (3 Sekunden Limit)
    19: {
      morningRoutine: "ZIEL: 15 MINUTEN ZAHLEN-STRESS\n\nBLOCK 1: Zählen Sie heute beim Treppensteigen jede Stufe sofort auf Japanisch bis drei (ひとつ, ふたつ, みっつ) und fangen Sie von vorne an.",
      scenarios: [
        {
          type: "speech",
          timeLimit: 3,
          context: "Der Konbini-Kassierer hält zwei Tüten hoch.",
          physicalAction: "Eine Hand hochreißen.",
          userTask: "Sagen Sie: 'Eine, bitte!'",
          vocabHint: "Eins = 一つ{ひとつ}",
          userSpeech: "一つ{ひとつ}。",
          npcReply: "ひとつ ですね。",
          keyword: "ひとつ",
          options: ["ふたつ (Zwei)", "みっつ (Drei)", "ひとつ (Eins)"],
          correctIndex: 2,
          npcTranslation: "Eine, verstanden."
        },
        {
          type: "speech",
          timeLimit: 3,
          context: "Die Bedienung fragt nach der Anzahl der Kaffees.",
          physicalAction: "Drei Finger hoch.",
          userTask: "Sagen Sie: 'Drei Stück!'",
          vocabHint: "Drei = 三つ{みっつ}",
          userSpeech: "三つ{みっつ}。",
          npcReply: "みっつ、かしこまりました。",
          keyword: "みっつ",
          options: ["ひとつ (Eins)", "みっつ (Drei)", "ふたつ (Zwei)"],
          correctIndex: 1,
          npcTranslation: "Drei, verstanden."
        },
        {
          type: "speech",
          timeLimit: 3,
          context: "Der Hotelmitarbeiter will Ihnen das Gepäck JETZT abnehmen, aber Sie sind nicht fertig.",
          physicalAction: "Stopp-Geste.",
          userTask: "Sagen Sie: 'Später!'",
          vocabHint: "Später = あとで",
          userSpeech: "あとで。",
          npcReply: "あとで ですね。わかりました。",
          keyword: "あとで",
          options: ["いま (Jetzt)", "いつ (Wann)", "あとで (Später)"],
          correctIndex: 2,
          npcTranslation: "Später, verstanden."
        },
        {
          type: "speech",
          timeLimit: 3,
          context: "Ihr Taxi ist da. Der Fahrer hupt.",
          physicalAction: "Daumen hoch.",
          userTask: "Rufen Sie aus dem Fenster: 'Jetzt!'",
          vocabHint: "Jetzt = 今{いま}",
          userSpeech: "今{いま}。",
          npcReply: "おまちしておりました。",
          keyword: "おまちしておりました",
          options: ["おまちしておりました (Ich habe gewartet)", "あとで (Später)", "いつ (Wann)"],
          correctIndex: 0,
          npcTranslation: "Ich habe auf Sie gewartet."
        },
        {
          type: "speech",
          timeLimit: 3,
          context: "Der Kassierer fragt so schnell nach einer Karte, dass Sie nichts verstehen.",
          physicalAction: "Hand ans Ohr reißen.",
          userTask: "Sagen Sie sofort: 'Noch einmal, bitte!'",
          vocabHint: "Noch einmal = もう一度{いちど}",
          userSpeech: "もう一度{いちど} お願{ねが}いします。",
          npcReply: "カードは おもちですか？",
          keyword: "カード",
          options: ["カード (Karte)", "レジ (Kasse)", "いくら (Wie viel)"],
          correctIndex: 0,
          npcTranslation: "Haben Sie eine Karte?"
        }
      ]
    },
  
    // TAG 20: DER REFLEX-DRILL (2 Sekunden Limit - Nur ein Wort!)
    20: {
      morningRoutine: "ZIEL: 15 MINUTEN REFLEXE\n\nBLOCK 1: Antworten Sie heute auf jede Ja/Nein Frage zuerst blitzschnell mit 'はい' (Hai) oder wehren Sie ab mit 'すみません'.",
      scenarios: [
        {
          type: "speech",
          timeLimit: 2.5,
          context: "Der Fahrer fragt nach der Richtung. Es ist RECHTS.",
          physicalAction: "Hand zuckt nach rechts.",
          userTask: "Sagen Sie NUR: 'Rechts!'",
          vocabHint: "Rechts = 右{みぎ}",
          userSpeech: "右{みぎ}！",
          npcReply: "右{みぎ}！",
          keyword: "右",
          options: ["右 (Rechts)", "左 (Links)", "まっすぐ (Geradeaus)"],
          correctIndex: 0,
          npcTranslation: "Rechts!"
        },
        {
          type: "speech",
          timeLimit: 2.5,
          context: "Der Kellner bringt Ihnen Wasser statt Bier.",
          physicalAction: "Kopf schütteln.",
          userTask: "Sagen Sie NUR: 'Falsch!'",
          vocabHint: "Falsch/Anders = 違{ちが}います",
          userSpeech: "違{ちが}います！",
          npcReply: "すみません！",
          keyword: "すみません",
          options: ["はい (Ja)", "すみません (Entschuldigung)", "右 (Rechts)"],
          correctIndex: 1,
          npcTranslation: "Entschuldigung!"
        },
        {
          type: "speech",
          timeLimit: 2.5,
          context: "Jemand rempelt Sie extrem hart an.",
          physicalAction: "Zusammenzucken.",
          userTask: "Sagen Sie aus Reflex: 'Tut weh!'",
          vocabHint: "Tut weh = 痛{いた}い",
          userSpeech: "痛{いた}い！",
          npcReply: "あ、ごめんなさい！",
          keyword: "ごめんなさい",
          options: ["ごめんなさい (Es tut mir leid)", "右 (Rechts)", "はい (Ja)"],
          correctIndex: 0,
          npcTranslation: "Ah, es tut mir leid!"
        },
        {
          type: "speech",
          timeLimit: 2.5,
          context: "Sie zeigen auf die Bento-Box in der Auslage, der Verkäufer guckt fragend.",
          physicalAction: "Auf die Box hauen.",
          userTask: "Sagen Sie NUR: 'Das hier!'",
          vocabHint: "Das hier = これ",
          userSpeech: "これ！",
          npcReply: "こちらですね！",
          keyword: "こちら",
          options: ["こちら (Das hier)", "あちら (Dort)", "どこ (Wo)"],
          correctIndex: 0,
          npcTranslation: "Das hier, ja!"
        },
        {
          type: "speech",
          timeLimit: 2.5,
          context: "Ein Passant hebt Ihren runtergefallenen Schirm auf.",
          physicalAction: "Verbeugen.",
          userTask: "Sagen Sie sofort: 'Danke!'",
          vocabHint: "Danke = ありがとうございます",
          userSpeech: "ありがとうございます！",
          npcReply: "どうぞ！",
          keyword: "どうぞ",
          options: ["どうぞ (Bitte sehr)", "はい (Ja)", "これ (Das hier)"],
          correctIndex: 0,
          npcTranslation: "Bitte sehr!"
        }
      ]
    },
  
    // TAG 21: THE FINAL BOSS (Gemischte Limits & Muster)
    21: {
      morningRoutine: "ZIEL: SYSTEM-ABSCHLUSS\n\nBLOCK 1: Sie sind bereit. Das System ist in Fleisch und Blut übergegangen. Vertrauen Sie auf Ihre Reflexe.",
      scenarios: [
        {
          type: "speech",
          timeLimit: 3,
          context: "BOSS 1: Sie müssen in 3 Sekunden nach dem Bahnhof fragen, sonst verpassen Sie den Zug.",
          physicalAction: "Rennen und stoppen.",
          userTask: "Fragen Sie: 'Wo ist der Bahnhof?'",
          vocabHint: "Bahnhof + Wo",
          userSpeech: "駅{えき}は どこですか？",
          npcReply: "まっすぐ です！",
          keyword: "まっすぐ",
          options: ["右 (Rechts)", "左 (Links)", "まっすぐ (Geradeaus)"],
          correctIndex: 2,
          npcTranslation: "Geradeaus!"
        },
        {
          type: "scanner",
          timeLimit: 2.5,
          context: "BOSS 2: Sie scannen den Abfahrtsplan unter extremem Zeitdruck.",
          physicalAction: "Fokus auf das Zielwort.",
          userTask: "Finden Sie 'Gleis' (番線).",
          target: "番線",
          textChunks: ["次の", "電車は", "5", "番線", "に", "到着", "します。"],
          npcReply: "Zielerfassung erfolgreich.",
          keyword: "番線",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "BOSS 3: Der Kellner fragt nach Ihrer Getränke-Bestellung. Sie wollen zwei Wasser.",
          physicalAction: "Zwei Finger heben.",
          userTask: "Sagen Sie: 'Wasser, zwei Stück.'",
          vocabHint: "Wasser + Zwei",
          userSpeech: "水{みず}、二つ{ふたつ}。",
          npcReply: "おみず ふたつ ですね。",
          keyword: "ふたつ",
          options: ["ひとつ (Eins)", "ふたつ (Zwei)", "みっつ (Drei)"],
          correctIndex: 1,
          npcTranslation: "Zwei Wasser."
        },
        {
          type: "speech",
          timeLimit: 3.5,
          context: "BOSS 4: Jemand spricht Sie schnell auf Japanisch an. Blocken Sie ab.",
          physicalAction: "Hände heben.",
          userTask: "Sagen Sie: 'Entschuldigung, ich verstehe nicht.'",
          vocabHint: "Entschuldigung + Verstehe nicht",
          userSpeech: "すみません、分{わ}かりません。",
          npcReply: "あ、ごめんなさい！",
          keyword: "ごめんなさい",
          options: ["ごめんなさい (Es tut mir leid)", "はい (Ja)", "いいえ (Nein)"],
          correctIndex: 0,
          npcTranslation: "Ah, tut mir leid!"
        },
        {
          type: "scanner",
          timeLimit: 2,
          context: "BOSS 5: Die Rechnung liegt auf dem Tisch, Sie müssen sofort zur Kasse.",
          physicalAction: "Schneller Blick.",
          userTask: "Finden Sie 'Kasse' (レジ).",
          target: "レジ",
          textChunks: ["お会計は", "前の", "レジ", "で", "お願いします。"],
          npcReply: "Zielerfassung erfolgreich.",
          keyword: "レジ",
          correctIndex: 0,
          npcTranslation: "Radar-Scan abgeschlossen."
        },
        {
          type: "speech",
          timeLimit: 4,
          context: "BOSS 6: Ein Notfall. Jemand bricht zusammen.",
          physicalAction: "Auf den Boden zeigen.",
          userTask: "Schreien Sie: 'Krankenwagen, bitte!'",
          vocabHint: "Krankenwagen = 救急車{きゅうきゅうしゃ}",
          userSpeech: "救急車{きゅうきゅうしゃ}を 呼{よ}んでください！",
          npcReply: "すぐ よびます！",
          keyword: "すぐ",
          options: ["あとで (Später)", "すぐ (Sofort)", "ゆっくり (Langsam)"],
          correctIndex: 1,
          npcTranslation: "Ich rufe sofort!"
        },
        {
          type: "speech",
          timeLimit: 3,
          context: "BOSS 7 (FINAL): Der Taxifahrer hält an Ihrem Hotel.",
          physicalAction: "Geld übergeben, lächeln.",
          userTask: "Sagen Sie als Abschluss: 'Vielen Dank!'",
          vocabHint: "Danke = ありがとうございます",
          userSpeech: "ありがとうございます！",
          npcReply: "ありがとうございました！お気をつけて！",
          keyword: "お気をつけて",
          options: ["お気をつけて (Passen Sie auf sich auf!)", "すみません (Entschuldigung)", "はい (Ja)"],
          correctIndex: 0,
          npcTranslation: "Vielen Dank! Passen Sie auf sich auf!"
        }
      ]
    }
  };