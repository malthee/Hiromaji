/* charSelect.js is used on the selection_page to allow a dynamic selection of hira- and katakana rows. 
The selection is saved in localstorage after a checkbox has been clicked. */

// TODO add char selection to Localstorage
// called by checkboxes, adds selected character combinations to localstorage
function characterRowSelect() {
    let charType = this.getAttribute("charType");
    let charVal = this.getAttribute("charVal");

    if (charType !== "hiragana" && charType !== "katakana") {
        console.error("Invalid charType in characterRowSelect.");
        return;
    }

    // TODO remove this
    console.log(charVal);
    console.log(charType);
}

// toggles every checkbox of this charType table
function toggleAllCharRows(charType) {
    if (charType !== "hiragana" && charType !== "katakana") {
        console.error("Invalid charType in characterSelect.");
        return;
    }

    const charTable = document.getElementById(charType + "-table");
    const checkList = charTable.getElementsByTagName("tbody")[0].getElementsByClassName("char-select");

    for (let check of checkList) {
        check.click();
    }
}

// toggles all checkboxes in this row
function toggleCharRow(event) {
    // avoids event calling when user clicks on checkbox region
    if (!["INPUT", "LABEL", "SMALL", "DIV"].includes(event.target.tagName)) {
        const checkBoxes = this.getElementsByClassName("char-select");
        for (let check of checkBoxes) {
            check.click();
        }
    }
}

// sets up click events for checkboxes and rows
function initializeCharTableEvents() {
    document.getElementById("hiragana-select-all").addEventListener("click", () => {
        toggleAllCharRows("hiragana");
    });

    document.getElementById("katakana-select-all").addEventListener("click", () => {
        toggleAllCharRows("katakana");
    });

    const checkList = document.getElementsByClassName("char-select");
    
    // enable all checkboxes and add events to char selection checkboxes
    for (let check of checkList) {
        if(!check.id.includes("select-all")){
            check.addEventListener("click", characterRowSelect);
        }
        check.disabled = false;
    }

    // table row click event listeners 
    let tableRows = document.getElementsByClassName("char-table-row");
    for (let row of tableRows) {
        row.addEventListener("click", toggleCharRow);
    }
}

window.onload = initializeCharTableEvents();