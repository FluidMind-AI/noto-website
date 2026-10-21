/* Contact card. Any link with [data-contact-card] opens it (the href stays a mailto: fallback if JS is off). */
(function () {
    var SUPPORT = 'support@notonote.ai';
    var PRIVACY = 'privacy@fluidmind.ai';
    var overlay, lastFocus;

    var ICON_MAIL = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
    var ICON_SHIELD = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3z"/><path d="m9 12 2 2 4-4"/></svg>';

    function row(icon, label, email, note) {
        return '<div class="cc-row"><span class="cc-icon">' + icon + '</span>' +
            '<span class="cc-text"><span class="cc-label">' + label + '</span>' +
            '<a class="cc-value" href="mailto:' + email + '">' + email + '</a>' +
            '<span class="cc-note">' + note + '</span></span>' +
            '<button type="button" class="cc-copy" data-copy="' + email + '">Copy</button></div>';
    }

    function build() {
        overlay = document.createElement('div');
        overlay.className = 'cc-overlay';
        overlay.innerHTML =
            '<div class="cc-card" role="dialog" aria-modal="true" aria-labelledby="cc-title">' +
            '<button type="button" class="cc-close" aria-label="Close">&times;</button>' +
            '<h2 class="cc-title" id="cc-title">Contact us</h2>' +
            '<p class="cc-sub">Questions, feedback or help with NotoNote? Reach us here.</p>' +
            row(ICON_MAIL, 'Support', SUPPORT, 'Help with the app, your account or billing') +
            row(ICON_SHIELD, 'Privacy &amp; data requests', PRIVACY, 'Access, correction or deletion of your data') +
            '<div class="cc-links">' +
            '<a class="cc-link" href="https://discord.com/invite/FXgN52acgG" target="_blank" rel="noopener">Discord</a>' +
            '<a class="cc-link" href="https://t.me/notonote_official" target="_blank" rel="noopener">Telegram</a>' +
            '</div>' +
            '<p class="cc-address"><strong>Fluid Mind Inc.</strong><br>Intershore Chambers, Road Town, Tortola, British Virgin Islands</p>' +
            '</div>';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || e.target.closest('.cc-close')) { close(); return; }
            var btn = e.target.closest('.cc-copy');
            if (btn) copy(btn);
        });
    }

    function copy(btn) {
        var text = btn.getAttribute('data-copy');
        var done = function () {
            btn.textContent = 'Copied';
            setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, function () {});
        }
    }

    function open() {
        if (!overlay) build();
        lastFocus = document.activeElement;
        overlay.classList.add('cc-open');
        document.body.style.overflow = 'hidden';
        overlay.querySelector('.cc-close').focus();
    }

    function close() {
        if (!overlay) return;
        overlay.classList.remove('cc-open');
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
        if (location.hash === '#contact') history.replaceState(null, '', location.pathname + location.search);
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest('[data-contact-card]');
        if (!link) return;
        e.preventDefault();
        open();
    });

    document.addEventListener('keydown', function (e) {
        if (!overlay || !overlay.classList.contains('cc-open')) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'Tab') {
            var items = overlay.querySelectorAll('button, a[href]');
            var first = items[0], last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    if (location.hash === '#contact') {
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open);
        else open();
    }
})();
