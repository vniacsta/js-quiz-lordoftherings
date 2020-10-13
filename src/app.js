const quizData = [
  {
    question: 'When Frodo and the other hobbits first meet Aragorn, he goes by what name?',
    options: ['Arathorn', 'Ranger', 'Elessar', 'Strider'],
    correct: 3
  },
  {
    question: 'To open the gate to Moria, Gandalf says the Elvish word for:',
    options: ['Enter', 'Dwarf', 'Friend', 'Open'],
    correct: 2
  },
  {
    question: 'At the beginning of The Fellowship of the Ring, Bilbo is celebrating his birthday. How old is he?',
    options: [77, 101, 111, 135],
    correct: 2
  },
  {
    question: 'In what country was The Lord of the Rings trilogy filmed?',
    options: ['Australia', 'New Zealand', 'Norway', 'England'],
    correct: 1
  },
  {
    question: 'Whose voice is the first we hear in The Lord of the Rings?',
    options: ['Gandalf', 'Galadriel', 'Bilbo', 'Sauron'],
    correct: 1
  },
  {
    question: 'Aragorn is the heir of which king of Gondor?',
    options: ['Elendil', 'Isildor', 'Numendil', 'Arathorn'],
    correct: 1
  },
  {
    question: 'How are Merry and Pippin related?',
    options: ['Step brothers', 'Brothers', 'Not related', 'First cousins'],
    correct: 3
  },
  {
    question: 'Who directed the film Return of the King?',
    options: ['Guillermo Del Toro', 'Ridley Scott', 'Ron Howard', 'Peter Jackson'],
    correct: 3
  },
  {
    question: 'Including the Witch King, how many Nazgûl are there?',
    options: [9, 5, 8, 6],
    correct: 0
  }, 
  {
    question: 'What is the name of the volcano where the One Ring is forged and later destroyed?',
    options: ['Mount Morgoth', 'Mount Doom', 'Mount Death', 'Mount Mordor'],
    correct: 1
  }
];

const questions = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answers'));
const questionCounterText = document.getElementById('question-counter');

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let acceptingAnswers = false;

startQuiz = () => {
  questionCounter = 0;
  availableQuestions = [...quizData]
  getNextQuestion();
};

getNextQuestion = () => {
  if (questionCounter >= quizData.length || availableQuestions.length === 0) {
    // when the quiz is finished, it will redirected to score page
    return window.location.assign('score.html');
    
  } else {
    questionCounter++;
    questionCounterText.innerHTML = `Question ${questionCounter} of ${quizData.length}`;

    // makes the quiz start randomly
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questions.innerText = currentQuestion.question;

    // iterate using the 'data-number' set on html element
    choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion.options[number];
    });

    // so the questions do not repeat
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  }
};

startQuiz();
