/**
 * Content Renderer Module
 * Reads data from content.json and dynamically hydrates the DOM using `data-cms` attributes.
 */

export async function initContentRenderer() {
  try {
    const response = await fetch('./src/data/content.json');
    if (!response.ok) {
      throw new Error(`Failed to load content.json: ${response.statusText}`);
    }
    const data = await response.json();
    
    hydrateElements(data);
    return data;
  } catch (error) {
    console.error('Content rendering error:', error);
  }
}

/**
 * Utility function to access nested object properties using dot notation
 * e.g., getNestedValue(data, "hero.headline")
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : null;
  }, obj);
}

/**
 * Hydrates DOM elements based on `data-cms` attributes
 */
function hydrateElements(data) {
  // 1. Text Content Hydration
  const textElements = document.querySelectorAll('[data-cms]');
  textElements.forEach(el => {
    const keyPath = el.getAttribute('data-cms');
    const value = getNestedValue(data, keyPath);
    if (value !== null && typeof value === 'string') {
      el.textContent = value;
    }
  });

  // 2. Image Src Hydration
  const imageElements = document.querySelectorAll('[data-cms-img]');
  imageElements.forEach(img => {
    const keyPath = img.getAttribute('data-cms-img');
    const value = getNestedValue(data, keyPath);
    if (value) {
      img.src = value;
    }
  });

  // 3. Link Href Hydration
  const linkElements = document.querySelectorAll('[data-cms-href]');
  linkElements.forEach(link => {
    const keyPath = link.getAttribute('data-cms-href');
    const value = getNestedValue(data, keyPath);
    if (value) {
      link.href = value;
    }
  });
}
