// ---------------------------
// script.js
// ---------------------------

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ---------------------------
// Firebase Configuration
// ---------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBvJpARNfHPu8j8E99_3CIsNbSBVzBCFQA",
  authDomain: "amkfac-c85a0.firebaseapp.com",
  projectId: "amkfac-c85a0",
  storageBucket: "amkfac-c85a0.firebasestorage.app",
  messagingSenderId: "320355813529",
  appId: "1:320355813529:web:a2e979ad989f95acbb5008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------
// Save Scenario Function
// ---------------------------
window.saveScenario = async function() {
  // Get values from form
  const scenarioNumber = document.getElementById("scenarioNumber").value;
  const casualtyName = document.getElementById("casualtyName").value;
  const injuries = document.getElementById("injuries").value;
  const whatHappened = document.getElementById("whatHappened").value;
  const medicalHistory = document.getElementById("medicalHistory").value;
  const allergies = document.getElementById("allergies").value;
  const lastMeal = document.getElementById("lastMeal").value;

  // Simple validation
  if (!scenarioNumber || !casualtyName) {
    alert("Scenario number and casualty name are required!");
    return;
  }

  try {
    // Add document to Firestore
    await addDoc(collection(db, "scenarios"), {
      scenarioNumber,
      casualtyName,
      injuries,
      whatHappened,
      medicalHistory,
      allergies,
      lastMeal,
      timestamp: new Date()
    });

    alert("✅ Scenario Saved!");
    
    // Optionally, clear form
    document.getElementById("scenarioForm").reset();
  } catch (error) {
    console.error("Error saving scenario:", error);
    alert("❌ Failed to save scenario. Check console for details.");
  }
};

// ---------------------------
// Real-time Listener (Optional)
// ---------------------------
// This can be used for casualty/trainer interfaces to update automatically
export function listenScenarios(callback) {
  const q = query(collection(db, "scenarios"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const scenarios = [];
    snapshot.forEach(doc => {
      scenarios.push({ id: doc.id, ...doc.data() });
    });
    callback(scenarios);
  });
}