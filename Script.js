let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questions = [
    {
        text: 'What is the capital of France?',
        answers: ['New York', 'London', 'Paris', 'Dublin'],
        correct: 2
    },
    {
        text: 'What is 2 + 2?',
        answers: ['3', '4', '5', '6'],
        correct: 1
    },
    // Добавьте свои вопросы здесь
];

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const answersContainer = document.querySelector('.answers-container');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const restartButton = document.getElementById('restart-button');
const timerElement = document.getElementById('timer');
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

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
    resetTimer();
    startTimer();
}

function selectAnswer(selectedIndex, button) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(btn => btn.disabled = true);
    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        buttons[correctIndex].classList.add('correct');
    }
    nextButton.disabled = false;
    clearInterval(timer);
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
    clearInterval(timer);
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = `Time left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
            nextButton.disabled = false;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timerElement.textContent = 'Time left: 30';
}

function showCorrectAnswer() {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(btn => btn.disabled = true);
    buttons[correctIndex].classList.add('correct');
}

showQuestion(currentQuestionIndex);
