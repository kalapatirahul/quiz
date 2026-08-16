// ========================================
// QUESTION BANK - 15 QUESTIONS
// ========================================

const questionBank = [

    {
        question: "Which plan proposed the partition of British India into two dominions?",

        options: [
            "Cripps Mission Plan",
            "Cabinet Mission Plan",
            "Mountbatten Plan",
            "Wavell Plan"
        ],

        answer: 2
    },

    {
        question: "In which year did India become independent?",

        options: [
            "1945",
            "1946",
            "1947",
            "1950"
        ],

        answer: 2
    },

    {
        question: "Where was Jana Gana Mana first sung publicly?",

        options: [
            "Bombay",
            "Calcutta",
            "Indraprastha",
            "Madras"
        ],

        answer: 1
    },

    {
        question: "Who designed the Indian National Flag?",

        options: [
            "Mahatma Gandhi",
            "Pingali Venkayya",
            "Jawaharlal Nehru",
            "Subhas Chandra Bose"
        ],

        answer: 1
    },

    {
        question: "How many spokes are there in the Ashoka Chakra?",

        options: [
            "12",
            "18",
            "24",
            "32"
        ],

        answer: 2
    },

    {
        question: "Which British Act formally ended British rule in India and created the two independent dominions?",

        options: [
            "Government of India Act, 1935",
            "Indian Independence Act, 1947",
            "Regulating Act, 1773",
            "Charter Act, 1833"
        ],

        answer: 1
    },

    {
        question: "In which country was the Indian National Army (INA) first formed in 1942?",

        options: [
            "Japan",
            "Singapore",
            "Burma",
            "Malaysia"
        ],

        answer: 1
    },

    {
        question: "Who is popularly known as Netaji?",

        options: [
            "Bhagat Singh",
            "Subhas Chandra Bose",
            "Sardar Patel",
            "Rajendra Prasad"
        ],

        answer: 1
    },

    {
        question: "Which movement was launched in 1855?",

        options: [
            "Quit India Movement",
            "Santhal Rebellion",
            "Non-Cooperation Movement",
            "Civil Disobedience Movement"
        ],

        answer: 1
    },

    {
        question: 'Who wrote "Vande Mataram"?',

        options: [
            "Rabindranath Tagore",
            "Bankim Chandra Chatterjee",
            "Mahatma Gandhi",
            "Sarojini Naidu"
        ],

        answer: 1
    },

    {
        question: 'Who delivered the "Tryst with Destiny" speech?',

        options: [
            "Mahatma Gandhi",
            "Jawaharlal Nehru",
            "Sardar Patel",
            "Subhas Chandra Bose"
        ],

        answer: 1
    },

    {
        question: "Who was the last Viceroy of British India?",

        options: [
            "Lord Curzon",
            "Lord Wavell",
            "Lord Mountbatten",
            "Lord Irwin"
        ],

        answer: 2
    },

    {
        question: "Which operation integrated Hyderabad into India?",

        options: [
            "Operation Vijay",
            "Operation Polo",
            "Operation Blue Star",
            "Operation Flood"
        ],

        answer: 1
    },

    {
        question: "When was the Constitution of India adopted?",

        options: [
            "15 August 1947",
            "26 November 1949",
            "26 January 1950",
            "15 August 1950"
        ],

        answer: 1
    },

    {
        question: "How many years of independence does India celebrate in 2026?",

        options: [
            "77 years",
            "78 years",
            "79 years",
            "80 years"
        ],

        answer: 2
    }

];



// ========================================
// QUIZ SETTINGS
// ========================================

const TOTAL_QUESTIONS = 10;

const ADMIN_TOTAL_QUESTIONS = 15;

const TIME_PER_QUESTION = 5;


// ========================================
// CURRENT STUDENT QUIZ QUESTIONS
// ========================================

let questions = [];


// ========================================
// VARIABLES
// ========================================

let currentQuestion = 0;

let userScore = 0;

let currentRollNumber = "";

let currentStudentName = "";

let isGuest = false;


// ========================================
// QUESTION PERFORMANCE
// ========================================
//
// Stores the student's answer result for each
// question during the current quiz.
//
// 0 = unanswered / time up
// 1 = correct
//
// These results are saved to Firebase for
// administrator statistics.
//

let studentQuestionResults = [];


// ========================================
// QUIZ TIME VARIABLES
// ========================================
//
// Used internally for leaderboard ranking.
// NEVER displayed to students.
//

let quizStartTime = null;

let quizTimeTaken = 0;


// ========================================
// TIMER VARIABLES
// ========================================

let timeLeft = TIME_PER_QUESTION;

let timerInterval = null;

let questionAnswered = false;
let selectedStudentAnswer = null;


// ========================================
// ADMIN VARIABLES
// ========================================

let isAdmin = false;

let adminQuestions = [];

let adminCurrentQuestion = 0;

let adminScore = 0;

let adminTimeLeft = TIME_PER_QUESTION;

let adminTimerInterval = null;

let adminQuestionAnswered = false;


// ========================================
// REFRESH / PAGE STATE
// ========================================

const PAGE_STATE_KEY = "independenceQuizPageState";

let restoringStudentState = false;
let restoringAdminState = false;

function savePageState() {

    const state = {
        screen: "welcomeScreen",
        adminPanel: "menu",
        currentRollNumber: currentRollNumber,
        currentStudentName: currentStudentName,
        isGuest: isGuest,
        isAdmin: isAdmin,
        currentQuestion: currentQuestion,
        userScore: userScore,
        questions: questions,
        studentQuestionResults: studentQuestionResults,
        questionAnswered: questionAnswered,
        selectedAnswer: selectedStudentAnswer,
        timeLeft: timeLeft,
        quizTimeTaken: quizTimeTaken,
        resultMessage: document.getElementById("resultMessage")?.textContent || "",
        adminQuestions: adminQuestions,
        adminCurrentQuestion: adminCurrentQuestion,
        adminScore: adminScore,
        adminQuestionAnswered: adminQuestionAnswered,
        adminTimeLeft: adminTimeLeft
    };

    const screens = [
        "welcomeScreen",
        "celebrationScreen",
        "loginScreen",
        "quizScreen",
        "resultScreen",
        "completedScreen",
        "leaderboardScreen",
        "adminScreen"
    ];

    for (const id of screens) {
        const element = document.getElementById(id);
        if (element && getComputedStyle(element).display !== "none") {
            state.screen = id;
            break;
        }
    }

    if (document.getElementById("adminScreen")?.style.display === "flex") {
        if (document.getElementById("adminTestPanel")?.style.display === "block") {
            state.adminPanel = "test";
        } else if (document.getElementById("adminStatisticsPanel")?.style.display === "block") {
            state.adminPanel = "statistics";
        } else if (document.getElementById("adminLeaderboardPanel")?.style.display === "block") {
            state.adminPanel = "leaderboard";
        } else {
            state.adminPanel = "menu";
        }
    }

    try {
        sessionStorage.setItem(
            PAGE_STATE_KEY,
            JSON.stringify(state)
        );
    } catch (errorObject) {
        console.error("Unable to save page state:", errorObject);
    }
}

