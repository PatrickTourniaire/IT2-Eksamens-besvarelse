
// Objeket med overskit over alle hytter (samme som tabellen)
const cabins = {
    "Gjendesheim": {
        "Glitterheim": 22,
        "Memurubu": 14,
    },

    "Glitterheim": {
        "Gjendsheim": 22,
        "Memurubu": 18,
        "Spiterstulen": 17
    },

    "Memurubu": {
        "Gjendsheim": 14,
        "Glitterheim": 18,
        "Gjendebu": 10
    },

    "Gjendebu": {
        "Memurubu": 10,
        "Leirvassbu": 19,
        "Spiterstulen": 24,
        "Olavsbu": 16
    },

    "Leirvassbu": {
        "Glitterheim": 17,
        "Gjendebu": 24,
        "Leirvassbu": 15
    },

    "Spiterstulen": {
        "Glitterheim": 17,
        "Gjendebu": 24,
        "Leirvassbu": 15
    },

    "Olavsbu": {
        "Gjendebu": 16,
        "Leirvassbu": 11
    }
}


// Deklarerer elementer fra html-dom
const cabinSelectors = document.querySelectorAll("#cabin-options");
const btnSubmit = document.querySelector("#submit");
const btnChooseCabin = document.querySelector("#next");

const textHeader = document.querySelector(".summary #header");
const textDistance = document.querySelector(".summary #distance");
const wrapperCabins = document.querySelector(".summary .cabins");


// Initialiserer variabler
var selectedCabins = {};
var totalDistance = 0;
const maxAmountOfCabins = 3
var levelIndex = 0; // Hvilket hytte nivå er man på.


// Regner ut den totale avstanden.
// Dette kunne blitt gjort mer generelt - men jeg har ikke tid.
const updateTotalDistance = () => {
    const firstDist = cabins[selectedCabins[0]][selectedCabins[1]]
    const secondDist = cabins[selectedCabins[1]][selectedCabins[2]]

    totalDistance = firstDist + secondDist;
}

const finishSelection = () => {
    wrapperCabins.innerHTML = null;
    textDistance.innerHTML = null;
    textHeader.innerHTML = null;

    const currentSelect = cabinSelectors[2];
    selectedCabins[2] = currentSelect.options[currentSelect.selectedIndex].text;

    console.log(selectedCabins)
    
    updateTotalDistance();

    textHeader.innerHTML = "Du har nå valgt turen din!";
    textDistance.innerHTML = "Totalt så reiser du: " + totalDistance + "km";

    for (const cabin in selectedCabins) {
        var el = `<p>Start hytte: ${selectedCabins[cabin]}</p>`;
        if (cabin != 0) {
            el = `<p>${selectedCabins[cabin]} | Dette er ${cabins[selectedCabins[cabin-1]][selectedCabins[cabin]]}km unna ${selectedCabins[cabin-1]}</p>`
        }

        wrapperCabins.innerHTML += el;
    }
}


// Oppdaterer resien med ny hytte
const getIndexOfCabin = (cabinName) => {
    var index;
    for (const i = 0; i < cabins.length; i++) {
        if (cabin === cabinName) {
            index = i;
        }
    }

    return(index);
}


// Fyller ut nye hytter på de neste valg muligheten - oppdaterer ettersom man gjør endringer.
const fillInNewCabins = (index) => {
    var cabinOptions = cabinSelectors[index]; // Henter ut valg av hytter på neste.
    const currentLevel = index - 1; // Index av hva man nettopp har valgt
    const currentSelect = cabinSelectors[currentLevel]; // Returnerer et object av select elementet man holder på velge fra.
    const selectedCabinObjectIndex = currentSelect.options[currentSelect.selectedIndex].text

    if (selectedCabinObjectIndex != null) {
        const newCabins = cabins[selectedCabinObjectIndex];

        // Resetter den neste (og siste hvis man endrer på første).
        cabinOptions.innerHTML = null;
        if (currentLevel === 0) {
            cabinSelectors[2].innerHTML = null;
        }

        for (const cabin in newCabins) {
            const indexValue = getIndexOfCabin(cabin);
            const cabinOption = `<option value="${indexValue}">${cabin}</option>`
            
            cabinOptions.innerHTML += cabinOption;
        }
    }
}

// Når det er en endring i hva man har valgt.
const onChangeOptions = (level) => {
    // Oppdater level index
    if (levelIndex < 1) {
        levelIndex += 1;
    }

    // Opdater selectedCabins.
    const currentSelect = cabinSelectors[level];
    selectedCabins[level] = currentSelect.options[currentSelect.selectedIndex].text;

    // Setter opp valg for neste boks.
    const nextCabinIndex = (level < maxAmountOfCabins - 1) ? level + 1 : null;
    if (nextCabinIndex !== null) {
        fillInNewCabins(nextCabinIndex)
    }
}

// Hendelser
btnChooseCabin.onclick = function() { // Velg ny hytte
    onChangeOptions(levelIndex);
}

btnSubmit.onclick = function() { // Ferdig
    finishSelection();
}

cabinSelectors[0].onchange = function() {
    onChangeOptions(0);
}