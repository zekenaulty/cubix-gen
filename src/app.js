// src/app.js
import * as THREE from 'three';
import { Diamond } from './components/diamond.js';
import { Stage } from './stage.js';
import { getRandomColor, getRandomPaletteColor } from './utils/colors.js';
import imageTexture from './components/assets/cube/00002909.jpg';

const tic = new Date();
const colorAt = 6000;
const texture = new THREE.TextureLoader().load(imageTexture);

let colorTimer = new Date();
let first = true;

export class App {
    constructor(container) {
        this.stage = new Stage(container, this.init, this.animate, this.tween);
    }

    init() {
        // Create the top diamond
        const layers = 11;
        const baseSize = 21;
        const gap = 0; //15.0; //17.5; //0.75;

        // diamond Creation
        this.diamond = new Diamond(layers, baseSize, gap, getRandomColor(), texture);
        this.diamond.addToScene(this.scene);
    }

    animate() {
        (() => {
            const toc = new Date();
            const elapsed = toc - colorTimer;
            this.diamond.cubeLayers.forEach((layer) => {
                const c = getRandomColor();

                layer.forEach((cube, i) => {
                    if (cube.positionType == 'inner') {
                        const p = i % 3 === 0 ? 'x' : 'y';
                        cube.mesh.rotation[p] += 0.01;
                        cube.mesh.rotation.z += toc % 21 === 0 ? -0.03 : 0.03;
                        cube.color = c;
                    } else {
                        const p = i % 3 === 0 ? 'x' : 'y';
                        cube.mesh.rotation[p] += -0.01;
                        cube.mesh.rotation.z += toc % 21 === 0 ? 0.03 : -0.03;
                    }
                    if (elapsed >= colorAt) {
                        this.diamond.cubeLayers.forEach((layer) => {
                            if (cube.positionType === 'inner') {
                                cube.color = c;
                            }
                        });
                    } else if (elapsed >= colorAt) {
                        colorTimer = new Date();
                        first = false;
                    }
                });
            });
        })();
    }
}


