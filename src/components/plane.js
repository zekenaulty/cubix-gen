// Plane.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Plane extends BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Width and height of the plane
    this.color = color;
    this.positionType = positionType;
    this.geometry = new THREE.PlaneGeometry(this.size, this.size);
    this.material = new THREE.MeshStandardMaterial({ color: this.color, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  }
}
