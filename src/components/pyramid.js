import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';

export class Pyramid {
  constructor(layers, baseSize, gap, color = null) {
    this.cubes = [];
    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < layers - layer; i++) {
        for (let j = 0; j < layers - layer; j++) {
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
}

/*import { Cube } from './cube.js';

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
