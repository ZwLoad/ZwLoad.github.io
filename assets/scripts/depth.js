(() => {
    const root = document.documentElement;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const scene = document.createElement('div');
    scene.className = 'depth-scene';
    scene.setAttribute('aria-hidden', 'true');
    scene.innerHTML = '<div class="depth-grid"></div><div class="depth-particles"></div><div class="depth-vignette"></div>';
    document.body.prepend(scene);

    let frame = 0;
    function render() {
        frame = 0;
        const distance = Math.max(1, root.scrollHeight - innerHeight);
        const progress = Math.min(1, Math.max(0, scrollY / distance));
        const active = !reducedMotion.matches;
        root.classList.toggle('depth-enabled', active);
        root.style.setProperty('--dive-depth', active ? progress.toFixed(4) : '0');
        root.style.setProperty('--dive-grid-y', `${active ? -scrollY * .06 : 0}px`);
        root.style.setProperty('--dive-particles-y', `${active ? -scrollY * .18 : 0}px`);
        // The page palette darkens with depth; text contrast stays unchanged.
        if (active) {
            const c = Math.round(16 - progress * 11);
            root.style.setProperty('--paper', `rgb(${c}, ${c}, ${c + 2})`);
            root.style.setProperty('--surface', `rgb(${c + 8}, ${c + 8}, ${c + 12})`);
        } else {
            root.style.removeProperty('--paper');
            root.style.removeProperty('--surface');
        }

    }
    function schedule() {
        if (!frame) frame = requestAnimationFrame(render);
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    // Project disclosures and translated text can change document height.
    new ResizeObserver(schedule).observe(document.body);
    render();
})();
