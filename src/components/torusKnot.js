// TorusKnot.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class TorusKnot extends BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Radius of the torus knot
    this.color = color;
    this.positionType = positionType;
    const tubeRadius = size / 4;
    this.geometry = new THREE.TorusKnotGeometry(this.size, tubeRadius, 100, 16);
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
