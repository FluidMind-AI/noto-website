// ===== TYPEWRITER EFFECT WITH ROTATING MESSAGES =====
const typewriterMessages = [
    "Turn conversations into clarity",
    "Turn what's said into something useful",
    "Let Noto listen. You stay present",
    "Ask your notes and meetings anything",
    "Everything said, easy to find"
];

const typewriterElement = document.getElementById('typewriter');
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentMessage = typewriterMessages[messageIndex];

    if (!isDeleting) {
        // Typing forward
        typewriterElement.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentMessage.length) {
            // Message complete, pause then start deleting
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause for 2 seconds
            return;
        }

        setTimeout(typeWriter, 40); // Typing speed
    } else {
        // Deleting backward
        typewriterElement.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            // Deletion complete, move to next message
            isDeleting = false;
            messageIndex = (messageIndex + 1) % typewriterMessages.length;
            setTimeout(typeWriter, 200); // Short pause before typing next message
            return;
        }

        setTimeout(typeWriter, 20); // Deleting speed (faster)
    }
}

// Start typing when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 500); // Small delay before starting
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-box, .step-card, .use-case, .timeline-section');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });
});

// Add class when visible
const style = document.createElement('style');
style.textContent = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== FORM SUBMISSION =====
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
    const submitBtn = feedbackForm.querySelector('.btn-primary');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Get form values
        const select = feedbackForm.querySelector('.form-select');
        const textarea = feedbackForm.querySelector('.form-textarea');
        const email = feedbackForm.querySelector('.form-input');

        if (!textarea.value.trim()) {
            alert('Please tell us what\'s on your mind!');
            return;
        }

        // Simulate submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Sent! Thank you!';
            submitBtn.style.background = 'linear-gradient(135deg, #27C93F, #20A837)';

            // Reset form
            setTimeout(() => {
                textarea.value = '';
                email.value = '';
                select.selectedIndex = 0;
                submitBtn.textContent = 'Send feedback';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// ===== DOWNLOAD BUTTON INTERACTIONS =====
const downloadButtons = document.querySelectorAll('.download-btn, .btn-primary, .btn-secondary');

downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Download')) {
            // Simulate download action
            const originalText = this.innerHTML;
            this.innerHTML = 'Coming soon!';
            this.style.pointerEvents = 'none';

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = '';
            }, 2000);
        }
    });
});

// ===== LOGO EASTER EGG =====
const heroLogo = document.querySelector('.hero-logo-big img');
let clickCount = 0;

if (heroLogo) {
    heroLogo.addEventListener('click', () => {
        clickCount++;

        if (clickCount === 5) {
            heroLogo.style.transform = 'rotate(360deg) scale(1.2)';
            heroLogo.style.transition = 'transform 0.5s ease';

            setTimeout(() => {
                heroLogo.style.transform = '';
            }, 500);

            console.log('You found the friendly cloud!');
            clickCount = 0;
        }
    });
}

// ===== ROTATING BUBBLE MESSAGES =====
const bubbleMessages = [
    '<strong>No annoying meeting prompts.</strong> I work silently in the background while you focus on what matters.',
    '<strong>I summarize everything.</strong> Turn long meetings into clear, structured notes you can actually use.',
    '<strong>Ask me anything.</strong> Get answers about the meeting, create follow-up emails, draft action items—whatever you need.'
];

let currentMessageIndex = 0;
const bubbleElement = document.getElementById('bubble-message');

function rotateBubbleMessage() {
    if (!bubbleElement) return;

    // Fade out
    bubbleElement.style.opacity = '0';

    setTimeout(() => {
        // Change message
        currentMessageIndex = (currentMessageIndex + 1) % bubbleMessages.length;
        bubbleElement.innerHTML = bubbleMessages[currentMessageIndex];

        // Fade in
        bubbleElement.style.opacity = '1';
    }, 500);
}

// Rotate messages every 5 seconds
if (bubbleElement) {
    setInterval(rotateBubbleMessage, 5000);
}

// ===== CONSOLE MESSAGE =====
console.log('%cNotoNote 💙', 'font-size: 32px; font-weight: bold; color: #1E88E5; font-family: Poppins, sans-serif;');
console.log('%cYour clarity companion', 'font-size: 14px; color: #64748B;');
console.log('\nWe love curious developers! Want to chat? hello@notonote.app');
