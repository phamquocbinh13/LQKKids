/**
 * Content Renderer Module
 * Hydrates DOM elements dynamically using `data-cms` attributes from live DB data.
 */

export function hydrateElements(data) {
  if (!data) return;

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
      if (keyPath === 'hero.image') {
        const container = document.getElementById('hero-banner-container');
        if (container) container.classList.remove('hidden');
        const skeleton = document.getElementById('hero-banner-skeleton');
        if (skeleton) skeleton.remove();
      } else if (keyPath === 'popup.image') {
        const imgContainer = document.getElementById('zalo-popup-image-container');
        if (imgContainer) imgContainer.classList.remove('hidden');
      }
    } else {
      if (keyPath === 'hero.image') {
        const container = document.getElementById('hero-banner-container');
        if (container) container.classList.add('hidden');
        const skeleton = document.getElementById('hero-banner-skeleton');
        if (skeleton) skeleton.remove();
      } else if (keyPath === 'popup.image') {
        const imgContainer = document.getElementById('zalo-popup-image-container');
        if (imgContainer) imgContainer.classList.add('hidden');
      }
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

  // Initialize 30-second Popup trigger
  initZaloPromoPopup();
}

function initZaloPromoPopup() {
  const modal = document.getElementById('zalo-popup-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('zalo-popup-close');
  const dismissBtn = document.getElementById('zalo-popup-dismiss');
  const overlay = document.getElementById('zalo-popup-overlay');

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Trigger popup after exactly 30 seconds (30,000ms)
  setTimeout(() => {
    modal.classList.remove('hidden');
  }, 30000);
}
