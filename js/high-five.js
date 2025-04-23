let highFiveCount = 0;

function createConfetti() {
    const colors = ['#FFFF00', '#FFA500', '#FFB700', '#FFC700', '#FFE700'];
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles-container');
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}

function createSmallHands(isFist = false) {
    const hand = isFist ? document.getElementById('fistBumpHand') : document.getElementById('highFiveHand');
    const rect = hand.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const smallHand = document.createElement('div');
        smallHand.className = 'small-hand';
        smallHand.textContent = isFist ? '👊' : '✋';
        smallHand.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
        smallHand.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
        document.body.appendChild(smallHand);
        
        setTimeout(() => {
            smallHand.remove();
        }, 2000);
    }
}

function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = highFiveCount;
    counter.style.animation = 'none';
    counter.offsetHeight; // Trigger reflow
    counter.style.animation = 'bounce 0.5s ease-out';
}

function giveHighFive() {
    highFiveCount++;
    updateCounter();
    
    // Hide the back link and content wrapper during animation
    const backLink = document.querySelector('.back-link');
    const contentWrapper = document.querySelector('.content-wrapper');
    backLink.style.opacity = '0';
    contentWrapper.classList.add('hide');
    
    const hand = document.getElementById('highFiveHand');
    hand.style.opacity = '1';
    hand.style.transform = 'translateY(-75vh)';

    // Simulate high-five impact by briefly holding the position
    setTimeout(() => {
        hand.classList.add('fade-out');
        triggerSmallHands();
    }, 1500);

    // Reset the hand and show back link and content wrapper after all animations complete
    setTimeout(() => {
        hand.classList.remove('fade-out');
        hand.style.opacity = '0';
        hand.style.transform = 'translateY(0)';
        backLink.style.opacity = '1';
        contentWrapper.classList.remove('hide');
    }, 5000); // Increased from 4000 to 5000 to match the longer small hands animation duration
}

function giveFistBump() {
    highFiveCount++;
    updateCounter();
    
    // Hide the back link and content wrapper during animation
    const backLink = document.querySelector('.back-link');
    const contentWrapper = document.querySelector('.content-wrapper');
    backLink.style.opacity = '0';
    contentWrapper.classList.add('hide');
    
    const hand = document.getElementById('fistBumpHand');
    hand.style.opacity = '1';
    hand.style.transform = 'translateY(-85vh)';

    // Simulate fist bump impact by briefly holding the position
    setTimeout(() => {
        hand.classList.add('fade-out');
        triggerSmallHands(true);
    }, 1500);

    // Reset the hand and show back link and content wrapper after all animations complete
    setTimeout(() => {
        hand.classList.remove('fade-out');
        hand.style.opacity = '0';
        hand.style.transform = 'translateY(0)';
        backLink.style.opacity = '1';
        contentWrapper.classList.remove('hide');
    }, 5000);
}

function triggerSmallHands(isFist = false) {
    // Create small hands that explode in random directions
    for (let i = 0; i < 782; i++) {
        const smallHand = document.createElement('div');
        smallHand.classList.add('small-hand');
        smallHand.innerText = isFist ? '👊' : '✋';

        // Generate a random color using HSL
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        smallHand.style.color = randomColor;

        // Random positions for explosion effect
        const angle = Math.random() * 760;
        const distance = Math.random() * 600 + 300;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        // Apply the random positions to the small hands
        smallHand.style.setProperty('--x', `${x}px`);
        smallHand.style.setProperty('--y', `${y}px`);
        smallHand.style.left = '50%';
        smallHand.style.top = '50%';

        document.body.appendChild(smallHand);

        // Clean up the small hands after explosion
        setTimeout(() => {
            smallHand.remove();
        }, 3000);
    }
}

// Add some CSS for the new elements
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        animation: fall linear forwards;
    }
    
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #8B5CF6;
        border-radius: 50%;
        animation: sparkle 2s ease-in-out infinite;
    }
    
    @keyframes sparkle {
        0%, 100% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style); 