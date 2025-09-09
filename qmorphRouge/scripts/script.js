let buttonStates = {
    "AnCom": false,
    "Dilthey": false,
    "RealWare": false,
    "SBN": false,
    "TianMing": false,
    "Church": false,
    "Coreward": false,
    "Daydream": false,
    "Franche": false,
    "Grasshopper": false,
    "Planetbridge": false,
    "Sunlight": false,
    "Civil": false,
    "Belt": false,
    "Tezctlan": false,
    "Mask": false,
    "Shedu": false,


    "Duggur": false, //here start the bramfaturas
    "Gannix": false,
    "Shartamakhum": false,
    "Ur": false,

    "Kattaram": false,
    "Ron": false,
    "Skrivnus": false,
    "Flauros": false
};

let loopCounter = {
    "faction": 0,
    "bramfatura": 0
}

const availStations = {
    "Duggur": ["Moon", "Fuller"],
    "Flauros": ["Jupiter", "Io", "Europa", "Ganymede", "Callisto"],
    "Gannix": ["Venus", "HAVOC", "Mechta"],
    "Kattaram": ["Ceres", "Wernher", "434 Hungaria"],
    "Ron": ["Vesta, Pallas, Annagerman"],
    "Shartamakhum": ["Mercury", "Vulcano", "Citadel-1"],
    "Skrivnus": ["Geist", "Interamnia", "Hygiea"],
    "Ur": ["Mars", "Phobos", "Deimos"]
}

const toggleButtons = document.querySelectorAll('.toggleButton');

toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonImage = this.querySelector('.button-image'); 
        const buttonName = this.dataset.name; 

        buttonStates[buttonName] = !buttonStates[buttonName];

        if (buttonStates[buttonName]) {
            buttonImage.src = './assets/button/on.png'; 
            console.log(`${buttonName} switched to ON`);
        } else {
            buttonImage.src = './assets/button/off.png';
            console.log(`${buttonName} switched to OFF`);
        }

        if(checkBramfaturas()){
            incrementBramfatura();
            unsetBram();
        }

        if(checkFactions()){
            incrementFaction();
            unsetFaction();
        }

        buildInnerAvailableStationsArray()
        buildOuterAvailableStationsArray()
    });
});

function checkFactions(){
    const keys = Object.keys(buttonStates);
    positive = true;
    for (let i = 0; i < keys.indexOf("Duggur"); i++) {
        const buttonName = keys[i];
        const buttonState = buttonStates[buttonName];

        if(buttonState == false){
            positive = false;
            break;
        }
        console.log(`${buttonName}: ${buttonState}`);
    }
    return positive;
}

function checkBramfaturas(){
    const keys = Object.keys(buttonStates);
    positive = true;
    for (let i = keys.indexOf("Duggur"); i < keys.length; i++) {
        const buttonName = keys[i];
        const buttonState = buttonStates[buttonName];

        if(buttonState == false){
            positive = false;
            break;
        }
        console.log(`${buttonName}: ${buttonState}`);
    }
    return positive;
}



function unsetFaction(){
    const keys = Object.keys(buttonStates);
    for (let i = 0; i < keys.indexOf("Duggur"); i++) {
        const buttonName = keys[i];
        buttonStates[buttonName] = false;
        console.log(`${buttonName}: ${buttonStates[buttonName]}`)
    }
    updateButtonVisualState();
}

function unsetBram(){
    const keys = Object.keys(buttonStates);
    for (let i = keys.indexOf("Duggur"); i < keys.length; i++) {
        const buttonName = keys[i];
        buttonStates[buttonName] = false;
    }
    updateButtonVisualState();
}


function incrementFaction(){
    loopCounter.faction += 1;
    updateLoopCounter();
}

function incrementBramfatura(){
    loopCounter.bramfatura += 1;
    updateLoopCounter();
}

function buildInnerAvailableStationsArray(){
    let arr = document.getElementById("inner");
    arr.textContent = "";

    const keys = Object.keys(buttonStates);

    for(let i = keys.indexOf("Duggur"); i <= keys.indexOf("Ur"); i++){
        const buttonName = keys[i];
        if(!buttonStates[buttonName]){
            const buff = document.createTextNode(availStations[buttonName].join(", "));

            arr.appendChild(buff);
            arr.appendChild(document.createElement("br"))
        }
    }

    return arr;
}

function buildOuterAvailableStationsArray(){
    let arr = document.getElementById("outer");
    arr.textContent = "";

    const keys = Object.keys(buttonStates);

    for(let i = keys.indexOf("Kattaram"); i < keys.length; i++){
        const buttonName = keys[i];
        if(!buttonStates[buttonName]){
            const buff = document.createTextNode(availStations[buttonName].join(", "));

            arr.appendChild(buff);
            arr.appendChild(document.createElement("br"))
        }
    }

    return arr;
}




// "saving"
function exportButtonStates() {
    const combinedStates = {
        buttonStates: buttonStates,
        loopCounter: loopCounter
    };

    const jsonStates = JSON.stringify(combinedStates, null, 2);
    console.log(jsonStates);

    const blob = new Blob([jsonStates], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'buttonStates.json'; // Set the file name

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);

}

document.getElementById('downloadSave').addEventListener('click', function(event) {
    event.preventDefault(); 
    exportButtonStates(); 
});


function importButtonStates(jsonString) {
    const importedData = JSON.parse(jsonString);

    buttonStates = importedData.buttonStates;
    loopCounter = importedData.loopCounter;

    console.log("Imported button states:", buttonStates);
    console.log("Imported loop counter:", loopCounter);

    updateButtonVisualState()
    updateLoopCounter()
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const jsonString = e.target.result;
            importButtonStates(jsonString);
        };
        reader.readAsText(file);
    }
});



// update until
function updateButtonVisualState() {
    toggleButtons.forEach((button) => {
        const buttonName = button.dataset.name;
        const buttonImage = button.querySelector('.button-image');

        if (buttonStates[buttonName]) {
            buttonImage.src = './assets/button/on.png';
            console.log(`${buttonName} switched to ON`);
        } else {
            buttonImage.src = './assets/button/off.png';
            console.log(`${buttonName} switched to OFF`);
        }
    });
}

function updateLoopCounter(){
    document.getElementById("factionLoop").textContent = `factions: ${loopCounter.faction}`;
    document.getElementById("bramfaturaLoop").textContent = `bramfaturas: ${loopCounter.bramfatura}`;
}



// functions triggering on startup
buildInnerAvailableStationsArray()
buildOuterAvailableStationsArray()