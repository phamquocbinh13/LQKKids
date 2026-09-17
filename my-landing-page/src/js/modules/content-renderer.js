/**
 * Content Renderer Module
 * Reads data from content.json (or Admin LocalStorage overrides) and dynamically hydrates the DOM using `data-cms` attributes.
 */

export async function initContentRenderer() {
  try {
    let data = null;

    // Check if Admin overridden content exists in LocalStorage
    const adminContent = localStorage.getItem('lqk_kids_admin_content_v1');
    if (adminContent) {
      try {
        data = JSON.parse(adminContent);
      } catch (e) {
        console.error('Failed to parse admin content', e);
      }
    }

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
}
