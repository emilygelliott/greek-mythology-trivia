let questions = [
    {
        question: "Who is the king of the greek gods?",
        answers: ["Zeus", "Poseidon", "Apollo", "Hades"],
        correct: "Zeus"
    },
    {
        question: "What is the name of the goddess of wisdom and war strategy?",
        answers: ["Helena", "Athena", "Persephone", "Hera"],
        correct: "Athena"
    },
    {
        question: "Who is the god of the sea?",
        answers: ["Hades", "Scylla", "Odysseus","Poseidon"],
        correct: "Poseidon"
    },
    {
        question: "What is the name of the messenger god with winged sandals?",
        answers: ["Apollo", "Hermes", "Hera", "Calypso"],
        correct: "Hermes"
    },
    {
        question: "Who is the king of the underworld?",
        answers: ["Zeus", "Poseidon", "Achilles", "Hades"],
        correct: "Hades"
    },
    {
        question: "What creature is half-man, half-bull?",
        answers: ["Minotaur", "Scylla", "Centaur", "Cyclops"],
        correct: "Minotaur"
    },
    {
        question: "Which god stole fire from the gods and gave it to humans?",
        answers: ["Hermes", "Ares", "Hephaestus", "Prometheus"],
        correct: "Prometheus"
    },
    {
        question: "Which goddess turned Arachne into a spider?",
        answers: ["Artemis", "Hera", "Demeter", "Athena"],
        correct: "Athena"
    },
    {
        question: "What is the name of the creature that has the head of a woman and snakes for hair?",
        answers: ["Medusa", "Sirens", "Scylla", "Echidna"],
        correct: "Medusa"
    },
    {
        question: "Which hero's weakness was his heel?",
        answers: ["Hercules", "Theseus", "Achilles", "Odysseus"],
        correct: "Achilles"
    },
    {
        question: "Who is the goddess of love and beauty?",
        answers: ["Persephone", "Aphrodite", "Hera", "Athena"],
        correct: "Aphrodite"
    },
    {
        question: "Which titan holds up the sky?",
        answers: ["Zeus", "Atlas", "Kronos", "Prometheus"],
        correct: "Atlas"
    },
    {
        question: "What monster does Odysseus blind in a cave?",
        answers: ["Cyclops", "Scylla", "Siren", "Charybdis"],
        correct: "Cyclops"
    },
    {
        question: "How many heads is Scylla described as having?",
        answers: ["Six", "Three", "Nine", "Seven"],
        correct: "Six"
    },
    {
        question: "Who flew too close to the sun, causing his wax wings to melt?",
        answers: ["Hermes", "Helios", "Apollo", "Icarus"],
        correct: "Icarus"
    }
]

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const start = document.getElementById("start");
const next = document.getElementById("next");
const score = document.getElementById("score");

let currentQuestion = 0
let finalScore = 0
let usedQuestions = []

start.addEventListener("click", startTrivia);

function startTrivia(){
    finalScore = 0
    usedQuestions = []
    start.classList.add("hidden")
    next.classList.remove("hidden")
    score.classList.add("hidden")

    nextQuestion();
}

function randomQuestion() {
    if (usedQuestions.length == questions.length){
        return null;
    }

    let index;

    do{
        index = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(index))
    
    usedQuestions.push(index);
    return questions[index]
}

function nextQuestion(){
    answers.innerHTML = "";

    let q = randomQuestion();

    if (!q){
        endTrivia();
        return;
    }

    currentQuestion = q

    question.textContent = q.question

    q.answers.forEach(answer => {
        let btn = document.createElement("button");
        btn.textContent = answer;
        btn.addEventListener("click", () => checkAnswer(answer)); 
        answers.appendChild(btn);
    })
}

function checkAnswer(answer){
    if (answer == currentQuestion.correct){
        finalScore ++;
        question.textContent = "Correct!"
    } else {
        question.textContent = "Incorrect..."
    } 

    Array.from(answers.children).forEach(btn =>{
        btn.disabled = true
        btn.style.opacity = 0.6
    })
}

next.addEventListener("click", nextQuestion)

function endTrivia(){
    question.textContent = "🌿 Your Results 🌿"
    answers.innerHTML = "";
    next.classList.add("hidden")
    start.classList.remove("hidden")

    score.classList.remove("hidden");
    score.textContent = `You answered ${finalScore} / ${questions.length} questions correctly!`
}

const form = document.getElementById("question_form")

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    let newQuestion = document.getElementById("new_question").value 
    let newAnswers = document.getElementById("new_answers").value.split(",")
    let newCorrect = document.getElementById("new_correct_answer").value 

    let new_question = {
        question: newQuestion,
        answers: newAnswers.map(a => a.trim()),
        correct: newCorrect.trim()
    }

    questions.push(new_question);

    form.reset();

    alert("You have successfully added a new question to the trivia!")
});



