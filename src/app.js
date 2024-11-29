// src/app.js
import * as THREE from 'three';
import { Stage } from './stage.js';
import { getRandomColor, getRandomPaletteColor } from './utils/colors.js';

import { BinaryTreeFractal } from './components/2D/fractals/binaryTreeFractal.js';

export class App {
    constructor(container) {
        this.binaryTree = new BinaryTreeFractal(
            new THREE.Vector3(0, 0, 0), // Start vector
            10, // Initial branch length
            Math.PI / 6, // Angle (30 degrees)
            11, // Depth of recursion
            1, // Cube size
            getRandomPaletteColor(), // Color
            'inner', // Position type
            undefined, // Texture
            250 // Delay in milliseconds
        );
        this.stage = new Stage(container, this.init, this.animate);
        this.stage.scene.add(this.binaryTree.group);
    }

    init() {}

    animate() { }

}


