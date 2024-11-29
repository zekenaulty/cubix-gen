// src/app.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Diamond } from './components/diamond.js';
import { getRandomColor, getRandomPaletteColor } from './utils/colors.js';

const tic = new Date();
const colorAt = 1000;
const cameraX = 10;
const cameraY = -1;
const cameraZ = 10;

let colorTimer = new Date();
let first = true;

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

        // Raycaster and mouse setup
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Track the last cube interacted with
        this.lastHoveredCube = null;

        this.init();
    }

    init() {
        // Append Renderer to the container
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Setup Camera
        //this.camera.position.set(150, 150, 150);

        this.camera.position.set(cameraX, cameraY, cameraZ);
        this.camera.lookAt(0, 0, 0);

        // Orbit Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(ambientLight, directionalLight);

        this.__startup();

        // Mouse event listener for clicking cubes
        //window.addEventListener('click', this.onMouseClick.bind(this));

        // Mouse event listeners for hover effects
        //window.addEventListener('mousemove', this.onMouseMove.bind(this));

        // Window Resize Handler
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Start Rendering Loop
        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        // Update mouse position to normalized device coordinates (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Set the raycaster with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
/* 
        // Check intersections with all cubes in the diamond
        const intersects = this.raycaster.intersectObjects(
            this.diamond.cubes.map((cube) => cube.mesh)
        );

        if (intersects.length > 0) {
            // Get the first intersected object (closest cube)
            const hoveredCubeMesh = intersects[0].object;

            // Find the cube in the diamond
            const hoveredCube = this.diamond.cubes.find((c) => c.mesh === hoveredCubeMesh);

            if (hoveredCube && hoveredCube !== this.lastHoveredCube) {
                // Restore the color of the last hovered cube
                if (this.lastHoveredCube) {
                    this.lastHoveredCube.setColor(this.lastHoveredCube.color);
                }

                // Change the color of the newly hovered cube
                const newColor = getRandomColor();
                hoveredCube.setColor(newColor);

                // Update the last hovered cube
                this.lastHoveredCube = hoveredCube;
            }
        } else {
            // If no cube is hovered, restore the last hovered cube's color
            if (this.lastHoveredCube) {
                this.lastHoveredCube.setColor(this.lastHoveredCube.color);
                this.lastHoveredCube = null;
            }
        }
         */
    }

    onMouseClick(event) {
        // Update mouse position to normalized device coordinates (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Set the raycaster with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
/* 
        // Check intersections with all cubes in the diamond
        const intersects = this.raycaster.intersectObjects(
            this.diamond.cubes.map((cube) => cube.mesh)
        );

        if (intersects.length > 0) {
            // Get the first intersected object (closest cube)
            const clickedCube = intersects[0].object;

            // Find the cube in the diamond
            const cube = this.diamond.cubes.find((c) => c.mesh === clickedCube);
            if (cube) {
                // Change color of the clicked cube as an example action
                cube.setColor(getRandomColor());
                console.log('Cube clicked:', cube);
                const viewPos = this.camera.position;
                let newView = new THREE.Vector3();
                newView.copy(viewPos);
                console.log(`Camera Position ${JSON.stringify(newView)}`);
            }
        }
         */
    }

    animate() {
        const toc = new Date();
        const elapsed = toc - colorTimer;
        requestAnimationFrame(this.animate.bind(this));
        this.__animate();
        // Render Scene
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}


