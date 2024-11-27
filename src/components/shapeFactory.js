// ShapeFactory.js
import { Cube } from './cube.js';
import { Sphere } from './sphere.js';
import { Cylinder } from './cylinder.js';
import { Cone } from './cone.js';
import { Torus } from './torus.js';
import { TorusKnot } from './torusKnot.js';
import { Dodecahedron } from './dodecahedron.js';
import { Icosahedron } from './icosahedron.js';
import { Octahedron } from './octahedron.js';
import { Tetrahedron } from './tetrahedron.js';
// Exclude 2D shapes by default
// import { Plane } from './Plane.js';
// import { Circle } from './Circle.js';
// import { Ring } from './Ring.js';

import { BaseGeometry } from './baseGeometry';

import { getRandomPaletteColor } from '../utils/colors.js';

export class ShapeFactory {
  constructor() {
    this.availableShapes = {
      Cube,
      Sphere,
      Cylinder,
      Cone,
      Torus,
      TorusKnot,
      Dodecahedron,
      Icosahedron,
      Octahedron,
      Tetrahedron,
      // Exclude 2D shapes by default
      // Plane,
      // Circle,
      // Ring,
    };
  }

  /**
   * Instantiates a new shape object of the specified type.
   * @param {string} type - The type of shape to create.
   * @param {object} options - Options for the shape (size, color, positionType).
   * @returns {object} - An instance of the shape.
   */
  getShape(type, options = {}) {
    const ShapeClass = this.availableShapes[type];
    if (!ShapeClass) {
      throw new Error(`Shape type "${type}" not recognized.`);
    }

    const size = options.size || 1;
    const color = options.color || getRandomPaletteColor();
    const positionType = options.positionType || 'inner';

    return new ShapeClass(size, color, positionType);
  }

  /**
   * Returns a random shape instance, excluding any shapes in the blacklist.
   * By default, planes and other 2D shapes are excluded.
   * @param {Array<string>} blacklist - Array of shape names to exclude.
   * @param {object} options - Options for the shape (size, color, positionType).
   * @returns {object} - An instance of a random shape.
   */
  getRandomShape(blacklist = ['Plane', 'Circle', 'Ring'], options = {}) {
    const shapeNames = Object.keys(this.availableShapes).filter(
      (shapeName) => !blacklist.includes(shapeName)
    );

    if (shapeNames.length === 0) {
      throw new Error('No shapes available after applying blacklist.');
    }

    const randomIndex = Math.floor(Math.random() * shapeNames.length);
    const randomShapeName = shapeNames[randomIndex];

    return this.getShape(randomShapeName, options);
  }

  /**
   * Returns an instance of a specific shape type, with optional blacklist filtering.
   * If the shape is in the blacklist, it returns null.
   * @param {string} type - The type of shape to create.
   * @param {object} options - Options for the shape (size, color, positionType).
   * @param {Array<string>} blacklist - Array of shape names to exclude.
   * @returns {object|null} - An instance of the shape or null if blacklisted.
   */
  getSpecificShape(type, options = {}, blacklist = []) {
    if (blacklist.includes(type)) {
      return null;
    }
    return this.getShape(type, options);
  }
}
