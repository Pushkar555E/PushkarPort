/* home.js — Home page logic */
import { injectNav, injectFooter, injectCursor, injectScrollProgress, initReveal, initGlassCardGlow, injectPreloader } from './shared.js';

injectPreloader();
injectCursor();
injectScrollProgress();
injectNav('home');
injectFooter();
initReveal();
initGlassCardGlow();

/* ── Hero 2D Particle Canvas ────────────────────────────────────── */
(function initHeroParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COUNT = 70;
  const CONNECT = 130;
  // Google colors as particle palette
  const PALETTE = [
    'rgba(66,133,244,',
    'rgba(234,67,53,',
    'rgba(251,188,5,',
    'rgba(52,168,83,',
  ];

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.6 + 0.4;
      this.alpha = Math.random() * 0.4 + 0.15;
      this.col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 80) { const f = (80 - dist) / 80 * 1.4; this.x += (dx / dist) * f; this.y += (dy / dist) * f; }
      if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.alpha + ')'; ctx.fill();
    }
  }

  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  const init = () => { resize(); particles = Array.from({ length: COUNT }, () => new Particle()); };
  const drawLines = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT) {
          const alpha = (1 - dist / CONNECT) * 0.12;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(66,133,244,' + alpha + ')';
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  };
  const loop = () => { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); };
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  init(); loop();
})();

/* ── Typewriter ─────────────────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const roles = ['AI-driven apps.', 'modern web experiences.', '3D WebGL universes.', 'scalable systems.', 'beautiful UIs.', 'the future. ⚡'];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const type = () => {
    const cur = roles[roleIdx];
    if (!deleting) { el.textContent = cur.slice(0, ++charIdx); if (charIdx === cur.length) { deleting = true; setTimeout(type, 1800); return; } }
    else { el.textContent = cur.slice(0, --charIdx); if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(type, 350); return; } }
    setTimeout(type, deleting ? 35 : 70);
  };
  setTimeout(type, 1200);
})();

/* ── Counter animation ──────────────────────────────────────────── */
(function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = parseInt(el.dataset.count), start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / 1000, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + '+';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step); obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
})();

/* ── Smooth scroll ──────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

console.log('%c⚡ Pushkar Biswas — Ultimate Portfolio', 'background:linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853);color:white;padding:8px 16px;border-radius:6px;font-weight:700;font-size:13px;');
