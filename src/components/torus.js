// Torus.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Torus extends BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Major radius of the torus
    this.color = color;
    this.positionType = positionType;
    const tubeRadius = size / 4; // Minor radius
    this.geometry = new THREE.TorusGeometry(this.size, tubeRadius, 16, 100);
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
    this.mesh.material.needsUpdate = true;
  }
}
