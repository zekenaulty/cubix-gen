import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Polygon extends BaseGroupGeometry {
    constructor(vertices, size, color, positionType = 'inner', texture, delay = 0) {
        super(size, color, positionType, texture);

        this.vertices = vertices; // Array of THREE.Vector3 points
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        // Connect all vertices in sequence
        for (let i = 0; i < this.vertices.length; i++) {
            const start = this.vertices[i];
            const end = this.vertices[(i + 1) % this.vertices.length]; // Loop back to the first point
            const line = new Line(
                start,
                end,
                this.size,
                this.color,
                this.positionType,
                this.texture,
                this.delay
            );
            this.group.add(line.group);
        }
    }
}