function getSavedPageState() {

    try {
        const saved = sessionStorage.getItem(PAGE_STATE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (errorObject) {
        console.error("Unable to read saved page state:", errorObject);
        return null;
    }
}

function clearSavedPageState() {
    sessionStorage.removeItem(PAGE_STATE_KEY);
}

function hideAllScreens() {

    const screens = [
        "welcomeScreen",
        "celebrationScreen",
        "loginScreen",
        "quizScreen",
        "resultScreen",
        "completedScreen",
        "leaderboardScreen",
        "adminScreen"
    ];

    screens.forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "none";
        }
    });
}

function restoreSavedPage() {

    const state = getSavedPageState();

    if (!state) {
        savePageState();
        return;
    }

    currentRollNumber = state.currentRollNumber || "";
    currentStudentName = state.currentStudentName || "";
    isGuest = state.isGuest === true;
    isAdmin = state.isAdmin === true;

    if (
        state.stage === "celebration" ||
        state.screen === "celebrationScreen"
    ) {
        startCelebrationStage();
        return;
    }

    if (state.screen === "quizScreen" && Array.isArray(state.questions) && state.questions.length) {

        questions = state.questions;
        currentQuestion = Number(state.currentQuestion) || 0;
        userScore = Number(state.userScore) || 0;
        studentQuestionResults = Array.isArray(state.studentQuestionResults)
            ? state.studentQuestionResults
            : [];
        questionAnswered = state.questionAnswered === true;
        timeLeft = Number(state.timeLeft) || TIME_PER_QUESTION;

        hideAllScreens();
        document.getElementById("quizScreen").style.display = "flex";

        restoringStudentState = true;
        loadQuestion();

        if (state.questionAnswered === true) {
            selectedStudentAnswer = typeof state.selectedAnswer === "number"
                ? state.selectedAnswer
                : null;
            restoreStudentAnsweredState(state);
            savePageState();
        }

        return;
    }

    if (state.screen === "adminScreen" && state.adminPanel === "test" &&
        Array.isArray(state.adminQuestions) && state.adminQuestions.length) {

        adminQuestions = state.adminQuestions;
        adminCurrentQuestion = Number(state.adminCurrentQuestion) || 0;
        adminScore = Number(state.adminScore) || 0;
        adminQuestionAnswered = state.adminQuestionAnswered === true;
        adminTimeLeft = Number(state.adminTimeLeft) || TIME_PER_QUESTION;

        hideAllScreens();
        document.getElementById("adminScreen").style.display = "flex";

        showAdminTestForRestore(state);
        return;
    }

    if (state.screen === "adminScreen") {

        hideAllScreens();
        document.getElementById("adminScreen").style.display = "flex";
        showAdminMenu();

        if (state.adminPanel === "leaderboard") {
            adminShowLeaderboard();
        } else if (state.adminPanel === "statistics") {
            adminShowStatistics();
        }

        return;
    }

    hideAllScreens();

    const screen = document.getElementById(state.screen);

    if (screen) {
        screen.style.display = "flex";
    } else {
        document.getElementById("welcomeScreen").style.display = "flex";
    }

    if (state.screen === "resultScreen") {
        document.getElementById("resultName").textContent = currentStudentName;
        document.getElementById("finalScore").textContent = userScore;
        showResultMessage();
    }

    if (state.screen === "completedScreen") {
        document.getElementById("alreadyName").textContent = currentStudentName;
        document.getElementById("alreadyScore").textContent = userScore;
    }

    if (state.screen === "leaderboardScreen") {
        createLeaderboard();
    }
}

function restoreStudentAnsweredState(state) {

    clearInterval(timerInterval);
    stopTimerMusic();

    const buttons = document.querySelectorAll("#options .option");
    buttons.forEach(function (button) {
        button.disabled = true;
    });

    const question = questions[currentQuestion];
    const selectedAnswer = state.selectedAnswer;

    if (typeof selectedAnswer === "number" && buttons[selectedAnswer]) {
        if (selectedAnswer === question.answer) {
            buttons[selectedAnswer].classList.add("correct");
        } else {
            buttons[selectedAnswer].classList.add("wrong");
            if (buttons[question.answer]) {
                buttons[question.answer].classList.add("correct");
            }
        }
    } else if (buttons[question.answer]) {
        buttons[question.answer].classList.add("correct");
    }

    const feedback = document.getElementById("feedback");

    if (typeof selectedAnswer === "number") {
        feedback.textContent = selectedAnswer === question.answer
            ? "Correct Answer!"
            : "Wrong Answer!";
        feedback.style.color = selectedAnswer === question.answer
            ? "#138808"
            : "#dc3545";
    } else {
        feedback.textContent = "Time's up!";
        feedback.style.color = "#dc3545";
    }

    document.getElementById("nextButton").style.display = "block";
}

function showAdminTestForRestore(state) {

    document.getElementById("adminMenu").style.display = "none";
    document.getElementById("adminLeaderboardPanel").style.display = "none";
    document.getElementById("adminStatisticsPanel").style.display = "none";
    document.getElementById("adminTestPanel").style.display = "block";
    document.getElementById("adminTestResult").style.display = "none";
    document.getElementById("adminQuestion").style.display = "block";
    document.getElementById("adminOptions").style.display = "grid";
    document.getElementById("adminNextButton").style.display = "none";

    restoringAdminState = true;
    loadAdminQuestion();

    if (state.adminQuestionAnswered === true) {
        clearInterval(adminTimerInterval);
        stopTimerMusic();

        const buttons = document.querySelectorAll("#adminOptions .option");
        buttons.forEach(function (button) {
            button.disabled = true;
        });

        const question = adminQuestions[adminCurrentQuestion];
        if (buttons[question.answer]) {
            buttons[question.answer].classList.add("correct");
        }

        document.getElementById("adminFeedback").textContent =
            "Question already answered before refresh.";
        document.getElementById("adminFeedback").style.color = "#555";
        document.getElementById("adminNextButton").style.display = "block";
    }
}


// ========================================
// AUDIO VARIABLES
// ========================================

const backgroundMusic =
    document.getElementById("backgroundMusic");


// ========================================
// NA.mp3 VOLUME - 35%
// ========================================

if (backgroundMusic) {

    backgroundMusic.volume = 0.35;

}


const timerMusic =
    document.getElementById("timerMusic");

let musicLoopInterval = null;


// ========================================
// FIREBASE DATABASE
// ========================================

const FIREBASE_DATABASE_URL =
    "https://independence-day-quiz-20-aae32-default-rtdb.asia-southeast1.firebasedatabase.app";


// ========================================
// PLAY NA.mp3
// FROM 0 TO 25 SECONDS
// ========================================

function playBackgroundMusic() {

    if (!backgroundMusic) {

        return;

    }


    if (musicLoopInterval !== null) {

        clearInterval(
            musicLoopInterval
        );

        musicLoopInterval = null;

    }


    stopTimerMusic();


    backgroundMusic.currentTime = 0;


    backgroundMusic.play()
        .catch(function () {

            console.log(
                "Browser blocked autoplay. Music will start after user interaction."
            );

        });


    musicLoopInterval =
        setInterval(function () {

            if (
                backgroundMusic.currentTime >= 25
            ) {

                backgroundMusic.currentTime = 0;

                backgroundMusic.play()
                    .catch(function () {});

            }

        }, 100);

}


