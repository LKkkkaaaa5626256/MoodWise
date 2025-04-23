const quotes = [
    "The only way to do great work is to love what you do",
    "Believe you can and you're halfway there",
    "The future belongs to those who believe in the beauty of their dreams",
    "Success is not final, failure is not fatal: it is the courage to continue that counts",
    "The best way to predict the future is to create it",
    "Everything you can imagine is real",
    "The only limit to our realization of tomorrow will be our doubts of today",
    "What you get by achieving your goals is not as important as what you become by achieving your goals",
    "The journey of a thousand miles begins with one step",
    "Don't watch the clock; do what it does. Keep going",
    "The only person you are destined to become is the person you decide to be",
    "Your time is limited, don't waste it living someone else's life",
    "The harder you work, the luckier you get",
    "Success is walking from failure to failure with no loss of enthusiasm",
    "The best revenge is massive success",
    "Happiness is not something ready made. It comes from your own actions",
    "The only true wisdom is in knowing you know nothing",
    "Life is what happens when you're busy making other plans",
    "In the middle of every difficulty lies opportunity",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "The way to get started is to quit talking and begin doing",
    "If you look at what you have in life, you'll always have more",
    "Life is really simple, but we insist on making it complicated",
    "The purpose of our lives is to be happy",
    "Get busy living or get busy dying",
    "You only live once, but if you do it right, once is enough",
    "Many of life's failures are people who did not realize how close they were to success when they gave up",
    "If you want to live a happy life, tie it to a goal, not to people or things",
    "Never let the fear of striking out keep you from playing the game",
    "Life is either a daring adventure or nothing at all",
    "The only impossible journey is the one you never begin",
    "In this life we cannot do great things. We can only do small things with great love",
    "Do not let making a living prevent you from making a life",
    "Life is 10% what happens to us and 90% how we react to it",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart",
    "Keep your face always toward the sunshine - and shadows will fall behind you",
    "The only thing we have to fear is fear itself",
    "It is during our darkest moments that we must focus to see the light",
    "Do not go where the path may lead, go instead where there is no path and leave a trail",
    "You miss 100% of the shots you don't take",
    "The best time to plant a tree was 20 years ago. The second best time is now",
    "An unexamined life is not worth living",
    "The two most important days in your life are the day you are born and the day you find out why",
    "Whatever you can do, or dream you can, begin it. Boldness has genius, power, and magic in it",
    "The mind is everything. What you think you become",
    "The best revenge is to be unlike him who performed the injury",
    "When you reach the end of your rope, tie a knot in it and hang on",
    "There is only one way to avoid criticism: do nothing, say nothing, and be nothing",
    "The only person you are destined to become is the person you decide to be",
    "Life is like riding a bicycle. To keep your balance, you must keep moving",
    "The greatest wealth is to live content with little",
    "Be the change you wish to see in the world",
    "Happiness is when what you think, what you say, and what you do are in harmony",
    "The secret of getting ahead is getting started",
    "Our greatest glory is not in never falling, but in rising every time we fall",
    "The only real failure in life is not to be true to the best one knows",
    "The best way to find yourself is to lose yourself in the service of others",
    "The future depends on what you do today",
    "The only limit to the height of your achievements is the reach of your dreams and your willingness to work for them",
    "The greatest discovery of all time is that a person can change his future by merely changing his attitude",
    "The only way to do great work is to love what you do",
    "The best preparation for tomorrow is doing your best today",
    "The only thing standing between you and your goal is the story you keep telling yourself",
    "The greatest weapon against stress is our ability to choose one thought over another",
    "The only way to achieve the impossible is to believe it is possible",
    "The best time to plant a tree was 20 years ago. The second best time is now",
    "The only way to discover the limits of the possible is to go beyond them into the impossible",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible",
    "The best way to predict your future is to create it",
    "The only limit to our realization of tomorrow is our doubts of today",
    "The greatest wealth is health",
    "The only way to do great work is to love what you do",
    "The best way to find yourself is to lose yourself in the service of others",
    "The only real failure in life is not to be true to the best one knows",
    "The greatest discovery of all time is that a person can change his future by merely changing his attitude",
    "The only limit to the height of your achievements is the reach of your dreams and your willingness to work for them",
    "The best preparation for tomorrow is doing your best today",
    "The only thing standing between you and your goal is the story you keep telling yourself",
    "The greatest weapon against stress is our ability to choose one thought over another",
    "The only way to achieve the impossible is to believe it is possible",
    "The best time to plant a tree was 20 years ago. The second best time is now",
    "The only way to discover the limits of the possible is to go beyond them into the impossible",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible",
    "The best way to predict your future is to create it",
    "The only limit to our realization of tomorrow is our doubts of today",
    "The greatest wealth is health"
];

let currentQuote = null;

function animateQuote(quoteBox, newQuote, isInitial = false) {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const button = document.getElementById('quote-button');

    if (!isInitial) {
        // Disable button during animation
    button.disabled = true;

    // Fade out current quote
    quoteBox.style.opacity = '0';
    quoteBox.style.transform = 'translateY(20px)';
    } else {
        // For initial quote, start invisible
        quoteBox.style.opacity = '0';
        quoteBox.style.transform = 'translateY(20px)';
    }

    setTimeout(() => {
        // Update quote content
        quoteText.textContent = newQuote;
        quoteAuthor.textContent = '';

        // Fade in new quote
        quoteBox.style.transition = 'all 0.5s ease-in-out';
        quoteBox.style.opacity = '1';
        quoteBox.style.transform = 'translateY(0)';

        if (!isInitial) {
        // Re-enable button after animation
        setTimeout(() => {
            button.disabled = false;
        }, 500);
        }
    }, isInitial ? 0 : 500);
}

function getNewQuote() {
    const quoteBox = document.querySelector('.quote-box');
    const button = document.getElementById('quote-button');
    
    // Disable button immediately on click
    button.disabled = true;
    
    // Get a new random quote (different from current)
    let newQuote;
    do {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
    } while (newQuote === currentQuote);
    
    currentQuote = newQuote;
    animateQuote(quoteBox, newQuote);
}

// Initialize with a random quote
document.addEventListener('DOMContentLoaded', () => {
    const quoteBox = document.querySelector('.quote-box');
    const button = document.getElementById('quote-button');
    
    // Enable button initially
    button.disabled = false;
    
    // Get initial quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];
    
    // Animate initial quote
    animateQuote(quoteBox, currentQuote, true);
    
    // Add click event to button
    button.addEventListener('click', getNewQuote);
}); 