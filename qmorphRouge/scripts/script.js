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
    "Flauros": false,
    "Gannix": false,
    "Kattaram": false,
    "Ron": false,
    "Shartamakhum": false,
    "Skrivnus": false,
    "Ur": false
};

let loopCounter = {
    "faction": 0,
    "bramfatura": 0
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




// "saving"
function exportButtonStates() {
    const combinedStates = {
        buttonStates: buttonStates,
        loopCounter: loopCounter
    };

    const jsonStates = JSON.stringify(combinedStates);
    console.log(jsonStates);
}


function importButtonStates(jsonString) {
    const importedData = JSON.parse(jsonString);

    buttonStates = importedData.buttonStates;
    loopCounter = importedData.loopCounter;

    console.log("Imported button states:", buttonStates);
    console.log("Imported loop counter:", loopCounter);

    updateButtonVisualState()
    updateLoopCounter()
}


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