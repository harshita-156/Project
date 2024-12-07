// const correctAnswers = ['b', 'b', 'b', 'c', 'a', 'a', 'b', 'd', 'a', 'a'];
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
//     timerElement.textContent = 'Time Left: ${timeLeft}s;'
//     timerSound.play();
//     timer = setInterval(() => {
//         timeLeft--;
//         timerElement.textContent = 'Time Left: ${timeLeft}s;'
//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             nextButton.click();
//         }
//     }, 1000);
// }

// function showQuestion(index) {
//     document.querySelector('#question${index}').style.display = 'block';
//     startTimer();
// }

// function hideQuestion(index) {
//     document.querySelector('#question${index}').style.display = 'none';
//     clearInterval(timer);
//     timerSound.pause();
//     timerSound.currentTime = 0;
// }

// function handleNextQuestion() {
//     const selectedOption = document.querySelector('input[name="option${currentQuestion + 1}"]:checked');
//     if (selectedOption) {
//         if (selectedOption.value === correctAnswers[currentQuestion]) {
//             correct++;
//             // showBubble(); // Assuming showBubble is defined elsewhere
//         }

//         totalTime += maxTime - parseInt(timerElement.textContent.replace('Time Left: ', '').replace('s', ''));
//         hideQuestion(currentQuestion + 1);

//         currentQuestion++;
//         if (currentQuestion < totalQuestions) {
//             showQuestion(currentQuestion + 1);
//         } else {
//             nextButton.disabled = true;
//             document.querySelector(".container").innerHTML = `
//                 <div class="col">
//                     <h3>You've scored ${correct} / ${totalQuestions}</h3>
//                     <p>Total Time Taken: ${totalTime}s</p>
//                     <h4>Correct Answers:</h4>
//                     <ul>
//                         ${correctAnswers.map((answer, index) => <li>Question ${index + 1}: ${answer}</li>).join('')}
//                     </ul>
//                     <button id="endQuizButton">End Quiz</button>
//                     <button id="restartQuizButton">Restart Quiz</button>
//                 </div>
//             `;
//             document.getElementById("endQuizButton").addEventListener("click", function() {
//                 window.location.href = "five.html";
//             });
//             document.getElementById("restartQuizButton").addEventListener("click", function() {
//                 resetQuiz();
//                 window.location.href = "three.html";
//             });
//         }
//     }
// }

// nextButton.addEventListener("click", handleNextQuestion);

// function resetQuiz() {
//     currentQuestion = 0;
//     correct = 0;
//     totalTime = 0;
    
// }

// showQuestion(1);

// document.getElementById("quitButton").addEventListener("click", function() {
//     if (confirm("Are you sure you want to quit the quiz?")) {
//         window.location.href = "index.html"; 
//     }
// });



