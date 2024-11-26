// cube.js
import * as THREE from 'three';
import cornerImage from './assets/cube/00002894.jpg';
import edgeImage from './assets/cube/00002980.jpg';
import innerImage from './assets/cube/00002955.jpg';

const textureLoader = new THREE.TextureLoader();

const cornerTexture = textureLoader.load(cornerImage);
const edgeTexture = textureLoader.load(edgeImage);
const innerTexture = textureLoader.load(innerImage);

export class Cube {
  constructor(size, color, positionType = 'inner') {
    this.size = size;
    this.color = color;
    this.positionType = positionType; // 'corner', 'edge', or 'inner'
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setColor(color) {
    this.color = color;
    this.material.color.set(color);
    const texture = this.positionType == 'corner' ? cornerTexture : this.positionType == 'edge' ? edgeTexture : innerTexture;
    if ((this.positionType == 'corner' || this.positionType == 'edge' && this.first) || this.positionType == 'inner') {
      const opacity = this.positionType == 'corner' ? 0.75 : this.positionType == 'edge' ? 0.25 : 0.55;
      // Update the material of the existing mesh
      this.mesh.material = new THREE.MeshBasicMaterial({
        color: color,    // Change the color
        transparent: true,  // Enable transparency
        opacity: opacity,       // Set opacity to 0.5
        map: texture,
      });

      // If you just want to adjust properties of the current material:
      this.mesh.material.color.set(color); // Update color to blue
      this.mesh.material.transparent = true; // Enable transparency
      this.mesh.material.opacity = opacity;       // Adjust opacity
      // Trigger an update
      this.mesh.material.needsUpdate = true;
      this.__firstColorSet = false;
    } else {
      const opacity = this.positionType == 'corner' ? 0.35 : this.positionType == 'edge' ? 0.25 : 0.15;
      // Update the material of the existing mesh
      this.mesh.material = new THREE.MeshBasicMaterial({
        transparent: true,  // Enable transparency
        opacity: opacity,       // Set opacity to 0.5
        map: texture,
      });

      // If you just want to adjust properties of the current material:
      this.mesh.material.transparent = true; // Enable transparency
      this.mesh.material.opacity = opacity;       // Adjust opacity
      // Trigger an update
      this.mesh.material.needsUpdate = true;
      this.__firstColorSet = false;

    }
  }
}
