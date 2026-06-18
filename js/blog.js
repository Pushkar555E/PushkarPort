/* blog.js */
import { injectNav, injectFooter, injectCursor, injectScrollProgress, initReveal, initGlassCardGlow, injectPreloader } from './shared.js';

injectPreloader();
injectCursor();
injectScrollProgress();
injectNav('blog');
injectFooter();
initReveal();
initGlassCardGlow();

// --- Tech Blog Posts Dataset ---
const TECH_BLOGS_DATA = [
  {
    id: 1,
    category: "System Design",
    date: "June 2026",
    title: "The Philosophy of Scale: Why I Build for Everyone",
    excerpt: "Exploring the fundamental engineering principles behind Google's build standards — accessibility, latency bounds, and system modularity.",
    content: `
      <div class="blog-article-meta">System Design · June 2026</div>
      <h3 class="blog-article-title">The Philosophy of Scale: Why I Build for Everyone</h3>
      <div class="blog-article-content">
        <p>In software engineering, 'scale' is often discussed purely in terms of database shards, server clustering, and request-per-second thresholds. However, true scale begins with a philosophy: designing systems that are accessible, simple, and functional for everyone, regardless of their location, device limitations, or connectivity.</p>
        
        <h4>1. Accessibility as a System Constraint</h4>
        <p>Building for everyone means treating accessibility and compatibility not as post-release polish, but as hard architectural constraints. If a system requires a top-tier processor or a gigabit connection to function smoothly, it has failed to scale humanly. We must minimize asset payloads, implement lazy loading, and optimize critical rendering paths.</p>

        <h4>2. Latency and Cognitive Load</h4>
        <p>A responsive UI is directly linked to user trust. Google's research shows that even a 100ms delay in interaction response times increases cognitive fatigue. Use CSS transforms for animations to keep rendering on the GPU, keep main JS execution times under 50ms, and leverage static compilation wherever possible.</p>

        <blockquote>
          "Scale is not just about handle capacity. It is about human reach — building code that acts as a lever for the maximum number of people."
        </blockquote>

        <h4>3. The Modular Component Approach</h4>
        <p>To write software that scales across teams and years, modularity is essential. Encapsulate styles and controllers, define clean entry/exit interfaces, and avoid absolute hardcoded dependencies. This allows your codebase to evolve gracefully over time.</p>
      </div>
    `
  },
  {
    id: 2,
    category: "Google Cloud",
    date: "June 2026",
    title: "Acing the Google Arcade: Cloud Challenges and Milestones",
    excerpt: "A retrospect on solving Google Cloud Arcade challenges — configuring VPC subnets, deploying compute clusters, and cloud compute engines.",
    content: `
      <div class="blog-article-meta">Google Cloud · June 2026</div>
      <h3 class="blog-article-title">Acing the Google Arcade: Cloud Challenges and Milestones</h3>
      <div class="blog-article-content">
        <p>Earning the Google Arcade Champion badge was one of my most formative experiences. It represents hands-on, sandbox problem-solving across the Google Cloud Platform (GCP) ecosystem. Here are the core technical milestones and configurations that shaped my cloud learning path.</p>

        <h4>1. Virtual Private Clouds (VPC) & Subnetworks</h4>
        <p>One of the earliest challenges was creating customized network topologies. Routing traffic safely requires defining firewall rules, allocating IP subnets, and configuring secure bastion hosts. Isolating database backends in private subnets while routing public traffic via load balancers is key to secure cloud operations.</p>

        <h4>2. Scaling Compute Engines & GKE</h4>
        <p>Configuring managed instance groups (MIGs) taught me the mechanics of autoscaling based on CPU utilization metrics. Deploying containerized microservices to Google Kubernetes Engine (GKE) demonstrated how orchestration automatons handle failovers, rollouts, and load balancing automatically at scale.</p>

        <blockquote>
          "Cloud engineering isn't about renting server hardware. It is about utilizing infrastructure-as-code to build self-healing software environments."
        </blockquote>

        <h4>3. AI Integration via APIs</h4>
        <p>Using Google Cloud APIs to access foundation vision models, natural language classifiers, and text translations opened my eyes to the potential of prompt-driven server architectures. Building serverless pipelines with Cloud Functions and Pub/Sub queues allows for decoupled, event-driven AI processing.</p>
      </div>
    `
  },
  {
    id: 3,
    category: "WebGL & Three.js",
    date: "June 2026",
    title: "My Three.js Journey: Generating Interactive 3D Particles",
    excerpt: "Behind the scenes of building the Quantum Mirror — utilizing custom vertex shaders, particle systems, and rendering 10,000 nodes at 60fps.",
    content: `
      <div class="blog-article-meta">WebGL & Three.js · June 2026</div>
      <h3 class="blog-article-title">My Three.js Journey: Generating Interactive 3D Particles</h3>
      <div class="blog-article-content">
        <p>Three.js allows developers to escape the flat plane of 2D layouts and construct interactive 3D universes directly inside the web page canvas. Building my 'Quantum Mirror' particle simulator pushed my understanding of WebGL limits and mathematical animation loops.</p>

        <h4>1. Particle Buffers & Memory Footprint</h4>
        <p>In standard DOM nodes, rendering 10,000 elements causes severe layout thrashing. In WebGL, we create a single \`THREE.Points\` geometry and supply coordinates via flat float arrays (\`BufferAttribute\`). This keeps memory allocation light and passes particle updates directly to GPU threads.</p>

        <h4>2. Math-Driven Particle Kinematics</h4>
        <p>Moving particles programmatically requires trigonometric wave forms and noise algorithms. Inside the animation loop, we update each particle's position using coordinate offsets derived from cosine, sine, and mouse-interaction vectors, producing a responsive vortex flow.</p>

        <blockquote>
          "WebGL is the frontier of web interactions. By transferring calculation loads from CPU JavaScript to GPU shaders, we create premium, fluid interactive flows."
        </blockquote>

        <h4>3. Shader Orchestration</h4>
        <p>To achieve maximum rendering efficiency, writing custom GLSL vertex and fragment shaders is necessary. Shaders execute parallel calculations on GPU cores for every single pixel, enabling real-time glowing gradients and custom particle shapes without dipping below 60fps.</p>
      </div>
    `
  }
];

