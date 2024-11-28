// Cylinder.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Cylinder extends BaseGeometry {
/*   constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Height of the cylinder
    this.color = color;
    this.positionType = positionType;
    const radiusTop = size / 2;
    const radiusBottom = size / 2;
    const height = size;
    this.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  } */

  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    const radiusTop = this.size / 2;
    const radiusBottom = this.size / 2;
    const height = this.size;
    this.geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
  }
}
