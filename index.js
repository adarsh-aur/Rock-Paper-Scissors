document.querySelector(".auto-play").addEventListener("click", autoPlay);

let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0
};


for (var i = 0; i < document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        var userChoice = this.innerHTML;
        var computer = computerChoice();
        score = game(userChoice, computer);
        document.querySelector(".status").innerHTML = "You chose " + userChoice + ", the computer chose " + computer + ".<br>Wins: " + score.wins + " | Loses: " + score.loses + " | Ties: " + score.ties;
    });
}

function computerChoice(){
    var choices = ["👊🏻", "🤚🏻", "✌🏻"];
    var random = Math.floor(Math.random() * 3);
    return choices[random];
}

function autoPlay() {
    setInterval(() => {
        const computer = computerChoice();
        const userChoice = computerChoice();
        game(userChoice, computer);
    }, 1000)
}

function game(userChoice, computer){
    if (userChoice === computer){
        score.ties++;
    } else if (userChoice === "👊🏻" && computer === "✌🏻" ||
               userChoice === "🤚🏻" && computer === "👊🏻" || 
               userChoice === "✌🏻" && computer === "🤚🏻") {
        score.wins++;
    } else {
        score.loses++;
    }
    localStorage.setItem("score", JSON.stringify(score));
    document.querySelector(".status").innerHTML = "You chose " + userChoice + ", the computer chose " + computer + ".<br>Wins: " + score.wins + " | Loses: " + score.loses + " | Ties: " + score.ties;
    return score;
}

document.querySelector(".reset").addEventListener("click", function(){
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    document.querySelector(".status").innerHTML = "Score reset!<br>Wins: " + score.wins + " | Loses: " + score.loses + " | Ties: " + score.ties;
    // alert("Score reset!\nWins: " + score.wins + "\nLoses: " + score.loses + "\nTies: " + score.ties);
})


