// Circle.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Circle  extends BaseGeometry{
  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    this.geometry = new THREE.CircleGeometry(this.size, 32);
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this._color,
      transparent: this._opacity < 1,
      opacity: this._opacity,
      map: this._texture,
      side: THREE.DoubleSide
    });
  }
}
