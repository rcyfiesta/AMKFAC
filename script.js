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

const injuryOptions = [
"CPR + AED","1st Degree Burn","2nd Degree Burn","3rd Degree Burn",
"Abdominal Thrust","Abrasion","Allergic Reaction (Severe)","Asthma",
"Avulsion","Bee Sting","Bleeding","Chest Thrust","Choking (Unconscious)",
"Closed Fracture","Contusion","Dislocation","Epistaxis (Nose Bleed)",
"Fainting","Heat Cramp","Heat Exhaustion","Heat Stroke","Hyperventilation",
"Incision","Laceration","Muscle Cramp","Open Fracture","Partial Choking", "Puncture Wound",
"Snake Bite","Sprain","Strain","Stroke","Amputation","Animal Bite",
"Chemical Burn","Compression","Concussion","Electrical Burn","Fits",
"Foreign Bodies in Eye","Hypoglycaemia/Low Blood Sugar","Jellyfish Sting",
"Penetrating Object","Scorpion Sting","Shock",
"Spinal Injury","Sun Burn"
];

const siteOptions = [
"Skull","Scalp","Forehead","Jaw","Nose","Shoulder","Collarbone",
"Upper Arm","Forearm","Wrist","Palm","Chest","Rib","Abdomen",
"Hip","Thigh","Knee","Tibia fibula","Ankle","Foot"
];

document.addEventListener("DOMContentLoaded", () => {

    const saveBtn = document.getElementById("saveScenario");
    if (!saveBtn) return;

    const scenarioNumber = document.getElementById("scenarioNumber");
    const casualtyNumber = document.getElementById("casualtyNumber");
    const casualtyName = document.getElementById("casualtyName");
    const whatHappened = document.getElementById("whatHappened");
    const medicalHistory = document.getElementById("medicalHistory");
    const allergies = document.getElementById("allergies");
    const lastMeal = document.getElementById("lastMeal");

    scenarioNumber.innerHTML = "<option value=''>-- Select Scenario --</option>";
    for (let i = 1; i <= 80; i++) {
        scenarioNumber.appendChild(new Option(i, i));
    }

    document.querySelectorAll(".injuryType").forEach(select => {
        select.innerHTML = "<option value=''>Select Injury</option>";
        injuryOptions.forEach(injury => {
            select.appendChild(new Option(injury, injury));
        });
    });

    document.querySelectorAll(".injurySite").forEach(select => {

        select.innerHTML = "";

        // Add NA first
        select.appendChild(new Option("NA", "NA"));

        // Add other sites
        siteOptions.forEach(site => {
            select.appendChild(new Option(site, site));
    });

});

    saveBtn.addEventListener("click", async () => {

        if (!scenarioNumber.value || !casualtyNumber.value || !casualtyName.value.trim()) {
            alert("Scenario number, casualty number, and name are required!");
            return;
        }

        const injuryRows = document.querySelectorAll(".injuryBlock");
        const injuryArr = [];

        injuryRows.forEach(row => {
            const type = row.querySelector(".injuryType").value;
            const side = row.querySelector(".injurySide").value;
            const site = row.querySelector(".injurySite").value;

            if (type) {
                injuryArr.push({ type, side, site });
            }
        });

        try {
            await addDoc(collection(db, "scenarios"), {
                scenarioNumber: scenarioNumber.value,
                casualtyNumber: casualtyNumber.value,
                casualtyName: casualtyName.value.trim(),
                injuries: injuryArr,
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
            alert("❌ Failed to save scenario.");
        }
    });
});