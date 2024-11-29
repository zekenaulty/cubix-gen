import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Circle extends BaseGroupGeometry {
    constructor(center, radius, size, color, positionType = 'inner', texture, segments = 32, delay = 0) {
        super(size, color, positionType, texture);

        this.center = center; // Center of the circle
        this.radius = radius; // Radius of the circle
        this.segments = segments; // Number of segments to approximate the circle
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        const points = [];
        for (let i = 0; i <= this.segments; i++) {
            const angle = (i / this.segments) * Math.PI * 2;
            const x = this.center.x + this.radius * Math.cos(angle);
            const y = this.center.y + this.radius * Math.sin(angle);
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
