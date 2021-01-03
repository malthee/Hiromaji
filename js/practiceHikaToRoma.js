let idx = 0;
let chars = null;
let firstTry = true;

function initInput(){
    let userInput = document.getElementById("user-input");
    let userSubmit = document.getElementById("user-submit");
    let userHelp = document.getElementById("user-help");

    userInput.disabled = false;
    userSubmit.disabled = false;
    userHelp.disabled = false;

    userInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            userSubmit.click();
        }
    });
    userSubmit.addEventListener("click", submitInput);
    userHelp.addEventListener("click", showHelp);
}

function startPractice(charsToLearn) {
    let displayChar = document.getElementById("display-char");
    displayChar.innerHTML = charsToLearn.charAt(idx);
    chars = charsToLearn;
}

function submitInput(){
    let inputField = document.getElementById("user-input");
    let askedKana = document.getElementById("display-char").innerHTML;

    //get correct answer from kana array
    let i = 0;
    while (i < kana.length && kana[i].kana != askedKana){
        i++;
    }
    let correctAnswer = kana[i].romaji;

    if (inputField.value == correctAnswer){
        inputField.classList.remove("is-invalid");

        addToHistory(askedKana, correctAnswer, firstTry);

        //circle through characters and re-permute
        if(idx < localStorage.getItem("string").length - 1){
            idx++;
        } else {
            idx = 0;
            chars = permute();
        }

        firstTry = true;

    } else {
        inputField.classList.add("is-invalid");
        firstTry = false;
    }

    inputField.value = "";

    let displayChar = document.getElementById("display-char");
    displayChar.innerHTML = chars.charAt(idx);
}

function showHelp(){
    let askedKana = document.getElementById("display-char").innerHTML;

    //get correct answer from kana array
    let i = 0;
    while (i < kana.length && kana[i].kana != askedKana){
        i++;
    }
    let correctAnswer = kana[i].romaji;

    document.getElementById("user-input").value = correctAnswer;

    firstTry = false;
}
