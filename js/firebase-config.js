// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtNuRWHgQvlShi1N3sVQBWQpyaxfaS-QU",
  authDomain: "ttm-dss.firebaseapp.com",
  projectId: "ttm-dss",
  storageBucket: "ttm-dss.firebasestorage.app",
  messagingSenderId: "82658000744",
  appId: "1:82658000744:web:dcdc1079ae653724bf20dd",
  measurementId: "G-KCZN76NZPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };