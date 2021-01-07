/* practice.js sets up and filters the Kana used for the practice modes
    requires file with initInput and checkChar(charsToLearn) to be included before practice.js
    -> practiceHikaToRoma.js or practiceRomaToHika.js
*/

let kana = null;

// shuffle the chosen characters
function permute() {
    let stored = localStorage.getItem("string");
    let permutation = "";

    while (stored && stored.length > 0) {
        let char = stored.charAt(Math.floor(Math.random() * stored.length));
        stored = stored.replace(char, "");
        permutation += char;
    }

    return permutation;
}

async function initPractice() {
    const kanaUrl = "js/kana.json";
    let response = await fetch(kanaUrl);
    kana = await response.json();

    let charsToLearn = permute();

    // check if there are characters selected to start practice
    if (!charsToLearn) {
        document.getElementById("selection-missing").classList.remove("d-none");
    } else {
        initInput();
        startPractice(charsToLearn);
    }
} 

window.onload = initPractice;