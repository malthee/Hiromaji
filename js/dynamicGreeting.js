function setGreeting(){
    let romajiGreeting = document.getElementById("greeting-romaji");
    let hiraGreeting = document.getElementById("greeting-hiragana");
    let today = new Date();
    let hour = today.getHours();

    if (hour < 5){
        romajiGreeting.innerHTML = "Tetsuya desu ka?";
        hiraGreeting.innerHTML = "てつやですか？";
    } else if (hour >= 5 && hour < 12){
        romajiGreeting.innerHTML = "Ohayou!";
        hiraGreeting.innerHTML = "おはよう";
    } else if (hour >= 12 && hour < 18) {
        romajiGreeting.innerHTML = "Konnichiwa!";
        hiraGreeting.innerHTML = "こんにちは";
    } else if (hour >= 18) {
        romajiGreeting.innerHTML = "Konbanwa!";
        hiraGreeting.innerHTML = "こんばんは";
    } 

}

window.onload = setGreeting;