import * as THREE from 'three';
import { getRandomColor } from '../utils/colors.js';

export class Cube {
  constructor(size, color = null, isEdge = false) {
    this.isEdge = isEdge;
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

/*
import * as THREE from 'three';

export class Cube {
  constructor(size, color) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }
}
*/