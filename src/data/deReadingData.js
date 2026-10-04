export const deReadingData = {
    1: {
      level: 1,
      title: "ZUM / ZUR (目的地シグナル I)",
      context: "タクシー乗車・道案内。格変化を計算せず、男性・中性の目的地には [zum]、女性には [zur] を直結させる。",
      german: "Ich möchte zum Bahnhof fahren. Wie lange dauert die Fahrt zum Flughafen?",
      japanese: "私は駅へ行きたいです。空港までの乗車時間はどれくらいですか？",
      breakdown: [
        { chunk: "zum Bahnhof", role: "目的地（男性名詞 zu + dem）", meaning: "駅へ" },
        { chunk: "zum Flughafen", role: "目的地（男性名詞 zu + dem）", meaning: "空港へ" }
      ]
    },
    2: {
      level: 1,
      title: "ZUR (目的地シグナル II)",
      context: "街中での緊急移動。女性名詞の目的地（薬局、レジ、銀行）へ直行する。",
      german: "Entschuldigung, wie komme ich zur Apotheke? Ich muss schnell zur Kasse.",
      japanese: "すみません、薬局へはどう行けばいいですか？私は急いでレジへ行かなければなりません。",
      breakdown: [
        { chunk: "zur Apotheke", role: "目的地（女性名詞 zu + der）", meaning: "薬局へ" },
        { chunk: "zur Kasse", role: "目的地（女性名詞 zu + der）", meaning: "レジへ" }
      ]
    },
    3: {
      level: 1,
      title: "MIT DEM / MIT DER (交通手段シグナル)",
      context: "移動手段の伝達。男性・中性の乗り物は [mit dem]、女性の交通網は [mit der]。",
      german: "Fahren Sie mit dem Taxi oder mit der U-Bahn zum Hauptbahnhof?",
      japanese: "中央駅へはタクシーで行きますか、それとも地下鉄で行きますか？",
      breakdown: [
        { chunk: "mit dem Taxi", role: "手段・中性乗り物（mit + dem）", meaning: "タクシーで" },
        { chunk: "mit der U-Bahn", role: "手段・女性交通機関（mit + der）", meaning: "地下鉄で" }
      ]
    },
    4: {
      level: 1,
      title: "MIT KARTE / BAR (決済手段シグナル)",
      context: "レジや飲食店での支払い方法の宣言。無冠詞の決済パーツ。",
      german: "Kann ich hier mit Karte zahlen? Sonst bezahle ich bar.",
      japanese: "ここではカードで支払えますか？無理なら現金で支払います。",
      breakdown: [
        { chunk: "mit Karte", role: "決済手段（カード払い）", meaning: "カードで" },
        { chunk: "bar", role: "決済手段（現金払い）", meaning: "現金で" }
      ]
    },
    5: {
      level: 1,
      title: "IM / IN DER (静止所在シグナル)",
      context: "建物の内部にいる状態。男性・中性の屋内は [im]、女性は [in der]。",
      german: "Mein Koffer ist im Hotel. Ich warte in der Bäckerei auf Sie.",
      japanese: "私のスーツケースはホテルの中にあります。私はパン屋さんの中であなたを待っています。",
      breakdown: [
        { chunk: "im Hotel", role: "所在位置（中性 in + dem）", meaning: "ホテル内に" },
        { chunk: "in der Bäckerei", role: "所在位置（女性 in + der）", meaning: "パン屋内に" }
      ]
    },
    6: {
      level: 1,
      title: "EINEN / EINE / EIN (直接注文シグナル)",
      context: "カフェや売店で直接4格目的語を要求する最速注文シグナル。",
      german: "Guten Tag! Einen Kaffee, eine Cola und ein Wasser, bitte.",
      japanese: "こんにちは！コーヒーを1杯、コーラを1本、そしてお水を1杯お願いします。",
      breakdown: [
        { chunk: "einen Kaffee", role: "直接4格（男性名詞）", meaning: "コーヒーを1杯" },
        { chunk: "eine Cola", role: "直接4格（女性名詞）", meaning: "コーラを1本" },
        { chunk: "ein Wasser", role: "直接4格（中性名詞）", meaning: "お水を1杯" }
      ]
    },
    7: {
      level: 1,
      title: "VON ... BIS (時間・区間シグナル)",
      context: "営業時間や発車ホーム、運行区間の確認。",
      german: "Die Praxis ist von 8 bis 18 Uhr geöffnet. Der Zug fährt von Gleis 3.",
      japanese: "診療所は8時から18時まで開いています。列車は3番線から発車します。",
      breakdown: [
        { chunk: "von 8 bis 18 Uhr", role: "時間範囲（起点〜終点）", meaning: "8時から18時まで" },
        { chunk: "von Gleis 3", role: "発車起点ホーム", meaning: "3番線から" }
      ]
    },
    8: {
      level: 2,
      title: "話法助動詞の枠構造 (möchte ... kaufen)",
      context: "助動詞が第2スロットに立ち、本動詞原形が文末へ落ちる基本枠構造。",
      german: "Ich möchte heute am Schalter eine Fahrkarte nach Hamburg kaufen.",
      japanese: "私は今日、窓口でハンブルク行きの乗車券を1枚買いたいのですが。",
      breakdown: [
        { chunk: "möchte", role: "第2スロット（助動詞定動詞）", meaning: "〜したい" },
        { chunk: "kaufen", role: "文末スロット（本動詞原形）", meaning: "買う" }
      ]
    },
    9: {
      level: 2,
      title: "話法助動詞の枠構造 (kann ... reservieren)",
      context: "座席指定券の予約。文末まで動詞の意味を待機するリスニング反射。",
      german: "Kann ich hier am Automaten einen Sitzplatz im ICE reservieren?",
      japanese: "ここの券売機でICE特急の座席を予約することはできますか？",
      breakdown: [
        { chunk: "Kann", role: "第1/2位疑問枠（助動詞）", meaning: "〜できるか" },
        { chunk: "reservieren", role: "文末スロット（本動詞原形）", meaning: "予約する" }
      ]
    },
    10: {
      level: 2,
      title: "話法助動詞の枠構造 (muss ... umsteigen)",
      context: "乗り換え義務の確認。助動詞＋分離動詞原形の文末固定。",
      german: "Sie müssen am Hauptbahnhof in Dresden sofort in die S-Bahn umsteigen.",
      japanese: "あなたはドレスデン中央駅で直ちに近郊電車（Sバーン）へ乗り換えなければなりません。",
      breakdown: [
        { chunk: "müssen", role: "第2スロット（義務助動詞）", meaning: "〜せねばならない" },
        { chunk: "umsteigen", role: "文末スロット（分離動詞原形）", meaning: "乗り換える" }
      ]
    },
    11: {
      level: 2,
      title: "分離動詞の文末投下 (fährt ... ab)",
      context: "出発動詞 abfahren。前つづり ab が文の絶対末尾へ弾き飛ばされる。",
      german: "Der Regionalexpress nach Berlin fährt planmäßig um 14 Uhr ab.",
      japanese: "ベルリン行きの快速列車は定刻通り14時に出発します。",
      breakdown: [
        { chunk: "fährt", role: "第2スロット（動詞語幹）", meaning: "走る・発車する" },
        { chunk: "ab", role: "文末スロット（分離前つづり）", meaning: "離脱・出発 [abfahren]" }
      ]
    },
    12: {
      level: 2,
      title: "分離動詞の文末投下 (steigen ... ein)",
      context: "乗車案内 einsteigen。車掌の呼びかけ構文。",
      german: "Bitte steigen Sie alle vorsichtig in den zweiten Wagen ein!",
      japanese: "皆様、どうぞ注意して2両目の客車にご乗車ください！",
      breakdown: [
        { chunk: "steigen", role: "定動詞（命令・依頼形）", meaning: "乗る" },
        { chunk: "ein", role: "文末スロット（進入前つづり）", meaning: "乗車 [einsteigen]" }
      ]
    },
    13: {
      level: 2,
      title: "分離動詞の文末投下 (rufe ... an)",
      context: "電話連絡 anrufen。日常会話の分離枠構造。",
      german: "Ich rufe Sie morgen früh direkt aus dem Hotelzimmer an.",
      japanese: "明日の朝、ホテルの部屋から直接あなたにお電話します。",
      breakdown: [
        { chunk: "rufe", role: "第2スロット（動詞語幹）", meaning: "呼ぶ" },
        { chunk: "an", role: "文末スロット（接触前つづり）", meaning: "電話する [anrufen]" }
      ]
    },
    14: {
      level: 2,
      title: "現在完了形の枠構造 (habe ... verloren)",
      context: "落とし物・トラブル申告。haben ＋ 過去分詞の文末挟み込み。",
      german: "Entschuldigung, ich habe meinen Reisepass und mein Ticket verloren.",
      japanese: "すみません、私はパスポートと切符を紛失してしまいました。",
      breakdown: [
        { chunk: "habe", role: "第2スロット（完了助動詞）", meaning: "持っている（完了形形成）" },
        { chunk: "verloren", role: "文末スロット（過去分詞）", meaning: "紛失した [verlieren]" }
      ]
    },
    15: {
      level: 3,
      title: "現在完了形の枠構造 (ist ... gefahren)",
      context: "移動動詞の完了形。sein ＋ 過去分詞の文末枠構造。",
      german: "Der letzte Zug nach Frankfurt ist bereits vor zehn Minuten abgefahren.",
      japanese: "フランクフルト行きの最終列車は、既に10分前に出発してしまいました。",
      breakdown: [
        { chunk: "ist", role: "第2スロット（移動完了助動詞）", meaning: "〜である（完了形形成）" },
        { chunk: "abgefahren", role: "文末スロット（分離動詞過去分詞）", meaning: "出発した [abfahren]" }
      ]
    },
    16: {
      level: 3,
      title: "複合シグナル＋助動詞 (zum / mit dem)",
      context: "目的地シグナルと手段シグナルを挟み込んだ複合助動詞構文。",
      german: "Wir möchten jetzt zum Flughafen mit dem Schnellzug fahren.",
      japanese: "私たちは今、快速列車で空港へ向かいたいです。",
      breakdown: [
        { chunk: "möchten", role: "第2スロット助動詞", meaning: "〜したい" },
        { chunk: "zum Flughafen", role: "目的地シグナル", meaning: "空港へ" },
        { chunk: "mit dem Schnellzug", role: "交通手段シグナル", meaning: "快速列車で" },
        { chunk: "fahren", role: "文末スロット本動詞原形", meaning: "行く・乗る" }
      ]
    },
    17: {
      level: 3,
      title: "複合シグナル＋枠構造 (zur / mit Karte)",
      context: "薬局での決済枠構造。複数のシグナル・パーツの完全統合。",
      german: "In der Apotheke kann ich die Medikamente direkt mit Karte bezahlen.",
      japanese: "薬局内では、私は薬の代金を直接カードで支払うことができます。",
      breakdown: [
        { chunk: "In der Apotheke", role: "前域・所在シグナル（倒置発生）", meaning: "薬局内では" },
        { chunk: "kann", role: "第2スロット定動詞", meaning: "〜できる" },
        { chunk: "mit Karte", role: "決済手段シグナル", meaning: "カードで" },
        { chunk: "bezahlen", role: "文末スロット本動詞原形", meaning: "支払う" }
      ]
    },
    18: {
      level: 3,
      title: "時間倒置＋分離動詞 (Heute ... steige ... um)",
      context: "第1スロットに時間を置いた倒置と分離動詞の同時コントロール。",
      german: "Heute steige ich am Bahnhof Leipzig in den ICE nach Berlin um.",
      japanese: "今日、私はライプツィヒ駅でベルリン行きのICE特急へ乗り換えます。",
      breakdown: [
        { chunk: "Heute", role: "第1スロット（時間副詞）", meaning: "今日" },
        { chunk: "steige", role: "第2スロット（動詞語幹・主語倒置）", meaning: "乗り換える" },
        { chunk: "um", role: "文末スロット（分離前つづり）", meaning: "転換 [umsteigen]" }
      ]
    },
    19: {
      level: 3,
      title: "直接注文＋完了形 (habe ... bestellt)",
      context: "パン屋での注文トラブル確認。",
      german: "Ich habe zwei Brötchen und ein Croissant an der Theke bestellt.",
      japanese: "私はカウンターで小型パン2個とクロワッサン1個を注文しました。",
      breakdown: [
        { chunk: "habe", role: "第2スロット助動詞", meaning: "持っている（完了形成）" },
        { chunk: "zwei Brötchen", role: "直接4格注文（中性複数）", meaning: "小型パン2個" },
        { chunk: "ein Croissant", role: "直接4格注文（中性単数）", meaning: "クロワッサン1個" },
        { chunk: "bestellt", role: "文末スロット過去分詞", meaning: "注文した [bestellen]" }
      ]
    },
    20: {
      level: 3,
      title: "3重枠構造 (muss ... am Automaten ... entwerten)",
      context: "信用乗車方式の最重要構文。打刻義務の完了。",
      german: "Ich muss dieses Ticket unbedingt vor der Fahrt am Entwerter entwerten.",
      japanese: "私は乗車前に、この切符を打刻機で必ず刻印しなければなりません。",
      breakdown: [
        { chunk: "muss", role: "第2スロット義務助動詞", meaning: "〜せねばならない" },
        { chunk: "am Entwerter", role: "場所シグナル", meaning: "打刻機で" },
        { chunk: "entwerten", role: "文末スロット本動詞原形", meaning: "無効化・打刻する" }
      ]
    },
    21: {
      level: 3,
      title: "Phase 2 総決算マスター構文 (Satzklammer Master)",
      context: "全シグナル・パーツと枠構造の集大成。現地で反射的に運用する長文。",
      german: "Morgen möchte ich von Berlin nach München mit dem Zug um 9 Uhr abfahren.",
      japanese: "明日、私はベルリンからミュンヘンまで9時の列車で出発したいです。",
      breakdown: [
        { chunk: "Morgen", role: "第1スロット時間副詞（倒置）", meaning: "明日" },
        { chunk: "möchte", role: "第2スロット助動詞", meaning: "〜したい" },
        { chunk: "von Berlin nach München", role: "区間シグナル（起点〜終点）", meaning: "ベルリンからミュンヘンへ" },
        { chunk: "mit dem Zug", role: "交通手段シグナル", meaning: "列車で" },
        { chunk: "abfahren", role: "文末スロット動詞原形", meaning: "出発する" }
      ]
    }
  };