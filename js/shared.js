/* =====================================================================
   SHARED NAV + FOOTER INJECTOR
   Import this in every page's JS to get the nav and footer
   ===================================================================== */

export function injectNav(activePage = '') {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.id = 'nav';

  const pages = [
    { href: '../index.html',         label: 'Home',     key: 'home' },
    { href: '../pages/about.html',   label: 'About',    key: 'about' },
    { href: '../pages/skills.html',  label: 'Skills',   key: 'skills' },
    { href: '../pages/projects.html',label: 'Projects', key: 'projects' },
    { href: '../pages/lab.html',     label: '3D Lab',   key: 'lab' },
    { href: '../pages/journey.html', label: 'Journey',  key: 'journey' },
    { href: '../pages/contact.html', label: 'Contact',  key: 'contact', cta: true },
  ];

  const isRoot = !window.location.pathname.includes('/pages/');
  const rootPrefix = isRoot ? './' : '../';

  const linksHTML = pages.map(p => {
    const href = isRoot
      ? (p.key === 'home' ? './' : `./pages/${p.key}.html`)
      : (p.key === 'home' ? '../index.html' : `./${p.key}.html`);
    const activeClass = activePage === p.key ? ' active' : '';
    const ctaClass = p.cta ? ' nav-cta' : '';
    return `<li><a href="${href}" class="${(activeClass + ctaClass).trim()}">${p.label}</a></li>`;
  }).join('');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="${isRoot ? './' : '../index.html'}" class="nav-logo">
        <div class="google-dots"><span></span><span></span><span></span><span></span></div>
        <span class="nav-logo-text">PUSHKAR.</span>
      </a>
      <ul class="nav-links" id="navLinks">${linksHTML}</ul>
      <div class="nav-time">
        <div class="nav-time-dot"></div>
        <span id="navTime">00:00:00</span>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <ul>${linksHTML}</ul>
    </div>
  `;

  document.body.prepend(nav);

  // Clock
  const clockEl = document.getElementById('navTime');
  const updateClock = () => {
    const n = new Date();
    if (clockEl) clockEl.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()].map(x => String(x).padStart(2, '0')).join(':');
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Scrolled state
  const updateScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham?.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
  mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));
}

export function injectFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-logo">PUSHKAR.</div>
      <div class="google-dots" style="margin:.25rem 0">
        <span style="width:10px;height:10px"></span>
        <span style="width:10px;height:10px"></span>
        <span style="width:10px;height:10px"></span>
        <span style="width:10px;height:10px"></span>
      </div>
      <p class="footer-tagline">Built with ❤️ &amp; a love for <strong style="color:#4285F4">G</strong><strong style="color:#EA4335">o</strong><strong style="color:#FBBC05">o</strong><strong style="color:#4285F4">g</strong><strong style="color:#34A853">l</strong><strong style="color:#EA4335">e</strong></p>
      <p class="footer-meta">© 2025 · Pushkar Biswas · Aspiring Google SWE</p>
      <div class="footer-links">
        <a href="https://github.com/Pushkar005-b" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/pushkarbiswas" target="_blank">LinkedIn</a>
        <a href="https://www.facebook.com/pushkarbiswas79/" target="_blank">Facebook</a>
        <a href="mailto:pushkar@example.com">Email</a>
      </div>
      <div class="footer-google-bar">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

export function injectOrbBackground() {
  const orbs = document.createElement('div');
  orbs.className = 'page-orbs';
  orbs.innerHTML = `
    <div class="orb orb-blue"></div>
    <div class="orb orb-red"></div>
    <div class="orb orb-yellow"></div>
    <div class="orb orb-green"></div>
  `;
  document.body.insertBefore(orbs, document.body.firstChild);
}

export function injectCursor() {
  const dot = document.createElement('div');
  dot.className = 'cursor'; dot.id = 'cursorDot';
  dot.innerHTML = '<div class="cursor-dot" id="cdot"></div>';
  const ring = document.createElement('div');
  ring.className = 'cursor'; ring.id = 'cursorRing';
  ring.innerHTML = '<div class="cursor-ring" id="cring"></div>';
  document.body.prepend(ring);
  document.body.prepend(dot);

  const dotEl = document.getElementById('cdot');
  const ringEl = document.getElementById('cring');
  const dotWrap = document.getElementById('cursorDot');
  const ringWrap = document.getElementById('cursorRing');

  let mx = -200, my = -200, rx = -200, ry = -200;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dotWrap.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
  (function loop() { rx += (mx-rx)*.12; ry += (my-ry)*.12; ringWrap.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();

  document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => { dotEl.classList.add('hovered'); ringEl.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dotEl.classList.remove('hovered'); ringEl.classList.remove('hovered'); });
  });
}

export function injectScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / max * 100) + '%';
  }, { passive: true });
}

export function initReveal() {
  const els = document.querySelectorAll('.reveal,.reveal-left');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}

export function initGlassCardGlow() {
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX-r.left)/r.width)*100;
      const y = ((e.clientY-r.top)/r.height)*100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(66,133,244,0.06) 0%, rgba(255,255,255,0.03) 60%), linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });
}

export function injectPreloader(steps) {
  const loader = document.createElement('div');
  loader.id = 'preloader';
  loader.innerHTML = `
    <div class="pre-logo">PUSHKAR.</div>
    <div class="pre-google-bar">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="pre-loading-dots">
      <span></span><span></span><span></span><span></span>
    </div>
  `;
  document.body.prepend(loader);

  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 650);
  }, 900);
}
