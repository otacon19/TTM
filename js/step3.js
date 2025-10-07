// js/step3.js
(() => {
    'use strict';
  
    let round = 0;
    const textValues = (localStorage.getItem('movies') || '').split(',').filter(Boolean);
    const n = textValues.length;
  
    // Matriz L: [ganador, perdedor, intensidad] (intensidad: 0=empate, >0 = cartas+1)
    let L = Array.from({ length: n }, () => Array(3).fill(0.0));
    let Lindex = 0;
  
    function half(x) { return [Math.floor(x / 2), x % 2]; }
  
    function comparisons(n) {
      const nRounds = Math.ceil(Math.log2(n));
      const arr = new Array(nRounds).fill(0);
      let r = 0; let [C, R] = half(n); arr[r] = C;
      while (!(C === 1 && R === 0)) { r++; [C, R] = half(C + R); arr[r] = C; }
      return arr.map(Math.floor);
    }
  
    const comp = comparisons(n);
  
    let winList = Array.from({ length: n }, (_, i) => i);
    let newWinList = [];
  
    const rowsState = {}; // {pref: 'left'|'right'|null, count: number}
  
    function labelForIndex(idx) {
      const tmpl = (window.TTM?.t('movie_placeholder')) || 'Object {i}';
      return tmpl.replace('{i}', String(idx + 1));
    }
  
    // Cartas (UI)
    const SUITS = [
      { s: '♠', cls: 'suit-black' },
      { s: '♣', cls: 'suit-black' },
      { s: '♥', cls: 'suit-red' },
      { s: '♦', cls: 'suit-red' },
    ];
    const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  
    function makeCard(i) {
      const div = document.createElement('div');
      div.className = 'card-tile';
      const face = document.createElement('div'); face.className = 'card-face';
      const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
      const rank = RANKS[Math.floor(Math.random() * RANKS.length)];
      div.classList.add(suit.cls);
      const rEl = document.createElement('div'); rEl.className = 'card-rank'; rEl.textContent = rank;
      const sEl = document.createElement('div'); sEl.className = 'card-suit'; sEl.textContent = suit.s;
      face.append(rEl, sEl); div.appendChild(face);
      return div;
    }
  
    function renderPile(container, count) {
      container.innerHTML = '';
      const MAX_CARDS = 200;
      const capped = Math.min(MAX_CARDS, Math.max(0, parseInt(count || '0', 10)));
  
      const PADDING = 12;
      const CARD_W = 90, CARD_H = 128;
      const STEP_X = 10;  // más cartas por fila (solapa)
      const STEP_Y = 6;
  
      const innerW = container.clientWidth - 2 * PADDING;
      const innerH = container.clientHeight - 2 * PADDING;
      const cols = Math.max(1, Math.floor(innerW / STEP_X) + 1);
      const maxTop = innerH - CARD_H;
  
      for (let i = 0; i < capped; i++) {
        const col = Math.min(i % cols, Math.floor((innerW - CARD_W) / STEP_X));
        const row = Math.floor(i / cols);
        const left = PADDING + Math.min(col * STEP_X, innerW - CARD_W);
        const top  = PADDING + Math.min(row * STEP_Y, Math.max(0, maxTop));
  
        const card = makeCard(i);
        const jitter = (Math.random() * 6 - 3);
        card.style.left = left + 'px';
        card.style.top  = top + 'px';
        card.style.transform = `rotate(${jitter}deg)`;
        card.style.zIndex = String(10 + i);
        container.appendChild(card);
      }
    }
  
    function buildRow(rowIndex, leftIdx, rightIdx) {
      const grid = document.getElementById('pairsGrid');
      const row  = document.createElement('div');
      row.className = 'pair-row';
  
      const prefCol = document.createElement('div');
  
      // Elección de preferida
      const choices = document.createElement('div'); choices.className = 'pref-choices';
      const leftChoice  = document.createElement('label');
      const rightChoice = document.createElement('label');
      const leftRadio   = document.createElement('input');  leftRadio.type = 'radio';  leftRadio.name = `pref-${rowIndex}`; leftRadio.value = 'left';
      const rightRadio  = document.createElement('input'); rightRadio.type = 'radio'; rightRadio.name = `pref-${rowIndex}`; rightRadio.value = 'right';
      const leftText    = document.createElement('span'); leftText.className = 'movie-chip'; leftText.textContent  = labelForIndex(leftIdx);  leftText.title  = textValues[leftIdx];
      const rightText   = document.createElement('span'); rightText.className= 'movie-chip'; rightText.textContent = labelForIndex(rightIdx); rightText.title = textValues[rightIdx];
      leftChoice.append(leftRadio, leftText);
      rightChoice.append(rightRadio, rightText);
      choices.append(leftChoice, rightChoice);
  
      // Mazo + controles
      const pile = document.createElement('div'); pile.className = 'card-pile';
  
      const ctrls = document.createElement('div'); ctrls.className = 'controls';
      const minus = document.createElement('button'); minus.className = 'ctrl-btn'; minus.textContent = '−';
      const input = document.createElement('input');  input.className = 'ctrl-input'; input.type = 'number'; input.min = '0'; input.max = '50'; input.step = '1'; input.value = '0';
      const plus  = document.createElement('button'); plus.className  = 'ctrl-btn'; plus.textContent = '+';
      ctrls.append(minus, input, plus);
  
      prefCol.append(choices, pile, ctrls);
      row.append(prefCol);
      grid.appendChild(row);
  
      rowsState[rowIndex] = { pref: null, count: 0 };
      setControlsEnabled(false);
      renderPile(pile, 0);
  
      function clamp(v) {
        v = parseInt(v || '0', 10);
        if (isNaN(v)) v = 0;
        return Math.max(0, Math.min(50, v));
      }
  
      function setControlsEnabled(enabled) {
        minus.disabled = !enabled;
        input.disabled = !enabled;
        plus.disabled  = !enabled;
      }
  
      function updateProgress() {
        const roundButton = document.getElementById('roundButton');
        const nextButton  = document.getElementById('nextButton');
        const lastRound   = (round + 1 === comp.length);
        // Empate (sin elegir y 0 cartas) es válido; la navegación depende de si es la última ronda.
        roundButton.disabled = lastRound;
        nextButton.disabled  = !lastRound;
      }
  
      function onPrefChange(side) {
        rowsState[rowIndex].pref = side;
        rowsState[rowIndex].count = 0;
        input.value = '0';
        renderPile(pile, 0);
        setControlsEnabled(!!side);
        updateProgress();
      }
  
      function onCountChange() {
        const c = clamp(input.value);
        input.value = c;
        rowsState[rowIndex].count = c;
        renderPile(pile, c);
        updateProgress();
      }
  
      leftRadio.addEventListener('change', () => { if (leftRadio.checked)  onPrefChange('left');  });
      rightRadio.addEventListener('change', () => { if (rightRadio.checked) onPrefChange('right'); });
      minus.addEventListener('click', (e) => { e.preventDefault(); const cur = clamp(input.value); if (cur > 0) { input.value = cur - 1; onCountChange(); } });
      plus .addEventListener('click', (e) => { e.preventDefault(); const cur = clamp(input.value); if (cur < 50) { input.value = cur + 1; onCountChange(); } });
      input.addEventListener('input', onCountChange);
    }
  
    function updateMatricesForPair(aIndex, bIndex, prefSide, count) {
      const a = winList[aIndex], b = winList[bIndex];
  
      // Empate (0 cartas o sin elegir): intensidad 0 y pasa 'a' arbitrariamente
      if (!prefSide || count === 0) {
        L[Lindex][0] = a; L[Lindex][1] = b; L[Lindex][2] = 0;
        newWinList.push(a);
        Lindex++; return;
      }
  
      if (prefSide === 'left') {
        L[Lindex][0] = a; L[Lindex][1] = b; L[Lindex][2] = count + 1; newWinList.push(a);
      } else {
        L[Lindex][0] = b; L[Lindex][1] = a; L[Lindex][2] = count + 1; newWinList.push(b);
      }
      Lindex++;
    }
  
    function runRound() {
      const rows = document.querySelectorAll('#pairsGrid .pair-row');
      rows.forEach((row, i) => {
        const st = rowsState[i] || { pref: null, count: 0 };
        updateMatricesForPair(2 * i, 2 * i + 1, st.pref, st.count);
      });
  
      if (winList.length % 2 === 1) newWinList.push(winList[winList.length - 1]);
      winList = newWinList; newWinList = [];
  
      const grid = document.getElementById('pairsGrid');
      grid.innerHTML = '';
      Object.keys(rowsState).forEach(k => delete rowsState[k]);
  
      const newRows = Math.floor(winList.length / 2);
      for (let j = 0; j < newRows; j++) buildRow(j, winList[2 * j], winList[2 * j + 1]);
  
      round++;
      if (window.TTM?.refresh) window.TTM.refresh();
  
      // Actualiza botones con el nuevo estado
      const roundButton = document.getElementById('roundButton');
      const nextButton  = document.getElementById('nextButton');
      const lastRound   = (round + 1 === comp.length);
      roundButton.disabled = lastRound;
      nextButton.disabled  = !lastRound;
    }
  
    function goToNextStep() {
      // si quedaban rondas pendientes, las completamos
      if (round < comp.length) runRound();
  
      // último ganador para cerrar L
      L[Lindex][0] = winList[winList.length - 1];
      L[Lindex][1] = winList[winList.length - 1];
      L[Lindex][2] = 0;
  
      localStorage.setItem('matrixL', JSON.stringify(L));
      window.location.href = 'step4.html';
    }
  
    // Wire-up de botones (ahora que están fuera del inline)
    function wireButtons() {
      document.getElementById('roundButton').addEventListener('click', runRound);
      document.getElementById('nextButton').addEventListener('click', goToNextStep);
    }
  
    function init() {
      // construir primera ronda
      const rows = Math.floor(winList.length / 2);
      const grid = document.getElementById('pairsGrid');
      grid.innerHTML = '';
      for (let i = 0; i < rows; i++) buildRow(i, 2 * i, 2 * i + 1);
  
      // estado inicial de botones
      const roundButton = document.getElementById('roundButton');
      const nextButton  = document.getElementById('nextButton');
      roundButton.disabled = (round + 1 === comp.length);
      nextButton.disabled  = !(round + 1 === comp.length);
  
      wireButtons();
      if (window.TTM?.refresh) window.TTM.refresh();
    }
  
    document.addEventListener('DOMContentLoaded', init);
  })();
  