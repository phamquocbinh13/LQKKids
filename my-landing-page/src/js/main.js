import { inject } from '@vercel/analytics';
import { hydrateElements } from './modules/content-renderer.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFormHandler } from './modules/form-handler.js';
import { initTikTokPlayer } from './modules/tiktok-player.js';

import { initProductList } from './renderers/product-list.js';
import { initProductDetailModal } from './renderers/product-detail.js';
import { initCartDrawer } from './renderers/zalo-cart.js';

// Auto-inject Vercel Web Analytics tracking script
inject();

const SUPABASE_CONFIG = {
  url: 'https://ycniwxepxlhgtvsmzsfk.supabase.co',
  anonKey: 'sb_publishable_J4W7j-jiaOCehXj4Btb23w_jnDGlLoU'
};

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize UI Interactions
  initMobileMenu();
  initFormHandler();
  initTikTokPlayer();

  // 2. Pure Direct Fetch from Supabase Cloud DB (100% Single Source of Truth)
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content?id=eq.default&select=*`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Cache-Control': 'no-cache'
      }
    });

    if (res.ok) {
      const rows = await res.json();
      if (rows && rows.length > 0 && rows[0].content_data) {
        const liveData = rows[0].content_data;

        // Render 100% live DB data instantly
        hydrateElements(liveData);
        if (Array.isArray(liveData.products)) {
          initProductList(liveData.products);
          initProductDetailModal();
          initCartDrawer();
        }
      }
    } else {
      console.error('Supabase DB fetch failed with status:', res.status);
    }
  } catch (err) {
    console.error('Error fetching live data from Supabase DB:', err);
  }
});

