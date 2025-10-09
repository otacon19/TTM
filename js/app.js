/* js/app.js — UX común (lenguaje y formularios), SIN i18n interno */
(() => {
  function bindLanguageButtons() {
    const btnEn = document.getElementById("btn-en");
    const btnEs = document.getElementById("btn-es");
    if (btnEn) btnEn.addEventListener("click", () => TTM.setLanguage("en"));
    if (btnEs) btnEs.addEventListener("click", () => TTM.setLanguage("es"));
  }

  function bindLandingFormIfPresent() {
    const form = document.getElementById("form");
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      window.location.href = "step1.html";
    });
  }

  function init() {
    // Aplica traducción a todo el DOM con el idioma actual
    TTM.refresh();
    // Enlaza UX común (no-i18n)
    bindLanguageButtons();
    bindLandingFormIfPresent();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
