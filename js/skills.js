/* skills.js */
import { injectNav, injectFooter, injectCursor, injectScrollProgress, initReveal, initGlassCardGlow, injectPreloader } from './shared.js';
injectPreloader();
injectCursor();
injectScrollProgress();
injectNav('skills');
injectFooter();
initReveal();
initGlassCardGlow();

/* ── Skill bar animation on scroll ─────────────────────────────────── */
const bars = document.querySelectorAll('.skill-bar');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 200);
      obs.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => obs.observe(b));
