// src/App.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pyramid } from './components/pyramid.js';
import { getRandomColor } from './utils/colors.js';

//import { getRandomColor } from './utils/colors.js';

const tic = new Date();
const colorAt = 1000;
let colorTimer = new Date();

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


    // Create the top pyramid
    const layers = 7;
    const baseSize = 13;
    const gap = 0.75;

    // Pyramid Creation
    this.pyramid = new Pyramid(layers, baseSize, gap); // 5 layers, 1 unit cube size, 0.2 gap
    this.pyramid.addToScene(this.scene);
    //this.pyramid.removeFromScene(scene);


    //const topPyramid = new Pyramid(layers, baseSize, gap);
    //const bottomPyramid = new Pyramid(layers/2, baseSize/2, gap);
    
    //this.bottomPyramid.setPosition( 1, 1, 1);
    //this.bottomPyramid.addToScene(this.scene);

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
      this.pyramid.cubes.forEach((cube) => {
        cube.mesh.rotation.x += 0.01;
        cube.mesh.rotation.y += toc % 21 === 0 ? -0.03 : 0.03;
        cube.mesh.rotation.z += 0.05;
        if (elapsed >= colorAt) {
          cube.setColor(getRandomColor());
        }
      });
    })();

    if (elapsed >= colorAt) {
      colorTimer = new Date();
    }

    // Render Scene
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}



