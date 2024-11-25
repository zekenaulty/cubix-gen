// src/App.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Diamond } from './components/diamond.js';
import { getRandomColor } from './utils/colors.js';

//import { getRandomColor } from './utils/colors.js';

const tic = new Date();
const colorAt = 1000;
let colorTimer = new Date();
let first = true;

export class App {
  constructor(container, startup, animate) {
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

    this.init();
  }

  init() {
    // Append Renderer to the container
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Setup Camera
    this.camera.position.set(250, 250, 250);
    this.camera.lookAt(0, 0, 0);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(ambientLight, directionalLight);


    // Create the top diamond
    const layers = 11;
    const baseSize = 21;
    const gap = 7.5;//0.75;

    // diamond Creation
    this.diamond = new Diamond(layers, baseSize, gap); // 5 layers, 1 unit cube size, 0.2 gap
    this.diamond.addToScene(this.scene);

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

  animate() {
    const toc = new Date();
    const elapsed = toc - colorTimer;

    requestAnimationFrame(this.animate.bind(this));
    (() => {
      this.diamond.cubes.forEach((cube) => {
        cube.mesh.rotation.x += 0.01;
        cube.mesh.rotation.y += toc % 21 === 0 ? -0.03 : 0.03;
        cube.mesh.rotation.z += 0.05;
        if (elapsed >= colorAt && first) {
          //cube.setColor(getRandomColor());
        }
      });
    })();
    if (elapsed >= colorAt) {
      colorTimer = new Date();
      first = false;
    }

    // Render Scene
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}



