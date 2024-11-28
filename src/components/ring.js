// Ring.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Ring extends BaseGeometry {
/*   constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Outer radius of the ring
    this.color = color;
    this.positionType = positionType;
    const innerRadius = size / 2;
    const outerRadius = size;
    this.geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  } */

  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    const innerRadius = this.size / 2;
    const outerRadius = this.size;
    this.geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
  }
}
