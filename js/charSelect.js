/* charSelect.js is used on the selection_page to allow a dynamic selection of hira- and katakana rows. 
The selection is saved in localstorage after a checkbox has been clicked. 
It also allows selecting and toggling of multiple checkboxes at once through select-all or row based select
unlocks checkboxes on window load*/


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

            setSelectAllState();

        } else {
            localStorage.setItem("string", stored.replace(charVal, ""));
            document.getElementById(charType + "-select-all").checked = false;
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

function setSelectAllState() {
    const checkBoxes = document.getElementsByClassName("char-select");
    let hiraSelectAll = true;
    let kataSelectAll = true;

    for (let box of checkBoxes) {
        if (!box.checked) {
            switch (box.getAttribute("charType")) {
                case "hiragana":
                    hiraSelectAll = false;
                    break;
                case "katakana":
                    kataSelectAll = false;
                    break;
            }
        }
    }

    if (hiraSelectAll) {
        document.getElementById("hiragana-select-all").checked = true;
    }
    if (kataSelectAll) {
        document.getElementById("katakana-select-all").checked = true;
    }
}

function init() {
    initializeCharTableEvents();
    initializeCheckboxes();
    setSelectAllState();
}

window.onload = init;