// --- Render Blog Grid & Setup Modal ---
document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('portfolio-blog-grid');
  const blogModal = document.getElementById('portfolio-blog-modal');
  const blogModalContent = document.getElementById('portfolio-blog-reader-content');
  const blogModalCloseBtn = document.getElementById('portfolio-blog-modal-close-btn');
  const blogModalCloseBg = document.getElementById('portfolio-blog-modal-close-bg');

  if (blogGrid && blogModal && blogModalContent) {
    TECH_BLOGS_DATA.forEach(post => {
      const card = document.createElement('div');
      card.className = 'glass-card reveal';
      card.style.padding = '2rem';
      card.style.cursor = 'pointer';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';
      card.style.minHeight = '260px';

      card.innerHTML = `
        <div>
          <div class="blog-card-meta" style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--g-blue); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;">
            ${post.category} · ${post.date}
          </div>
          <h3 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text);">
            ${post.title}
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
            ${post.excerpt}
          </p>
        </div>
        <span class="blog-read-more" style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--g-blue); font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem; transition: color 0.2s;">
          Read Article →
        </span>
      `;

      card.addEventListener('click', () => {
        // Render detailed content
        blogModalContent.innerHTML = post.content;
        
        // Re-inject close button
        blogModalContent.appendChild(blogModalCloseBtn);

        // Open modal
        blogModal.classList.add('active');
        blogModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scroll
      });

      // MouseMove interactive background glow (using same callback as glass-cards)
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(66,133,244,0.06) 0%, rgba(255,255,255,0.03) 60%), linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });

      blogGrid.appendChild(card);
    });

    // Modal close handlers
    const closeBlogModal = () => {
      blogModal.classList.remove('active');
      blogModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scroll
    };

    if (blogModalCloseBtn) blogModalCloseBtn.addEventListener('click', closeBlogModal);
    if (blogModalCloseBg) blogModalCloseBg.addEventListener('click', closeBlogModal);

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeBlogModal();
      }
    });
  }

  // Re-run reveals for cards
  if (typeof initReveal === 'function') {
    initReveal();
  }
});
