// src/App.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pyramid } from './components/pyramid.js';

export class App {
  constructor(container) {
    this.container = container;

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
    this.camera.position.set(0, 10, 20);
    this.camera.lookAt(0, 0, 0);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(ambientLight, directionalLight);

    // Pyramid Creation
    // this.pyramid = new Pyramid(5, 1, 0.2, 0xff5722); // 5 layers, 1 unit cube size, 0.2 gap
    this.pyramid = new Pyramid(5, 1, 0.2);
    this.pyramid.addToScene(this.scene);

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
    requestAnimationFrame(this.animate.bind(this));

    // Animate Pyramid (optional rotation)
    this.pyramid.cubes.forEach((cube) => {
      cube.mesh.rotation.y += 0.01;
    });

    // Render Scene
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
