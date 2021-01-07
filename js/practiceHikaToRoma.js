let idx = 0;
let chars = null;
let firstTry = true;

function initInput(){
    let userInput = document.getElementById("user-input");
    let userSubmit = document.getElementById("user-submit");
    let userHelp = document.getElementById("user-help");

    // enable input field and button after page is fully loaded
    userInput.disabled = false;
    userSubmit.disabled = false;
    userHelp.disabled = false;

    // submit on enter key
    userInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            userSubmit.click();
        }
    });
    userSubmit.addEventListener("click", submitInput);
    userHelp.addEventListener("click", showHelp);
}

    // show first character and wait for first submit
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

    // process submission
    if (inputField.value.toLowerCase() == correctAnswer){
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

// fill in correct answer
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
