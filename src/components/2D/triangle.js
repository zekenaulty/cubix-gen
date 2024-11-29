import { Line } from './line';
import { BaseGroupGeometry } from '../baseGroupGeometry';
import * as THREE from 'three';

export class Triangle extends BaseGroupGeometry {
    constructor(vectorA, vectorB, vectorC, size, color, positionType = 'inner', texture, delay = 0) {
        super(size, color, positionType, texture);

        this.vectorA = vectorA; // First vertex
        this.vectorB = vectorB; // Second vertex
        this.vectorC = vectorC; // Third vertex
        this.delay = delay;

        this.createGeometry();
    }

    createGeometry() {
        // Create the three edges of the triangle using the Line class
        const edges = [
            new Line(this.vectorA, this.vectorB, this.size, this.color, this.positionType, this.texture, this.delay),
            new Line(this.vectorB, this.vectorC, this.size, this.color, this.positionType, this.texture, this.delay),
            new Line(this.vectorC, this.vectorA, this.size, this.color, this.positionType, this.texture, this.delay),
        ];

        // Add the edges' groups to this group's group
        edges.forEach((edge) => this.group.add(edge.group));
    }
}
