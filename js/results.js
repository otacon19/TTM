import { db } from './firebase-config.js';

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function saveCurrentParticipantResult(extraData = {}) {

  const problem = JSON.parse(localStorage.getItem('ttm_problem') || 'null');
  const participant = JSON.parse(localStorage.getItem('ttm_participant') || 'null');

  if (!problem || !participant) {
    return;
  }

  const result = {
    problemCode: problem.code,
    problemName: problem.name,
    participantName: participant.name,
    participantRole: participant.role,
    alternatives: problem.alternatives,
    //matrixL: JSON.parse(localStorage.getItem('matrixL') || '[]'),
    matrixL: JSON.stringify(JSON.parse(localStorage.getItem('matrixL') || '[]')),
    scoresColumn: JSON.parse(localStorage.getItem('scores_column') || '[]'),
    scoresMax: localStorage.getItem('scores_max'),
    rankingOrder: JSON.parse(localStorage.getItem('lastComputedOrder') || '[]'),
    reviewDecision: localStorage.getItem('reviewDecision') || null,
    //step5Cards: JSON.parse(localStorage.getItem('step5Cards') || 'null'),
    step5Cards: localStorage.getItem('step5Cards') || null,
    step5Mode: localStorage.getItem('step5Mode') || null,
    finishedAt: new Date().toISOString(),
    ...extraData
  };

  // LOCAL
  const allResults = JSON.parse(localStorage.getItem('ttm_results') || '{}');

  if (!allResults[problem.code]) {
    allResults[problem.code] = [];
  }

  const existingIndex = allResults[problem.code].findIndex(
    item => item.participantName === participant.name
  );

  if (existingIndex >= 0) {
    allResults[problem.code][existingIndex] = result;
  } else {
    allResults[problem.code].push(result);
  }

  localStorage.setItem('ttm_results', JSON.stringify(allResults));
  localStorage.setItem('ttm_last_result', JSON.stringify(result));

  // FIREBASE
  const resultId = `${problem.code}_${participant.name}`;

  await setDoc(
    doc(db, "results", resultId),
    result
  );
}