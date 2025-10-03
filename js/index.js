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
        step2_description: "Introduce the name of the movies.",
        movies_label: "Movies",
        movie_placeholder: "Movie {i}",
        step3_choose_preferred: "Choose which movie you prefer (left or right). Then add 0–50 cards to express how strong that preference is. If you do not choose and leave 0 cards, it's a tie.",
        step4_title: "Preference gaps (cards)",
        step4_description: "We show the number of cards (gap) between consecutive movies in your final ranking: 1st–2nd, 2nd–3rd, and so on. More cards ⇒ larger preference gap.",
        step4_preference: "How satisfied are you with the result?",
        step4_satisfaction_label: "Satisfaction degree: {label}",
        send_button: "Send",
        vs_label: "vs",
        step4_tie_prefix: "It's a tie between",
        step4_wins_connector: "wins against",
        step4_and: "and",
        step4_intro: "These decks reflect your preferences derived from the pairwise comparisons in the previous step. If you wish, you can fine-tune each gap by adding or removing cards.",
        step4r_title: "Review your ranking",
        step4r_intro: "We computed a ranking and utilities from your comparisons. You can review them below.",
        step4r_col_rank: "Rank",
        step4r_col_movie: "Movie",
        step4r_col_utility: "Utility",
        step4r_q_rank_ok: "Are you satisfied with the ranking?",
        step4r_q_cards_ok: "Are you satisfied with the number of cards (gaps)?",
        step4r_yes: "Yes",
        step4r_no: "No",
        step4r_hint_drag: "Drag items to reorder (top = better)",
        step4r_continue: "Continue",
        step4r_cards_panel_title: "Preference gaps (cards)",
        step4r_logic_note_recompare: "Because you're not satisfied with the ranking, next we will compare adjacent pairs from your current ranking: Top 1 vs Top 2, Top 2 vs Top 3, and so on.",
        step4r_logic_note_cards_disabled: "The card question is disabled when the ranking will be recomputed from adjacent comparisons.",
        step4r_continue_recompare: "Re-compare",
        step4r_continue_adjust: "Adjust cards",
        step4r_continue_finish: "Finish",
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
        step2_description: "Introduce el nombre de las películas.",
        movies_label: "Películas",
        movie_placeholder: "Película {i}",
        step3_choose_preferred: "Elige qué película prefieres (izquierda o derecha). Después añade entre 0 y 50 cartas para indicar la intensidad. Si no eliges y dejas 0 cartas, es un empate.",
        step4_title: "Brechas de preferencia (cartas)",
        step4_description: "Mostramos el número de cartas (brecha) entre películas consecutivas en tu ranking final: 1ª–2ª, 2ª–3ª, etc. Más cartas ⇒ mayor diferencia de preferencia.",
        step4_preference: "¿Cómo de satisfecho estás con el resultado?",
        step4_satisfaction_label: "Grado de satisfacción: {label}",
        send_button: "Enviar",
        vs_label: "vs",
        step4_tie_prefix: "Hay empate entre",
        step4_wins_connector: "gana a",
        step4_and: "y",
        step4_intro: "Estos mazos reflejan tus preferencias obtenidas a partir de las comparaciones del paso anterior. Si lo deseas, puedes ajustar cada diferencia añadiendo o quitando cartas.",
        step4r_title: "Revisa tu ranking",
        step4r_intro: "Hemos calculado un ranking y utilidades a partir de tus comparaciones. Revísalos aquí.",
        step4r_col_rank: "Puesto",
        step4r_col_movie: "Película",
        step4r_col_utility: "Utilidad",
        step4r_q_rank_ok: "¿Estás de acuerdo con el ranking?",
        step4r_q_cards_ok: "¿Estás de acuerdo con el número de cartas (diferencias)?",
        step4r_yes: "Sí",
        step4r_no: "No",
        step4r_hint_drag: "Arrastra para reordenar (arriba = mejor)",
        step4r_continue: "Continuar",
        step4r_cards_panel_title: "Brechas de preferencia (cartas)",
        step4r_logic_note_recompare: "Como no estás satisfecho con el ranking, en el siguiente paso compararemos pares adyacentes de tu ranking actual: Top 1 vs Top 2, Top 2 vs Top 3, y así sucesivamente.",
        step4r_logic_note_cards_disabled: "La pregunta sobre cartas se desactiva cuando el ranking se va a recalcular a partir de comparaciones adyacentes.",
        step4r_continue_recompare: "Volver a comparar",
        step4r_continue_adjust: "Ajustar cartas",
        step4r_continue_finish: "Finalizar",
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

  function formatTemplate(str, data = {}) {
    if (typeof str !== 'string') return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (data[k] != null ? String(data[k]) : `{${k}}`));
  }

  function setTextIf(el, text, {attr = "text", data = {}} = {}) {
    if (!el || text == null) return;
    const value = formatTemplate(text, data);
    if (attr === "text") el.textContent = value;
    else if (attr === "placeholder") el.placeholder = value;
    else el.setAttribute(attr, value);
  }

  function applyLang(lang) {
    const L = I18N[lang] ?? I18N.en;
    localStorage.setItem("language", lang);

    // IDs concretos
    setTextIf(els.title(), L.title);

    // Descripción
    const descEl = els.description();
    const descKey = descEl?.getAttribute?.("data-i18n");
    if (descEl) {
      if (descKey && L[descKey] != null) setTextIf(descEl, L[descKey]);
      else if (!descKey) setTextIf(descEl, L.description);
    }

    setTextIf(els.nameLabel(), L.name_label);
    setTextIf(els.nameBox(), L.name_placeholder, {attr: "placeholder"});
    setTextIf(els.next(), L.next);
    setTextIf(els.thanks(), L.thanks);

    // data-i18n genérico
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      const txt = L[key];
      if (txt == null) return;

      const index = node.getAttribute("data-i");
      const formatted = formatTemplate(txt, { i: index });

      const tag = node.tagName;
      const type = (node.getAttribute && node.getAttribute('type')) || '';
      if (tag === "INPUT" || tag === "TEXTAREA") {
        setTextIf(node, formatted, {attr: "placeholder"});
      } else {
        setTextIf(node, formatted, {attr: "text"});
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

  function bindLanguageButtons() {
    const en = els.btnEn();
    const es = els.btnEs();
    if (en) en.addEventListener("click", () => applyLang("en"));
    if (es) es.addEventListener("click", () => applyLang("es"));
  }

  function init() {
    const lang = getLang();
    applyLang(lang);
    bindLanguageButtons();
    bindFormIfPresent();
  }

  // API global
  window.TTM = {
    setLanguage: applyLang,
    getLanguage: getLang,
    t: (key) => (I18N[localStorage.getItem("language") || "en"] || I18N.en)[key],
    refresh: () => applyLang(localStorage.getItem("language") || getLang()),
  };

  document.addEventListener("DOMContentLoaded", init);
})();