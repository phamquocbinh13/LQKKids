/**
 * Content Renderer Module
 * Reads data from content.json (or Admin LocalStorage overrides) and dynamically hydrates the DOM using `data-cms` attributes.
 */

const SUPABASE_CONFIG = {
  url: 'https://ycniwxepxlhgtvsmzsfk.supabase.co',
  anonKey: 'sb_publishable_J4W7j-jiaOCehXj4Btb23w_jnDGlLoU'
};

export async function initContentRenderer() {
  try {
    let data = null;

    // 1. Try Supabase cloud content
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content?id=eq.default&select=*`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].content_data) {
          data = rows[0].content_data;
          localStorage.setItem('lqk_kids_admin_content_v1', JSON.stringify(data));
        }
      }
    } catch (err) {
      console.warn('Supabase fetch site_content warning', err);
    }

    // 2. Check LocalStorage fallback
    if (!data) {
      const adminContent = localStorage.getItem('lqk_kids_admin_content_v1');
      if (adminContent) {
        try {
          data = JSON.parse(adminContent);
        } catch (e) {
          console.error('Failed to parse admin content', e);
        }
      }
    }

    // 3. Fallback to static content.json
    if (!data) {
      const response = await fetch('./src/data/content.json');
      if (!response.ok) {
        throw new Error(`Failed to load content.json: ${response.statusText}`);
      }
      data = await response.json();
    }
    
    hydrateElements(data);
    return data;
  } catch (error) {
    console.error('Content rendering error:', error);
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : null;
  }, obj);
}

function hydrateElements(data) {
  const textElements = document.querySelectorAll('[data-cms]');
  textElements.forEach(el => {
    const keyPath = el.getAttribute('data-cms');
    const value = getNestedValue(data, keyPath);
    if (value !== null && typeof value === 'string') {
      el.textContent = value;
    }
  });

  const imageElements = document.querySelectorAll('[data-cms-img]');
  imageElements.forEach(img => {
    const keyPath = img.getAttribute('data-cms-img');
    const value = getNestedValue(data, keyPath);
    if (value) {
      img.src = value;
    }
  });

  const linkElements = document.querySelectorAll('[data-cms-href]');
  linkElements.forEach(link => {
    const keyPath = link.getAttribute('data-cms-href');
    const value = getNestedValue(data, keyPath);
    if (value) {
      link.href = value;
    }
  });

  // Hydrate TikTok Video URLs for cards if present in CMS
  if (data.realImages && Array.isArray(data.realImages.gallery)) {
    data.realImages.gallery.forEach((item, idx) => {
      const card = document.querySelector(`.tiktok-card[data-tiktok-card="${idx}"]`);
      if (card && item.videoUrl) {
        card.setAttribute('data-tiktok-url', item.videoUrl);
      }
    });
  }
}
