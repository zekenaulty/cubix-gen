// Cone.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Cone extends BaseGeometry {
/*   constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Height of the cone
    this.color = color;
    this.positionType = positionType;
    const radius = size / 2;
    const height = size;
    this.geometry = new THREE.ConeGeometry(radius, height, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  } */
  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    const radius = size / 2;
    const height = size;
    this.geometry = new THREE.ConeGeometry(radius, height, 32);
  }

/*   createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this._color,
      transparent: this._opacity < 1,
      opacity: this._opacity,
      map: this._texture,
      side: THREE.DoubleSide
    });
  } */
}
