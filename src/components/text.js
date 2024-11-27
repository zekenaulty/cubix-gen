// Text.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { BaseGeometry } from './baseGeometry';

export class Text extends BaseGeometry {
  constructor(text, size, color, positionType = 'inner') {
    super();
    this.text = text;
    this.size = size; // Size of the text
    this.color = color;
    this.positionType = positionType;
    this.geometry = null;
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = null;
    this.__firstColorSet = true;
    this.loadFont();
  }
  
  loadFont() {
    const loader = new FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
      this.geometry = new THREE.TextGeometry(this.text, {
        font: font,
        size: this.size,
        height: this.size / 4,
        curveSegments: 12,
        bevelEnabled: false,
      });
      this.mesh = new THREE.Mesh(this.geometry, this.material);
    });
  }
}
