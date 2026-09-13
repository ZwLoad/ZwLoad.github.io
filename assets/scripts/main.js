const modal = document.getElementById('modal');
function openModal(imageSrc, title) {
    modal.dataset.sourceTitle = title;
    const translatedTitle = window.portfolioI18n ? window.portfolioI18n.t(title) : title;
    document.getElementById('modal-title').textContent = translatedTitle;
    const image = document.getElementById('modal-image');
    image.src = imageSrc;
    image.alt = translatedTitle;
    modal.showModal();
    document.body.style.overflow = 'hidden';
}
function closeModal() { modal.close(); }
modal.addEventListener('close', () => { document.body.style.overflow = ''; });
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
function downloadFile(filePath, fileName) {
    const link = document.createElement('a');
    link.href = filePath; link.download = fileName;
    document.body.appendChild(link); link.click(); link.remove();
}
const navLinks = document.querySelectorAll('.nav-menu a');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                const active = link.hash === '#' + entry.target.id;
                link.classList.toggle('active', active);
                if (active) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }
    });
}, {rootMargin: '-15% 0px -55% 0px'});
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
