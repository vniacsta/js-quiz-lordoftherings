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
    question: 'At the beginning of \'The Fellowship of the Ring\', Bilbo is celebrating his birthday. How old is he?',
    options: [77, 101, 111, 135],
    correct: 2
  },
  {
    question: 'In what country was \'The Lord of the Rings\' trilogy filmed?',
    options: ['Australia', 'New Zealand', 'Norway', 'England'],
    correct: 1
  },
  {
    question: 'Whose voice is the first we hear in \'The Lord of the Rings\'?',
    options: ['Gandalf', 'Galadriel', 'Bilbo', 'Sauron'],
    correct: 1
  },
  {
    question: 'Aragorn is the heir of which king of Gondor?',
    options: ['Elendil', 'Isildur', 'Numendil', 'Arathorn'],
    correct: 1
  },
  {
    question: 'How are Merry and Pippin related?',
    options: ['Step brothers', 'Brothers', 'Not related', 'First cousins'],
    correct: 3
  },
  {
    question: 'Who directed the film \'Return of the King\'?',
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
  },
  {
    question: 'Finish this quote: \'Po-ta-toes. Boil \'em. Mash \'em. Stick \'em in ____.\'',
    options: ['a pie', 'a pot', 'the mouth', 'a stew'],
    correct: 3
  },
  {
    question: 'While on the hunt for the orcs who captured Merry and Pippin, Aragorn discovers what clue?',
    options: ['An Elven Brooch', 'An Elven Knife', 'A Shire Brooch', 'A Lorien Silver Belt'],
    correct: 0
  },
  {
    question: 'What is Wormtongue’s real name?',
    options: ['Lotho', 'Grima', 'Larma', 'Dourif'],
    correct: 1
  },
  {
    question: 'Which of the following is NOT one of Gandalf’s nicknames?',
    options: ['Gandalf Greyhame', 'Flame of Udun', 'Mithrandir', 'Gandalf Stormcrow'],
    correct: 1
  },
  {
    question: 'Name the giant spider who tried to eat Frodo.',
    options: ['Ungoliant', 'Balrog', 'Morgoth', 'Shelob'],
    correct: 3
  },
  {
    question: 'The shards of the sword Narsil are reforged into what new sword?',
    options: ['Orcist', 'Anduril', 'Glamdring', 'Narsil II'],
    correct: 1
  },
  {
    question: 'What year was \'The Two Towers\' released in theaters?',
    options: ['1999', '2007', '2002', '2001'],
    correct: 2
  },
  {
    question: 'In the \'Two Towers\' (extended edition), Aragorn is revealed to be how old?',
    options: [84, 95, 87, 200],
    correct: 2
  },
  {
    question: 'Who kills the Witch King?',
    options: ['Gandalf', 'Saruman', 'Éomer', 'Éowyn'],
    correct: 3
  },
  {
    question: 'Which of these characters does NOT look into the Palantir of Orthanc?',
    options: ['Saruman', 'Legolas', 'Aragorn', 'Gandalf'],
    correct: 3
  }
];

const introductionElement = document.getElementById('introduction-box');
const quizElement = document.getElementById('quiz-box');
const scoreElement = document.getElementById('score-box');
const getStarted = document.getElementById('start');

const questions = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answers'));
const questionCounterText = document.getElementById('question-counter');
const nextBtn = document.getElementById('next-btn');
const answerResult = document.getElementById('result');
const totalScore = document.getElementById('score-result');
const totalQuestions = quizData.length;

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let acceptingAnswers = false;
let score = 0;

startQuiz = () => {
  questionCounter = 0;
  availableQuestions = [...quizData];
  score = 0;
  getNextQuestion();
};

getNextQuestion = () => {

  if (questionCounter === (totalQuestions - 1) || availableQuestions.length === 0) {
    nextBtn.innerText = `Finish quiz`;
    showScore();
  }
  
  // to stop the script from running after displaying the score
  if (questionCounter === totalQuestions) {
    return false;
  }

  questionCounterText.innerText = `Question ${questionCounter + 1} of ${totalQuestions}`;
  questionCounter++;
  
  // iterates through the questions randomly
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questions.innerText = currentQuestion.question;
  
  // iterates using the 'data-number' set on html element
  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion.options[number];
    // setting atribute to html elements to get results
    choice.setAttribute('onclick', 'getResult(this)');
  });
  
  // in order not to repeat the question
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

getResult = (element) => {

  acceptingAnswers = false;

  // to get the index of the clicked answer
  const idChoice = choices.indexOf(element);
  // to get the index of the correct answer
  const idCorrect = currentQuestion.correct;

  if (idChoice === idCorrect) {
    score++;
    element.style.color = '#28a862';
    element.style.borderColor = '#28a862';
    element.innerHTML += `    <span class='symbols'>✔</span>`;
  } else {
    element.style.color = '#f03e3e';
    element.style.borderColor = '#f03e3e';
    element.innerHTML += `    <span class='symbols'>✖</span>`;
    answerResult.innerHTML = `The correct answer is: <span class='symbols'>${currentQuestion.options[idCorrect]} ✔</span>`;
  }

  // to restrict the user to give another try
  denyMoreAnswers();

  // to get to the next question by clicking the button
  nextBtn.addEventListener('click', () => {

    element.style.color = '#cba135';
    element.style.borderColor = '#cba135';
    answerResult.innerHTML = null;
    
    choices.forEach((choice) => {
      choice.style.pointerEvents = 'auto';
    });
    
    // to make sure the function doesn't jump questions
    if(!acceptingAnswers) {
      getNextQuestion();
    }
  });
};

denyMoreAnswers = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
};

showScore = () => {
  nextBtn.addEventListener('click', () => {
    
    quizElement.setAttribute('style', 'display: none');
    scoreElement.setAttribute('style', 'display: inherit');

    // add score feedback
    if (score === totalQuestions) {
      totalScore.innerHTML = `${Math.floor(score / totalQuestions * 100)}% · ${score} of ${totalQuestions}<br /><small>Wow! You are an expert 🤩</small>`;
    } else if (score > (totalQuestions / 2)) {
      totalScore.innerHTML = `${Math.floor(score / totalQuestions * 100)}% · ${score} of ${totalQuestions}<br /><small>At least you got more than half right 🙄</small>`;
    } else if (score < (totalQuestions / 2)) {
      totalScore.innerHTML = `${Math.floor(score / totalQuestions * 100)}% · ${score} of ${totalQuestions}<br /><small>Less than half? You are not a true fan!<br />Go watch the movies and start again 😑</small`;
    }
  });
};

getStarted.addEventListener('click', () => {
  
  introductionElement.setAttribute('style', 'display: none');
  quizElement.setAttribute('style', 'display: inherit');
  
  startQuiz();
});