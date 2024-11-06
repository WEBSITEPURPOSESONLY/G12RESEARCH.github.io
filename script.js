// Global variables to manage the quiz state
let currentQuestion = 0;
let currentScore = 0;
let selectedSubject = 'math';  // Default subject

const questions = {
    math: [
        { question: "What is 5 + 3?", choices: { A: "8", B: "7", C: "9", D: "6" }, correct: "A" },
        { question: "What is 12 x 3?", choices: { A: "36", B: "24", C: "48", D: "60" }, correct: "A" }
    ],
    science: [
        { question: "What is the chemical symbol for water?", choices: { A: "H2O", B: "O2", C: "CO2", D: "HO2" }, correct: "A" },
        { question: "What planet is closest to the sun?", choices: { A: "Mercury", B: "Venus", C: "Earth", D: "Mars" }, correct: "A" }
    ],
    history: [
        { question: "Who was the first president of the USA?", choices: { A: "George Washington", B: "Abraham Lincoln", C: "Thomas Jefferson", D: "John Adams" }, correct: "A" },
        { question: "In what year did World War II end?", choices: { A: "1945", B: "1939", C: "1941", D: "1950" }, correct: "A" }
    ]
};

// Function to show options screen
function showOptions() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('options').style.display = 'block';
}

// Function to hide options screen and return to menu
function hideOptions() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

// Function to start the quiz
function startQuiz() {
    selectedSubject = document.getElementById('subject').value;
    document.getElementById('subjectName').textContent = selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1);
    document.getElementById('options').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    currentQuestion = 0;
    currentScore = 0;
    document.getElementById('score').textContent = currentScore;
    showQuestion();
}

// Function to display a question
function showQuestion() {
    const question = questions[selectedSubject][currentQuestion];
    document.getElementById('question').textContent = question.question;
    const choices = document.getElementById('choices');
    choices.innerHTML = ''; // Clear previous choices

    for (const choice in question.choices) {
        const button = document.createElement('button');
        button.textContent = question.choices[choice];
        button.onclick = () => checkAnswer(choice);
        choices.appendChild(button);
    }
}

// Function to check the answer
function checkAnswer(answer) {
    const correctAnswer = questions[selectedSubject][currentQuestion].correct;
    if (answer === correctAnswer) {
        currentScore++;
        document.getElementById('feedback').textContent = "Correct!";
    } else {
        document.getElementById('feedback').textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
    }
    document.getElementById('score').textContent = currentScore;
}

// Function to go to the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions[selectedSubject].length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz and display home button
function endQuiz() {
    document.getElementById('feedback').textContent = `Quiz Over! Final Score: ${currentScore}`;
    document.getElementById('nextButton').style.display = 'none'; // Hide "Next Question" button
    document.getElementById('homeButton').style.display = 'block'; // Show "Home" button
}

// Function to go home (back to the main menu)
function goHome() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('nextButton').style.display = 'block'; // Reset "Next Question" button
    document.getElementById('homeButton').style.display = 'none'; // Hide "Home" button
}
// Global variable to store custom quiz
// Store custom quizzes
let customQuizzes = [];
let questionIndex = 0; // To keep track of added questions

// Show custom quiz form
function showCustomQuizForm() {
    document.getElementById('customQuizForm').style.display = 'block';
    document.getElementById('options').style.display = 'none';
}

// Hide custom quiz form
function hideCustomQuizForm() {
    document.getElementById('customQuizForm').style.display = 'none';
    document.getElementById('options').style.display = 'block';
}

// Add a new question to the form
function addQuestion() {
    questionIndex++;
    const questionContainer = document.getElementById('questionContainer');
    
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-form');
    
    questionDiv.innerHTML = `
        <label for="customQuestion${questionIndex}">Question ${questionIndex}:</label>
        <input type="text" id="customQuestion${questionIndex}" placeholder="Enter your question here" required>
        
        <br><br>
        
        <label for="customAnswerA${questionIndex}">Choice A:</label>
        <input type="text" id="customAnswerA${questionIndex}" placeholder="Enter choice A" required>
        
        <br><br>
        
        <label for="customAnswerB${questionIndex}">Choice B:</label>
        <input type="text" id="customAnswerB${questionIndex}" placeholder="Enter choice B" required>
        
        <br><br>
        
        <label for="customAnswerC${questionIndex}">Choice C:</label>
        <input type="text" id="customAnswerC${questionIndex}" placeholder="Enter choice C" required>
        
        <br><br>
        
        <label for="customAnswerD${questionIndex}">Choice D:</label>
        <input type="text" id="customAnswerD${questionIndex}" placeholder="Enter choice D" required>
        
        <br><br>
        
        <label for="customCorrectAnswer${questionIndex}">Correct Answer:</label>
        <select id="customCorrectAnswer${questionIndex}" required>
            <option value="A">Choice A</option>
            <option value="B">Choice B</option>
            <option value="C">Choice C</option>
            <option value="D">Choice D</option>
        </select>
        
        <br><br>
    `;
    questionContainer.appendChild(questionDiv);
}

// Save the custom quiz
function saveCustomQuiz() {
    const quizTitle = document.getElementById('quizTitle').value;
    const questions = getQuestionsFromForm(); // Function to retrieve questions from the form

    if (!quizTitle) {
        alert("Please enter a title for your quiz.");
        return;
    }

    if (questions.length === 0) {
        alert("Please add at least one question.");
        return;
    }

    // Store the custom quiz
    customQuizzes.push({ title: quizTitle, questions: questions });

    // Add the custom quiz to the dropdown
    addCustomQuizToDropdown(quizTitle);

    // Hide the custom quiz form and return to options
    hideCustomQuizForm();
    alert('Custom Quiz saved!');
}

// Get questions from the form
function getQuestionsFromForm() {
    const questions = [];
    for (let i = 1; i <= questionIndex; i++) {
        const question = document.getElementById(`customQuestion${i}`).value;
        const answerA = document.getElementById(`customAnswerA${i}`).value;
        const answerB = document.getElementById(`customAnswerB${i}`).value;
        const answerC = document.getElementById(`customAnswerC${i}`).value;
        const answerD = document.getElementById(`customAnswerD${i}`).value;
        const correctAnswer = document.getElementById(`customCorrectAnswer${i}`).value;

        if (question && answerA && answerB && answerC && answerD && correctAnswer) {
            questions.push({
                question: question,
                choices: [answerA, answerB, answerC, answerD],
                correctAnswer: correctAnswer
            });
        }
    }
    return questions;
}

// Add custom quiz to dropdown
function addCustomQuizToDropdown(quizTitle) {
    const dropdown = document.getElementById('subject');
    const customQuizOption = document.createElement('option');
    customQuizOption.value = quizTitle; // Use the title as the value
    customQuizOption.innerHTML = quizTitle; // Display the title in the dropdown
    dropdown.appendChild(customQuizOption);
}