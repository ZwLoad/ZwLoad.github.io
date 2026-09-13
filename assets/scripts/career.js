(() => {
    const label = document.querySelector('[data-career-start]');
    if (!label) return;
    const [startYear, startMonth, startDay] = label.dataset.careerStart.split('-').map(Number);
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul', year: 'numeric', month: 'numeric', day: 'numeric'
    });
    function updateCareer() {
        const parts = Object.fromEntries(dateFormat.formatToParts(new Date()).map(part => [part.type, part.value]));
        const year = Number(parts.year), month = Number(parts.month), day = Number(parts.day);
        // A new career year begins on the anniversary of the first employment date.
        const beforeAnniversary = month < startMonth || (month === startMonth && day < startDay);
        const careerYear = Math.max(1, year - startYear - Number(beforeAnniversary) + 1);
        const suffix = careerYear % 100 >= 11 && careerYear % 100 <= 13
            ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[careerYear % 10] || 'th');
        const language = document.documentElement.lang;
        const labels = {
            ko: `${careerYear}년 차 개발자`,
            en: `Developer · ${careerYear}${suffix} year`,
            ja: `開発者 ${careerYear}年目`
        };
        const titles = {
            ko: `${label.dataset.careerStart} 첫 입사일 기준`,
            en: `Career started on ${label.dataset.careerStart}`,
            ja: `${label.dataset.careerStart} 初入社日を基準に算出`
        };
        label.textContent = labels[language] || labels.ko;
        label.title = titles[language] || titles.ko;
    }
    updateCareer();
    new MutationObserver(updateCareer).observe(document.documentElement, {
        attributes: true, attributeFilter: ['lang']
    });
    // Refresh when returning to a long-open tab, and across midnight in Korea.
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateCareer();
    });
    setInterval(() => { if (!document.hidden) updateCareer(); }, 60000);
})();
