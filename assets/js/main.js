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

  // Agenda: verlopen items verbergen. De bouwstap doet dit ook, maar de site wordt niet elke dag gebouwd.
  var vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
  function verlopen(datum) { return new Date(datum + 'T23:59:59') < vandaag; }
  document.querySelectorAll('.agenda').forEach(function (lijst) {
    var max = parseInt(lijst.dataset.max, 10) || 99, getoond = 0;
    lijst.querySelectorAll('.agenda__item').forEach(function (item) {
      var weg = verlopen(item.dataset.eind) || getoond >= max;
      item.hidden = weg;
      if (!weg) getoond++;
    });
    var leeg = lijst.nextElementSibling;
    if (!getoond && !(leeg && leeg.classList.contains('agenda__leeg'))) {
      var p = document.createElement('p'); p.className = 'agenda__leeg';
      p.textContent = 'Er staan op dit moment geen activiteiten in de agenda.';
      lijst.after(p);
    }
  });

  // Informatieavond geweest? Dan het blok en de sprongknop weghalen.
  document.querySelectorAll('[data-verloopt]').forEach(function (blok) {
    if (!verlopen(blok.dataset.verloopt)) return;
    blok.hidden = true;
    var link = document.querySelector('.sprong a[href="#' + blok.id + '"]');
    if (link) link.parentNode.hidden = true;
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

  // Rondleiding aanvragen. Met formulierdienst: versturen op de pagina. Zonder: ingevulde e-mail.
  var form = document.getElementById('orientatieformulier');
  if (form) {
    var melding = document.getElementById('formulier-melding');
    var verstuur = form.querySelector('button[type=submit]');
    var velden = form.querySelectorAll('input[required], select[required]');
    var tel = '<a href="tel:' + form.dataset.tellink + '">' + form.dataset.telefoon + '</a>';
    var mail = form.dataset.naar;
    form.noValidate = true;

    function toonFout(el, fout) {
      var p = document.getElementById(el.id + '-fout');
      el.setAttribute('aria-invalid', fout ? 'true' : 'false');
      if (p) { p.textContent = fout ? el.dataset.fout : ''; p.hidden = !fout; }
    }
    function controleer(el) { var ok = el.checkValidity(); toonFout(el, !ok); return ok; }
    velden.forEach(function (el) {
      var soort = el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(soort, function () { if (el.getAttribute('aria-invalid') === 'true') controleer(el); });
      el.addEventListener('blur', function () { if (el.value) controleer(el); });
    });

    function labelTekst(el) {
      var label = form.querySelector('label[for="' + el.id + '"]');
      if (!label) return el.name;
      var kopie = label.cloneNode(true);
      kopie.querySelectorAll('.verplicht, .klein').forEach(function (x) { x.remove(); });
      return kopie.textContent.trim();
    }
    function samenvatting() {
      var regels = [];
      form.querySelectorAll('input[name], select[name]').forEach(function (el) {
        if (el.type === 'hidden' || el.type === 'checkbox' || el.name.charAt(0) === '_') return;
        regels.push(labelTekst(el) + ': ' + (el.value.trim() || '-'));
      });
      return 'Beste Casteleijn College,\n\nGraag vraag ik een rondleiding aan.\n\n' + regels.join('\n') +
        '\n\nAkkoord met verwerking gegevens: ja\n\nMet vriendelijke groet,';
    }
    function mailLink() {
      return 'mailto:' + mail + '?subject=' + encodeURIComponent('Aanvraag rondleiding') + '&body=' + encodeURIComponent(samenvatting());
    }
    function toon(soort, html) {
      melding.className = 'formulier__melding formulier__melding--' + soort;
      melding.innerHTML = html;
      melding.hidden = false;
      melding.focus();
    }
    function bezig(aan) {
      verstuur.disabled = aan;
      verstuur.setAttribute('aria-busy', String(aan));
      if (aan) { verstuur.dataset.tekst = verstuur.innerHTML; verstuur.textContent = 'Bezig met versturen…'; }
      else if (verstuur.dataset.tekst) verstuur.innerHTML = verstuur.dataset.tekst;
    }
    function viaMail() {
      window.location.href = mailLink();
      toon('info',
        '<p><strong>Je e-mailprogramma zou nu moeten openen</strong> met een ingevuld bericht. Verstuur dat bericht om je aanvraag af te ronden.</p>' +
        '<p>Opent er niets? Kopieer dan je gegevens en mail ze naar <a href="mailto:' + mail + '">' + mail + '</a>. Of bel ons op ' + tel + '.</p>' +
        '<label class="visueel-verborgen" for="f-kopie">Je gegevens</label><textarea id="f-kopie" readonly></textarea>' +
        '<button class="knop knop--rand" type="button" data-kopieer>Kopieer je gegevens</button>');
      var vak = melding.querySelector('textarea');
      vak.value = samenvatting();
      melding.querySelector('[data-kopieer]').addEventListener('click', function () {
        var knopK = this;
        var klaar = function () { knopK.textContent = 'Gekopieerd'; };
        if (navigator.clipboard) navigator.clipboard.writeText(vak.value).then(klaar, function () { vak.select(); });
        else { vak.select(); try { document.execCommand('copy'); klaar(); } catch (err) { /* tekst is geselecteerd */ } }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var eersteFout = null;
      velden.forEach(function (el) { if (!controleer(el) && !eersteFout) eersteFout = el; });
      if (eersteFout) { eersteFout.focus(); return; }
      melding.hidden = true;

      if (form.dataset.modus !== 'online') { viaMail(); return; }

      bezig(true);
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.hidden = true;
          toon('ok',
            '<h3>Je aanvraag is binnen.</h3>' +
            '<p>Bedankt! We nemen binnen een week contact met je op om een moment voor de rondleiding te plannen.</p>' +
            '<p>Liever niet wachten? Bel ons op ' + tel + '.</p>');
        })
        .catch(function () {
          toon('fout',
            '<p><strong>Versturen is niet gelukt.</strong> Je gegevens staan er nog. Probeer het nog een keer, of bel ons op ' + tel + '.</p>' +
            '<p><a href="' + mailLink().replace(/"/g, '&quot;') + '">Of stuur je aanvraag per e-mail</a></p>');
        })
        .then(function () { bezig(false); });
    });
  }

  // Duimbalk (mobiel): alleen tonen tussen de bovenkant en het slot van de pagina
  var balk = document.getElementById('duimbalk');
  var begin = document.querySelector('.hero, .pkop');
  var eindes = document.querySelectorAll('.afsluiter, .voet');
  if (balk && 'IntersectionObserver' in window) {
    var inBeeld = new Map();
    var werkBij = function () {
      var zicht = false;
      inBeeld.forEach(function (v) { zicht = zicht || v; });
      balk.classList.toggle('zichtbaar', !zicht);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { inBeeld.set(en.target, en.isIntersecting); });
      werkBij();
    });
    if (begin) io.observe(begin);
    eindes.forEach(function (el) { io.observe(el); });
  }
})();
