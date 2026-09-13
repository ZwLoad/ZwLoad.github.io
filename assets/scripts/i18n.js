(() => {
    const dictionary = window.portfolioTranslations || {};
    const supported = ['ko', 'en', 'ja'];
    const storageKey = 'portfolio-language';
    const select = document.getElementById('language-select');
    let language = 'ko';
    const normalize = text => text.replace(/\s+/g, ' ').trim();
    const translate = source => language === 'ko' ? source : dictionary[source]?.[language] || source;

    // Capture source nodes once. Updating node values preserves icons, links,
    // disclosure state and the original Korean text when switching back.
    const textBindings = [];
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.closest('script, style, select, [data-i18n-rich], [data-career-start]')) continue;
        const source = normalize(node.nodeValue);
        if (Object.hasOwn(dictionary, source)) {
            textBindings.push({ node, source, original: node.nodeValue });
        }
    }
    const attributeBindings = [];
    document.querySelectorAll('[aria-label], meta[content]').forEach(element => {
        const attribute = element.tagName === 'META' ? 'content' : 'aria-label';
        const source = element.getAttribute(attribute);
        if (Object.hasOwn(dictionary, source)) attributeBindings.push({ element, attribute, source });
    });
    const richTranslations = {
        intro: {
            en: 'Platform development, service operations and technical decisions.<br>From writing code to helping a team deliver,<br class="desktop-break"> I’m <strong>Jinyong Ahn</strong>, and this is the work I do.',
            ja: 'プラットフォーム開発、サービス運用、技術判断。<br>コードを書くことから、チームで完成させることまで。<br class="desktop-break"> 開発者<strong>アン・ジニョン</strong>が取り組んできた仕事です。'
        },
        revenue: { en: '800<span>M KRW</span>', ja: '8<span>億ウォン</span>' }
    };
    const richBindings = [...document.querySelectorAll('[data-i18n-rich]')].map(element => ({
        element, original: element.innerHTML, key: element.dataset.i18nRich
    }));

    function applyLanguage(next, save = false) {
        language = supported.includes(next) ? next : 'ko';
        document.documentElement.lang = language;
        textBindings.forEach(({ node, source, original }) => {
            node.nodeValue = language === 'ko' ? original : original.replace(/\S[\s\S]*\S|\S/, translate(source));
        });
        attributeBindings.forEach(({ element, attribute, source }) => element.setAttribute(attribute, translate(source)));
        richBindings.forEach(({ element, original, key }) => {
            // These strings are local, reviewed translations, never user input.
            element.innerHTML = language === 'ko' ? original : richTranslations[key][language];
        });
        const modal = document.getElementById('modal');
        if (modal.dataset.sourceTitle) {
            const title = translate(modal.dataset.sourceTitle);
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-image').alt = title;
        }
        select.value = language;
        if (save) {
            try { localStorage.setItem(storageKey, language); } catch { /* Private browsing can block storage. */ }
            const url = new URL(location.href);
            url.searchParams.set('lang', language);
            history.replaceState(null, '', url);
        }
    }
    window.portfolioI18n = { t: translate };
    let saved;
    try { saved = localStorage.getItem(storageKey); } catch { /* Korean remains the default. */ }
    const requested = new URLSearchParams(location.search).get('lang');
    applyLanguage(supported.includes(requested) ? requested : supported.includes(saved) ? saved : 'ko');
    select.addEventListener('change', () => applyLanguage(select.value, true));
    window.addEventListener('popstate', () => {
        const next = new URLSearchParams(location.search).get('lang');
        applyLanguage(supported.includes(next) ? next : 'ko');
    });
})();
