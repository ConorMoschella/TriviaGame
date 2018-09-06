
  const myQuestions = [
    {
      question: "What comic did Batman make his first appearance in the DC Comic line-up?",
      answers: {
        a: "Detective Comics #27",
        b: "Action Comics #15",
        c: "Adventure Comics #27",
        d: "Dynamics Comics #15"
      },
      correctAnswer: "a"
    },
    {
      question: "At what age did Bruce Wayne don the cowl?",
      answers: {
        a: "23",
        b: "29",
        c: "32",
        d: "26"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the first villain Batman faced, back in 1939?",
      answers: {
        a: "Calendar Man",
        b: "Dr. Hugo Strange",
        c: "Dr. Death",
        d: "Mad Monk"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the Joker’s original villain alter-ego?",
      answers: {
        a: "Red Tide",
        b: "Red Hood",
        c: "Black Mask",
        d: "Deathstroke"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the correct order of canon Robins?",
      answers: {
        a: "Tim Drake, Jason Todd, Dick Grayson, Damian Wayne, Stephanie Brown",
        b: "Dick Grayson, Tim Drake, Jason Todd, Stephanie Brown, Damian Wayne",
        c: "Dick Grayson, Jason Todd, Tim Drake, Stephanie Brown, Damian Wayne",
        d: "Jason Todd, Dick Grayson, Tim Drake, Damian Wayne, Stephanie Brown"
      },
      correctAnswer: "c"
    },
    {
      question: "Which circus did Dick Grayson and his family work for?",
      answers: {
        a: "Rigley’s Circus",
        b: "Maly’s Circus",
        c: "Haly’s Circus",
        d: "Talia’s Circus"
      },
      correctAnswer: "c"
    },
    {
      question: "Who is Damian Wayne’s mother?",
      answers: {
        a: "Talia al Ghul",
        b: "Selena Kyle",
        c: "Lillian Rose",
        d: "Pamela Isley"
      },
      correctAnswer: "a"
    },
    {
      question: "Which Robins died in the line of duty?",
      answers: {
        a: "Jason Todd, Tim Drake, Damian Wayne",
        b: "Jason Todd, Stephanie Brown, Damian Wayne",
        c: "Dick Grayson, Stephanie Brown, Damian Wayne",
        d: "Jason Todd, Tim Drake, Stephanie Brown"
      },
      correctAnswer: "b"
    },
    {
      question: "Who is most commonly credited with Thomas and Martha Wayne’s death?",
      answers: {
        a: "Harry Moore",
        b: "Carmine Falcone",
        c: "Sal Maroni",
        d: "Joe Chill"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of these Batman villains was introduced first?",
      answers: {
        a: "The Riddler",
        b: "Catwoman",
        c: "Mr Freeze",
        d: "The Penguin"
      },
      correctAnswer: "b"
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
