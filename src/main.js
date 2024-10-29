import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Créer la scène, la caméra, et le rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter des contrôles d'orbite pour zoom et rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Effet de damping pour une rotation plus douce
controls.dampingFactor = 0.25;
controls.minDistance = 2; // Distance minimale de zoom
controls.maxDistance = 20; // Distance maximale de zoom

// Ajouter une lumière
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Ajouter une grille
const gridHelper = new THREE.GridHelper(10, 10);
gridHelper.position.y = 0; // Place la grille au niveau du sol
scene.add(gridHelper);

// Charger le fichier OBJ
const loader = new OBJLoader();
loader.load(
    './models/islamicBall.obj', // Remplacez par le chemin vers votre fichier
    (object) => {
        object.scale.set(5, 5, 5); // Ajustez l'échelle pour qu'il prenne environ 50% de la largeur de la grille
        object.position.set(0, 0, 0); // Positionne le modèle directement sur la grille
        object.rotation.x = Math.PI / 2; // Ajuste l'orientation si nécessaire
        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    (error) => {
        console.error('Erreur lors du chargement du modèle', error);
    }
);

// Position initiale de la caméra
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Animation de rendu
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Mise à jour des contrôles d'orbite
    renderer.render(scene, camera);
}
animate();
