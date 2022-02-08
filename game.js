const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'What is 2378 + 1908 ?',
    choice1: '6768',
    choice2: '4578',
    choice3: '4578',
    choice4: '4286',
    answer: 4,
  },
  {
    question: 'Which pandemic is now affecting the whole World?',
    choice1: 'Spanish Flu',
    choice2: 'Italian Plague',
    choice3: 'Covid-19',
    choice4: 'Persian Plague',
    answer: 3,
  },
  {
    question: 'What is 23783 + 190874 ?',
    choice1: '214657',
    choice2: '773227',
    choice3: '246678',
    choice4: '367789',
    answer: 1,
  },
  {
    question: 'Who won the Vivo-IPL 2021 ?',
    choice1: 'Mumbai Indias',
    choice2: 'Kolkata Knight Riders',
    choice3: 'Chennai Super Kings',
    choice4: 'Royal Challengers Bengal',
    answer: 3,
  },
  {
    question: 'Which famous singer died recently ?',
    choice1: 'Alka Yagnik',
    choice2: 'Asha Bhonsle',
    choice3: 'Kishore Kumar',
    choice4: 'Lata Mangeshkar',
    answer: 4,
  },
  {
    question: 'Which state produces maximum soybean?',
    choice1: 'Uttar Pradesh',
    choice2: 'Rajasthan',
    choice3: 'Madhya Pradesh',
    choice4: 'Bihar',
    answer: 3,
  },
  {
    question: 'The head quarters of world trade organization is in ?',
    choice1: 'Montreal',
    choice2: 'Geneva',
    choice3: 'Seattle',
    choice4: 'The Hague',
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    } else {
      decrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score = score + num;
  scoreText.innerText = score;
};

decrementScore = (num) => {
  score = score - num;
  scoreText.innerText = score;
};

startGame();
