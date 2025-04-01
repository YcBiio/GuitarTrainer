document.addEventListener("DOMContentLoaded", function () {
    // Liste des accords avec leurs images
    const chords = [
        { name: "A", image: "chord/A.png" },
        { name: "Am", image: "chord/Am.png" },
        { name: "C", image: "chord/C.png" },
        { name: "D", image: "chord/D.png" },
        { name: "Dm", image: "chord/Dm.png" },
        { name: "E", image: "chord/E.png" },
        { name: "Em", image: "chord/Em.png" },
        { name: "G", image: "chord/G.png" }
    ];

    const showChordsBtn = document.getElementById("showChordsBtn");
    const startExerciseBtn = document.getElementById("startExerciseBtn");
    const closeBigChordBtn = document.getElementById("closeBigChord");
    const bigChordContainer = document.getElementById("bigChordContainer");
    const bigChordImage = document.getElementById("bigChordImage");

    // Vérifier si les éléments existent avant d'ajouter des écouteurs d'événements
    if (showChordsBtn) {
        showChordsBtn.addEventListener("click", function () {
            const container = document.getElementById("chordsContainer");

            if (!container.classList.contains("hidden")) {
                container.innerHTML = "";
                container.classList.add("hidden");
            } else {
                container.classList.remove("hidden");
                chords.forEach(chord => {
                    const img = document.createElement("img");
                    img.src = chord.image;
                    img.alt = chord.name;
                    img.classList.add("chord-img");
                    img.addEventListener("click", function () {
                        showBigChord(chord.image);
                    });
                    container.appendChild(img);
                });
            }
        });
    }

    // Fonction pour afficher un accord en très grand
    function showBigChord(imageSrc) {
        if (bigChordImage && bigChordContainer) {
            bigChordImage.src = imageSrc;
            bigChordContainer.classList.add("visible");
        }
    }

    // Fermer l'affichage en grand
    if (closeBigChordBtn) {
        closeBigChordBtn.addEventListener("click", function () {
            if (bigChordContainer) {
                bigChordContainer.classList.remove("visible");
            }
        });
    }

    // Gestion du métronome et de l'exercice
    let metronomeInterval;

    function startExercise() {
        const exerciseContainer = document.getElementById("exerciseContainer");
        const chordDisplay = document.getElementById("currentChord");
        const bpmInput = document.getElementById("bpmRange");
        const metronome = document.getElementById("metronomeSound");
    
        exerciseContainer.classList.remove("hidden");
    
        let bpm = parseInt(bpmInput.value);
        let interval = 60000 / bpm;
    
        let lastChord = null; // Stocke le dernier accord affiché pour éviter les répétitions immédiates
    
        clearInterval(metronomeInterval);
        metronomeInterval = setInterval(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * chords.length);
            } while (chords[randomIndex].name === lastChord); // Vérifie qu'on ne répète pas le même accord
    
            lastChord = chords[randomIndex].name;
            chordDisplay.textContent = lastChord;
            
            metronome.currentTime = 0;
            metronome.play();
        }, interval);
    }
    

    // Démarrage de l'exercice
    if (startExerciseBtn) {
        startExerciseBtn.addEventListener("click", function () {
            const exerciseContainer = document.getElementById("exerciseContainer");
            if (exerciseContainer.classList.contains("hidden")) {
                startExercise();
            } else {
                exerciseContainer.classList.add("hidden");
                clearInterval(metronomeInterval);
            }
        });
    }

    // Mise à jour du BPM en temps réel
    const bpmRange = document.getElementById("bpmRange");
    if (bpmRange) {
        bpmRange.addEventListener("input", function () {
            document.getElementById("bpmValue").textContent = this.value;
            if (!document.getElementById("exerciseContainer").classList.contains("hidden")) {
                startExercise();
            }
        });
    }
});
