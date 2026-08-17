//    ============================================================
//      SCRIPTS (all internal — organized by module)
//      ============================================================ 
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- MODULE: nav toggle + active link on scroll ---------- */
(function navModule() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
    }));

    const sections = document.querySelectorAll('section[id]');
    const navAs = links.querySelectorAll('a');
    const onScroll = () => {
        let current = sections[0]?.id;
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
        navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ---------- MODULE: reveal-on-scroll ---------- */
(function revealModule() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
})();

/* ---------- MODULE: skill meter fill on scroll ---------- */
(function meterModule() {
    const bars = document.querySelectorAll('.meter-fill');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.dataset.w + '%';
                io.unobserve(e.target);
            }
        });
    }, { threshold: .4 });
    bars.forEach(b => io.observe(b));
})();

/* ---------- MODULE: hero role typing effect ---------- */
(function typeModule() {
    const el = document.getElementById('hero-typed');
    const words = ['Ethical Hacker', 'Bug Hunter', 'Cybersecurity Learner', 'Web Developer', 'CTF Player'];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        if (!deleting) {
            ci++;
            el.textContent = word.slice(0, ci);
            if (ci === word.length) { deleting = true; setTimeout(tick, 1300); return; }
        } else {
            ci--;
            el.textContent = word.slice(0, ci);
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, deleting ? 45 : 85);
    }
    tick();
})();

/* ---------- MODULE: hero boot sequence ---------- */
(function bootModule() {
    const body = document.getElementById('boot-body');
    const lines = [
        { t: 'booting security-portfolio-os v2.6 ...', c: 'ok' },
        { t: 'loading user profile ' },
        { t: '  → name: Shiva Kant', c: 'path' },
        { t: '  → role: Ethical Hacker / Web Developer', c: 'path' },
        { t: '  → base: Lucknow, India', c: 'path' },
        { t: 'mounting /skills, /projects, /certificates ...', c: 'ok' },
        { t: 'checking known exploits ... none found on this dev', c: 'ok' },
        { t: 'starting services: bug-hunting.service [ACTIVE]', c: 'ok' },
        { t: 'starting services: web-dev.service [ACTIVE]', c: 'ok' },
        { t: 'all systems nominal.', c: 'ok' },
    ];
    let i = 0;
    function addLine() {
        if (i >= lines.length) { addPrompt(); return; }
        const div = document.createElement('p');
        div.className = 'boot-line' + (lines[i].c ? ' ' : '');
        div.innerHTML = (lines[i].c ? `<span class="${lines[i].c}">${lines[i].t}</span>` : lines[i].t);
        body.appendChild(div);
        i++;
        setTimeout(addLine, 230);
    }
    function addPrompt() {
        const p = document.createElement('p');
        p.className = 'boot-line';
        p.innerHTML = '<span class="prompt">shivakant@security:~$</span> <span id="boot-typed"></span><span class="blink">▌</span>';
        body.appendChild(p);
        const cmd = 'whoami --skills --hire-me';
        const target = p.querySelector('#boot-typed');
        let ci = 0;
        (function typeCmd() {
            target.textContent = cmd.slice(0, ci);
            ci++;
            if (ci <= cmd.length) setTimeout(typeCmd, 55);
        })();
    }
    addLine();
})();

/* ---------- MODULE: matrix rain canvas (hero signature) ---------- */
(function matrixModule() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, cols, drops;
    const chars = 'アイウエオカキクケコサシスセソ01アイウエオ$#@%&SHIVAKANT'.split('');

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        cols = Math.floor(w / 16);
        drops = Array(cols).fill(1);
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.fillStyle = 'rgba(6,10,9,0.08)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#39ff88';
        ctx.font = '14px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 16, drops[i] * 16);
            if (drops[i] * 16 > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) setInterval(draw, 55);
})();

