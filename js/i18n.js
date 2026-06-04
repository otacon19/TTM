/* js/i18n.js — SOLO i18n (traducción) */
(() => {
  const I18N = {
    en: {

      // ======================================================
      // HOME
      // ======================================================

      home_title: "Tournament Tree Method",
      home_description:
        "Select whether you want to create a new problem or participate in an existing one.",
      home_create_title: "Create a problem",
      home_create_description:
        "Create a new decision problem and define the alternatives to compare.",
      home_join_title: "Participate in a problem",
      home_join_description:
        "Access an existing problem using a participation code.",

      // ===========================================
      // CREATE PROBLEM
      // ======================================================  

      create_title: "Create a problem",
      create_description:
        "Define the problem and the alternatives that participants will compare.",
      create_problem_name_label: "Problem name",
      create_problem_name_placeholder: "Enter the problem name",
      create_alternatives_number_label: "Number of alternatives",
      create_alternatives_names_label: "Alternative names",
      create_problem_button: "Create problem",

      // ======================================================
      // JOIN PROBLEM
      // ======================================================

      join_title: "Participate in a problem",
      join_description:
        "Enter the problem code provided by the creator.",
      join_code_label: "Problem code",
      join_button: "Access problem",
      join_error:
        "No problem was found with that code.",
      problem_code_error: "Please enter the problem code.",

      // ======================================================
      // PROBLEM CREATED
      // ======================================================

      problem_created_title: "Problem created",
      problem_created_description:
        "Share this code with the participants so they can access the problem.",
      participant_name_label: "Your name or alias",
      participant_name_placeholder: "Enter your name or alias",
      participant_name_error: "Please enter your name or alias.",
      participation_code_title: "Participation code",
      copy_code: "Copy code",
      copied: "Copied!",
      qr_code_title: "QR code",
      qr_code_description:
        "Participants can scan this QR code to access the problem directly.",

      // ======================================================
      // ADMIN
      // ======================================================

      admin_access_title: "Manage problem",
      admin_access_description: "Access the problem management to view results and manage its status.",
      admin_description:
        "Enter the problem code and the private creator code to access the results dashboard.",
      creator_code_title: "Creator code",
      creator_code_description:
        "Keep this code private. You will need it to view the results.",
      creator_code_prompt: "Enter the creator code to view the results:",
      creator_code_invalid: "Access denied. Invalid creator code.",
      problem_code: "Problem code",
      creator_code: "Creator code",
      problem_not_found: "Problem not found.",
      unexpected_error: "Unexpected error.",

      // ======================================================
      // RESULTS
      // ======================================================        

      results_title: "Problem results",
      results_participants_title: "Participants",

      no_active_problem: "No active problem found.",
      no_results_yet: "No participant results have been saved yet.",
      problem_closed: "This problem is closed and no longer accepts responses.",
      close_problem: "Close problem",
      reopen_problem: "Reopen problem",
      results_problem: "Problem",
      results_code: "Code",
      results_alternatives: "Alternatives",
      results_status: "Status",
      results_number_responses: "Number of responses",
      results_role: "Role",
      results_ranking: "Ranking",
      results_review_decision: "Review decision",
      results_completed_from: "Completed from",
      results_finished_at: "Finished at",
      no_ranking_available: "No ranking available",
      loading_results: "Loading results...",
      export_json: "Export JSON",
      view_results: "View results",
      download_results: "Download results",

      // ======================================================
      // COMMON
      // ======================================================      

      back_home: "Back to home",
      back: "Back",
      evaluate: "Evaluate",
      participant: "Participant",

      // ======================================================
      // STEP 1
      // ======================================================

      step1_title: "Number of objects to compare",
      step1_description: "Introduce the number of objects to compare. Select between 3 and 6.",

      // =====================================================
      // STEP 2
      // ======================================================

      step2_title: "Name of objects",
      step2_description: "Introduce the name of the objects.",

      // ======================================================
      // STEP 3
      // ======================================================

      step3_title: "Deck of cards",
      step3_choose_preferred:
        "Choose which object you prefer (left or right). Then add cards to express the differences of attractiveness between the objects. Notice 0 cards does not mean indifference, means the difference between objects is minimal (e.g. equals to one unit).",
      step3_progress: "Step 3 of 5",
      step3_info_title: "What are you doing?",
      step3_info_description:
        "Choose the object you prefer and use cards to indicate how strong the preference is.",
      step3_info_few_cards: "Few cards",
      step3_info_few_cards_explanation: "objects are similar",
      step3_info_many_cards: "Many cards",
      step3_info_many_cards_explanation: "objects are very different",

      // ======================================================
      // STEP 4
      // ======================================================

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
      step4r_col_units: "Units",

      step4r_q_rank_ok: "Are you satisfied with the ranking?",
      step4r_q_cards_ok: "Are you satisfied with the number of cards?",
      step4r_yes: "Yes",
      step4r_no: "No",
      step4r_continue: "Continue",
      step4r_cards_panel_title: "Deck of cards",

      step4r_logic_note_recompare:
        "Since you disagree with the ranking, in the next step we will ask you to define the ranking that you consider correct according to your preferences.",
      step4r_logic_note_cards_disabled:
        "The card question is disabled when the ranking will be recomputed from adjacent comparisons.",
      step4r_logic_note_tie:
        "We detected a tie in the value scale. The cards question is disabled. Please break the tie by reviewing the ranking first.",

      step4r_continue_recompare: "Re-compare",
      step4r_continue_adjust: "Adjust cards",
      step4r_continue_finish: "Finish",
      step4r_ranking: "Ranking",

      step4r_hint_drag:
        "Indicate the ranking of the objects you consider correct by dragging the rows of the table up or down.",
      step4_1_continue_recompare: "Use this ranking",

      step4_progress: "Step 4 of 5",

      step4_info_title: "What are you doing?",

      step4_info_description:
        "The system computed a ranking and value scale from your comparisons. Review the results and decide whether you want to modify them.",

      step4_info_option_accept:
        "✔ Accept the ranking if it reflects your preferences",

      step4_info_option_reorder:
        "✔ Reorder the objects if the ranking is incorrect",

      step4_info_option_adjust:
        "✔ Adjust the cards if the differences are not accurate",

      step4_1_progress: "Step 4 of 5",

      step4_1_info_title: "What are you doing?",

      step4_1_info_description:
        "Reorder the objects to indicate the ranking that best reflects your preferences.",

      step4_1_info_drag:
        "✔ Drag rows up or down to change the ranking",

      step4_1_info_top:
        "✔ The top object represents your most preferred option",

      // ======================================================
      // STEP 5
      // ======================================================

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
      step5_intro:
        "Here you can adjust the difference of attractiveness between the objects by manipulating the number of cards.",
      step5_continue: "Finish",
      step5_left_accum_header: "Units",
      step5_progress: "Step 5 of 5",

      step5_info_title: "What are you doing?",

      step5_info_description:
        "Adjust the number of cards to indicate how different the objects are from each other.",

      step5_info_small_difference:
        "✔ Few cards → objects are more similar",

      step5_info_large_difference:
        "✔ Many cards → objects are more different",

      // ======================================================
      // GOODBYE
      // ======================================================

      goodbye_title: "Thank you for using the tool!",
      goodbye_restart: "Start over",
      goodbye_saved: "Your response has been saved successfully.",

    },
    es: {

      // ======================================================
      // HOME
      // ======================================================

      home_title: "Tournament Tree Method",
      home_description:
        "Seleccione si desea crear un nuevo problema o participar en uno existente.",
      home_create_title: "Crear un problema",
      home_create_description:
        "Cree un nuevo problema de decisión y defina las alternativas a comparar.",
      home_join_title: "Participar en un problema",
      home_join_description:
        "Acceda a un problema existente mediante un código de participación.",

      // ======================================================
      // CREATE PROBLEM
      // ======================================================

      create_title: "Crear un problema",
      create_description:
        "Defina el problema y las alternativas que los participantes deberán comparar.",
      create_problem_name_label: "Nombre del problema",
      create_problem_name_placeholder: "Introduzca el nombre del problema",
      create_alternatives_number_label: "Número de alternativas",
      create_alternatives_names_label: "Nombres de las alternativas",
      create_problem_button: "Crear problema",

      // ======================================================
      // JOIN PROBLEM
      // ======================================================

      join_title: "Participar en un problema",
      join_description: "Introduzca el código del problema proporcionado por el creador.",
      join_code_label: "Código del problema",
      join_button: "Acceder al problema",
      join_error: "No se ha encontrado ningún problema con ese código.",
      problem_code_error: "Introduzca el código del problema.",

      // ======================================================
      // PROBLEM CREATED
      // ======================================================

      problem_created_title: "Problema creado",
      problem_created_description:
        "Comparta este código con los participantes para que puedan acceder al problema.",
      participant_name_label: "Su nombre o alias",
      participant_name_placeholder: "Introduzca su nombre o alias",
      participant_name_error:
        "Introduzca su nombre o alias.",
      participation_code_title: "Código de participación",
      results_title: "Resultados del problema",
      results_participants_title: "Participantes",
      copy_code: "Copiar código",
      copied: "¡Copiado!",
      qr_code_title: "Código QR",
      qr_code_description:
        "Los participantes pueden escanear este código QR para acceder directamente al problema.",

      // ======================================================
      // ADMIN
      // ======================================================

      admin_access_title: "Administrar problema",
      admin_access_description: "Acceda a la administración del problema para ver resultados y gestionar su estado.",
      problem_code: "Código del problema",
      creator_code: "Código de creador",
      creator_code_title: "Código de creador",
      creator_code_description:
        "Mantenga este código en privado. Lo necesitará para ver los resultados.",
      problem_not_found: "Problema no encontrado.",
      unexpected_error: "Error inesperado.",
      admin_description:
        "Introduzca el código del problema y el código privado de creador para acceder al panel de resultados.",
      creator_code_prompt: "Introduzca el código de creador para ver los resultados:",
      creator_code_invalid: "Acceso denegado. Código de creador no válido.",
      no_active_problem: "No se ha encontrado ningún problema activo.",

      no_results_yet: "Aún no se ha guardado ningún resultado de participantes.",
      problem_closed: "Este problema está cerrado y ya no acepta más respuestas.",
      close_problem: "Cerrar problema",
      reopen_problem: "Reabrir problema",

      // ======================================================
      // RESULTS
      // ======================================================

      results_problem: "Problema",
      results_code: "Código",
      results_alternatives: "Alternativas",
      results_status: "Estado",
      results_number_responses: "Número de respuestas",
      results_role: "Rol",
      results_ranking: "Ranking",
      results_review_decision: "Decisión de revisión",
      results_completed_from: "Completado desde",
      results_finished_at: "Finalizado el",
      no_ranking_available: "Ranking no disponible",
      view_results: "Ver resultados",
      loading_results: "Cargando resultados...",
      export_json: "Exportar JSON",
      download_results: "Descargar resultados",


      // ======================================================
      // COMMON
      // ======================================================
      back_home: "Volver al inicio",
      evaluate: "Evaluar",
      participant: "Participante",
      back: "Volver",

      // ======================================================
      // STEP 1
      // ======================================================

      step1_title: "Número de objetos a comparar",
      step1_description:
        "Introduce el número de objetos a comparar. Puedes escoger entre 3 y 6.",

      // ======================================================
      // STEP 2
      // ======================================================

      step2_title: "Nombre de objetos",
      step2_description: "Introduce el nombre de los objetos.",


      // ======================================================
      // STEP 3
      // ======================================================

      step3_title: "Baraja de cartas",
      step3_choose_preferred:
        "Elige el objeto que prefieras (izquierda o derecha). A continuación, añade tarjetas para expresar las diferencias de atractivo entre los objetos. Ten en cuenta que 0 tarjetas no significa indiferencia, sino que la diferencia entre los objetos es mínima (igual a una unidad).",

      step3_progress: "Paso 3 de 5",
      step3_info_title: "¿Qué está haciendo?",
      step3_info_description:
        "Elija el objeto que prefiere y utilice cartas para indicar la intensidad de esa preferencia.",
      step3_info_few_cards: "Pocas cartas",
      step3_info_few_cards_explanation: "los objetos son similares",
      step3_info_many_cards: "Muchas cartas",
      step3_info_many_cards_explanation: "los objetos son muy diferentes",

      // ======================================================
      // STEP 4
      // ======================================================

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
      step4r_col_units: "Unidades",

      step4r_q_rank_ok: "¿Estás de acuerdo con el ranking?",
      step4r_q_cards_ok: "¿Estás de acuerdo con el número de cartas?",
      step4r_yes: "Sí",
      step4r_no: "No",
      step4r_continue: "Continuar",
      step4r_cards_panel_title: "Baraja de cartas",

      step4r_logic_note_recompare:
        "Dado que no está de acuerdo con el ranking, en el siguiente paso le pediremos que defina el ranking que considere correcto según sus preferencias",
      step4r_logic_note_cards_disabled:
        "La pregunta sobre cartas se desactiva cuando el ranking se va a recalcular a partir de comparaciones adyacentes.",
      step4r_logic_note_tie:
        "Se ha detectado un empate en la escala de valores. La pregunta sobre cartas queda desactivada. Por favor, rompe el empate revisando el ranking primero.",

      step4r_continue_recompare: "Volver a comparar",
      step4r_continue_adjust: "Ajustar cartas",
      step4r_continue_finish: "Finalizar",
      step4r_ranking: "Ranking",

      step4r_hint_drag: "Indique cuál es el ranking de los objetos que considera el correcto arrastrando las filas de la tabla arriba o abajo (uno es el mejor).",
      step4_1_continue_recompare: "Usar este ranking",

      step4_progress: "Paso 4 de 5",

      step4_info_title: "¿Qué está haciendo?",

      step4_info_description:
        "El sistema ha calculado un ranking y una escala de valores a partir de sus comparaciones. Revise los resultados y decida si desea modificarlos.",

      step4_info_option_accept:
        "✔ Acepte el ranking si refleja sus preferencias",

      step4_info_option_reorder:
        "✔ Reordene los objetos si el ranking es incorrecto",

      step4_info_option_adjust:
        "✔ Ajuste las cartas si las diferencias no son adecuadas",

      step4_1_progress: "Paso 4 de 5",

      step4_1_info_title: "¿Qué está haciendo?",

      step4_1_info_description:
        "Reordene los objetos para indicar el ranking que mejor refleja sus preferencias.",

      step4_1_info_drag:
        "✔ Arrastre las filas hacia arriba o abajo para cambiar el ranking",

      step4_1_info_top:
        "✔ El objeto superior representa su opción preferida",

      // ======================================================
      // STEP 5
      // ======================================================

      step5_title_table: "Ranking previo",
      step5_title: "Ajustar cartas",
      step5_right_title: "Ajustar cartas",
      step5_left_prev_cards_header: "Distancia cartas",
      step5_left_prev_cards_note:
        "Distancia cartas” representa la diferencia de cartas con respecto al siguiente objeto en el ranking.",
      step5_live_title: "Ranking actual",
      step5_left_curr_cards_header: "Cartas actuales",
      step5_left_curr_cards_note:
        "Esta tabla se actualiza automáticamente a medida que ajustas las cartas de la derecha. Si todas las barajas son 0, verás «–» en la escala de valores.",
      step5_intro:
        "Aquí puede ajustar la diferencia de preferencia entre los objetos manipulando el número de cartas.",
      step5_continue: "Finalizar",
      step5_left_accum_header: "Unidades",

      step5_progress: "Paso 5 de 5",

      step5_info_title: "¿Qué está haciendo?",

      step5_info_description:
        "Ajuste el número de cartas para indicar cuánto se diferencian los objetos entre sí.",

      step5_info_small_difference:
        "✔ Pocas cartas → los objetos son más similares",

      step5_info_large_difference:
        "✔ Muchas cartas → los objetos son más diferentes",

      // ======================================================
      // GOODBYE
      // ======================================================

      goodbye_title: "¡Gracias por usar la herramienta!",
      goodbye_restart: "Volver a empezar",
      goodbye_saved: "Su respuesta se ha guardado correctamente.",

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
