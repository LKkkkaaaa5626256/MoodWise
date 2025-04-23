const jokes = [
    "I asked my phone's voice assistant to tell me a joke. It showed me my screen time.",
    "I tried to write a book on reverse psychology. Please don't buy it.",
    "Therapist: 'Your problem is that you always pretend everything's fine.' Me: 'It's fine.'",
    "You think math is hard? Try figuring out who's mad at you without asking.",
    "Some people graduate with honors. I am just honored to graduate.",
    "My memory has gotten so bad, I changed my password to 'Incorrect'. So when I forget it, it tells me: 'Your password is incorrect.'",
    "I opened a bakery that only sells cookies shaped like people I dislike. I call it Sweet Revenge.",
    "Ever tried to eat a clock? It's very time-consuming.",
    "I'm not arguing. I'm just passionately explaining why I'm right.",
    "If we're not supposed to have midnight snacks... why is there a light in the fridge?",
    "I'm not lazy. I'm just in energy-saving mode.",
    "My plans for the weekend? Eat. Sleep. Overthink. Repeat.",
    "I don't need a hair stylist. My pillow gives me a new hairstyle every morning.",
    "Whoever said 'nothing is impossible' clearly never tried folding a fitted sheet.",
    "I'd agree with you, but then we'd both be wrong.",
    "I love long walks... especially when they're taken by people who annoy me.",
    "I'm not great at advice. Can I interest you in a sarcastic comment?",
    "My favorite exercise is a cross between a lunge and a crunch. I call it lunch.",
    "Silence is golden. Unless you have kids. Then it's suspicious.",
    "I have a lot of hidden talents. The problem is, even I can't find them.",
    "I'd tell you a construction joke, but I'm still working on it.",
    "I used to think I was indecisive. Now I'm not sure.",
    "The elevator to success is out of order. You'll have to take the stairs.",
    "My bank account and I are not on speaking terms right now.",
    "I have a 'do not disturb' face. Unfortunately, it's not working.",
    "I finally realized people are prisoners of their phones... that's why it's called a cell.",
    "I don't suffer from insanity—I enjoy every minute of it.",
    "Common sense is like deodorant. The people who need it most never use it.",
    "I hate when people ask me what I did yesterday. I don't even know what I'm doing tomorrow.",
    "The early bird might get the worm, but the second mouse gets the cheese.",
    "If I had a dollar for every time I got distracted... I'd probably buy a taco.",
    "I talk to myself. Sometimes I need expert advice.",
    "I'm writing a book on procrastination. I'll start tomorrow.",
    "I'm not weird. I'm limited edition.",
    "I drink coffee for your protection.",
    "The world doesn't revolve around you. Unless you're me.",
    "I cleaned my room. Now I can't find anything.",
    "Life is short. Smile while you still have teeth.",
    "I don't rise and shine. I caffeinate and hope.",
    "I hate it when I gain ten pounds for a role... and then realize I'm not even an actor.",
    "I'm not shy. I'm just really good at observing people silently.",
    "I don't have bad handwriting. I have my own font.",
    "Mondays are proof that weekends are not enough.",
    "I'm not overthinking—I'm just practicing my imagination.",
    "Life is a soup... and I'm a fork.",
    "I put my phone in airplane mode, but it's not flying.",
    "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
    "I started out with nothing, and I still have most of it.",
    "I'm on a seafood diet. I see food and I eat it.",
    "I don't have a bucket list, but my 'nap list' is extensive.",
    "I'm so bright my mother calls me sun. Everyone else calls me 'too much.'",
    "I can't adult today. Please don't make me.",
    "I read a book on anti-gravity. I couldn't put it down.",
    "My patience is running thin. Like, one-ply toilet paper thin.",
    "If you think nobody cares if you're alive, try missing a few car payments.",
    "I went outside once. The graphics were good, but the plot was confusing.",
    "I don't know how to act my age. I've never been this age before.",
    "The older I get, the earlier it gets late.",
    "I'm not moody. I just have days where I'm less fake than usual.",
    "Some people wake up feeling like a million bucks. I wake up feeling like insufficient funds.",
    "My phone battery lasts longer than most of my relationships.",
    "I asked for a sign, and the universe gave me a parking ticket.",
    "I do my best proofreading after I hit 'send.'",
    "I don't rise and shine. I caffeinate and then plot revenge.",
    "I'm not short. I'm concentrated awesome.",
    "I just found out I'm not the center of the universe. Devastating.",
    "If I had a dollar for every smart thing I said, I'd be broke.",
    "I used to play sports. Then I realized you can buy trophies. Now I'm good at everything.",
    "I told my laptop we wouldn't be seeing each other anymore. Now it's doing everything it can to stay on.",
    "I'm in shape. Round is a shape.",
    "I consider 'binge-watching' a sport.",
    "I prefer not to think before I speak. I like being just as surprised as everyone else.",
    "I wanted to lose weight, but I hate losing.",
    "I could agree with you, but then we'd both be wrong.",
    "I'm not eavesdropping. I just hear better when I lean in dramatically.",
    "Some people age like fine wine. I age like milk—quickly and unexpectedly.",
    "I make pour decisions. Mostly involving coffee.",
    "My brain has too many tabs open.",
    "I sleep like a baby—waking up every three hours crying.",
    "I have no idea what I'm doing, but I'm doing it really well.",
    "I'm not bossy. I just have better ideas.",
    "I'm fluent in eye roll.",
    "I'm still waiting for my Hogwarts letter. It's probably stuck in customs.",
    "I used to be cool. Then they changed what cool was.",
    "I procrastinate so much, even my anxiety is delayed.",
    "I'm not late. I'm just early for tomorrow.",
    "I took a day off to recharge... now I need a week to recover.",
    "I Googled my symptoms. Turns out I just need snacks and a nap.",
    "I like long walks—especially when taken by people who annoy me.",
    "I tried meditating... then I fell asleep and woke up more stressed.",
    "I don't need therapy, I just need a passport and a plane ticket.",
    "I'm not clumsy. The floor just hates me.",
    "I set my password to 'incorrect' so every time I forget, it reminds me.",
    "I like to hold hands in the dark... mainly so I don't trip over things.",
    "My hobbies include eating and also thinking about what I'm going to eat.",
    "I follow a balanced diet: pizza in both hands.",
    "I can't keep calm. I've lost the remote.",
    "My idea of multitasking is screwing up several things at once.",
    "I don't need a mood ring. I have a face.",
    "If stress burned calories, I'd be a supermodel by now."
];

const emojis = ["🌟", "💫", "✨", "💪", "😊"];

let isJokeActive = false;

function tellJoke() {
    // Prevent multiple jokes from being displayed at once
    if (isJokeActive) return;
    
    const jokeBox = document.getElementById('jokeBox');
    const jokeButton = document.querySelector('.joke-btn');
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    
    isJokeActive = true;
    
    // Hide the joke box and button first
    jokeBox.style.display = 'none';
    jokeBox.classList.remove('show');
    jokeButton.style.display = 'none';
    
    // Show the new joke after a short delay
    setTimeout(() => {
        jokeBox.textContent = joke;
        jokeBox.style.display = 'block';
        
        // Use requestAnimationFrame to ensure smooth transition
        requestAnimationFrame(() => {
            jokeBox.classList.add('show');
        });
        
        // Hide the joke after 4 seconds
        setTimeout(() => {
            jokeBox.classList.remove('show');
            setTimeout(() => {
                jokeBox.style.display = 'none';
                // Show the button again
                jokeButton.style.display = 'inline-flex';
                isJokeActive = false; // Reset the flag when animation is complete
            }, 300);
        }, 4000);
    }, 300);
} 