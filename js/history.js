function addToHistory(askedKana, correctAnswer, firstTry){
    let clone = document.getElementById("history-item-template").cloneNode(true);
    clone.remove("id");
    clone.classList.remove("d-none");
    clone.getElementsByClassName("history-item-text")[0].innerHTML = askedKana;
    clone.setAttribute("data-bs-content", correctAnswer);
    clone.classList.add("bg-gradient");
    clone.classList.add((firstTry) ? "history-item-success" : "history-item-fail");
    new bootstrap.Popover(clone, {trigger: "focus"});
    document.getElementById("history-board").appendChild(clone);

}