# Cubix Gen

Vite + Three.js playground for building voxel-style geometry. The default scene renders an instanced binary-tree fractal; there are also experiments for turning bitmaps into fields of cubes and a small catalog of reusable shape builders.

## What’s inside
- Three.js stage wrapper with orbit controls and an instanced mesh manager for efficient cube placement (`src/stage.js`, `src/components/instancedMeshManager.js`).
- Binary tree fractal built from instanced cubes (`src/app.js`, `src/components/2D/fractals/binaryTreeFractal.js`).
- Shape factory covering common primitives (cube, sphere, cylinder, cone, torus, torus knot, dodecahedron, icosahedron, octahedron, tetrahedron) in `src/components`.
- Bitmap-to-cube prototypes that read pixel data from an upload service (`src/bitmap.main.js`, `src/bitmap.ii.main.js`, `src/components/imageUploader.js`, `server.js`).
- Texture assets for experimentation (`src/components/assets/cube`).

## Prerequisites
- Node.js 18+ (required by Sharp).
- npm 9+ recommended.

## Getting started
1. Install dependencies: `npm install`
2. Start the Vite dev server: `npm run dev`
3. Open the URL Vite prints (defaults to http://localhost:3000) and use the mouse to orbit/zoom the scene.

## Build and deploy
- Production build: `npm run build`
- Preview the built bundle: `npm run preview`
- Publish to GitHub Pages: `npm run deploy` (outputs to `dist/` before pushing).

## Image upload service
- Run the helper API that downsizes images and returns pixel colors: `node server.js` (defaults to port 3000).
- Upload endpoint: `POST /upload?scale=0.5` with a multipart field named `image`; response shape is `{ pixelColors, width, height }`.
- Update the base URL in `src/components/imageUploader.js` to match the port you run the server on.

## Working with the experiments
- The default entry (`src/main.js`) boots `App`, which renders the binary-tree fractal with instanced boxes.
- To try the bitmap voxelizers, temporarily point `index.html`’s script tag to `./src/bitmap.main.js` or `./src/bitmap.ii.main.js` instead of `./src/main.js`.
- Shape creation flows through `ShapeFactory`, making it easy to swap primitives or add your own variants.
