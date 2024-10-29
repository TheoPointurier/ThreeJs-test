import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Créer la scène, la caméra et le rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter une lumière pour mieux voir l'objet
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Charger le fichier .obj
const loader = new OBJLoader();
loader.load(
  'path/to/your-model.obj', // Remplace ce chemin par celui de ton fichier .obj
  (object) => {
    scene.add(object);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% chargé');
  },
  (error) => {
    console.error('Erreur lors du chargement', error);
  }
);

camera.position.z = 5;

// Fonction de rendu
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
