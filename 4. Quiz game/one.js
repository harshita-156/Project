document.addEventListener("DOMContentLoaded", function () {
    const startQuizBtn1 = document.querySelector(".start-quiz-btn-1");
    const startQuizBtn2 = document.querySelector(".start-quiz-btn-2");
    const startQuizBtn3 = document.querySelector(".start-quiz-btn-3");
    startQuizBtn1.addEventListener("click", function () {
        window.location.href = "four.html"; 
    });

    startQuizBtn2.addEventListener("click", function () {
        window.location.href = "three.html";
    });

    startQuizBtn3.addEventListener("click", function () {
        window.location.href = "two.html"; 
    });
});