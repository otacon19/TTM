
import { db } from './firebase-config.js';

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createProblemForm');
    const problemNameInput = document.getElementById('problemName');
    const alternativesNumberInput = document.getElementById('alternativesNumber');
    const creatorNameInput = document.getElementById('creatorName');
    const alternativesList = document.getElementById('alternativesList');
    const createButton = document.getElementById('createProblemButton');

    function getNumberOfAlternatives() {
        return Math.max(3, Math.min(50, parseInt(alternativesNumberInput.value || '3', 10)));
    }

    function renderAlternativeInputs() {
        const n = getNumberOfAlternatives();
        alternativesList.innerHTML = '';

        for (let i = 1; i <= n; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'input text-box';
            input.setAttribute('data-i18n', 'movie_placeholder');
            input.setAttribute('data-i', String(i));
            input.addEventListener('input', validateForm);
            alternativesList.appendChild(input);
        }

        if (window.TTM?.refresh) window.TTM.refresh();
        validateForm();
    }

    function validateForm() {
        const alternatives = Array.from(alternativesList.querySelectorAll('input'));
        const hasProblemName = problemNameInput.value.trim().length > 0;
        const hasCreatorName = creatorNameInput.value.trim().length > 0;
        const allAlternativesFilled = alternatives.every(input => input.value.trim().length > 0);

        createButton.disabled = !(hasProblemName && hasCreatorName && allAlternativesFilled);
    }

    alternativesNumberInput.addEventListener('change', renderAlternativeInputs);
    alternativesNumberInput.addEventListener('input', renderAlternativeInputs);
    problemNameInput.addEventListener('input', validateForm);
    creatorNameInput.addEventListener('input', validateForm);

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const alternatives = Array.from(alternativesList.querySelectorAll('input'))
            .map(input => input.value.trim());

        const problemCode = 'TTM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const creatorCode = 'ADM-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        const problem = {
            code: problemCode,
            creatorCode: creatorCode,
            name: problemNameInput.value.trim(),
            alternatives: alternatives,
            status: "open",
            createdAt: new Date().toISOString()
        };

        const problems = JSON.parse(localStorage.getItem('ttm_problems') || '{}');
        problems[problemCode] = problem;

        localStorage.setItem('ttm_problems', JSON.stringify(problems));
        localStorage.setItem('ttm_problem', JSON.stringify(problem));
        localStorage.setItem('ttm_creator_code', creatorCode);

        await setDoc(
            doc(db, "problems", problemCode),
            problem
        );
        localStorage.setItem('ttm_participant', JSON.stringify({
            name: creatorNameInput.value.trim(),
            role: 'creator'
        }));
        localStorage.setItem('n', String(alternatives.length));
        localStorage.setItem('movies', alternatives.join(','));

        window.location.href = 'problem-created.html';
    });

    renderAlternativeInputs();
});