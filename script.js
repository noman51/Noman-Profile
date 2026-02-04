/* =========================
   Theme Toggle (default dark)
========================= */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setIcon() {
  const isLight = body.classList.contains("theme-light");
  themeIcon.innerHTML = isLight
    ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M12 3v2"/><path d="M12 19v2"/>
         <path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/>
         <path d="M3 12h2"/><path d="M19 12h2"/>
         <path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/>
         <circle cx="12" cy="12" r="4"/>
       </svg>`
    : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
       </svg>`;
}
setIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("theme-light");
  body.classList.toggle("theme-dark");
  setIcon();
});

/* Footer Year */
document.getElementById("year").textContent = new Date().getFullYear();

/* Name words animation */
const fullName = "Md. Abdullah Al Noman";
const nameWordsEl = document.getElementById("nameWords");
fullName.split(" ").forEach((w, i) => {
  const span = document.createElement("span");
  span.className = "word";
  span.style.animationDelay = `${i * 120}ms`;
  span.textContent = w;
  nameWordsEl.appendChild(span);
});

/* =========================
   Mobile Drawer
========================= */
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const drawerClose = document.getElementById("drawerClose");

const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");

menuIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>
</svg>`;
closeIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
</svg>`;

function openDrawer(){
  drawer.classList.add("open");
  drawerBackdrop.classList.add("open");
}
function closeDrawer(){
  drawer.classList.remove("open");
  drawerBackdrop.classList.remove("open");
}

menuBtn.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);

// drawer link click => close
document.querySelectorAll(".drawer-link").forEach(a => {
  a.addEventListener("click", () => closeDrawer());
});

/* =========================
   Active nav link on scroll (desktop + drawer)
========================= */
const sections = [...document.querySelectorAll("section[id]")];
const allNavLinks = [...document.querySelectorAll(".nav-link")];

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      allNavLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    });
  },
  { root: null, threshold: 0.35 }
);
sections.forEach((sec) => obs.observe(sec));

/* =========================
   Certificate Modal (click => big, empty space click => close)
========================= */
const modal = document.getElementById("imgModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalCloseIcon = document.getElementById("modalCloseIcon");

modalCloseIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
</svg>`;

function openModal(src, title){
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalImg.src = src;
  modalTitle.textContent = title || "Certificate";
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
}

document.querySelectorAll(".cert-item").forEach(item => {
  item.addEventListener("click", () => {
    const src = item.dataset.img;
    const title = item.dataset.title;
    openModal(src, title);
  });
});

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if(e.key === "Escape") closeModal();
});

/* =========================
   Network connected background (dynamic)
========================= */
const canvas = document.getElementById("net");
const ctx = canvas.getContext("2d");

let W, H, dpr;
function resize() {
  dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
  W = canvas.width = Math.floor(window.innerWidth * dpr);
  H = canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resize);
resize();

const N = 70;
const points = [];
function rand(min, max) { return Math.random() * (max - min) + min; }

for (let i = 0; i < N; i++) {
  points.push({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.35, 0.35) * dpr,
    vy: rand(-0.35, 0.35) * dpr,
    r: rand(1.0, 2.2) * dpr
  });
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  const isLight = body.classList.contains("theme-light");
  const dotColor = isLight ? "rgba(20,40,80,0.55)" : "rgba(190,230,255,0.55)";
  const lineBase = isLight ? "rgba(60,120,255," : "rgba(110,231,255,";

  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 140 * dpr;

      if (dist < max) {
        const alpha = (1 - dist / max) * 0.09;
        ctx.strokeStyle = `${lineBase}${alpha.toFixed(4)})`;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  ctx.fillStyle = dotColor;
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();
