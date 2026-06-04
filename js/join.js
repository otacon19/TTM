import { db } from './firebase-config.js';

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('joinProblemForm');
    const problemCodeInput = document.getElementById('problemCode');

    const params = new URLSearchParams(window.location.search);

    const codeFromUrl = params.get('code');

    if (codeFromUrl) {
        problemCodeInput.value = codeFromUrl.toUpperCase();
    }

    const participantNameInput = document.getElementById('participantName');
    const joinError = document.getElementById('joinError');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        joinError.hidden = true;
        joinError.textContent = '';

        const code = problemCodeInput.value.trim().toUpperCase();
        const participantName = participantNameInput.value.trim();

        const problemRef = doc(db, "problems", code);
        const problemSnapshot = await getDoc(problemRef);

        if (!problemSnapshot.exists()) {
            joinError.hidden = false;
            joinError.textContent =
                window.TTM?.t('join_error') ||
                'No problem was found with that code.';
            return;
        }

        const problem = problemSnapshot.data();

        if (problem.status === "closed") {
            joinError.hidden = false;
            joinError.textContent =
                window.TTM?.t('problem_closed') ||
                'This problem is closed and no longer accepts responses.';
            return;
        }

        localStorage.setItem('ttm_problem', JSON.stringify(problem));
        localStorage.removeItem('ttm_creator_code');

        localStorage.setItem('ttm_participant', JSON.stringify({
            name: participantName,
            role: 'participant'
        }));

        localStorage.setItem('n', String(problem.alternatives.length));
        localStorage.setItem('movies', problem.alternatives.join(','));

        window.location.href = 'step3.html';
    });
});