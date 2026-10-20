/* ============================================================
   Après-Ski Party Gossau – Script
   Mobile-Navigation, aktuelles Jahr im Footer, Scroll-Reveal,
   Cookie-Consent (localStorage) & verzögertes Laden von Google Maps
   ============================================================ */
(function () {
  "use strict";

  var CONSENT_KEY = "apresSkiCookieConsent";

  /* ---------- Beim Neuladen immer zuoberst starten ----------
     Ohne das springt der Browser beim Refresh zurück zum zuletzt
     angesteuerten Abschnitt (z. B. #faq) bzw. zur alten Scrollposition.
     Ein frisch geöffneter Link mit Anker (z. B. geteilt als …/#tickets)
     funktioniert weiterhin normal. */
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function isReload() {
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      if (nav && nav.type) return nav.type === "reload";
      return !!(performance.navigation && performance.navigation.type === 1);
    } catch (e) {
      return false;
    }
  }

  if (isReload()) {
    var root = document.documentElement;
    var prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    window.scrollTo(0, 0);
    window.addEventListener("load", function () {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prevBehavior;
    });
  }

  /* ---------- Aktuelles Jahr im Footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Mobile Navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".navlinks");
  var navOverlay = document.querySelector(".nav-overlay");

  function closeNav() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    if (navOverlay) navOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function toggleNav() {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (navOverlay) navOverlay.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", toggleNav);
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    if (navOverlay) navOverlay.addEventListener("click", closeNav);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Navigation: Hintergrund beim Scrollen ---------- */
  var navEl = document.querySelector("nav");
  if (navEl) {
    var updateNav = function () {
      navEl.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  }

  /* ---------- Flyer: Grossansicht ---------- */
  document.querySelectorAll("[data-lightbox]").forEach(function (link) {
    var dialog = document.getElementById(link.getAttribute("data-lightbox"));
    if (!dialog || typeof dialog.showModal !== "function") return; // ältere Browser: Link öffnet das Bild normal
    link.addEventListener("click", function (e) {
      e.preventDefault();
      dialog.showModal();
    });
    dialog.addEventListener("click", function (e) {
      // Klick auf den abgedunkelten Hintergrund oder das Schliessen-Kreuz schliesst die Ansicht
      if (e.target === dialog || e.target.hasAttribute("data-lightbox-close")) dialog.close();
    });
  });

  /* ---------- Flyer: Teilen (nur wo das Gerät es unterstützt, v. a. Smartphones) ---------- */
  var shareBtn = document.getElementById("flyerShare");
  if (shareBtn && navigator.share) {
    shareBtn.hidden = false;
    shareBtn.addEventListener("click", function () {
      var data = {
        title: "Après-Ski Party Gossau – 17.04.2027",
        text: "Après-Ski Party mit dem Skiclub Gossau – Sa, 17.04.2027, ab 14 Uhr, Markthalle Gossau. Gratis-Shot im Après-Ski-Outfit!",
        url: location.origin && location.origin !== "null" ? location.origin + location.pathname : undefined
      };
      var flyerUrl = "flyer/apres-ski-party-2027-flyer.jpg";
      var shareLink = function () {
        return navigator.share(data).catch(function () {});
      };
      if (!window.fetch || !window.File || !navigator.canShare) {
        shareLink();
        return;
      }
      fetch(flyerUrl)
        .then(function (r) { return r.blob(); })
        .then(function (blob) {
          var file = new File([blob], "Apres-Ski-Party-Gossau-2027-Flyer.jpg", { type: "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            return navigator.share({ files: [file], title: data.title, text: data.text }).catch(function () {});
          }
          return shareLink();
        })
        .catch(shareLink);
    });
  }

  /* ---------- Scroll-Reveal ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && !reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Cookie-Consent ---------- */

  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    consent.necessary = true;
    consent.timestamp = new Date().toISOString();
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (e) {
      /* localStorage evtl. nicht verfügbar (z.B. Private Mode) – Website funktioniert trotzdem */
    }
    return consent;
  }

  var banner = document.getElementById("cookieBanner");
  var modalOverlay = document.getElementById("cookieModal");
  var mapsToggle = document.getElementById("consentMaps");

  function showBanner() {
    if (banner) banner.hidden = false;
  }
  function hideBanner() {
    if (banner) banner.hidden = true;
  }
  function showModal() {
    if (!modalOverlay) return;
    var current = getConsent() || { maps: false };
    if (mapsToggle) mapsToggle.checked = !!current.maps;
    modalOverlay.hidden = false;
  }
  function hideModal() {
    if (modalOverlay) modalOverlay.hidden = true;
  }

  function loadMap(container) {
    if (!container || container.dataset.loaded === "true") return;
    var src = container.getAttribute("data-map-src");
    if (!src) return;
    container.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = "Karte: Markthalle Gossau";
    iframe.setAttribute("allowfullscreen", "");
    container.appendChild(iframe);
    container.dataset.loaded = "true";
  }

  function showMapPlaceholder(container) {
    if (!container) return;
    container.dataset.loaded = "false";
    var p = document.createElement("div");
    p.className = "map-placeholder";
    p.innerHTML =
      '<p>Um die Karte anzuzeigen, wird eine Verbindung zu Google Maps hergestellt und dabei werden Daten an Google übertragen. Weitere Infos in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<button type="button">Karte laden</button>';
    p.querySelector("button").addEventListener("click", function () {
      var c = saveConsent(Object.assign(getConsent() || {}, { maps: true }));
      applyConsent(c);
    });
    container.innerHTML = "";
    container.appendChild(p);
  }

  function applyConsent(consent) {
    document.querySelectorAll(".map-container[data-map-src]").forEach(function (container) {
      if (consent && consent.maps) {
        loadMap(container);
      } else {
        showMapPlaceholder(container);
      }
    });
  }

  function init() {
    var consent = getConsent();
    if (consent) {
      applyConsent(consent);
      hideBanner();
    } else {
      // Ohne Entscheidung: Karte grundsätzlich nicht laden, nur Platzhalter zeigen
      applyConsent({ maps: false });
      showBanner();
    }
  }

  var acceptAllBtn = document.getElementById("cookieAcceptAll");
  var acceptNecessaryBtn = document.getElementById("cookieAcceptNecessary");
  var openSettingsBtn = document.getElementById("cookieOpenSettings");
  var modalSaveBtn = document.getElementById("cookieModalSave");
  var modalAcceptAllBtn = document.getElementById("cookieModalAcceptAll");
  var modalCloseEls = document.querySelectorAll("[data-cookie-modal-close]");
  var footerSettingsBtn = document.getElementById("footerCookieSettings");

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", function () {
      applyConsent(saveConsent({ maps: true }));
      hideBanner();
    });
  }
  if (acceptNecessaryBtn) {
    acceptNecessaryBtn.addEventListener("click", function () {
      applyConsent(saveConsent({ maps: false }));
      hideBanner();
    });
  }
  if (openSettingsBtn) {
    openSettingsBtn.addEventListener("click", showModal);
  }
  if (footerSettingsBtn) {
    footerSettingsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showModal();
    });
  }
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener("click", function () {
      var consent = saveConsent({ maps: mapsToggle ? mapsToggle.checked : false });
      applyConsent(consent);
      hideModal();
      hideBanner();
    });
  }
  if (modalAcceptAllBtn) {
    modalAcceptAllBtn.addEventListener("click", function () {
      if (mapsToggle) mapsToggle.checked = true;
      var consent = saveConsent({ maps: true });
      applyConsent(consent);
      hideModal();
      hideBanner();
    });
  }
  modalCloseEls.forEach(function (el) {
    el.addEventListener("click", hideModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideModal();
  });

  document.addEventListener("DOMContentLoaded", init);
})();
