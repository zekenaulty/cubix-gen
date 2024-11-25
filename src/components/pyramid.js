import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';

export class Pyramid {
  constructor(layers, baseSize, gap, color = null) {
    this.cubes = [];
    this.layers = layers;
    this.baseSize = baseSize;
    this.gap = gap;
    this.color = color || getRandomPaletteColor();
    this.__createCubes();
  }

  __createCubes() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < layers - layer; i++) {
        for (let j = 0; j < layers - layer; j++) {
          const cube = new Cube(baseSize, color || getRandomPaletteColor());
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap),
            layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap)
          );
          this.cubes.push(cube);
        }
      }
    }
  }

  __createCubesInverse() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = layers; layer > 0; layer--) {
      for (let i = layers - layer; i > 0; i--) {
        for (let j = layers - layer; j > 0; j--) {
          const cube = new Cube(baseSize, color || getRandomPaletteColor());
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap),
            layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap)
          );
          this.cubes.push(cube);
        }
      }
    }
  }

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

/*
import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';

export class Pyramid {
  constructor(layers, baseSize, gap, color = null) {
    this.cubes = [];
    this.layers = layers;
    this.baseSize = baseSize;
    this.gap = gap;
    this.color = color || getRandomPaletteColor();
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.__createCubes(
      this.layers,
      this.baseSize,
      this.gap,
      this. color
    );
  }

  __createCubes(layers, baseSize, gap, color = null, x = 0, y = 0, z = 0){
    this.x = x;
    this.y = y;
    this.z = z;
    for (let layer = x; layer < layers; layer++) {
      for (let i = y; i < layers - layer; i++) {
        for (let j = z; j < layers - layer; j++) {
          const cubeColor = color || getRandomPaletteColor();
          const cube = new Cube(baseSize, cubeColor);
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap),
            layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap)
          );
          this.cubes.push(cube);
        }
      }
    }
  }

  addToScene(scene) {
    this.cubes.forEach((cube) => scene.add(cube.mesh));
  }

  removeFromScene(scene) {
    this.cubes.forEach((cube) => scene.remove(cube.mesh));
    this.cubes = [];
  }

  setPosition(scene, x, y, z) {
    this.removeFromScene(scene);
    this.__createCubes(
      this.layers,
      this.baseSize,
      this.gap,
      this. color,
      x,
      y,
      z
    );
  }

}
*/

/*
import { Cube } from './cube.js';

export class Pyramid {
  constructor(layers, baseSize, gap, color) {
    this.cubes = [];
    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < layers - layer; i++) {
        for (let j = 0; j < layers - layer; j++) {
          const cube = new Cube(baseSize, color);
          cube.setPosition(
            (i - (layers - layer) / 2) * (baseSize + gap),
            layer * (baseSize + gap),
            (j - (layers - layer) / 2) * (baseSize + gap)
          );
          this.cubes.push(cube);
        }
      }
    }
  }

  addToScene(scene) {
    this.cubes.forEach((cube) => scene.add(cube.mesh));
  }
}*/
