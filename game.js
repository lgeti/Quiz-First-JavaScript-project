const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const answer = document.querySelector("#answer");
const answered = document.querySelector("#answered");
const gradeBtns = document.querySelector("#gradeContainer");
const correctBtn = document.querySelector("#correctBtn");
const incorrectBtn = document.querySelector("#incorrectBtn");

const SCORE_POINTS = 1;
let score = 0;

gradeBtns.classList.add("hidden");

function fetchJSONFile(path) {
	fetch(path)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			const questions = data;

			const MAX_QUESTIONS = questions.length;
			

			startGame = () => {
				questionCounter = 0;
				score = 0;
				availableQuestions = [...questions];

				getNewQuestion();
			};

			getNewQuestion = () => {
				if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
					localStorage.setItem("mostRecentScore", score);

					return window.location.assign("/end.html");
				}

				input.classList.remove("hidden");
				submit.classList.remove("hidden");

				gradeBtns.classList.add("hidden");

				questionCounter++;
				progressText.innerText = `${questionCounter} of ${MAX_QUESTIONS}`;
				progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

				const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
				currentQuestion = availableQuestions[questionsIndex];
				question.innerText = currentQuestion.question;

				availableQuestions.splice(questionsIndex, 1);

				acceptingAnswers = true;
			};

			submit.addEventListener("click", (e) => {
				e.preventDefault();

				console.log(currentQuestion.GPTanswer);

				if (!acceptingAnswers) return;

				acceptingAnswers = false;

				const correct = currentQuestion.answer;

				answered.innerText = input.value;
				input.value = "";
				input.classList.add("hidden");
				submit.classList.add("hidden");
				answer.innerText = correct;

				answered.classList.remove("hidden");
				answer.classList.remove("hidden");

				gradeBtns.classList.remove("hidden");
			});

			startGame();


		})
		.catch((error) => {
			console.error(error);
		});
}

function incrementScore() {
	score += SCORE_POINTS;
	scoreText.innerText = score;

	answer.classList.add("hidden");
	answered.classList.add("hidden");

	getNewQuestion();
}

function decrementScore() {
	answer.classList.add("hidden");
	answered.classList.add("hidden");

	getNewQuestion();
}

fetchJSONFile("./src/data/evaFitoFEBRuar.json");