export const deKompositaData = {
    1: {
      day: 1,
      title: "Grundwort-Prinzip (Rechtsregel & Genus)",
      rule: "ドイツ語の複合名詞は、一番最後に位置する名詞（Grundwort / 基底語）が全体の文法上の性（der/die/das）と本質的な意味を100%決定する。",
      cards: [
        {
          word: "der Hauptbahnhof",
          gender: "der",
          decomposition: "Haupt + Bahn + Hof",
          headWord: "der Hof (庭・ステーション)",
          elements: [
            { part: "Haupt", meaning: "主要な・メインの" },
            { part: "Bahn", meaning: "鉄道" },
            { part: "Hof", meaning: "駅・広場（男性名詞）" }
          ],
          meaning: "中央駅",
          sentence: "Wir treffen uns am Hauptbahnhof.",
          sentenceTranslation: "中央駅で会いましょう。"
        },
        {
          word: "die Fahrkarte",
          gender: "die",
          decomposition: "Fahr + Karte",
          headWord: "die Karte (カード・切符)",
          elements: [
            { part: "Fahr", meaning: "乗車・走行" },
            { part: "Karte", meaning: "切符・カード（女性名詞）" }
          ],
          meaning: "乗車券・切符",
          sentence: "Haben Sie eine gültige Fahrkarte?",
          sentenceTranslation: "有効な乗車券はお持ちですか？"
        },
        {
          word: "das Hotelzimmer",
          gender: "das",
          decomposition: "Hotel + Zimmer",
          headWord: "das Zimmer (部屋)",
          elements: [
            { part: "Hotel", meaning: "ホテル" },
            { part: "Zimmer", meaning: "部屋（中性名詞）" }
          ],
          meaning: "ホテルの客室",
          sentence: "Das Hotelzimmer ist sehr ruhig.",
          sentenceTranslation: "そのホテルの部屋はとても静かです。"
        },
        {
          word: "der Notarzt",
          gender: "der",
          decomposition: "Not + Arzt",
          headWord: "der Arzt (医師)",
          elements: [
            { part: "Not", meaning: "緊急・救急" },
            { part: "Arzt", meaning: "医師（男性名詞）" }
          ],
          meaning: "救急救命医",
          sentence: "Rufen Sie sofort den Notarzt!",
          sentenceTranslation: "すぐに救急医を呼んでください！"
        },
        {
          word: "die Bushaltestelle",
          gender: "die",
          decomposition: "Bus + Halte + Stelle",
          headWord: "die Stelle (場所・地点)",
          elements: [
            { part: "Bus", meaning: "バス" },
            { part: "Halte", meaning: "停止" },
            { part: "Stelle", meaning: "場所（女性名詞）" }
          ],
          meaning: "バス停留所",
          sentence: "Wo ist die nächste Bushaltestelle?",
          sentenceTranslation: "最寄りのバス停はどこですか？"
        }
      ]
    },
    2: {
      day: 2,
      title: "Fugen-S (接続要素 -s- の結合メカニズム)",
      rule: "前部名詞が -ung, -heit, -keit, -schaft, -tät で終わる場合、発音上の橋渡しとして必ず「-s-」が挿入される。",
      cards: [
        {
          word: "die Verspätungsbescheinigung",
          gender: "die",
          decomposition: "Verspätung + s + Bescheinigung",
          headWord: "die Bescheinigung (証明書)",
          elements: [
            { part: "Verspätung", meaning: "遅延 (-ung)" },
            { part: "-s-", meaning: "結合要素（Fugen-S）" },
            { part: "Bescheinigung", meaning: "証明書（女性名詞）" }
          ],
          meaning: "遅延証明書",
          sentence: "Ich brauche eine Verspätungsbescheinigung für die Arbeit.",
          sentenceTranslation: "職場への提出用に遅延証明書が必要です。"
        },
        {
          word: "das Abfahrtssignal",
          gender: "das",
          decomposition: "Abfahrt + s + Signal",
          headWord: "das Signal (合図・信号)",
          elements: [
            { part: "Abfahrt", meaning: "出発 (-t)" },
            { part: "-s-", meaning: "結合要素（Fugen-S）" },
            { part: "Signal", meaning: "信号・合図（中性名詞）" }
          ],
          meaning: "発車合図・出発信号",
          sentence: "Der Zug wartet auf das Abfahrtssignal.",
          sentenceTranslation: "列車は発車合図を待っています。"
        },
        {
          word: "der Auskunftsbeamte",
          gender: "der",
          decomposition: "Auskunft + s + Beamte",
          headWord: "der Beamte (係員・公務員)",
          elements: [
            { part: "Auskunft", meaning: "案内・情報 (-t)" },
            { part: "-s-", meaning: "結合要素（Fugen-S）" },
            { part: "Beamte", meaning: "係員（男性名詞）" }
          ],
          meaning: "案内所係員",
          sentence: "Fragen Sie den Auskunftsbeamten am Schalter.",
          sentenceTranslation: "窓口の案内係員にお尋ねください。"
        },
        {
          word: "die Rettungsstelle",
          gender: "die",
          decomposition: "Rettung + s + Stelle",
          headWord: "die Stelle (窓口・救護所)",
          elements: [
            { part: "Rettung", meaning: "救助 (-ung)" },
            { part: "-s-", meaning: "結合要素（Fugen-S）" },
            { part: "Stelle", meaning: "場所（女性名詞）" }
          ],
          meaning: "救急救護室・救急外来",
          sentence: "Die Rettungsstelle ist rund um die Uhr geöffnet.",
          sentenceTranslation: "救急救護所は24時間対応しています。"
        },
        {
          word: "der Sicherheitsdienst",
          gender: "der",
          decomposition: "Sicherheit + s + Dienst",
          headWord: "der Dienst (業務・部隊)",
          elements: [
            { part: "Sicherheit", meaning: "警備・保安 (-heit)" },
            { part: "-s-", meaning: "結合要素（Fugen-S）" },
            { part: "Dienst", meaning: "業務・隊（男性名詞）" }
          ],
          meaning: "警備隊・保安要員",
          sentence: "Der Sicherheitsdienst kontrolliert die Bahnsteige.",
          sentenceTranslation: "警備員がプラットホームを巡回警備しています。"
        }
      ]
    },
    3: {
      day: 3,
      title: "Fugen-(e)n (弱変化名詞と複数形の結合)",
      rule: "女性名詞や弱変化名詞が前部に来る場合、複数形に由来する「-(e)n」が挟まって結合する。",
      cards: [
        {
          word: "der Studentenausweis",
          gender: "der",
          decomposition: "Student + en + Ausweis",
          headWord: "der Ausweis (証明書)",
          elements: [
            { part: "Student", meaning: "学生（弱変化）" },
            { part: "-en-", meaning: "結合要素（Fugen-N）" },
            { part: "Ausweis", meaning: "証明書（男性名詞）" }
          ],
          meaning: "学生証",
          sentence: "Mit dem Studentenausweis bekommen Sie Rabatt.",
          sentenceTranslation: "学生証の提示で割引が適用されます。"
        },
        {
          word: "die Straßenbahn",
          gender: "die",
          decomposition: "Straße + n + Bahn",
          headWord: "die Bahn (鉄道・路面電車)",
          elements: [
            { part: "Straße", meaning: "道路・通り" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Bahn", meaning: "鉄道（女性名詞）" }
          ],
          meaning: "路面電車（トラム）",
          sentence: "Die Straßenbahnlinie 4 fährt ins Zentrum.",
          sentenceTranslation: "路面電車4号線は中心街へ向かいます。"
        },
        {
          word: "das Taschentuch",
          gender: "das",
          decomposition: "Tasche + n + Tuch",
          headWord: "das Tuch (布・ハンカチ)",
          elements: [
            { part: "Tasche", meaning: "ポケット・かばん" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Tuch", meaning: "布（中性名詞）" }
          ],
          meaning: "ポケットティッシュ・ハンカチ",
          sentence: "Haben Sie ein Taschentuch für mich?",
          sentenceTranslation: "ティッシュを1枚お持ちですか？"
        },
        {
          word: "die Krankenkasse",
          gender: "die",
          decomposition: "Kranke + n + Kasse",
          headWord: "die Kasse (金庫・保険組合)",
          elements: [
            { part: "Kranke", meaning: "病気・病人" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Kasse", meaning: "基金（女性名詞）" }
          ],
          meaning: "公的健康保険組合",
          sentence: "Welche Krankenkasse übernimmt die Behandlung?",
          sentenceTranslation: "どの保険組合が治療費を負担しますか？"
        },
        {
          word: "der Kundenservice",
          gender: "der",
          decomposition: "Kunde + n + Service",
          headWord: "der Service (窓口・サービス)",
          elements: [
            { part: "Kunde", meaning: "顧客" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Service", meaning: "窓口（男性名詞）" }
          ],
          meaning: "カスタマーサービス・顧客対応窓口",
          sentence: "Wenden Sie sich bitte an den Kundenservice.",
          sentenceTranslation: "カスタマーサービス窓口へご相談ください。"
        }
      ]
    },
    4: {
      day: 4,
      title: "交通インフラ・切符と改札 (Bahnbetrieb)",
      rule: "ドイツ鉄道の重要用語は3語以上が合体した複合名詞が多い。後方から解体して核を掴む。",
      cards: [
        {
          word: "der Fahrkartenentwerter",
          gender: "der",
          decomposition: "Fahr + Karte + n + Entwerter",
          headWord: "der Entwerter (打刻機・無効化機)",
          elements: [
            { part: "Fahrkarte", meaning: "乗車券" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Entwerter", meaning: "打刻機（男性名詞）" }
          ],
          meaning: "乗車券打刻機（スタンプ機）",
          sentence: "Der Fahrkartenentwerter steht direkt auf dem Bahnsteig.",
          sentenceTranslation: "乗車券打刻機はプラットホーム上に直接設置されています。"
        },
        {
          word: "der Schienenersatzverkehr",
          gender: "der",
          decomposition: "Schiene + n + Ersatz + Verkehr",
          headWord: "der Verkehr (交通・運行)",
          elements: [
            { part: "Schiene", meaning: "線路・レール" },
            { part: "Ersatz", meaning: "代替" },
            { part: "Verkehr", meaning: "交通（男性名詞）" }
          ],
          meaning: "線路代替交通（代行バス輸送）",
          sentence: "Wegen Bauarbeiten gibt es heute Schienenersatzverkehr.",
          sentenceTranslation: "工事のため、本日は代行バス輸送が実施されています。"
        },
        {
          word: "der Bahnsteigabschnitt",
          gender: "der",
          decomposition: "Bahn + Steig + Abschnitt",
          headWord: "der Abschnitt (区画・セクション)",
          elements: [
            { part: "Bahnsteig", meaning: "プラットホーム" },
            { part: "Abschnitt", meaning: "区分（男性名詞）" }
          ],
          meaning: "ホーム乗車位置区画（A〜Eゾーン）",
          sentence: "Wagen 5 hält in Bahnsteigabschnitt C.",
          sentenceTranslation: "5号車はホームのC区画に停車します。"
        },
        {
          word: "die Sitzplatzreservierung",
          gender: "die",
          decomposition: "Sitz + Platz + Reservierung",
          headWord: "die Reservierung (予約)",
          elements: [
            { part: "Sitzplatz", meaning: "座席" },
            { part: "Reservierung", meaning: "予約（女性名詞）" }
          ],
          meaning: "指定席券・座席指定予約",
          sentence: "Eine Sitzplatzreservierung wird im ICE dringend empfohlen.",
          sentenceTranslation: "ICE特急では指定席予約が強く推奨されます。"
        },
        {
          word: "das Zugbegleitpersonal",
          gender: "das",
          decomposition: "Zug + Begleit + Personal",
          headWord: "das Personal (乗務員・職員)",
          elements: [
            { part: "Zug", meaning: "列車" },
            { part: "Begleit", meaning: "同乗・案内" },
            { part: "Personal", meaning: "要員（中性名詞）" }
          ],
          meaning: "車掌・車内乗務員チーム",
          sentence: "Bei Fragen wenden Sie sich an das Zugbegleitpersonal.",
          sentenceTranslation: "ご不明な点は車掌・乗務員にお尋ねください。"
        }
      ]
    },
    5: {
      day: 5,
      title: "駅構内・設備案内 (Bahnhofsgebäude)",
      rule: "建物の施設名詞は「用途 (Verb/Nomen) + 部屋/場所 (Zimmer/Stelle/Raum)」の定型パターンで成立する。",
      cards: [
        {
          word: "der Warteraum",
          gender: "der",
          decomposition: "Warte + Raum",
          headWord: "der Raum (部屋・空間)",
          elements: [
            { part: "Warte", meaning: "待機する (warten)" },
            { part: "Raum", meaning: "部屋（男性名詞）" }
          ],
          meaning: "待合室",
          sentence: "Im Winter ist der Warteraum beheizt.",
          sentenceTranslation: "冬期は待合室に暖房が入ります。"
        },
        {
          word: "das Fundbüro",
          gender: "das",
          decomposition: "Fund + Büro",
          headWord: "das Büro (事務所・オフィス)",
          elements: [
            { part: "Fund", meaning: "拾得・発見 (finden)" },
            { part: "Büro", meaning: "事務室（中性名詞）" }
          ],
          meaning: "遺失物取扱所（お忘れ物預かり所）",
          sentence: "Verlorene Gegenstände werden an das Fundbüro übergeben.",
          sentenceTranslation: "紛失物は遺失物取扱所へ届けられます。"
        },
        {
          word: "die Gepäckaufbewahrung",
          gender: "die",
          decomposition: "Gepäck + Aufbewahrung",
          headWord: "die Aufbewahrung (保管)",
          elements: [
            { part: "Gepäck", meaning: "手荷物" },
            { part: "Aufbewahrung", meaning: "預かり（女性名詞）" }
          ],
          meaning: "手荷物預かり所",
          sentence: "Gibt es hier am Bahnhof eine Gepäckaufbewahrung?",
          sentenceTranslation: "この駅に手荷物預かり所はありますか？"
        },
        {
          word: "das Schließfach",
          gender: "das",
          decomposition: "Schließ + Fach",
          headWord: "das Fach (仕切り・ボックス)",
          elements: [
            { part: "Schließ", meaning: "施錠する (schließen)" },
            { part: "Fach", meaning: "ロッカー・小箱（中性名詞）" }
          ],
          meaning: "コインロッカー",
          sentence: "Ich schließe meinen Koffer in ein Schließfach ein.",
          sentenceTranslation: "スーツケースをコインロッカーに預けます。"
        },
        {
          word: "der Fahrkartenschalter",
          gender: "der",
          decomposition: "Fahrkarte + n + Schalter",
          headWord: "der Schalter (窓口)",
          elements: [
            { part: "Fahrkarte", meaning: "切符" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Schalter", meaning: "窓口（男性名詞）" }
          ],
          meaning: "切符売り場窓口",
          sentence: "Am Fahrkartenschalter war eine lange Schlange.",
          sentenceTranslation: "切符売り場窓口には長い列ができていました。"
        }
      ]
    },
    6: {
      day: 6,
      title: "スーパー・買い物と容器デポジット (Einkauf & Pfand)",
      rule: "日常購買用語は合成の核となる目的語が最後にあり、手前の単語が包装・種類・条件を修飾する。",
      cards: [
        {
          word: "der Pfandautomat",
          gender: "der",
          decomposition: "Pfand + Automat",
          headWord: "der Automat (自動機)",
          elements: [
            { part: "Pfand", meaning: "保証金・デポジット" },
            { part: "Automat", meaning: "自動機（男性名詞）" }
          ],
          meaning: "空き瓶・ペットボトル自動回収機",
          sentence: "Der Pfandautomat nimmt diese Einwegflasche nicht an.",
          sentenceTranslation: "この回収機はこの使い捨てペットボトルを受け付けません。"
        },
        {
          word: "der Kassenbon",
          gender: "der",
          decomposition: "Kasse + n + Bon",
          headWord: "der Bon (伝票・受領票)",
          elements: [
            { part: "Kasse", meaning: "レジ会計" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Bon", meaning: "レシート（男性名詞）" }
          ],
          meaning: "レシート・領収書",
          sentence: "Bitte bewahren Sie den Kassenbon gut auf.",
          sentenceTranslation: "レシートは大切に保管してください。"
        },
        {
          word: "der Warentrenner",
          gender: "der",
          decomposition: "Ware + n + Trenner",
          headWord: "der Trenner (仕切り具)",
          elements: [
            { part: "Ware", meaning: "商品" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Trenner", meaning: "分離バー（男性名詞）" }
          ],
          meaning: "レジのベルトコンベア仕切り棒",
          sentence: "Legen Sie bitte den Warentrenner hinter Ihren Einkauf.",
          sentenceTranslation: "お買い上げ商品の後ろに仕切り棒を置いてください。"
        },
        {
          word: "die Mehrwegflasche",
          gender: "die",
          decomposition: "Mehr + Weg + Flasche",
          headWord: "die Flasche (瓶・ボトル)",
          elements: [
            { part: "Mehrweg", meaning: "再利用・往復路" },
            { part: "Flasche", meaning: "瓶（女性名詞）" }
          ],
          meaning: "リターナブル瓶（返却再利用ボトル）",
          sentence: "Für eine Mehrwegflasche gibt es 8 oder 15 Cent Pfand.",
          sentenceTranslation: "リターナブル瓶には8セントまたは15セントの保証金がつきます。"
        },
        {
          word: "die Einkaufstasche",
          gender: "die",
          decomposition: "Einkauf + s + Tasche",
          headWord: "die Tasche (バッグ・袋)",
          elements: [
            { part: "Einkauf", meaning: "買い物" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Tasche", meaning: "袋（女性名詞）" }
          ],
          meaning: "エコバッグ・買い物袋",
          sentence: "Ich habe meine eigene Einkaufstasche dabei.",
          sentenceTranslation: "私は自分の買い物袋を持参しています。"
        }
      ]
    },
    7: {
      day: 7,
      title: "第1週ボス評価 (Woche 1 Review: Basis-Dekomposition)",
      rule: "第1週の総点検。未知の超長大単語に出会っても、語尾（Grundwort）を3秒以内に特定して性別を判定せよ。",
      cards: [
        {
          word: "die Bundespolizei",
          gender: "die",
          decomposition: "Bund + es + Polizei",
          headWord: "die Polizei (警察)",
          elements: [
            { part: "Bund", meaning: "連邦" },
            { part: "-es-", meaning: "属格結合" },
            { part: "Polizei", meaning: "警察（女性名詞）" }
          ],
          meaning: "連邦警察（駅・空港の警備管轄）",
          sentence: "Die Bundespolizei kontrolliert die Ausweise.",
          sentenceTranslation: "連邦警察が身分証の確認を行っています。"
        },
        {
          word: "der Personalausweis",
          gender: "der",
          decomposition: "Personal + Ausweis",
          headWord: "der Ausweis (証明書)",
          elements: [
            { part: "Personal", meaning: "個人の・人的な" },
            { part: "Ausweis", meaning: "身分証（男性名詞）" }
          ],
          meaning: "身分証明書（IDカード）",
          sentence: "Zeigen Sie mir bitte Ihren Personalausweis.",
          sentenceTranslation: "身分証明書を見せてください。"
        },
        {
          word: "die Notrufzentrale",
          gender: "die",
          decomposition: "Not + Ruf + Zentrale",
          headWord: "die Zentrale (司令センター)",
          elements: [
            { part: "Notruf", meaning: "緊急通報" },
            { part: "Zentrale", meaning: "司令本部（女性名詞）" }
          ],
          meaning: "緊急通報司令センター (112/110)",
          sentence: "Die Notrufzentrale fragt nach dem genauen Ort.",
          sentenceTranslation: "緊急指令センターが正確な現場位置を尋ねています。"
        },
        {
          word: "der Nahverkehrszug",
          gender: "der",
          decomposition: "Nah + Verkehr + s + Zug",
          headWord: "der Zug (列車)",
          elements: [
            { part: "Nahverkehr", meaning: "近郊交通" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Zug", meaning: "列車（男性名詞）" }
          ],
          meaning: "近郊普通列車（RE/RB）",
          sentence: "Dieses Ticket gilt nur im Nahverkehrszug.",
          sentenceTranslation: "この切符は近郊列車でのみ有効です。"
        },
        {
          word: "die Zahlungsbestätigung",
          gender: "die",
          decomposition: "Zahlung + s + Bestätigung",
          headWord: "die Bestätigung (確認・証明書)",
          elements: [
            { part: "Zahlung", meaning: "支払い (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Bestätigung", meaning: "証明書（女性名詞）" }
          ],
          meaning: "支払確認書・決済レシート",
          sentence: "Hier ist Ihre offizielle Zahlungsbestätigung.",
          sentenceTranslation: "こちらが公式の支払完了確認書です。"
        }
      ]
    },
    8: {
      day: 8,
      title: "対面販売・パン屋・飲食店 (Bäckerei & Gastronomie)",
      rule: "飲食店の商品は「主原料/製法 + 形態 (Brot/Kuchen/Brötchen)」で整然と組み立てられている。",
      cards: [
        {
          word: "das Vollkornbrot",
          gender: "das",
          decomposition: "Voll + Korn + Brot",
          headWord: "das Brot (パン)",
          elements: [
            { part: "Vollkorn", meaning: "全粒粉" },
            { part: "Brot", meaning: "パン（中性名詞）" }
          ],
          meaning: "全粒粉パン",
          sentence: "Ich nehme ein halbes Vollkornbrot.",
          sentenceTranslation: "全粒粉パンを半分（ハーフサイズ）ください。"
        },
        {
          word: "der Käsekuchen",
          gender: "der",
          decomposition: "Käse + Kuchen",
          headWord: "der Kuchen (ケーキ)",
          elements: [
            { part: "Käse", meaning: "チーズ" },
            { part: "Kuchen", meaning: "ケーキ（男性名詞）" }
          ],
          meaning: "チーズケーキ（クワルク使用）",
          sentence: "Ein Stück Käsekuchen zum Mitnehmen, bitte.",
          sentenceTranslation: "チーズケーキを1切れテイクアウトでお願いします。"
        },
        {
          word: "das Mineralwasser",
          gender: "das",
          decomposition: "Mineral + Wasser",
          headWord: "das Wasser (水)",
          elements: [
            { part: "Mineral", meaning: "ミネラル" },
            { part: "Wasser", meaning: "水（中性名詞）" }
          ],
          meaning: "ミネラルウォーター（炭酸入りが標準）",
          sentence: "Eine Flasche Mineralwasser ohne Kohlensäure, bitte.",
          sentenceTranslation: "炭酸なしのミネラルウォーターを1本ください。"
        },
        {
          word: "der Beistellbeleg",
          gender: "der",
          decomposition: "Bei + Stell + Beleg",
          headWord: "der Beleg (伝票・受領証)",
          elements: [
            { part: "Beistell", meaning: "添え置き" },
            { part: "Beleg", meaning: "明細伝票（男性名詞）" }
          ],
          meaning: "レシート控え・会計伝票",
          sentence: "Brauchen Sie den Beistellbeleg für die Buchhaltung?",
          sentenceTranslation: "経理用に領収控えは必要ですか？"
        },
        {
          word: "die Mittagsmenükarte",
          gender: "die",
          decomposition: "Mittag + s + Menü + Karte",
          headWord: "die Karte (メニュー表)",
          elements: [
            { part: "Mittag", meaning: "昼 (-s-)" },
            { part: "Menü", meaning: "定食・コース" },
            { part: "Karte", meaning: "メニュー（女性名詞）" }
          ],
          meaning: "ランチメニュー表",
          sentence: "Können wir bitte die Mittagsmenükarte sehen?",
          sentenceTranslation: "ランチメニューを見せていただけますか？"
        }
      ]
    },
    9: {
      day: 9,
      title: "医療・薬局と医薬品分類 (Apotheke & Arznei)",
      rule: "医療名詞は「対象部位/症状 + 解決手段 (Mittel/Tropfen/Salbe)」で分類される。",
      cards: [
        {
          word: "das Schmerzmittel",
          gender: "das",
          decomposition: "Schmerz + Mittel",
          headWord: "das Mittel (手段・薬剤)",
          elements: [
            { part: "Schmerz", meaning: "痛み" },
            { part: "Mittel", meaning: "薬品・手段（中性名詞）" }
          ],
          meaning: "鎮痛剤・痛み止め",
          sentence: "Haben Sie ein magenfreundliches Schmerzmittel?",
          sentenceTranslation: "胃に優しい鎮痛剤はありますか？"
        },
        {
          word: "der Hustensaft",
          gender: "der",
          decomposition: "Husten + Saft",
          headWord: "der Saft (エキス・シロップ)",
          elements: [
            { part: "Husten", meaning: "咳" },
            { part: "Saft", meaning: "シロップ（男性名詞）" }
          ],
          meaning: "咳止めシロップ",
          sentence: "Nehmen Sie den Hustensaft vor dem Schlafen.",
          sentenceTranslation: "就寝前に咳止めシロップを服用してください。"
        },
        {
          word: "die Halstablette",
          gender: "die",
          decomposition: "Hals + Tablette",
          headWord: "die Tablette (錠剤)",
          elements: [
            { part: "Hals", meaning: "喉・首" },
            { part: "Tablette", meaning: "錠剤（女性名詞）" }
          ],
          meaning: "喉のトローチ・喉用錠剤",
          sentence: "Diese Halstabletten lindern die Entzündung.",
          sentenceTranslation: "このトローチが喉の炎症を抑えます。"
        },
        {
          word: "das Nasenspray",
          gender: "das",
          decomposition: "Nase + n + Spray",
          headWord: "das Spray (スプレー噴霧薬)",
          elements: [
            { part: "Nase", meaning: "鼻" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Spray", meaning: "スプレー（中性名詞）" }
          ],
          meaning: "点鼻薬・点鼻スプレー",
          sentence: "Verwenden Sie das Nasenspray maximal eine Woche.",
          sentenceTranslation: "点鼻スプレーの使用は最長1週間までにしてください。"
        },
        {
          word: "die Wundsalbe",
          gender: "die",
          decomposition: "Wund + Salbe",
          headWord: "die Salbe (軟膏・塗り薬)",
          elements: [
            { part: "Wunde", meaning: "傷口" },
            { part: "Salbe", meaning: "軟膏（女性名詞）" }
          ],
          meaning: "傷薬軟膏・キズ軟膏",
          sentence: "Tragen Sie die Wundsalbe dünn auf die Haut auf.",
          sentenceTranslation: "軟膏を皮膚に薄く塗布してください。"
        }
      ]
    },
    10: {
      day: 10,
      title: "身体部位と症状の複合名詞 (Symptome & Schmerzen)",
      rule: "身体の痛みは「解剖部位 + -schmerzen（常に複数扱い）」で1単語として合成される。",
      cards: [
        {
          word: "die Kopfschmerzen",
          gender: "die (Plural)",
          decomposition: "Kopf + Schmerzen",
          headWord: "die Schmerzen (痛み・複数)",
          elements: [
            { part: "Kopf", meaning: "頭" },
            { part: "Schmerzen", meaning: "痛み（複数形）" }
          ],
          meaning: "頭痛",
          sentence: "Ich leide seit heute Früh an starken Kopfschmerzen.",
          sentenceTranslation: "今朝から激しい頭痛に悩まされています。"
        },
        {
          word: "die Magenschmerzen",
          gender: "die (Plural)",
          decomposition: "Magen + Schmerzen",
          headWord: "die Schmerzen (痛み・複数)",
          elements: [
            { part: "Magen", meaning: "胃" },
            { part: "Schmerzen", meaning: "痛み（複数形）" }
          ],
          meaning: "胃痛",
          sentence: "Haben Sie etwas gegen Magenschmerzen?",
          sentenceTranslation: "胃痛に効く薬はありますか？"
        },
        {
          word: "die Halsschmerzen",
          gender: "die (Plural)",
          decomposition: "Hals + Schmerzen",
          headWord: "die Schmerzen (痛み・複数)",
          elements: [
            { part: "Hals", meaning: "喉" },
            { part: "Schmerzen", meaning: "痛み（複数形）" }
          ],
          meaning: "喉の痛み",
          sentence: "Beim Schlucken habe ich starke Halsschmerzen.",
          sentenceTranslation: "飲み込む時に喉に強い痛みがあります。"
        },
        {
          word: "die Zahnschmerzen",
          gender: "die (Plural)",
          decomposition: "Zahn + Schmerzen",
          headWord: "die Schmerzen (痛み・複数)",
          elements: [
            { part: "Zahn", meaning: "歯" },
            { part: "Schmerzen", meaning: "痛み（複数形）" }
          ],
          meaning: "歯痛",
          sentence: "Ich brauche wegen Zahnschmerzen sofort einen Zahnarzt.",
          sentenceTranslation: "歯痛のため至急歯医者にかかる必要があります。"
        },
        {
          word: "die Rückenschmerzen",
          gender: "die (Plural)",
          decomposition: "Rücken + Schmerzen",
          headWord: "die Schmerzen (痛み・複数)",
          elements: [
            { part: "Rücken", meaning: "背中・腰" },
            { part: "Schmerzen", meaning: "痛み（複数形）" }
          ],
          meaning: "腰痛・背中の痛み",
          sentence: "Langes Sitzen verursacht schwere Rückenschmerzen.",
          sentenceTranslation: "長時間の着席が重い腰痛を引き起こします。"
        }
      ]
    },
    11: {
      day: 11,
      title: "ホテル・宿泊施設と設備トラブル (Hotelbetrieb)",
      rule: "ホテルの設備不具合申告は「対象設備名詞 + -störung / -ausfall」または「設備 + funktioniert nicht」で構成。",
      cards: [
        {
          word: "die Klimaanlage",
          gender: "die",
          decomposition: "Klima + Anlage",
          headWord: "die Anlage (設備・プラント)",
          elements: [
            { part: "Klima", meaning: "空調・気候" },
            { part: "Anlage", meaning: "装置・設備（女性名詞）" }
          ],
          meaning: "エアコン・空調設備",
          sentence: "Die Klimaanlage in Zimmer 204 kühlt nicht.",
          sentenceTranslation: "204号室のエアコンが冷えません。"
        },
        {
          word: "der Zimmerschlüssel",
          gender: "der",
          decomposition: "Zimmer + Schlüssel",
          headWord: "der Schlüssel (鍵)",
          elements: [
            { part: "Zimmer", meaning: "部屋" },
            { part: "Schlüssel", meaning: "鍵（男性名詞）" }
          ],
          meaning: "部屋の鍵・ルームキー",
          sentence: "Ich habe meinen Zimmerschlüssel an der Rezeption abgegeben.",
          sentenceTranslation: "部屋の鍵をフロントに預けました。"
        },
        {
          word: "der Duschkopf",
          gender: "der",
          decomposition: "Dusch + Kopf",
          headWord: "der Kopf (ヘッド・頭部)",
          elements: [
            { part: "Dusche", meaning: "シャワー" },
            { part: "Kopf", meaning: "先端（男性名詞）" }
          ],
          meaning: "シャワーヘッド",
          sentence: "Der Duschkopf ist leider verkalkt und tropft.",
          sentenceTranslation: "シャワーヘッドに石灰が付着して水滴が垂れています。"
        },
        {
          word: "das Frühstücksbuffet",
          gender: "das",
          decomposition: "Frühstück + s + Buffet",
          headWord: "das Buffet (ビュッフェ)",
          elements: [
            { part: "Frühstück", meaning: "朝食 (-s-)" },
            { part: "Buffet", meaning: "ビュッフェ（中性名詞）" }
          ],
          meaning: "朝食ビュッフェ",
          sentence: "Das Frühstücksbuffet wird von 7 bis 10 Uhr serviert.",
          sentenceTranslation: "朝食ビュッフェは7時から10時まで提供されます。"
        },
        {
          word: "die Übernachtungssteuer",
          gender: "die",
          decomposition: "Übernachtung + s + Steuer",
          headWord: "die Steuer (税金)",
          elements: [
            { part: "Übernachtung", meaning: "宿泊 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Steuer", meaning: "税（女性名詞）" }
          ],
          meaning: "宿泊税（City Tax / 滞在税）",
          sentence: "Die Übernachtungssteuer ist nicht im Preis enthalten.",
          sentenceTranslation: "宿泊税は室料に含まれていません。"
        }
      ]
    },
    12: {
      day: 12,
      title: "都市移動・道路標識と歩行 (Stadtverkehr)",
      rule: "道案内の重要単語は「移動目的/対象 + 地点名詞 (Weg/Übergang/Kreuzung)」で成立。",
      cards: [
        {
          word: "der Fußgängerüberweg",
          gender: "der",
          decomposition: "Fußgänger + Über + Weg",
          headWord: "der Weg (道)",
          elements: [
            { part: "Fußgänger", meaning: "歩行者" },
            { part: "Überweg", meaning: "横断路（男性名詞）" }
          ],
          meaning: "横断歩道（ゼブラ帯）",
          sentence: "Autos müssen am Fußgängerüberweg halten.",
          sentenceTranslation: "車は横断歩道で一時停止しなければなりません。"
        },
        {
          word: "die Einbahnstraße",
          gender: "die",
          decomposition: "Ein + Bahn + Straße",
          headWord: "die Straße (通り・道路)",
          elements: [
            { part: "Einbahn", meaning: "一方向" },
            { part: "Straße", meaning: "道路（女性名詞）" }
          ],
          meaning: "一方通行道路",
          sentence: "Achtung, das ist eine Einbahnstraße!",
          sentenceTranslation: "注意してください、ここは一方通行です！"
        },
        {
          word: "die Fußgängerzone",
          gender: "die",
          decomposition: "Fußgänger + Zone",
          headWord: "die Zone (区域・ゾーン)",
          elements: [
            { part: "Fußgänger", meaning: "歩行者" },
            { part: "Zone", meaning: "地区（女性名詞）" }
          ],
          meaning: "歩行者天国・歩行者専用道路",
          sentence: "Radfahren ist in der Fußgängerzone verboten.",
          sentenceTranslation: "歩行者専用区域での自転車走行は禁止されています。"
        },
        {
          word: "die Fahrradspur",
          gender: "die",
          decomposition: "Fahrrad + Spur",
          headWord: "die Spur (車線・レーン)",
          elements: [
            { part: "Fahrrad", meaning: "自転車" },
            { part: "Spur", meaning: "レーン（女性名詞）" }
          ],
          meaning: "自転車専用レーン",
          sentence: "Bleiben Sie bitte nicht auf der Fahrradspur stehen.",
          sentenceTranslation: "自転車専用レーンの上で立ち止まらないでください。"
        },
        {
          word: "das Halteverbot",
          gender: "das",
          decomposition: "Halte + Verbot",
          headWord: "das Verbot (禁止)",
          elements: [
            { part: "Halte", meaning: "停車" },
            { part: "Verbot", meaning: "禁止（中性名詞）" }
          ],
          meaning: "駐停車禁止",
          sentence: "Hier gilt absolutes Halteverbot.",
          sentenceTranslation: "ここは完全な駐停車禁止区域です。"
        }
      ]
    },
    13: {
      day: 13,
      title: "金融・銀行と決済手段 (Zahlungsverkehr)",
      rule: "お金関連の単語は「決済対象/手段 + 媒体 (Karte/Konto/Automat)」の連動。",
      cards: [
        {
          word: "der Geldautomat",
          gender: "der",
          decomposition: "Geld + Automat",
          headWord: "der Automat (ATM・自動機)",
          elements: [
            { part: "Geld", meaning: "お金" },
            { part: "Automat", meaning: "機械（男性名詞）" }
          ],
          meaning: "現金自動預払機（ATM）",
          sentence: "Der Geldautomat spuckt kein Bargeld aus.",
          sentenceTranslation: "ATMから現金が出てきません。"
        },
        {
          word: "die Kreditkarte",
          gender: "die",
          decomposition: "Kredit + Karte",
          headWord: "die Karte (カード)",
          elements: [
            { part: "Kredit", meaning: "信用・クレジット" },
            { part: "Karte", meaning: "カード（女性名詞）" }
          ],
          meaning: "クレジットカード",
          sentence: "Wird hier jede gängige Kreditkarte akzeptiert?",
          sentenceTranslation: "ここでは主要なクレジットカードは全て使えますか？"
        },
        {
          word: "das Girokonto",
          gender: "das",
          decomposition: "Giro + Konto",
          headWord: "das Konto (口座)",
          elements: [
            { part: "Giro", meaning: "決済・振替" },
            { part: "Konto", meaning: "口座（中性名詞）" }
          ],
          meaning: "普通預金口座・当座決済口座",
          sentence: "Ich möchte ein Girokonto eröffnen.",
          sentenceTranslation: "普通預金口座を開設したいです。"
        },
        {
          word: "die Barzahlung",
          gender: "die",
          decomposition: "Bar + Zahlung",
          headWord: "die Zahlung (支払い)",
          elements: [
            { part: "Bar", meaning: "現金" },
            { part: "Zahlung", meaning: "支払い（女性名詞）" }
          ],
          meaning: "現金払い",
          sentence: "In diesem Geschäft ist nur Barzahlung möglich.",
          sentenceTranslation: "この店舗では現金払いのみ可能です。"
        },
        {
          word: "der Überweisungsträger",
          gender: "der",
          decomposition: "Überweisung + s + Träger",
          headWord: "der Träger (用紙・媒体)",
          elements: [
            { part: "Überweisung", meaning: "銀行振込 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Träger", meaning: "伝票（男性名詞）" }
          ],
          meaning: "銀行振込用紙",
          sentence: "Füllen Sie bitte den Überweisungsträger aus.",
          sentenceTranslation: "銀行振込用紙にご記入ください。"
        }
      ]
    },
    14: {
      day: 14,
      title: "第2週ボス評価 (Woche 2 Review: Alltags-Transaktionen)",
      rule: "第2週の総決算。交通・医療・飲食・金融の複合語を分解し、文末置換ドリルを完了せよ。",
      cards: [
        {
          word: "die Krankenversicherungskarte",
          gender: "die",
          decomposition: "Kranken + Versicherung + s + Karte",
          headWord: "die Karte (カード)",
          elements: [
            { part: "Kranken", meaning: "病気" },
            { part: "Versicherung", meaning: "保険 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Karte", meaning: "カード（女性名詞）" }
          ],
          meaning: "健康保険証カード",
          sentence: "Stecken Sie Ihre Krankenversicherungskarte in das Lesegerät.",
          sentenceTranslation: "健康保険証カードを読み取り機に差し込んでください。"
        },
        {
          word: "der Notfallausweis",
          gender: "der",
          decomposition: "Notfall + Ausweis",
          headWord: "der Ausweis (証明書)",
          elements: [
            { part: "Notfall", meaning: "緊急事態" },
            { part: "Ausweis", meaning: "証明証（男性名詞）" }
          ],
          meaning: "緊急連絡先カード・救急医療カード",
          sentence: "Tragen Sie den Notfallausweis immer im Portemonnaie.",
          sentenceTranslation: "緊急連絡先カードを常に財布に携帯してください。"
        },
        {
          word: "die Reservierungsgebühr",
          gender: "die",
          decomposition: "Reservierung + s + Gebühr",
          headWord: "die Gebühr (手数料・料金)",
          elements: [
            { part: "Reservierung", meaning: "予約 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Gebühr", meaning: "料金（女性名詞）" }
          ],
          meaning: "指定席予約手数料",
          sentence: "Die Reservierungsgebühr beträgt fünf Euro.",
          sentenceTranslation: "指定席予約手数料は5ユーロです。"
        },
        {
          word: "das Funduntersuchungsprotokoll",
          gender: "das",
          decomposition: "Fund + Untersuchung + s + Protokoll",
          headWord: "das Protokoll (調書・記録)",
          elements: [
            { part: "Fund", meaning: "拾得物" },
            { part: "Untersuchung", meaning: "調査 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Protokoll", meaning: "記録調書（中性名詞）" }
          ],
          meaning: "遺失物捜査記録・拾得物調書",
          sentence: "Die Polizei erstellt das Funduntersuchungsprotokoll.",
          sentenceTranslation: "警察が遺失物捜査調書を作成します。"
        },
        {
          word: "der Gepäckaufbewahrungsschein",
          gender: "der",
          decomposition: "Gepäck + Aufbewahrung + s + Schein",
          headWord: "der Schein (受領証・チケット)",
          elements: [
            { part: "Gepäckaufbewahrung", meaning: "手荷物預かり" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Schein", meaning: "預かり証（男性名詞）" }
          ],
          meaning: "手荷物預かり証・保管受領証",
          sentence: "Ohne Gepäckaufbewahrungsschein keine Rückgabe!",
          sentenceTranslation: "預かり証がないとお荷物の返却はできません！"
        }
      ]
    },
    15: {
      day: 15,
      title: "行政・住民登録と届出 (Bürgeramt & Behörden)",
      rule: "行政用語の末尾「-amt (役所/中性)」, 「-bescheinigung (証明/女性)」, 「-antrag (申請/男性)」を即座に掴む。",
      cards: [
        {
          word: "die Meldebescheinigung",
          gender: "die",
          decomposition: "Melde + Bescheinigung",
          headWord: "die Bescheinigung (証明書)",
          elements: [
            { part: "Melde", meaning: "住民届出 (melden)" },
            { part: "Bescheinigung", meaning: "証明書（女性名詞）" }
          ],
          meaning: "住民票（住民登録証明書）",
          sentence: "Die Meldebescheinigung wird für das Bankkonto benötigt.",
          sentenceTranslation: "銀行口座の開設には住民登録証明書が必要です。"
        },
        {
          word: "das Bürgeramt",
          gender: "das",
          decomposition: "Bürger + Amt",
          headWord: "das Amt (役所・官公庁)",
          elements: [
            { part: "Bürger", meaning: "市民" },
            { part: "Amt", meaning: "役所（中性名詞）" }
          ],
          meaning: "市民課役所・区役所窓口",
          sentence: "Ich habe morgen früh einen Termin beim Bürgeramt.",
          sentenceTranslation: "明朝、市民課役所に予約があります。"
        },
        {
          word: "der Wohnsitzwechsel",
          gender: "der",
          decomposition: "Wohn + Sitz + Wechsel",
          headWord: "der Wechsel (変更・転換)",
          elements: [
            { part: "Wohnsitz", meaning: "住所・居住地" },
            { part: "Wechsel", meaning: "変更（男性名詞）" }
          ],
          meaning: "住所変更・転居届",
          sentence: "Der Wohnsitzwechsel muss innerhalb von zwei Wochen gemeldet werden.",
          sentenceTranslation: "転居届は2週間以内に届出しなければなりません。"
        },
        {
          word: "das Ausländeramt",
          gender: "das",
          decomposition: "Ausländer + Amt",
          headWord: "das Amt (官庁)",
          elements: [
            { part: "Ausländer", meaning: "外国人" },
            { part: "Amt", meaning: "役所（中性名詞）" }
          ],
          meaning: "外国人局（出入国管理局）",
          sentence: "Das Ausländeramt prüft den Visumantrag.",
          sentenceTranslation: "外国人局がビザ申請の審査を行います。"
        },
        {
          word: "der Verlängerungsantrag",
          gender: "der",
          decomposition: "Verlängerung + s + Antrag",
          headWord: "der Antrag (申請・届出)",
          elements: [
            { part: "Verlängerung", meaning: "延長 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Antrag", meaning: "申請書（男性名詞）" }
          ],
          meaning: "期間延長申請書",
          sentence: "Reichen Sie den Verlängerungsantrag rechtzeitig ein.",
          sentenceTranslation: "期限に余裕をもって延長申請書を提出してください。"
        }
      ]
    },
    16: {
      day: 16,
      title: "司法・警察と被害届 (Polizei & Justiz)",
      rule: "警察法務用語は「犯行・被害内容 + 手続き/文書 (Anzeige/Protokoll/Aufnahme)」で構成。",
      cards: [
        {
          word: "die Verlustanzeige",
          gender: "die",
          decomposition: "Verlust + Anzeige",
          headWord: "die Anzeige (届出・通報)",
          elements: [
            { part: "Verlust", meaning: "紛失・喪失" },
            { part: "Anzeige", meaning: "届出（女性名詞）" }
          ],
          meaning: "遺失届・紛失届証明書",
          sentence: "Mit der Verlustanzeige erhalten Sie einen Ersatzpass.",
          sentenceTranslation: "紛失届の控えがあれば代替パスポートの発行が受けられます。"
        },
        {
          word: "das Diebstahlsprotokoll",
          gender: "das",
          decomposition: "Diebstahl + s + Protokoll",
          headWord: "das Protokoll (調書)",
          elements: [
            { part: "Diebstahl", meaning: "窃盗・盗難" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Protokoll", meaning: "記録調書（中性名詞）" }
          ],
          meaning: "盗難届調書（保険請求の必須書類）",
          sentence: "Die Versicherung verlangt das offizielle Diebstahlsprotokoll.",
          sentenceTranslation: "保険会社は公式の盗難届調書を要求します。"
        },
        {
          word: "der Polizeibericht",
          gender: "der",
          decomposition: "Polizei + Bericht",
          headWord: "der Bericht (報告・レポート)",
          elements: [
            { part: "Polizei", meaning: "警察" },
            { part: "Bericht", meaning: "報告書（男性名詞）" }
          ],
          meaning: "警察事故報告書・捜査報告書",
          sentence: "Der Polizeibericht bestätigt den Vorfall.",
          sentenceTranslation: "警察の事故報告書が事件の発生を証明しています。"
        },
        {
          word: "die Zeugenaussage",
          gender: "die",
          decomposition: "Zeuge + n + Aussage",
          headWord: "die Aussage (供述・証言)",
          elements: [
            { part: "Zeuge", meaning: "目撃者・証人" },
            { part: "-n-", meaning: "結合要素" },
            { part: "Aussage", meaning: "陳述（女性名詞）" }
          ],
          meaning: "目撃者証言・供述調書",
          sentence: "Die Polizei nimmt die Zeugenaussage auf.",
          sentenceTranslation: "警察官が目撃者の証言調書を記録しています。"
        },
        {
          word: "das Strafverfahren",
          gender: "das",
          decomposition: "Straf + Verfahren",
          headWord: "das Verfahren (手続き・訴訟)",
          elements: [
            { part: "Straf", meaning: "刑罰・刑事" },
            { part: "Verfahren", meaning: "手続き（中性名詞）" }
          ],
          meaning: "刑事訴訟手続き・刑事事件",
          sentence: "Die Staatsanwaltschaft leitet ein Strafverfahren ein.",
          sentenceTranslation: "検察庁が刑事訴訟手続きを開始します。"
        }
      ]
    },
    17: {
      day: 17,
      title: "税務・確定申告と領収書 (Finanzamt & Steuern)",
      rule: "税務用語は「税種名 + 手続き名詞 (Erklärung/Bescheid/Nummer)」で全てシステマチックに分解できる。",
      cards: [
        {
          word: "die Steuererklärung",
          gender: "die",
          decomposition: "Steuer + Erklärung",
          headWord: "die Erklärung (申告・宣言)",
          elements: [
            { part: "Steuer", meaning: "税金" },
            { part: "Erklärung", meaning: "申告書（女性名詞）" }
          ],
          meaning: "税務申告書・確定申告",
          sentence: "Ich muss meine Steuererklärung bis Juli einreichen.",
          sentenceTranslation: "7月までに確定申告書を提出しなければなりません。"
        },
        {
          word: "der Steuerbescheid",
          gender: "der",
          decomposition: "Steuer + Bescheid",
          headWord: "der Bescheid (決定通知書)",
          elements: [
            { part: "Steuer", meaning: "税金" },
            { part: "Bescheid", meaning: "通知書（男性名詞）" }
          ],
          meaning: "納税告知書・税額決定通知書",
          sentence: "Der Steuerbescheid kam heute mit der Post.",
          sentenceTranslation: "税額決定通知書が本日郵便で届きました。"
        },
        {
          word: "die Steuernummer",
          gender: "die",
          decomposition: "Steuer + Nummer",
          headWord: "die Nummer (番号)",
          elements: [
            { part: "Steuer", meaning: "税金" },
            { part: "Nummer", meaning: "番号（女性名詞）" }
          ],
          meaning: "税務番号（タックスID）",
          sentence: "Geben Sie immer Ihre persönliche Steuernummer an.",
          sentenceTranslation: "常に個人の税務番号を記載してください。"
        },
        {
          word: "das Finanzamt",
          gender: "das",
          decomposition: "Finanz + Amt",
          headWord: "das Amt (官庁)",
          elements: [
            { part: "Finanz", meaning: "財務・税務" },
            { part: "Amt", meaning: "役所（中性名詞）" }
          ],
          meaning: "税務署",
          sentence: "Das zuständige Finanzamt fordert weitere Unterlagen an.",
          sentenceTranslation: "管轄の税務署が追加書類の提出を求めています。"
        },
        {
          word: "die Mehrwertsteuer",
          gender: "die",
          decomposition: "Mehr + Wert + Steuer",
          headWord: "die Steuer (税金)",
          elements: [
            { part: "Mehrwert", meaning: "付加価値" },
            { part: "Steuer", meaning: "税（女性名詞）" }
          ],
          meaning: "付加価値税（消費税 / 19% または 7%）",
          sentence: "Alle Preise enthalten die gesetzliche Mehrwertsteuer.",
          sentenceTranslation: "全ての価格には法定の付加価値税（消費税）が含まれています。"
        }
      ]
    },
    18: {
      day: 18,
      title: "住宅・賃貸借契約と光熱費 (Wohnungsmiete)",
      rule: "不動産・賃貸用語は「住宅/建物 + 契約・費用名詞 (Vertrag/Kosten/Zins)」の組み合わせ。",
      cards: [
        {
          word: "der Mietvertrag",
          gender: "der",
          decomposition: "Miet + Vertrag",
          headWord: "der Vertrag (契約書)",
          elements: [
            { part: "Miete", meaning: "賃貸" },
            { part: "Vertrag", meaning: "契約（男性名詞）" }
          ],
          meaning: "賃貸借契約書",
          sentence: "Vor der Unterschrift prüfen wir den Mietvertrag gründlich.",
          sentenceTranslation: "署名する前に賃貸借契約書を徹底的に確認します。"
        },
        {
          word: "die Nebenkostenabrechnung",
          gender: "die",
          decomposition: "Neben + Kosten + Abrechnung",
          headWord: "die Abrechnung (清算書)",
          elements: [
            { part: "Nebenkosten", meaning: "付帯費用（暖房・共益費）" },
            { part: "Abrechnung", meaning: "清算書（女性名詞）" }
          ],
          meaning: "共益費・光熱費年間清算書",
          sentence: "Die jährliche Nebenkostenabrechnung fiel höher aus als erwartet.",
          sentenceTranslation: "年間の共益費清算額は予想より高額でした。"
        },
        {
          word: "die Mietkaution",
          gender: "die",
          decomposition: "Miet + Kaution",
          headWord: "die Kaution (敷金・保証金)",
          elements: [
            { part: "Miete", meaning: "賃料" },
            { part: "Kaution", meaning: "保証金（女性名詞）" }
          ],
          meaning: "敷金（通常3ヶ月分の家賃）",
          sentence: "Die Mietkaution wird auf einem Sperrkonto hinterlegt.",
          sentenceTranslation: "敷金は専用の凍結預金口座に預託されます。"
        },
        {
          word: "das Übergabeprotokoll",
          gender: "das",
          decomposition: "Über + Gabe + Protokoll",
          headWord: "das Protokoll (調書・記録)",
          elements: [
            { part: "Übergabe", meaning: "引き渡し" },
            { part: "Protokoll", meaning: "調書（中性名詞）" }
          ],
          meaning: "物件引き渡し記録（現状確認書）",
          sentence: "Halten Sie alle Schäden im Übergabeprotokoll fest.",
          sentenceTranslation: "全ての損傷箇所を引き渡し記録に記載してください。"
        },
        {
          word: "die Kündigungsfrist",
          gender: "die",
          decomposition: "Kündigung + s + Frist",
          headWord: "die Frist (期限・猶予期間)",
          elements: [
            { part: "Kündigung", meaning: "解約・契約解除 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Frist", meaning: "期間（女性名詞）" }
          ],
          meaning: "解約予告期間（退去通知猶予期限）",
          sentence: "Die gesetzliche Kündigungsfrist beträgt drei Monate.",
          sentenceTranslation: "法定の解約予告期間は3ヶ月間です。"
        }
      ]
    },
    19: {
      day: 19,
      title: "労働・雇用契約と権利 (Arbeitsrecht)",
      rule: "労働現場用語は「労働 + 条件名詞 (Vertrag/Zeit/Erlaubnis/Geber)」の分解で理解。",
      cards: [
        {
          word: "der Arbeitsvertrag",
          gender: "der",
          decomposition: "Arbeit + s + Vertrag",
          headWord: "der Vertrag (契約書)",
          elements: [
            { part: "Arbeit", meaning: "労働 (-s-)" },
            { part: "Vertrag", meaning: "契約（男性名詞）" }
          ],
          meaning: "雇用契約書・労働契約",
          sentence: "Im Arbeitsvertrag ist die Wochenarbeitszeit geregelt.",
          sentenceTranslation: "雇用契約書に週の労働時間が規定されています。"
        },
        {
          word: "die Arbeitserlaubnis",
          gender: "die",
          decomposition: "Arbeit + s + Erlaubnis",
          headWord: "die Erlaubnis (許可証)",
          elements: [
            { part: "Arbeit", meaning: "労働 (-s-)" },
            { part: "Erlaubnis", meaning: "許可（女性名詞）" }
          ],
          meaning: "就労許可証（労働ビザ付帯）",
          sentence: "Ohne gültige Arbeitserlaubnis darf man nicht arbeiten.",
          sentenceTranslation: "有効な就労許可証なしに働くことはできません。"
        },
        {
          word: "die Gehaltsabrechnung",
          gender: "die",
          decomposition: "Gehalt + s + Abrechnung",
          headWord: "die Abrechnung (明細書)",
          elements: [
            { part: "Gehalt", meaning: "給与 (-s-)" },
            { part: "Abrechnung", meaning: "明細（女性名詞）" }
          ],
          meaning: "給与明細書",
          sentence: "Die Gehaltsabrechnung listet alle Steuerabzüge auf.",
          sentenceTranslation: "給与明細書に全ての税控除項目が記載されています。"
        },
        {
          word: "der Arbeitgeber",
          gender: "der",
          decomposition: "Arbeit + Geber",
          headWord: "der Geber (与える側)",
          elements: [
            { part: "Arbeit", meaning: "労働" },
            { part: "Geber", meaning: "提供者（男性名詞）" }
          ],
          meaning: "雇用主・会社側",
          sentence: "Der Arbeitgeber zahlt die Hälfte der Krankenversicherung.",
          sentenceTranslation: "雇用主が健康保険料の半分を負担します。"
        },
        {
          word: "das Kündigungsschreiben",
          gender: "das",
          decomposition: "Kündigung + s + Schreiben",
          headWord: "das Schreiben (書面・レター)",
          elements: [
            { part: "Kündigung", meaning: "解約・退職 (-ung)" },
            { part: "-s-", meaning: "結合要素" },
            { part: "Schreiben", meaning: "書面（中性名詞）" }
          ],
          meaning: "退職届・解雇通知書",
          sentence: "Das Kündigungsschreiben muss schriftlich erfolgen.",
          sentenceTranslation: "退職通知は書面で行われなければなりません。"
        }
      ]
    },
    20: {
      day: 20,
      title: "超長大複合名詞の解体 (Mammutwörter-Dekomposition)",
      rule: "4語以上が結合したモンスター単語（Mammutwörter）。左から音節ごとに区切り、最終要素で性別を固定する。",
      cards: [
        {
          word: "die Schienenersatzverkehrshaltestelle",
          gender: "die",
          decomposition: "Schiene + n + Ersatz + Verkehr + s + Halte + Stelle",
          headWord: "die Stelle (場所・停留所)",
          elements: [
            { part: "Schienenersatzverkehr", meaning: "線路代行バス" },
            { part: "Haltestelle", meaning: "停留所（女性名詞）" }
          ],
          meaning: "鉄道代行バス専用停留所",
          sentence: "Wo befindet sich die Schienenersatzverkehrshaltestelle?",
          sentenceTranslation: "鉄道代行バスの乗り場はどこにありますか？"
        },
        {
          word: "die Kraftfahrzeughaftpflichtversicherung",
          gender: "die",
          decomposition: "Kraft + Fahrzeug + Haftpflicht + Versicherung",
          headWord: "die Versicherung (保険)",
          elements: [
            { part: "Kraftfahrzeug", meaning: "自動車" },
            { part: "Haftpflicht", meaning: "賠償責任" },
            { part: "Versicherung", meaning: "保険（女性名詞）" }
          ],
          meaning: "自動車損害賠償責任保険（自賠責保険）",
          sentence: "Die Kraftfahrzeughaftpflichtversicherung ist gesetzlich vorgeschrieben.",
          sentenceTranslation: "自動車損害賠償責任保険は法律で加入が義務付けられています。"
        },
        {
          word: "der Auslandsreisekrankenversicherungsschein",
          gender: "der",
          decomposition: "Ausland + s + Reise + Kranken + Versicherung + s + Schein",
          headWord: "der Schein (証書)",
          elements: [
            { part: "Auslandsreise", meaning: "海外旅行" },
            { part: "Krankenversicherung", meaning: "健康保険" },
            { part: "Schein", meaning: "証明書（男性名詞）" }
          ],
          meaning: "海外旅行傷害保険証書",
          sentence: "Zeigen Sie dem Arzt den Auslandsreisekrankenversicherungsschein.",
          sentenceTranslation: "医師に海外旅行傷害保険証書を提示してください。"
        },
        {
          word: "die Vermögensauseinandersetzungsvereinbarung",
          gender: "die",
          decomposition: "Vermögen + s + Auseinandersetzung + s + Vereinbarung",
          headWord: "die Vereinbarung (合意・契約)",
          elements: [
            { part: "Vermögen", meaning: "財産" },
            { part: "Auseinandersetzung", meaning: "清算・分割" },
            { part: "Vereinbarung", meaning: "合意書（女性名詞）" }
          ],
          meaning: "財産分与合意書",
          sentence: "Die Parteien unterzeichnen die Vermögensauseinandersetzungsvereinbarung.",
          sentenceTranslation: "当事者双方が財産分与合意書に署名します。"
        },
        {
          word: "die Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft",
          gender: "die",
          decomposition: "Donau + Dampf + Schiff + Fahrt + s + ... + Gesellschaft",
          headWord: "die Gesellschaft (会社・協会)",
          elements: [
            { part: "Donau...werkbau", meaning: "ドナウ汽船電気事業本部..." },
            { part: "Gesellschaft", meaning: "会社・法人（女性名詞）" }
          ],
          meaning: "ドナウ汽船電気事業工場下級官吏組合（ドイツ語最長級の有名複合語）",
          sentence: "Das längste Wort zeigt: Das letzte Nomen bestimmt das Genus!",
          sentenceTranslation: "最長の単語であっても証明される原則：最後の名詞が性を決定する！"
        }
      ]
    },
    21: {
      day: 21,
      title: "Phase 4 総決算マスター (Komposita Master Exam)",
      rule: "全21日間の総集編。実戦において見知らぬ長大名詞に出合っても、即座にパーツを特定し正確な冠詞と格で話す反射力を測定する。",
      cards: [
        {
          word: "der Fahrplanänderungsaushang",
          gender: "der",
          decomposition: "Fahr + Plan + Änderung + s + Aushang",
          headWord: "der Aushang (掲示・ポスター)",
          elements: [
            { part: "Fahrplanänderung", meaning: "運行ダイヤ変更" },
            { part: "Aushang", meaning: "掲示物（男性名詞）" }
          ],
          meaning: "ダイヤ変更掲示板・時刻表改定案内ポスター",
          sentence: "Der Fahrplanänderungsaushang hängt direkt am Gleiszugang.",
          sentenceTranslation: "ダイヤ変更の掲示ポスターがホームへの通路口に直接掲示されています。"
        },
        {
          word: "die Zahlungsunfähigkeitsbescheinigung",
          gender: "die",
          decomposition: "Zahlung + s + Unfähigkeit + s + Bescheinigung",
          headWord: "die Bescheinigung (証明書)",
          elements: [
            { part: "Zahlungsunfähigkeit", meaning: "支払不能・債務超過" },
            { part: "Bescheinigung", meaning: "証明書（女性名詞）" }
          ],
          meaning: "支払不能証明書・破産宣告証明書",
          sentence: "Das Amtsgericht stellt die Zahlungsunfähigkeitsbescheinigung aus.",
          sentenceTranslation: "地方裁判所が支払不能証明書を発行します。"
        },
        {
          word: "das Bundesmeldegesetz",
          gender: "das",
          decomposition: "Bund + es + Melde + Gesetz",
          headWord: "das Gesetz (法律)",
          elements: [
            { part: "Bundes", meaning: "連邦の" },
            { part: "Melde", meaning: "住民届出" },
            { part: "Gesetz", meaning: "法律（中性名詞）" }
          ],
          meaning: "連邦住民登録法",
          sentence: "Die Fristen sind im Bundesmeldegesetz festgelegt.",
          sentenceTranslation: "届出期限は連邦住民登録法に規定されています。"
        },
        {
          word: "der Notfallkrankenwagen",
          gender: "der",
          decomposition: "Notfall + Kranken + Wagen",
          headWord: "der Wagen (車両・車)",
          elements: [
            { part: "Notfall", meaning: "緊急事態" },
            { part: "Krankenwagen", meaning: "救急車（男性名詞）" }
          ],
          meaning: "高規格救急搬送車",
          sentence: "Der Notfallkrankenwagen traf nach fünf Minuten am Unfallort ein.",
          sentenceTranslation: "救急車は5分後に事故現場へ到着しました。"
        },
        {
          word: "die Schienenersatzverkehrsbuslinie",
          gender: "die",
          decomposition: "Schienenersatzverkehr + s + Bus + Linie",
          headWord: "die Linie (運行系統・路線)",
          elements: [
            { part: "Schienenersatzverkehr", meaning: "鉄道代行輸送" },
            { part: "Buslinie", meaning: "バス路線（女性名詞）" }
          ],
          meaning: "鉄道代行バス運行路線（SEVライン）",
          sentence: "Die Schienenersatzverkehrsbuslinie verkehrt im Zwanzig-Minuten-Takt.",
          sentenceTranslation: "鉄道代行バス路線は20分間隔で運行しています。"
        }
      ]
    }
  };