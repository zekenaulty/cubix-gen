import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Ellipse extends BaseGroupGeometry {
    constructor(center, radiusX, radiusY, size, color, positionType = 'inner', texture, segments = 32, delay = 0) {
        super(size, color, positionType, texture);

        this.center = center; // Center of the ellipse
        this.radiusX = radiusX; // Horizontal radius
        this.radiusY = radiusY; // Vertical radius
        this.segments = segments; // Number of segments to approximate the ellipse
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        const points = [];
        for (let i = 0; i <= this.segments; i++) {
            const angle = (i / this.segments) * Math.PI * 2;
            const x = this.center.x + this.radiusX * Math.cos(angle);
            const y = this.center.y + this.radiusY * Math.sin(angle);
            points.push(new THREE.Vector3(x, y, this.center.z));
        }

        // Connect all the points in a loop
        for (let i = 0; i < points.length - 1; i++) {
            const line = new Line(
                points[i],
                points[i + 1],
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
