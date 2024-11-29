import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';

export class Rectangle extends BaseGroupGeometry {
    constructor(vectorA, vectorB, size, color, positionType = 'inner', texture, delay = 0) {
        super(size, color, positionType, texture);

        this.vectorA = vectorA; // First corner of the bounding box
        this.vectorB = vectorB; // Opposite corner of the bounding box
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        const { x: ax, y: ay, z: az } = this.vectorA;
        const { x: bx, y: by, z: bz } = this.vectorB;

        // Define the four corners of the rectangle
        const corner1 = new THREE.Vector3(ax, ay, az);
        const corner2 = new THREE.Vector3(bx, ay, az);
        const corner3 = new THREE.Vector3(bx, by, bz);
        const corner4 = new THREE.Vector3(ax, by, az);

        // Create lines for each edge
        const edges = [
            new Line(corner1, corner2, this.size, this.color, this.positionType, this.texture, this.delay),
            new Line(corner2, corner3, this.size, this.color, this.positionType, this.texture, this.delay),
            new Line(corner3, corner4, this.size, this.color, this.positionType, this.texture, this.delay),
            new Line(corner4, corner1, this.size, this.color, this.positionType, this.texture, this.delay),
        ];

        // Add the edges' groups to this group's group
        edges.forEach((edge) => this.group.add(edge.group));
    }
}
