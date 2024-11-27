// Icosahedron.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Icosahedron extends BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Radius of the icosahedron
    this.color = color;
    this.positionType = positionType;
    this.geometry = new THREE.IcosahedronGeometry(this.size);
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
