// Chat context to remember previous messages
let chatContext = [];
const MAX_CONTEXT = 5;

// Enhanced responses with categories and follow-ups
const responses = {
    basic_greetings: {
        keywords: ["hello", "hi", "hey", "shalom"],
        replies: {
            "hello": "Hi there! How can I brighten your day?",
            "hi": "Hey! What's going on?",
            "hey": "Hello! I'm glad you're here.",
            "shalom": "Shalom! Peace and blessings to you."
        },
        followUp: ["how are you", "what's new", "need help"]
    },
    moods: {
        keywords: ["good", "bad", "happy", "sad", "tired", "angry", "excited", "bored", "worried", "anxious", "joy"],
        replies: {
            "good": "That's great to hear!",
            "bad": "I'm here if you need to talk.",
            "happy": "That's wonderful! Keep smiling!",
            "sad": "It's okay to feel this way. I'm here for you.",
            "tired": "Maybe some rest will help. Take it easy.",
            "angry": "Deep breaths. Want to talk about it?",
            "excited": "Yay! What's got you pumped?",
            "bored": "Want to try something fun?",
            "worried": "Let's work through it together.",
            "anxious": "You're not alone. You've got this.",
            "joy": "That's a gift! What brought it on?"
        },
        followUp: ["tell me more", "need support", "want advice"]
    },
    physical_states: {
        keywords: ["hungry", "thirsty"],
        replies: {
            "hungry": "Grab a bite! What are you in the mood for?",
            "thirsty": "Don't forget to hydrate!"
        },
        followUp: ["food suggestions", "healthy options", "take care"]
    },
    spiritual: {
        keywords: ["blessed", "love", "peace", "pray", "hope", "dream", "forgive", "remember", "forget"],
        replies: {
            "blessed": "That's beautiful. Gratitude is powerful.",
            "love": "Love makes the world go round!",
            "peace": "Wishing you more of it today.",
            "pray": "Let's take a quiet moment together.",
            "hope": "Hold on to it—good things are coming.",
            "dream": "Chase it—you never know what's possible.",
            "forgive": "A powerful act of healing.",
            "remember": "Memory keeps meaning alive.",
            "forget": "Let's gently move forward."
        },
        followUp: ["tell me more", "spiritual growth", "inner peace"]
    },
    jewish_terms: {
        keywords: ["Shabbat", "Shabbat Shalom", "mitzvah", "Torah", "synagogue", "mezuzah", "tzedakah", "kosher", "menorah", "yarmulke", "shalom bayit", "simcha", "mazel tov", "aliyah", "chai", "rebbe", "daven", "teshuva", "tallit", "shofar", "yom tov"],
        replies: {
            "Shabbat": "Shabbat Shalom! Rest and joy to you.",
            "Shabbat Shalom": "A peaceful and beautiful Shabbat to you.",
            "mitzvah": "What a kind thing to do!",
            "Torah": "Wisdom and light. So meaningful.",
            "synagogue": "A sacred space of community and prayer.",
            "mezuzah": "A beautiful reminder of protection and tradition.",
            "tzedakah": "Giving is a blessing. That's beautiful.",
            "kosher": "Keeping things mindful and meaningful.",
            "menorah": "Let the lights shine brightly!",
            "yarmulke": "A symbol of humility and respect.",
            "shalom bayit": "Wishing peace in your home.",
            "simcha": "May your joy multiply!",
            "mazel tov": "Congratulations! That's wonderful!",
            "aliyah": "That's an honor. Beautiful!",
            "chai": "To life! 🍷",
            "rebbe": "A teacher of wisdom and love.",
            "daven": "May your prayers bring peace.",
            "teshuva": "Growth is beautiful. Keep going.",
            "tallit": "A symbol of faith and presence.",
            "shofar": "Wake up to your purpose!",
            "yom tov": "Wishing you a good and holy day."
        },
        followUp: ["tell me more", "jewish wisdom", "traditions"]
    },
    jewish_holidays: {
        keywords: ["Rosh Hashanah", "Yom Kippur", "Sukkot", "Simchat Torah", "Hanukkah", "Purim", "Passover", "Seder"],
        replies: {
            "Rosh Hashanah": "Shana Tova! A sweet new year!",
            "Yom Kippur": "May you have an easy and meaningful fast.",
            "Sukkot": "Wishing you joy under the sukkah!",
            "Simchat Torah": "Celebrate the joy of learning!",
            "Hanukkah": "Happy Hanukkah! May your lights shine bright.",
            "Purim": "Costumes, joy, and celebration!",
            "Passover": "Wishing you freedom and renewal.",
            "Seder": "A special meal full of meaning."
        },
        followUp: ["holiday traditions", "celebrations", "memories"]
    },
    jewish_food: {
        keywords: ["latkes", "sufganiyot", "matzah", "brisket", "challah", "kugel"],
        replies: {
            "latkes": "Yum! A Hanukkah favorite!",
            "sufganiyot": "Sweet traditions are the best.",
            "matzah": "Crunchy, symbolic, and very Passover!",
            "brisket": "Classic and delicious!",
            "challah": "Soft, sweet, and spiritual.",
            "kugel": "A comfort food favorite!"
        },
        followUp: ["favorite foods", "recipes", "traditions"]
    },
    lifecycle: {
        keywords: ["bar mitzvah", "bat mitzvah", "brit", "mohel"],
        replies: {
            "bar mitzvah": "A big milestone! Mazel tov!",
            "bat mitzvah": "Such a meaningful celebration. Mazel tov!",
            "brit": "A beautiful welcome.",
            "mohel": "A tradition keeper."
        },
        followUp: ["celebrations", "traditions", "memories"]
    },
    israel: {
        keywords: ["Israel", "Jerusalem", "Tel Aviv"],
        replies: {
            "Israel": "A land of spirit and story.",
            "Jerusalem": "A city of gold and prayer.",
            "Tel Aviv": "Modern, bright, and buzzing!"
        },
        followUp: ["travel", "holy sites", "culture"]
    },
    activities: {
        keywords: ["study", "school", "college", "job", "work", "rest", "sleep", "wake"],
        replies: {
            "study": "Knowledge is empowering!",
            "school": "Keep learning—you're doing great!",
            "college": "New adventures await!",
            "job": "Keep going—you've got this!",
            "work": "Make time for breaks too!",
            "rest": "You deserve it.",
            "sleep": "Sweet dreams and peaceful rest.",
            "wake": "Rise and shine!"
        },
        followUp: ["goals", "balance", "self-care"]
    },
    weather: {
        keywords: ["sun", "rain", "snow", "wind", "cloud", "storm", "weather"],
        replies: {
            "sun": "Let it brighten your day.",
            "rain": "A chance to cozy up and reflect.",
            "snow": "Time for cocoa and calm.",
            "wind": "Let it carry your worries away.",
            "cloud": "Even gray skies can be peaceful.",
            "storm": "Stay safe and steady.",
            "weather": "It sure affects our mood!"
        },
        followUp: ["mood", "activities", "self-care"]
    },
    arts: {
        keywords: ["music", "song", "sing", "dance", "movie", "book", "read", "write", "draw", "paint", "create"],
        replies: {
            "music": "What's your favorite song?",
            "song": "Music can lift the soul.",
            "sing": "Let your voice be heard!",
            "dance": "Move with joy!",
            "movie": "Seen anything good lately?",
            "book": "What are you reading?",
            "read": "Stories open minds.",
            "write": "Words hold magic.",
            "draw": "Get creative!",
            "paint": "Express yourself!",
            "create": "You're full of ideas!"
        },
        followUp: ["favorites", "creative expression", "inspiration"]
    },
    relationships: {
        keywords: ["friend", "family", "home"],
        replies: {
            "friend": "You're not alone.",
            "family": "Cherish those close to you.",
            "home": "A place of comfort."
        },
        followUp: ["connections", "support", "love"]
    },
    travel: {
        keywords: ["travel", "trip", "vacation", "beach", "mountain", "nature", "forest"],
        replies: {
            "travel": "Where to next?",
            "trip": "Make memories wherever you go.",
            "vacation": "You deserve a break!",
            "beach": "Sand, sea, and serenity.",
            "mountain": "Breathe in that fresh air.",
            "nature": "Refresh your soul.",
            "forest": "Trees are good company."
        },
        followUp: ["destinations", "experiences", "plans"]
    },
    animals: {
        keywords: ["animal", "pet", "dog", "cat", "bird", "fish", "zoo"],
        replies: {
            "animal": "What's your favorite?",
            "pet": "Give them an extra treat today!",
            "dog": "Woof! 🐾",
            "cat": "Meow! 🐱",
            "bird": "Freedom in flight.",
            "fish": "Calm and cool.",
            "zoo": "What a fun day!"
        },
        followUp: ["pets", "animals", "nature"]
    },
    emotions: {
        keywords: ["fun", "laugh", "smile", "hug", "kiss", "cry", "tears"],
        replies: {
            "fun": "Let's bring more of that in.",
            "laugh": "Laughter is healing.",
            "smile": "You look great when you smile!",
            "hug": "Virtual hugs coming your way!",
            "kiss": "Sweet and kind.",
            "cry": "It's okay to let it out.",
            "tears": "Each one tells a story."
        },
        followUp: ["feelings", "support", "care"]
    },
    personal_growth: {
        keywords: ["brave", "strong", "weak", "fail", "win", "lose", "learn", "grow", "change", "stay", "go", "begin", "end"],
        replies: {
            "brave": "You've got courage inside.",
            "strong": "Never forget your strength.",
            "weak": "That's okay. You're still here.",
            "fail": "It's a step to growth.",
            "win": "Celebrate it!",
            "lose": "We learn even in loss.",
            "learn": "Keep going—you're growing.",
            "grow": "You're on a journey.",
            "change": "Change can be powerful.",
            "stay": "Be still and breathe.",
            "go": "Take that leap!",
            "begin": "Every start holds magic.",
            "end": "Every ending leads to a new beginning."
        },
        followUp: ["growth", "progress", "support"]
    },
    light_and_dark: {
        keywords: ["light", "dark"],
        replies: {
            "light": "Let it guide you.",
            "dark": "There's still hope in the shadows."
        },
        followUp: ["hope", "guidance", "peace"]
    },
    connection: {
        keywords: ["alone", "together", "family", "friends", "partner", "child", "parent", "mother", "father", "sister", "brother", "baby", "elder", "neighbor", "community"],
        replies: {
            "alone": "You're not truly alone—I'm here.",
            "together": "We're stronger that way.",
            "family": "They shape who we are.",
            "friends": "True friends lift us up.",
            "partner": "A bond worth cherishing.",
            "child": "So full of wonder.",
            "parent": "Their love runs deep.",
            "mother": "A heart full of care.",
            "father": "Strength and guidance.",
            "sister": "A forever friend.",
            "brother": "Always got your back.",
            "baby": "So pure and precious.",
            "elder": "Wisdom with grace.",
            "neighbor": "We're all connected.",
            "community": "Together, we thrive."
        },
        followUp: ["relationships", "support", "care"]
    },
    communication: {
        keywords: ["help", "support", "care", "listen", "talk", "speak", "voice", "quiet", "noise"],
        replies: {
            "help": "What can I do for you?",
            "support": "You've got people who care.",
            "care": "That's what it's all about.",
            "listen": "I'm all ears.",
            "talk": "Share what's on your mind.",
            "speak": "Your voice matters.",
            "voice": "Let it be heard.",
            "quiet": "Peace in the silence.",
            "noise": "Let's find calm."
        },
        followUp: ["share more", "need support", "let's talk"]
    },
    pace_and_time: {
        keywords: ["busy", "free", "fast", "slow", "early", "late", "start", "finish", "open", "close"],
        replies: {
            "busy": "Take a moment to breathe.",
            "free": "Feels good, doesn't it?",
            "fast": "Things sure move quickly.",
            "slow": "That's okay—go at your pace.",
            "early": "Rise and shine!",
            "late": "Better late than never.",
            "start": "Let's do this!",
            "finish": "You did it!",
            "open": "Stay open to new things.",
            "close": "Time to wrap up."
        },
        followUp: ["balance", "pace", "schedule"]
    },
    life_stages: {
        keywords: ["new", "old", "young", "wise"],
        replies: {
            "new": "Fresh starts bring hope.",
            "old": "There's beauty in tradition.",
            "young": "So much ahead!",
            "wise": "Your insights matter."
        },
        followUp: ["growth", "wisdom", "change"]
    },
    truth_and_authenticity: {
        keywords: ["truth", "lie", "real", "fake", "trust", "doubt"],
        replies: {
            "truth": "Honesty brings clarity.",
            "lie": "Let's get back to truth.",
            "real": "Stay grounded in reality.",
            "fake": "Let's keep it authentic.",
            "trust": "That's the foundation.",
            "doubt": "It's okay to question."
        },
        followUp: ["honesty", "authenticity", "trust"]
    },
    inner_self: {
        keywords: ["faith", "spirit", "soul", "heart", "mind", "body", "energy", "focus"],
        replies: {
            "faith": "Hold on to it.",
            "spirit": "Let it soar.",
            "soul": "Deep and full of light.",
            "heart": "Follow it.",
            "mind": "Use it well.",
            "body": "Take care of it.",
            "energy": "What fuels you?",
            "focus": "Eyes on the prize."
        },
        followUp: ["self-care", "balance", "growth"]
    },
    emotional_states: {
        keywords: ["calm", "stress", "pain", "healing", "hurt", "comfort", "safe", "danger"],
        replies: {
            "calm": "Let's find peace.",
            "stress": "Let's release some of that.",
            "pain": "I'm with you.",
            "healing": "That takes time and care.",
            "hurt": "Want to talk about it?",
            "comfort": "You deserve to feel it.",
            "safe": "You're in a safe space.",
            "danger": "Let's stay cautious."
        },
        followUp: ["support", "care", "healing"]
    },
    resources: {
        keywords: ["risk", "reward", "money", "wealth", "poor", "rich", "buy", "sell", "spend", "save", "give", "receive", "share", "gift"],
        replies: {
            "risk": "Sometimes it's worth it.",
            "reward": "Celebrate your win!",
            "money": "A tool, not a goal.",
            "wealth": "True wealth is in meaning.",
            "poor": "You are rich in soul.",
            "rich": "Share your blessings.",
            "buy": "Something on your list?",
            "sell": "What are you letting go?",
            "spend": "Invest in joy.",
            "save": "That's wise.",
            "give": "That's generous of you.",
            "receive": "Accept with gratitude.",
            "share": "What would you like to share?",
            "gift": "A symbol of care."
        },
        followUp: ["values", "priorities", "sharing"]
    },
    time_concepts: {
        keywords: ["present", "past", "future", "time", "day", "night", "morning", "evening", "today", "tomorrow", "yesterday"],
        replies: {
            "present": "The moment is a gift.",
            "past": "It made you who you are.",
            "future": "Full of promise.",
            "time": "Use it wisely.",
            "day": "What's today bringing?",
            "night": "Time to rest.",
            "morning": "A fresh start!",
            "evening": "Wind down and reflect.",
            "today": "Let's make the most of it.",
            "tomorrow": "A chance to try again.",
            "yesterday": "What did it teach you?"
        },
        followUp: ["reflection", "planning", "presence"]
    },
    calendar: {
        keywords: ["month", "year", "season", "spring", "summer", "autumn", "winter", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        replies: {
            "month": "What's new this month?",
            "year": "Another chapter begins.",
            "season": "What season are you in?",
            "spring": "New life blooming!",
            "summer": "Bright days ahead!",
            "autumn": "Change in the air.",
            "winter": "Cozy and calm.",
            "January": "New beginnings.",
            "February": "Feel the love.",
            "March": "Things are moving!",
            "April": "Time to grow.",
            "May": "Bloom with joy.",
            "June": "Sunny and sweet.",
            "July": "Summer fun!",
            "August": "Soak up the sunshine.",
            "September": "Time to reset.",
            "October": "Crisp and cool.",
            "November": "Season of thanks.",
            "December": "A time for light."
        },
        followUp: ["plans", "seasons", "changes"]
    },
    celebrations: {
        keywords: ["holiday", "birthday", "anniversary", "party", "event"],
        replies: {
            "holiday": "Time to celebrate!",
            "birthday": "Happy birthday to you!",
            "anniversary": "A special moment to honor.",
            "party": "Let's celebrate!",
            "event": "What's coming up?"
        },
        followUp: ["celebrations", "memories", "joy"]
    },
    communication_tech: {
        keywords: ["meeting", "appointment", "reminder", "note", "message", "text", "call", "phone", "computer", "internet", "email", "screen", "app"],
        replies: {
            "meeting": "Connecting minds!",
            "appointment": "Don't forget!",
            "reminder": "Here's your gentle nudge.",
            "note": "Got it noted!",
            "message": "What's your message?",
            "text": "Quick and easy.",
            "call": "Let's talk!",
            "phone": "Stay connected.",
            "computer": "Tech helps us build.",
            "internet": "So much out there!",
            "email": "Inbox check!",
            "screen": "Don't forget to take breaks.",
            "app": "What's your favorite tool?"
        },
        followUp: ["connect", "communicate", "share"]
    },
    tech_terms: {
        keywords: ["login", "logout", "account", "password", "security", "privacy", "data", "code", "robot", "AI", "technology", "machine", "program", "update", "install", "download", "upload", "connect", "disconnect"],
        replies: {
            "login": "Welcome back!",
            "logout": "See you soon!",
            "account": "Keep it safe.",
            "password": "Shhh, that's private!",
            "security": "Your peace of mind matters.",
            "privacy": "Your space is yours.",
            "data": "What are we learning?",
            "code": "Let's build something.",
            "robot": "I'm kind of one!",
            "AI": "Learning and helping!",
            "technology": "Changing the world.",
            "machine": "Part of progress.",
            "program": "Let's run it!",
            "update": "Fresh and improved.",
            "install": "Almost there!",
            "download": "Ready to use!",
            "upload": "Got something to share?",
            "connect": "Let's link up.",
            "disconnect": "Take a digital break."
        },
        followUp: ["tech help", "digital life", "connection"]
    },
    controls: {
        keywords: ["on", "off", "start", "stop", "pause", "reset", "restart", "retry"],
        replies: {
            "on": "Let's go!",
            "off": "Time to rest.",
            "start": "Let's begin!",
            "stop": "Take a pause.",
            "pause": "That's okay.",
            "reset": "Fresh start.",
            "restart": "Try again!",
            "retry": "It's worth another shot."
        },
        followUp: ["continue", "break", "begin"]
    },
    achievement: {
        keywords: ["fail", "success", "achievement", "award", "medal", "trophy", "certificate", "win", "lose"],
        replies: {
            "fail": "You're still learning.",
            "success": "You did great!",
            "achievement": "Be proud of yourself!",
            "award": "You've earned it!",
            "medal": "Victory vibes!",
            "trophy": "Celebrate your effort!",
            "certificate": "Officially awesome!",
            "win": "Yes! Keep it going!",
            "lose": "That's okay, try again."
        },
        followUp: ["celebrate", "learn", "grow"]
    },
    learning: {
        keywords: ["effort", "practice", "train", "learn", "teach", "mentor", "student", "class", "lesson", "test", "grade", "pass", "fail", "try", "improve", "grow", "reflect"],
        replies: {
            "effort": "That matters most.",
            "practice": "Makes progress.",
            "train": "Keep it up!",
            "learn": "Stay curious!",
            "teach": "Share your knowledge!",
            "mentor": "Guiding others is powerful.",
            "student": "Always learning!",
            "class": "What's the topic?",
            "lesson": "What did you learn?",
            "test": "Just do your best!",
            "grade": "It's one measure, not all.",
            "pass": "Well done!",
            "fail": "You'll get it next time.",
            "try": "That's all anyone can ask.",
            "improve": "You're doing it!",
            "grow": "One step at a time.",
            "reflect": "Look how far you've come."
        },
        followUp: ["progress", "learning", "growth"]
    },
    followup_responses: {
        keywords: [
            "how are you", "what's new", "need help", "tell me more", "need support", 
            "want advice", "food suggestions", "healthy options", "take care", 
            "spiritual growth", "inner peace", "jewish wisdom", "traditions", 
            "holiday traditions", "celebrations", "memories", "recipes", "holy sites", 
            "culture", "goals", "balance", "self-care", "mood", "activities", 
            "favorites", "creative expression", "inspiration", "connections", 
            "support", "love", "destinations", "experiences", "plans", "pets", 
            "animals", "nature", "feelings", "care", "growth", "progress", 
            "hope", "guidance", "peace", "relationships", "share more", "let's talk", 
            "pace", "schedule", "wisdom", "change", "honesty", "authenticity", 
            "trust", "healing", "values", "priorities", "sharing", "reflection", 
            "planning", "presence", "seasons", "changes", "joy", "connect", 
            "communicate", "tech help", "digital life", "connection", "continue", 
            "break", "begin", "celebrate", "learn", "grow"
        ],
        replies: {
            "how are you": "I'm here and ready to chat! How about you?",
            "what's new": "I'd love to hear what's new in your world!",
            "need help": "I'm here to help! What can I do for you?",
            "tell me more": "I'm all ears - what's on your mind?",
            "need support": "I'm right here with you. What do you need?",
            "want advice": "I'll do my best to help. What's the situation?",
            "food suggestions": "What kind of food are you in the mood for?",
            "healthy options": "Let's think about nourishing choices!",
            "take care": "Your wellbeing matters. How can we support it?",
            "spiritual growth": "Every step on the path matters. Where are you now?",
            "inner peace": "Finding that calm center. What helps you feel peaceful?",
            "jewish wisdom": "There's so much depth to explore. What interests you?",
            "traditions": "Traditions connect us to our roots. Which ones speak to you?",
            "holiday traditions": "Each holiday has its special customs. Which do you love?",
            "celebrations": "Life's moments deserve to be marked. What are we celebrating?",
            "memories": "Memories shape us. Want to share one?",
            "recipes": "Food connects us to tradition. Got a favorite recipe?",
            "holy sites": "Sacred spaces hold such meaning. Which ones call to you?",
            "culture": "Culture shapes our story. What aspects resonate with you?",
            "goals": "Dreams become reality one step at a time. What's your goal?",
            "balance": "Finding that sweet spot. How do you maintain balance?",
            "self-care": "Taking care of yourself is so important. What works for you?",
            "mood": "Moods are like weather - always changing. How's yours now?",
            "activities": "What kinds of things do you enjoy doing?",
            "favorites": "Everyone has favorites! Want to share yours?",
            "creative expression": "Creativity takes courage. How do you express yourself?",
            "inspiration": "What inspires you to keep going?",
            "connections": "We're all connected. Who matters most to you?",
            "support": "Support comes in many forms. What helps you feel supported?",
            "love": "Love makes the world go round. What does it mean to you?",
            "destinations": "Where would you love to go?",
            "experiences": "Life is made of experiences. What's been meaningful?",
            "plans": "Planning gives us direction. What's next for you?",
            "pets": "Pets bring such joy. Tell me about yours!",
            "animals": "Animals have so much to teach us. Which ones speak to you?",
            "nature": "Nature has its own wisdom. Where do you find peace outdoors?",
            "feelings": "Feelings guide us. What are you feeling now?",
            "care": "Care creates connection. How do you show you care?",
            "growth": "Growth happens step by step. Where are you growing?",
            "progress": "Every step forward counts. What progress are you proud of?",
            "hope": "Hope lights the way. What gives you hope?",
            "guidance": "Sometimes we all need guidance. What are you seeking?",
            "peace": "Peace begins within. What brings you peace?",
            "relationships": "Relationships shape our world. Who matters most?",
            "share more": "I'm interested - tell me more!",
            "let's talk": "I'm here to listen. What's on your mind?",
            "pace": "Everyone has their own pace. What works for you?",
            "schedule": "How do you like to organize your time?",
            "wisdom": "Wisdom comes from experience. What have you learned?",
            "change": "Change is constant. How do you handle it?",
            "honesty": "Truth builds trust. What does honesty mean to you?",
            "authenticity": "Being real matters. How do you stay authentic?",
            "trust": "Trust is earned. What helps you build it?",
            "healing": "Healing takes time. What helps you heal?",
            "values": "Values guide us. What matters most to you?",
            "priorities": "What's most important to you right now?",
            "sharing": "Sharing connects us. What would you like to share?",
            "reflection": "Taking time to reflect helps us grow. What's on your mind?",
            "planning": "Plans help us move forward. What are you planning?",
            "presence": "Being present is powerful. What helps you stay present?",
            "seasons": "Each season has its gifts. Which is your favorite?",
            "changes": "Change brings growth. How do you handle changes?",
            "joy": "Joy lightens our path. What brings you joy?",
            "connect": "Connection matters. How do you like to connect?",
            "communicate": "Communication builds bridges. How can we communicate better?",
            "tech help": "Technology can be tricky. What do you need help with?",
            "digital life": "The digital world is vast. How do you navigate it?",
            "connection": "We're all connected. How do you stay connected?",
            "continue": "Ready to keep going?",
            "break": "Taking breaks is important. What helps you recharge?",
            "begin": "Every beginning is special. Ready to start?",
            "celebrate": "Life's worth celebrating! What shall we celebrate?",
            "learn": "Learning never stops. What interests you?",
            "grow": "Growth is a journey. Where are you heading?"
        },
        followUp: ["tell me more", "share thoughts", "explore further"]
    },
    time_expressions: {
        keywords: ["second", "minute", "hour", "quick", "slow", "fast", "early", "late", "soon", "later", "always", "never", "sometimes", "usually", "rarely", "often", "occasionally", "forever"],
        replies: {
            "second": "Every second counts!",
            "minute": "Take a minute to breathe.",
            "hour": "An hour of progress is an hour well spent.",
            "quick": "You're quick on your feet!",
            "slow": "Take it slow; no rush.",
            "fast": "You're speeding through this!",
            "early": "Early bird gets the worm!",
            "late": "It's never too late to start.",
            "soon": "We'll get to it soon.",
            "later": "Let's talk later!",
            "always": "Always here for you!",
            "never": "Never say never!",
            "sometimes": "Sometimes it's okay to take a break.",
            "usually": "That's usually how it goes!",
            "rarely": "It's rare, but it's good to keep hope.",
            "often": "You've got this often!",
            "occasionally": "That happens occasionally.",
            "forever": "You've got this forever."
        },
        followUp: ["timing", "patience", "progress"]
    },
    greetings_basic: {
        keywords: ["thanks", "hello", "goodbye", "please", "sorry"],
        replies: {
            "thanks": "You're very welcome!",
            "hello": "Hi there! How's it going?",
            "goodbye": "Take care! Hope to talk soon.",
            "please": "Of course! What can I do for you?",
            "sorry": "No worries! It's all good."
        },
        followUp: ["how are you", "need help", "chat more"]
    },
    simple_responses: {
        keywords: ["yes", "no", "okay", "answer", "question", "reply", "ask"],
        replies: {
            "yes": "Great! What's next?",
            "no": "Alright! Let me know if you change your mind.",
            "okay": "Sounds good!",
            "answer": "I've got your answer right here.",
            "question": "What's your question? I'm ready!",
            "reply": "Here's my reply.",
            "ask": "Feel free to ask me anything!"
        },
        followUp: ["tell more", "need help", "continue"]
    },
    physical_actions: {
        keywords: ["walk", "run", "jump", "dance", "sing", "laugh", "cry", "smile", "hug", "kisses"],
        replies: {
            "walk": "A walk sounds like a great idea!",
            "run": "Get moving, you got this!",
            "jump": "Go ahead, jump for joy!",
            "dance": "Let's dance! Feel the rhythm.",
            "sing": "Sing loud and proud!",
            "laugh": "Laughter makes everything better!",
            "cry": "It's okay to cry. Let it all out.",
            "smile": "Your smile makes the world brighter!",
            "hug": "Here's a virtual hug for you!",
            "kisses": "Sending you some virtual love!"
        },
        followUp: ["feeling better", "express yourself", "keep going"]
    },
    qualities: {
        keywords: ["beautiful", "ugly", "pretty", "handsome", "cute", "interesting", "boring", "funny", "serious", "soft", "tall", "short", "big", "small"],
        replies: {
            "beautiful": "You're beautiful, inside and out.",
            "ugly": "Everyone is beautiful in their own way.",
            "pretty": "You've got that pretty glow.",
            "handsome": "You're looking handsome today!",
            "cute": "You're so cute!",
            "interesting": "That's an interesting thought!",
            "boring": "Let's spice things up!",
            "funny": "You've got a great sense of humor!",
            "serious": "Let's talk seriously. What's on your mind?",
            "soft": "Sometimes it's okay to be soft.",
            "tall": "Stand tall, you're amazing!",
            "short": "It's not about height, it's about heart.",
            "big": "You're making big moves!",
            "small": "Every small step counts."
        },
        followUp: ["self love", "confidence", "growth"]
    },
    temperature: {
        keywords: ["warm", "cold", "hot", "cool"],
        replies: {
            "warm": "I hope you feel cozy and warm.",
            "cold": "Stay warm and cozy!",
            "hot": "Keep cool in the heat!",
            "cool": "You're looking cool today!"
        },
        followUp: ["comfort", "feeling good", "take care"]
    },
    sound_qualities: {
        keywords: ["quiet", "loud", "silent", "noisy"],
        replies: {
            "quiet": "Sometimes silence speaks volumes.",
            "loud": "You have a great voice!",
            "silent": "Silence is golden.",
            "noisy": "Let's find a quieter space."
        },
        followUp: ["peace", "calm", "balance"]
    },
    evaluations: {
        keywords: ["good", "bad", "better", "best", "worst"],
        replies: {
            "good": "You're doing great!",
            "bad": "It happens, let's work through it.",
            "better": "Things are getting better!",
            "best": "You're doing your best!",
            "worst": "It's just a rough patch. You've got this."
        },
        followUp: ["progress", "improvement", "growth"]
    },
    communication_actions: {
        keywords: ["share", "listen", "talk", "speak"],
        replies: {
            "share": "Sharing is caring!",
            "listen": "I'm all ears. What's on your mind?",
            "talk": "I'm here to listen whenever you're ready.",
            "speak": "Let your voice be heard!"
        },
        followUp: ["tell more", "express yourself", "continue"]
    },
    time_periods: {
        keywords: ["today", "tomorrow", "yesterday", "week", "month", "year", "time"],
        replies: {
            "today": "Today is a new beginning.",
            "tomorrow": "Tomorrow holds new possibilities.",
            "yesterday": "Yesterday is behind you.",
            "week": "A new week, a fresh start.",
            "month": "A new month, new goals!",
            "year": "A whole year of growth ahead.",
            "time": "Time to make it count!"
        },
        followUp: ["future", "goals", "progress"]
    },
    emotions_extended: {
        keywords: ["peaceful", "relaxed", "bright", "dull", "heavy", "light"],
        replies: {
            "peaceful": "You radiate peace.",
            "relaxed": "Take a deep breath and relax.",
            "bright": "You light up the room.",
            "dull": "Let's bring some brightness into your day!",
            "heavy": "You don't have to carry it all alone.",
            "light": "You bring so much light to the world."
        },
        followUp: ["feelings", "emotions", "support"]
    },
    personal_qualities: {
        keywords: ["friendly", "kind", "sweet", "sour"],
        replies: {
            "friendly": "You're such a friendly person.",
            "kind": "Kindness is your superpower.",
            "sweet": "You're so sweet.",
            "sour": "Let's turn that frown upside down."
        },
        followUp: ["personality", "positivity", "kindness"]
    },
    life_concepts: {
        keywords: ["change", "grow", "learn", "teach", "win", "lose", "try", "fail", "success", "victory", "celebrate", "enjoy", "appreciate"],
        replies: {
            "change": "Change is a beautiful thing.",
            "grow": "Keep growing and evolving.",
            "learn": "Learning is a lifelong journey.",
            "teach": "We all have something to teach each other.",
            "win": "Celebrate your victories!",
            "lose": "Losing is part of the journey.",
            "try": "Always try your best.",
            "fail": "Failure is just a step towards success.",
            "success": "You're on your way to success.",
            "victory": "Congratulations on your victory!",
            "celebrate": "Let's celebrate your achievements!",
            "enjoy": "Enjoy every moment.",
            "appreciate": "I really appreciate you!"
        },
        followUp: ["growth", "learning", "achievement"]
    },
    wellness: {
        keywords: ["healthy", "sick", "rested", "energized"],
        replies: {
            "healthy": "Health is wealth. Stay healthy!",
            "sick": "I hope you feel better soon!",
            "rested": "Feeling rested and refreshed?",
            "energized": "You've got all the energy today!"
        },
        followUp: ["health", "wellness", "self-care"]
    },
    progress_states: {
        keywords: ["begin", "start", "finish", "end", "complete", "stop", "continue", "move", "pause", "play"],
        replies: {
            "begin": "Every new beginning is exciting!",
            "start": "Let's start something new today.",
            "finish": "You've made it to the finish line!",
            "end": "Every ending brings a new start.",
            "complete": "You did it, everything's complete!",
            "stop": "Take a break if you need it.",
            "continue": "Keep going, you're doing great!",
            "move": "Let's move forward together!",
            "pause": "Let's take a quick pause.",
            "play": "Let's play something fun!"
        },
        followUp: ["progress", "achievement", "next steps"]
    },
    challenge_responses: {
        keywords: ["challenge", "easy", "hard", "simple", "complicated"],
        replies: {
            "challenge": "Let's take on a challenge together!",
            "easy": "This will be easy for you.",
            "hard": "Don't worry, we'll get through this!",
            "simple": "Sometimes simple is best.",
            "complicated": "Let's simplify things."
        },
        followUp: ["difficulty", "support", "progress"]
    },
    emotional_states: {
        keywords: ["calm", "nervous", "confident", "doubt", "hope", "faith", "trust", "fear", "brave", "courage", "strength", "weakness"],
        replies: {
            "calm": "Stay calm, everything will work out.",
            "nervous": "It's normal to feel nervous sometimes.",
            "confident": "You've got this, stay confident!",
            "doubt": "Don't doubt yourself, you can do it!",
            "hope": "Always hold onto hope.",
            "faith": "Keep the faith!",
            "trust": "Trust yourself and the process.",
            "fear": "Fear can't stop you!",
            "brave": "You are more courageous than you think.",
            "courage": "Courage is facing fear head-on.",
            "strength": "Your strength is incredible.",
            "weakness": "Embrace your weaknesses, they make you stronger."
        },
        followUp: ["emotions", "strength", "growth"]
    }
};

// Typing animation duration
const TYPING_DURATION = 1500;

// Add timestamp to messages
function getTimestamp() {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York'  // This sets it to EST/EDT (automatically handles daylight savings)
    };
    return new Date().toLocaleTimeString('en-US', options);
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('chat-box').appendChild(typingDiv);
    typingDiv.style.display = 'flex';
    return typingDiv;
}

