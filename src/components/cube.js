// cube.js
import * as THREE from 'three';
import { BaseGeometry } from './baseGeometry';

export class Cube extends BaseGeometry {

  constructor(size, color, positionType = 'inner', texture) {
    super(size, color, positionType, texture);
  }  
  
  createGeometry() {
    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
  }
  
}
