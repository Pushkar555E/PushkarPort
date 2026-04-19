(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=``){let t=document.createElement(`nav`);t.className=`nav`,t.id=`nav`;let n=[{href:`../index.html`,label:`Home`,key:`home`},{href:`../pages/about.html`,label:`About`,key:`about`},{href:`../pages/skills.html`,label:`Skills`,key:`skills`},{href:`../pages/projects.html`,label:`Projects`,key:`projects`},{href:`../pages/lab.html`,label:`3D Lab`,key:`lab`},{href:`../pages/journey.html`,label:`Journey`,key:`journey`},{href:`../pages/contact.html`,label:`Contact`,key:`contact`,cta:!0}],r=!window.location.pathname.includes(`/pages/`),i=n.map(t=>`<li><a href="${r?t.key===`home`?`./`:`./pages/${t.key}.html`:t.key===`home`?`../index.html`:`./${t.key}.html`}" class="${((e===t.key?` active`:``)+(t.cta?` nav-cta`:``)).trim()}">${t.label}</a></li>`).join(``);t.innerHTML=`
    <div class="nav-inner">
      <a href="${r?`./`:`../index.html`}" class="nav-logo">
        <div class="google-dots"><span></span><span></span><span></span><span></span></div>
        <span class="nav-logo-text">PUSHKAR.</span>
      </a>
      <ul class="nav-links" id="navLinks">${i}</ul>
      <div class="nav-time">
        <div class="nav-time-dot"></div>
        <span id="navTime">00:00:00</span>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <ul>${i}</ul>
    </div>
  `,document.body.prepend(t);let a=document.getElementById(`navTime`),o=()=>{let e=new Date;a&&(a.textContent=[e.getHours(),e.getMinutes(),e.getSeconds()].map(e=>String(e).padStart(2,`0`)).join(`:`))};o(),setInterval(o,1e3);let s=()=>t.classList.toggle(`scrolled`,scrollY>40);window.addEventListener(`scroll`,s,{passive:!0}),s();let c=document.getElementById(`hamburger`),l=document.getElementById(`mobileMenu`);c?.addEventListener(`click`,()=>{c.classList.toggle(`open`),l.classList.toggle(`open`)}),l?.querySelectorAll(`a`).forEach(e=>e.addEventListener(`click`,()=>{c.classList.remove(`open`),l.classList.remove(`open`)}))}function t(){let e=document.createElement(`footer`);e.innerHTML=`
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
  `,document.body.appendChild(e)}function n(){let e=document.createElement(`div`);e.className=`cursor`,e.id=`cursorDot`,e.innerHTML=`<div class="cursor-dot" id="cdot"></div>`;let t=document.createElement(`div`);t.className=`cursor`,t.id=`cursorRing`,t.innerHTML=`<div class="cursor-ring" id="cring"></div>`,document.body.prepend(t),document.body.prepend(e);let n=document.getElementById(`cdot`),r=document.getElementById(`cring`),i=document.getElementById(`cursorDot`),a=document.getElementById(`cursorRing`),o=-200,s=-200,c=-200,l=-200;document.addEventListener(`mousemove`,e=>{o=e.clientX,s=e.clientY,i.style.transform=`translate(${e.clientX}px,${e.clientY}px)`}),(function e(){c+=(o-c)*.12,l+=(s-l)*.12,a.style.transform=`translate(${c}px,${l}px)`,requestAnimationFrame(e)})(),document.querySelectorAll(`a,button,[data-cursor]`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{n.classList.add(`hovered`),r.classList.add(`hovered`)}),e.addEventListener(`mouseleave`,()=>{n.classList.remove(`hovered`),r.classList.remove(`hovered`)})})}function r(){let e=document.createElement(`div`);e.id=`scroll-progress`,document.body.prepend(e),window.addEventListener(`scroll`,()=>{let t=document.documentElement.scrollHeight-innerHeight;e.style.width=scrollY/t*100+`%`},{passive:!0})}function i(){let e=document.querySelectorAll(`.reveal,.reveal-left`);if(!e.length)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`visible`),t.unobserve(e.target))})},{threshold:.08,rootMargin:`0px 0px -50px 0px`});e.forEach(e=>t.observe(e))}function a(){document.querySelectorAll(`.glass-card`).forEach(e=>{e.addEventListener(`mousemove`,t=>{let n=e.getBoundingClientRect(),r=(t.clientX-n.left)/n.width*100,i=(t.clientY-n.top)/n.height*100;e.style.background=`radial-gradient(circle at ${r}% ${i}%, rgba(66,133,244,0.06) 0%, rgba(255,255,255,0.03) 60%), linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))`}),e.addEventListener(`mouseleave`,()=>{e.style.background=``})})}function o(e){let t=document.createElement(`div`);t.id=`preloader`,t.innerHTML=`
    <div class="pre-logo">PUSHKAR.</div>
    <div class="pre-google-bar">
      <span></span><span></span><span></span><span></span>
    </div>
    <div class="pre-loading-dots">
      <span></span><span></span><span></span><span></span>
    </div>
  `,document.body.prepend(t),setTimeout(()=>{t.classList.add(`hidden`),setTimeout(()=>t.remove(),650)},900)}export{e as a,t as i,i as n,o,n as r,r as s,a as t};