function hideTypingIndicator(indicator) {
    if (indicator) {
        indicator.remove();
    }
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
        ${text}
        <span class="time">${getTimestamp()}</span>
    `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Update context
    chatContext.push({ sender, text });
    if (chatContext.length > MAX_CONTEXT) {
        chatContext.shift();
    }
}

function findBestResponse(message) {
    message = message.toLowerCase();
    let bestMatch = null;
    let maxKeywords = 0;
    let response = null;

    // First check for exact matches in all categories including followup_responses
    for (const category in responses) {
        const categoryData = responses[category];
        for (const keyword of categoryData.keywords) {
            if (message.includes(keyword.toLowerCase())) {
                if (categoryData.replies[keyword]) {
                    return {
                        reply: categoryData.replies[keyword]
                    };
                }
            }
        }
    }

    // If no exact match, find best category match
    for (const category in responses) {
        const matches = responses[category].keywords.filter(keyword => 
            message.includes(keyword.toLowerCase())
        ).length;

        if (matches > maxKeywords) {
            maxKeywords = matches;
            bestMatch = category;
        }
    }

    if (bestMatch) {
        const category = responses[bestMatch];
        const randomKeyword = category.keywords[Math.floor(Math.random() * category.keywords.length)];
        return {
            reply: category.replies[randomKeyword] || "That's interesting! Tell me more about that."
        };
    }

    // Default response with context awareness
    const contextAwareResponses = [
        "I'm listening. Tell me more about that! 👂",
        "Interesting! What made you think about this? 🤔",
        "I'd love to hear more details! 💭",
        "That's worth exploring further. Can you elaborate? 🌟"
    ];
    return {
        reply: contextAwareResponses[Math.floor(Math.random() * contextAwareResponses.length)]
    };
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === '') return;

    appendMessage(message, 'user');
    inputField.value = '';

    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator(typingIndicator);
        const { reply } = findBestResponse(message);
        appendMessage(reply, 'bot');
    }, TYPING_DURATION);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize chat
window.onload = function() {
    const welcomeMessages = [
        "Hey there! I'm your MoodWise Buddy! 👋",
        "I'm here to chat, share jokes, or give you a motivational boost! 🌟",
        "What would you like to talk about? 😊"
    ];

    let delay = 0;
    welcomeMessages.forEach((msg) => {
        setTimeout(() => {
            appendMessage(msg, 'bot');
        }, delay);
        delay += 1000;
    });
}; 