// cube.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Cube extends BaseGeometry {
/*   constructor(size, color, positionType = 'inner') {
    super();
    this.size = size;
    this.color = color;
    this.positionType = positionType; // 'corner', 'border', or 'inner'
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  } */

  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
  }
  
}
