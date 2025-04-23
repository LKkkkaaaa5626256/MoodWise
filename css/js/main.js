// Add event listener when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Make sure the hand is hidden initially
    const hand = document.getElementById('highFiveHand');
    hand.style.opacity = '0';
    hand.style.bottom = '-100%';
});

let isAnimating = false;

function giveHighFive() {
    if (isAnimating) return;
    isAnimating = true;

    const hand = document.getElementById('highFiveHand');
    const header = document.querySelector('.main-header');
    const content = document.querySelector('.feature-content');
    
    // Hide everything except the hand
    Array.from(content.children).forEach(child => {
        if (child !== hand) {
            child.style.transition = 'opacity 0.3s';
            child.style.opacity = '0';
        }
    });
    header.style.transition = 'opacity 0.3s';
    header.style.opacity = '0';

    // Show and animate the hand
    hand.style.opacity = '1';
    hand.style.transform = 'translateY(-95vh) rotate(-10deg)';

    // Add impact effect
    setTimeout(() => {
        hand.classList.add('impact');
        document.body.classList.add('screen-shake');
        hand.classList.add('fade-out');
        triggerSmallHands();
        
        // Remove impact class after animation
        setTimeout(() => {
            hand.classList.remove('impact');
            document.body.classList.remove('screen-shake');
        }, 200);
    }, 1000);

    // Reset everything after animation completes
    setTimeout(() => {
        hand.classList.remove('fade-out');
        hand.style.opacity = '0';
        hand.style.transform = 'translateY(0)';
        
        // Show everything back
        Array.from(content.children).forEach(child => {
            if (child !== hand) {
                child.style.opacity = '1';
            }
        });
        header.style.opacity = '1';
        isAnimating = false;
    }, 2500);
}

function triggerSmallHands() {
    // Optimize by reducing the number of hands and using requestAnimationFrame
    const numHands = 300; // Reduced from 782 for better performance
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numHands; i++) {
        const smallHand = document.createElement('div');
        smallHand.classList.add('small-hand');
        smallHand.innerText = '✋';

        // Random color from palette
        smallHand.style.color = colors[Math.floor(Math.random() * colors.length)];

        // Random positions for explosion effect
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 600 + 300;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotation = (Math.random() - 0.5) * 720;

        smallHand.style.setProperty('--x', `${x}px`);
        smallHand.style.setProperty('--y', `${y}px`);
        smallHand.style.setProperty('--rotation', `${rotation}deg`);
        smallHand.style.left = '50%';
        smallHand.style.top = '50%';

        fragment.appendChild(smallHand);
    }

    // Batch DOM updates
    requestAnimationFrame(() => {
        document.body.appendChild(fragment);
        // Clean up hands after animation
        setTimeout(() => {
            const hands = document.querySelectorAll('.small-hand');
            hands.forEach(hand => hand.remove());
        }, 3000);
    });
} 