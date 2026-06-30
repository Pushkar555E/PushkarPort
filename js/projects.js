/* projects.js */
import { injectNav, injectFooter, injectCursor, injectScrollProgress, initReveal, initGlassCardGlow, injectPreloader } from './shared.js';
injectPreloader();
injectCursor();
injectScrollProgress();
injectNav('projects');
injectFooter();
initReveal();
initGlassCardGlow();

/* 3D Magnetic Tilt on project cards */
document.querySelectorAll('.project-card').forEach(card => {
  let active = false;
  card.addEventListener('mouseenter', () => { active = true; card.style.transition = 'box-shadow .3s,border-color .3s'; });
  card.addEventListener('mousemove', e => {
    if (!active) return;
    const b = card.getBoundingClientRect();
    const rotX = ((e.clientY - b.top - b.height/2) / (b.height/2)) * -8;
    const rotY = ((e.clientX - b.left - b.width/2) / (b.width/2)) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', () => {
    active = false;
    card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1),box-shadow .3s,border-color .3s';
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
});

/* Project Filtering */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.style.border = 'none';
    });
    // Add active class to clicked
    btn.classList.add('active');
    btn.style.border = '1px solid var(--g-blue)';

    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
        // Add a slight animation
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'floatUp 0.6s cubic-bezier(.22,1,.36,1) forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