// ========================================
// STOP NA.mp3
// ========================================

function stopBackgroundMusic() {

    if (musicLoopInterval !== null) {

        clearInterval(
            musicLoopInterval
        );

        musicLoopInterval = null;

    }


    if (backgroundMusic) {

        backgroundMusic.pause();

        backgroundMusic.currentTime = 0;

    }

}


// ========================================
// PLAY timer.mp3
// ========================================

function playTimerMusic() {

    if (!timerMusic) {

        return;

    }


    stopBackgroundMusic();


    timerMusic.currentTime = 0;


    timerMusic.play()
        .catch(function () {

            console.log(
                "Timer music could not play."
            );

        });

}


// ========================================
// STOP timer.mp3
// ========================================

function stopTimerMusic() {

    if (!timerMusic) {

        return;

    }


    timerMusic.pause();

    timerMusic.currentTime = 0;

}


// ========================================
// WEBSITE OPEN
// ========================================

window.addEventListener(
    "load",
    function () {

        const savedState = getSavedPageState();

        if (savedState) {
            restoreSavedPage();
        } else {
            savePageState();
            playBackgroundMusic();
        }

    }
);


// ========================================
// CELEBRATION / LOGIN REFRESH STATE
// ========================================

let celebrationTimeout = null;

function startCelebrationStage() {

    clearTimeout(celebrationTimeout);

    hideAllScreens();

    const celebrationScreen =
        document.getElementById("celebrationScreen");

    if (celebrationScreen) {
        celebrationScreen.style.display = "flex";
    }

    playBackgroundMusic();

    saveCelebrationState();

    celebrationTimeout = setTimeout(function () {

        hideAllScreens();

        const loginScreen =
            document.getElementById("loginScreen");

        if (loginScreen) {
            loginScreen.style.display = "flex";
        }

        savePageState();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 4000);
}

function saveCelebrationState() {

    const state = getSavedPageState() || {};

    state.screen = "celebrationScreen";
    state.stage = "celebration";

    try {
        sessionStorage.setItem(
            PAGE_STATE_KEY,
            JSON.stringify(state)
        );
    } catch (errorObject) {
        console.error(
            "Unable to save celebration state:",
            errorObject
        );
    }
}


// ========================================
// OPEN CELEBRATION
// ========================================

function openCelebration() {

    startCelebrationStage();

}

// ========================================
// LOGIN
// ========================================

async function login() {

    const rollInput =
        document.getElementById(
            "rollNumber"
        );


    const nameInput =
        document.getElementById(
            "studentName"
        );


    const error =
        document.getElementById(
            "loginError"
        );


    // ========================================
    // IMPORTANT:
    // DO NOT CHANGE CASE BEFORE ADMIN CHECK.
    // Admin login is case-sensitive.
    // ========================================

    const rollNumber =
        rollInput.value.trim();


    const name =
        nameInput.value.trim();


    error.textContent = "";


    // ========================================
    // ADMIN LOGIN
    // ========================================
    //
    // Roll Number: Admin
    // Name: Rahul@2007
    //
    // BOTH ARE CASE-SENSITIVE.
    // ========================================

    if (
        rollNumber === "Admin" &&
        name === "Rahul@2007"
    ) {

        isAdmin = true;

        isGuest = false;

        currentRollNumber = "Admin";

        currentStudentName = "Rahul";

        stopTimerMusic();

        stopBackgroundMusic();

        openAdminPortal();

        return;

    }


    // ========================================
    // WRONG ADMIN FORMAT
    // ========================================
    //
    // If someone tries Admin with wrong
    // credentials, it is rejected.
    // ========================================

    if (
        rollNumber === "Admin" ||
        rollNumber === "ADMIN" ||
        rollNumber === "admin"
    ) {

        error.textContent =
            "Invalid admin credentials.";

        return;

    }


    // ========================================
    // CHECK NAME
    // ========================================

    if (name === "") {

        error.textContent =
            "Please enter your name.";

        return;

    }


    // ========================================
    // NORMALIZE STUDENT ROLL NUMBER
    // ========================================

    const normalizedRollNumber =
        rollNumber.toUpperCase();


    // ========================================
    // GUEST LOGIN
    // ========================================

    const guestRollNumber =
        "9703093680";


    const guestName =
        "GUEST";


    if (
        normalizedRollNumber === guestRollNumber &&
        name.toUpperCase() === guestName
    ) {

        isGuest = true;

        isAdmin = false;


        currentRollNumber =
            guestRollNumber;


        currentStudentName =
            "Guest";


        startQuiz();


        return;

    }


    // ========================================
    // GUEST ROLL NUMBER WITH WRONG NAME
    // ========================================

    if (
        normalizedRollNumber === guestRollNumber
    ) {

        error.textContent =
            'Guest login requires Name: "Guest".';

        return;

    }


    // ========================================
    // NORMAL STUDENT ROLL NUMBERS
    // ========================================

    const rollPattern =
        /^24102A0500(0[1-9]|[1-4][0-9]|5[0-8])$/;


    if (
        !rollPattern.test(
            normalizedRollNumber
        )
    ) {

        error.textContent =
            "This quiz is only for V Semester Information Technology students.";

        return;

    }


    // ========================================
    // NORMAL STUDENT
    // ========================================

    isGuest = false;

    isAdmin = false;


    currentRollNumber =
        normalizedRollNumber;


    currentStudentName =
        name;


    // ========================================
    // CHECK FIREBASE
    // ========================================

    try {

        const student =
            await getStudentFromFirebase(
                normalizedRollNumber
            );


        if (
            student !== null
        ) {

            showAlreadyCompleted(
                student.name || name,
                student.score || 0
            );

        }

        else {

            startQuiz();

        }

    }

    catch (errorObject) {

        console.error(
            "Firebase login check error:",
            errorObject
        );


        error.textContent =
            "Unable to connect to the quiz database. Please try again.";

    }

}


// ========================================
// GET STUDENT FROM FIREBASE
// ========================================

async function getStudentFromFirebase(
    rollNumber
) {

    const url =
        FIREBASE_DATABASE_URL +
        "/students/" +
        encodeURIComponent(
            rollNumber
        ) +
        ".json";


    const response =
        await fetch(url);


    if (
        !response.ok
    ) {

        throw new Error(
            "Firebase request failed: " +
            response.status
        );

    }


    const data =
        await response.json();


    return data;

}


// ========================================
// SAVE STUDENT TO FIREBASE
// ========================================

async function saveStudentToFirebase() {

    const studentData = {

        rollNumber:
            currentRollNumber,

        name:
            currentStudentName,

        score:
            userScore,

        totalQuestions:
            TOTAL_QUESTIONS,

        // Used only internally for ranking.
        // Never displayed.

        timeTaken:
            quizTimeTaken,

        completedAt:
            new Date().toISOString(),

        // Question-wise results.
        //
        // Used by Admin Statistics.

        questionResults:
            studentQuestionResults

    };


    const url =
        FIREBASE_DATABASE_URL +
        "/students/" +
        encodeURIComponent(
            currentRollNumber
        ) +
        ".json";


    const response =
        await fetch(
            url,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(
                        studentData
                    )

            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "Unable to save score to Firebase."
        );

    }


    return true;

}


