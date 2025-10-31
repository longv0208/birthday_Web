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
    const bgMusic = document.getElementById('bgMusic');
    
    // Show cake container
    cakeContainer.classList.add('active');
    
    // Reset SVG animation by removing and re-adding the SVG element
    const cakeSVG = document.getElementById('cakeSVG');
    const parent = cakeSVG.parentNode;
    const nextSibling = cakeSVG.nextElementSibling;
    const clone = cakeSVG.cloneNode(true);
    cakeSVG.remove();
    parent.insertBefore(clone, nextSibling);
    
    // Play music
    bgMusic.play().catch(error => {
        console.log('Audio play prevented:', error);
    });
    
    // Auto close after animation
    autoCloseCake();
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
            <h2>Made with hate 💕</h2>
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

// Auto close cake after animation completes
function autoCloseCake() {
    const cakeContainer = document.getElementById('cakeContainer');
    const cakeMessage = document.querySelector('.cake-message');
    
    // Wait for flames to appear, then close after 3 seconds
    setTimeout(() => {
        cakeMessage.textContent = 'Your wish will come true! ✨💖';
        triggerConfetti();
        
        setTimeout(() => {
            cakeContainer.classList.remove('active');
            cakeMessage.textContent = 'Make a wish before you blow the candles 🎂💖';
        }, 3000);
    }, 9000); // Total ~9s: cake animation complete + 3s message
}

