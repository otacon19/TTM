/*
  index.js — i18n + UX base para todas las vistas
  - Maneja idioma (en/es) con persistencia en localStorage
  - Aplica textos a elementos por ID y por data-i18n
  - Valida el campo de nombre (si existe) y controla el botón Next
  - Es defensivo: si un elemento no existe en una vista, no falla
*/

(() => {
    const I18N = {
      en: {
        title: "Tournament Tree Model · Survey",
        description:
          "The purpose of this survey is to evaluate a preference collection methodology and check whether the results obtained are in line with the user's preferences. To do so, we will ask you to list your favorite movies and compare them with each other.",
        name_label: "Your name",
        name_placeholder: "Enter your name",
        next: "Next",
        thanks: "Thank you for participating in the survey!",
        step1_description: "Introduce the number of movies to compare. Select between 4 and 6 movies.",
        movies_number: "Number of movies",
      },
      es: {
        title: "Tournament Tree Model · Encuesta",
        description:
          "Esta encuesta tiene como objetivo evaluar una metodología de recolección de opiniones y comprobar si los resultados obtenidos se ajustan a las preferencias del usuario. Para ello, le pediremos que enumere sus películas favoritas y las compare entre sí.",
        name_label: "Tu nombre",
        name_placeholder: "Introduce tu nombre",
        next: "Siguiente",
        thanks: "¡Gracias por participar en la encuesta!",
        step1_description: "Introduce el número de películas a comparar. Puedes escoger entre 4 y 6 películas.",
        movies_number: "Número de películas",
      },
    };
  
    const els = {
      title: () => document.getElementById("title"),
      description: () => document.getElementById("description"),
      nameLabel: () => document.getElementById("name_label"),
      nameBox: () => document.getElementById("name_box"),
      next: () => document.getElementById("nextButton"),
      thanks: () => document.getElementById("thanks"),
      form: () => document.getElementById("form"),
      btnEn: () => document.getElementById("btn-en"),
      btnEs: () => document.getElementById("btn-es"),
    };
  
    const getLang = () => localStorage.getItem("language")
      || ((navigator.language || "en").startsWith("es") ? "es" : "en");
  
    function setTextIf(el, text, {attr = "text"} = {}) {
      if (!el || text == null) return;
      if (attr === "text") el.textContent = text;
      else if (attr === "placeholder") el.placeholder = text;
      else el.setAttribute(attr, text);
    }
  
    function applyLang(lang) {
      const L = I18N[lang] ?? I18N.en;
      localStorage.setItem("language", lang);
  
      // IDs concretos (si existen en la vista actual)
      setTextIf(els.title(), L.title);
      // Sólo sobrescribir descripción si la clave existe para la vista
      const descEl = els.description();
      const key = descEl?.getAttribute?.("data-i18n");
      if (key && L[key] != null) setTextIf(descEl, L[key]);
      else if (!key) setTextIf(descEl, L.description);
  
      setTextIf(els.nameLabel(), L.name_label);
      setTextIf(els.nameBox(), L.name_placeholder, {attr: "placeholder"});
      setTextIf(els.next(), L.next);
      setTextIf(els.thanks(), L.thanks);
  
      // data-i18n genérico: <span data-i18n="key"></span>
      document.querySelectorAll("[data-i18n]").forEach(node => {
        const k = node.getAttribute("data-i18n");
        if (!k) return;
        const txt = L[k];
        if (txt == null) return;
        if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
          node.setAttribute("placeholder", txt);
        } else {
          node.textContent = txt;
        }
      });
  
      document.documentElement.lang = lang;
    }
  
    function validatePresence(inputEl, buttonEl) {
      if (!inputEl || !buttonEl) return true;
      const empty = !inputEl.value.trim();
      inputEl.classList.toggle("invalid", empty);
      buttonEl.disabled = empty;
      return !empty;
    }
  
    function bindFormIfPresent() {
      const form = els.form();
      const nameBox = els.nameBox();
      const nextBtn = els.next();
      if (!form) return; // otra vista sin formulario
  
      const onInput = () => validatePresence(nameBox, nextBtn);
      nameBox && nameBox.addEventListener("input", onInput);
  
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        if (!validatePresence(nameBox, nextBtn)) return;
        if (nameBox) localStorage.setItem("user_name", nameBox.value.trim());
        // Por defecto, avanzar a step1.html si no se define otra acción
        const nextUrl = form.getAttribute("data-next") || "step1.html";
        window.location.href = nextUrl;
      });
  
      // Estado inicial de validación
      onInput();
    }
  
    function bindLanguageButtons() {
      const en = els.btnEn();
      const es = els.btnEs();
      if (en) en.addEventListener("click", () => applyLang("en"));
      if (es) es.addEventListener("click", () => applyLang("es"));
    }
  
    function init() {
      // Idioma
      const lang = getLang();
      applyLang(lang);
  
      // Enlaces para cambiar idioma
      bindLanguageButtons();
  
      // Formulario (si existe en la vista)
      bindFormIfPresent();
    }
  
    // Exponer utilidades globales por si quieres usarlas en otras vistas
    window.TTM = {
      setLanguage: applyLang,
      getLanguage: getLang,
      t: (key) => (I18N[localStorage.getItem("language") || "en"] || I18N.en)[key],
    };
  
    document.addEventListener("DOMContentLoaded", init);
  })();
  