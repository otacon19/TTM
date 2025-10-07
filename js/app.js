/* js/app.js — UX común (lenguaje y formularios), SIN i18n interno */
(() => {
  function validatePresence(inputEl, buttonEl) {
    if (!inputEl || !buttonEl) return true;
    const empty = !inputEl.value.trim();
    inputEl.classList.toggle("invalid", empty);
    buttonEl.disabled = empty;
    return !empty;
  }

  function bindLanguageButtons() {
    const btnEn = document.getElementById("btn-en");
    const btnEs = document.getElementById("btn-es");
    if (btnEn) btnEn.addEventListener("click", () => TTM.setLanguage("en"));
    if (btnEs) btnEs.addEventListener("click", () => TTM.setLanguage("es"));
  }

  function bindLandingFormIfPresent() {
    const form = document.getElementById("form");
    const nameBox = document.getElementById("name_box");
    const nextBtn = document.getElementById("nextButton");
    if (!form) return;

    const onInput = () => validatePresence(nameBox, nextBtn);
    nameBox && nameBox.addEventListener("input", onInput);

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (!validatePresence(nameBox, nextBtn)) return;
      if (nameBox) localStorage.setItem("user_name", nameBox.value.trim());
      const nextUrl = form.getAttribute("data-next") || "step1.html";
      window.location.href = nextUrl;
    });

    onInput();
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
