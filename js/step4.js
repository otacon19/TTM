// js/step4.js

(() => {
  'use strict';

   function t(key, data={}) {
      if (window.TTM?.t) {
        const str = window.TTM.t(key) || '';
        return str.replace(/\{(\w+)\}/g, (_,k) => (data[k] != null ? String(data[k]) : '{'+k+'}'));
      }
      return key;
    }

    function hasTiesInUtilities(utils, tol = 1e-6) {
      // utils es un array de números ya normalizados (value scale)
      // true si existen dos valores (de índices distintos) iguales dentro de la tolerancia
      const seen = new Map();
      for (let i = 0; i < utils.length; i++) {
        const key = Math.round(utils[i] / tol); // discretizamos por tolerancia
        if (seen.has(key)) return true;
        seen.set(key, true);
      }
      return false;
    }    

    function movieLabel(i){ const tmpl = t('movie_placeholder') || 'Object {i}'; return tmpl.replace('{i}', String(i+1)); }

    const movies = (localStorage.getItem('movies') || '').split(',').filter(Boolean);
    const n = movies.length;
    const L = JSON.parse(localStorage.getItem('matrixL') || '[]');

    function generatePR(L) {
      const A = Array.from({length:n}, ()=>Array(n).fill(0));
      const N = Array.from({length:n}, ()=>Array(n).fill(0));
      for (let i=0;i<n;i++){ A[i][i]=0; N[i][i]=1; }
      for (let i=0;i<Math.min(L.length, n); i++) {
        const r1 = Math.floor(L[i][0]);
        const r2 = Math.floor(L[i][1]);
        const value = L[i][2] || 1;
        A[r1][r2] = value; A[r2][r1] = -value;
        N[r1][r2]=N[r2][r1]=1;
      }
      const w = Math.floor(L[Math.max(0, n-2)]?.[0] || 0);
      for (let i=0; i<n-1; i++) {
        const li  = Math.floor(L[Math.max(0, n-2-i)]?.[1] || 0);
        const idx = Math.floor(L[Math.max(0, n-2-i)]?.[0] || 0);
        if (N[w][li] === 0) {
          A[w][li] = A[w][idx] + A[idx][li];
          A[li][w] = -A[w][li];
          N[w][li]=N[li][w]=1;
        }
      }
      for (let i=0;i<n-1;i++){
        for (let j=i+1;j<n;j++){
          if (N[i][j]===0){
            A[i][j]=A[i][w]+A[w][j];
            A[j][i]=-A[i][j];
            N[i][j]=N[j][i]=1;
          }
        }
      }
      return A;
    }

    function calculateScores(matrix) {
      let max = -Infinity, colIndex = -1;
      matrix.forEach(row => row.forEach((val,j)=>{
        if(val>max){ max=val; colIndex=j; }
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

    const tieExists = !!window.__STEP4_TIE_EXISTS__;

    if (tieExists) {
      // Caso EMPATE: solo habilitamos P1, deshabilitamos P2 y mostramos nota de empate
      cardsFieldset.classList.add('disabled-question');
      cardsFieldset.disabled = true;
      noteCardsTie.style.display = 'block';
      noteCardsDisabled.style.display = 'none'; // esta nota es para el flujo "rankNo"
      noteRecompare.style.display = 'none';     // se mostrará si eligen "No" en P1 (más abajo)
  
      // El botón depende de P1 (como siempre). Aquí NO cambiamos la ruta.
      if (rankNo) {
        noteRecompare.style.display = 'block';
        continueBtn.textContent = t('step4r_continue_recompare');
        continueBtn.setAttribute('data-next', 'edit_ranking');
      } else {
        continueBtn.textContent = t('step4r_continue_finish');
        continueBtn.setAttribute('data-next', 'finish');
      }
      return; // importante: no continuar con la lógica "normal"
    }

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

    function init(){
      if(window.TTM?.refresh) window.TTM.refresh();

      const A = generatePR(L);
      const { max, column } = calculateScores(A);
      const maxAbs = Math.max(1, Math.abs(max || 1));

      // Guardamos resultados para siguientes pasos
      localStorage.setItem('scores_column', JSON.stringify(column));
      localStorage.setItem('scores_max', String(max));

      // Ranking best→worst
      const order = Array.from({length:n}, (_,i)=>i).sort((a,b)=> column[b]-column[a]);
      localStorage.setItem('lastComputedOrder', JSON.stringify(order));

      const tbody = document.getElementById('rankBody');
      tbody.innerHTML = '';
      for(let i=0; i<order.length; i++){
        const idx = order[i];
        const tr = document.createElement('tr');

        const tdRank = document.createElement('td'); tdRank.className='rank-num'; tdRank.textContent = i+1;
        const tdMovie = document.createElement('td');
        const chip = document.createElement('span'); chip.className='movie-chip'; chip.textContent = movieLabel(idx); tdMovie.appendChild(chip);

        const tdScale = document.createElement('td');
        tdScale.textContent = (column[idx]/maxAbs).toFixed(3);

        const tdUnits = document.createElement('td');
        tdUnits.textContent = column[idx];

        tr.append(tdRank, tdMovie, tdScale, tdUnits);
        tbody.appendChild(tr);
      }

      // ... tras calcular column, max y utilities y pintar la tabla:
      const tieExists = hasTiesInUtilities(column);
      window.__STEP4_TIE_EXISTS__ = tieExists; // lo usamos en updateQuestionsUI


       // Preguntas iniciales
        document.querySelector('input[name="rankOk"][value="yes"]').checked = true;
        document.querySelector('input[name="cardsOk"][value="yes"]').checked = true;

        document.querySelectorAll('input[name="rankOk"]').forEach(el => el.addEventListener('change', updateQuestionsUI));
        document.querySelectorAll('input[name="cardsOk"]').forEach(el => el.addEventListener('change', updateQuestionsUI));

        updateQuestionsUI();

        document.getElementById('continueBtn').addEventListener('click', ()=>{
        const rankOk = document.querySelector('input[name="rankOk"]:checked')?.value;
        const cardsOk = document.querySelector('input[name="cardsOk"]:checked')?.value;

        if(rankOk === 'no'){
          localStorage.setItem('reviewDecision','reorder_ranking');
          window.location.href = 'step4_1.html';
        } else if(cardsOk === 'no'){
          localStorage.setItem('reviewDecision','adjust_cards');
          window.location.href = 'step5.html';
        } else {
          localStorage.setItem('reviewDecision','finish');
          window.location.href = 'goodbye.html';
        }
      });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
