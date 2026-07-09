// ===== BILLING TOGGLE (Monthly / Yearly — default Yearly) =====
(function () {
    const monthlyBtn = document.getElementById('billing-monthly');
    const yearlyBtn = document.getElementById('billing-yearly');
    if (!monthlyBtn || !yearlyBtn) return;

    const price = document.getElementById('pro-price');
    const priceNote = document.getElementById('pro-price-note');
    const saveLine = document.getElementById('pro-save-line');
    const saveDetail = document.getElementById('pro-save-detail');

    function render(yearly) {
        yearlyBtn.classList.toggle('billing-btn--active', yearly);
        monthlyBtn.classList.toggle('billing-btn--active', !yearly);

        price.textContent = yearly ? '$7.49' : '$9.99';
        priceNote.textContent = yearly ? 'Billed annually at $89.99, after trial' : 'Billed monthly, after trial';
        saveLine.style.display = yearly ? 'inline-block' : 'none';
        saveDetail.style.display = yearly ? 'block' : 'none';
    }

    monthlyBtn.addEventListener('click', () => render(false));
    yearlyBtn.addEventListener('click', () => render(true));

    render(true);
})();

// ===== FAQ ACCORDION (single open at a time) =====
(function () {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            items.forEach((other) => other.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });
})();
