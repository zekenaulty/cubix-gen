/*
document.querySelector('#app').innerHTML = `
  <div>

  </div>
`;
*/
// src/main.js
import { App } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get the container element
  const container = document.getElementById('app');

  // Initialize the App
  new App(container);
});
