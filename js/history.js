// show last few practiced elements 

const MAX_HISTORY_ELEMENTS = 16;

function addToHistory(askedKana, correctAnswer, firstTry){
    // remove old history elements
    let historyItems = document.getElementsByClassName("history-item");
    if (historyItems.length >= MAX_HISTORY_ELEMENTS)
    {
        historyItems[historyItems.length - 2].remove();
    }

    // add new history elements + bootstrap popover
    let clone = document.getElementById("history-item-template").cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.remove("d-none"); 
    clone.getElementsByClassName("history-item-text")[0].innerHTML = askedKana;
    clone.setAttribute("data-bs-content", correctAnswer);

    clone.classList.add("bg-gradient");
    clone.classList.add((firstTry) ? "history-item-success" : "history-item-fail");
    new bootstrap.Popover(clone, {trigger: "focus"});

    document.getElementById("history-board").prepend(clone);
}