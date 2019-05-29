// Deklarerer elemnter fra html-dom
const headerResponse = document.querySelector("#response-header");
const textPixles = document.querySelector("#pixels");
const textMegaPixels = document.querySelector("#mega-pixels");

const inputHeight = document.querySelector("#input-height");
const inputWidth = document.querySelector("#input-width");
const btnSubmit = document.querySelector("#submit");

const maxWidth = 1920;

// Hvis fram hvor mange piksler det er.
const displayNumOfPixels = () => {
    // Hent ut høyde og bredde
    const height = Number(inputHeight.value);
    const width = Number(inputWidth.value);

    if (width <= 1920) {
        const numOfPixels = height * width;
        const numOfMegaPixles = numOfPixels / 1000000;

        // Oppdater tekster
        headerResponse.innerHTML = "I dette bildet så er det:"
        textPixles.innerHTML = "Piksler: " + numOfPixels + "px";
        textMegaPixels.innerHTML = "Megapiksler: " + numOfMegaPixles + "Mpx";
    } else {
        headerResponse.innerHTML = "Du har for stor bredde! Maks er på " + maxWidth + "px.";
    }
}

// Hvis rikitg bilde som representerer om det er liggende, stående eller kvadratisk.
const getImageUrl = () => {
    const bilder = ["images/liggende.jpg", "images/kvadrat.jpg", "images/stående.jpg"];

    // Hent ut høyde og bredde
    const height = Number(inputHeight.value);
    const width = Number(inputWidth.value);

    var sourceToImage;
    if (height === width) {
        sourceToImage = bilder[1];
    } else {
        // Hvis bredden er større så er den liggende, ellers stående.
        sourceToImage = (width > height) ? bilder[0] : bilder[2];
    }

    // Gi ut kilde til bildet
    return (sourceToImage);
}

// Hendelser
btnSubmit.onclick = function() {
    displayNumOfPixels();
}