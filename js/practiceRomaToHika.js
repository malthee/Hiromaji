let idx = 0;
let chars = null;
let firstTry = true;

function initInput() {
    let charSelectButtons = document.getElementsByClassName("char-select-button");

    // enable buttons after page is fully loaded
    for (let btn of charSelectButtons) {
        btn.disabled = false;
        btn.addEventListener("click", submitSelection);
    }

    // bind numbers 1 - 4 to buttons
    document.addEventListener("keyup", event => {
        switch (event.key) {
            case "1":
                charSelectButtons[0].click();
                break;
            case "2":
                charSelectButtons[1].click();
                break;
            case "3":
                charSelectButtons[2].click();
                break;
            case "4":
                charSelectButtons[3].click();
                break;
        }
    });
}

function submitSelection() {
    let askedRomaji = document.getElementById("display-char").innerHTML;

    //get correct answer from kana array
    let correctAnswer = chars.charAt(idx);

    // process answer
    if (this.value == correctAnswer){
        addToHistory(askedRomaji, correctAnswer, firstTry);

        //circle through characters and re-permute
        if(idx < localStorage.getItem("string").length - 1){
            idx++;
        } else {
            idx = 0;
            chars = permute();
        }

        let displayChar = document.getElementById("display-char");
        displayChar.innerHTML = getRomaji(chars.charAt(idx)).toUpperCase();
        generateBtnOptions(chars.charAt(idx));

        firstTry = true;

        unlockButtons();

    } else {
        // disable button on wrong answer
        firstTry = false;
        this.disabled = true;
    }

}

// enable all buttons
function unlockButtons(){
    let btnList = document.getElementsByClassName("char-select-button");
    for (let btn of btnList) {
        btn.disabled = false;
    }
    return;
}

// generate first question 
function startPractice(charsToLearn) {
    if (charsToLearn.length < 4) {
        document.getElementById("selection-missing").classList.remove("d-none");
        for (let btn of document.getElementsByClassName("char-select-button")) {
            btn.disabled = true;
        }

        return;
    }

    let displayChar = document.getElementById("display-char");
    askedKana = charsToLearn.charAt(idx)
    displayChar.innerHTML = getRomaji(askedKana).toUpperCase();
    chars = charsToLearn;

    generateBtnOptions(askedKana);
    return;
}

// fill all buttons wit viable options 
function generateBtnOptions(askedKana){
    let indices = getRandIndices();
    let options = getThreeOptions(askedKana);
    let btnList = document.getElementsByClassName("char-select-button");

    for(let i = 0; i < 3; i++){
        btnList[parseInt(indices.charAt(i))].innerHTML = options.charAt(i);
        btnList[parseInt(indices.charAt(i))].value = options.charAt(i);
    }
    btnList[parseInt(indices.charAt(3))].innerHTML = askedKana;
    btnList[parseInt(indices.charAt(3))].value = askedKana;
}

// look up romaji to given hiragana/katakana
function getRomaji(askedKana){
    let i = 0;
    while (i < kana.length && kana[i].kana != askedKana){
        i++;
    }
    return kana[i].romaji;
}

// generate set of random positions for four elements
function getRandIndices() {
    let sortedIndices = "0123";
    let permutation = "";

    while (sortedIndices.length > 0) {
        let int = sortedIndices.charAt(Math.floor(Math.random() * sortedIndices.length));
        sortedIndices = sortedIndices.replace(int, "");
        permutation += int;
    }

    return permutation;
}

// get three viable options for wrong anwsers on buttons
function getThreeOptions(askedKana){
    let options = "";
    while(options.length < 3){
        let randKana = chars.charAt(Math.floor(Math.random() * chars.length));
        if (randKana != askedKana && !options.includes(randKana)) {
            options += randKana;
            randKana = "";
        }
    }
    return options;
}