// Play background music on load
window.addEventListener('load', () => {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(error => {
        console.log('Audio autoplay prevented:', error);
    });
});

// Canvas setup for confetti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
let animationId;

// Confetti class
class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 5 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.color = ['#ffb3d1', '#ff91c7', '#e58da3', '#ffd6e8', '#ffe5f0'][Math.floor(Math.random() * 5)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY += 0.05; // gravity
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isOffScreen() {
        return this.y > canvas.height || this.x < 0 || this.x > canvas.width;
    }
}

// Confetti animation
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push(new ConfettiPiece());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = confetti.length - 1; i >= 0; i--) {
        confetti[i].update();
        confetti[i].draw();
        
        if (confetti[i].isOffScreen()) {
            confetti.splice(i, 1);
        }
    }
    
    if (confetti.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        cancelAnimationFrame(animationId);
    }
}

function triggerConfetti() {
    confetti = [];
    createConfetti();
    animateConfetti();
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Cake button functionality
document.getElementById('btnCake').addEventListener('click', () => {
    const cakeContainer = document.getElementById('cakeContainer');
    const flame = document.getElementById('flame');
    const bgMusic = document.getElementById('bgMusic');
    
    // Show cake container
    cakeContainer.classList.add('active');
    
    // Reset animations
    const layers = ['layer1', 'layer2', 'layer3'];
    layers.forEach((id, index) => {
        const layer = document.getElementById(id);
        layer.style.animation = 'none';
        setTimeout(() => {
            layer.style.animation = '';
        }, 10);
    });
    
    // Light the candle after layers fall
    setTimeout(() => {
        flame.classList.add('lit');
        triggerConfetti();
    }, 2500);
    
    // Play music
    bgMusic.play().catch(error => {
        console.log('Audio play prevented:', error);
    });
    
    // Close cake container after 5 seconds
    setTimeout(() => {
        cakeContainer.classList.remove('active');
        flame.classList.remove('lit');
        const cakeMessage = document.querySelector('.cake-message');
        cakeMessage.style.animation = 'none';
        setTimeout(() => {
            cakeMessage.style.animation = 'fadeIn 1s ease-out 2.5s forwards';
        }, 10);
    }, 8000);
});

// Album button functionality
document.getElementById('btnAlbum').addEventListener('click', () => {
    const albumSection = document.getElementById('albumSection');
    const cakeContainer = document.getElementById('cakeContainer');
    const readmeSection = document.getElementById('readmeSection');
    
    // Hide other sections
    cakeContainer.classList.remove('active');
    readmeSection.classList.remove('active');
    
    // Toggle album section
    if (albumSection.classList.contains('active')) {
        albumSection.classList.remove('active');
    } else {
        albumSection.classList.add('active');
    }
});

// Collect button functionality
document.getElementById('btnCollect').addEventListener('click', () => {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Made with love 💕</h2>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal on click anywhere
    modal.addEventListener('click', () => {
        modal.remove();
        // Close Album section to return to main page
        const albumSection = document.getElementById('albumSection');
        albumSection.classList.remove('active');
    });
    
    // Close modal automatically after 3 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
            // Close Album section to return to main page
            const albumSection = document.getElementById('albumSection');
            albumSection.classList.remove('active');
        }
    }, 3000);
    
    // Trigger confetti
    triggerConfetti();
});

// Read Me button functionality
document.getElementById('btnRead').addEventListener('click', () => {
    const readmeSection = document.getElementById('readmeSection');
    const cakeContainer = document.getElementById('cakeContainer');
    const albumSection = document.getElementById('albumSection');
    
    // Hide other sections
    cakeContainer.classList.remove('active');
    albumSection.classList.remove('active');
    
    // Toggle readme section
    if (readmeSection.classList.contains('active')) {
        readmeSection.classList.remove('active');
    } else {
        readmeSection.classList.add('active');
    }
});

// Close sections when clicking outside (optional enhancement)
document.addEventListener('click', (e) => {
    const cakeContainer = document.getElementById('cakeContainer');
    const albumSection = document.getElementById('albumSection');
    const readmeSection = document.getElementById('readmeSection');
    
    // Only close if clicking on background (not on buttons or content)
    if (e.target === document.body || e.target.closest('.container')) {
        // Check if click is outside active sections
        if (!e.target.closest('.cake-container') && 
            !e.target.closest('.album-section') && 
            !e.target.closest('.readme-section') &&
            !e.target.closest('.btn')) {
            // Keep cake animation visible but close others on outside click
            if (!cakeContainer.classList.contains('active')) {
                albumSection.classList.remove('active');
                readmeSection.classList.remove('active');
            }
        }
    }
});

// Add microphone functionality for blowing candles
let isListening = false;
let recognizer = null;

// Check if browser supports speech recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizer = new SpeechRecognition();
    recognizer.continuous = true;
    recognizer.interimResults = false;
    recognizer.lang = 'en-US';
    
    recognizer.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
            const transcript = result[0].transcript.toLowerCase();
            // Check if user is blowing (any sound detected)
            if (transcript.length > 0 && isListening) {
                blowOutCandles();
                recognizer.stop();
                isListening = false;
            }
        }
    };
    
    recognizer.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        isListening = false;
    };
}

function blowOutCandles() {
    const flame = document.getElementById('flame');
    const cakeMessage = document.querySelector('.cake-message');
    
    flame.classList.remove('lit');
    cakeMessage.textContent = 'Your wish will come true! ✨💖';
    triggerConfetti();
    
    // Restore original message after 3 seconds
    setTimeout(() => {
        cakeMessage.textContent = 'Make a wish before you blow the candles 🎂💖';
    }, 3000);
}

// Add blow functionality to cake
document.getElementById('cakeContainer')?.addEventListener('click', () => {
    if (document.getElementById('flame').classList.contains('lit')) {
        const instruction = document.createElement('div');
        instruction.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 182, 193, 0.9);
            padding: 15px 30px;
            border-radius: 20px;
            color: #d81b60;
            font-weight: 600;
            z-index: 3000;
            animation: fadeIn 0.3s ease-out;
        `;
        instruction.textContent = 'Say anything to blow the candles! 🎂';
        document.body.appendChild(instruction);
        
        if (recognizer && !isListening) {
            isListening = true;
            recognizer.start();
            
            setTimeout(() => {
                instruction.remove();
            }, 3000);
            
            setTimeout(() => {
                if (isListening) {
                    recognizer.stop();
                    isListening = false;
                }
            }, 10000);
        }
    }
});

