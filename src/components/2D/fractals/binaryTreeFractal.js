import * as THREE from 'three';

export class BinaryTreeFractal {
    constructor(manager, startVector, length, angle, depth, size, colors) {
        this.manager = manager;
        this.startVector = startVector;
        this.length = length;
        this.angle = angle;
        this.depth = depth;
        this.size = size;
        this.trunkColor = colors.trunk || 0x8b4513; // Default brown
        this.leafColor = colors.leaf || 0x228b22; // Default green
    }

    async createGeometry() {
        await this.generateBranch(this.startVector, this.length, Math.PI / 2, this.depth);
    }

    async generateBranch(start, length, angle, depth) {
        if (depth === 0) return;

        const end = new THREE.Vector3(
            start.x + length * Math.cos(angle),
            start.y + length * Math.sin(angle),
            start.z
        );

        const color = length > 3 ? this.trunkColor : this.leafColor;
        this.manager.addInstance(color, start);
        this.manager.addInstance(color, end);

        const newLength = length * 0.7;
        await this.generateBranch(end, newLength, angle + this.angle, depth - 1);
        await this.generateBranch(end, newLength, angle - this.angle, depth - 1);
    }
}
