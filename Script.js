
const questions = [
    {
        text: "What is the capital of France?",
        answers: ["New York", "London", "Paris", "Dublin"],
        correct: 2
    },
    {
        text: "What is the capital of Spain?",
        answers: ["Madrid", "Barcelona", "Lisbon", "Rome"],
        correct: 0
    },
    {
        text: "What is the capital of Italy?",
        answers: ["Venice", "Rome", "Naples", "Milan"],
        correct: 1
    },
    {
        text: "What is the capital of Germany?",
        answers: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const answersContainer = document.querySelector('.answers-container');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const restartButton = document.getElementById('restart-button');

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
}

function selectAnswer(selectedIndex, button) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }
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
}

showQuestion(currentQuestionIndex);
