let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

const questions = [
    {
        text: "What is the capital of France?",
        answers: ["New York", "London", "Paris", "Dublin"],
        correct: [2]
    },
    {
        text: "Which of the following are German car manufacturers?",
        answers: ["BMW", "Toyota", "Ford", "Mercedes-Benz"],
        correct: [0, 3]
    },
    {
        text: "What is the most common type of fuel used in cars?",
        answers: ["Diesel", "Electric", "Petrol", "Hydrogen"],
        correct: [2]
    },
    {
        text: "Which of these features are typically found in modern cars?",
        answers: ["Airbags", "Navigation System", "Manual Window Rollers", "Bluetooth Connectivity"],
        correct: [0, 1, 3]
    },
    {
        text: " What kind of cars are the best? ",
        answers: ["Electro", "French", "Huge petrolhead's monsters", "Probably, i'm ga..."],
        correct: [2]
    },
    {
        text: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: [1]
    },
    {
        text: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: [1]
    },
    {
        text: "Select the prime numbers.",
        answers: ["2", "3", "4", "5"],
        correct: [0, 1, 3]
    }
];

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const answersContainer = document.querySelector('.answers-container');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');
const ThemeButton = document.getElementById('theme');

function showQuestion(index) {
    const question = questions[index];
    questionNumberElement.textContent = `Question ${index + 1}/${questions.length}`;
    questionTextElement.textContent = question.text;
    answersContainer.innerHTML = '';
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(i, button));
        answersContainer.appendChild(button);
    });
    nextButton.disabled = true;
    startTimer();
}

function selectAnswer(selectedIndex, button) {
    const correctIndexes = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(btn => btn.disabled = true);
    clearInterval(timerInterval);

    if (correctIndexes.includes(selectedIndex)) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }

    correctIndexes.forEach(index => {
        buttons[index].classList.add('correct');
    });

    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showScore();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.textContent = '';
    restartButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
    showQuestion(currentQuestionIndex);
});

function showScore() {
    questionNumberElement.textContent = '';
    questionTextElement.textContent = `You scored ${score} out of ${questions.length}!`;
    answersContainer.innerHTML = '';
    nextButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
    clearInterval(timerInterval);
}

function startTimer() {
    let timeLeft = 30;
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            const correctIndexes = questions[currentQuestionIndex].correct;
            const buttons = document.querySelectorAll('.answer');
            buttons.forEach((btn, i) => {
                btn.disabled = true;
                if (correctIndexes.includes(i)) {
                    btn.classList.add('correct');
                }
            });
            nextButton.disabled = false;
        }
    }, 1000);
}

ThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

showQuestion(currentQuestionIndex);
