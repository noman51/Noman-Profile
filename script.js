/* =========================
   Icons (SVG)
========================= */
const themeIcon = document.getElementById("themeIcon");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const modalCloseIcon = document.getElementById("modalCloseIcon");

function setThemeIcon(isLight){
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

menuIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>
</svg>`;

closeIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
</svg>`;

modalCloseIcon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
</svg>`;

/* =========================
   Theme Toggle (default dark)
========================= */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

setThemeIcon(false);

themeToggle.addEventListener("click", () => {
  body.classList.toggle("theme-light");
  body.classList.toggle("theme-dark");
  const isLight = body.classList.contains("theme-light");
  setThemeIcon(isLight);
});

/* =========================
   Footer Year
========================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   Name words animation (slower)
========================= */
const fullName = "Md. Abdullah Al Noman";
const nameWordsEl = document.getElementById("nameWords");
fullName.split(" ").forEach((w, i) => {
  const span = document.createElement("span");
  span.className = "word";
  span.style.animationDelay = `${i * 220}ms`; // slower
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

document.querySelectorAll(".drawer-link").forEach(a => {
  a.addEventListener("click", closeDrawer);
});

/* =========================
   Profile Image Auto Slider (slower)
========================= */
const profileImg = document.getElementById("profileSlider");
const profileImages = [
  "photo/pic1.jpg",
  "photo/pic2.jpg",
  "photo/pic3.jpg"
];
let currentProfileIndex = 0;

if (profileImg) {
  setInterval(() => {
    currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
    profileImg.classList.remove("fade");
    void profileImg.offsetWidth;
    profileImg.src = profileImages[currentProfileIndex];
    profileImg.classList.add("fade");
  }, 5200); // slower change
}

/* =========================
   Active nav link + Section hover effect when current section
========================= */
const sections = [...document.querySelectorAll("section[id]")];
const allNavLinks = [...document.querySelectorAll(".nav-link")];
const sectionCards = new Map();

sections.forEach(sec => {
  const card = sec.querySelector(".section-card");
  if (card) sectionCards.set(sec.id, card);
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      allNavLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });

      // remove active glow from all, then add to current
      sectionCards.forEach((card) => card.classList.remove("is-active"));
      const current = sectionCards.get(id);
      if (current) current.classList.add("is-active");
    });
  },
  { root: null, threshold: 0.45 }
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
    openModal(item.dataset.img, item.dataset.title);
  });
});

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* =========================
   Dynamic Network Background (repel from cursor)
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

const N = 85;                    // more dots
const LINK_DIST = 150;           // link distance
const REPULSE_RADIUS = 170;      // cursor repulse area
const REPULSE_FORCE = 1.35;      // repulse strength
const FRICTION = 0.985;          // smooth

const points = [];
function rand(min, max){ return Math.random() * (max - min) + min; }

for (let i = 0; i < N; i++) {
  points.push({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.45, 0.45) * dpr,
    vy: rand(-0.45, 0.45) * dpr,
    r: rand(1.0, 2.2) * dpr
  });
}

const mouse = { x: -9999, y: -9999, active: false };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX * dpr;
  mouse.y = e.clientY * dpr;
  mouse.active = true;
});
window.addEventListener("mouseleave", () => {
  mouse.active = false;
  mouse.x = -9999;
  mouse.y = -9999;
});

function draw() {
  ctx.clearRect(0, 0, W, H);

  const isLight = body.classList.contains("theme-light");
  const dotColor = isLight ? "rgba(20,40,80,0.55)" : "rgba(190,230,255,0.55)";
  const lineBase = isLight ? "rgba(60,120,255," : "rgba(110,231,255,";

  // move + repel
  for (const p of points) {
    // Cursor repel (dots move away)
    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0 && dist < (REPULSE_RADIUS * dpr)) {
        const push = (1 - dist / (REPULSE_RADIUS * dpr)) * REPULSE_FORCE * dpr;
        p.vx += (dx / dist) * push;
        p.vy += (dy / dist) * push;
      }
    }

    p.x += p.vx;
    p.y += p.vy;

    // friction to keep stable
    p.vx *= FRICTION;
    p.vy *= FRICTION;

    // bounce edges
    if (p.x < 0) { p.x = 0; p.vx *= -1; }
    if (p.x > W) { p.x = W; p.vx *= -1; }
    if (p.y < 0) { p.y = 0; p.vy *= -1; }
    if (p.y > H) { p.y = H; p.vy *= -1; }
  }

  // lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = LINK_DIST * dpr;

      if (dist < max) {
        const alpha = (1 - dist / max) * 0.12; // more visible
        ctx.strokeStyle = `${lineBase}${alpha.toFixed(4)})`;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // dots
  ctx.fillStyle = dotColor;
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();
