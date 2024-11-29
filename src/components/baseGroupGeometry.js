import * as THREE from 'three';
import { ShapeFactory } from './shapeFactory';

export class BaseGroupGeometry {
    constructor(size, color, positionType = 'inner', texture) {
        this.size = size; // Size of individual cubes
        this.color = color;
        this.positionType = positionType;
        this.texture = texture;

        this.group = new THREE.Group(); // Group to hold all cubes
        this.cubes = []; // Store individual cubes for reference

        this.shapeFactory = new ShapeFactory(); // Factory to create cubes
    }

    addCube(x, y, z) {
        const cube = this.shapeFactory.getShape('Cube', {
            size: this.size,
            color: this.color,
            positionType: this.positionType,
            texture: this.texture,
        });
        cube.setPosition(x, y, z);
        this.group.add(cube.mesh);
        this.cubes.push(cube);
    }

    setPosition(x, y, z) {
        this.group.position.set(x, y, z);
    }

    setColor(color) {
        this.color = color;
        this.cubes.forEach((cube) => {
            cube.color = color; // Update color for each cube
        });
    }

    dispose() {
        this.cubes.forEach((cube) => {
            if (cube.mesh && cube.mesh.geometry) cube.mesh.geometry.dispose();
            if (cube.mesh && cube.mesh.material) cube.mesh.material.dispose();
        });
        this.group.clear();
        this.cubes = [];
    }
}
