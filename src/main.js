/*
document.querySelector('#app').innerHTML = `
  <div>

  </div>
`;
*/
// src/main.js
//import { App } from './app.js';
import './components/styles/main.css';
// main.js
import * as THREE from 'three';
import { ShapeFactory } from './components/shapeFactory.js';
import { uploadImage } from './components/imageUploader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ShapeFactory instance
const shapeFactory = new ShapeFactory();

// Function to create cubes from pixel data
async function createImageCubes(file, scale = 0.5) {
  try {
    const { pixelColors, width, height } = await uploadImage(file, scale);

    const cubeSize = 1; // Adjust as needed
    const gap = 0.1; // Space between cubes
    const offsetX = -((width * (cubeSize + gap)) / 2);
    const offsetY = -((height * (cubeSize + gap)) / 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        const { r, g, b, a } = pixelColors[index];
        const color = new THREE.Color(r / 255, g / 255, b / 255);

        const cube = shapeFactory.getShape('Cube', {
          size: cubeSize,
          color: color.getHex(),
        });

        cube.setPosition(
          offsetX + x * (cubeSize + gap),
          offsetY + y * (cubeSize + gap),
          0 // All cubes in the same Z-plane
        );

        scene.add(cube.mesh);
      }
    }
  } catch (error) {
    console.error('Error creating cubes:', error);
  }
}

// Event listener for file input
const fileInput = document.getElementById('imageInput');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    createImageCubes(file, 0.5); // Adjust scale as needed
  }
});

// Basic animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
