import { db } from './firebase-config.js';

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('adminForm');

    const problemCodeInput =
        document.getElementById('problemCode');

    const creatorCodeInput =
        document.getElementById('creatorCode');

    const adminError =
        document.getElementById('adminError');

    form.addEventListener('submit', async (ev) => {

        ev.preventDefault();

        adminError.hidden = true;

        const problemCode =
            problemCodeInput.value.trim().toUpperCase();

        const creatorCode =
            creatorCodeInput.value.trim().toUpperCase();

        try {

            const problemRef =
                doc(db, "problems", problemCode);

            const snapshot =
                await getDoc(problemRef);

            if (!snapshot.exists()) {

                adminError.textContent =
                    window.TTM?.t('problem_not_found')
                    || 'Problem not found.';

                adminError.hidden = false;

                return;
            }

            const problem = snapshot.data();

            if (problem.creatorCode !== creatorCode) {

                adminError.textContent =
                    window.TTM?.t('creator_code_invalid')
                    || 'Invalid creator code.';

                adminError.hidden = false;

                return;
            }

            localStorage.setItem(
                'ttm_problem',
                JSON.stringify(problem)
            );

            localStorage.setItem(
                'ttm_creator_code',
                creatorCode
            );

            window.location.href = 'results.html';

        } catch (error) {

            console.error(error);

            adminError.textContent =
                window.TTM?.t('unexpected_error')
                || 'Unexpected error.';

            adminError.hidden = false;
        }
    });
});