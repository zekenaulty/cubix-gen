// BaseGeometry.js
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export class BaseGroupGeometry {
  constructor(size, color, positionType = 'inner', texture) {
    this._size = size;
    this._color = color;
    this._opacity = 1;
    this._texture = texture;
    this.positionType = positionType;

    this.geometry = null;
    this.mesh = null;
    this.createMaterial();
    this.createGeometry();
    this.createMesh();
  }

  // Getter and setter for size
  get size() {
    return this._size;
  }
  set size(value) {
    if (this._size !== value) {
      this._size = value;
      this.updateGeometry();
    }
  }

  // Getter and setter for color
  get color() {
    return this._color;
  }
  set color(value) {
    if (this._color !== value) {
      this._color = value;
      if (this.material) {
        this.material.color.set(value);
        this.material.needsUpdate = true;
      }
    }
  }

  // Getter and setter for opacity
  get opacity() {
    return this._opacity;
  }
  set opacity(value) {
    if (this._opacity !== value) {
      this._opacity = value;
      if (this.material) {
        this.material.opacity = value;
        this.material.transparent = value < 1;
        this.material.needsUpdate = true;
      }
    }
  }

  // Getter and setter for texture
  get texture() {
    return this._texture;
  }
  set texture(value) {
    if (this._texture !== value) {
      this._texture = value;
      if (this.material) {
        this.material.map = value;
        this.material.needsUpdate = true;
      }
    }
  }

  // Method to set position
  setPosition(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
  }

  // Abstract method to create geometry (to be implemented by subclasses)
  createGeometry() {
    throw new Error('createGeometry() must be implemented by subclasses');
  }

  // Abstract method to create geometry (to be implemented by subclasses)
  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this._color,
      transparent: this._opacity < 1,
      opacity: this._opacity,
      map: this._texture,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  // Method to update geometry when size changes
  updateGeometry() {
    if (this.geometry) {
      this.geometry.dispose(); // Dispose of old geometry
    }
    this.createGeometry(); // Recreate geometry with new size
    if (this.mesh) {
      this.mesh.geometry = this.geometry; // Update mesh geometry
    }
  }


  fadeToColor(newColorHex, duration = 1000) {
    // Get current color
    const currentColor = new THREE.Color(this.material.color.getHex());

    // Convert new color hex to THREE.Color
    const newColor = new THREE.Color(newColorHex);

    // Create an object to tween
    const colorTween = { r: currentColor.r, g: currentColor.g, b: currentColor.b };

    // Create the tween
    const tween = new TWEEN.Tween(colorTween);
    tween.to({ r: newColor.r, g: newColor.g, b: newColor.b }, duration);
    tween.onUpdate(() => {
      // Update the material color
      this.material.color.setRGB(colorTween.r, colorTween.g, colorTween.b);
    });
    tween.onComplete(() => {
      const i = myArray.findIndex(obj => obj === tween);
      this.tweens.splice(i, 1);
    });
    this.tweens.push(tween);
  }

}
