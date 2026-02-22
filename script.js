import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ✅ Your Firebase config
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

// Get form elements
const scenarioNumber = document.getElementById("scenarioNumber");
const casualtyName = document.getElementById("casualtyName");
const injuries = document.getElementById("injuries");
const whatHappened = document.getElementById("whatHappened");
const medicalHistory = document.getElementById("medicalHistory");
const allergies = document.getElementById("allergies");
const lastMeal = document.getElementById("lastMeal");
const saveBtn = document.getElementById("saveScenario");

// Save scenario to Firestore
saveBtn.addEventListener("click", async () => {
    if (!scenarioNumber.value || !casualtyName.value) {
        alert("Scenario number and casualty name are required!");
        return;
    }

    try {
        await addDoc(collection(db, "scenarios"), {
            scenarioNumber: scenarioNumber.value,
            casualtyName: casualtyName.value,
            injuries: injuries.value,
            whatHappened: whatHappened.value,
            medicalHistory: medicalHistory.value,
            allergies: allergies.value,
            lastMeal: lastMeal.value,
            timestamp: serverTimestamp()
        });

        alert("✅ Scenario saved successfully!");
        
        // Clear form
        scenarioNumber.value = '';
        casualtyName.value = '';
        injuries.value = '';
        whatHappened.value = '';
        medicalHistory.value = '';
        allergies.value = '';
        lastMeal.value = '';

    } catch (err) {
        console.error("Error saving scenario:", err);
        alert("❌ Failed to save scenario. Check console for details.");
    }
});