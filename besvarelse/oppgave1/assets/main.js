// Deklarerer elementer fra html-dom
const imgJpg = document.querySelector("#img-jpg");
const imgPng = document.querySelector("#img-png");
const imgVec = document.querySelector("#img-vec");

const imgHeader = document.querySelector("#img-header");
const desc = document.querySelector("#description");

// En array med forklaringer på hvert bilde.
const responsesInOrder = ["Dette bildet burde bruke JPG ettersom det er et fotografi som ikke krever noen skalering eller usynelig bakgrunn. Videre så er dette også en bra komprimering som passer bra på nettet.",
                    "Dette bildet burde være PNG ettersom det krever en usynelig bakgrunn, og den ikke krever skalering slik som logoen. Videre så er dette også en bra komprimering som passer bra på nettet.",
                    "Denne logoen burde være i SVG format ettersom det er vektorisert og kan da skalerer så mye som trengs uten at kvaliteten minskes."];
const fileTypesInOrder = ["JPG", "PNG", "SVG"]

// Oppdater informasjon på skjermen
const updateInfo = (index) => {
    imgHeader.innerHTML = "Anbefalt bildetype: " + fileTypesInOrder[index];
    desc.innerHTML = responsesInOrder[index];
}

// Hendelser
imgJpg.onclick = function() {
    updateInfo(0);
}

imgPng.onclick = function() {
    updateInfo(1);
}

imgVec.onclick = function() {
    updateInfo(2);
}