(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

    const running = new Map();
    const seen = new WeakSet();
    const targets = document.querySelectorAll([
        '.hero-copy > *', '.career-overview-heading', '.career-steps li',
        '.hero-metrics > div', '.philosophy-grid > div', '.section-header',
        '.timeline-item', '.skill-category-enhanced', '.highlight-box',
        '.certifications-card', '.languages-card', '.achievement-card'
    ].join(', '));

    // Content stays visible without JavaScript. Animate only as it enters view.
    const reveal = new IntersectionObserver(entries => {
        let order = 0;
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            reveal.unobserve(entry.target);
            if (seen.has(entry.target)) return;
            seen.add(entry.target);
            if (preference.matches || entry.target.contains(document.activeElement)) return;

            const animation = entry.target.animate([
                { opacity: 0, transform: 'translateY(18px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 520,
                delay: Math.min(order++ * 55, 165),
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'backwards'
            });
            running.set(entry.target, animation);
            const cleanup = () => running.delete(entry.target);
            animation.onfinish = cleanup;
            animation.oncancel = cleanup;
        });
    }, { threshold: 0 });
    targets.forEach(target => reveal.observe(target));

    const stopAnimations = () => {
        running.forEach(animation => animation.cancel());
        running.clear();
    };
    preference.addEventListener('change', () => {
        if (preference.matches) stopAnimations();
    });
    window.addEventListener('beforeprint', stopAnimations);
    document.addEventListener('focusin', event => {
        running.forEach((animation, target) => {
            if (target.contains(event.target)) animation.cancel();
        });
    });
})();
