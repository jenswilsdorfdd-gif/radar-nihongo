import React, { useState, useEffect } from 'react';

// --- ROBUSTER SHUFFLE ALGORITHMUS (Fisher-Yates) ---
// Verhindert das Verschlucken von Elementen durch den Browser!
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- MONSTER-POOL AUSGELAGERT --- 
// (Spart extrem viel Speicher, da er nicht bei jedem Klick neu gerendert wird)
const masterPool = [
  // --- KANA ---
  { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びょういん", en: "Hospital or Hairdresser? Read: びょういん" }, options: [{de: "Krankenhaus", en: "Hospital"}, {de: "Friseur", en: "Hairdresser"}, {de: "Arzt", en: "Doctor"}, {de: "Firma", en: "Company"}], correct: 0 },
  { category: 'kana', q: { de: "Krankenhaus oder Friseur? Lies: びよういん", en: "Hospital or Hairdresser? Read: びよういん" }, options: [{de: "Friseur", en: "Hairdresser"}, {de: "Krankenhaus", en: "Hospital"}, {de: "Schule", en: "School"}, {de: "Arzt", en: "Doctor"}], correct: 0 },
  { category: 'kana', q: { de: "Oma oder Tante? Lies: おばあさん", en: "Grandma or Aunt? Read: おばあさん" }, options: [{de: "Oma / Ältere Frau", en: "Grandma / Old lady"}, {de: "Tante", en: "Aunt"}, {de: "Mutter", en: "Mother"}, {de: "Schwester", en: "Sister"}], correct: 0 },
  { category: 'kana', q: { de: "Lies das Katakana-Wort: コンピューター", en: "Read the Katakana: コンピューター" }, options: [{de: "Computer", en: "Computer"}, {de: "Kamera", en: "Camera"}, {de: "Kaffee", en: "Coffee"}, {de: "Konzert", en: "Concert"}], correct: 0 },
  { category: 'kana', q: { de: "Was bedeutet: ぎゅうにゅう", en: "What means: ぎゅうにゅう" }, options: [{de: "Kuhmilch", en: "Cow milk"}, {de: "Rindfleisch", en: "Beef"}, {de: "Schwein", en: "Pork"}, {de: "Zwiebel", en: "Onion"}], correct: 0 },
  { category: 'kana', q: { de: "Lies: じゅぎょう", en: "Read: じゅぎょう" }, options: [{de: "Unterricht", en: "Class / Lesson"}, {de: "Firma", en: "Company"}, {de: "Mitarbeiter", en: "Employee"}, {de: "Schüler", en: "Student"}], correct: 0 },
  { category: 'kana', q: { de: "Finde: 'pya'", en: "Find: 'pya'" }, options: ["ぴゃ", "びゃ", "ひゃ", "ぱや"], correct: 0 },
  { category: 'kana', q: { de: "Lies: きょう", en: "Read: きょう" }, options: [{de: "Heute", en: "Today"}, {de: "Morgen", en: "Tomorrow"}, {de: "Gestern", en: "Yesterday"}, {de: "Kaiser", en: "Emperor"}], correct: 0 },
  { category: 'kana', q: { de: "Finde das Katakana 'shi':", en: "Find Katakana 'shi':" }, options: ["シ", "ツ", "ソ", "ン"], correct: 0 },
  { category: 'kana', q: { de: "Lies: がっこう", en: "Read: がっこう" }, options: [{de: "Schule", en: "School"}, {de: "Schüler", en: "Student"}, {de: "Lehrer", en: "Teacher"}, {de: "Firma", en: "Company"}], correct: 0 },
  { category: 'kana', q: { de: "Lies: しゅくだい", en: "Read: しゅくだい" }, options: [{de: "Hausaufgaben", en: "Homework"}, {de: "Unterricht", en: "Lesson"}, {de: "Prüfung", en: "Exam"}, {de: "Lehrer", en: "Teacher"}], correct: 0 },
  { category: 'kana', q: { de: "Lies das Katakana: コーヒー", en: "Read Katakana: コーヒー" }, options: [{de: "Kaffee", en: "Coffee"}, {de: "Kola", en: "Cola"}, {de: "Kuchen", en: "Cake"}, {de: "Kopie", en: "Copy"}], correct: 0 },
  { category: 'kana', q: { de: "Was bedeutet: ちょっと", en: "What means: ちょっと" }, options: [{de: "Ein bisschen / Kurz", en: "A little / A moment"}, {de: "Viel", en: "A lot"}, {de: "Warte", en: "Wait"}, {de: "Schnell", en: "Fast"}], correct: 0 },
  { category: 'kana', q: { de: "Finde: 'gyo'", en: "Find: 'gyo'" }, options: ["ぎょ", "ぎゅ", "きゃ", "きょ"], correct: 0 },

  // --- KANJI (N5) ---
  { category: 'kanji', q: { de: "Lies: 今日", en: "Read: 今日" }, options: ["きょう", "まいにち", "あした", "きのう"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 毎日", en: "Read: 毎日" }, options: ["まいにち", "きょう", "いつか", "にちようび"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 日本", en: "What means: 日本" }, options: [{de: "Japan", en: "Japan"}, {de: "Sonntag", en: "Sunday"}, {de: "Buch", en: "Book"}, {de: "Heute", en: "Today"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Mensch/Person':", en: "Find Kanji for 'Person':" }, options: ["人", "入", "八", "大"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 水曜日", en: "Read: 水曜日" }, options: [{de: "すいようび (Mittwoch)", en: "すいようび (Wednesday)"}, {de: "かようび (Dienstag)", en: "かようび (Tuesday)"}, {de: "もくようび (Donnerstag)", en: "もくようび (Thursday)"}, {de: "きんようび (Freitag)", en: "きんようび (Friday)"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 休み", en: "What means: 休み" }, options: [{de: "Pause / Ausruhen", en: "Break / Rest"}, {de: "Baum", en: "Tree"}, {de: "Buch", en: "Book"}, {de: "Körper", en: "Body"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 月", en: "Read: 月" }, options: ["つき / げつ", "ひ / にち", "き", "みず"], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Baum/Holz':", en: "Find Kanji for 'Tree':" }, options: ["木", "本", "休", "体"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 男の人", en: "What means: 男の人" }, options: [{de: "Mann", en: "Man"}, {de: "Frau", en: "Woman"}, {de: "Kind", en: "Child"}, {de: "Mädchen", en: "Girl"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 山川さん", en: "What means: 山川さん" }, options: [{de: "Yamakawa-san (Name)", en: "Yamakawa-san (Name)"}, {de: "Fluss und Berg", en: "River and Mountain"}, {de: "Herr Berg", en: "Mr. Mountain"}, {de: "Frau Fluss", en: "Ms. River"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 食べます", en: "Read: 食べます" }, options: ["たべます", "のみます", "みます", "いきます"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 飲みます", en: "Read: 飲みます" }, options: ["のみます", "たべます", "よみます", "かきます"], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Groß':", en: "Find Kanji for 'Big':" }, options: ["大", "小", "中", "太"], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 行きます", en: "Read: 行きます" }, options: ["いきます", "きます", "みます", "します"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 百", en: "What means: 百" }, options: [{de: "Hundert", en: "Hundred"}, {de: "Tausend", en: "Thousand"}, {de: "Zehntausend", en: "Ten thousand"}, {de: "Weiß", en: "White"}], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 千円", en: "What means: 千円" }, options: [{de: "1000 Yen", en: "1000 Yen"}, {de: "100 Yen", en: "100 Yen"}, {de: "10000 Yen", en: "10000 Yen"}, {de: "Yen", en: "Yen"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde das Kanji für 'Auge':", en: "Find Kanji for 'Eye':" }, options: ["目", "日", "口", "耳"], correct: 0 },
  { category: 'kanji', q: { de: "Was bedeutet: 天気", en: "What means: 天気" }, options: [{de: "Wetter", en: "Weather"}, {de: "Himmel", en: "Sky"}, {de: "Luft", en: "Air"}, {de: "Geist", en: "Spirit"}], correct: 0 },
  { category: 'kanji', q: { de: "Finde: 車", en: "Find: 車" }, options: [{de: "くるま (Auto)", en: "くるま (Car)"}, {de: "でんしゃ (Zug)", en: "でんしゃ (Train)"}, {de: "じてんしゃ (Fahrrad)", en: "じてんしゃ (Bicycle)"}, {de: "えき (Bahnhof)", en: "えき (Station)"}], correct: 0 },
  { category: 'kanji', q: { de: "Lies: 見ます", en: "Read: 見ます" }, options: ["みます", "ききます", "はなします", "かきます"], correct: 0 },

  // --- PARTICLE MATRIX ---
  { category: 'particle', q: { de: "わたし [ ? ] ドイツじんです。", en: "わたし [ ? ] ドイツじんです。" }, options: ["は", "を", "で", "に"], correct: 0 },
  { category: 'particle', q: { de: "みず [ ? ] のみます。", en: "みず [ ? ] のみます。" }, options: ["を", "は", "に", "が"], correct: 0 },
  { category: 'particle', q: { de: "あした、とうきょう [ ? ] いきます。", en: "あした、とうきょう [ ? ] いきます。" }, options: ["へ / に", "を", "で", "が"], correct: 0 },
  { category: 'particle', q: { de: "レストラン [ ? ] すしを たべる。", en: "レストラン [ ? ] すしを たべる。" }, options: ["で", "に", "は", "が"], correct: 0 },
  { category: 'particle', q: { de: "タクシー [ ? ] かえります。", en: "タクシー [ ? ] かえります。" }, options: ["で", "に", "を", "は"], correct: 0 },
  { category: 'particle', q: { de: "あめ [ ? ] ふっています。(Fokus!)", en: "あめ [ ? ] ふっています。(Focus!)" }, options: ["が", "を", "で", "は"], correct: 0 },
  { category: 'particle', q: { de: "ともだち [ ? ] えいがを みます。", en: "ともだち [ ? ] えいがを みます。" }, options: ["と", "から", "まで", "に"], correct: 0 },
  { category: 'particle', q: { de: "あさ、９じ [ ? ] おきます。", en: "あさ、９じ [ ? ] おきます。" }, options: ["に", "で", "を", "は"], correct: 0 },
  { category: 'particle', q: { de: "えき [ ? ] きました。", en: "えき [ ? ] きました。" }, options: ["から", "まで", "に", "で"], correct: 0 },
  { category: 'particle', q: { de: "ホテル [ ? ] おねがいします。", en: "ホテル [ ? ] おねがいします。" }, options: ["まで", "を", "から", "は"], correct: 0 },
  { category: 'particle', q: { de: "ほん [ ? ] ノートを かいます。(Und)", en: "ほん [ ? ] ノートを かいます。(And)" }, options: ["と", "に", "で", "が"], correct: 0 },
  { category: 'particle', q: { de: "だれ [ ? ] きますか。(Subjekt)", en: "だれ [ ? ] きますか。(Subject)" }, options: ["が", "は", "を", "で"], correct: 0 },
  { category: 'particle', q: { de: "にほんご [ ? ] はなします。", en: "にほんご [ ? ] はなします。" }, options: ["を / で", "に", "が", "から"], correct: 0 },
  { category: 'particle', q: { de: "スマホ [ ? ] しゃしんを とる。(Mittel)", en: "スマホ [ ? ] しゃしんを とる。(Means)" }, options: ["で", "に", "を", "は"], correct: 0 },
  { category: 'particle', q: { de: "ドイツ [ ? ] 日本まで。", en: "ドイツ [ ? ] 日本まで。" }, options: ["から", "に", "を", "が"], correct: 0 },

  // --- RADAR: TEXT ---
  { category: 'radar', q: { de: "Wie fragst du, wo die Toilette ist?", en: "How do you ask where the toilet is?" }, options: ["トイレは どこですか。", "トイレは いつですか。", "トイレは なんですか。", "トイレは いくらですか。"], correct: 0 },
  { category: 'radar', q: { de: "Du möchtest etwas kaufen. Zeig darauf und sag:", en: "You want to buy something. Point and say:" }, options: ["これを ください。", "ありがとう。", "わかりません。", "それです。"], correct: 0 },
  { category: 'radar', q: { de: "Jemand redet viel zu schnell. Was sagst du?", en: "Someone is speaking too fast. What do you say?" }, options: ["ゆっくり はなして ください。", "わかります。", "しりません。", "ちがいます。"], correct: 0 },
  { category: 'radar', q: { de: "Du verlässt morgens das Haus:", en: "You leave the house in the morning:" }, options: ["いってきます。", "ただいま。", "おかえり。", "おやすみ。"], correct: 0 },
  { category: 'radar', q: { de: "Du kaufst ein Ticket. Was fragst du den Verkäufer?", en: "You buy a ticket. What do you ask?" }, options: ["いくらですか。", "どこですか。", "なんですか。", "だれですか。"], correct: 0 },

  // --- RADAR: PURES AUDIO ---
  { category: 'radar', audioText: "おなまえは なんですか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["じぇんす です。", "ドイツから きました。", "はい、そうです。", "ありがとう。"], correct: 0 },
  { category: 'radar', audioText: "どこから きましたか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["ドイツから きました。", "ベルリンに いきます。", "はい、ドイツです。", "ちがいます。"], correct: 0 },
  { category: 'radar', audioText: "いただきます", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Vor dem Essen", en: "Before eating"}, {de: "Nach dem Essen", en: "After eating"}, {de: "Beim Betreten eines Ladens", en: "Entering a store"}, {de: "Beim Bezahlen", en: "Paying"}], correct: 0 },
  { category: 'radar', audioText: "ごちそうさまでした", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Nach dem Essen", en: "After eating"}, {de: "Vor dem Essen", en: "Before eating"}, {de: "Beim Vorstellen", en: "Introducing"}, {de: "Verabschiedung", en: "Farewell"}], correct: 0 },
  { category: 'radar', audioText: "すみません、えきは どこですか。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: [{de: "Sucht den Bahnhof", en: "Looks for station"}, {de: "Sucht die Toilette", en: "Looks for toilet"}, {de: "Fragt den Preis", en: "Asks for price"}, {de: "Fragt die Uhrzeit", en: "Asks the time"}], correct: 0 },
  { category: 'radar', audioText: "いらっしゃいませ", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: [{de: "Laden-Personal", en: "Shop staff"}, {de: "Ich selbst", en: "Myself"}, {de: "Gastfamilie", en: "Host family"}, {de: "Passant", en: "Stranger"}], correct: 0 },
  { category: 'radar', audioText: "これ、いくらですか。", q: { de: "🎧 Was fragt die Person?", en: "🎧 What is asked?" }, options: [{de: "Wie viel das kostet", en: "How much it costs"}, {de: "Wo das ist", en: "Where it is"}, {de: "Was das ist", en: "What it is"}, {de: "Wem das gehört", en: "Whose it is"}], correct: 0 },
  { category: 'radar', audioText: "これを おねがいします。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Beim Bestellen/Kaufen", en: "Buying/Ordering"}, {de: "Nach dem Weg fragen", en: "Asking directions"}, {de: "Sich verabschieden", en: "Saying goodbye"}, {de: "Sich entschuldigen", en: "Apologizing"}], correct: 0 },
  { category: 'radar', audioText: "ありがとうございます", q: { de: "🎧 Deine Antwort?", en: "🎧 Your reply?" }, options: ["どういたしまして。", "いただきます。", "ごめんなさい。", "ただいま。"], correct: 0 },
  { category: 'radar', audioText: "おかいけい、おねがいします。", q: { de: "🎧 Was will der NPC?", en: "🎧 What does the NPC want?" }, options: [{de: "Die Rechnung bitte", en: "The bill please"}, {de: "Speisekarte bitte", en: "Menu please"}, {de: "Wasser bitte", en: "Water please"}, {de: "Wo ist die Kasse?", en: "Where is the register?"}], correct: 0 },
  { category: 'radar', audioText: "ちょっと まってください。", q: { de: "🎧 Was passiert?", en: "🎧 What is happening?" }, options: [{de: "Du sollst warten", en: "You should wait"}, {de: "Jemand geht weg", en: "Someone leaves"}, {de: "Zu schnell gesprochen", en: "Speaking too fast"}, {de: "Zu teuer", en: "Too expensive"}], correct: 0 },
  { category: 'radar', audioText: "いってらっしゃい", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: [{de: "Person, die zu Hause bleibt", en: "Person staying home"}, {de: "Person, die das Haus verlässt", en: "Person leaving"}, {de: "Person, die heimkehrt", en: "Person arriving"}, {de: "Verkäufer im Laden", en: "Shop staff"}], correct: 0 },
  { category: 'radar', audioText: "おかえりなさい", q: { de: "🎧 Wer sagt das?", en: "🎧 Who says this?" }, options: [{de: "Person, die zu Hause empfängt", en: "Person staying home"}, {de: "Person, die heimkehrt", en: "Person arriving"}, {de: "Person, die das Haus verlässt", en: "Person leaving"}, {de: "Verkäufer im Laden", en: "Shop staff"}], correct: 0 },
  { category: 'radar', audioText: "もういちど おねがいします。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Bitte wiederholen Sie", en: "Please repeat"}, {de: "Bitte warten Sie", en: "Please wait"}, {de: "Bitte langsamer", en: "Please slower"}, {de: "Ich verstehe nicht", en: "I don't understand"}], correct: 0 },
  { category: 'radar', audioText: "えいごを はなしますか。", q: { de: "🎧 Antwort?", en: "🎧 Reply?" }, options: ["はい、はなします。", "えいごです。", "わかりません。", "ちがいます。"], correct: 0 },
  { category: 'radar', audioText: "トイレは どこですか。", q: { de: "🎧 Was fragt der NPC?", en: "🎧 What does the NPC ask?" }, options: [{de: "Wo die Toilette ist", en: "Where the toilet is"}, {de: "Ob es eine Toilette gibt", en: "If there is a toilet"}, {de: "Was es kostet", en: "How much it costs"}, {de: "Wer dort ist", en: "Who is in there"}], correct: 0 },
  { category: 'radar', audioText: "カードで いいですか。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Kartenzahlung an der Kasse", en: "Card payment at register"}, {de: "Nach dem Namen fragen", en: "Asking for name"}, {de: "Ticketkontrolle im Zug", en: "Ticket check"}, {de: "Brief einwerfen", en: "Mailing a letter"}], correct: 0 },
  { category: 'radar', audioText: "ふくろは いりますか。", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "An der Kasse (Tüte?)", en: "Register (Need a bag?)"}, {de: "Im Restaurant (Getränke?)", en: "Restaurant (Drinks?)"}, {de: "Auf der Straße (Hilfe?)", en: "Street (Help?)"}, {de: "Im Hotel (Schlüssel?)", en: "Hotel (Key?)"}], correct: 0 },
  { category: 'radar', audioText: "ちがいます。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Das ist falsch / Stimmt nicht", en: "That's wrong / Incorrect"}, {de: "Ich weiß nicht", en: "I don't know"}, {de: "Ich verstehe nicht", en: "I don't understand"}, {de: "Es tut mir leid", en: "I'm sorry"}], correct: 0 },
  { category: 'radar', audioText: "わかりません。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Ich verstehe nicht", en: "I don't understand"}, {de: "Ich weiß nicht", en: "I don't know"}, {de: "Das ist falsch", en: "That's wrong"}, {de: "Es tut mir leid", en: "I'm sorry"}], correct: 0 },
  { category: 'radar', audioText: "えきまで おねがいします。", q: { de: "🎧 Wo bist du?", en: "🎧 Where are you?" }, options: [{de: "Im Taxi", en: "In a taxi"}, {de: "Im Restaurant", en: "In a restaurant"}, {de: "Im Supermarkt", en: "In a supermarket"}, {de: "Auf der Post", en: "At the post office"}], correct: 0 },
  { category: 'radar', audioText: "ごめんください", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Man betritt ein fremdes Haus", en: "Entering someone's house"}, {de: "Man entschuldigt sich", en: "Apologizing"}, {de: "Man verlässt ein Geschäft", en: "Leaving a store"}, {de: "Am Telefon", en: "On the phone"}], correct: 0 },
  { category: 'radar', audioText: "もしもし", q: { de: "🎧 Situation?", en: "🎧 Situation?" }, options: [{de: "Am Telefon", en: "On the phone"}, {de: "Beim Anklopfen", en: "Knocking on a door"}, {de: "Auf der Straße rufen", en: "Calling on the street"}, {de: "Im Restaurant", en: "In a restaurant"}], correct: 0 },
  { category: 'radar', audioText: "なんめいさま ですか。", q: { de: "🎧 Wo bist du?", en: "🎧 Where are you?" }, options: [{de: "Empfang im Restaurant", en: "Restaurant reception"}, {de: "Am Bahnhof", en: "At the station"}, {de: "Im Taxi", en: "In a taxi"}, {de: "Im Konbini", en: "Convenience store"}], correct: 0 },
  { category: 'radar', audioText: "ふたりです。", q: { de: "🎧 Auf welche Frage antwortest du?", en: "🎧 Which question are you answering?" }, options: ["なんめいさま ですか。", "おなまえは なんですか。", "いくつですか。", "いくらですか。"], correct: 0 },
  { category: 'radar', audioText: "だいじょうぶ ですか。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Ist alles in Ordnung?", en: "Is everything ok?"}, {de: "Wie spät ist es?", en: "What time is it?"}, {de: "Wer ist das?", en: "Who is that?"}, {de: "Wo ist das?", en: "Where is that?"}], correct: 0 },
  { category: 'radar', audioText: "はい、だいじょうぶ です。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Ja, alles in Ordnung.", en: "Yes, everything is ok."}, {de: "Ja, bitte.", en: "Yes, please."}, {de: "Nein, danke.", en: "No, thank you."}, {de: "Das ist falsch.", en: "That's wrong."}], correct: 0 },
  { category: 'radar', audioText: "いいえ、けっこうです。", q: { de: "🎧 Bedeutung?", en: "🎧 Meaning?" }, options: [{de: "Nein, danke (ich brauche nichts).", en: "No thank you."}, {de: "Das ist falsch.", en: "That's wrong."}, {de: "Ich verstehe nicht.", en: "I don't understand."}, {de: "Entschuldigung.", en: "Excuse me."}], correct: 0 }
];

