import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';

export class Diamond {
  constructor(layers, baseSize, gap, color = null) {

    this.cubes = [];

    this.topPyramid = [];
    this.leftPyramid = [];
    this.rightPyramid = [];
    this.bottomPyramid = [];

    this.layers = layers; // Number of layers in the upper half (excluding the middle layer)
    this.baseSize = baseSize;
    this.gap = gap;
    this.color = color || getRandomPaletteColor();
    this.__createCubes();
    this.__createCubesInverse();
  }
  
  __createCubes() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < layers - layer; i++) {
        for (let j = 0; j < layers - layer; j++) {
          const cube = new Cube(baseSize, color || getRandomPaletteColor());
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap)-1,
            layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap)+1
          );
          this.cubes.push(cube);
        }
      }
    }
  }

  __createCubesInverse() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = layers+1; layer > -1; layer--) {
      if(layer == 0) continue;
      for (let i = layers - layer; i > -1; i--) {
        for (let j = layers - layer; j > -1; j--) {
          const cube = new Cube(baseSize, color || getRandomPaletteColor());
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap) +1,
            -layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap) -1
          );
          this.cubes.push(cube);
        }
      }
    }
  }
/*
  __createCubes() {
    const { layers, baseSize, gap, color } = this;

    const totalLayers = 2 * layers - 1; // Total layers in the diamond

    for (let layer = 0; layer < totalLayers; layer++) {
      let cubesInLayer;
      let yPos;

      if (layer < layers) {
        // Upper half of the diamond
        cubesInLayer = layers - layer;
        yPos = layer * (baseSize + gap);
      } else {
        // Lower half of the diamond
        cubesInLayer = baseSize - layer;
        yPos = -layer * (baseSize + gap);
      }

      for (let i = 0; i < cubesInLayer; i++) {
        for (let j = 0; j < cubesInLayer; j++) {
          const cube = new Cube(baseSize, color);
          cube.setPosition(
            (i - (cubesInLayer - 1) / 2) * (baseSize + gap),
            -yPos,
            (j - (cubesInLayer - 1) / 2) * (baseSize + gap)
          );
          this.cubes.push(cube);
        }
      }
    }
  }
*/
  addToScene(scene) {
    this.cubes.forEach((cube) => scene.add(cube.mesh));
  }

  removeFromScene(scene) {
    this.cubes.forEach((cube) => scene.remove(cube.mesh));
  }

  setPosition(x, y, z) {
    this.cubes.forEach((cube) => {
      cube.mesh.position.set(
        cube.mesh.position.x + x,
        cube.mesh.position.y + y,
        cube.mesh.position.z + z
      );
    });
  }
}
