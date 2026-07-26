/* ============================================================
   İncir Bahçesi — main.js
   Mobil menü · yumuşak kaydırma · aktif bölüm · ürün grid + arama
   · WhatsApp sipariş linkleri · scroll animasyonları
   ============================================================ */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '905446432981';

  /* ---------- WhatsApp sipariş linki oluştur ---------- */
  function waLink(product) {
    var msg = 'Merhaba, "' + product + '" ürününden sipariş vermek istiyorum. Bilgi alabilir miyim?';
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  /* ---------- Ürün listesi ---------- */
  var IMG = 'assets/products/';
  var products = [
    { name: 'İncir',              emoji: '🫐', tag: 'Tatlı ve doğal kuru incir',      img: IMG + 'incir.jpg' },
    { name: 'Ceviz',              emoji: '🌰', tag: 'Dolgun içli Afyon cevizi',        img: IMG + 'ceviz.jpg' },
    { name: 'Ceviz İçi',          emoji: '🌰', tag: 'Taze çıkarılmış ceviz içi',       img: IMG + 'ceviz-ici.jpg' },
    { name: 'Zeytinyağı',         emoji: '🫒', tag: 'Soğuk sıkım naturel sızma',       img: IMG + 'zeytinyagi.jpg' },
    { name: 'Haşhaş',             emoji: '🌼', tag: 'Afyon\'un meşhur haşhaşı',        img: IMG + 'hashas.jpg' },
    { name: 'Haşhaş Ezmesi',      emoji: '🥣', tag: 'Geleneksel yoğun ezme',           img: IMG + 'hashas-ezmesi.jpg' },
    { name: 'Haşhaş Yağı',        emoji: '🧴', tag: 'Katkısız haşhaş yağı',            img: IMG + 'hashas-yagi.jpg' },
    { name: 'Çörek Otu Yağı',     emoji: '🧴', tag: 'Doğal çörek otu yağı',           img: IMG + 'corek-otu-yagi.jpg' },
    { name: 'Metsu',              emoji: '🍎', tag: 'Fermente elma içeceği',           img: IMG + 'metsu.jpg' },
    { name: 'Kuru Üzüm',          emoji: '🍇', tag: 'Çekirdeksiz kuru üzüm',           img: IMG + 'kuru-uzum.jpg' },
    { name: 'Kayısı',             emoji: '🍑', tag: 'Güneşte kurutulmuş kayısı',       img: IMG + 'kayisi.jpg' },
    { name: 'Kuru Erik',          emoji: '🟣', tag: 'Doğal kuru erik',                img: IMG + 'kuru-erik.jpg' },
    { name: 'Dut Kurusu',         emoji: '🌾', tag: 'Beyaz dut kurusu',               img: IMG + 'dut-kurusu.jpg' },
    { name: 'İğde',               emoji: '🟠', tag: 'Yöresel iğde',                    img: IMG + 'igde.jpg' },
    { name: 'İğde Tozu',          emoji: '🥄', tag: 'Öğütülmüş iğde tozu',            img: IMG + 'igde-tozu.jpg' },
    { name: 'Hünnap',             emoji: '🔴', tag: 'Kurutulmuş hünnap',              img: IMG + 'hunnap.jpg' },
    { name: 'Tarhana',            emoji: '🥣', tag: 'Ev yapımı tarhana',              img: IMG + 'tarhana.jpg' },
    { name: 'Afyon Ekmeği',       emoji: '🍞', tag: 'Meşhur Afyon ekmeği',            img: IMG + 'afyon-ekmegi.jpg' },
    { name: 'Sucuk',              emoji: '🥩', tag: 'Afyon sucuğu',                    img: IMG + 'sucuk.jpg' },
    { name: 'Kaymak',             emoji: '🥛', tag: 'Meşhur Afyon kaymağı',           img: IMG + 'kaymak.jpg' },
    { name: 'Yaprak',             emoji: '🍃', tag: 'Taze asma yaprağı',              img: IMG + 'yaprak.jpg' },
    { name: 'Kadir Zade Meyve Özleri', emoji: '🍯', tag: 'Doğal meyve özleri',        img: IMG + 'meyve-ozleri.jpg' },
    { name: 'Kurular',            emoji: '🧺', tag: 'Çeşitli kuru gıdalar',           img: IMG + 'kurular.jpg' }
  ];

  /* ---------- Ürün kartlarını oluştur ---------- */
  var grid = document.getElementById('productGrid');
  if (grid) {
    var html = '';
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      html +=
        '<article class="product-card reveal" data-name="' + p.name.toLowerCase() + '">' +
          '<div class="product-media">' +
            '<span class="product-emoji" aria-hidden="true">' + p.emoji + '</span>' +
            '<img class="product-img" src="' + p.img + '" alt="' + p.name + '" loading="lazy" onerror="this.remove()">' +
          '</div>' +
          '<h3>' + p.name + '</h3>' +
          '<p class="p-tag">' + p.tag + '</p>' +
          '<a class="btn btn-whatsapp order-btn" href="' + waLink(p.name) + '" target="_blank" rel="noopener">Sipariş Ver</a>' +
        '</article>';
    }
    grid.innerHTML = html;
  }

  /* ---------- Öne çıkan ürün butonlarına link ata ---------- */
  var orderBtns = document.querySelectorAll('.order-btn[data-product]');
  for (var j = 0; j < orderBtns.length; j++) {
    orderBtns[j].setAttribute('href', waLink(orderBtns[j].getAttribute('data-product')));
  }

  /* ---------- Ürün arama ---------- */
  var search = document.getElementById('productSearch');
  var noResult = document.getElementById('noResult');
  if (search && grid) {
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var cards = grid.querySelectorAll('.product-card');
      var shown = 0;
      for (var k = 0; k < cards.length; k++) {
        var match = cards[k].getAttribute('data-name').indexOf(q) !== -1;
        cards[k].style.display = match ? '' : 'none';
        if (match) shown++;
      }
      if (noResult) noResult.hidden = shown !== 0;
    });
  }

  /* ---------- Mobil menü ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Linke tıklayınca menüyü kapat
    var navLinks = nav.querySelectorAll('a');
    for (var l = 0; l < navLinks.length; l++) {
      navLinks[l].addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---------- Header gölge + aktif bölüm ---------- */
  var header = document.getElementById('header');
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = nav ? nav.querySelectorAll('a') : [];

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);

    var pos = window.scrollY + 120;
    var current = '';
    for (var s = 0; s < sections.length; s++) {
      if (sections[s].offsetTop <= pos) current = sections[s].id;
    }
    for (var a = 0; a < navAnchors.length; a++) {
      var href = navAnchors[a].getAttribute('href') || '';
      navAnchors[a].classList.toggle('active', href === '#' + current);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal animasyonu ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    for (var r = 0; r < reveals.length; r++) io.observe(reveals[r]);
  } else {
    for (var r2 = 0; r2 < reveals.length; r2++) reveals[r2].classList.add('visible');
  }

  /* ---------- Yıl ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
