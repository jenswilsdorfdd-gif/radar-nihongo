import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// --- ROBUSTER SHUFFLE ALGORITHMUS (Fisher-Yates) ---
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- FRAGENPOOL JAPANISCH (JLPT-N5 & RADAR JP) ---
const masterPoolJP = [
  // --- KANA ---
  { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びょういん", en: "Hospital or Hairdresser? Read: びょういん", jpn: "読み分け問題: びょういん" }, options: [{de: "Krankenhaus", en: "Hospital", jpn: "病院"}, {de: "Friseur", en: "Hairdresser", jpn: "美容院"}, {de: "Arzt", en: "Doctor", jpn: "医者"}, {de: "Firma", en: "Company", jpn: "会社"}], correct: 0 },
  { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びよういん", en: "Hospital or Hairdresser? Read: びよういん", jpn: "読み分け問題: びよういん" }, options: [{de: "Friseur", en: "Hairdresser", jpn: "美容院"}, {de: "Krankenhaus", en: "Hospital", jpn: "病院"}, {de: "Schule", en: "School", jpn: "学校"}, {de: "Arzt", en: "Doctor", jpn: "医者"}], correct: 0 },
  { category: 'kana', q: { de: "Oma oder Tante? Lies: おばあさん", en: "Grandma or Aunt? Read: おばあさん", jpn: "長音識別: おばあさん" }, options: [{de: "Oma / Ältere Frau", en: "Grandma / Old lady", jpn: "祖母・年配の女性"}, {de: "Tante", en: "Aunt", jpn: "叔母"}, {de: "Mutter", en: "Mother", jpn: "母"}, {de: "Schwester", en: "Sister", jpn: "姉妹"}], correct: 0 },
  { category: 'kana', q: { de: "Lies das Katakana-Wort: コンピューター", en: "Read the Katakana: コンピューター", jpn: "カタカナ読解: コンピューター" }, options: [{de: "Computer", en: "Computer", jpn: "Computer"}, {de: "Kamera", en: "Camera", jpn: "Camera"}, {de: "Kaffee", en: "Coffee", jpn: "Coffee"}, {de: "Konzert", en: "Concert", jpn: "Concert"}], correct: 0 },
  { category: 'kana', q: { de: "Was bedeutet: ぎゅうにゅう", en: "What means: ぎゅうにゅう", jpn: "語彙の意味: ぎゅうにゅう" }, options: [{de: "Kuhmilch", en: "Cow milk", jpn: "牛乳"}, {de: "Rindfleisch", en: "Beef", jpn: "牛肉"}, {de: "Schwein", en: "Pork", jpn: "豚肉"}, {de: "Zwiebel", en: "Onion", jpn: "玉ねぎ"}], correct: 0 },
  { category: 'kana', q: { de: "Lies: じゅぎょう", en: "Read: じゅぎょう", jpn: "語彙の意味: じゅぎょう" }, options: [{de: "Unterricht", en: "Class / Lesson", jpn: "授業"}, {de: "Firma", en: "Company", jpn: "会社"}, {de: "Mitarbeiter", en: "Employee", jpn: "社員"}, {de: "Schüler", en: "Student", jpn: "生徒"}], correct: 0 },
  { category: 'kana', q: { de: "Finde die Silbe: 'pya'", en: "Find the syllable: 'pya'", jpn: "拗音を選択: 'pya'" }, options: ["ぴゃ", "びゃ", "ひゃ", "ぱや"], correct: 0 },
  { category: 'kana', q: { de: "Lies: きょう", en: "Read: きょう", jpn: "意味を選択: きょう" }, options: [{de: "Heute", en: "Today", jpn: "今日"}, {de: "Morgen", en: "Tomorrow", jpn: "明日"}, {de: "Gestern", en: "Yesterday", jpn: "昨日"}, {de: "Kaiser", en: "Emperor", jpn: "天皇"}], correct: 0 },
  { category: 'kana', q: { de: "Finde das Katakana 'shi':", en: "Find Katakana 'shi':", jpn: "カタカナの「shi」はどれ？" }, options: ["シ", "ツ", "ソ", "ン"], correct: 0 },
  { category: 'kana', q: { de: "Lies: がっこう", en: "Read: がっこう", jpn: "意味を選択: がっこう" }, options: [{de: "Schule", en: "School", jpn: "学校"}, {de: "Schüler", en: "Student", jpn: "学生"}, {de: "Lehrer", en: "Teacher", jpn: "先生"}, {de: "Firma", en: "Company", jpn: "会社"}], correct: 0 },
  { category: 'kana', q: { de: "Lies: しゅくだい", en: "Read: しゅくだい", jpn: "意味を選択: しゅくだい" }, options: [{de: "Hausaufgaben", en: "Homework", jpn: "宿題"}, {de: "Unterricht", en: "Lesson", jpn: "授業"}, {de: "Prüfung", en: "Exam", jpn: "試験"}, {de: "Lehrer", en: "Teacher", jpn: "先生"}], correct: 0 },
  { category: 'kana', q: { de: "Lies das Katakana: コーヒー", en: "Read Katakana: コーヒー", jpn: "カタカナ読解: コーヒー" }, options: [{de: "Kaffee", en: "Coffee", jpn: "Coffee"}, {de: "Kola", en: "Cola", jpn: "Cola"}, {de: "Kuchen", en: "Cake", jpn: "Cake"}, {de: "Kopie", en: "Copy", jpn: "Copy"}], correct: 0 },
  { category: 'kana', q: { de: "Was bedeutet: ちょっと", en: "What means: ちょっと", jpn: "意味を選択: ちょっと" }, options: [{de: "Ein bisschen / Kurz", en: "A little / A moment", jpn: "少し・ちょっと"}, {de: "Viel", en: "A lot", jpn: "たくさん"}, {de: "Warte", en: "Wait", jpn: "待って"}, {de: "Schnell", en: "Fast", jpn: "速い"}], correct: 0 },
  { category: 'kana', q: { de: "Finde die Silbe: 'gyo'", en: "Find the syllable: 'gyo'", jpn: "拗音を選択: 'gyo'" }, options: ["ぎょ", "ぎゅ", "きゃ", "きょ"], correct: 0 },

  // --- KANJI (N5) ---
  { category: 'kanji', q: { de: "Lies: 今日", en: "Read: 今日", jpn: "読みを選択: 今日" }, options: ["きょう", "まいにち", "あした", "きのう"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 毎日", en: "Read: 毎日", jpn: "読みを選択: 毎日" }, options: ["まいにち", "きょう", "いつか", "にちようび"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 日本", en: "What means: 日本", jpn: "意味を選択: 日本" }, options: [{de: "Japan", en: "Japan", jpn: "Japan"}, {de: "Sonntag", en: "Sunday", jpn: "日曜日"}, {de: "Buch", en: "Book", jpn: "本"}, {de: "Heute", en: "Today", jpn: "今日"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Mensch/Person':", en: "Find Kanji for 'Person':", jpn: "「Person」を表す漢字は？" }, options: ["人", "入", "八", "大"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 水曜日", en: "Read: 水曜日", jpn: "読みを選択: 水曜日" }, options: [{de: "すいようび (Mittwoch)", en: "すいようび (Wednesday)", jpn: "すいようび"}, {de: "かようび (Dienstag)", en: "かようび (Tuesday)", jpn: "かようび"}, {de: "もくようび (Donnerstag)", en: "もくようび (Thursday)", jpn: "もくようび"}, {de: "きんようび (Freitag)", en: "きんようび (Friday)", jpn: "きんようび"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 休み", en: "What means: 休み", jpn: "意味を選択: 休み" }, options: [{de: "Pause / Ausruhen", en: "Break / Rest", jpn: "Rest / Break"}, {de: "Baum", en: "Tree", jpn: "Tree"}, {de: "Buch", en: "Book", jpn: "Book"}, {de: "Körper", en: "Body", jpn: "Body"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 月", en: "Read: 月", jpn: "読みを選択: 月" }, options: ["つき / げつ", "ひ / にち", "き", "みず"], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Baum/Holz':", en: "Find Kanji for 'Tree':", jpn: "「Tree / Wood」を表す漢字は？" }, options: ["木", "本", "休", "体"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 男の人", en: "What means: 男の人", jpn: "意味を選択: 男の人" }, options: [{de: "Mann", en: "Man", jpn: "男性"}, {de: "Frau", en: "Woman", jpn: "女性"}, {de: "Kind", en: "Child", jpn: "子供"}, {de: "Mädchen", en: "Girl", jpn: "女の子"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 山川さん", en: "What means: 山川さん", jpn: "意味を選択: 山川さん" }, options: [{de: "Yamakawa-san (Name)", en: "Yamakawa-san (Name)", jpn: "Yamakawa-san (人名)"}, {de: "Fluss und Berg", en: "River and Mountain", jpn: "川と山"}, {de: "Herr Berg", en: "Mr. Mountain", jpn: "山さん"}, {de: "Frau Fluss", en: "Ms. River", jpn: "川さん"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 食べます", en: "Read: 食べます", jpn: "読みを選択: 食べます" }, options: ["たべます", "のみます", "みます", "いきます"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 飲みます", en: "Read: 飲みます", jpn: "読みを選択: 飲みます" }, options: ["のみます", "たべます", "よみます", "かきます"], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Groß':", en: "Find Kanji for 'Big':", jpn: "「Big」を表す漢字は？" }, options: ["大", "小", "中", "太"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 行きます", en: "Read: 行きます", jpn: "読みを選択: 行きます" }, options: ["いきます", "きます", "みます", "します"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 百", en: "What means: 百", jpn: "数を選択: 百" }, options: [{de: "Hundert", en: "Hundred", jpn: "100"}, {de: "Tausend", en: "Thousand", jpn: "1000"}, {de: "Zehntausend", en: "Ten thousand", jpn: "10000"}, {de: "Weiß", en: "White", jpn: "白"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 千円", en: "What means: 千円", jpn: "金額を選択: 千円" }, options: [{de: "1000 Yen", en: "1000 Yen", jpn: "1000 Yen"}, {de: "100 Yen", en: "100 Yen", jpn: "100 Yen"}, {de: "10000 Yen", en: "10000 Yen", jpn: "10000 Yen"}, {de: "Yen", en: "Yen", jpn: "1 Yen"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Auge':", en: "Find Kanji for 'Eye':", jpn: "「Eye」を表す漢字は？" }, options: ["目", "日", "口", "耳"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 天気", en: "What means: 天気", jpn: "意味を選択: 天気" }, options: [{de: "Wetter", en: "Weather", jpn: "Weather"}, {de: "Himmel", en: "Sky", jpn: "Sky"}, {de: "Luft", en: "Air", jpn: "Air"}, {de: "Geist", en: "Spirit", jpn: "Spirit"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji-Wort für 'Auto':", en: "Find the Kanji for 'Car':", jpn: "「Car」を表す漢字は？" }, options: [{de: "車 (くるま)", en: "車 (くるま)", jpn: "車 (くるま)"}, {de: "電車 (でんしゃ)", en: "電車 (でんしゃ)", jpn: "電車 (でんしゃ)"}, {de: "自転車 (じてんしゃ)", en: "自転車 (じてんしゃ)", jpn: "自転車 (じてんしゃ)"}, {de: "駅 (えき)", en: "駅 (えき)", jpn: "駅 (えき)"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 見ます", en: "Read: 見ます", jpn: "読みを選択: 見ます" }, options: ["みます", "ききます", "はなします", "かきます"], correct: 0 },

  // --- PARTICLE MATRIX ---
  { 
    category: 'particle', q: { de: "わたし [ ? ] ドイツじんです。", en: "わたし [ ? ] ドイツじんです。", jpn: "わたし [ ? ] ドイツじんです。" }, options: ["は", "を", "で", "に"], correct: 0,
    translation: { de: "Ich bin Deutscher.", en: "I am German.", jpn: "私はドイツ人です。" },
    explanation: { de: "Das Partikel 'は' (wa) markiert hier das Thema des Satzes (Ich).", en: "The particle 'は' (wa) marks the topic of the sentence (here: I).", jpn: "助詞「は」は文の主題（私）を示します。" }
  },
  { 
    category: 'particle', q: { de: "みず [ ? ] のみます。", en: "みず [ ? ] のみます。", jpn: "みず [ ? ] のみます。" }, options: ["を", "は", "に", "が"], correct: 0,
    translation: { de: "Ich trinke Wasser.", en: "I drink water.", jpn: "水を飲みます。" },
    explanation: { de: "Das Partikel 'を' (wo/o) markiert das direkte Objekt (das Wasser).", en: "The particle 'を' (wo/o) marks the direct object (the water).", jpn: "助詞「を」は直接目的語（水）を示します。" }
  },
  { 
    category: 'particle', q: { de: "あした、とうきょう [ ? ] いきます。", en: "あした、とうきょう [ ? ] いきます。", jpn: "あした、とうきょう [ ? ] いきます。" }, options: ["へ / に", "を", "で", "が"], correct: 0,
    translation: { de: "Ich fahre morgen nach Tokio.", en: "I am going to Tokyo tomorrow.", jpn: "明日、東京へ行きます。" },
    explanation: { de: "'へ' (e) oder 'に' (ni) zeigen Richtung oder Ziel einer Bewegung an.", en: "'へ' (e) or 'に' (ni) indicate direction or destination.", jpn: "「へ」または「に」は移動の方向・目的地を示します。" }
  },
  { 
    category: 'particle', q: { de: "レストラン [ ? ] すしを たべる。", en: "レストラン [ ? ] すしを たべる。", jpn: "レストラン [ ? ] すしを たべる。" }, options: ["で", "に", "は", "が"], correct: 0,
    translation: { de: "Ich esse Sushi im Restaurant.", en: "I eat sushi at the restaurant.", jpn: "レストランで寿司を食べる。" },
    explanation: { de: "'で' (de) markiert den Ort einer aktiven Handlung.", en: "'で' (de) marks the location of an action.", jpn: "「で」は動作が行われる場所を示します。" }
  },
  { 
    category: 'particle', q: { de: "タクシー [ ? ] かえります。", en: "タクシー [ ? ] かえります。", jpn: "タクシー [ ? ] かえります。" }, options: ["で", "に", "を", "は"], correct: 0,
    translation: { de: "Ich fahre mit dem Taxi nach Hause.", en: "I go home by taxi.", jpn: "タクシーで帰ります。" },
    explanation: { de: "'で' (de) markiert Mittel oder Werkzeug (mit dem Taxi).", en: "'で' (de) marks the means or tool (by taxi).", jpn: "「で」は交通手段や道具を示します。" }
  },
  { 
    category: 'particle', q: { de: "あめ [ ? ] ふっています。(Fokus!)", en: "あめ [ ? ] ふっています。(Focus!)", jpn: "あめ [ ? ] ふっています。" }, options: ["が", "を", "で", "は"], correct: 0,
    translation: { de: "Es regnet (gerade).", en: "It is raining.", jpn: "雨が降っています。" },
    explanation: { de: "'が' (ga) markiert das Subjekt bei Naturphänomenen.", en: "'が' (ga) marks the subject for natural phenomena.", jpn: "自然現象の主語には「が」を用います。" }
  },
  { 
    category: 'particle', q: { de: "ともだち [ ? ] えいがを みます。", en: "ともだち [ ? ] えいがを みます。", jpn: "ともだち [ ? ] えいがを みます。" }, options: ["と", "から", "まで", "に"], correct: 0,
    translation: { de: "Ich schaue mit einem Freund einen Film.", en: "I watch a movie with a friend.", jpn: "友達と映画を見ます。" },
    explanation: { de: "'と' (to) bedeutet 'mit' (zusammen mit einer Person).", en: "'と' (to) means 'with'.", jpn: "「と」は一緒に行動する相手を示します。" }
  },
  { 
    category: 'particle', q: { de: "あさ、９じ [ ? ] おきます。", en: "あさ、９じ [ ? ] おきます。", jpn: "あさ、９じ [ ? ] おきます。" }, options: ["に", "で", "を", "は"], correct: 0,
    translation: { de: "Ich stehe morgens um 9 Uhr auf.", en: "I wake up at 9 AM in the morning.", jpn: "朝、9時に起きます。" },
    explanation: { de: "'に' (ni) markiert einen spezifischen Zeitpunkt auf der Uhr.", en: "'に' (ni) marks a specific point in time.", jpn: "具体的な時刻には助詞「に」を用います。" }
  },

  // --- RADAR: TEXT & AUDIO ---
  { category: 'radar', q: { de: "Wie fragst du, wo die Toilette ist?", en: "How do you ask where the toilet is?", jpn: "トイレの場所を尋ねる表現は？" }, options: ["トイレは どこですか。", "トイレは いつですか。", "トイレは なんですか。", "トイレは いくらですか。"], correct: 0, translation: { de: "Die Toilette, wo ist sie?", en: "The toilet, where is it?", jpn: "トイレはどこですか。" } },
  { category: 'radar', q: { de: "Du möchtest etwas kaufen. Zeig darauf und sag:", en: "You want to buy something. Point and say:", jpn: "商品を指差して注文する表現は？" }, options: ["これを ください。", "ありがとう。", "わかりません。", "それです。"], correct: 0, translation: { de: "Das hier, bitte.", en: "This one, please.", jpn: "これをください。" } },
  { category: 'radar', audioText: "すみません、えきは どこですか。", q: { de: "🎧 Was möchte die Person?", en: "🎧 What does the person want?", jpn: "🎧 話者は何を尋ねていますか？" }, options: [{de: "Sucht den Bahnhof", en: "Looks for station", jpn: "駅の場所"}, {de: "Sucht die Toilette", en: "Looks for toilet", jpn: "トイレの場所"}, {de: "Fragt den Preis", en: "Asks for price", jpn: "値段"}, {de: "Fragt die Uhrzeit", en: "Asks the time", jpn: "現在の時刻"}], correct: 0, translation: { de: "Entschuldigung, wo ist der Bahnhof?", en: "Excuse me, where is the station?", jpn: "すみません、駅はどこですか。" } },
  { category: 'radar', audioText: "いらっしゃいませ", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?", jpn: "🎧 この表現を使うのは誰？" }, options: [{de: "Laden-Personal", en: "Shop staff", jpn: "店舗スタッフ"}, {de: "Ich selbst", en: "Myself", jpn: "客自身"}, {de: "Gastfamilie", en: "Host family", jpn: "ホストファミリー"}, {de: "Passant", en: "Stranger", jpn: "通行人"}], correct: 0, translation: { de: "Herzlich Willkommen (vom Personal gerufen).", en: "Welcome (called by staff).", jpn: "いらっしゃいませ（店員の挨拶）。" } },
  { category: 'radar', audioText: "これ、いくらですか。", q: { de: "🎧 Was fragt die Person?", en: "🎧 What is asked?", jpn: "🎧 何を確認していますか？" }, options: [{de: "Wie viel das kostet", en: "How much it costs", jpn: "商品の値段"}, {de: "Wo das ist", en: "Where it is", jpn: "場所"}, {de: "Was das ist", en: "What it is", jpn: "物の名前"}, {de: "Wem das gehört", en: "Whose it is", jpn: "所有者"}], correct: 0, translation: { de: "Das hier, wie viel kostet es?", en: "This here, how much is it?", jpn: "これ、いくらですか。" } },
  { category: 'radar', audioText: "カードで いいですか。", q: { de: "🎧 Situation?", en: "🎧 Situation?", jpn: "🎧 どのような場面ですか？" }, options: [{de: "Kartenzahlung an der Kasse", en: "Card payment at register", jpn: "レジでのカード決済確認"}, {de: "Nach dem Namen fragen", en: "Asking for name", jpn: "名前の確認"}, {de: "Ticketkontrolle im Zug", en: "Ticket check", jpn: "車内検札"}, {de: "Brief einwerfen", en: "Mailing a letter", jpn: "郵便投函"}], correct: 0, translation: { de: "Ist Kartenzahlung in Ordnung?", en: "Is card payment okay?", jpn: "カードでいいですか。" } },
  { category: 'radar', audioText: "ふくろは いりますか。", q: { de: "🎧 Situation?", en: "🎧 Situation?", jpn: "🎧 どのような場面ですか？" }, options: [{de: "An der Kasse (Tüte?)", en: "Register (Need a bag?)", jpn: "レジ（レジ袋の確認）"}, {de: "Im Restaurant (Getränke?)", en: "Restaurant (Drinks?)", jpn: "レストラン（飲み物の注文）"}, {de: "Auf der Straße (Hilfe?)", en: "Street (Help?)", jpn: "路上（道案内）"}, {de: "Im Hotel (Schlüssel?)", en: "Hotel (Key?)", jpn: "ホテル（鍵の受け渡し）"}], correct: 0, translation: { de: "Brauchen Sie eine Tüte?", en: "Do you need a bag?", jpn: "袋はいりますか。" } },
  { category: 'radar', audioText: "えきまで おねがいします。", q: { de: "🎧 Wo bist du?", en: "🎧 Where are you?", jpn: "🎧 どこで使われる表現ですか？" }, options: [{de: "Im Taxi", en: "In a taxi", jpn: "タクシー車内"}, {de: "Im Restaurant", en: "In a restaurant", jpn: "レストラン"}, {de: "Im Supermarkt", en: "In a supermarket", jpn: "スーパーマーケット"}, {de: "Auf der Post", en: "At the post office", jpn: "郵便局"}], correct: 0, translation: { de: "Zum Bahnhof, bitte.", en: "To the station, please.", jpn: "駅までお願いします。" } }
];

// --- FRAGENPOOL DEUTSCH (PHASEN 1-4 DAF / RADAR DE) ---
const masterPoolDE = [
  // --- PHASE 1: PHONETIK & AUSSPRACHE ---
  {
    category: 'phonetik',
    q: { de: "Welches Wortpaar unterscheidet sich NUR durch Vokallänge?", en: "Which word pair differs ONLY by vowel length?", jpn: "母音の長短（長母音・短母音）のみで意味が区別されるペアはどれ？" },
    options: ["bieten / bitten", "Haus / Maus", "Tag / Nacht", "gehen / laufen"],
    correct: 0,
    translation: { de: "bieten [i:] (anbieten) vs. bitten [ɪ] (ersuchen)", en: "offer vs. ask/plead", jpn: "bieten (提供する) vs. bitten (頼む)" },
    explanation: { de: "Doppelkonsonanten verkürzen den vorherigen Vokal radikal. 'ie' ist langes [i:], 'tt' kurzes [ɪ].", en: "Double consonants shorten the vowel.", jpn: "子音の重複（tt）は直前の母音を短縮させます。" }
  },
  {
    category: 'phonetik',
    q: { de: "Wie wird das Schluss-D in 'Fahrrad' artikuliert?", en: "How is the final -d in 'Fahrrad' pronounced?", jpn: "「Fahrrad」の末尾の「d」はどのように調音されるか？" },
    options: ["Stimmlos als hartes [t] (Auslautverhärtung)", "Stimmhaft als weiches [d]", "Als stummes Zeichen (nicht gesprochen)", "Wie ein englisches [th]"],
    correct: 0,
    translation: { de: "Fahrrad klingt phonetisch wie [ˈfaːɐ̯ˌʁaːt]", en: "Pronounced with a hard [t]", jpn: "語末無声化（Auslautverhärtung）により硬い [t] と発音される" },
    explanation: { de: "Im Deutschen werden b, d, g am Silben- oder Wortende ausnahmslos stimmlos verhärtet (b->p, d->t, g->k).", en: "Final b, d, g become unvoiced in German.", jpn: "ドイツ語の語尾の b, d, g は例外なく無声化します。" }
  },
  {
    category: 'phonetik',
    q: { de: "Welcher Laut steht in 'Küche'?", en: "Which sound is in 'Küche'?", jpn: "「Küche」の ch はどの音か？" },
    options: ["Ich-Laut [ç] (weicher Palatallaut)", "Ach-Laut [x] (harter Rachenlaut)", "K-Laut [k]", "Sch-Laut [ʃ]"],
    correct: 0,
    translation: { de: "Küche [ˈkʏçə]", en: "Soft palatal Ich-sound [ç]", jpn: "前舌母音（ü）の後は口蓋摩擦音 [ç]" },
    explanation: { de: "Nach vorderen Vokalen (e, i, ä, ö, ü, eu, ei) folgt immer der weiche Ich-Laut [ç].", en: "After front vowels, the soft ich-sound is used.", jpn: "前舌母音の後では軟口蓋ではなく硬口蓋の Ich-Laut [ç] になります。" }
  },
  {
    category: 'phonetik',
    q: { de: "Was ist der 'Knacklaut' (Glottisschlag [ʔ])?", en: "What is the glottal stop [ʔ]?", jpn: "声門閉鎖音（Knacklaut [ʔ]）とは何か？" },
    options: ["Harter Stimmritzenverschluss vor vokalischem Wortanfang", "Ein Dehnungs-H nach Vokalen", "Ein Schweizer Dialektlaut", "Ein Nasallaut wie im Französischen"],
    correct: 0,
    translation: { de: "z.B. 'Spiegelei' -> [ˈʃpiːɡl̩|ʔaɪ̯]", en: "Hard glottal stop before initial vowel", jpn: "母音で始まる音節の直前に声門を閉鎖して破裂させる音" },
    explanation: { de: "Der Knacklaut trennt im Deutschen Wörter sauber ab und verhindert das Verschleifen von Vokalen.", en: "The glottal stop separates words distinctly.", jpn: "単語間の母音衝突を防ぎ、各単語の輪郭を際立たせます。" }
  },

  // --- PHASE 2: SATZKLAMMER & V2-STELLUNG ---
  {
    category: 'klammer',
    q: { de: "Wo steht das finite (gebeugte) Verb im deutschen Hauptsatz?", en: "Where is the conjugated verb in a German main clause?", jpn: "ドイツ語の平叙文（主文）で定形動詞はどこに位置するか？" },
    options: ["Immer an Position 2 (V2-Regel)", "Immer an Position 1", "Immer ganz am Ende (wie im Japanischen)", "Direkt hinter dem Akkusativobjekt"],
    correct: 0,
    translation: { de: "Position 2 ist das unumstößliche Gesetz im Hauptsatz.", en: "Position 2 is mandatory.", jpn: "主文において定形動詞は常に第2位（V2原則）" },
    explanation: { de: "Egal welches Satzglied auf Position 1 steht: Das konjugierte Verb besetzt zwingend die Position 2.", en: "Position 2 is strictly reserved for the verb.", jpn: "第1位に何が置かれても、動詞は必ず第2位に吸着します。" }
  },
  {
    category: 'klammer',
    q: { de: "Welcher Satz bildet eine korrekte Satzklammer mit Modalverb?", en: "Which sentence forms a correct verbal bracket with a modal verb?", jpn: "話法の助動詞を使った正しい文枠構造（Satzklammer）はどれ？" },
    options: ["Ich muss heute mein Ticket am Schalter kaufen.", "Ich muss kaufen heute mein Ticket am Schalter.", "Ich heute mein Ticket am Schalter kaufen muss.", "Ich kaufe muss heute mein Ticket am Schalter."],
    correct: 0,
    translation: { de: "muss (Verb 1) ... kaufen (Verb 2 am Satzende)", en: "Bracket: modal verb in V2, infinitive at the end", jpn: "muss（第2位）… kaufen（文末の不定詞）" },
    explanation: { de: "Hilfs-/Modalverben stehen auf Position 2, der Vollverb-Infinitiv bildet die schließende Klammer am Satzende.", en: "Modal verbs open the bracket, infinitives close it.", jpn: "助動詞が第2位で枠を開き、本動詞が文末で枠を閉じます。" }
  },
  {
    category: 'klammer',
    q: { de: "Welcher Signal-Baustein passt: 'Ich fahre morgen [...] Hauptbahnhof.'", en: "Which signal chunk fits: 'Ich fahre morgen [...] Hauptbahnhof.'", jpn: "空欄に入る正しいシグナル結合パーツはどれ？「Ich fahre morgen [...] Hauptbahnhof.」" },
    options: ["zum (zu + dem)", "zur (zu + der)", "im (in + dem)", "beim (bei + dem)"],
    correct: 0,
    translation: { de: "zum Hauptbahnhof (maskulin: der Hof -> zu dem)", en: "to the central station", jpn: "zum Hauptbahnhof（男性名詞 der Hof -> zu + dem = zum）" },
    explanation: { de: "'Hauptbahnhof' ist maskulin (der). 'zu' verlangt Dativ -> zu dem = zum.", en: "'Bahnhof' is masculine -> zu + dem = zum.", jpn: "zu は与格支配。男性名詞なので zu dem が短縮して zum になります。" }
  },
  {
    category: 'klammer',
    q: { de: "Wohin wandert die Vorsilbe beim trennbaren Verb 'umsteigen' im Präsens?", en: "Where does the prefix go for 'umsteigen' in present tense?", jpn: "分離動詞「umsteigen」を現在形で使う場合、前綴り「um-」はどこへ移動するか？" },
    options: ["Ganz ans Satzende (Rechte Satzklammer)", "Direkt vor das Verb an Position 2", "An den Satzanfang vor das Subjekt", "Fällt im Präsens komplett weg"],
    correct: 0,
    translation: { de: "Ich steige am Südkreuz in die S-Bahn um.", en: "I change trains at Südkreuz.", jpn: "Ich steige ... um.（umは文末に配置）" },
    explanation: { de: "Die abtrennbare Vorsilbe bildet den Schlusspunkt der Satzklammer am absoluten Satzende.", en: "The prefix locks the bracket at the end.", jpn: "分離前綴りは文末に配置され、文枠構造のフタを閉じます。" }
  },

  // --- PHASE 3: D/A/CH-SURVIVAL-RADAR ---
  {
    category: 'radar',
    q: { de: "Was ist in deutschen Zügen/Bahnhöfen vor Fahrtantritt zwingend zu prüfen?", en: "What must strictly be checked before boarding in German stations?", jpn: "ドイツの近郊列車に乗る前、切符に関して最も警戒すべき規則は何か？" },
    options: ["Muss das Ticket am Automaten/Entwerter entwertet (gestempelt) werden?", "Muss man dem Schaffner ein Trinkgeld geben?", "Muss der Pass im Tresor deponiert werden?", "Gibt es zwingend eine Sitzplatzreservierung im Nahverkehr?"],
    correct: 0,
    translation: { de: "Entwertungs-Pflicht vor Fahrtantritt (Schwarzfahr-Falle).", en: "Validation stamp required.", jpn: "打刻機（Entwerter）での日時刻印が必要かどうか" },
    explanation: { de: "In vielen Verkehrsverbünden ist ein Ticket ohne Entwerter-Stempel ungültig und gilt als 'Erhöhtes Beförderungsentgelt' (60 € Strafe).", en: "Unvalidated tickets count as fare evasion.", jpn: "打刻忘れは不正乗車とみなされ、60ユーロの追徴罰金が科されます。" }
  },
  {
    category: 'radar',
    q: { de: "Welche Notrufnummer wählst du in Deutschland für Notarzt & Feuerwehr?", en: "Which emergency number for paramedics & fire department in Germany?", jpn: "ドイツで救急医（Notarzt）・消防車を呼ぶ緊急ダイヤルは何番か？" },
    options: ["112", "110", "911", "116 117"],
    correct: 0,
    translation: { de: "112: Rettungsdienst & Feuerwehr (110 = Polizei)", en: "112: Ambulance & Fire", jpn: "112（救急・消防）／ 110は警察" },
    explanation: { de: "112 ist der EU-weite Notruf für Feuerwehr und Notarzt. 110 verbindet direkt mit der Polizei.", en: "112 is ambulance/fire; 110 is police.", jpn: "112が救急・消防、110が警察です。" }
  },
  {
    category: 'radar',
    audioText: "Die Rechnung macht zusammen 27 Euro 40.",
    q: { de: "🎧 Der Kellner nennt den Betrag. Du willst ca. 10% Trinkgeld geben. Was sagst du?", en: "🎧 Bill is 27.40 €. What do you say to include ~10% tip?", jpn: "🎧 会計は27.40ユーロ。約10%のチップを含めて支払う場合、何と言うか？" },
    options: ["Machen Sie bitte 30 Euro.", "Hier sind 27 Euro 40, danke.", "Ich gebe Ihnen 10 Prozent extra.", "Behalten Sie den Rest von 50 Euro."],
    correct: 0,
    translation: { de: "Machen Sie bitte 30 Euro (Aufrunden beim Bezahlen).", en: "Make it 30 euros please.", jpn: "「30ユーロにしてください（端数切り上げ）」" },
    explanation: { de: "In Deutschland nennt man direkt den aufgerundeten Gesamtbetrag, den man inklusive Trinkgeld zahlen möchte.", en: "State the rounded total including tip.", jpn: "店員に渡す際、チップを含めた切りの良い合計額を口頭で伝えます。" }
  },
  {
    category: 'radar',
    audioText: "Entschuldigung, nehmen Sie auch Kartenzahlung oder nur bar?",
    q: { de: "🎧 Was fragt der Kunde an der Kasse?", en: "🎧 What is the customer asking?", jpn: "🎧 客はレジで何を尋ねているか？" },
    options: ["Ob Kartenzahlung möglich ist oder nur Bargeld", "Ob der Kassenbon ausgedruckt wird", "Wo die nächste Bankfiliale liegt", "Wie teuer die Einkaufstasche ist"],
    correct: 0,
    translation: { de: "Akzeptieren Sie Kartenzahlung oder nur Bargeld?", en: "Do you take cards or only cash?", jpn: "カードが使えますか、それとも現金のみですか？" },
    explanation: { de: "In Deutschland gilt in vielen kleineren Geschäften immer noch: 'Nur Barzahlung'!", en: "Cash only is still common in Germany.", jpn: "ドイツでは現在でもカード不可・現金のみの店舗が多数存在します。" }
  },

  // --- PHASE 4: KOMPOSITA-DEKOMPOSITION & MORPHOLOGIE ---
  {
    category: 'komposita',
    q: { de: "Was bestimmt das grammatikalische Geschlecht (der/die/das) eines Kompositums?", en: "What determines the gender of a German compound noun?", jpn: "ドイツ語の複合名詞の文法上の性（der/die/das）を決定するのはどこか？" },
    options: ["Das letzte Wort (Grundwort / Rechtsregel)", "Das erste Wort (Bestimmungswort)", "Die Anzahl der Buchstaben", "Es ist immer neutral (das)"],
    correct: 0,
    translation: { de: "Das letzte Nomen entscheidet zu 100% über Genus und Bedeutungskern.", en: "The last noun determines gender and core meaning.", jpn: "一番最後にある名詞（Grundwort / 右端ルール）" },
    explanation: { de: "Egal wie lang das Wort ist: Das Grundwort am Ende diktiert den Artikel (z.B. das Zimmer -> das Hotelzimmer).", en: "The final noun dictates the article.", jpn: "どれほど長い単語でも、最後の名詞が全体の性を決定します。" }
  },
  {
    category: 'komposita',
    q: { de: "Warum steht in 'Verspätungsbescheinigung' ein -s-?", en: "Why is there an -s- in 'Verspätungsbescheinigung'?", jpn: "「Verspätungsbescheinigung」の真ん中に -s- が挟まる理由は？" },
    options: ["Fugen-S als Verbindungselement nach der Endung -ung", "Es handelt sich um einen Genitiv Plural", "Ein Grammatikfehler der Deutschen Bahn", "Es zeigt an, dass der Zug Verspätung hat"],
    correct: 0,
    translation: { de: "Verspätung + s + Bescheinigung", en: "Fugen-S after suffix -ung", jpn: "-ung で終わる名詞の後に結合要素 Fugen-S が入るため" },
    explanation: { de: "Nomen auf -ung, -heit, -keit, -schaft binden nachfolgende Nomen zwingend mit dem Fugen-S an.", en: "Suffixes like -ung trigger Fugen-S.", jpn: "-ung, -heit, -keit などの語尾の後は必ず結合要素 -s- が挿入されます。" }
  },
  {
    category: 'komposita',
    q: { de: "Zerlege: 'Schienenersatzverkehr'", en: "Deconstruct: 'Schienenersatzverkehr'", jpn: "「Schienenersatzverkehr」の構造分解として正しいものは？" },
    options: ["Schiene(n) + Ersatz + Verkehr (der Verkehr = Grundwort)", "Schienen + Ersatzverkehr (das Verkehr)", "Schienenersatz + Verkehr (die Schiene)", "Schiene + nersatz + verkehr"],
    correct: 0,
    translation: { de: "der Schienenersatzverkehr (der Verkehr -> maskulin)", en: "Rail replacement bus service", jpn: "Schiene(n) + Ersatz + Verkehr（基底語は男性名詞 der Verkehr）" },
    explanation: { de: "Schiene (Gleis) + Ersatz (Austausch) + Verkehr (Transport). Bedeutet: Busersatzverkehr bei Zugausfall.", en: "Rail + replacement + traffic.", jpn: "線路＋代替＋交通 ＝ 鉄道代行バス輸送。" }
  },
  {
    category: 'komposita',
    q: { de: "Welches Genus hat das Wort: 'Krankenversicherungskarte'?", en: "What is the gender of: 'Krankenversicherungskarte'?", jpn: "複合名詞「Krankenversicherungskarte」の正しい定冠詞はどれ？" },
    options: ["die (weil 'die Karte' weiblich ist)", "der (weil 'der Kranke' männlich ist)", "das (weil 'das Versicherungswesen' neutral ist)", "den (weil es im Akkusativ steht)"],
    correct: 0,
    translation: { de: "die Krankenversicherungskarte (die Karte)", en: "Health insurance card (die)", jpn: "die（末尾の die Karte が女性名詞であるため）" },
    explanation: { de: "Das letzte Nomen ist 'die Karte' (feminin). Daher ist das gesamte Wort feminin: die Krankenversicherungskarte.", en: "Final word 'Karte' is feminine.", jpn: "末尾の「Karte」が女性名詞なので、単語全体も「die」になります。" }
  }
];

const FinalExam = ({ onBack, language, targetLanguage = 'jp' }) => {
  const isGermanTarget = targetLanguage === 'de';
  const isEnglishTarget = targetLanguage === 'en';
  const isDeOrEnTarget = isGermanTarget || isEnglishTarget;

  // Normierte Sprach-Keys für Supabase ('jp', 'de', 'en') und lokales Fallback ('jpn', 'de', 'en')
  const dbSourceLang = (language === 'jpn' || language === 'jp') ? 'jp' : (language || 'de');
  const dbTargetLang = (targetLanguage === 'jpn' || targetLanguage === 'jp') ? 'jp' : (targetLanguage || 'jp');
  const currentLang = (language === 'jp' || language === 'jpn') ? 'jpn' : (language || 'de');
  const moduleKey = 'final_exam';

  const [examState, setExamState] = useState('intro'); // intro, exam, result
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Stats & Tracking
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); 
  const [categoryStats, setCategoryStats] = useState({
    cat1: { correct: 0, total: 0 },
    cat2: { correct: 0, total: 0 },
    cat3: { correct: 0, total: 0 },
    cat4: { correct: 0, total: 0 }
  });

  // --- SUPABASE STATES (MIT LOCALSTORAGE-CACHE) ---
  const [dbUiTexts, setDbUiTexts] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_ui_trans_${dbSourceLang}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [dbCourseManifest, setDbCourseManifest] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_manifest_${dbSourceLang}_${dbTargetLang}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [dbQuestionPool, setDbQuestionPool] = useState(() => {
    try {
      const cached = localStorage.getItem(`radar_decks_${dbTargetLang}_${moduleKey}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examState, currentIndex]);

  // Abruf von ui_translations, course_manifests & course_decks (final_exam) aus Supabase
  useEffect(() => {
    let isMounted = true;

    const fetchExamData = async () => {
      try {
        const [uiRes, manifestRes, deckRes] = await Promise.all([
          supabase
            .from('ui_translations')
            .select('content')
            .eq('lang_code', dbSourceLang)
            .single(),
          supabase
            .from('course_manifests')
            .select('manifest')
            .eq('source_lang', dbSourceLang)
            .eq('target_lang', dbTargetLang)
            .single(),
          supabase
            .from('course_decks')
            .select('content')
            .eq('target_lang', dbTargetLang)
            .eq('module_key', moduleKey)
            .eq('day_number', 1)
            .maybeSingle()
        ]);

        if (uiRes.data?.content && isMounted) {
          setDbUiTexts(uiRes.data.content);
          localStorage.setItem(`radar_ui_trans_${dbSourceLang}`, JSON.stringify(uiRes.data.content));
        }

        if (manifestRes.data?.manifest && isMounted) {
          setDbCourseManifest(manifestRes.data.manifest);
          localStorage.setItem(`radar_manifest_${dbSourceLang}_${dbTargetLang}`, JSON.stringify(manifestRes.data.manifest));
        }

        const fetchedPool = deckRes.data?.content?.questions || (Array.isArray(deckRes.data?.content) ? deckRes.data.content : null);
        if (fetchedPool && fetchedPool.length > 0 && isMounted) {
          setDbQuestionPool(fetchedPool);
          localStorage.setItem(`radar_decks_${dbTargetLang}_${moduleKey}`, JSON.stringify(fetchedPool));
        }
      } catch (err) {
        console.error("Fehler beim Laden der FinalExam-Daten aus Supabase:", err);
      }
    };

    fetchExamData();

    return () => {
      isMounted = false;
    };
  }, [dbSourceLang, dbTargetLang, moduleKey]);

  const texts = {
    de: {
      back: "Zurück",
      introTitle: isGermanTarget ? "Die D/A/CH Abschluss-Prüfung" : (isEnglishTarget ? "Die UK Abschluss-Prüfung" : "Die Abschluss-Prüfung"),
      introSub: isGermanTarget ? "Der 4-Phasen Stresstest (DaF Meisterklasse)" : (isEnglishTarget ? "Der 4-Phasen Stresstest (British Mastery)" : "Der ultimative Stresstest"),
      introDesc: isGermanTarget
        ? "Prüfung über alle 4 Phasen des RADAR-Systems: Deutsche Phonetik, Satzklammer-Architektur, 21-Tage Survival-Radar und Komposita-Dekomposition. Echte Audioscans und Realtransaktionen ohne Grammatiktabellen!"
        : (isEnglishTarget
            ? "Prüfung über alle 4 Phasen des UK-RADAR-Systems: Core Grammar & Vocabulary, Connected Speech & Phrasal Verbs, 21-Tage UK-Survival-Radar und Advanced Business Nuance!"
            : "30 zufällige Fragen aus einem riesigen Pool. Komplexe Laute, N5-Kanjis, Partikel-Matrix und vor allem pures Audio-Hörverstehen (Radar). Kein Romaji. Fast kein Deutsch. Überlebe!"),
      startBtn: "Prüfung Starten",
      question: "Frage",
      btnNext: "Weiter",
      btnFinish: "Prüfung beenden & Auswerten",
      resultsTitle: "Prüfungs-Auswertung",
      totalScore: "Gesamtergebnis",
      rank: "Dein Rang:",
      recommendations: "Taktische Analyse",
      errorLogTitle: "Fehler-Protokoll",
      errorLogEmpty: "Keine Fehler! Perfekte Mission.",
      yourAnswer: "Deine Wahl:",
      correctAnswer: "Korrekt wäre:",
      transLabel: "Übersetzung / Bedeutung:",
      expLabel: "Erklärung:",
      btnHome: "Zurück zum Dashboard",
      btnRetry: "Prüfung wiederholen",
      examCancel: "Abbrechen",
      
      // Kategorienamen
      cat1Label: isGermanTarget ? "Phonetik & Aussprache" : (isEnglishTarget ? "Core Grammar & Vocabulary" : "Kana-Matrix (Erweitert)"),
      cat2Label: isGermanTarget ? "Satzklammer & V2-Flow" : (isEnglishTarget ? "Connected Speech & Tenses" : "N5 Kanji (Bedeutung & Lesung)"),
      cat3Label: isGermanTarget ? "D/A/CH Survival-Radar" : (isEnglishTarget ? "UK Survival-Radar" : "Partikel-Code"),
      cat4Label: isGermanTarget ? "Komposita-Dekomposition" : (isEnglishTarget ? "Idioms & Business Nuance" : "Radar (Audio & Dialoge)"),

      evalPerfect: "Hervorragend! Dieses Gebiet sitzt blind im Langzeitgedächtnis.",
      evalGood: "Solide Leistung, aber im Ernstfall noch etwas langsam. Dranbleiben!",
      evalCritical: "Kritisch! Du bist hier ein leichtes Ziel. Unbedingt diese Phase wiederholen!"
    },
    en: {
      back: "Back",
      introTitle: isGermanTarget ? "D/A/CH Final Exam" : (isEnglishTarget ? "UK Final Exam" : "Final Exam"),
      introSub: isGermanTarget ? "4-Phase Stress Test (German Mastery)" : (isEnglishTarget ? "4-Phase Stress Test (British Mastery)" : "The Ultimate Stress Test"),
      introDesc: isGermanTarget
        ? "Comprehensive exam across all 4 phases: German Phonetics, Sentence Bracket Architecture, 21-Day Survival Radar, and Compound Word Decomposition. Real-world audio scans and survival reflexes!"
        : (isEnglishTarget
            ? "Comprehensive exam across all 4 phases: Core Grammar & Vocabulary, Connected Speech & Phrasal Verbs, 21-Day UK Survival Radar, and Advanced Idioms & Business Nuance!"
            : "30 random questions from a massive pool. Complex sounds, N5 Kanjis, Particle Matrix and pure audio listening comprehension (Radar). No Romaji. Survive!"),
      startBtn: "Start Exam",
      question: "Question",
      btnNext: "Next",
      btnFinish: "Finish Exam & Evaluate",
      resultsTitle: "Exam Results",
      totalScore: "Total Score",
      rank: "Your Rank:",
      recommendations: "Tactical Analysis",
      errorLogTitle: "Error Log",
      errorLogEmpty: "No mistakes! Perfect mission.",
      yourAnswer: "Your choice:",
      correctAnswer: "Correct was:",
      transLabel: "Translation / Meaning:",
      expLabel: "Explanation:",
      btnHome: "Back to Dashboard",
      btnRetry: "Retry Exam",
      examCancel: "Cancel",

      cat1Label: isGermanTarget ? "Phonetics & Pronunciation" : (isEnglishTarget ? "Core Grammar & Vocabulary" : "Kana Matrix (Advanced)"),
      cat2Label: isGermanTarget ? "Sentence Bracket & V2" : (isEnglishTarget ? "Connected Speech & Tenses" : "N5 Kanji (Meaning & Reading)"),
      cat3Label: isGermanTarget ? "D/A/CH Survival Radar" : (isEnglishTarget ? "UK Survival Radar" : "Particle Code"),
      cat4Label: isGermanTarget ? "Compound Decomposition" : (isEnglishTarget ? "Idioms & Business Nuance" : "Radar (Audio & Dialogues)"),

      evalPerfect: "Excellent! This area is completely locked in your long-term memory.",
      evalGood: "Solid performance, but might be too slow in real situations. Keep practicing!",
      evalCritical: "Critical! You are an easy target here. You must repeat this phase!"
    },
    jpn: {
      back: "戻る",
      introTitle: isGermanTarget ? "実戦D/A/CH 総合修了試験" : (isEnglishTarget ? "実戦UK 総合修了試験" : "最終卒業試験"),
      introSub: isGermanTarget ? "ドイツ語4大フェーズ完全制覇ストレステスト" : (isEnglishTarget ? "イギリス英語4大フェーズ完全制覇ストレステスト" : "究極のストレステスト"),
      introDesc: isGermanTarget
        ? "RADARシステム全4段階（発音・母音長短／文枠構造・V2配置／21日日常サバイバル／複合語形態素解体）を網羅した実戦試験です。日本語の格変化表を捨て、現場のシグナル塊で即座に解答せよ！"
        : (isEnglishTarget
            ? "UK-RADARシステム全4段階（コア文法・語彙／音声連結・時制／21日UK日常サバイバル／上級イディオム＆ビジネス表現）を網羅した実戦試験です！"
            : "膨大なプールからランダム抽出された30問。複合音・N5漢字・助詞コード、そして実戦音声聴取。ローマ字なしで生き残れ！"),
      startBtn: "試験を開始する",
      question: "問題",
      btnNext: "次へ進む",
      btnFinish: "試験終了・結果判定",
      resultsTitle: "総合判定レポート",
      totalScore: "総合得点",
      rank: "獲得称号:",
      recommendations: "戦術分析・弱点補強",
      errorLogTitle: "誤答分析ログ",
      errorLogEmpty: "誤答なし！完璧なクリアです。",
      yourAnswer: "あなたの選択:",
      correctAnswer: "正解:",
      transLabel: "日本語訳・意味:",
      expLabel: "文法・発音解説:",
      btnHome: "ダッシュボードへ戻る",
      btnRetry: "試験を再受験する",
      examCancel: "中断する",

      cat1Label: isGermanTarget ? "第1期: 音声・発音規則" : (isEnglishTarget ? "第1期: コア文法・必須語彙" : "仮名マトリクス"),
      cat2Label: isGermanTarget ? "第2期: 文枠構造・動詞第2位" : (isEnglishTarget ? "第2期: 音声連結・時制マトリックス" : "N5必須漢字"),
      cat3Label: isGermanTarget ? "第3期: 現地サバイバルレーダー" : (isEnglishTarget ? "第3期: UK現地サバイバルレーダー" : "助詞コード"),
      cat4Label: isGermanTarget ? "第4期: 複合名詞形態素解体" : (isEnglishTarget ? "第4期: イディオム＆上級ニュアンス" : "実戦音響レーダー"),

      evalPerfect: "完璧です！この領域は長期記憶に完全に定着しています。",
      evalGood: "合格水準ですが、実戦では即答が必要です。反復演習を継続してください。",
      evalCritical: "危険水域です！現地で致命的な誤認を招く恐れがあります。該当フェーズを再受講してください！"
    }
  };

  const fallbackT = texts[currentLang] || texts.de;

  // Zusammenführung: Supabase-Werte aus ui_translations & course_manifests haben Vorrang vor lokalem Fallback
  const t = {
    ...fallbackT,
    back: dbUiTexts?.back || fallbackT.back,
    startBtn: dbUiTexts?.examStartBtn || fallbackT.startBtn,
    question: dbUiTexts?.examQuestion || fallbackT.question,
    btnNext: dbUiTexts?.next || fallbackT.btnNext,
    btnFinish: dbUiTexts?.examBtnFinish || fallbackT.btnFinish,
    resultsTitle: dbUiTexts?.examResultsTitle || fallbackT.resultsTitle,
    totalScore: dbUiTexts?.examTotalScore || fallbackT.totalScore,
    rank: dbUiTexts?.examRank || fallbackT.rank,
    recommendations: dbUiTexts?.examRecommendations || fallbackT.recommendations,
    errorLogTitle: dbUiTexts?.examErrorLogTitle || fallbackT.errorLogTitle,
    errorLogEmpty: dbUiTexts?.examErrorLogEmpty || fallbackT.errorLogEmpty,
    yourAnswer: dbUiTexts?.examYourAnswer || fallbackT.yourAnswer,
    correctAnswer: dbUiTexts?.examCorrectAnswer || fallbackT.correctAnswer,
    transLabel: dbUiTexts?.examTransLabel || fallbackT.transLabel,
    expLabel: dbUiTexts?.examExpLabel || fallbackT.expLabel,
    btnHome: dbUiTexts?.examBtnHome || fallbackT.btnHome,
    btnRetry: dbUiTexts?.examBtnRetry || fallbackT.btnRetry,
    examCancel: dbUiTexts?.examCancel || fallbackT.examCancel,
    evalPerfect: dbUiTexts?.evalPerfect || fallbackT.evalPerfect,
    evalGood: dbUiTexts?.evalGood || fallbackT.evalGood,
    evalCritical: dbUiTexts?.evalCritical || fallbackT.evalCritical,
    introTitle: dbCourseManifest?.examIntroTitle || fallbackT.introTitle,
    introSub: dbCourseManifest?.examIntroSub || fallbackT.introSub,
    introDesc: dbCourseManifest?.examIntroDesc || fallbackT.introDesc,
    cat1Label: dbCourseManifest?.examCat1Label || fallbackT.cat1Label,
    cat2Label: dbCourseManifest?.examCat2Label || fallbackT.cat2Label,
    cat3Label: dbCourseManifest?.examCat3Label || fallbackT.cat3Label,
    cat4Label: dbCourseManifest?.examCat4Label || fallbackT.cat4Label
  };

  // Sprachsynthese: Dynamisch de-DE, en-GB oder ja-JP
  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = isDeOrEnTarget
        ? text.replace(/\[.*?\]/g, '').trim()
        : text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = isGermanTarget ? 'de-DE' : (isEnglishTarget ? 'en-GB' : 'ja-JP');
      utterance.rate = isDeOrEnTarget ? 0.90 : 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const getOptionText = (opt) => {
    if (!opt) return "N/A";
    if (typeof opt === 'string') return opt;
    return opt[currentLang] || opt[dbSourceLang] || opt.de || opt.en || "N/A";
  };

  const startExam = () => {
    const fallbackPool = isDeOrEnTarget ? masterPoolDE : masterPoolJP;
    const rawPool = (dbQuestionPool && dbQuestionPool.length > 0) ? dbQuestionPool : fallbackPool;
    const shuffledPool = shuffleArray(rawPool);
    const questionLimit = Math.min(shuffledPool.length, 30);
    
    const selected = shuffledPool.slice(0, questionLimit).map(q => {
      const correctOptObj = q.options[q.correct];
      const shuffledOptions = shuffleArray(q.options);
      let newCorrectIndex = shuffledOptions.indexOf(correctOptObj);
      if (newCorrectIndex === -1) newCorrectIndex = 0; 

      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrectIndex
      };
    });
    
    setQuestions(selected);
    setScore(0);
    setWrongAnswers([]);
    setCategoryStats({
      cat1: { correct: 0, total: 0 },
      cat2: { correct: 0, total: 0 },
      cat3: { correct: 0, total: 0 },
      cat4: { correct: 0, total: 0 }
    });
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setExamState('exam');
  };

  const handleSelectOption = (idx) => {
    setSelectedAnswer(idx);
  };

  const mapCategoryToKey = (cat) => {
    if (cat === 'cat1' || cat === 'cat2' || cat === 'cat3' || cat === 'cat4') return cat;
    if (isDeOrEnTarget) {
      if (cat === 'phonetik' || cat === 'grammar' || cat === 'vocab') return 'cat1';
      if (cat === 'klammer' || cat === 'flow' || cat === 'tenses') return 'cat2';
      if (cat === 'radar') return 'cat3';
      if (cat === 'komposita' || cat === 'idioms' || cat === 'nuance') return 'cat4';
    } else {
      if (cat === 'kana') return 'cat1';
      if (cat === 'kanji') return 'cat2';
      if (cat === 'particle') return 'cat3';
      if (cat === 'radar') return 'cat4';
    }
    return 'cat1';
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const currentQ = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQ.correct;
    const catKey = mapCategoryToKey(currentQ.category);

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      const questionPrompt = currentQ.audioText 
        ? `🎧 (Audio: ${currentQ.audioText})` 
        : (currentQ.q[currentLang] || currentQ.q[dbSourceLang] || currentQ.q.de || currentQ.q.en);

      const correctChoiceObj = currentQ.options[currentQ.correct] || currentQ.options[0];
      const userChoiceObj = currentQ.options[selectedAnswer] || "N/A";

      setWrongAnswers(prev => [...prev, {
        questionText: questionPrompt,
        userChoice: getOptionText(userChoiceObj),
        correctChoice: getOptionText(correctChoiceObj),
        translation: currentQ.translation ? (currentQ.translation[currentLang] || currentQ.translation[dbSourceLang] || currentQ.translation.de || currentQ.translation.en) : null,
        explanation: currentQ.explanation ? (currentQ.explanation[currentLang] || currentQ.explanation[dbSourceLang] || currentQ.explanation.de || currentQ.explanation.en) : null
      }]);
    }
    
    setCategoryStats(prev => ({
      ...prev,
      [catKey]: {
        correct: prev[catKey].correct + (isCorrect ? 1 : 0),
        total: prev[catKey].total + 1
      }
    }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setExamState('result');
    }
  };

  const getRank = (percentage) => {
    if (isDeOrEnTarget) {
      const regionTitle = isEnglishTarget ? "UK INSIDER 🎖️" : "D/A/CH INSIDER 🎖️";
      if (percentage >= 90) return { title: regionTitle, desc: currentLang === 'jpn' ? "現地即応完了・ネイティブレベル" : "Vollkommene Beherrschung aller Realtransaktionen.", color: "text-yellow-400" };
      if (percentage >= 75) return { title: "SURVIVAL EXPERT 🛡️", desc: currentLang === 'jpn' ? "現場対応力確立・生活自立レベル" : "Souveräne Alltags-Reflexe im gesamten Sprachraum.", color: "text-cyan-400" };
      if (percentage >= 50) return { title: "NAVIGATOR 🧭", desc: currentLang === 'jpn' ? "基本構造把握・要反復演習" : "Solide Basis, aber noch Verzögerungen bei Notfällen.", color: "text-green-400" };
      return { title: "ANFÄNGER ⚠️", desc: currentLang === 'jpn' ? "基礎再受講推奨" : "Kritische Lücken. Bitte Kernmodule wiederholen!", color: "text-red-400" };
    }

    if (percentage >= 90) return { title: "SHOGUN 👑", desc: "Meister des Systems", color: "text-yellow-400" };
    if (percentage >= 75) return { title: "SAMURAI ⚔️", desc: "Elite-Kämpfer", color: "text-cyan-400" };
    if (percentage >= 50) return { title: "NINJA 🥷", desc: "Schattenläufer", color: "text-green-400" };
    return { title: "RONIN 🚶", desc: "Herrenloser Krieger", color: "text-red-400" };
  };

  const getRecommendation = (correct, total) => {
    if (total === 0) return "-";
    const pct = (correct / total) * 100;
    if (pct >= 80) return t.evalPerfect;
    if (pct >= 50) return t.evalGood;
    return t.evalCritical;
  };

  // --- VIEW 1: INTRO ---
  if (examState === 'intro') {
    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto">
        <div className="absolute top-6 left-6 z-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors active:scale-95 cursor-pointer">
            &larr; {t.back}
          </button>
        </div>
        
        <div className="mt-16 flex flex-col items-center max-w-md text-center animate-fade-in">
          <div className="w-24 h-24 bg-red-900/30 rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] mb-6">
            <span className="text-5xl">{isDeOrEnTarget ? "🏛️" : "⛩️"}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-red-500 uppercase mb-2 leading-tight">
            {t.introTitle}
          </h1>
          <h2 className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6">
            {t.introSub}
          </h2>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-10 border-l-2 border-red-500/50 pl-4 text-left">
            {t.introDesc}
          </p>
          
          <button 
            onClick={startExam} 
            className="w-full py-5 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {t.startBtn}
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 2: EXAM FRAGENLAUF ---
  if (examState === 'exam') {
    const q = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    
    const catColors = {
      phonetik: "text-blue-400 border-blue-500/50 bg-blue-900/20",
      klammer: "text-purple-400 border-purple-500/50 bg-purple-900/20",
      radar: "text-green-400 border-green-500/50 bg-green-900/20",
      komposita: "text-cyan-400 border-cyan-500/50 bg-cyan-900/20",
      kana: "text-blue-400 border-blue-500/50 bg-blue-900/20",
      kanji: "text-purple-400 border-purple-500/50 bg-purple-900/20",
      particle: "text-orange-400 border-orange-500/50 bg-orange-900/20"
    };

    const getBadgeLabel = (cat) => {
      if (isDeOrEnTarget) {
        if (cat === 'phonetik') return isEnglishTarget ? "CORE ENGLISH" : "PHONETIK";
        if (cat === 'klammer') return isEnglishTarget ? "CONNECTED SPEECH" : "SATZKLAMMER";
        if (cat === 'radar') return "SURVIVAL RADAR";
        if (cat === 'komposita') return isEnglishTarget ? "IDIOMS & NUANCE" : "KOMPOSITA";
      }
      return (cat || "").toUpperCase();
    };

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-hidden">
        
        {/* Progress Bar oben */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-800">
          <div 
            className="h-full bg-red-500 transition-all duration-300" 
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="w-full max-w-md flex justify-between items-center mt-6 mb-6">
          <button onClick={onBack} className="text-gray-500 text-xs uppercase font-bold tracking-widest hover:text-white cursor-pointer">
            ✕ {t.examCancel}
          </button>
          <span className="text-gray-400 text-xs font-bold tracking-widest">
            {t.question} {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="w-full max-w-md flex flex-col animate-fade-in flex-1">
          
          {/* Kategorie Badge */}
          <div className="flex justify-center mb-4">
            <span className={`text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${catColors[q.category] || 'text-gray-400 border-gray-600'}`}>
              {getBadgeLabel(q.category)}
            </span>
          </div>

          {/* Frage-Box */}
          <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl mb-6 min-h-[140px] flex flex-col items-center justify-center text-center">
            {q.audioText && (
              <button 
                onClick={() => playAudio(q.audioText)}
                className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto hover:bg-blue-600/40 active:scale-95 transition-all shadow-lg shadow-blue-500/10 border border-blue-500/50 cursor-pointer"
                title="Audio abspielen"
              >
                🔊
              </button>
            )}

            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {q.q[currentLang] || q.q[dbSourceLang] || q.q.de || q.q.en}
            </h2>
          </div>

          {/* Optionen */}
          <div className="space-y-3 mb-6">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const btnClass = isSelected 
                ? "bg-cyan-900/50 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.01]" 
                : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-750 hover:border-gray-500";

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border-2 font-bold text-base transition-all text-left cursor-pointer ${btnClass}`}
                >
                  {getOptionText(opt)}
                </button>
              );
            })}
          </div>
          
          {/* Weiter / Beenden Button */}
          <div className="mt-auto pb-6">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full py-4 rounded-xl font-bold text-white text-base tracking-widest uppercase transition-all shadow-lg active:scale-95 cursor-pointer ${
                selectedAnswer !== null 
                  ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 shadow-red-500/20" 
                  : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {isLastQuestion ? t.btnFinish : t.btnNext}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- VIEW 3: RESULT REPORT ---
  if (examState === 'result') {
    const totalQ = questions.length || 1;
    const percentage = Math.round((score / totalQ) * 100);
    const rankInfo = getRank(percentage);

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
        
        <div className="mt-6 mb-8 flex flex-col items-center w-full max-w-md text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6">
            {t.resultsTitle}
          </h1>
          
          {/* Score Card */}
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden mb-8">
            <div className={`absolute top-0 left-0 w-full h-2 ${percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{t.totalScore}</p>
            <div className="text-6xl font-extrabold text-white mb-6">
              {score}<span className="text-2xl text-gray-500">/{totalQ}</span>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t.rank}</p>
              <h2 className={`text-3xl font-extrabold tracking-wider ${rankInfo.color}`}>{rankInfo.title}</h2>
              <p className="text-sm text-gray-300 italic mt-1">{rankInfo.desc}</p>
            </div>
          </div>

          {/* 4-Kategorien-Analyse */}
          <div className="w-full text-left">
            <h3 className="text-base font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>📊</span> {t.recommendations}
            </h3>
            
            <div className="space-y-4 mb-8">
              {/* Kategorie 1 */}
              <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-blue-400 text-sm">{t.cat1Label}</span>
                  <span className="text-xs font-bold text-gray-400">{categoryStats.cat1.correct}/{categoryStats.cat1.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${categoryStats.cat1.total > 0 ? (categoryStats.cat1.correct / categoryStats.cat1.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.cat1.correct, categoryStats.cat1.total)}</p>
              </div>

              {/* Kategorie 2 */}
              <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-purple-400 text-sm">{t.cat2Label}</span>
                  <span className="text-xs font-bold text-gray-400">{categoryStats.cat2.correct}/{categoryStats.cat2.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${categoryStats.cat2.total > 0 ? (categoryStats.cat2.correct / categoryStats.cat2.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.cat2.correct, categoryStats.cat2.total)}</p>
              </div>

              {/* Kategorie 3 */}
              <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-orange-400 text-sm">{t.cat3Label}</span>
                  <span className="text-xs font-bold text-gray-400">{categoryStats.cat3.correct}/{categoryStats.cat3.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${categoryStats.cat3.total > 0 ? (categoryStats.cat3.correct / categoryStats.cat3.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.cat3.correct, categoryStats.cat3.total)}</p>
              </div>

              {/* Kategorie 4 */}
              <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-green-400 text-sm">{t.cat4Label}</span>
                  <span className="text-xs font-bold text-gray-400">{categoryStats.cat4.correct}/{categoryStats.cat4.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-2 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${categoryStats.cat4.total > 0 ? (categoryStats.cat4.correct / categoryStats.cat4.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.cat4.correct, categoryStats.cat4.total)}</p>
              </div>
            </div>

            {/* Fehlerprotokoll */}
            <h3 className="text-base font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⚠️</span> {t.errorLogTitle}
            </h3>
            
            <div className="space-y-4 mb-10">
              {wrongAnswers.length === 0 ? (
                <div className="bg-green-900/30 p-5 rounded-2xl border border-green-500/50 text-center">
                  <p className="text-green-400 font-bold">{t.errorLogEmpty}</p>
                </div>
              ) : (
                wrongAnswers.map((err, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-2xl border border-gray-700 text-left">
                    <p className="text-white font-bold mb-3 border-b border-gray-700 pb-2 leading-relaxed text-sm">
                      {err.questionText}
                    </p>
                    
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="bg-red-900/20 p-2.5 rounded-lg border border-red-500/30">
                        <span className="text-[10px] text-red-400 uppercase tracking-widest block mb-0.5">{t.yourAnswer}</span>
                        <span className="text-red-300 font-bold text-xs">{err.userChoice}</span>
                      </div>
                      <div className="bg-green-900/20 p-2.5 rounded-lg border border-green-500/30">
                        <span className="text-[10px] text-green-400 uppercase tracking-widest block mb-0.5">{t.correctAnswer}</span>
                        <span className="text-green-300 font-bold text-xs">{err.correctChoice}</span>
                      </div>
                    </div>

                    {err.translation && (
                      <div className="mt-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-0.5">{t.transLabel}</span>
                        <p className="text-xs text-gray-300 italic">{err.translation}</p>
                      </div>
                    )}

                    {err.explanation && (
                      <div className="mt-2 bg-cyan-900/20 p-2.5 rounded-lg border border-cyan-500/30">
                        <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-0.5 flex items-center gap-1">
                          <span>💡</span> {t.expLabel}
                        </span>
                        <p className="text-xs text-cyan-100 leading-relaxed">{err.explanation}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Aktionen */}
            <div className="space-y-3 pb-12">
              <button 
                onClick={startExam} 
                className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl font-bold text-white tracking-widest uppercase transition-colors active:scale-95 cursor-pointer text-sm"
              >
                {t.btnRetry}
              </button>
              <button 
                onClick={onBack} 
                className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/20 rounded-xl font-bold text-white tracking-widest uppercase transition-all active:scale-95 cursor-pointer text-sm"
              >
                {t.btnHome}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FinalExam;