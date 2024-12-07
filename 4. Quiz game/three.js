// const correctAnswers = ['b', 'b', 'c', 'c', 'b', 'b', 'c', 'c', 'c', 'b', 'a', 'c', 'b', 'b', 'c'];
// const totalQuestions = correctAnswers.length;
// let currentQuestion = 0;
// let correct = 0;
// let totalTime = 0;
// let timer;
// const maxTime = 30;

// const nextButton = document.querySelector("#next");
// const timerElement = document.querySelector("#timer");
// const timerSound = document.querySelector("#timerSound");



// function startTimer() {
//     let timeLeft = maxTime;
//     timerElement.textContent = `Time Left: ${timeLeft}s`;
//     timerSound.play();

//     timer = setInterval(() => {
//         timeLeft--;
//         timerElement.textContent = `Time Left: ${timeLeft}s`;
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             nextButton.click();
//         }
//     }, 1000);
// }
// function showQuestion(index) {
//     document.querySelector(`#question${index}`).style.display = 'block';
//     startTimer();
// }


// function hideQuestion(index) {
//     document.querySelector(`#question${index}`).style.display = 'none';
//     clearInterval(timer);
//     timerSound.pause();
//     timerSound.currentTime = 0;
// }

// nextButton.addEventListener("click", function() {
//     const selectedOption = document.querySelector(`input[name="option${currentQuestion + 1}"]:checked`);
//     if (selectedOption && selectedOption.value === correctAnswers[currentQuestion]) {
//         correct++;
//         showBubble();
//     }

//     totalTime += maxTime - parseInt(timerElement.textContent.replace('Time Left: ', '').replace('s', ''));
//     hideQuestion(currentQuestion + 1);

//     currentQuestion++;
//     if (currentQuestion < totalQuestions) {
//         showQuestion(currentQuestion + 1);
        
//     } else {
//         nextButton.disabled = true;
//         document.querySelector(".container").innerHTML = `
//             <div class="col">
//                 <h3>You've scored ${correct} / ${totalQuestions}</h3>
//                 <p>Total Time Taken: ${totalTime}s</p>
//                 <h4>Correct Answers:</h4>
//                 <ul>
//                     ${correctAnswers.map((answer, index) => `<li>Question ${index + 1}: ${answer}</li>`).join('')}

//                 </ul>
//                 <button id="endQuizButton">End Quiz</button>
//                 <button id="restartQuizButton">Restart Quiz</button>
//             </div>
//         `;
//         // saveProgress(correct); 
//     }
// });
// showQuestion(1);

// // document.addEventListener("DOMContentLoaded", function () {
// //     displayProgress();
// // });


// document.getElementById("quitButton").addEventListener("click", function() {
//     if (confirm("Are you sure you want to quit the quiz?")) {
//         window.location.href = "index.html"; 
//     }
// });


// const endQuizButton = document.getElementById("endQuizButton").addEventListener("click", function() {
//     window.location.href = "five.html";
// });

// const restartQuizButton = document.getElementById("restartQuizButton").addEventListener("click", function() {
//     resetQuiz();
//     window.location.href = "three.html";
// });

// function resetQuiz() {
//     currentQuestion = 0;
//     score = 0;  
// }


const correctAnswers = ['b', 'b', 'c', 'c', 'b', 'b', 'c', 'c', 'c', 'b', 'a', 'c', 'b', 'b', 'c'];
const totalQuestions = correctAnswers.length;
let currentQuestion = 0;
let correct = 0;
let totalTime = 0;
let timer;
const maxTime = 30;

const nextButton = document.querySelector("#next");
const timerElement = document.querySelector("#timer");
const timerSound = document.querySelector("#timerSound");

function startTimer() {
    let timeLeft = maxTime;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    timerSound.play();
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.click();
        }
    }, 1000);
}

function showQuestion(index) {
    document.querySelector(`#question${index}`).style.display = 'block';
    startTimer();
}

function hideQuestion(index) {
    document.querySelector(`#question${index}`).style.display = 'none';
    clearInterval(timer);
    timerSound.pause();
    timerSound.currentTime = 0;
}

function handleNextQuestion() {
    const selectedOption = document.querySelector(`input[name="option${currentQuestion + 1}"]:checked`);
    if (selectedOption) {
        if (selectedOption.value === correctAnswers[currentQuestion]) {
            correct++;
            // showBubble(); // Assuming showBubble is defined elsewhere
        }

        totalTime += maxTime - parseInt(timerElement.textContent.replace('Time Left: ', '').replace('s', ''));
        hideQuestion(currentQuestion + 1);

        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            showQuestion(currentQuestion + 1);
        } else {
            nextButton.disabled = true;
            document.querySelector(".container").innerHTML = `
                <div class="col">
                    <h3>You've scored ${correct} / ${totalQuestions}</h3>
                    <p>Total Time Taken: ${totalTime}s</p>
                    <h4>Correct Answers:</h4>
                    <ul>
                        ${correctAnswers.map((answer, index) => `<li>Question ${index + 1}: ${answer}</li>`).join('')}
                    </ul>
                    <button id="endQuizButton">End Quiz</button>
                    <button id="restartQuizButton">Restart Quiz</button>
                </div>
            `;
            document.getElementById("endQuizButton").addEventListener("click", function() {
                window.location.href = "five.html";
            });
            document.getElementById("restartQuizButton").addEventListener("click", function() {
                resetQuiz();
                window.location.href = "three.html";
            });
        }
    }
}

nextButton.addEventListener("click", handleNextQuestion);
// nextButton.addEventListener("click", function() {
//     const selectedOption = document.querySelector(`input[name="option${currentQuestion + 1}"]:checked`);
//     if (selectedOption && selectedOption.value === correctAnswers[currentQuestion]) {
//         correct++;
//         showBubble(); // Assuming showBubble is defined elsewhere
//     }

//     totalTime += maxTime - parseInt(timerElement.textContent.replace('Time Left: ', '').replace('s', ''));
//     hideQuestion(currentQuestion + 1);

//     currentQuestion++;
//     if (currentQuestion < totalQuestions) {
//         showQuestion(currentQuestion + 1);
//     } else {
//         nextButton.disabled = true;
//         document.querySelector(".container").innerHTML = `
//             <div class="col">
//                 <h3>You've scored ${correct} / ${totalQuestions}</h3>
//                 <p>Total Time Taken: ${totalTime}s</p>
//                 <h4>Correct Answers:</h4>
//                 <ul>
//                     ${correctAnswers.map((answer, index) => `<li>Question ${index + 1}: ${answer}</li>`).join('')}
//                 </ul>
//                 <button id="endQuizButton">End Quiz</button>
//                 <button id="restartQuizButton">Restart Quiz</button>
//             </div>
//         `;
//         document.getElementById("endQuizButton").addEventListener("click", function() {
//             window.location.href = "five.html";
//         });
//         document.getElementById("restartQuizButton").addEventListener("click", function() {
//             resetQuiz();
//             window.location.href = "three.html";
//         });
//     }
// });

function resetQuiz() {
    currentQuestion = 0;
    correct = 0;
    totalTime = 0;
    // Additional code to reset the quiz UI, if necessary
}

showQuestion(1);

document.getElementById("quitButton").addEventListener("click", function() {
    if (confirm("Are you sure you want to quit the quiz?")) {
        window.location.href = "index.html"; 
    }
});