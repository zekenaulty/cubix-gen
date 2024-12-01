import * as THREE from 'three';
import { InstancedMeshManager } from './components/instancedMeshManager.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Stage {
    constructor(container = document.body, startup = () => {}, animate = () => {}) {
        this.container = container;
        this.__startup = startup;
        this.__animate = animate;

        // Scene, Camera, Renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        // Mesh Manager
        this.instancedMeshManager = new InstancedMeshManager(this.scene);
    }

    getMeshManager() {
        return this.instancedMeshManager;
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.set(0, 30, 35);
        this.camera.lookAt(0, 0, 0);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(ambientLight, directionalLight);

        this.__startup();

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.__animate();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
