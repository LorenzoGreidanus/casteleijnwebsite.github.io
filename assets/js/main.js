/* Casteleijn College — kleine, toegankelijke interacties. Werkt ook zonder JavaScript. */
(function () {
  // Mobiel menu
  var knop = document.querySelector('.menuknop');
  var menu = document.getElementById('hoofdmenu');
  if (knop && menu) {
    knop.addEventListener('click', function () {
      var open = knop.getAttribute('aria-expanded') === 'true';
      knop.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { knop.click(); knop.focus(); }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && menu.classList.contains('open')) { knop.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); }
    });
  }
  document.querySelectorAll('.subknop').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      b.nextElementSibling.classList.toggle('open', !open);
    });
  });

  // Agenda: verlopen items verbergen, maximum tonen
  var vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
  document.querySelectorAll('.agenda').forEach(function (lijst) {
    var max = parseInt(lijst.dataset.max, 10) || 99, getoond = 0;
    lijst.querySelectorAll('.agenda__item').forEach(function (item) {
      var eind = new Date(item.dataset.eind + 'T23:59:59');
      if (eind < vandaag || getoond >= max) { item.hidden = true; } else { getoond++; }
    });
    if (getoond === 0) {
      var p = document.createElement('p'); p.className = 'agenda__leeg';
      p.textContent = 'Er staan op dit moment geen activiteiten in de agenda.';
      lijst.after(p);
    }
  });

  // Video pas laden na klik (privacy)
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

  // Actieve link in "Op deze pagina"
  var subLinks = document.querySelectorAll('.opdeze a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.hash.slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          subLinks.forEach(function (a) { a.classList.remove('actief'); });
          map[en.target.id].classList.add('actief');
          map[en.target.id].scrollIntoView({ block: 'nearest', inline: 'center' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) obs.observe(el); });
  }

  // Oriëntatieformulier: opent een ingevulde e-mail (statische site, geen server nodig)
  var form = document.getElementById('orientatieformulier');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form), regels = [];
      form.querySelectorAll('[name]').forEach(function (el) {
        if (el.type === 'checkbox') return;
        var label = form.querySelector('label[for="' + el.id + '"]');
        regels.push((label ? label.textContent.replace('*', '').trim() : el.name) + ': ' + (d.get(el.name) || '-'));
      });
      regels.push('', 'Akkoord met verwerking gegevens: ja');
      var url = 'mailto:' + form.dataset.naar + '?subject=' + encodeURIComponent('Aanvraag oriëntatiebezoek') + '&body=' + encodeURIComponent('Beste Casteleijn College,\n\nGraag vraag ik een oriëntatiebezoek aan.\n\n' + regels.join('\n') + '\n\nMet vriendelijke groet,');
      window.location.href = url;
      var ok = document.getElementById('formulier-melding');
      if (ok) ok.hidden = false;
    });
  }
})();
