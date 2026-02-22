// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

window.saveScenario = async function() {

    await addDoc(collection(db, "scenarios"), {
        scenarioNumber: document.getElementById("scenarioNumber").value,
        casualtyName: document.getElementById("casualtyName").value,
        injuries: document.getElementById("injuries").value,
        whatHappened: document.getElementById("whatHappened").value,
        medicalHistory: document.getElementById("medicalHistory").value,
        allergies: document.getElementById("allergies").value,
        lastMeal: document.getElementById("lastMeal").value
    });

    alert("Scenario Saved!");
}

const display = document.getElementById("casualtyDisplay");

if (display) {
    onSnapshot(collection(db, "scenarios"), (snapshot) => {
        display.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            display.innerHTML += `
                <h3>Scenario ${data.scenarioNumber}</h3>
                <p><strong>Name:</strong> ${data.casualtyName}</p>
                <p><strong>Injuries:</strong> ${data.injuries}</p>
                <p><strong>What Happened:</strong> ${data.whatHappened}</p>
                <p><strong>Medical History:</strong> ${data.medicalHistory}</p>
                <p><strong>Allergies:</strong> ${data.allergies}</p>
                <p><strong>Last Meal:</strong> ${data.lastMeal}</p>
                <hr>
            `;
        });
    });
}