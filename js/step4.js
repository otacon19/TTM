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
        const value = L[i][2] || 0;
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
          window.location.href = 'step6.html';
        }
      });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
