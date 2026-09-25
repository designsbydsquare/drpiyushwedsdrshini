// ===== EDIT THESE DETAILS =====
const weddingDate = new Date("2026-12-04T17:00:00+05:30");
// ==============================

// Countdown
function updateCountdown(){
  const diff = weddingDate - new Date();
  const values = diff <= 0 ? [0,0,0,0] : [
    Math.floor(diff / 86400000),
    Math.floor(diff / 3600000) % 24,
    Math.floor(diff / 60000) % 60,
    Math.floor(diff / 1000) % 60
  ];
  ["days","hours","minutes","seconds"].forEach((id,i)=>{
    document.getElementById(id).textContent = String(values[i]).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown,1000);

// Music — browsers generally require a user interaction before audio can play.
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async ()=>{
  if(music.paused){
    try { await music.play(); musicBtn.innerHTML = "Ⅱ <span>Music</span>"; }
    catch(e) { alert("Add assets/music.mp3 and try again."); }
  } else {
    music.pause();
    musicBtn.innerHTML = "♫ <span>Music</span>";
  }
});

// Scratch card
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d", {willReadFrequently:true});
const card = canvas.parentElement;
let drawing = false;
let scratched = 0;
let lastPoint = null;

function resizeCanvas(){
  const rect = card.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);

  // Scratchable silver/gold foil.
  const g = ctx.createLinearGradient(0,0,rect.width,rect.height);
  g.addColorStop(0,"#8f7a58");
  g.addColorStop(.35,"#d7c39b");
  g.addColorStop(.55,"#8d7857");
  g.addColorStop(1,"#cdb889");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,rect.width,rect.height);

  ctx.fillStyle = "rgba(35,25,15,.24)";
  ctx.font = "600 16px Montserrat";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH HERE", rect.width/2, rect.height/2);
  scratched = 0;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function pointFromEvent(e){
  const r = canvas.getBoundingClientRect();
  const source = e.touches ? e.touches[0] : e;
  return {x:source.clientX-r.left,y:source.clientY-r.top};
}
function eraseAt(p){
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = 34;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if(lastPoint){
    ctx.beginPath();
    ctx.moveTo(lastPoint.x,lastPoint.y);
    ctx.lineTo(p.x,p.y);
    ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(p.x,p.y,17,0,Math.PI*2); ctx.fill();
  }
  lastPoint = p;
  scratched++;
  if(scratched % 18 === 0) checkScratch();
}
function start(e){ drawing=true; lastPoint=null; eraseAt(pointFromEvent(e)); e.preventDefault(); }
function move(e){ if(!drawing)return; eraseAt(pointFromEvent(e)); e.preventDefault(); }
function end(){ drawing=false; lastPoint=null; }

canvas.addEventListener("pointerdown",start);
canvas.addEventListener("pointermove",move);
window.addEventListener("pointerup",end);
canvas.addEventListener("touchstart",start,{passive:false});
canvas.addEventListener("touchmove",move,{passive:false});
window.addEventListener("touchend",end);

function checkScratch(){
  const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let transparent = 0, total = data.length/4;
  for(let i=3;i<data.length;i+=4) if(data[i] < 40) transparent++;
  if(transparent/total > .55){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.getElementById("scratchHint").textContent = "✨ Surprise revealed!";
  }
}
