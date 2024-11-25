// src/utils/colors.js

// Generate a random hex color
export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Predefined palette of colors
  export const predefinedColors = [
    '#FF5733', // Vibrant orange
    '#33FF57', // Bright green
    '#3357FF', // Bold blue
    '#F5B041', // Golden yellow
    '#8E44AD', // Purple
    '#E74C3C', // Red
    '#1ABC9C', // Cyan
    '#2ECC71', // Emerald green
    '#3498DB', // Sky blue
    '#9B59B6', // Violet
  ];
  
  // Get a random color from the predefined palette
  export function getRandomPaletteColor() {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  }
  
  // Example: Blend two colors (linear interpolation)
  export function blendColors(color1, color2, ratio) {
    const hex = (color) =>
      color
        .replace('#', '')
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    const [r1, g1, b1] = hex(color1);
    const [r2, g2, b2] = hex(color2);
    const r = Math.round(r1 + ratio * (r2 - r1));
    const g = Math.round(g1 + ratio * (g2 - g1));
    const b = Math.round(b1 + ratio * (b2 - b1));
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
  }
  