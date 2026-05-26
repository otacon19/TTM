import { db } from './firebase-config.js';

import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const problem = JSON.parse(localStorage.getItem('ttm_problem') || 'null');
    const storedCreatorCode = localStorage.getItem('ttm_creator_code');

    const problemInfo = document.getElementById('problemInfo');
    const resultsContainer = document.getElementById('resultsContainer');
    const toggleProblemStatusBtn =
        document.getElementById('toggleProblemStatusBtn');

    const exportJsonBtn = document.getElementById('exportJsonBtn');
    let latestResults = [];

    if (!problem) {
        problemInfo.innerHTML = `<p>${window.TTM?.t('no_active_problem') || 'No active problem found.'}</p>`;
        return;
    }

    if (storedCreatorCode !== problem.creatorCode) {
        const enteredCode = prompt(window.TTM?.t('creator_code_prompt') || 'Enter the creator code to view the results:');

        if (enteredCode !== problem.creatorCode) {
            problemInfo.innerHTML = `<p>${window.TTM?.t('creator_code_invalid') || 'Access denied. Invalid creator code.'}</p>`;
            resultsContainer.innerHTML = '';
            return;
        }

        localStorage.setItem('ttm_creator_code', enteredCode);

    }

    function refreshProblemStatusButton() {

        const isClosed = problem.status === 'closed';

        toggleProblemStatusBtn.textContent =
            isClosed
                ? (window.TTM?.t('reopen_problem') || 'Reopen problem')
                : (window.TTM?.t('close_problem') || 'Close problem');

        toggleProblemStatusBtn.classList.toggle('secondary', isClosed);
    }

    refreshProblemStatusButton();

    problemInfo.innerHTML = `
        <p><strong>${window.TTM?.t('results_problem') || 'Problem'}:</strong> ${problem.name}</p>
        <p><strong>${window.TTM?.t('results_code') || 'Code'}:</strong> ${problem.code}</p>
        <p><strong>${window.TTM?.t('results_alternatives') || 'Alternatives'}:</strong> ${problem.alternatives.join(', ')}</p>
        <p><strong>${window.TTM?.t('results_status') || 'Status'}:</strong> ${problem.status}</p>
        <p><strong>${window.TTM?.t('loading_results') || 'Loading results...'}</strong></p>
      `;

    toggleProblemStatusBtn.addEventListener('click', async () => {

        const newStatus =
            problem.status === 'closed'
                ? 'open'
                : 'closed';

        await updateDoc(
            doc(db, "problems", problem.code),
            {
                status: newStatus
            }
        );

        problem.status = newStatus;

        refreshProblemStatusButton();
    });

    const resultsQuery = query(
        collection(db, "results"),
        where("problemCode", "==", problem.code)
    );

    function downloadJson(filename, data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    }

    exportJsonBtn.addEventListener('click', () => {
        const exportData = {
            exportedAt: new Date().toISOString(),
            problem: {
                code: problem.code,
                name: problem.name,
                alternatives: problem.alternatives,
                status: problem.status,
                createdAt: problem.createdAt
            },
            results: latestResults.map(result => ({
                participant: {
                    name: result.participantName,
                    role: result.participantRole
                },
                ttmData: {
                    alternatives: result.alternatives,
                    matrixL: result.matrixL,
                    scoresColumn: result.scoresColumn,
                    scoresMax: result.scoresMax,
                    rankingOrder: result.rankingOrder,
                    rankingLabels: Array.isArray(result.rankingOrder)
                        ? result.rankingOrder.map(i => result.alternatives[i])
                        : [],
                    reviewDecision: result.reviewDecision,
                },
                metadata: {
                    completedFrom: result.completedFrom,
                    finishedAt: result.finishedAt
                }
            }))
        };

        downloadJson(
            `${problem.code}_ttm_results.json`,
            exportData
        );
    });

    onSnapshot(resultsQuery, (snapshot) => {
        const results = [];

        snapshot.forEach(documentSnapshot => {
            results.push(documentSnapshot.data());
        });

        latestResults = results;

        problemInfo.innerHTML = `
        <p><strong>${window.TTM?.t('results_problem') || 'Problem'}:</strong> ${problem.name}</p>
        <p><strong>${window.TTM?.t('results_code') || 'Code'}:</strong> ${problem.code}</p>
        <p><strong>${window.TTM?.t('results_alternatives') || 'Alternatives'}:</strong> ${problem.alternatives.join(', ')}</p>
        <p><strong>${window.TTM?.t('results_status') || 'Status'}:</strong> ${problem.status}</p>
        <p><strong>${window.TTM?.t('results_number_responses') || 'Number of responses'}:</strong> ${results.length}</p>
      `;

        if (results.length === 0) {
            resultsContainer.innerHTML = `<p>${window.TTM?.t('no_results_yet') || 'No participant results have been saved yet.'}</p>`;
            return;
        }

        resultsContainer.innerHTML = results.map((result, index) => {
            const ranking = Array.isArray(result.rankingOrder)
                ? result.rankingOrder.map(i => result.alternatives[i] ?? `Alternative ${i + 1}`).join(' > ')
                : (window.TTM?.t('no_ranking_available') || 'No ranking available');

            return `
          <div class="result-card">
            <h3>${window.TTM?.t('participant') || 'Participant'} ${index + 1}: ${result.participantName}</h3>
            <p><strong>${window.TTM?.t('results_role') || 'Role'}:</strong> ${result.participantRole}</p>
            <p><strong>${window.TTM?.t('results_ranking') || 'Ranking'}:</strong> ${ranking}</p>
            <p><strong>${window.TTM?.t('results_review_decision') || 'Review decision'}:</strong> ${result.reviewDecision || '-'}</p>
            <p><strong>${window.TTM?.t('results_completed_from') || 'Completed from'}:</strong> ${result.completedFrom || '-'}</p>
            <p><strong>${window.TTM?.t('results_finished_at') || 'Finished at'}:</strong> ${result.finishedAt || '-'}</p>
          </div>
        `;
        }).join('');
    });
});