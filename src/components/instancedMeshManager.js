import * as THREE from 'three';

export class InstancedMeshManager {
    constructor(scene, maxInstances = 10000) {
        this.scene = scene; // Reference to the scene
        this.maxInstances = maxInstances;
        this.meshes = new Map(); // Map to store instanced meshes by color
        this.defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
    }

    /**
     * Get or create an instanced mesh for a given color.
     * @param {number} color - The color of the mesh.
     * @returns {THREE.InstancedMesh} - The instanced mesh.
     */
    getMesh(color) {
        if (!this.meshes.has(color)) {
            const material = new THREE.MeshStandardMaterial({ color });
            const mesh = new THREE.InstancedMesh(this.defaultGeometry, material, this.maxInstances);
            mesh.count = 0; // Initialize instance count
            this.scene.add(mesh);
            this.meshes.set(color, mesh);
        }
        return this.meshes.get(color);
    }

    /**
     * Add an instance to the instanced mesh of a specific color.
     * @param {number} color - The color of the instance.
     * @param {THREE.Vector3} position - The position of the instance.
     * @param {THREE.Euler} rotation - The rotation of the instance.
     * @param {THREE.Vector3} scale - The scale of the instance.
     */
    addInstance(color, position, rotation = new THREE.Euler(), scale = new THREE.Vector3(1, 1, 1)) {
        const mesh = this.getMesh(color);

        if (mesh.count >= this.maxInstances) {
            console.warn('Maximum instances reached for this mesh.');
            return;
        }

        const matrix = new THREE.Matrix4();
        matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);

        mesh.setMatrixAt(mesh.count, matrix);
        mesh.instanceMatrix.needsUpdate = true;
        mesh.count++;
    }

    /**
     * Smoothly transition the color of an instanced mesh.
     * @param {number} fromColor - The starting color.
     * @param {number} toColor - The target color.
     * @param {number} duration - Duration of the transition in milliseconds.
     */
    transitionColor(fromColor, toColor, duration = 1000) {
        const fromMesh = this.meshes.get(fromColor);
        if (!fromMesh) return;

        const toMesh = this.getMesh(toColor);

        // Animate each instance matrix (if needed, could also animate colors per instance)
        let progress = 0;
        const step = () => {
            progress += 16 / duration; // Approximate frame time (16ms per frame)
            const lerpColor = new THREE.Color(fromColor).lerp(new THREE.Color(toColor), progress);

            fromMesh.material.color.set(lerpColor);
            toMesh.material.color.set(lerpColor);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        step();
    }
}
