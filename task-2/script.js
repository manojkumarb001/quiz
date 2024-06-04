const questions = [
    {
        question: "What is the capital of France?",
        options: ["a) Paris", "b) London", "c) Berlin"],
        correctAnswer: "a"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["a) Mars", "b) Earth", "c) Jupiter"],
        correctAnswer: "a"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["a) Elephant", "b) Blue Whale", "c) Giraffe"],
        correctAnswer: "b"
    },
    {
        question: "How many continents are there on Earth?",
        options: ["a) 7", "b) 6", "c) 5"],
        correctAnswer: "a"
    },
    {
        question: "What is the symbol for the element gold?",
        options: ["a) Gd", "b) Go", "c) Au"],
        correctAnswer: "c"
    }
];
const iqLevelElement = document.getElementById('iq-level');
const correctAnswersElement = document.getElementById('correct-answers');
const timerElement = document.getElementById('timer');
const resultContainer = document.getElementById('result');
let currentQuestion = 0;
let correctAnswers = 0;
let timer = 60;

function displayQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = `
        <div class="question">
            <p>${questions[currentQuestion].question}</p>
            <div class="options">
                ${questions[currentQuestion].options.map(option => `<div class="option">${option}</div>`).join('')}
            </div>
        </div>
    `;

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => checkAnswer(option));
    });
}

function updateTimer() {
    timerElement.innerText = `Time Left: ${timer} seconds`;
    if (timer === 0) {
        finishQuiz();
    }
    timer--;
}


function checkAnswer(selectedOption) {
    const answer = selectedOption.innerText.charAt(0);
    if (answer === questions[currentQuestion].correctAnswer) {
        correctAnswers++;
        selectedOption.style.backgroundColor = 'green';
    } else {
        selectedOption.style.backgroundColor = 'red';
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            finishQuiz();
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(interval);
    const questionContainer = document.getElementById('quiz-container');
    questionContainer.innerHTML = '';
    correctAnswersElement.innerText = correctAnswers;
    iqLevelElement.innerText = calculateIQ();
    resultContainer.style.display = 'block';
}

function calculateIQ() {
    const percentage = (correctAnswers / questions.length) * 100;
    if (percentage >= 80) {
        return 'Genius';
    } else if (percentage >= 60) {
        return 'Above Average';
    } else if (percentage >= 40) {
        return 'Average';
    } else {
        return 'Below Average';
    }
}

displayQuestion();
const interval = setInterval(updateTimer, 1000);