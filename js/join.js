import { db } from './firebase-config.js';

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('joinProblemForm');
    const problemCodeInput = document.getElementById('problemCode');
    const participantNameInput = document.getElementById('participantName');
    const joinError = document.getElementById('joinError');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const code = problemCodeInput.value.trim().toUpperCase();
        const participantName = participantNameInput.value.trim();

        if (!participantName) {
            joinError.hidden = false;
            joinError.textContent = window.TTM?.t('participant_name_error') || 'Please enter your name.';
            return;
        }

        const problemRef = doc(db, "problems", code);

        const problemSnapshot = await getDoc(problemRef);

        if (!problemSnapshot.exists()) {
            joinError.hidden = false;
            return;
        }

        const problem = problemSnapshot.data();

        if (problem.status === "closed") {
            joinError.hidden = false;
            joinError.textContent = window.TTM?.t('problem_closed') || 'This problem is closed and no longer accepts responses.';
            return;
        }

        if (!problem) {
            joinError.hidden = false;
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