/* ---------- MODULE: certifications data + list + modal + lightbox ---------- */
(function certModule() {
    const certData = [
        { name: 'CORE — Certified Cybersecurity Foundations', issuer: 'Hackviser', date: 'Aug 2026', file: 'assets/certificates/cert-core-hackviser.png', type: 'img' },
        { name: 'Industrial Training — Web Dev in Python (45 Days)', issuer: 'Barrownz Learning Academy', date: 'Jul–Aug 2025', file: 'assets/certificates/cert-industrial-python.png', type: 'img' },
        { name: 'Industrial Training — Core Java / Web Design', issuer: 'IgniteSoftLabs, Lucknow', date: 'Jul–Aug 2024', file: 'assets/certificates/cert-industrial-java.png', type: 'img' },
        { name: 'Cyber Forensics', issuer: 'Great Learning Academy', date: 'Aug 2023', file: 'assets/certificates/cert-cyber-forensics.jpg', type: 'img' },
        { name: 'Cyber Security Threats', issuer: 'Great Learning Academy', date: 'Jun 2023', file: 'assets/certificates/cert-cyber-threats.jpg', type: 'img' },
        { name: 'Introduction to Firewall', issuer: 'Great Learning Academy', date: 'Aug 2023', file: 'assets/certificates/cert-firewall.jpg', type: 'img' },
        { name: 'Linux in Hindi', issuer: 'Great Learning Academy', date: 'Jun 2023', file: 'assets/certificates/cert-linux-hindi.jpg', type: 'img' },
        { name: 'Introduction to Cyber Security in Hindi', issuer: 'Great Learning Academy', date: 'Jun 2023', file: 'assets/certificates/cert-cybersecurity-hindi.jpg', type: 'img' },
        { name: 'Introduction to Ethical Hacking in Hindi', issuer: 'Great Learning Academy', date: 'Feb 2023', file: 'assets/certificates/cert-ethical-hacking-hindi.jpg', type: 'img' },
        { name: 'Introduction to Cyber Security', issuer: 'Great Learning Academy', date: 'Feb 2023', file: 'assets/certificates/cert-cybersecurity.jpg', type: 'img' },
    ];

    const list = document.getElementById('certList');
    const grid = document.getElementById('certGrid');

    certData.slice(0, 6).forEach((c, idx) => {
        const row = document.createElement('div');
        row.className = 'cert-row';
        row.innerHTML = `
      <span class="idx">${String(idx + 1).padStart(2, '0')}</span>
      <span><span class="fname">${c.name}.cert</span><span class="issuer">${c.issuer}</span></span>
      <span class="date">${c.date}</span>
      <span class="view">VIEW <i class="fa-solid fa-arrow-right"></i></span>
    `;
        row.addEventListener('click', () => openLightbox(c));
        list.appendChild(row);
    });

    certData.forEach((c) => {
        const item = document.createElement('a');
        item.className = 'gcert';
        item.href = 'javascript:void(0)';
        if (c.type === 'img') {
            item.innerHTML = `<div class="thumb"><img src="${c.file}" alt="${c.name}" loading="lazy"></div>
        <div class="meta"><span class="t">${c.name}</span><span class="d">${c.issuer} · ${c.date}</span></div>`;
            item.addEventListener('click', () => openLightbox(c));
        } else {
            item.innerHTML = `<div class="thumb pdf"><i class="fa-solid fa-file-pdf"></i><span style="font-size:11px;">PDF Document</span></div>
        <div class="meta"><span class="t">${c.name}</span><span class="d">${c.issuer} · ${c.date}</span></div>`;
            item.href = c.file; item.target = '_blank'; item.rel = 'noopener';
        }
        grid.appendChild(item);
    });

    const certModal = document.getElementById('certModal');
    document.getElementById('openCertModal').addEventListener('click', () => certModal.classList.add('open'));
    document.getElementById('closeCertModal').addEventListener('click', () => certModal.classList.remove('open'));
    certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('open'); });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    function openLightbox(c) {
        if (c.type !== 'img') { window.open(c.file, '_blank'); return; }
        lightboxImg.src = c.file;
        lightboxImg.alt = c.name;
        lightbox.classList.add('open');
    }
    document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { lightbox.classList.remove('open'); certModal.classList.remove('open'); }
    });
})();

/* ---------- MODULE: contact form (mailto handoff, no backend) ---------- */
(function contactModule() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('cname').value;
        const email = document.getElementById('cemail').value;
        const msg = document.getElementById('cmsg').value;
        const subject = encodeURIComponent('Portfolio contact from ' + name);
        const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
        window.location.href = `mailto:shivashiva80041@gmail.com?subject=${subject}&body=${body}`;
    });
})();


// Forms Restart
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) return;

    // Form submit hone ke baad clear
    form.addEventListener("submit", function () {
        setTimeout(function () {
            form.reset();
        }, 100);
    });
});

// Back button se form page par aane par bhi clear
window.addEventListener("pageshow", function () {
    const form = document.querySelector("form");

    if (form) {
        form.reset();
    }
});