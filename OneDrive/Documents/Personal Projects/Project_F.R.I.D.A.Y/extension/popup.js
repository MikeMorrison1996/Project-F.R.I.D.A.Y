// Three.js setup
const canvas = document.getElementById('orbCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x0088ff, emissiveIntensity: 0.5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
const point = new THREE.PointLight(0xffffff, 1);
point.position.set(5, 5, 5);
scene.add(point);

camera.position.z = 3;

let pulse = 0;
let listening = false;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  if (listening) {
    pulse += 0.1;
    const scale = 1 + Math.sin(pulse) * 0.1;
    sphere.scale.set(scale, scale, scale);
  }
  renderer.render(scene, camera);
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
  recognition.onstart = () => { btn.textContent = 'Stop Listening'; listening = true; };
  recognition.onend = () => { btn.textContent = 'Start Listening'; listening = false; sphere.scale.set(1,1,1); };
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
