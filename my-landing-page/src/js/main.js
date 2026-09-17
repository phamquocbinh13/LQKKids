/**
 * Main Application Bootstrapper
 * Loads catalog data (with Admin panel overrides), initializes Product List, Detail popup, and Zalo Cart.
 */

import { initContentRenderer } from './modules/content-renderer.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFormHandler } from './modules/form-handler.js';
import { initTikTokPlayer } from './modules/tiktok-player.js';

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

  // 4. Initialize Interactive TikTok Shorts Player
  initTikTokPlayer();

  // 4. Fetch Products JSON & Render Catalog (Check Admin Overrides)
  try {
    let products = null;
    const adminProducts = localStorage.getItem('lqk_kids_admin_products_v1');
    if (adminProducts) {
      try {
        products = JSON.parse(adminProducts);
      } catch (e) {
        console.error('Failed to parse admin products', e);
      }
    }

    if (!products) {
      const res = await fetch('./src/data/products.json');
      if (!res.ok) throw new Error('Failed to load products.json');
      products = await res.json();
    }

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