document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");
    const toggleAuthButton = document.getElementById("toggle-auth");
    const signupContainer = document.getElementById("signup-container");
    const loginContainer = document.getElementById("login-container");
    const forgotPasswordToggle = document.getElementById("forgot-password-toggle");

    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    function isValidMobileNumber(mobile) {
        const regex = /^[0-9]{10}$/;
        return regex.test(mobile);
    }

    signupButton.addEventListener("click", function () {
        const email = document.getElementById("signup-email").value;
        const name = capitalizeName(document.getElementById("signup-name").value);
        const mobile = document.getElementById("signup-mobile").value;
        const password = document.getElementById("signup-password").value;
        const messageDiv = document.getElementById("signup-message");

        messageDiv.textContent = '';

        if (email && name && isValidMobileNumber(mobile) && password) {
            const existingUser = localStorage.getItem(email);
            if (existingUser) {
                messageDiv.textContent = "Email is already registered. Please log in.";
            } else {
                localStorage.setItem(email, JSON.stringify({ name, mobile, password }));
                messageDiv.textContent = "Signup successful! Redirecting to quiz...";
                setTimeout(() => {
                    window.location.href = "quiz.html"; 
                }, 2000);
            }
        } else {
            if (!isValidMobileNumber(mobile)) {
                messageDiv.textContent = "Please enter a valid 10-digit mobile number.";
            } else {
                messageDiv.textContent = "Please fill out all fields.";
            }
        }
    });

    loginButton.addEventListener("click", function () {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const messageDiv = document.getElementById("login-message");

        messageDiv.textContent = ''; 

        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            messageDiv.textContent = "Login successful! Redirecting to quiz...";
            setTimeout(() => {
                window.location.href = "quiz.html"; 
            }, 2000);
        } else {
            messageDiv.textContent = "Invalid email or password.";
        }
    });

    document.getElementById("forgot-password-toggle").addEventListener("click", function () {
        document.getElementById("forgot-password-container").style.display = 'block';
        document.getElementById("signup-container").style.display = 'none';
        document.getElementById("login-container").style.display = 'none';
        this.style.display = 'none'; 
    });

    document.getElementById("send-otp-button").addEventListener("click", function () {
        const mobile = document.getElementById("forgot-mobile").value;
        const messageDiv = document.getElementById("otp-message");

        messageDiv.textContent = ''; 

        if (isValidMobileNumber(mobile)) {
            const user = Array.from(localStorage).find(([key, value]) => JSON.parse(value).mobile === mobile);
            
            if (user) {
                const otp = Math.floor(100000 + Math.random() * 900000); 
                localStorage.setItem('otp', otp);
                localStorage.setItem('otpMobile', mobile); 
                document.getElementById("otp-section").style.display = 'block';
                messageDiv.textContent = "OTP sent to your mobile number. Please enter it below.";
            } else {
                messageDiv.textContent = "Mobile number not found.";
            }
        } else {
            messageDiv.textContent = "Please enter a valid 10-digit mobile number.";
        }
    });

    document.getElementById("reset-password-button").addEventListener("click", function () {
        const otp = document.getElementById("otp").value;
        const newPassword = document.getElementById("new-password").value;
        const messageDiv = document.getElementById("reset-message");

        messageDiv.textContent = ''; 

        if (otp === localStorage.getItem('otp')) {
            const mobile = localStorage.getItem('otpMobile');
            const user = Array.from(localStorage).find(([key, value]) => JSON.parse(value).mobile === mobile);
            if (user) {
                const email = user[0]; 
                const userData = JSON.parse(localStorage.getItem(email));
                userData.password = newPassword;
                localStorage.setItem(email, JSON.stringify(userData));
                localStorage.removeItem('otp');
                localStorage.removeItem('otpMobile');
                messageDiv.textContent = "Password reset successful! Please log in with your new password.";
                setTimeout(() => {
                    document.getElementById("forgot-password-container").style.display = 'none';
                    document.getElementById("login-container").style.display = 'block';
                    document.getElementById("forgot-password-toggle").style.display = 'block';
                }, 2000);
            }
        } else {
            messageDiv.textContent = "Invalid OTP.";
        }
    });

    toggleAuthButton.addEventListener("click", function () {
        if (signupContainer.style.display === "none") {
            signupContainer.style.display = "block";
            loginContainer.style.display = "none";
            toggleAuthButton.textContent = "Already have an account? Login";
            forgotPasswordToggle.style.display = "none";
        } else {
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
            toggleAuthButton.textContent = "Don't have an account? Signup";
            forgotPasswordToggle.style.display = "block";
        }
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");
    const toggleAuthButton = document.getElementById("toggle-auth");
    const signupContainer = document.getElementById("signup-container");
    const loginContainer = document.getElementById("login-container");
    const forgotPasswordToggle = document.getElementById("forgot-password-toggle");

    signupButton.addEventListener("click", function () {
        const email = document.getElementById("signup-email").value;
        const name = document.getElementById("signup-name").value;
        const mobile = document.getElementById("signup-mobile").value;
        const password = document.getElementById("signup-password").value;

        if (email && name && mobile && password) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userName", name);
            localStorage.setItem("userMobile", mobile);
            localStorage.setItem("userPassword", password);

            window.location.href = "one.html";
        } else {
            document.getElementById("signup-message").textContent = "Please fill out all fields.";
        }
    });

    toggleAuthButton.addEventListener("click", function () {
        if (signupContainer.style.display === "none") {
            signupContainer.style.display = "block";
            loginContainer.style.display = "none";
            toggleAuthButton.textContent = "Already have an account? Login";
            forgotPasswordToggle.style.display = "none";
        } else {
            signupContainer.style.display = "none";
            loginContainer.style.display = "block";
            toggleAuthButton.textContent = "Don't have an account? Signup";
            forgotPasswordToggle.style.display = "block";
        }
    });
    loginButton.addEventListener("click", function () {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            window.location.href = "one.html";
        } else {
            document.getElementById("login-message").textContent = "Invalid email or password.";
        }
    });
});