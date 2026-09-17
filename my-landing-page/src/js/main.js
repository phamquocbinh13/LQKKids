/**
 * Main Application Bootstrapper
 * Loads dynamic catalog JSON, initializes Product List, Product Detail popup, and Zalo Cart flow.
 */

import { initContentRenderer } from './modules/content-renderer.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFormHandler } from './modules/form-handler.js';

import { initProductList } from './renderers/product-list.js';
import { initProductDetailModal } from './renderers/product-detail.js';
import { initCartDrawer } from './renderers/zalo-cart.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Landing Page CMS Text Renderer
  await initContentRenderer();

  // 2. Initialize Navigation & Smooth Scroll
  initMobileMenu();

  // 3. Initialize Size Form Handler
  initFormHandler();

  // 4. Fetch Products JSON & Render Catalog
  try {
    const res = await fetch('./src/data/products.json');
    if (!res.ok) throw new Error('Failed to load products.json');
    const products = await res.json();

    // Render Catalog Grid
    initProductList(products);

    // Initialize Detail Modal
    initProductDetailModal();

    // Initialize Zalo Cart Drawer & Reactive State
    initCartDrawer();

  } catch (error) {
    console.error('App initialization error:', error);
  }
});
