let timeLeft;
let timerId = null;
let isWorkMode = true;

const WORK_TIME = 30 * 60; // 30 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const emojis = ['🍅', '⏰', '✨', '💪', '🎯', '⚡'];
let emojiInterval;
let fallDuration = 4; // Initial fall duration in seconds

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        startEmojiRain(); // Start emoji rain
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                stopEmojiRain(); // Stop emoji rain
                alert(isWorkMode ? 'Work time is over! Take a break!' : 'Break is over! Time to work!');
                isWorkMode = !isWorkMode;
                timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
                updateTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    stopEmojiRain(); // Stop emoji rain when paused
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    stopEmojiRain(); // Stop emoji rain when reset
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateTimer();
}

function setMode(mode) {
    isWorkMode = mode === 'work';
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    clearInterval(timerId);
    timerId = null;
    updateTimer();
}

function createEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animation = `fall ${fallDuration}s linear forwards`;
    
    document.body.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => {
        emoji.remove();
    }, fallDuration * 1000);
}

function startEmojiRain() {
    const initialInterval = 1000; // Start with 1 emoji per second
    createEmoji(); // Create first emoji immediately
    
    emojiInterval = setInterval(() => {
        createEmoji();
        // Adjust fall speed based on remaining time
        const progress = 1 - (timeLeft / (isWorkMode ? WORK_TIME : BREAK_TIME));
        fallDuration = 4 - (progress * 2); // Gradually decrease from 4s to 2s
    }, initialInterval);
}

function stopEmojiRain() {
    clearInterval(emojiInterval);
}

// Initialize the timer
timeLeft = WORK_TIME;
updateTimer(); 