import * as THREE from 'three';
import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';

export class Diamond {
  constructor(layers, baseSize, gap, color = null) {

    
    this.cornerColor = 0xffffff; //getRandomPaletteColor();
    this.edgeColor = 0xc6c6c6; //getRandomPaletteColor();
    this.innerColor = getRandomPaletteColor();

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
    this.__outerEdge();
    this.__createCubesInverse();
    this.cubes.forEach((cube) => {
      cube.setColor(cube.isCorner ? this.cornerColor : cube.isEdge ? this.edgeColor : this.innerColor);
    });
  }

  __newCube(cubesInLayer, i, j, layer, layers, baseSize, color, isCenterLayer = false) {
    const offset000 = 0;
    const offset001 = 1;
    const offset002 = 2;
    const minDistance = Math.min(i, j, (cubesInLayer - 1) - i, (cubesInLayer - 1) - j);
    const isOneLevelInsideBorder = minDistance === 1;
    const positionType = isOneLevelInsideBorder ? 'corner' : 'inner';

    const isCorner = 
      (i === 0 && j === 0) ||
      (i === 0 && j === cubesInLayer - offset001) ||
      (i === cubesInLayer - offset001 && j === 0) ||
      (i === cubesInLayer - offset001 && j === cubesInLayer - offset001);

    const isEdgeCube = ((i === 1 || i === cubesInLayer - offset002 || j === 1 || j === cubesInLayer - offset002));
    const cubeColor = isCorner ? this.cornerColor : isEdgeCube ? this.edgeColor : (isCenterLayer ? this.cornerColor : color || this.innerColor);
    const cube = new Cube(
      baseSize, 
      cubeColor, 
      isCorner ? 'corner' : isCenterLayer ? 'edge' : positionType);
      cube.isCorner = isCorner;
      cube.isEdge = isEdgeCube;

    return cube;
  }

  __createCubes() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = 0; layer < layers; layer++) {
      const cubesInLayer = layers - layer;
      for (let i = 0; i < cubesInLayer; i++) {
        for (let j = 0; j < cubesInLayer; j++) {
          const cube = this.__newCube(cubesInLayer, i, j, layer, layers, baseSize, color);
          cube.setPosition(
            (i - (cubesInLayer - 1) / 2) * (baseSize + gap) - 1,
            layer * (baseSize + gap),
            (j - (cubesInLayer - 1) / 2) * (baseSize + gap) + 1
          );
          this.cubes.push(cube);
        }
      }
    }
  }

  __outerEdge() {
    let { layers, baseSize, gap, color } = { ...this };
    baseSize += 1;
    layers++;
    const layer = 0;
    const cubesInLayer = layers - layer;
    for (let i = 0; i < cubesInLayer; i++) {
      for (let j = 0; j < cubesInLayer; j++) {
        const cube = this.__newCube(cubesInLayer, i, j, layer, layers, baseSize, color, true);
        cube.isCorner = true;
        cube.isEdge = true;
        cube.positionType = 'corner';
        cube.setPosition(
          (i - (cubesInLayer - 1) / 2) * (baseSize + gap),
          -(baseSize + gap) / 2,
          (j - (cubesInLayer - 1) / 2) * (baseSize + gap)
        );
        this.cubes.push(cube);
      }
    }
  }


  __createCubesInverse() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = layers + 1; layer > -1; layer--) {
      if (layer === 0) continue;
      const cubesInLayer = layers - layer + 1;
      for (let i = 0; i < cubesInLayer; i++) {
        for (let j = 0; j < cubesInLayer; j++) {
          const cube = this.__newCube(cubesInLayer, i, j, layer, layers, baseSize, color);
          cube.setPosition(
            (i - (cubesInLayer - 1) / 2) * (baseSize + gap) + 1,
            -layer * (baseSize + gap),
            (j - (cubesInLayer - 1) / 2) * (baseSize + gap) - 1
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
