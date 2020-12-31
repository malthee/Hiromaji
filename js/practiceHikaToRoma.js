let idx = 0;
let chars = null;

function initInput(){
    let userInput = document.getElementById("user-input");
    let userSubmit = document.getElementById("user-submit");

    userInput.disabled = false;
    userSubmit.disabled = false;

    userInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            userSubmit.click();
        }
    });
    userSubmit.addEventListener("click", submitInput);
}

function submitInput(){
    let input = document.getElementById("user-input").value;
    console.log(input);
    document.getElementById("user-input").value = "";
    if(idx < localStorage.getItem("string").length - 1){
        idx++;
    } else {
        idx = 0;
    }
    let displayChar = document.getElementById("display-char");
    displayChar.innerHTML = chars.charAt(idx);
}

function startPractice(charsToLearn) {
    let displayChar = document.getElementById("display-char");
    displayChar.innerHTML = charsToLearn.charAt(idx);
    console.log(charsToLearn);
    chars = charsToLearn;
}