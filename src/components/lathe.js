// Lathe.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Lathe extends BaseGeometry {
  constructor(points, color, positionType = 'inner') {
    super();
    this.points = points; // Array of Vector2 points
    this.color = color;
    this.positionType = positionType;
    this.geometry = new THREE.LatheGeometry(this.points, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color, side: THREE.DoubleSide });
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
