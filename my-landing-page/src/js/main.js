/**
 * Main Entry Script
 * Imports all modules and bootstraps the landing page application.
 */

import { initContentRenderer } from './modules/content-renderer.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFormHandler } from './modules/form-handler.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Content Renderer (Loads content.json & hydrates DOM)
  await initContentRenderer();

  // 2. Initialize Navigation & Scroll Handlers
  initMobileMenu();

  // 3. Initialize Form Handlers
  initFormHandler();
});
