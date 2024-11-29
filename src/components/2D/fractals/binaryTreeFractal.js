import { Line } from '../line';
import { BaseGroupGeometry } from '../../baseGroupGeometry';
import * as THREE from 'three';

import { getRandomColor, getRandomPaletteColor } from '../../../utils/colors.js';

export class BinaryTreeFractal extends BaseGroupGeometry {
    constructor(
        startVector,
        length,
        angle,
        depth,
        size,
        color = getRandomPaletteColor(),
        positionType = 'inner',
        texture,
        delay = 0
    ) {
        super(size, color, positionType, texture);

        this.startVector = startVector; // Starting point of the tree
        this.length = length; // Initial branch length
        this.angle = angle; // Angle between branches
        this.depth = depth; // Maximum recursion depth
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        this.generateBranch(this.startVector, this.length, -Math.PI / 2, this.depth, 0);
    }

    generateBranch(start, length, angle, depth, delayCounter) {
        if (depth === 0) return;

        // Calculate the end point of the current branch
        const end = new THREE.Vector3(
            start.x + length * Math.cos(angle),
            start.y + length * Math.sin(angle),
            start.z
        );

        // Create the current branch as a Line
        setTimeout(() => {
            const branch = new Line(
                start,
                end,
                this.size,
                getRandomPaletteColor(),
                this.positionType,
                this.texture,
                this.delay
            );
            this.group.add(branch.group);
        }, this.delay * delayCounter);

        // Recursively create left and right branches
        const newLength = length * 0.7; // Reduce branch length
        const leftAngle = angle + this.angle;
        const rightAngle = angle - this.angle;

        this.generateBranch(end, newLength, leftAngle, depth - 1, delayCounter + 1);
        this.generateBranch(end, newLength, rightAngle, depth - 1, delayCounter + 2);
    }
}
