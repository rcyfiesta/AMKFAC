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

    if (!saveBtn) return;

    const scenarioNumber = document.getElementById("scenarioNumber");
    const casualtyNumber = document.getElementById("casualtyNumber");
    const casualtyName = document.getElementById("casualtyName");
    const injuries = document.getElementById("injuries");
    const injuryLocations = document.getElementById("injuryLocations");
    const whatHappened = document.getElementById("whatHappened");
    const medicalHistory = document.getElementById("medicalHistory");
    const allergies = document.getElementById("allergies");
    const lastMeal = document.getElementById("lastMeal");

    // Populate scenario numbers 1-80
    scenarioNumber.innerHTML = "<option value=''>-- Select Scenario --</option>";
    for (let i = 1; i <= 80; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        scenarioNumber.appendChild(option);
    }

    saveBtn.addEventListener("click", async () => {

        if (!scenarioNumber.value || !casualtyNumber.value || !casualtyName.value.trim()) {
            alert("Scenario number, casualty number, and name are required!");
            return;
        }

        // Split injuries and locations
        const injuryArr = injuries.value
            ? injuries.value.split(",").map(i => i.trim())
            : [];
        const locationArr = injuryLocations.value
            ? injuryLocations.value.split(",").map(l => l.trim())
            : [];

        if (locationArr.length && locationArr.length !== injuryArr.length) {
            alert("Number of injury locations must match number of injuries!");
            return;
        }

        try {
            await addDoc(collection(db, "scenarios"), {
                scenarioNumber: scenarioNumber.value,
                casualtyNumber: casualtyNumber.value,
                casualtyName: casualtyName.value.trim(),
                injuries: injuryArr,
                injuryLocations: locationArr,
                whatHappened: whatHappened.value || "",
                medicalHistory: medicalHistory.value || "",
                allergies: allergies.value || "",
                lastMeal: lastMeal.value || "",
                visibility: {
                    injuries: false,
                    whatHappened: false,
                    medicalHistory: false,
                    allergies: false,
                    lastMeal: false,
                    casualtyName: false
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