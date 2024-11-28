// Sphere.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Sphere extends BaseGeometry {
/*   constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Radius of the sphere
    this.color = color;
    this.positionType = positionType; // 'corner', 'border', or 'inner'
    this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  } */

  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    this.geometry = new THREE.SphereGeometry(this.size, 32, 32);
  }
}
