
/* dynamicSelection.js allows selecting and toggling of multiple checkboxes at once through select-all or row based select
unlocks checkboxes on window load */

// sets every checkBox of this charType to the checked state of the select all checkBox
function toggleAllCharRows(charType) {
    if (charType !== "hiragana" && charType !== "katakana") {
        console.error("Invalid charType in characterSelect.");
        return;
    }
    
    const selectAllCheck = document.getElementById(charType + "-select-all");
    const charTable = document.getElementById(charType + "-table");
    const checkList = charTable.getElementsByTagName("tbody")[0].getElementsByClassName("char-select");

    for (let check of checkList) {
        if (check.checked != selectAllCheck.checked) {
            check.click();
        }
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

window.onload = initializeCharTableEvents;