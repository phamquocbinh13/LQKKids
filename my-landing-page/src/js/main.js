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
    const [resContent, resProducts] = await Promise.all([
      fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content?id=eq.default&select=*`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Cache-Control': 'no-cache'
        }
      }),
      fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Cache-Control': 'no-cache'
        }
      })
    ]);

    let liveContent = null;
    let liveProducts = [];

    if (resContent.ok) {
      const rows = await resContent.json();
      if (rows && rows.length > 0 && rows[0].content_data) {
        liveContent = rows[0].content_data;
      }
    }

    if (resProducts.ok) {
      const rows = await resProducts.json();
      if (Array.isArray(rows)) {
        liveProducts = rows.map(p => ({
          id: p.id,
          code: p.code || `LQK-${p.id}`,
          name: p.name || '',
          category: p.category || 'be-trai',
          categoryName: p.category_name || p.categoryName || '',
          price: typeof p.price === 'string' ? parseFloat(p.price) : (p.price || 0),
          originalPrice: typeof p.original_price === 'string' ? parseFloat(p.original_price) : (p.original_price || p.originalPrice || 0),
          discount: p.discount || '',
          description: p.description || '',
          badge: p.badge || '',
          badgeColor: p.badge_color || p.badgeColor || 'primary',
          rating: typeof p.rating === 'string' ? parseFloat(p.rating) : (p.rating || 5.0),
          soldCount: p.sold_count !== undefined ? p.sold_count : (p.soldCount || 120),
          images: Array.isArray(p.images) ? p.images : [],
          colors: Array.isArray(p.colors) ? p.colors : [],
          sizes: Array.isArray(p.sizes) ? p.sizes : [],
          sizeOptions: Array.isArray(p.size_options) ? p.size_options : (Array.isArray(p.sizeOptions) ? p.sizeOptions : []),
          createdAt: p.created_at || p.createdAt || new Date().toISOString()
        }));
      }
    }

    if (liveContent) {
      hydrateElements(liveContent);
    }

    // Render live atomic row-level products
    initProductList(liveProducts);
    initProductDetailModal();
    initCartDrawer();
  } catch (err) {
    console.error('Error fetching live data from Supabase DB:', err);
  }
});

