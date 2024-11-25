import * as THREE from 'three';
import { getRandomColor } from '../utils/colors.js';
import { Pyramid } from './pyramid.js';

export class Diamond {
  constructor(size, color = null) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({
      color: color || getRandomColor(), // Use the provided color or a random one
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setColor(newColor) {
    this.mesh.material.color.set(newColor);
  }
}