// ========================================
// START STUDENT QUIZ
// ========================================

function startQuiz() {

    stopBackgroundMusic();

    stopTimerMusic();


    document.getElementById(
        "loginScreen"
    ).style.display =
        "none";


    document.getElementById(
        "quizScreen"
    ).style.display =
        "flex";


    currentQuestion = 0;

    userScore = 0;

    // Reset answer state for the first question.
    // This prevents an old quiz state from blocking
    // the first answer.
    questionAnswered = false;
    selectedStudentAnswer = null;


    studentQuestionResults = [];


    // ========================================
    // START TOTAL QUIZ TIME
    // ========================================

    quizStartTime =
        performance.now();

    quizTimeTaken = 0;


    // ========================================
    // ALWAYS INCLUDED
    // Q6, Q7, Q14
    // ========================================

    const alwaysIncludedQuestions = [

        questionBank[5],

        questionBank[6],

        questionBank[13]

    ];


    // ========================================
    // RANDOMLY SELECT 2
    // Q1, Q11, Q12, Q13
    // ========================================

    const randomTwoQuestions = [

        questionBank[0],

        questionBank[10],

        questionBank[11],

        questionBank[12]

    ];


    const selectedTwoQuestions =
        [...randomTwoQuestions]
            .sort(
                function () {

                    return Math.random() - 0.5;

                }
            )
            .slice(
                0,
                2
            );


    // ========================================
    // RANDOMLY SELECT 5
    // Q2, Q3, Q4, Q5, Q8, Q9, Q10, Q15
    // ========================================

    const randomFiveQuestions = [

        questionBank[1],

        questionBank[2],

        questionBank[3],

        questionBank[4],

        questionBank[7],

        questionBank[8],

        questionBank[9],

        questionBank[14]

    ];


    const selectedFiveQuestions =
        [...randomFiveQuestions]
            .sort(
                function () {

                    return Math.random() - 0.5;

                }
            )
            .slice(
                0,
                5
            );


    // ========================================
    // COMBINE
    // ========================================

    questions = [

        ...alwaysIncludedQuestions,

        ...selectedTwoQuestions,

        ...selectedFiveQuestions

    ];


    // ========================================
    // RANDOMIZE FINAL ORDER
    // ========================================

    questions =
        questions.sort(
            function () {

                return Math.random() - 0.5;

            }
        );


    // ========================================
    // CREATE RESULT ARRAY
    // ========================================

    questions.forEach(
        function () {

            studentQuestionResults.push(0);

        }
    );


    loadQuestion();
    savePageState();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// START STUDENT TIMER
// ========================================

function startTimer() {

    clearInterval(
        timerInterval
    );


    stopTimerMusic();


    if (!restoringStudentState) {
        timeLeft = TIME_PER_QUESTION;
        questionAnswered = false;
    } else {
        restoringStudentState = false;
    }


    const timer =
        document.getElementById(
            "timer"
        );


    timer.textContent =
        timeLeft;


    timer.classList.remove(
        "warning"
    );


    timer.classList.remove(
        "danger"
    );


    playTimerMusic();


    timerInterval =
        setInterval(function () {

            timeLeft--;


            timer.textContent =
                timeLeft;

            savePageState();


            if (
                timeLeft <= 4 &&
                timeLeft > 2
            ) {

                timer.classList.add(
                    "warning"
                );

            }


            if (
                timeLeft <= 2
            ) {

                timer.classList.remove(
                    "warning"
                );

                timer.classList.add(
                    "danger"
                );

            }


            if (
                timeLeft <= 0
            ) {

                clearInterval(
                    timerInterval
                );

                timeUp();

            }

        }, 1000);

}


// ========================================
// STUDENT TIME UP
// ========================================

function timeUp() {

    if (
        questionAnswered
    ) {

        return;

    }


    questionAnswered = true;
    selectedStudentAnswer = null;
    savePageState();


    clearInterval(
        timerInterval
    );


    stopTimerMusic();


    // ========================================
    // SAVE QUESTION AS WRONG
    // ========================================

    studentQuestionResults[
        currentQuestion
    ] = 0;


    const buttons =
        document.querySelectorAll(
            ".option"
        );


    buttons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    const question =
        questions[currentQuestion];


    buttons[question.answer]
        .classList.add(
            "correct"
        );


    const feedback =
        document.getElementById(
            "feedback"
        );


    feedback.textContent =
        "Time's up!";


    feedback.style.color =
        "#dc3545";


    document.getElementById(
        "nextButton"
    ).style.display =
        "block";

    savePageState();

}


// ========================================
// LOAD STUDENT QUESTION
// ========================================

function loadQuestion() {

    selectedStudentAnswer = null;

    const question =
        questions[currentQuestion];


    document.getElementById(
        "question"
    ).textContent =
        question.question;


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Question ${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;


    document.getElementById(
        "score"
    ).textContent =
        `Score: ${userScore}`;


    const progress =
        (
            (currentQuestion + 1)
            /
            TOTAL_QUESTIONS
        ) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";


    const optionsContainer =
        document.getElementById(
            "options"
        );


    optionsContainer.innerHTML =
        "";


    document.getElementById(
        "feedback"
    ).textContent =
        "";


    document.getElementById(
        "feedback"
    ).style.color =
        "";


    document.getElementById(
        "nextButton"
    ).style.display =
        "none";


    question.options.forEach(
        function (option, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                `${String.fromCharCode(65 + index)}) ${option}`;


            button.onclick =
                function () {

                    checkAnswer(index);

                };


            optionsContainer.appendChild(
                button
            );

        }
    );


    startTimer();
    savePageState();

}


// ========================================
// CHECK STUDENT ANSWER
// ========================================

function checkAnswer(
    selectedAnswer
) {

    if (
        questionAnswered
    ) {

        return;

    }


    questionAnswered = true;
    selectedStudentAnswer = selectedAnswer;


    clearInterval(
        timerInterval
    );


    stopTimerMusic();


    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".option"
        );


    buttons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    // ========================================
    // CORRECT
    // ========================================

    if (
        selectedAnswer ===
        question.answer
    ) {

        studentQuestionResults[
            currentQuestion
        ] = 1;


        buttons[selectedAnswer]
            .classList.add(
                "correct"
            );


        document.getElementById(
            "feedback"
        ).textContent =
            "Correct Answer!";


        document.getElementById(
            "feedback"
        ).style.color =
            "#138808";


        userScore++;

    }


    // ========================================
    // WRONG
    // ========================================

    else {

        studentQuestionResults[
            currentQuestion
        ] = 0;


        buttons[selectedAnswer]
            .classList.add(
                "wrong"
            );


        buttons[question.answer]
            .classList.add(
                "correct"
            );


        document.getElementById(
            "feedback"
        ).textContent =
            "Wrong Answer!";


        document.getElementById(
            "feedback"
        ).style.color =
            "#dc3545";

    }


    document.getElementById(
        "score"
    ).textContent =
        `Score: ${userScore}`;


    document.getElementById(
        "nextButton"
    ).style.display =
        "block";

}


// ========================================
// NEXT STUDENT QUESTION
// ========================================

function nextQuestion() {

    clearInterval(
        timerInterval
    );


    stopTimerMusic();


    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        loadQuestion();

    }

    else {

        finishQuiz();

    }

}


