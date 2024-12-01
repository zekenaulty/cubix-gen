// src/app.js
import * as THREE from 'three';
import { Stage } from './stage.js';
import { getRandomColor, getRandomPaletteColor } from './utils/colors.js';

import { BinaryTreeFractal } from './components/2D/fractals/binaryTreeFractal.js';

export class App {
    constructor(container) {

        this.init = this.animate.bind(this);
        this.animate = this.animate.bind(this);
        this.stage = new Stage(container, this.init, this.animate);
        this.clock = new THREE.Clock(); // Clock for animations
        this.clock.start();

        this.binaryTree = new BinaryTreeFractal(
            this.stage.getMeshManager(),
            new THREE.Vector3(0, 0, 0), // Start vector
            10, // Initial branch length
            Math.PI / 6, // Angle (30 degrees)
            11, // Depth of recursion
            1, // Cube size
            getRandomPaletteColor(), // Color
            'inner', // Position type
            undefined, // Texture
            0 // Delay in milliseconds
        );

        //this.stage.scene.add(this.binaryTree.group);
        this.stage.init();
        this.binaryTree.createGeometry();
    }

    init() {}

    animate() { 
        // const elapsed = this.clock.getElapsedTime();
        // this.binaryTree.group.children.forEach((child, index) => {
        //     child.children.forEach((child, index) => {
        //         // Animate position (sinusoidal oscillation for demonstration)
        //         const offset = index * 0.1; // Stagger the animations slightly
        //         child.position.y += Math.sin(elapsed + offset) * 0.01;
    
        //         // Rotate each cube
        //         child.rotation.x += 0.01;
        //         child.rotation.y += 0.01;
    
        //         // Optionally scale the cubes
        //         child.scale.setScalar(1 + Math.sin(elapsed + offset) * 0.1);
        //     });
        // });
    }

}


