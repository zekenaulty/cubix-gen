// BaseGeometry.js
import * as THREE from 'three';

export class BaseGeometry {
  constructor(size, color, positionType = 'inner') {
    this.opacity = 1;
    this.size = size;
    this.color = color;
    this.positionType = positionType;
    this.texture = null;
    this.geometry = null;
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,    // Change the color
      transparent: true,  // Enable transparency
      opacity: this.opacity,       // Set opacity to 0.5
      map: this.texture,
    });
    this.mesh = null; // Will be set after geometry is created
    this.__firstColorSet = true;
  }

  setPosition(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
  }

  setTexture(texture) {
    if (this.texture == texture) return;
    this.texture = texture;
    if (this.material) {
      this.material.map = texture;
      //this.material.needsUpdate = true;
    }
  }

  setColor(color) {
    if (this.color == color) return;
    this.color = color;
    if (this.material) {
      this.material.color.set(color);
      //this.material.needsUpdate = true;
    }
  }

  setSize(size) {
    if (this.size == size) return;
    this.size = size;
    this.updateGeometry();
  }

  setOpacity(opacity) {
    this.opacity = opacity;
    if (this.material) {
      this.material.opacity = opacity;
      //this.material.needsUpdate = true;
    }
    this.updateGeometry();
  }

  updateMaterial() {
    this.setColor(this.color);
    this.setOpacity(this.opacity);
    this.setTexture(this.texture);
    //this.mesh.material = this.material;
    this.material.needsUpdate = true;
  }

  updateGeometry() {
    if (this.geometry) {
      this.geometry.dispose(); // Dispose of old geometry to free up memory
    }
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


/*
  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  setColor(color) {
    this.color = color;
    this.material.color.set(color);
    const texture = this.positionType == 'corner' ? cornerTexture : this.positionType == 'edge' ? edgeTexture : innerTexture;
    if ((this.positionType == 'corner' || this.positionType == 'edge' && this.first) || this.positionType == 'inner') {
      const opacity = this.positionType == 'corner' ? 0.75 : this.positionType == 'edge' ? 0.25 : 0.55;
      // Update the material of the existing mesh
      this.mesh.material = new THREE.MeshBasicMaterial({
        color: color,    // Change the color
        transparent: true,  // Enable transparency
        opacity: opacity,       // Set opacity to 0.5
        map: texture,
      });

      // If you just want to adjust properties of the current material:
      this.mesh.material.color.set(color); // Update color to blue
      this.mesh.material.transparent = true; // Enable transparency
      this.mesh.material.opacity = opacity;       // Adjust opacity
      // Trigger an update
      this.mesh.material.needsUpdate = true;
      this.__firstColorSet = false;
    } else {
      const opacity = this.positionType == 'corner' ? 0.35 : this.positionType == 'edge' ? 0.25 : 0.15;
      // Update the material of the existing mesh
      this.mesh.material = new THREE.MeshBasicMaterial({
        transparent: true,  // Enable transparency
        opacity: opacity,       // Set opacity to 0.5
        map: texture,
      });

      // If you just want to adjust properties of the current material:
      this.mesh.material.transparent = true; // Enable transparency
      this.mesh.material.opacity = opacity;       // Adjust opacity
      // Trigger an update
      this.mesh.material.needsUpdate = true;
      this.__firstColorSet = false;

    }
  }
*/
