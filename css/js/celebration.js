function fireConfetti(duration) {
    let end = Date.now() + duration;
    (function frame() {
        if (Date.now() < end) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: Math.random(), y: Math.random() }
            });
            setTimeout(frame, 500);
        }
    })();
}

function createPartyPopper() {
    const partyPopper = document.createElement('div');
    partyPopper.classList.add('party-popper');
    partyPopper.innerHTML = '🎉';
    document.body.appendChild(partyPopper);

    partyPopper.style.left = Math.random() * 100 + 'vw';
    partyPopper.style.top = '80vh';
    partyPopper.style.animationDuration = (1 + Math.random()) + 's';

    setTimeout(() => {
        partyPopper.remove();
    }, 1500);
}

function firePartyPoppers(duration) {
    let end = Date.now() + duration;
    (function frame() {
        if (Date.now() < end) {
            createPartyPopper();
            setTimeout(frame, 500);
        }
    })();
}

function createEmojiBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("emoji-balloon");
    balloon.innerHTML = "🎈";
    balloon.style.left = Math.random() * 90 + "vw"; 
    balloon.style.fontSize = Math.random() * 20 + 30 + "px";
    balloon.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 7000);
}

function releaseEmojiBalloons(duration) {
    let end = Date.now() + duration;
    (function generate() {
        if (Date.now() < end) {
            createEmojiBalloon();
            setTimeout(generate, 500);
        }
    })();
}

function fireFireworks(duration) {
    let end = Date.now() + duration;
    (function frame() {
        if (Date.now() < end) {
            confetti({
                particleCount: 150,
                spread: 160,
                startVelocity: 45,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
                origin: { x: Math.random(), y: Math.random() }
            });
            setTimeout(frame, 800);
        }
    })();
}

function createEncouragingMessage(name) {
    const messages = [
        `${name}, you're amazing! 🎉`,  
        `${name}, you're a star! ⭐`,  
        `${name}, great job! 👏`,  
        `${name}, keep going! 💪`,  
        `${name}, you're doing great! ✨`,  
        `${name}, you inspire greatness! 🌟`,  
        `${name}, you are unstoppable! 🔥`,  
        `${name}, shine bright! 💖`,  
        `${name}, nothing can stop you! 🚀`,  
        `${name}, believe in yourself! 💫`,  
        `${name}, your potential is limitless! 🌍`,  
        `${name}, keep being awesome! 😎`,  
        `${name}, the world needs your light! 💡`,  
        `${name}, you make a difference! 💕`,  
        `${name}, you're stronger than you know! 💪`,  
        `${name}, never stop dreaming! 🌙`,  
        `${name}, your hard work is paying off! 🎯`,  
        `${name}, you've got this! ✅`,  
        `${name}, your kindness is powerful! ❤️`,  
        `${name}, keep pushing forward! 🚀`,  
        `${name}, success is within reach! 🏆`,  
        `${name}, you're a true inspiration! ✨`,  
        `${name}, believe in your magic! 🪄`,  
        `${name}, keep shining bright! 🌞`,  
        `${name}, you bring joy to others! 😊`,  
        `${name}, challenges make you stronger! 💪`,  
        `${name}, stay positive and keep going! 💖`,  
        `${name}, you are more capable than you know! 🔥`,  
        `${name}, your potential is endless! 🚀`,  
        `${name}, you are enough just as you are! 💙`,  
        `${name}, your dreams matter! 🌠`,  
        `${name}, you are making a difference! 🌎`,  
        `${name}, your efforts don't go unnoticed! 👀`,  
        `${name}, stay strong and keep moving forward! 🏃‍♂️`,  
        `${name}, you are worthy of great things! 🏅`,  
        `${name}, never stop believing in yourself! 💫`,  
        `${name}, you're capable of amazing things! 🌟`,  
        `${name}, every day is a new opportunity! 🌅`,  
        `${name}, you're writing your own success story! 📖`,  
        `${name}, keep up the amazing work! 🎯`,  
        `${name}, you have a heart of gold! 💛`,  
        `${name}, keep spreading positivity! ✨`,  
        `${name}, you are destined for greatness! 🚀`,  
        `${name}, you are doing better than you think! 🌸`,  
        `${name}, your confidence is inspiring! 💪`,  
        `${name}, embrace your uniqueness! 🌈`,  
        `${name}, your energy is contagious! ⚡`,  
        `${name}, keep believing, keep achieving! 🎯`,  
        `${name}, your kindness changes the world! ❤️`,  
        `${name}, never give up on your dreams! 🌟`
    ];
    const message = document.createElement("div");
    message.classList.add("encouraging-message");
    message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    
    message.style.left = Math.random() * 80 + "vw"; 
    message.style.top = Math.random() * 70 + "vh"; 
    message.style.fontSize = (Math.random() * 1.5 + 1.5) + "rem"; 
    message.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 6000);
}

function fireEffects() {
    const name = document.getElementById("nameInput").value.trim() || "You";
    const durationInput = document.getElementById("durationInput").value;
    const duration = (durationInput ? parseInt(durationInput) : 15) * 1000;
    
    // Hide the entire celebration container
    const celebrationContainer = document.querySelector(".celebration-container");
    celebrationContainer.style.display = 'none';
    document.querySelector(".back-link").classList.add("hidden");

    // Start all celebration effects
    fireConfetti(duration);
    firePartyPoppers(duration);
    releaseEmojiBalloons(duration);
    fireFireworks(duration);

    let endTime = Date.now() + duration;
    (function showMessages() {
        if (Date.now() < endTime) {
            createEncouragingMessage(name);
            setTimeout(showMessages, 1000);
        }
    })();

    setTimeout(() => {
        // Show UI elements after celebration
        celebrationContainer.style.display = 'block';
        document.querySelector(".back-link").classList.remove("hidden");
    }, duration);
} 