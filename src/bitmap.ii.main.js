// bitmap.ii.main.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { ShapeFactory } from './src/components/shapeFactory.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ShapeFactory instance
const shapeFactory = new ShapeFactory();

// Function to create cubes from pixel data
function createImageCubesFromData(imageData, width, height) {
  const cubeSize = 1; // Adjust as needed
  const gap = 0.1; // Space between cubes
  const offsetX = -((width * (cubeSize + gap)) / 2);
  const offsetY = -((height * (cubeSize + gap)) / 2);

  const data = imageData.data; // Uint8ClampedArray containing RGBA values

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4; // Multiply by 4 for RGBA
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      // Handle transparency
      const alpha = a / 255;
      if (alpha === 0) {
        continue; // Skip fully transparent pixels
      }

      const color = new THREE.Color(r / 255, g / 255, b / 255);

      const cube = shapeFactory.getShape('Cube', {
        size: cubeSize,
        color: color.getHex(),
      });

      // Set opacity if needed
      if (alpha < 1) {
        cube.mesh.material.transparent = true;
        cube.mesh.material.opacity = alpha;
      }

      cube.setPosition(
        offsetX + x * (cubeSize + gap),
        offsetY + y * (cubeSize + gap),
        0 // All cubes in the same Z-plane
      );

      scene.add(cube.mesh);
    }
  }

  // Adjust camera position to fit the entire image
  camera.position.z = Math.max(width, height) * (cubeSize + gap);
}

// Function to clear the scene
function clearScene() {
  while (scene.children.length > 0) {
    const obj = scene.children[0];
    scene.remove(obj);
  }
}

// Event listener for file input
const fileInput = document.getElementById('imageInput');
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    // Read the image file as a data URL
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataURL = e.target.result;

      // Create an image element
      const img = new Image();
      img.onload = function() {
        // Set desired maximum dimensions to control the size
        const maxDimension = 100; // Adjust as needed

        let drawWidth = img.width;
        let drawHeight = img.height;

        if (img.width > maxDimension || img.height > maxDimension) {
          const aspectRatio = img.width / img.height;

          if (img.width > img.height) {
            drawWidth = maxDimension;
            drawHeight = maxDimension / aspectRatio;
          } else {
            drawHeight = maxDimension;
            drawWidth = maxDimension * aspectRatio;
          }
        }

        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = drawWidth;
        canvas.height = drawHeight;

        // Draw the image onto the canvas with scaling
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, drawWidth, drawHeight);

        // Clear the previous scene
        clearScene();

        // Create cubes from the image data
        createImageCubesFromData(imageData, drawWidth, drawHeight);
      };

      // Set the image source to the data URL
      img.src = dataURL;
    };

    reader.readAsDataURL(file);
  }
});

// Basic animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
