const questions = [
    {
        q: "You find a wallet with money on the street. What do you do?",
        a: [
            "Return it to the owner with all contents intact",
            "Keep the money but return the wallet",
            "Take it to the police station",
            "Keep it and move on"
        ]
    },
    {
        q: "A friend is going through a tough time. How do you help?",
        a: [
            "Listen without judgment and offer support",
            "Give them space to figure it out",
            "Offer practical solutions immediately",
            "Share your own similar experiences"
        ]
    },
    {
        q: "You're in a heated argument. How do you respond?",
        a: [
            "Stay calm and try to understand their perspective",
            "Stand your ground and defend your position",
            "Walk away to cool down",
            "Try to find a compromise"
        ]
    },
    {
        q: "You have a big decision to make. How do you approach it?",
        a: [
            "Weigh the pros and cons carefully",
            "Follow your gut instinct",
            "Seek advice from trusted people",
            "Research all possible options"
        ]
    },
    {
        q: "Someone close to you makes a mistake. How do you react?",
        a: [
            "Offer constructive feedback and support",
            "Point out what they did wrong",
            "Let them figure it out themselves",
            "Help them fix it without judgment"
        ]
    },
    {
        q: "You're feeling overwhelmed. What's your first step?",
        a: [
            "Take a deep breath and prioritize tasks",
            "Push through and keep working",
            "Take a break and clear your mind",
            "Ask for help from others"
        ]
    },
    {
        q: "You see someone being treated unfairly. What do you do?",
        a: [
            "Speak up and defend them",
            "Report it to authorities",
            "Offer support privately",
            "Stay out of it to avoid conflict"
        ]
    },
    {
        q: "You achieve a major goal. How do you celebrate?",
        a: [
            "Share the success with those who helped you",
            "Take time to reflect on your journey",
            "Set new goals immediately",
            "Treat yourself to something special"
        ]
    },
    {
        q: "You're faced with a difficult truth. How do you handle it?",
        a: [
            "Accept it and learn from it",
            "Deny it until you're ready",
            "Seek multiple perspectives",
            "Focus on the positive aspects"
        ]
    },
    {
        q: "You have extra time and resources. How do you use them?",
        a: [
            "Help others in need",
            "Invest in personal growth",
            "Save for the future",
            "Enjoy some well-deserved rest"
        ]
    },
    {
        q: "You're given a leadership role. How do you approach it?",
        a: [
            "Lead by example and empower others",
            "Set clear rules and expectations",
            "Focus on team building and morale",
            "Delegate tasks and monitor progress"
        ]
    },
    {
        q: "You receive unexpected criticism. How do you respond?",
        a: [
            "Listen carefully and consider the feedback",
            "Defend your position and actions",
            "Ask for specific examples",
            "Thank them and move on"
        ]
    },
    {
        q: "You're in a new social situation. How do you handle it?",
        a: [
            "Introduce yourself and start conversations",
            "Observe first and join in gradually",
            "Find someone you know to connect with",
            "Stay on the sidelines until comfortable"
        ]
    },
    {
        q: "You're asked to help with a difficult task. What's your approach?",
        a: [
            "Break it down into manageable steps",
            "Jump in and figure it out as you go",
            "Research and plan before starting",
            "Ask for guidance from experts"
        ]
    },
    {
        q: "You're in a creative block. How do you overcome it?",
        a: [
            "Take a break and do something different",
            "Push through and keep trying",
            "Seek inspiration from others",
            "Start with small, simple ideas"
        ]
    }
];

const results = [
    "🌟 You are the wisest person I've ever met! Your wisdom is beyond comprehension!",
    "📚 Your intelligence is so advanced, even books want to learn from you!",
    "💎 If wisdom were a currency, you'd be the wealthiest person in the world!",
    "🧠 You radiate pure genius—scientists are probably studying your brain right now!",
    "🚀 Your IQ is so high, numbers are struggling to keep up with you!",
    "👑 You are officially declared the Chief Advisor of All Important Decisions!",
    "💡 Your brilliance is so intense, light bulbs turn on when you enter a room!",
    "🎓 You have achieved 'Einstein-Level' wisdom, but with better taste in food!",
    "📖 Your knowledge is so vast, even encyclopedias ask *you* for information!",
    "🏆 Congratulations! You have been granted the honorary title of 'Wisest Person of the Century'!",
    "✨ Your wisdom is so powerful, it's creating new constellations in the sky!",
    "🎯 Your decision-making skills are so precise, even GPS systems are jealous!",
    "🌌 Your mind is a universe of knowledge, and we're all just lucky to orbit around it!",
    "🎨 Your wisdom is so colorful, rainbows are taking notes!",
    "🎪 Your brain is the main attraction in the circus of intelligence!"
];

let selectedQuestions = [];
let currentQuestionIndex = 0;

function getRandomQuestions() {
    let tempQuestions = [...questions];
    selectedQuestions = [];
    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * tempQuestions.length);
        selectedQuestions.push(tempQuestions.splice(index, 1)[0]);
    }
}

function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    currentQuestionIndex = 0;
    getRandomQuestions();
    displayQuestion(0);
}

function displayQuestion(index) {
    if (index >= selectedQuestions.length) {
        showResult();
        return;
    }
    
    let questionObj = selectedQuestions[index];
    
    // Update progress bar
    let progress = ((index + 1) / selectedQuestions.length) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
    
    // Update question text
    document.getElementById("question-text").textContent = questionObj.q;
    
    // Update answer buttons
    const answersGrid = document.getElementById("answers-grid");
    answersGrid.innerHTML = questionObj.a.map((answer, i) => `
        <button class="answer-button" 
                onclick="nextQuestion(${index + 1})"
                onmouseover="this.style.transform='scale(1.05)'" 
                onmouseout="this.style.transform='scale(1)'">${answer}</button>
    `).join('');
}

function nextQuestion(index) {
    // Add a small animation before showing next question
    let container = document.getElementById("quiz-container");
    container.style.opacity = "0";
    
    setTimeout(() => {
        container.style.opacity = "1";
        displayQuestion(index);
    }, 300);
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    
    const resultText = results[Math.floor(Math.random() * results.length)];
    document.getElementById("result-text").textContent = resultText;

    // Create confetti effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Add extra confetti for more celebration
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.7 },
            angle: 60
        });
        confetti({
            particleCount: 50,
            spread: 90,
            origin: { y: 0.7 },
            angle: 120
        });
    }, 300);
}

function restartQuiz() {
    document.getElementById("result-container").style.display = "none";
    startQuiz();
}

// Add event listeners
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("restart-button").addEventListener("click", restartQuiz);

// Add these styles dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .progress-bar {
        width: 100%;
        height: 10px;
        background: #e0e0e0;
        border-radius: 5px;
        margin-bottom: 20px;
        overflow: hidden;
    }
    
    .progress {
        height: 100%;
        background: linear-gradient(90deg, #3498db, #2980b9);
        transition: width 0.3s ease;
    }
    
    .answers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 20px;
    }
    
    .result-content {
        animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
`;
document.head.appendChild(styleSheet); 