const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. What has a face and two hands but no arms or legs?",
        choices: ["A clock", "A hole", "A fence", "The future"],
        answer: "A clock"
    },
    {
        question: "Q. What has a neck but no head?",
        choices: ["A stamp", " A piano", "A bottle", "A carrot"],
        answer: "A bottle"
    },
    {
        question: "Q. What gets bigger the more you take away?",
        choices: ["A needle", "A hole", "A coin", "A stamp"],
        answer: "A hole"
    },
    {
        question: "Q. What has keys but can’t open doors?",
        choices: ["Your age", "A computer keyboard", "A bottle", " Trouble"],
        answer: "A computer keyboard"
    },
    {
        question: "Q.What’s easy to get into but hard to get out of?",
        choices: ["A bottle", "Trouble", "Your age", " A promise"],
        answer: "Trouble"
    },
    {
        question: "Q. What can you break, even if you never pick it up or touch it?",
        choices: ["A cold", "A promise", "A bottle", " A clock"],
        answer: "A promise"
    },
    {
        question: "Q. What’s orange and sounds like a parrot?",
        choices: ["A penny", "A carrot", "A bottle", " A river"],
        answer: "A carrot"
    },
    {
        question: "Q. What’s full of holes but still holds water?",
        choices: ["A piano", "A sponge", "A bottle", " Incorrectly"],
        answer: "A sponge"
    },
    {
        question: "Q. Why did the tomato turn red?",
        choices: ["Saw the salad dressing", "His gf got in front of him", "dont know", " office late"],
        answer: "Saw the salad dressing"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 25;
let timerID = null;


const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}


const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {

        displayAlert("Correct Answer!");
        score++;
    }
    else {

        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}


const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}


const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}


const startTimer = () => {
    clearInterval(timerID); 
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}


const stopTimer = () =>{
    clearInterval(timerID);
}


const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}


startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {

        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});