// ===== PRICING TOGGLE =====
(function () {
    const toggle = document.getElementById('pricing-toggle');
    if (!toggle) return;

    const buttons = toggle.querySelectorAll('.toggle-option');
    const slider = toggle.querySelector('.toggle-slider');
    const priceYearly = document.getElementById('price-yearly');
    const priceMonthly = document.getElementById('price-monthly');

    function positionSlider(activeBtn) {
        slider.style.width = activeBtn.offsetWidth + 'px';
        slider.style.transform = 'translateX(' + activeBtn.offsetLeft + 'px)';
    }

    function setActivePeriod(period) {
        buttons.forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.period === period);
            if (btn.dataset.period === period) {
                positionSlider(btn);
            }
        });

        if (period === 'yearly') {
            priceYearly.style.display = '';
            priceMonthly.style.display = 'none';
        } else {
            priceYearly.style.display = 'none';
            priceMonthly.style.display = '';
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            setActivePeriod(btn.dataset.period);
        });
    });

    // Initialize slider position on load
    window.addEventListener('load', function () {
        var activeBtn = toggle.querySelector('.toggle-option.active');
        if (activeBtn) positionSlider(activeBtn);
    });

    // Also handle resize
    window.addEventListener('resize', function () {
        var activeBtn = toggle.querySelector('.toggle-option.active');
        if (activeBtn) positionSlider(activeBtn);
    });
})();


// ===== EQUALIZE CARD-TOP HEIGHTS =====
(function () {
    function equalizeCardTops() {
        var tops = document.querySelectorAll('.card-top');
        if (tops.length < 2) return;

        // Reset so we measure natural heights
        tops.forEach(function (el) { el.style.minHeight = ''; });

        var maxH = 0;
        tops.forEach(function (el) {
            if (el.offsetHeight > maxH) maxH = el.offsetHeight;
        });

        tops.forEach(function (el) { el.style.minHeight = maxH + 'px'; });
    }

    window.addEventListener('load', equalizeCardTops);
    window.addEventListener('resize', equalizeCardTops);
})();


// ===== FAQ ACCORDION =====
(function () {
    var items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
        var btn = item.querySelector('.faq-question');

        btn.addEventListener('click', function () {
            var isOpen = item.classList.contains('open');

            // Close all
            items.forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it wasn't already open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();


// ===== NAVBAR SCROLL SHADOW =====
(function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            nav.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
})();


// ===== SCROLL REVEAL FOR CARDS & TABLE =====
(function () {
    var targets = document.querySelectorAll('.pricing-card, .comparison-table-wrap, .faq-list, .pricing-cta-content');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's';
        observer.observe(el);
    });

    // Inject visible class
    var s = document.createElement('style');
    s.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(s);
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

    var navLinks = nav.querySelectorAll('.nav-center a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) {
            nav.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
})();
