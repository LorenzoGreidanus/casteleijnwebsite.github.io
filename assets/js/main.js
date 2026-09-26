/* Casteleijn College: kleine, toegankelijke interacties. De site werkt ook zonder JavaScript. */
(function () {
  var body = document.body;

  // Kop krijgt schaduw zodra de bovenkant van de pagina uit beeld is (zonder scroll-listener)
  var kop = document.getElementById('kop');
  if (kop && 'IntersectionObserver' in window) {
    var baken = document.createElement('div');
    baken.setAttribute('aria-hidden', 'true');
    baken.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
    body.prepend(baken);
    new IntersectionObserver(function (en) { kop.classList.toggle('gescrold', !en[0].isIntersecting); }).observe(baken);
  }

  // Menu (overlay)
  var knop = document.querySelector('.menuknop');
  var menu = document.getElementById('menu-overlay');
  function zetMenu(open) {
    knop.setAttribute('aria-expanded', String(open));
    knop.querySelector('.visueel-verborgen').textContent = open ? ' sluiten' : ' openen';
    menu.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
    if (open) { var eerste = menu.querySelector('a'); eerste && eerste.focus(); }
  }
  if (knop && menu) {
    knop.addEventListener('click', function () { zetMenu(knop.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { zetMenu(false); knop.focus(); }
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) zetMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1180 && menu.classList.contains('open')) zetMenu(false); });
  }

  // Agenda: verlopen items verbergen
  var vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
  document.querySelectorAll('.agenda').forEach(function (lijst) {
    var max = parseInt(lijst.dataset.max, 10) || 99, getoond = 0;
    lijst.querySelectorAll('.agenda__item').forEach(function (item) {
      var eind = new Date(item.dataset.eind + 'T23:59:59');
      if (eind < vandaag || getoond >= max) item.hidden = true; else getoond++;
    });
    if (!getoond) {
      var p = document.createElement('p'); p.className = 'agenda__leeg';
      p.textContent = 'Er staan op dit moment geen activiteiten in de agenda.';
      lijst.after(p);
    }
  });

  // Video pas laden na klik
  document.querySelectorAll('.video').forEach(function (v) {
    var b = v.querySelector('.video__knop');
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + v.dataset.video + '?autoplay=1&rel=0';
      f.title = b.textContent.trim();
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      v.appendChild(f); v.classList.add('speelt'); f.focus();
    });
  });

  // Sprongmenu: actieve sectie markeren
  var sprong = document.querySelectorAll('.sprong a');
  if (sprong.length && 'IntersectionObserver' in window) {
    var map = {};
    sprong.forEach(function (a) { map[decodeURIComponent(a.hash.slice(1))] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (en.isIntersecting && a) {
          sprong.forEach(function (x) { x.classList.remove('actief'); });
          a.classList.add('actief');
          var ul = a.closest('ul');
          ul.scrollTo({ left: a.offsetLeft - ul.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }

  // Oriëntatieformulier: opent een ingevulde e-mail (statische site, geen server nodig)
  var form = document.getElementById('orientatieformulier');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var regels = [];
      form.querySelectorAll('input[name]:not([type=checkbox])').forEach(function (el) {
        var label = form.querySelector('label[for="' + el.id + '"]');
        regels.push((label ? label.textContent.replace('*', '').trim() : el.name) + ': ' + (el.value || '-'));
      });
      regels.push('', 'Akkoord met verwerking gegevens: ja');
      window.location.href = 'mailto:' + form.dataset.naar +
        '?subject=' + encodeURIComponent('Aanvraag oriëntatiebezoek') +
        '&body=' + encodeURIComponent('Beste Casteleijn College,\n\nGraag vraag ik een oriëntatiebezoek aan.\n\n' + regels.join('\n') + '\n\nMet vriendelijke groet,');
      var ok = document.getElementById('formulier-melding');
      if (ok) ok.hidden = false;
    });
  }
})();
