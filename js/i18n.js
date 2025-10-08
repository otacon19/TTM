/* js/i18n.js — SOLO i18n (traducción) */
(() => {
  const I18N = {
    en: {
      index_title: "Tournament Tree Model",
      index_description:
        "The purpose of this survey is to evaluate a preference collection methodology and check whether the results obtained are in line with the user's preferences. To do so, we will ask you to list some objects and compare them with each other.",
      index_name_label: "Your name",
      index_name_placeholder: "Enter your name",
      index_next_button: "Next",
      
      step1_title: "Number of objects to compare",
      step1_description: "Introduce the number of objects to compare. Select between 4 and 6.",

      step2_title: "Name of objects",
      step2_description: "Introduce the name of the objects.",
      
      step3_title: "Deck of cards",
      step3_choose_preferred:
        "Choose which object you prefer (left or right). Then add cards to express how strong that preference is. If you do not choose and leave 0 cards, it's a tie.",
      
      step4r_title: "Review your ranking",
      step4r_intro: "We computed a ranking and values scale from your comparisons. You can review them below.",
      step4_movies_label: "Objects",
      step4_movie_placeholder: "Object {i}", 
      step4_tie_prefix: "It's a tie between",
      step4_wins_connector: "wins against",
      step4_and: "and",

      step4r_col_title: "Your ranking",
      step4r_col_rank: "Rank",
      step4r_col_movie: "Object",
      step4r_col_scale: "Value scale",
      step4r_q_rank_ok: "Are you satisfied with the ranking?",
      step4r_q_cards_ok: "Are you satisfied with the number of cards?",
      step4r_yes: "Yes",
      step4r_no: "No",
      step4r_continue: "Continue",
      step4r_cards_panel_title: "Deck of cards",
      step4r_logic_note_recompare:
        "Because you're not satisfied with the ranking, next we will compare adjacent pairs from your current ranking: Top 1 vs Top 2, Top 2 vs Top 3, and so on.",
      step4r_logic_note_cards_disabled:
        "The card question is disabled when the ranking will be recomputed from adjacent comparisons.",
      step4r_continue_recompare: "Re-compare",
      step4r_continue_adjust: "Adjust cards",
      step4r_continue_finish: "Finish",
      step4r_ranking: "Ranking",

      step5_title_table: "Previous ranking",
      step5_title: "Adjust cards",
      step5_right_title: "Adjust cards",
      step5_left_prev_cards_header: "Previous cards",
      step5_left_prev_cards_note:
        "“Previous cards” are the distance in terms of cards to the next object in the ranking.",
      step5_live_title: "Current ranking",
      step5_left_curr_cards_header: "Current cards",
      step5_left_curr_cards_note:
        "This table updates automatically as you adjust the cards on the right. If all decks are 0, you will see “–” in the value scale.",
      step5_intro_adjust:
        "Adjust the preference cards. We prefilled values from previous steps; feel free to change them.",
      step5_intro_recompare:
        "Review and adjust preference gaps between adjacent pairs in your ranking (we start from 0).",
      step5_continue: "Finish",
      step5_left_accum_header: "Units",

      goodbye_title: "Thank you for participating!",
      goodbye_text:
        "We have recorded your responses and your ranking. You can close this window.",
    
    },
    es: {
      index_title: "Tournament Tree Model",
      index_description:
        "Esta encuesta tiene como objetivo evaluar una metodología de recolección de opiniones y comprobar si los resultados obtenidos se ajustan a las preferencias del usuario. Para ello, le pediremos que enumere una serie de objetos y los compare entre sí.",
      index_name_label: "Tu nombre",
      index_name_placeholder: "Introduce tu nombre",
      index_next_button: "Siguiente",

      step1_title: "Número de objetos a comparar",
      step1_description:
        "Introduce el número de objetos a comparar. Puedes escoger entre 4 y 6.",

      step2_title: "Nombre de objetos",
      step2_description: "Introduce el nombre de los objetos.",

      step3_title: "Baraja de cartas",
      step3_choose_preferred:
        "Elige qué objeto prefieres (izquierda o derecha). Después añade cartas para indicar la intensidad. Si no eliges y dejas 0 cartas, es un empate.",
    
      step4_movies_label: "Objetos",
      step4_movie_placeholder: "Objeto {i}", 
     
      step4_title: "Cartas",
      step4_tie_prefix: "Hay empate entre",
      step4_wins_connector: "gana a",
      step4_and: "y",
      step4r_title: "Revisa tu ranking",
      step4r_intro:
        "Hemos calculado un ranking y utilidades a partir de tus comparaciones. Revísalos aquí.",

      step4r_col_title: "Tu ranking",
      step4r_col_rank: "Puesto",
      step4r_col_movie: "Objeto",
      step4r_col_scale: "Escala de valores",
      step4r_q_rank_ok: "¿Estás de acuerdo con el ranking?",
      step4r_q_cards_ok: "¿Estás de acuerdo con el número de cartas?",
      step4r_yes: "Sí",
      step4r_no: "No",
      step4r_continue: "Continuar",
      step4r_cards_panel_title: "Baraja de cartas",
      step4r_logic_note_recompare:
        "Como no estás satisfecho con el ranking, en el siguiente paso compararemos pares adyacentes de tu ranking actual: Top 1 vs Top 2, Top 2 vs Top 3, y así sucesivamente.",
      step4r_logic_note_cards_disabled:
        "La pregunta sobre cartas se desactiva cuando el ranking se va a recalcular a partir de comparaciones adyacentes.",
      step4r_continue_recompare: "Volver a comparar",
      step4r_continue_adjust: "Ajustar cartas",
      step4r_continue_finish: "Finalizar",
      step4r_ranking: "Ranking",
      
      step5_title_table: "Ranking previo",
      step5_title: "Ajustar cartas",
      step5_right_title: "Adjustar cartas",
      step5_left_prev_cards_header: "Distancia cartas",
      step5_left_prev_cards_note:
        "Distancia cartas” representa la diferencia de cartas con respecto al siguiente objeto en el ranking.",
      step5_live_title: "Ranking actual",
      step5_left_curr_cards_header: "Cartas actuales",
      step5_left_curr_cards_note:
        "Esta tabla se actualiza automáticamente a medida que ajustas las cartas de la derecha. Si todas las barajas son 0, verás «–» en la escala de valores.",
      step5_intro_adjust:
        "Ajuste los intervalos de preferencia (cartas). Hemos rellenado previamente los valores a partir de los pasos anteriores; no dude en modificarlos.",
      step5_intro_recompare:
        "Revisa y ajusta las diferencias de preferencia entre pares adyacentes en tu clasificación (empezamos desde 0).",
      step5_continue: "Finalizar",
      step5_left_accum_header: "Unidades",
      
      goodbye_title: "¡Gracias por participar!",
      goodbye_text:
        "Hemos registrado tus respuestas y tu ranking. Puedes cerrar esta ventana.",   
    },
  };

  const getLang = () =>
    localStorage.getItem("language") ||
    ((navigator.language || "en").startsWith("es") ? "es" : "en");

  function formatTemplate(str, data = {}) {
    if (typeof str !== "string") return str;
    return str.replace(/\{(\w+)\}/g, (_, k) =>
      data[k] != null ? String(data[k]) : `{${k}}`
    );
  }

  function setNodeText(node, text) {
    if (!node) return;
    node.textContent = text ?? "";
  }
  function setNodePlaceholder(node, text) {
    if (!node) return;
    node.placeholder = text ?? "";
  }

  function applyToDom(lang) {
    const L = I18N[lang] ?? I18N.en;

    // data-i18n genérico (incluye placeholders con {i})
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key) return;
      const tmpl = L[key];
      if (tmpl == null) return;

      const index = node.getAttribute("data-i");
      const value = formatTemplate(tmpl, { i: index });

      const tag = node.tagName;
      const type = (node.getAttribute && node.getAttribute("type")) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || type === "text") {
        setNodePlaceholder(node, value);
      } else {
        setNodeText(node, value);
      }
    });

    document.documentElement.lang = lang;
  }

  function setLanguage(lang) {
    const L = I18N[lang] ?? I18N.en;
    localStorage.setItem("language", lang);
    applyToDom(lang);
    return L;
  }

  // API pública de i18n (sin ningún otro comportamiento)
  window.TTM = {
    t: (key) => (I18N[localStorage.getItem("language") || "en"] || I18N.en)[key],
    setLanguage,
    getLanguage: getLang,
    refresh: () => applyToDom(localStorage.getItem("language") || getLang()),
    format: formatTemplate,
  };
})();
