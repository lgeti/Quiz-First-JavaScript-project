const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const input = document.querySelector("input");
const form = document.querySelector("form");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  if (username.validity.patternMismatch) {
    saveScoreBtn.disabled = true;
    input.classList.add("warning");
    setTimeout("alert('Your username can only contain letters and spaces, up to 30.');", 1);
  } else {
    input.classList.remove("warning");
    saveScoreBtn.disabled = false;
  }
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("/highscores.html");
}
