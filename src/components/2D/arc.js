import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Arc extends BaseGroupGeometry {
    constructor(center, radius, startAngle, endAngle, size, color, positionType = 'inner', texture, segments = 32, delay = 0) {
        super(size, color, positionType, texture);

        this.center = center; // Center of the arc
        this.radius = radius; // Radius of the arc
        this.startAngle = startAngle; // Starting angle in radians
        this.endAngle = endAngle; // Ending angle in radians
        this.segments = segments; // Number of segments to approximate the arc
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        const points = [];
        for (let i = 0; i <= this.segments; i++) {
            const t = i / this.segments;
            const angle = this.startAngle + t * (this.endAngle - this.startAngle);
            const x = this.center.x + this.radius * Math.cos(angle);
            const y = this.center.y + this.radius * Math.sin(angle);
            points.push(new THREE.Vector3(x, y, this.center.z));
        }

        // Connect all the points
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
