const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const skipIntro = document.getElementById("skipIntro");
const openInvite = document.getElementById("openInvite");

/* Opening video --------------------------------------------------------- */
let introClosed = false;

function startMusic() {
  music.play()
    .then(() => { musicToggle.textContent = "🔊"; })
    .catch(() => { /* Browser may require a user gesture. */ });
}

function closeIntro() {
  if (introClosed) return;
  introClosed = true;

  // Give the ending of the opening video a soft blur before revealing the page.
  intro.classList.add("ending");

  window.setTimeout(() => {
    intro.classList.add("hidden");
    document.body.classList.remove("locked");

    document.querySelector(".hero .reveal")?.classList.add("visible");
    startMusic();
  }, 650);
}

skipIntro.addEventListener("click", closeIntro);
openInvite.addEventListener("click", closeIntro);

video.addEventListener("loadeddata", () => {
  intro.classList.add("has-video");
});

video.addEventListener("canplay", () => {
  intro.classList.add("has-video");
  video.play().catch(() => {
    // If autoplay is blocked, the fallback invitation remains available.
  });
});

video.addEventListener("ended", closeIntro);

video.addEventListener("error", () => {
  intro.classList.add("no-video");
});

// If the MP4 is missing, don't leave the user on a blank opening screen.
window.setTimeout(() => {
  if (video.readyState === 0) intro.classList.add("no-video");
}, 1500);

/* Background music ----------------------------------------------------- */
musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play()
      .then(() => { musicToggle.textContent = "🔊"; })
      .catch(() => {});
  } else {
    music.pause();
    musicToggle.textContent = "♫";
  }
});

/* Wedding countdown ---------------------------------------------------- */
const weddingDate = new Date("2026-06-30T10:30:00+05:30").getTime();
const countdown = document.getElementById("countdown");

function tick() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60,
    Math.floor(remaining / 1000) % 60
  ];

  [...countdown.children].forEach((item, index) => {
    item.querySelector("strong").textContent =
      String(values[index]).padStart(2, "0");
  });
}

tick();
window.setInterval(tick, 1000);

/* Scroll reveals ------------------------------------------------------- */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

/* Scratch card -------------------------------------------------------- */
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let drawing = false;
let lastX = 0;
let lastY = 0;
let strokes = 0;
let scratchedAway = false;

function resizeScratch() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const gradient = ctx.createRadialGradient(
    rect.width * .35, rect.height * .25, 10,
    rect.width * .55, rect.height * .55, rect.width * .7
  );
  gradient.addColorStop(0, "#f4d8df");
  gradient.addColorStop(.45, "#c57a90");
  gradient.addColorStop(1, "#9c536b");

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  for (let i = 0; i < 180; i++) {
    ctx.fillStyle = `rgba(255,255,255,${.18 + Math.random() * .5})`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * rect.width,
      Math.random() * rect.height,
      Math.random() * 2.2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.globalCompositeOperation = "destination-out";
  scratchedAway = false;
  canvas.style.display = "block";
  canvas.style.opacity = "1";
}

resizeScratch();
window.addEventListener("resize", resizeScratch);

function pointFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  const point = event.touches?.[0] || event;
  return {
    x: point.clientX - rect.left,
    y: point.clientY - rect.top
  };
}

function scratch(event) {
  if (!drawing || scratchedAway) return;
  event.preventDefault();

  const point = pointFromEvent(event);
  ctx.lineWidth = 42;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(point.x, point.y);
  ctx.stroke();

  lastX = point.x;
  lastY = point.y;

  strokes++;

  if (strokes > 55) {
    scratchedAway = true;
    canvas.style.transition = "opacity .8s ease";
    canvas.style.opacity = "0";
    window.setTimeout(() => {
      canvas.style.display = "none";
    }, 800);
  }
}

canvas.addEventListener("pointerdown", event => {
  drawing = true;
  const point = pointFromEvent(event);
  lastX = point.x;
  lastY = point.y;
  canvas.setPointerCapture?.(event.pointerId);
});

canvas.addEventListener("pointermove", scratch);
window.addEventListener("pointerup", () => { drawing = false; });

/* RSVP demo ------------------------------------------------------------ */
document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formNote").textContent =
    "Thank you! Connect this form to Formspree/Getform to receive RSVPs.";
});
