import { Polygon } from './polygon';
import * as THREE from 'three';

export class RegularPolygon extends Polygon {
    constructor(center, radius, sides, size, color, positionType = 'inner', texture, delay = 0) {
        const vertices = [];
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            vertices.push(new THREE.Vector3(x, y, center.z));
        }

        super(vertices, size, color, positionType, texture, delay);
    }
}
