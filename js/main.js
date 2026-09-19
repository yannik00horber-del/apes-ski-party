/* ============================================================
   Après-Ski Party Gossau – Script
   Mobile-Navigation, aktuelles Jahr im Footer,
   Cookie-Consent (localStorage) & verzögertes Laden von Google Maps
   ============================================================ */
(function () {
  "use strict";

  var CONSENT_KEY = "apresSkiCookieConsent";

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
