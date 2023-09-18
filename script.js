const quiz = [
	{
		question: "Which is the largest animal in the world?",
		answers: [
			{answer: "Shark", correctAnswer: false},
			{answer: "Elephant", correctAnswer: false},
			{answer: "Blue Whale", correctAnswer: true},
			{answer: "Camel", correctAnswer: false},
		]
	},
	{
		question: "Which is the smallest country in the world?",
		answers: [
			{answer: "Sri Lanka", correctAnswer: false},
			{answer: "Italy", correctAnswer: false},
			{answer: "Dubai", correctAnswer: false},
			{answer: "Vatican City", correctAnswer: true},
		]
	},
	{
		question: "Which is the tallest building in the world?",
		answers: [
			{answer: "Clock Tower", correctAnswer: false},
			{answer: "Burj Khalifa", correctAnswer: true},
			{answer: "Eiffel Tower", correctAnswer: false},
			{answer: "Qutub Minar", correctAnswer: false},
		]
	},
    {
        question: "Which is the largest country by population in the world?",
		answers: [
			{answer: "India", correctAnswer: true},
			{answer: "United States", correctAnswer: false},
			{answer: "China", correctAnswer: false},
			{answer: "Indonesia", correctAnswer: false},
		]
    },
    {
        question: "Which is the longest river in the world?",
		answers: [
			{answer: "Amazone River", correctAnswer: false},
			{answer: "Congo River", correctAnswer: false},
			{answer: "Nile River", correctAnswer: true},
			{answer: "Yellow River", correctAnswer: false},
		]
    }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = quiz[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
	
	currentQuestion.answers.forEach(questionAnswer => {
		const button = document.createElement("button");
		button.innerHTML = questionAnswer.answer;
		button.classList.add("btn");
		answersElement.appendChild(button);
		if(questionAnswer.correctAnswer){
			button.dataset.correctAnswer = questionAnswer.correctAnswer;
		}
		button.addEventListener("click", selectAnswer);
		});
}

function selectAnswer(e){
	const selectedAnswer = e.target;
	const isCorrect = selectedAnswer.dataset.correctAnswer === "true";
	if(isCorrect){
		selectedAnswer.classList.add("correct")
		score++;
	}else{
		selectedAnswer.classList.add("incorrect");
	}
	Array.from(answersElement.children).forEach(button => {
		if(button.dataset.correctAnswer === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	questionElement.innerHTML = "You scored " + score + " out of " + quiz.length + " !";
	answersElement.style.display = "none";
	nextButton.innerHTML = "Start Quiz Again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < quiz.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < quiz.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});

function resetState(){
	nextButton.style.display = "none";
	answersElement.style.display = "block";
	while(answersElement.firstChild){
		answersElement.removeChild(answersElement.firstChild);
	}
}

startQuiz();










