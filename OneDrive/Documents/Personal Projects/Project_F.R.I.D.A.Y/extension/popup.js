// Simple orb visualization with pulsing effect
const canvas = document.getElementById('orbCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let pulse = 0;
let listening = false;
const baseRadius = 80;

function drawOrb() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const scale = listening ? 1 + Math.sin(pulse) * 0.1 : 1;
  const r = baseRadius * scale;
  const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
  g.addColorStop(0, '#00ffff');
  g.addColorStop(1, '#001122');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  requestAnimationFrame(animate);
  if (listening) {
    pulse += 0.1;
  } else {
    pulse = 0;
  }
  drawOrb();
}
animate();

// Speech recognition
const btn = document.getElementById('control');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.onresult = (event) => {
    const res = event.results[event.results.length - 1][0].transcript.trim();
    console.log('Heard:', res);
  };
  recognition.onstart = () => {
    btn.textContent = 'Stop Listening';
    listening = true;
  };
  recognition.onend = () => {
    btn.textContent = 'Start Listening';
    listening = false;
  };
  btn.addEventListener('click', () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });
} else {
  btn.disabled = true;
  btn.textContent = 'Speech API unsupported';
}
