import * as THREE from 'three';
import { Cube } from './cube.js';
import { getRandomPaletteColor } from '../utils/colors.js';
import { ShapeFactory } from './shapeFactory.js';
export class Diamond {
  constructor(layers, baseSize, gap, color = null, texture = null, shape = 'Cube') {


    this.cornerColor = 0xffffff; //getRandomPaletteColor();
    this.borderColor = 0xf0f0f0;//0xc6c6c6; //getRandomPaletteColor();
    this.innerColor = getRandomPaletteColor();
    this.texture = texture;
    this.shape= shape;

    this.cubes = [];
    this.cubeLayers = [];

    this.group = new THREE.Group(); // Initialize the group
    this.shapeFactory = new ShapeFactory();
    this.topPyramid = [];
    this.leftPyramid = [];
    this.rightPyramid = [];
    this.bottomPyramid = [];

    this.layers = layers; // Number of layers in the upper half (excluding the middle layer)
    this.baseSize = baseSize;
    this.gap = gap;
    this.color = color || getRandomPaletteColor();
    this.__createCubes();
    this.__outerBorder();
    this.__createCubesInverse();
    this.__findBorders();
    this.cubes.forEach((cube) => {
      cube.size = cube.positionType == 'inner' ? 20 : 20;
      //cube.opacity = cube.isCorner ? 0.75 : cube.isBorder ? 0.45 : cube.opacity;
      cube.color = cube.isCorner ? this.cornerColor : cube.isBorder ? this.borderColor : this.innerColor;
    });
  }

  __newCube(cubesInLayer, i, j, layer, layers, baseSize, color, isCenterLayer = false) {
    const cube = this.shapeFactory.getShape(
      this.shape,
      {
        size: 20,
        color: getRandomPaletteColor(),
        texture: this.texture,
        positionType: 'inner'
      });
    cube.opacity = 0;
    return cube;
  }

  __fadeCubes(cubes, startingColor = '#336699') {
    const gridSize = Math.ceil(Math.sqrt(cubes.length));
    if (gridSize * gridSize !== cubes.length) {
      throw new Error("The number of cubes must form a perfect square grid.");
    }

    // Function to lighten a color
    function lightenColor(color, factor) {
      const [r, g, b] = color.match(/\w\w/g).map(hex => parseInt(hex, 16));
      const lighten = (channel) => Math.min(255, Math.floor(channel + (255 - channel) * factor));
      const newColor = [r, g, b].map(lighten);
      return `#${newColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    }

    function calculateOpacity(row, col, gridSize) {
      const center = (gridSize - 1) / 2;
      const distance = Math.sqrt((row - center) ** 2 + (col - center) ** 2);
      const maxDistance = Math.sqrt(center ** 2 + center ** 2);
      const normalizedDistance = distance / maxDistance; // Value between 0 and 1
      return 0.85 - normalizedDistance * (0.85 - 0.2); // Linearly interpolate between 0.85 and 0.2
    }
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    // Place cubes and assign colors for nested squares
    const lightenFactor = 0.2; // Adjust to control color lightening between layers
    let currentColor = startingColor;
    let layer = 0;

    while (layer < Math.ceil(gridSize / 2)) {
      // Assign cubes for the current layer
      for (let i = layer; i < gridSize - layer; i++) {
        for (let j = layer; j < gridSize - layer; j++) {
          const index = i * gridSize + j;
          cubes[index].color = currentColor;
          cubes[index].opacity = calculateOpacity(i, j, gridSize);
        }
      }

      // Move to the next inner layer and lighten the color
      layer++;
      currentColor = lightenColor(currentColor, lightenFactor);
    }

    /* 
        // Assign border and corner properties for each cube
        for (let i = 0; i < cubes.length; i++) {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
    
            const isTopRow = row === 0;
            const isBottomRow = row === gridSize - 1;
            const isLeftCol = col === 0;
            const isRightCol = col === gridSize - 1;
    
            cubes[i].isBorder = isTopRow || isBottomRow || isLeftCol || isRightCol;
            cubes[i].isCorner = (isTopRow && isLeftCol) || (isTopRow && isRightCol) ||
                                (isBottomRow && isLeftCol) || (isBottomRow && isRightCol);
        }
         */
  }

  __findBorders() {
    this.cubeLayers.forEach((layer) => {
      this.__fadeCubes(layer, '#cc00ff');
      this.__findBorder(layer);
    });
  }
  __findBorder(cubes) {
    const gridSize = Math.ceil(Math.sqrt(cubes.length));
    for (let i = 0; i < cubes.length; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const isTopRow = row === 0;
      const isBottomRow = row === gridSize - 1;
      const isLeftCol = col === 0;
      const isRightCol = col === gridSize - 1;
      cubes[i].isBorder = isTopRow || isBottomRow || isLeftCol || isRightCol;
      cubes[i].isCorner = (isTopRow && isLeftCol) || (isTopRow && isRightCol) || (isBottomRow && isLeftCol) || (isBottomRow && isRightCol);
      cubes[i].positionType = cubes[i].isCorner ? 'corner' : cubes[i].isBorder ? 'border' : 'inner';
    }
  }

  __createCubes() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = 0; layer < layers; layer++) {
      const cubesInLayer = layers - layer;
      const layersIndex = this.cubeLayers.length;
      this.cubeLayers.push([]);

      for (let i = 0; i < cubesInLayer; i++) {
        for (let j = 0; j < cubesInLayer; j++) {
          const cube = this.__newCube(cubesInLayer, i, j, layer, layers, baseSize, color);
          cube.setPosition(
            (i - (cubesInLayer - 1) / 2) * (baseSize + gap) - 1,
            layer * (baseSize + gap),
            (j - (cubesInLayer - 1) / 2) * (baseSize + gap) + 1
          );
          this.cubes.push(cube);
          this.cubeLayers[layersIndex].push(cube);
          this.group.add(cube.mesh);
        }
      }
    }
  }

  __outerBorder() {
    let { layers, baseSize, gap, color } = { ...this };
    baseSize += 1;
    layers++;
    const layer = 0;
    const cubesInLayer = layers - layer;
    const layersIndex = this.cubeLayers.length;
    this.cubeLayers.push([]);
    for (let i = 0; i < cubesInLayer; i++) {
      for (let j = 0; j < cubesInLayer; j++) {
        const cube = this.__newCube(cubesInLayer, i, j, layer, layers, baseSize, color, true);
        cube.positionType = 'inner';
        cube.setPosition(
          (i - (cubesInLayer - 1) / 2) * (baseSize + gap),
          -(baseSize + gap) / 2,
          (j - (cubesInLayer - 1) / 2) * (baseSize + gap)
        );
        this.cubes.push(cube);
        this.cubeLayers[layersIndex].push(cube);
        this.group.add(cube.mesh);
      }
    }
  }


  __createCubesInverse() {
    const { layers, baseSize, gap, color } = this;

    for (let layer = layers + 1; layer > -1; layer--) {
      if (layer === 0) continue;
      const layersIndex = this.cubeLayers.length;
      this.cubeLayers.push([]);
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
          this.cubeLayers[layersIndex].push(cube);
          this.group.add(cube.mesh);
        }
      }
    }
  }


  addToScene(scene) {
    scene.add(this.group); // Add the group to the scene
  }

  removeFromScene(scene) {
    scene.remove(this.group); // Remove the group from the scene
  }

  setPosition(x, y, z) {
    this.group.position.set(x, y, z); // Set the position of the group
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
  /*
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
     */
}
