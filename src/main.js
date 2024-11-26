/*
document.querySelector('#app').innerHTML = `
  <div>

  </div>
`;
*/
// src/main.js
import { App } from './app.js';
import './components/styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  // Get the container element
  const container = document.getElementById('app');

  // Initialize the App
  new App(container);
});
