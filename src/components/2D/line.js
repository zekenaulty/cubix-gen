import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Line extends BaseGroupGeometry {
    constructor(startVector, endVector, size, color, positionType = 'inner', texture, delay = 0, shape = 'Cube') {
        super(size, color, positionType, texture);
        this.startVector = startVector;
        this.endVector = endVector;
        this.delay = delay;
        this.shape = shape;
    }

    async createGeometry() {
        return new Promise((resolve) => {
            const direction = new THREE.Vector3().subVectors(this.endVector, this.startVector);
            const length = direction.length();
            const numCubes = Math.ceil(length / this.size);
            const unitDirection = direction.normalize();
            let currentPos = this.startVector.clone();
            let cubesAdded = 0;

            const addCube = () => {
                if (cubesAdded < numCubes) {
                    this.addCube(currentPos.x, currentPos.y, currentPos.z, this.shape);
                    currentPos.addScaledVector(unitDirection, this.size);
                    cubesAdded++;
                    setTimeout(addCube, this.delay); // Schedule the next cube addition
                } else {
                    resolve(); // All cubes are added; resolve the promise
                }
            };

            addCube(); // Start adding cubes
        });
    }
}
