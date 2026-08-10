(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const reveal = () => {
    document.body.classList.add("is-ready");
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveal();
    return;
  }

  if (document.readyState === "complete") {
    requestAnimationFrame(reveal);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(reveal), {
      once: true,
    });
  }
})();