// ========================================
// FINISH STUDENT QUIZ
// ========================================

async function finishQuiz() {

    clearInterval(
        timerInterval
    );


    stopTimerMusic();


    // ========================================
    // CALCULATE TOTAL TIME
    // ========================================

    if (
        quizStartTime !== null
    ) {

        quizTimeTaken =
            Math.round(
                (
                    performance.now() -
                    quizStartTime
                ) * 10
            ) / 10;

    }


    playBackgroundMusic();


    // ========================================
    // GUEST
    // ========================================

    if (
        isGuest
    ) {

        showGuestResult();

        return;

    }


    // ========================================
    // ADMIN SAFETY
    // ========================================
    //
    // Admin should NEVER reach student save.
    // ========================================

    if (
        isAdmin
    ) {

        showAdminPortal();

        return;

    }


    // ========================================
    // SAVE NORMAL STUDENT
    // ========================================

    try {

        await saveStudentToFirebase();

        showResult();

    }

    catch (errorObject) {

        console.error(
            "Firebase save error:",
            errorObject
        );


        document.getElementById(
            "quizScreen"
        ).style.display =
            "none";


        document.getElementById(
            "resultScreen"
        ).style.display =
            "flex";


        document.getElementById(
            "resultName"
        ).textContent =
            currentStudentName;


        document.getElementById(
            "finalScore"
        ).textContent =
            userScore;


        document.getElementById(
            "resultMessage"
        ).textContent =
            "Your quiz is completed, but your score could not be saved to the leaderboard. Please contact the organizer.";

        savePageState();

    }

}


// ========================================
// SHOW NORMAL RESULT
// ========================================

function showResult() {

    savePageState();

    document.getElementById(
        "quizScreen"
    ).style.display =
        "none";


    document.getElementById(
        "resultScreen"
    ).style.display =
        "flex";


    document.getElementById(
        "resultName"
    ).textContent =
        currentStudentName;


    document.getElementById(
        "finalScore"
    ).textContent =
        userScore;


    showResultMessage();
    savePageState();

}


// ========================================
// SHOW GUEST RESULT
// ========================================

function showGuestResult() {

    savePageState();

    document.getElementById(
        "quizScreen"
    ).style.display =
        "none";


    document.getElementById(
        "resultScreen"
    ).style.display =
        "flex";


    document.getElementById(
        "resultName"
    ).textContent =
        "Guest";


    document.getElementById(
        "finalScore"
    ).textContent =
        userScore;


    document.getElementById(
        "resultMessage"
    ).textContent =
        "This is a demo account. Your score will not appear on the leaderboard.";

    savePageState();

}


// ========================================
// RESULT MESSAGE
// ========================================

