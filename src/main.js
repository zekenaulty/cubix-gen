
// src/main.js
import { App } from './app.js';
import './components/styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  // Get the container element
  const container = document.getElementById('app');

  // Initialize the App
  const app = new App(container);
});
