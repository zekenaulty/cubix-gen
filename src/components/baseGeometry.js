// BaseGeometry.js
import * as THREE from 'three';

export class BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    this.size = size;
    this.color = color;
    this.positionType = positionType;
    this.geometry = null; // Should be set by subclasses
    this.material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = null; // Will be set after geometry is created
    this.__firstColorSet = true;
  }

  setPosition(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
  }

  setColor(color) {
    this.color = color;
    if (this.material) {
      this.material.color.set(color);
      this.material.needsUpdate = true;
    }
  }

  setSize(size) {
    this.size = size;
    this.updateGeometry();
  }

  updateGeometry() {
    if (this.geometry) {
      this.geometry.dispose(); // Dispose of old geometry to free up memory
    }
    //this.createGeometry(); // Subclasses implement this method
    if (this.mesh) {
      this.mesh.geometry = this.geometry; // Update mesh geometry
    } else {
      this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
  }
/*
  createGeometry() {
    // Abstract method to be implemented by subclasses
    throw new Error('createGeometry() must be implemented by subclasses');
  }
    */
}
