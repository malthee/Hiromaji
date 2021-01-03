/* charSelect.js is used on the selection_page to allow a dynamic selection of hira- and katakana rows. 
The selection is saved in localstorage after a checkbox has been clicked. */

// called by checkboxes, adds selected character combinations to localstorage
function characterRowSelect() {
    let charVal = this.getAttribute("charVal");
    let charType = this.getAttribute("charType");

    if (charType !== "hiragana" && charType !== "katakana") {
        console.error("Invalid charType in characterRowSelect.");
        return;
    }

    let stored = localStorage.getItem("string");
    if (!stored) {
        localStorage.setItem("string", charVal);
    } else {
        if (this.checked && !stored.includes(charVal)) {
            localStorage.setItem("string", stored + charVal);
        } else {
            localStorage.setItem("string", stored.replace(charVal, ""));
        }
    }
}

// sets checkbox state according to localstorage
function initializeCheckboxes() {
    const checkBoxes = document.getElementsByClassName("char-select");
    let stored = localStorage.getItem("string");
    if (stored) {
        for (let box of checkBoxes) {
            let charVal = box.getAttribute("charVal");
            if (stored.includes(charVal)) {
                box.checked = true;
            }
        }
    }
}

function init() {
    initializeCharTableEvents();
    initializeCheckboxes();
}

window.onload = init;
