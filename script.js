// ===== TYPEWRITER EFFECT =====
const typewriterText = "Turn conversations into clarity";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40); // Adjust speed here (lower = faster)
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

// ===== CONSOLE MESSAGE =====
console.log('%cNotoNote 💙', 'font-size: 32px; font-weight: bold; color: #1E88E5; font-family: Poppins, sans-serif;');
console.log('%cYour clarity companion', 'font-size: 14px; color: #64748B;');
console.log('\nWe love curious developers! Want to chat? hello@notonote.app');
