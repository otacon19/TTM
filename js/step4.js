// js/step4.js

(() => {
  'use strict';

  function t(key, data = {}) {
    if (window.TTM?.t) {
      const str = window.TTM.t(key) || '';
      return str.replace(/\{(\w+)\}/g, (_, k) => (data[k] != null ? String(data[k]) : `{${k}}`));
    }
    return key;
  }

  function movieLabel(i) {
    const tmpl = t('movie_placeholder') || 'Object {i}';
    return tmpl.replace('{i}', String(i + 1));
  }

  const movies = (localStorage.getItem('movies') || '').split(',').filter(Boolean);
  const n = movies.length;
  const L = JSON.parse(localStorage.getItem('matrixL') || '[]');

  // ==== cálculo de la matriz y utilidades ====
  function generatePR(L) {
    const A = Array.from({ length: n }, () => Array(n).fill(0));
    const N = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) { A[i][i] = 0; N[i][i] = 1; }
    for (let i = 0; i < Math.min(L.length, n); i++) {
      const r1 = Math.floor(L[i][0]), r2 = Math.floor(L[i][1]);
      const value = L[i][2] || 0;
      A[r1][r2] = value; A[r2][r1] = -value; N[r1][r2] = N[r2][r1] = 1;
    }
    const w = Math.floor(L[Math.max(0, n - 2)]?.[0] || 0);
    for (let i = 0; i < n - 1; i++) {
      const li = Math.floor(L[Math.max(0, n - 2 - i)]?.[1] || 0);
      const idx = Math.floor(L[Math.max(0, n - 2 - i)]?.[0] || 0);
      if (N[w][li] === 0) {
        A[w][li] = A[w][idx] + A[idx][li];
        A[li][w] = -A[w][li];
        N[w][li] = N[li][w] = 1;
      }
    }
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        if (N[i][j] === 0) {
          A[i][j] = A[i][w] + A[w][j];
          A[j][i] = -A[i][j];
          N[i][j] = N[j][i] = 1;
        }
      }
    }
    return A;
  }

  function calculateScores(matrix) {
    let max = -Infinity, colIndex = -1;
    matrix.forEach(row => row.forEach((val, j) => {
      if (val > max) { max = val; colIndex = j; }
    }));
    const column = matrix.map(row => row[colIndex]);
    return { max, column };
  }

  // ==== Control de preguntas ====
  function updateQuestionsUI() {
    const rankNo = document.querySelector('input[name="rankOk"][value="no"]').checked;
    const cardsFieldset = document.getElementById('cardsFieldset');
    const noteRecompare = document.getElementById('noteRecompare');
    const noteCardsDisabled = document.getElementById('noteCardsDisabled');
    const continueBtn = document.getElementById('continueBtn');

    if (rankNo) {
      // si no está de acuerdo con ranking, ignoramos cartas aquí
      cardsFieldset.classList.add('disabled-question');
      cardsFieldset.disabled = true;
      noteRecompare.style.display = 'block';
      noteCardsDisabled.style.display = 'block';
      continueBtn.textContent = t('step4r_continue_recompare');
      continueBtn.setAttribute('data-next', 'edit_ranking');
    } else {
      cardsFieldset.classList.remove('disabled-question');
      cardsFieldset.disabled = false;
      noteRecompare.style.display = 'none';
      noteCardsDisabled.style.display = 'none';
      const cardsNo = document.querySelector('input[name="cardsOk"][value="no"]').checked;
      continueBtn.textContent = cardsNo ? t('step4r_continue_adjust') : t('step4r_continue_finish');
      continueBtn.setAttribute('data-next', cardsNo ? 'adjust' : 'finish');
    }
  }

  // ==== Inicialización ====
  function init() {
    if (window.TTM?.refresh) window.TTM.refresh();

    const A = generatePR(L);
    const { max, column } = calculateScores(A);
    const maxVal = Math.max(1, Math.abs(max || 1));
    const utilities = column.map(v => v / maxVal);

    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => column[b] - column[a]);
    localStorage.setItem('lastComputedOrder', JSON.stringify(order)); // para step4_1 / step5

    // Pintar tabla sin capacidad de arrastrar
    const tbody = document.getElementById('rankBody');
    tbody.innerHTML = '';
    order.forEach((idx, i) => {
      const tr = document.createElement('tr');
      tr.dataset.idx = String(idx);

      const tdRank = document.createElement('td'); tdRank.className = 'rank-num'; tdRank.textContent = String(i + 1);
      const tdMovie = document.createElement('td');
      const chipEl = document.createElement('span'); chipEl.className = 'movie-chip';
      chipEl.textContent = movieLabel(idx); chipEl.title = movies[idx] || '';
      tdMovie.appendChild(chipEl);
      const tdUtil = document.createElement('td'); tdUtil.textContent = utilities[idx].toFixed(3);

      tr.append(tdRank, tdMovie, tdUtil);
      tbody.appendChild(tr);
    });

    // Preguntas iniciales
    document.querySelector('input[name="rankOk"][value="yes"]').checked = true;
    document.querySelector('input[name="cardsOk"][value="yes"]').checked = true;

    document.querySelectorAll('input[name="rankOk"]').forEach(el => el.addEventListener('change', updateQuestionsUI));
    document.querySelectorAll('input[name="cardsOk"]').forEach(el => el.addEventListener('change', updateQuestionsUI));
    updateQuestionsUI();

    document.getElementById('continueBtn').addEventListener('click', () => {
      const next = document.getElementById('continueBtn').getAttribute('data-next');

      if (next === 'edit_ranking') {
        // irá al 4.1 para reordenar
        localStorage.setItem('reviewDecision', 'recompare_sequential');
        window.location.href = 'step4_1.html';
        return;
      }
      if (next === 'adjust') {
        localStorage.setItem('reviewDecision', 'adjust_cards');
        window.location.href = 'step5.html';
        return;
      }
      // finish
      localStorage.setItem('reviewDecision', 'finish');
      window.location.href = 'goodbye.html';
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
