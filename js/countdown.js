// Event countdown — drives every .event-countdown[data-countdown] widget on a page.
// data-countdown holds an ISO datetime (same value as that page's JSON-LD startDate).
// data-countdown-end (optional, same value as JSON-LD endDate) marks when the show
// is truly over — without it, the widget would claim "live" forever after start.
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function tick(el) {
    var start = new Date(el.dataset.countdown).getTime();
    var end = el.dataset.countdownEnd ? new Date(el.dataset.countdownEnd).getTime() : start;
    var now = Date.now();

    if (now >= end) {
      el.querySelector('.event-countdown__eyebrow').hidden = true;
      el.querySelector('.event-countdown__grid').hidden = true;
      el.querySelector('.event-countdown__live').hidden = true;
      el.querySelector('.event-countdown__missed').hidden = false;
      return true;
    }
    if (now >= start) {
      el.querySelector('.event-countdown__eyebrow').hidden = true;
      el.querySelector('.event-countdown__grid').hidden = true;
      el.querySelector('.event-countdown__live').hidden = false;
      return false;
    }

    var diff = start - now;
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600);  s -= h * 3600;
    var m = Math.floor(s / 60);    s -= m * 60;
    el.querySelector('[data-unit="d"]').textContent = d;
    el.querySelector('[data-unit="h"]').textContent = pad(h);
    el.querySelector('[data-unit="m"]').textContent = pad(m);
    el.querySelector('[data-unit="s"]').textContent = pad(s);
    return false;
  }

  document.querySelectorAll('.event-countdown[data-countdown]').forEach(function (el) {
    if (tick(el)) return;
    var id = setInterval(function () {
      if (tick(el)) clearInterval(id);
    }, 1000);
  });
})();
