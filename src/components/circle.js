// Circle.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Circle  extends BaseGeometry{
  constructor(size, color, positionType = 'inner') {
    super();
    this.size = size; // Radius of the circle
    this.color = color;
    this.positionType = positionType;
    this.geometry = new THREE.CircleGeometry(this.size, 32);
    this.material = new THREE.MeshStandardMaterial({ color: this.color, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.__firstColorSet = true;
  }
  
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
    this.mesh.rotation.x = Math.PI / 2; // Face the circle upwards
  }
  
  setColor(color) {
    this.color = color;
    this.material.color.set(color);
    this.mesh.material.needsUpdate = true;
  }
}
