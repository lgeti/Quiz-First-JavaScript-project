const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')

const resetButton = document.getElementById("resetLeaderboard");

resetButton.addEventListener("click", function() {
    localStorage.removeItem("highScores");
    location.reload();
});