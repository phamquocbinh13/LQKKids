/**
 * Main Application Bootstrapper
 * Loads catalog data (with Admin panel & Supabase Cloud sync), initializes Product List, Detail popup, and Zalo Cart.
 */

import { initContentRenderer } from './modules/content-renderer.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFormHandler } from './modules/form-handler.js';
import { initTikTokPlayer } from './modules/tiktok-player.js';

import { initProductList } from './renderers/product-list.js';
import { initProductDetailModal } from './renderers/product-detail.js';
import { initCartDrawer } from './renderers/zalo-cart.js';

import defaultProductsData from '../data/products.json';

const SUPABASE_CONFIG = {
  url: 'https://ycniwxepxlhgtvsmzsfk.supabase.co',
  anonKey: 'sb_publishable_J4W7j-jiaOCehXj4Btb23w_jnDGlLoU'
};

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Landing Page CMS Text Renderer (Supabase + LocalStorage)
  await initContentRenderer();

  // 2. Initialize Navigation & Smooth Scroll
  initMobileMenu();

  // 3. Initialize Size Form Handler
  initFormHandler();

  // 4. Initialize Interactive TikTok Shorts Player
  initTikTokPlayer();

  // 5. Fetch Products Catalog (Supabase Cloud DB -> LocalStorage Cache -> Bundled JSON Fallback)
  try {
    let products = null;

    // A. Try Supabase Cloud Database (Real-time products saved from Admin)
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?select=*`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          products = rows;
          localStorage.setItem('lqk_kids_admin_products_v1', JSON.stringify(products));
        }
      }
    } catch (err) {
      console.warn('Supabase products fetch warning:', err);
    }

    // B. Try LocalStorage Cache
    if (!products) {
      const adminProducts = localStorage.getItem('lqk_kids_admin_products_v1');
      if (adminProducts) {
        try {
          products = JSON.parse(adminProducts);
        } catch (e) {
          console.error('Failed to parse admin products cache', e);
        }
      }
    }

    // C. Bundled Default Fallback (Guaranteed to work 100% on Vercel & Mobile)
    if (!products || products.length === 0) {
      products = defaultProductsData;
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

