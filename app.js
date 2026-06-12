/* =========================================================================
   Concrete Rodeo — shared front-end behavior. Vanilla JS, no dependencies.
   Nav, FAQ accordion, event filtering, scroll reveal, Events/FAQ sub-tabs.
   ========================================================================= */
(function () {
  "use strict";

  /* Mobile nav toggle — hamburger opens the slide-down menu; any link closes it. */
  function initNav() {
    var burger = document.getElementById("navBurger");
    var menu = document.getElementById("mobileMenu");
    if (!burger || !menu) return;
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* FAQ accordion — multiple panels can be open; answer reveal is a max-height
     transition. Toggles aria-expanded for assistive tech. */
  function initFaq() {
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        var willOpen = !item.classList.contains("open");
        item.classList.toggle("open", willOpen);
        q.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });
  }

  /* Events filtering — category chips toggle visibility of [data-cat] cards.
     "all" shows everything. Active chip gets .active. */
  function initEventsFilter() {
    var chips = document.querySelectorAll("[data-filter]");
    if (!chips.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        document.querySelectorAll("[data-cat]").forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-cat") === f;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* Reveal on scroll — fade/slide in. Honors prefers-reduced-motion via CSS. */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Events / FAQ sticky sub-tabs — scroll-spy + smooth jump. Only runs when
     both sections are present (the Events & FAQ page). */
  function initSubtabs() {
    var tabs = document.querySelectorAll(".subtab");
    var events = document.getElementById("events");
    var faq = document.getElementById("faq");
    if (!tabs.length || !events || !faq) return;
    function setActive(id) {
      tabs.forEach(function (t) {
        t.classList.toggle("active", t.getAttribute("data-sub") === id);
      });
    }
    window.addEventListener("scroll", function () {
      var line = window.scrollY + window.innerHeight * 0.35;
      setActive(line >= faq.offsetTop ? "faq" : "events");
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initFaq();
    initEventsFilter();
    initReveal();
    initSubtabs();
  });
})();