const FinalExam = ({ onBack, language }) => {
  const [examState, setExamState] = useState('intro'); // intro, exam, result
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Stats & Tracking
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]); 
  const [categoryStats, setCategoryStats] = useState({
    kana: { correct: 0, total: 0 },
    kanji: { correct: 0, total: 0 },
    particle: { correct: 0, total: 0 },
    radar: { correct: 0, total: 0 }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [examState, currentIndex]);

  const texts = {
    de: {
      back: "Zurück",
      introTitle: "Die Abschluss-Prüfung",
      introSub: "Der ultimative Stresstest",
      introDesc: "30 zufällige Fragen aus einem riesigen Pool. Komplexe Laute, N5-Kanjis, Partikel-Matrix und vor allem pures Audio-Hörverstehen (Radar). Kein Romaji. Fast kein Deutsch. Überlebe!",
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
      btnHome: "Zurück zum Dashboard",
      btnRetry: "Prüfung wiederholen",
      catKana: "Kana-Matrix (Erweitert)",
      catKanji: "N5 Kanji (Bedeutung & Lesung)",
      catParticle: "Partikel-Code",
      catRadar: "Radar (Audio & Dialoge)",
      evalPerfect: "Hervorragend! Dieses Gebiet sitzt blind im Langzeitgedächtnis.",
      evalGood: "Solide Leistung, aber im Ernstfall noch etwas langsam. Dranbleiben!",
      evalCritical: "Kritisch! Du bist hier ein leichtes Ziel. Unbedingt diese Phase wiederholen!"
    },
    en: {
      back: "Back",
      introTitle: "Final Exam",
      introSub: "The Ultimate Stress Test",
      introDesc: "30 random questions from a massive pool. Complex sounds, N5 Kanjis, Particle Matrix and pure audio listening comprehension (Radar). No Romaji. Survive!",
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
      btnHome: "Back to Dashboard",
      btnRetry: "Retry Exam",
      catKana: "Kana Matrix (Advanced)",
      catKanji: "N5 Kanji (Meaning & Reading)",
      catParticle: "Particle Code",
      catRadar: "Radar (Audio & Dialogues)",
      evalPerfect: "Excellent! This area is completely locked in your long-term memory.",
      evalGood: "Solid performance, but might be too slow in real situations. Keep practicing!",
      evalCritical: "Critical! You are an easy target here. You must repeat this phase!"
    }
  };

  const t = texts[language] || texts.de;

  const playAudio = (text) => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/([^{]+){([^}]+)}/g, "$1");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- ABSICHERUNG: Fallback falls ein Element leer ist ---
  const getOptionText = (opt) => {
    if (!opt) return "Unbekannt / Fehler";
    return typeof opt === 'string' ? opt : (opt[language] || opt.de);
  };

  const startExam = () => {
    // Fisher-Yates nutzen statt Math.random()!
    const shuffledPool = shuffleArray(masterPool);
    
    const selected = shuffledPool.slice(0, 30).map(q => {
      const correctOptObj = q.options[q.correct];
      const shuffledOptions = shuffleArray(q.options);
      let newCorrectIndex = shuffledOptions.indexOf(correctOptObj);
      
      // Fallback: Falls der Index extrem unwahrscheinlich doch auf -1 springt, crasht es nicht
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
      kana: { correct: 0, total: 0 },
      kanji: { correct: 0, total: 0 },
      particle: { correct: 0, total: 0 },
      radar: { correct: 0, total: 0 }
    });
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setExamState('exam');
  };

  const handleSelectOption = (idx) => {
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const currentQ = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQ.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      const questionPrompt = currentQ.audioText 
        ? `🎧 (Audio: ${currentQ.audioText})` 
        : (currentQ.q[language] || currentQ.q.de);

      // Sicherstellen, dass auch bei fehlerhaftem Index immer ein Fallback geladen wird
      const correctChoiceObj = currentQ.options[currentQ.correct] || currentQ.options[0];
      const userChoiceObj = currentQ.options[selectedAnswer] || "N/A";

      setWrongAnswers(prev => [...prev, {
        questionText: questionPrompt,
        userChoice: getOptionText(userChoiceObj),
        correctChoice: getOptionText(correctChoiceObj)
      }]);
    }
    
    setCategoryStats(prev => ({
      ...prev,
      [currentQ.category]: {
        correct: prev[currentQ.category].correct + (isCorrect ? 1 : 0),
        total: prev[currentQ.category].total + 1
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

  if (examState === 'intro') {
    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto">
        <div className="absolute top-6 left-6 z-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors active:scale-95">
            &larr; {t.back}
          </button>
        </div>
        
        <div className="mt-20 flex flex-col items-center max-w-sm text-center animate-fade-in">
          <div className="w-24 h-24 bg-red-900/30 rounded-full border-2 border-red-500 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)] mb-6">
            <span className="text-5xl">⛩️</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-widest text-red-500 uppercase mb-2">{t.introTitle}</h1>
          <h2 className="text-gray-300 font-bold uppercase tracking-widest mb-6">{t.introSub}</h2>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-12 border-l-2 border-red-500/50 pl-4 text-left">
            {t.introDesc}
          </p>
          
          <button onClick={startExam} className="w-full py-5 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 rounded-xl font-bold text-white text-lg tracking-widest uppercase shadow-lg shadow-red-500/20 active:scale-95 transition-all">
            {t.startBtn}
          </button>
        </div>
      </div>
    );
  }

  if (examState === 'exam') {
    const q = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    
    const catColors = {
      kana: "text-blue-400 border-blue-500/50 bg-blue-900/20",
      kanji: "text-purple-400 border-purple-500/50 bg-purple-900/20",
      particle: "text-orange-400 border-orange-500/50 bg-orange-900/20",
      radar: "text-green-400 border-green-500/50 bg-green-900/20"
    };
    
    const catLabels = {
      kana: "KANA", kanji: "KANJI", particle: "PARTICLE", radar: "RADAR"
    };

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-800">
          <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${((currentIndex) / 30) * 100}%` }}></div>
        </div>

        <div className="w-full max-w-sm flex justify-between items-center mt-6 mb-8">
          <button onClick={onBack} className="text-gray-500 text-xs uppercase font-bold tracking-widest hover:text-white">
            X Abbrechen
          </button>
          <span className="text-gray-400 text-xs font-bold tracking-widest">
            {t.question} {currentIndex + 1} / 30
          </span>
        </div>

        <div className="w-full max-w-sm flex flex-col animate-fade-in flex-1">
          
          <div className="flex justify-center mb-6">
            <span className={`text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border ${catColors[q.category]}`}>
              {catLabels[q.category]}
            </span>
          </div>

          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-8 min-h-[160px] flex flex-col items-center justify-center text-center">
            
            {q.audioText && (
              <button 
                onClick={() => playAudio(q.audioText)}
                className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto hover:bg-blue-600/40 active:scale-95 transition-all shadow-lg shadow-blue-500/10 border border-blue-500/50"
              >
                🔊
              </button>
            )}

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {q.q[language] || q.q.de}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const btnClass = isSelected 
                ? "bg-cyan-900/50 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]" 
                : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-750 hover:border-gray-500";

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-5 rounded-xl border-2 font-bold text-lg transition-all ${btnClass}`}
                >
                  {getOptionText(opt)}
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto pb-6">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full py-5 rounded-xl font-bold text-white text-lg tracking-widest uppercase transition-all shadow-lg active:scale-95 ${
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

  if (examState === 'result') {
    const percentage = Math.round((score / 30) * 100);
    const rankInfo = getRank(percentage);

    return (
      <div className="flex-1 bg-gray-900 flex flex-col items-center p-6 text-white min-h-screen relative overflow-y-auto scrollbar-hide">
        
        <div className="mt-8 mb-8 flex flex-col items-center w-full max-w-md text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6">{t.resultsTitle}</h1>
          
          <div className="w-full bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden mb-8">
            <div className={`absolute top-0 left-0 w-full h-2 ${percentage >= 75 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{t.totalScore}</p>
            <div className="text-6xl font-extrabold text-white mb-6">
              {score}<span className="text-2xl text-gray-500">/30</span>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t.rank}</p>
              <h2 className={`text-3xl font-extrabold tracking-wider ${rankInfo.color}`}>{rankInfo.title}</h2>
              <p className="text-sm text-gray-300 italic mt-1">{rankInfo.desc}</p>
            </div>
          </div>

          <div className="w-full text-left">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>📊</span> {t.recommendations}
            </h3>
            
            <div className="space-y-4 mb-10">
              {/* Kana Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-blue-400">{t.catKana}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.kana.correct}/{categoryStats.kana.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${categoryStats.kana.total > 0 ? (categoryStats.kana.correct / categoryStats.kana.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.kana.correct, categoryStats.kana.total)}</p>
              </div>

              {/* Kanji Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-purple-400">{t.catKanji}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.kanji.correct}/{categoryStats.kanji.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${categoryStats.kanji.total > 0 ? (categoryStats.kanji.correct / categoryStats.kanji.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.kanji.correct, categoryStats.kanji.total)}</p>
              </div>

              {/* Particle Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-orange-400">{t.catParticle}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.particle.correct}/{categoryStats.particle.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${categoryStats.particle.total > 0 ? (categoryStats.particle.correct / categoryStats.particle.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.particle.correct, categoryStats.particle.total)}</p>
              </div>

              {/* Radar Stats */}
              <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-green-400">{t.catRadar}</span>
                  <span className="text-sm font-bold text-gray-400">{categoryStats.radar.correct}/{categoryStats.radar.total}</span>
                </div>
                <div className="w-full bg-gray-900 h-1.5 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${categoryStats.radar.total > 0 ? (categoryStats.radar.correct / categoryStats.radar.total) * 100 : 0}%` }}></div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{getRecommendation(categoryStats.radar.correct, categoryStats.radar.total)}</p>
              </div>
            </div>

            {/* Fehler-Protokoll */}
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <span>⚠️</span> {t.errorLogTitle}
            </h3>
            
            <div className="space-y-4 mb-12">
              {wrongAnswers.length === 0 ? (
                <div className="bg-green-900/30 p-5 rounded-2xl border border-green-500/50 text-center">
                  <p className="text-green-400 font-bold">{t.errorLogEmpty}</p>
                </div>
              ) : (
                wrongAnswers.map((err, i) => (
                  <div key={i} className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
                    <p className="text-white font-bold mb-3 border-b border-gray-700 pb-2">{err.questionText}</p>
                    <div className="flex flex-col gap-2">
                      <div className="bg-red-900/20 p-2 rounded-lg border border-red-500/30">
                        <span className="text-xs text-red-400 uppercase tracking-widest block mb-1">{t.yourAnswer}</span>
                        <span className="text-red-300 font-bold">{err.userChoice}</span>
                      </div>
                      <div className="bg-green-900/20 p-2 rounded-lg border border-green-500/30">
                        <span className="text-xs text-green-400 uppercase tracking-widest block mb-1">{t.correctAnswer}</span>
                        <span className="text-green-300 font-bold">{err.correctChoice}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-4 pb-12">
              <button onClick={startExam} className="w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl font-bold text-white tracking-widest uppercase transition-colors active:scale-95">
                {t.btnRetry}
              </button>
              <button onClick={onBack} className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/20 rounded-xl font-bold text-white tracking-widest uppercase transition-all active:scale-95">
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