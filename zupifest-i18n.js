(function(){
  // Detect Japanese phone/browser
  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (lang.indexOf("ja") !== 0) return; // Not Japanese → keep English, exit

  document.documentElement.lang = "ja";

  var translations = {
    "Buy Ticket — ¥1,500": "チケット購入 — ¥1,500",
    "Get Tickets": "チケット",
    "Tickets": "チケット",
    "General Admission": "一般入場",
    "Early Access": "早期入場",
    "Full event access · 19:30 – 23:00": "全ステージ入場 · 19:30 – 23:00",
    "All performances & stages": "全パフォーマンス・ステージ",
    "All performances &amp; stages": "全パフォーマンス・ステージ",
    "Digital ticket sent to your email": "デジタルチケットをメールでお送りします",
    "No account needed": "アカウント登録不要",
    "/ person": "/ 1人",
    "Limited": "数量限定",
    "Days": "日",
    "Location": "会場",
    "Contact": "お問い合わせ",
    "Videos": "動画",
    "Event Flyer": "イベントフライヤー",
    "Open in Maps": "マップで開く",
    "3 min from Shinjuku Station East Exit": "新宿駅東口から徒歩3分",
    "3F Kabukicho, Shinjuku": "新宿・歌舞伎町 3F",
    "3F, 2-45-8 Kabukicho, Shinjuku-ku": "新宿区歌舞伎町2-45-8 3F",
    "April 25 · Shinjuku, Tokyo": "4月25日 · 東京・新宿",
    "April 25, 2026": "2026年4月25日",
    "April 25, 2026 · 19:30 – 23:00": "2026年4月25日 · 19:30 – 23:00",
    "Edition 02": "第2回",
    "ZupiFest 1st Edition": "ZupiFest 第1回",
    "If you're looking for what's next — you're in the right place.": "次の何かを探しているあなたへ — ここが正解です。",
    "Questions about ZupiFest? Tickets, lineup, or anything else — we got you.": "ZupiFestについてのご質問はこちら。チケット、ラインナップ、なんでもお気軽に。",
    "Unmute": "音声オン",
    "Terms": "利用規約"
  };

  // Walk all text nodes and replace matches
  function translateNode(node) {
    if (node.nodeType === 3) { // text node
      var raw = node.nodeValue;
      var trimmed = raw.trim();
      if (trimmed && translations[trimmed]) {
        node.nodeValue = raw.replace(trimmed, translations[trimmed]);
      }
    } else if (node.nodeType === 1 && node.childNodes && !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.tagName)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i]);
      }
    }
  }

  function run() {
    translateNode(document.body);
    // Translate page title too
    if (document.title) {
      document.title = document.title.replace("ZupiFest", "ZupiFest").replace("Tickets", "チケット");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
