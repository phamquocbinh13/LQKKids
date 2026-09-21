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

  // 5. Fetch Products Catalog directly from Supabase Cloud DB
  try {
    let products = [];

    // A. Fetch from Supabase site_content store with cache-busting timestamp
    try {
      const resContent = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content?id=eq.default&select=*&_t=${Date.now()}`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Cache-Control': 'no-cache'
        }
      });
      if (resContent.ok) {
        const rows = await resContent.json();
        if (rows && rows.length > 0 && rows[0].content_data && Array.isArray(rows[0].content_data.products)) {
          products = rows[0].content_data.products;
          localStorage.setItem('lqk_kids_admin_products_v1', JSON.stringify(products));
        }
      }
    } catch (e) {
      console.warn('Supabase fetch site_content products warning', e);
    }

    // B. Fetch from Supabase standalone products table if site_content product list is empty
    if (!products || products.length === 0) {
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
          }
        }
      } catch (e) {
        console.warn('Supabase fetch products warning', e);
      }
    }

    // C. Check localStorage fallback if network is offline or empty
    if (!products || products.length === 0) {
      const localProd = localStorage.getItem('lqk_kids_admin_products_v1');
      if (localProd) {
        try {
          products = JSON.parse(localProd);
        } catch (e) {
          console.error('Failed to parse local products fallback', e);
        }
      }
    }

    // Render Catalog Grid with exact DB Products
    initProductList(products);

    // Initialize Detail Modal
    initProductDetailModal();

    // Initialize Zalo Cart Drawer & Reactive State
    initCartDrawer();

  } catch (error) {
    console.error('App database initialization error:', error);
  }
});

