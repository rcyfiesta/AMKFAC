import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvJpARNfHPu8j8E99_3CIsNbSBVzBCFQA",
  authDomain: "amkfac-c85a0.firebaseapp.com",
  projectId: "amkfac-c85a0",
  storageBucket: "amkfac-c85a0.firebasestorage.app",
  messagingSenderId: "320355813529",
  appId: "1:320355813529:web:a2e979ad989f95acbb5008"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveScenario");

    // ✅ If button doesn't exist (other pages), stop here safely
    if (!saveBtn) return;

    const scenarioNumber = document.getElementById("scenarioNumber");
    const casualtyName = document.getElementById("casualtyName");
    const injuries = document.getElementById("injuries");
    const whatHappened = document.getElementById("whatHappened");
    const medicalHistory = document.getElementById("medicalHistory");
    const allergies = document.getElementById("allergies");
    const lastMeal = document.getElementById("lastMeal");

    saveBtn.addEventListener("click", async () => {

        if (!scenarioNumber.value.trim() || !casualtyName.value.trim()) {
            alert("Scenario number and casualty name are required!");
            return;
        }

        try {

            await addDoc(collection(db, "scenarios"), {
                scenarioNumber: scenarioNumber.value.trim(),
                casualtyName: casualtyName.value.trim(),
                injuries: injuries.value
                    ? injuries.value.split(",").map(i => i.trim())
                    : [],
                whatHappened: whatHappened.value || "",
                medicalHistory: medicalHistory.value || "",
                allergies: allergies.value || "",
                lastMeal: lastMeal.value || "",

                visibility: {
                    injuries: false,
                    whatHappened: false,
                    medicalHistory: false,
                    allergies: false,
                    lastMeal: false
                },

                timestamp: serverTimestamp()
            });

            alert("✅ Scenario saved successfully!");

            document.getElementById("scenarioForm").reset();

        } catch (error) {
            console.error("Save error:", error);
            alert("❌ Failed to save scenario. Check console.");
        }
    });

});