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
