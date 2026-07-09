// ===== TYPEWRITER EFFECT WITH ROTATING MESSAGES =====
// Messages come from the element's data-messages attribute so every page
// can define its own rotation while sharing this script.
const typewriterElement = document.getElementById('typewriter');

if (typewriterElement) {
    let typewriterMessages = [];
    try {
        typewriterMessages = JSON.parse(typewriterElement.dataset.messages || '[]');
    } catch (e) {
        typewriterMessages = [];
    }

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
                setTimeout(typeWriter, 2000);
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
                setTimeout(typeWriter, 200);
                return;
            }

            setTimeout(typeWriter, 20); // Deleting speed (faster)
        }
    }

    if (typewriterMessages.length) {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(typeWriter, 500);
        });
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ENGINE (progress bar, scenes, cues) =====
(function () {
    const nav = document.querySelector('.nav');
    const progressBar = document.getElementById('scroll-fill');
    const scenes = document.querySelectorAll('[data-scene]');
    const recTimer = document.getElementById('rec-timer');
    const featuresCue = document.getElementById('features-cue');
    const featuresSection = document.getElementById('features');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function update() {
        const vh = window.innerHeight;

        // Nav shadow once scrolled
        if (nav) {
            nav.style.boxShadow = window.pageYOffset > 50 ? '0 4px 16px rgba(15, 23, 42, 0.1)' : 'none';
        }

        // Scroll progress bar
        if (progressBar) {
            const d = document.documentElement;
            const denom = d.scrollHeight - d.clientHeight;
            progressBar.style.width = (denom > 0 ? (d.scrollTop / denom) * 100 : 0) + '%';
        }

        // Per-scene progress p ∈ [0,1] drives all in-scene reveals via --p
        let firstSceneP = 0;
        scenes.forEach((el, i) => {
            let p;
            if (reduceMotion.matches) {
                p = 1; // show final state, no scroll animation
            } else {
                const rect = el.getBoundingClientRect();
                const total = el.offsetHeight - vh; // scrollable travel
                p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
            }
            el.style.setProperty('--p', p.toFixed(4));

            // If the scene's content is taller than the viewport (small screens),
            // pan it upward as p advances so late reveals scroll into view.
            const inner = el.querySelector('.scene-sticky > *');
            if (inner) {
                const over = Math.max(0, inner.offsetHeight + 16 - vh);
                el.style.setProperty('--overshoot', Math.round(over) + 'px');
                el.classList.toggle('scene--tall', over > 8);
            }
            if (i === 0) firstSceneP = p;
        });

        // Recording timer counts up with the Capture scene
        if (recTimer) {
            const secs = Math.round(Math.min(1, Math.max(0, (firstSceneP - 0.4) / 0.55)) * 47);
            recTimer.textContent = '00:' + String(secs).padStart(2, '0');
        }

        // "Keep scrolling" cue fades out as the statement scrolls past
        if (featuresCue && featuresSection) {
            const rect = featuresSection.getBoundingClientRect();
            const op = Math.max(0, Math.min(1, (rect.bottom - vh * 0.35) / (vh * 0.25)));
            featuresCue.style.opacity = op.toFixed(3);
            featuresCue.style.pointerEvents = op < 0.05 ? 'none' : 'auto';
        }
    }

    let raf = null;
    function onScroll() {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = null;
            update();
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', onScroll);
    document.addEventListener('DOMContentLoaded', update);
    update();
})();

// ===== MOBILE HAMBURGER MENU =====
(function () {
    var hamburger = document.querySelector('.nav-hamburger');
    var nav = document.querySelector('.nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('menu-open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on nav link click
    var navLinks = nav.querySelectorAll('.nav-center a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) {
            nav.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
})();

// ===== LOGO EASTER EGG =====
(function () {
    const heroLogo = document.querySelector('.hero-logo img');
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
})();

// ===== DYNAMIC COPYRIGHT YEAR =====
(function () {
    var yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();

// ===== CONSOLE MESSAGE =====
console.log('%cNotoNote 💙', 'font-size: 32px; font-weight: bold; color: #1E88E5; font-family: Poppins, sans-serif;');
console.log('%cNever Miss What Matters', 'font-size: 14px; color: #64748B;');
console.log('\nWe love curious developers! Want to chat? hello@notonote.app');
