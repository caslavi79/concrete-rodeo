/* GA4 conversion tracking — fires key events on contact / visit link clicks.
   Event delegation so it catches links anywhere on the page, current or future.
   Mirrors the West End Elixir / Citrus & Salt tracking convention. */
document.addEventListener("click", function (e) {
  var a = e.target.closest ? e.target.closest("a") : null;
  if (!a || typeof gtag !== "function") return;
  var href = a.getAttribute("href") || "";
  if (href.indexOf("mailto:") === 0) {
    gtag("event", "email_click");
  } else if (/google\.[^/]*\/maps|maps\.google\.|maps\.apple\./.test(href)) {
    gtag("event", "directions_click");
  } else if (/instagram\.com/.test(href)) {
    gtag("event", "instagram_click");
  } else if (/facebook\.com/.test(href)) {
    gtag("event", "facebook_click");
  } else if (/tiktok\.com/.test(href)) {
    gtag("event", "tiktok_click");
  }
});
