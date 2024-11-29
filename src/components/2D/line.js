import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Line extends BaseGroupGeometry {
    constructor(startVector, endVector, size, color, positionType = 'inner', texture, delay = 0) {
        super(size, color, positionType, texture);
        this.startVector = startVector;
        this.endVector = endVector;
        this.delay = delay; // Delay between adding cubes
        this.createGeometry();
    }

    createGeometry() {
        // Calculate direction and distance between the two vectors
        const direction = new THREE.Vector3().subVectors(this.endVector, this.startVector).normalize();
        const distance = this.startVector.distanceTo(this.endVector);

        // Number of cubes to fit along the line
        const steps = Math.ceil(distance / this.size);

        // Add cubes along the line with staggered delays
        for (let i = 0; i <= steps; i++) {
            const position = new THREE.Vector3()
                .copy(this.startVector)
                .add(direction.clone().multiplyScalar(i * this.size));

            // Staggered addition
            setTimeout(() => {
                this.addCube(position.x, position.y, position.z);
            }, this.delay * i);
        }
    }
}