function showResultMessage() {

    const percentage =
        (
            userScore /
            TOTAL_QUESTIONS
        ) * 100;


    let message;


    if (
        percentage === 100
    ) {

        message =
            "Outstanding! You are a true quiz champion!";

    }

    else if (
        percentage >= 70
    ) {

        message =
            "Excellent performance!";

    }

    else if (
        percentage >= 50
    ) {

        message =
            "Good attempt! Keep learning about India.";

    }

    else {

        message =
            "Keep learning and try again next time!";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;

}


// ========================================
// ALREADY COMPLETED
// ========================================

function showAlreadyCompleted(
    name,
    score
) {

    document.getElementById(
        "loginScreen"
    ).style.display =
        "none";


    document.getElementById(
        "completedScreen"
    ).style.display =
        "flex";


    document.getElementById(
        "alreadyName"
    ).textContent =
        name;


    document.getElementById(
        "alreadyScore"
    ).textContent =
        score;


    stopTimerMusic();

    playBackgroundMusic();
    savePageState();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// SHOW STUDENT LEADERBOARD
// ========================================

async function showLeaderboard() {

    stopTimerMusic();

    playBackgroundMusic();


    document.getElementById(
        "resultScreen"
    ).style.display =
        "none";


    document.getElementById(
        "completedScreen"
    ).style.display =
        "none";


    document.getElementById(
        "leaderboardScreen"
    ).style.display =
        "flex";

    savePageState();


    await createLeaderboard();

}


// ========================================
// CREATE LEADERBOARD
// ========================================

async function createLeaderboard() {

    const leaderboard =
        document.getElementById(
            "leaderboard"
        );


    leaderboard.innerHTML = `

        <p style="margin-top:30px;">
            Loading leaderboard...
        </p>

    `;


    try {

        const url =
            FIREBASE_DATABASE_URL +
            "/students.json";


        const response =
            await fetch(url);


        if (
            !response.ok
        ) {

            throw new Error(
                "Firebase leaderboard request failed."
            );

        }


        const data =
            await response.json();


        let students = [];


        if (
            data !== null
        ) {

            Object.keys(data).forEach(
                function (roll) {

                    const student =
                        data[roll];


                    const validRoll =
                        /^24102A0500(0[1-9]|[1-4][0-9]|5[0-8])$/;


                    if (
                        validRoll.test(roll) &&
                        student !== null
                    ) {

                        students.push({

                            roll:
                                roll,

                            name:
                                student.name ||
                                "Student",

                            score:
                                parseInt(
                                    student.score
                                ) || 0,

                            // INTERNAL ONLY.
                            // NEVER DISPLAYED.

                            timeTaken:
                                typeof student.timeTaken === "number"
                                    ? student.timeTaken
                                    : null

                        });

                    }

                }
            );

        }


        // ========================================
        // SORT
        // ========================================

        students.sort(
            function (a, b) {

                // Higher score first

                if (
                    b.score !== a.score
                ) {

                    return b.score - a.score;

                }


                // No time for either

                if (
                    a.timeTaken === null &&
                    b.timeTaken === null
                ) {

                    return 0;

                }


                // No time goes lower

                if (
                    a.timeTaken === null
                ) {

                    return 1;

                }


                if (
                    b.timeTaken === null
                ) {

                    return -1;

                }


                // Lower time first

                return a.timeTaken - b.timeTaken;

            }
        );


        if (
            students.length === 0
        ) {

            leaderboard.innerHTML = `

                <p style="margin-top:30px;">

                    No students have completed
                    the quiz yet.

                </p>

            `;

            return;

        }


        // ========================================
        // TABLE
        // ========================================

        let table = `

            <table class="leaderboard-table">

                <tr>

                    <th>
                        Rank
                    </th>

                    <th>
                        Roll Number
                    </th>

                    <th>
                        Name
                    </th>

                    <th>
                        Score
                    </th>

                </tr>

        `;


        students.forEach(
            function (student, index) {

                let medal = "";


                if (
                    index === 0
                ) {

                    medal = "🥇";

                }

                else if (
                    index === 1
                ) {

                    medal = "🥈";

                }

                else if (
                    index === 2
                ) {

                    medal = "🥉";

                }


                table += `

                    <tr>

                        <td>
                            ${medal}
                            ${index + 1}
                        </td>

                        <td>
                            ${student.roll}
                        </td>

                        <td>
                            ${student.name}
                        </td>

                        <td>
                            ${student.score}/${TOTAL_QUESTIONS}
                        </td>

                    </tr>

                `;

            }
        );


        table += `

            </table>

        `;


        leaderboard.innerHTML =
            table;

    }

    catch (errorObject) {

        console.error(
            "Firebase leaderboard error:",
            errorObject
        );


        leaderboard.innerHTML = `

            <p
                style="
                    margin-top:30px;
                    color:#dc3545;
                    font-weight:bold;
                "
            >

                Unable to load leaderboard.

                <br><br>

                Please check your Firebase
                database connection and rules.

            </p>

        `;

    }

}



// ========================================
// LOGOUT
// ========================================
//
// Logs the current user/admin out of the
// website and clears the saved page state.
// ========================================

function logout() {

    // Stop all timers
    clearInterval(timerInterval);
    clearInterval(adminTimerInterval);

    // Stop all music
    stopTimerMusic();
    stopBackgroundMusic();

    // Clear current student/admin data
    currentQuestion = 0;
    userScore = 0;
    currentRollNumber = "";
    currentStudentName = "";

    isGuest = false;
    isAdmin = false;

    questions = [];
    studentQuestionResults = [];

    adminQuestions = [];
    adminCurrentQuestion = 0;
    adminScore = 0;
    adminQuestionAnswered = false;

    timeLeft = TIME_PER_QUESTION;
    adminTimeLeft = TIME_PER_QUESTION;

    questionAnswered = false;
    selectedStudentAnswer = null;

    quizStartTime = null;
    quizTimeTaken = 0;

    restoringStudentState = false;
    restoringAdminState = false;

    // Remove saved session/page state
    clearSavedPageState();

    // Clear login fields
    const rollInput = document.getElementById("rollNumber");
    const nameInput = document.getElementById("studentName");
    const loginError = document.getElementById("loginError");

    if (rollInput) {
        rollInput.value = "";
    }

    if (nameInput) {
        nameInput.value = "";
    }

    if (loginError) {
        loginError.textContent = "";
    }

    // Cancel any pending celebration-to-login transition
    if (typeof celebrationTimeout !== "undefined" && celebrationTimeout) {
        clearTimeout(celebrationTimeout);
        celebrationTimeout = null;
    }

    // Hide every screen
    hideAllScreens();

    // Return to the Ashoka Chakra welcome screen
    const welcomeScreen = document.getElementById("welcomeScreen");

    if (welcomeScreen) {
        welcomeScreen.style.display = "flex";
    }

    // Keep the logged-out state cleared.
    // Do NOT call savePageState() here because logout should
    // remain on the welcome screen.
    clearSavedPageState();

    // Reset admin panels
    const adminMenu = document.getElementById("adminMenu");
    const adminLeaderboardPanel = document.getElementById("adminLeaderboardPanel");
    const adminStatisticsPanel = document.getElementById("adminStatisticsPanel");
    const adminTestPanel = document.getElementById("adminTestPanel");
    const adminTestResult = document.getElementById("adminTestResult");

    if (adminMenu) {
        adminMenu.style.display = "grid";
    }

    if (adminLeaderboardPanel) {
        adminLeaderboardPanel.style.display = "none";
    }

    if (adminStatisticsPanel) {
        adminStatisticsPanel.style.display = "none";
    }

    if (adminTestPanel) {
        adminTestPanel.style.display = "none";
    }

    if (adminTestResult) {
        adminTestResult.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ================================================================
// ================================================================
// ADMIN PORTAL
// ================================================================
// ================================================================


// ========================================
// OPEN ADMIN PORTAL
// ========================================

function openAdminPortal() {

    stopTimerMusic();

    playBackgroundMusic();


    document.getElementById(
        "loginScreen"
    ).style.display =
        "none";


    document.getElementById(
        "welcomeScreen"
    ).style.display =
        "none";


    document.getElementById(
        "celebrationScreen"
    ).style.display =
        "none";


    document.getElementById(
        "quizScreen"
    ).style.display =
        "none";


    document.getElementById(
        "resultScreen"
    ).style.display =
        "none";


    document.getElementById(
        "completedScreen"
    ).style.display =
        "none";


    document.getElementById(
        "leaderboardScreen"
    ).style.display =
        "none";


    document.getElementById(
        "adminScreen"
    ).style.display =
        "flex";


    showAdminMenu();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// SHOW ADMIN PORTAL
// ========================================

function showAdminPortal() {

    openAdminPortal();

}


// ========================================
// SHOW ADMIN MENU
// ========================================

function showAdminMenu() {

    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    document.getElementById(
        "adminMenu"
    ).style.display =
        "grid";


    document.getElementById(
        "adminLeaderboardPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminStatisticsPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminTestPanel"
    ).style.display =
        "none";


    const adminTestResult =
        document.getElementById(
            "adminTestResult"
        );


    if (
        adminTestResult
    ) {

        adminTestResult.style.display =
            "none";

    }


    const adminOptions =
        document.getElementById(
            "adminOptions"
        );


    if (
        adminOptions
    ) {

        adminOptions.style.display =
            "grid";

    }


    const adminQuestion =
        document.getElementById(
            "adminQuestion"
        );


    if (
        adminQuestion
    ) {

        adminQuestion.style.display =
            "block";

    }


    const adminNextButton =
        document.getElementById(
            "adminNextButton"
        );


    if (
        adminNextButton
    ) {

        adminNextButton.style.display =
            "none";

    }

    savePageState();

}


// ========================================
// ADMIN LEADERBOARD
// ========================================

async function adminShowLeaderboard() {

    document.getElementById(
        "adminMenu"
    ).style.display =
        "none";


    document.getElementById(
        "adminStatisticsPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminTestPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminLeaderboardPanel"
    ).style.display =
        "block";

    savePageState();


    await createAdminLeaderboard();

}


// ========================================
// CREATE ADMIN LEADERBOARD
// ========================================

async function createAdminLeaderboard() {

    const leaderboard =
        document.getElementById(
            "adminLeaderboard"
        );


    leaderboard.innerHTML = `

        <p>
            Loading leaderboard...
        </p>

    `;


    try {

        const response =
            await fetch(
                FIREBASE_DATABASE_URL +
                "/students.json"
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Unable to load students."
            );

        }


        const data =
            await response.json();


        let students = [];


        if (
            data !== null
        ) {

            Object.keys(data).forEach(
                function (roll) {

                    const student =
                        data[roll];


                    const validRoll =
                        /^24102A0500(0[1-9]|[1-4][0-9]|5[0-8])$/;


                    if (
                        validRoll.test(roll) &&
                        student !== null
                    ) {

                        students.push({

                            roll:
                                roll,

                            name:
                                student.name ||
                                "Student",

                            score:
                                parseInt(
                                    student.score
                                ) || 0,

                            timeTaken:
                                typeof student.timeTaken === "number"
                                    ? student.timeTaken
                                    : null

                        });

                    }

                }
            );

        }


        // ========================================
        // SORT
        // ========================================

        students.sort(
            function (a, b) {

                if (
                    b.score !== a.score
                ) {

                    return b.score - a.score;

                }


                if (
                    a.timeTaken === null &&
                    b.timeTaken === null
                ) {

                    return 0;

                }


                if (
                    a.timeTaken === null
                ) {

                    return 1;

                }


                if (
                    b.timeTaken === null
                ) {

                    return -1;

                }


                return a.timeTaken - b.timeTaken;

            }
        );


        if (
            students.length === 0
        ) {

            leaderboard.innerHTML = `

                <p>
                    No students have completed
                    the quiz yet.
                </p>

            `;

            return;

        }


        // ========================================
        // CREATE TABLE
        // ========================================

        let table = `

            <table class="leaderboard-table">

                <tr>

                    <th>
                        Rank
                    </th>

                    <th>
                        Roll Number
                    </th>

                    <th>
                        Name
                    </th>

                    <th>
                        Score
                    </th>

                </tr>

        `;


        students.forEach(
            function (student, index) {

                let medal = "";


                if (
                    index === 0
                ) {

                    medal = "🥇";

                }

                else if (
                    index === 1
                ) {

                    medal = "🥈";

                }

                else if (
                    index === 2
                ) {

                    medal = "🥉";

                }


                table += `

                    <tr>

                        <td>
                            ${medal}
                            ${index + 1}
                        </td>

                        <td>
                            ${student.roll}
                        </td>

                        <td>
                            ${student.name}
                        </td>

                        <td>
                            ${student.score}/${TOTAL_QUESTIONS}
                        </td>

                    </tr>

                `;

            }
        );


        table += `

            </table>

            <p style="margin-top:20px;">
                Completion time is hidden and is used
                only for tie-breaking.
            </p>

        `;


        leaderboard.innerHTML =
            table;

    }

    catch (errorObject) {

        console.error(
            "Admin leaderboard error:",
            errorObject
        );


        leaderboard.innerHTML = `

            <p style="color:#dc3545;">

                Unable to load leaderboard.

            </p>

        `;

    }

}


// ========================================
// ADMIN STATISTICS
// ========================================

async function adminShowStatistics() {

    document.getElementById(
        "adminMenu"
    ).style.display =
        "none";


    document.getElementById(
        "adminLeaderboardPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminTestPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminStatisticsPanel"
    ).style.display =
        "block";

    savePageState();


    await createAdminStatistics();

}


// ========================================
// CREATE ADMIN STATISTICS
// ========================================

async function createAdminStatistics() {

    const statsContainer =
        document.getElementById(
            "adminStats"
        );
    statsContainer.innerHTML =
        "<p>Loading statistics...</p>";
    try {

        const response =
            await fetch(
                FIREBASE_DATABASE_URL +
                "/students.json"
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Unable to load statistics."
            );

        }


        const data =
            await response.json();


        let students = [];


        if (
            data !== null
        ) {

            Object.keys(data).forEach(
                function (roll) {

                    const student =
                        data[roll];


                    const validRoll =
                        /^24102A0500(0[1-9]|[1-4][0-9]|5[0-8])$/;


                    if (
                        validRoll.test(roll) &&
                        student !== null
                    ) {

                        students.push(
                            student
                        );

                    }

                }
            );

        }


        // ========================================
        // NO STUDENTS
        // ========================================

        if (
            students.length === 0
        ) {

            statsContainer.innerHTML = `

                <div class="admin-stat-card">

                    <h3>
                        Total Students
                    </h3>

                    <strong>
                        58
                    </strong>

                </div>

                <div class="admin-stat-card">

                    <h3>
                        Completed
                    </h3>

                    <strong>
                        0
                    </strong>

                </div>

                <div class="admin-stat-card">

                    <h3>
                        Not Completed
                    </h3>

                    <strong>
                        58
                    </strong>

                </div>

                <div class="admin-stat-card">

                    <h3>
                        Average Score
                    </h3>

                    <strong>
                        0 / 10
                    </strong>

                </div>

                <div class="admin-stat-card">

                    <h3>
                        Highest Score
                    </h3>

                    <strong>
                        0 / 10
                    </strong>

                </div>

                <div class="admin-stat-card">

                    <h3>
                        Completion Percentage
                    </h3>

                    <strong>
                        0%
                    </strong>

                </div>

            `;
            return;

        }


        // ========================================
        // CALCULATE GENERAL STATISTICS
        // ========================================

        const totalStudents =
            58;


        const completed =
            students.length;


        const notCompleted =
            Math.max(
                0,
                totalStudents - completed
            );


        let totalScore = 0;

        let highestScore = 0;

        let lowestScore = TOTAL_QUESTIONS;


        students.forEach(
            function (student) {

                const score =
                    parseInt(
                        student.score
                    ) || 0;


                totalScore += score;


                if (
                    score > highestScore
                ) {

                    highestScore =
                        score;

                }


                if (
                    score < lowestScore
                ) {

                    lowestScore =
                        score;

                }

            }
        );


        const averageScore =
            totalScore /
            completed;


        const completionPercentage =
            (
                completed /
                totalStudents
            ) * 100;


        // ========================================
        // DISPLAY GENERAL STATISTICS
        // ========================================

        statsContainer.innerHTML = `

            <div class="admin-stat-card">

                <h3>
                    Total Students
                </h3>

                <strong>
                    ${totalStudents}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Completed
                </h3>

                <strong>
                    ${completed}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Not Completed
                </h3>

                <strong>
                    ${notCompleted}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Average Score
                </h3>

                <strong>
                    ${averageScore.toFixed(2)} / ${TOTAL_QUESTIONS}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Highest Score
                </h3>

                <strong>
                    ${highestScore} / ${TOTAL_QUESTIONS}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Lowest Score
                </h3>

                <strong>
                    ${lowestScore} / ${TOTAL_QUESTIONS}
                </strong>

            </div>


            <div class="admin-stat-card">

                <h3>
                    Completion Percentage
                </h3>

                <strong>
                    ${completionPercentage.toFixed(1)}%
                </strong>

            </div>

        `;
    }

    catch (errorObject) {

        console.error(
            "Admin statistics error:",
            errorObject
        );


        statsContainer.innerHTML = `

            <p style="color:#dc3545;">

                Unable to load statistics.

            </p>

        `;
    }

}


// ================================================================
// ADMIN TEST
// ================================================================


// ========================================
// START ADMIN TEST
// ========================================

function startAdminTest() {

    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();

    stopBackgroundMusic();


    // ========================================
    // ADMIN GETS ALL 15 QUESTIONS
    // ========================================

    adminQuestions =
        [...questionBank];


    // ========================================
    // RANDOMIZE QUESTION ORDER
    // ========================================

    adminQuestions =
        adminQuestions.sort(
            function () {

                return Math.random() - 0.5;

            }
        );


    adminCurrentQuestion = 0;

    adminScore = 0;

    adminQuestionAnswered = false;
    adminTimeLeft = TIME_PER_QUESTION;


    document.getElementById(
        "adminMenu"
    ).style.display =
        "none";


    document.getElementById(
        "adminLeaderboardPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminStatisticsPanel"
    ).style.display =
        "none";


    document.getElementById(
        "adminTestPanel"
    ).style.display =
        "block";


    document.getElementById(
        "adminTestResult"
    ).style.display =
        "none";


    document.getElementById(
        "adminQuestion"
    ).style.display =
        "block";


    document.getElementById(
        "adminOptions"
    ).style.display =
        "grid";


    document.getElementById(
        "adminNextButton"
    ).style.display =
        "none";


    loadAdminQuestion();
    savePageState();

}


// ========================================
// LOAD ADMIN QUESTION
// ========================================

function loadAdminQuestion() {

    const question =
        adminQuestions[
            adminCurrentQuestion
        ];


    document.getElementById(
        "adminQuestionNumber"
    ).textContent =
        `Question ${adminCurrentQuestion + 1} / ${ADMIN_TOTAL_QUESTIONS}`;


    document.getElementById(
        "adminScore"
    ).textContent =
        `Score: ${adminScore}`;


    document.getElementById(
        "adminQuestion"
    ).textContent =
        question.question;


    const progress =
        (
            (adminCurrentQuestion + 1)
            /
            ADMIN_TOTAL_QUESTIONS
        ) * 100;


    document.getElementById(
        "adminProgressBar"
    ).style.width =
        progress + "%";


    document.getElementById(
        "adminFeedback"
    ).textContent =
        "";


    document.getElementById(
        "adminFeedback"
    ).style.color =
        "";


    document.getElementById(
        "adminNextButton"
    ).style.display =
        "none";


    const optionsContainer =
        document.getElementById(
            "adminOptions"
        );


    optionsContainer.innerHTML =
        "";


    question.options.forEach(
        function (
            option,
            index
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option";


            button.textContent =
                `${String.fromCharCode(65 + index)}) ${option}`;


            button.onclick =
                function () {

                    checkAdminAnswer(index);

                };


            optionsContainer.appendChild(
                button
            );

        }
    );


    startAdminTimer();

}


// ========================================
// START ADMIN TIMER
// ========================================

function startAdminTimer() {

    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    if (!restoringAdminState) {
        adminTimeLeft = TIME_PER_QUESTION;
        adminQuestionAnswered = false;
    } else {
        restoringAdminState = false;
    }


    const timer =
        document.getElementById(
            "adminTimer"
        );


    timer.textContent =
        adminTimeLeft;


    timer.classList.remove(
        "warning"
    );


    timer.classList.remove(
        "danger"
    );


    playTimerMusic();


    adminTimerInterval =
        setInterval(
            function () {

                adminTimeLeft--;


                timer.textContent =
                    adminTimeLeft;

                savePageState();


                if (
                    adminTimeLeft <= 4 &&
                    adminTimeLeft > 2
                ) {

                    timer.classList.add(
                        "warning"
                    );

                }


                if (
                    adminTimeLeft <= 2
                ) {

                    timer.classList.remove(
                        "warning"
                    );

                    timer.classList.add(
                        "danger"
                    );

                }


                if (
                    adminTimeLeft <= 0
                ) {

                    clearInterval(
                        adminTimerInterval
                    );

                    adminTimeUp();

                }

            },
            1000
        );

}


// ========================================
// ADMIN TIME UP
// ========================================

function adminTimeUp() {

    if (
        adminQuestionAnswered
    ) {

        return;

    }


    adminQuestionAnswered =
        true;
    savePageState();


    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    const buttons =
        document.querySelectorAll(
            "#adminOptions .option"
        );


    buttons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    const question =
        adminQuestions[
            adminCurrentQuestion
        ];


    buttons[question.answer]
        .classList.add(
            "correct"
        );


    document.getElementById(
        "adminFeedback"
    ).textContent =
        "Time's up!";


    document.getElementById(
        "adminFeedback"
    ).style.color =
        "#dc3545";


    document.getElementById(
        "adminNextButton"
    ).style.display =
        "block";

    savePageState();

}


// ========================================
// CHECK ADMIN ANSWER
// ========================================

function checkAdminAnswer(
    selectedAnswer
) {

    if (
        adminQuestionAnswered
    ) {

        return;

    }


    adminQuestionAnswered =
        true;


    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    const question =
        adminQuestions[
            adminCurrentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            "#adminOptions .option"
        );


    buttons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    // ========================================
    // CORRECT
    // ========================================

    if (
        selectedAnswer ===
        question.answer
    ) {

        buttons[selectedAnswer]
            .classList.add(
                "correct"
            );


        document.getElementById(
            "adminFeedback"
        ).textContent =
            "Correct Answer!";


        document.getElementById(
            "adminFeedback"
        ).style.color =
            "#138808";


        adminScore++;

    }


    // ========================================
    // WRONG
    // ========================================

    else {

        buttons[selectedAnswer]
            .classList.add(
                "wrong"
            );


        buttons[question.answer]
            .classList.add(
                "correct"
            );


        document.getElementById(
            "adminFeedback"
        ).textContent =
            "Wrong Answer!";


        document.getElementById(
            "adminFeedback"
        ).style.color =
            "#dc3545";

    }


    document.getElementById(
        "adminScore"
    ).textContent =
        `Score: ${adminScore}`;


    document.getElementById(
        "adminNextButton"
    ).style.display =
        "block";

}


// ========================================
// NEXT ADMIN QUESTION
// ========================================

function adminNextQuestion() {

    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    adminCurrentQuestion++;


    if (
        adminCurrentQuestion <
        adminQuestions.length
    ) {

        loadAdminQuestion();
        savePageState();

    }

    else {

        finishAdminTest();

    }

}


// ========================================
// FINISH ADMIN TEST
// ========================================

function finishAdminTest() {

    clearInterval(
        adminTimerInterval
    );


    stopTimerMusic();


    playBackgroundMusic();


    document.getElementById(
        "adminQuestion"
    ).style.display =
        "none";


    document.getElementById(
        "adminOptions"
    ).style.display =
        "none";


    document.getElementById(
        "adminNextButton"
    ).style.display =
        "none";


    document.getElementById(
        "adminFeedback"
    ).textContent =
        "";


    document.getElementById(
        "adminTestResult"
    ).style.display =
        "block";


    document.getElementById(
        "adminFinalScore"
    ).textContent =
        adminScore;

    savePageState();


    // ========================================
    // IMPORTANT
    // ========================================
    //
    // NO Firebase save happens here.
    //
    // Therefore admin test:
    //
    // - does not create a student
    // - does not change leaderboard
    // - does not change statistics
    // - does not affect student results
    // ========================================

}


// ========================================
// END OF SCRIPT
// ========================================
