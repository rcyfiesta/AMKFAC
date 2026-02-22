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
  apiKey: "YOUR_API_KEY",               // Replace with your Firebase API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------
// Save Scenario Function
// ---------------------------
window.saveScenario = async function() {
  // Read values from the form
  const scenarioNumber = document.getElementById("scenarioNumber")?.value.trim();
  const casualtyName = document.getElementById("casualtyName")?.value.trim();
  const injuries = document.getElementById("injuries")?.value.trim();
  const whatHappened = document.getElementById("whatHappened")?.value.trim();
  const medicalHistory = document.getElementById("medicalHistory")?.value.trim();
  const allergies = document.getElementById("allergies")?.value.trim();
  const lastMeal = document.getElementById("lastMeal")?.value.trim();

  // Basic validation
  if (!scenarioNumber || !casualtyName) {
    alert("⚠ Scenario number and casualty name are required!");
    return;
  }

  try {
    // Add scenario to Firestore
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
    // Reset form
    document.getElementById("scenarioForm")?.reset();

  } catch (error) {
    console.error("Error saving scenario:", error);
    alert("❌ Failed to save scenario. Check console.");
  }
};

// ---------------------------
// Real-time Listener for Casualty / Trainer / Feedback
// ---------------------------
export function listenScenarios(callback) {
  const q = query(collection(db, "scenarios"), orderBy("timestamp", "desc"));
  onSnapshot(q, snapshot => {
    const scenarios = [];
    snapshot.forEach(doc => {
      scenarios.push({ id: doc.id, ...doc.data() });
    });
    callback(scenarios);
  });
}