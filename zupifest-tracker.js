(function(){
  var API = "https://zupi-share-backend.onrender.com";
  var sid = sessionStorage.getItem("zf_sid") || (Date.now().toString(36) + Math.random().toString(36).slice(2,8));
  sessionStorage.setItem("zf_sid", sid);

  fetch(API + "/api/zupifest/pageview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: location.pathname, referrer: document.referrer, sessionId: sid })
  }).catch(function(){});

  if (location.search.indexOf("booking=success") !== -1 || location.pathname.indexOf("success") !== -1) {
    fetch(API + "/api/zupifest/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "booking_complete", sessionId: sid, data: { path: location.pathname } })
    }).catch(function(){});
  }

  document.addEventListener("click", function(e){
    var el = e.target.closest("a, button");
    if (!el) return;
    var txt = (el.textContent || "").toLowerCase();
    var href = (el.href || "").toLowerCase();
    if (txt.indexOf("ticket") !== -1 || href.indexOf("stripe") !== -1 || href.indexOf("buy.stripe") !== -1) {
      fetch(API + "/api/zupifest/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ticket_click", sessionId: sid, data: { label: txt.slice(0,40), href: href.slice(0,120) } })
      }).catch(function(){});
    }
  });

  var maxScroll = 0;
  window.addEventListener("scroll", function() {
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop + window.innerHeight) / h.scrollHeight) * 100);
    if (pct > maxScroll) maxScroll = Math.min(100, pct);
  }, { passive: true });

  function sendExit() {
    var payload = JSON.stringify({ type: "scroll", sessionId: sid, data: { depth: maxScroll } });
    if (navigator.sendBeacon) navigator.sendBeacon(API + "/api/zupifest/event", new Blob([payload], { type: "application/json" }));
  }
  window.addEventListener("pagehide", sendExit);
  window.addEventListener("beforeunload", sendExit);

  setInterval(function(){
    fetch(API + "/api/zupifest/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "scroll", sessionId: sid, data: { depth: maxScroll } })
    }).catch(function(){});
  }, 15000);
})();
