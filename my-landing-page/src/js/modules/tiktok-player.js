/**
 * TikTok & Local Video Player Module with Lazy Hover Preview
 * Features:
 * 1. Ultra-fast initial page load: Loads 0 video bytes initially (only lightweight WebP/JPG posters).
 * 2. Hover / Touch Preview: Lazily plays muted preview video loop on hover/touch without blocking page load.
 * 3. Fullscreen Lightbox Modal: Full HD audio playback on click for MP4 videos.
 * 4. TikTok API Ready: Seamlessly hooks into TikTok Display API when keys are configured.
 */

export function initTikTokPlayer() {
  const cards = document.querySelectorAll('.tiktok-card');
  if (!cards || cards.length === 0) return;

  const modal = document.getElementById('video-lightbox-modal');
  const overlay = document.getElementById('video-lightbox-overlay');
  const closeBtn = document.getElementById('video-lightbox-close');
  const player = document.getElementById('video-lightbox-player');
  const modalTitle = document.getElementById('video-lightbox-title');
  const modalCta = document.getElementById('video-lightbox-cta');

  cards.forEach(card => {
    const previewVideo = card.querySelector('.card-preview-video');

    // 1. Mouse Hover Preview (Desktop & Tablet)
    card.addEventListener('mouseenter', () => {
      const rawUrl = card.getAttribute('data-tiktok-url');
      if (previewVideo && isDirectVideoFile(rawUrl)) {
        if (!previewVideo.src) {
          previewVideo.src = rawUrl;
        }
        previewVideo.classList.remove('hidden');
        previewVideo.play().catch(() => {});
      }
    });

    card.addEventListener('mouseleave', () => {
      if (previewVideo && !previewVideo.paused) {
        previewVideo.pause();
        previewVideo.classList.add('hidden');
      }
    });

    // 2. Click Handler (Modal or TikTok external link)
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const rawUrl = card.getAttribute('data-tiktok-url') || 'https://www.tiktok.com/@LQKKIDS';
      const titleBadge = card.querySelector('[data-cms$=".title"], span.rounded-full');
      const titleText = titleBadge ? titleBadge.textContent.trim() : 'Video Thực Tế LQK Kids';

      if (isDirectVideoFile(rawUrl)) {
        if (modal && player) {
          player.src = rawUrl;
          if (modalTitle) modalTitle.textContent = titleText;
          if (modalCta) modalCta.href = 'https://www.tiktok.com/@LQKKIDS';
          modal.classList.remove('hidden');
          player.play().catch(() => {});
        }
      } else {
        window.open(rawUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // Modal Controls
  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
    if (player) {
      player.pause();
      player.src = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Future TikTok API Sync Check
  checkAndSyncTikTokAPI(cards);
}

/**
 * Utility to detect direct video file extensions
 */
function isDirectVideoFile(url) {
  if (!url) return false;
  const cleanUrl = url.toLowerCase().split('?')[0];
  return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.mov') || cleanUrl.includes('/assets/videos/');
}

/**
 * FUTURE TIKTOK DEVELOPER API INTEGRATION
 * When you get TikTok App Client Key & Access Token:
 * Call `syncTikTokFeedFromAPI({ clientKey: '...', accessToken: '...' })`
 */
export async function syncTikTokFeedFromAPI({ clientKey, accessToken, cards }) {
  if (!clientKey || !accessToken) return;

  try {
    const response = await fetch('https://open.tiktokapis.com/v2/video/list/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_count: 4,
        fields: ['id', 'title', 'cover_image_url', 'share_url']
      })
    });

    if (!response.ok) throw new Error(`TikTok API error: ${response.status}`);
    const data = await response.json();
    const videos = data.data?.videos || [];

    if (videos.length === 0) return;

    const targetCards = cards || document.querySelectorAll('.tiktok-card');
    videos.forEach((video, index) => {
      if (index >= targetCards.length) return;
      const card = targetCards[index];

      if (video.share_url) card.setAttribute('data-tiktok-url', video.share_url);
      if (video.cover_image_url) {
        const img = card.querySelector('img');
        if (img) img.src = video.cover_image_url;
      }
      if (video.title) {
        const badge = card.querySelector('[data-cms$=".title"], span.rounded-full');
        if (badge) badge.textContent = video.title.substring(0, 20);
      }
    });

    console.log('[TikTok Developer API] Synchronized latest videos successfully.');
  } catch (error) {
    console.warn('[TikTok API] Sync skipped / error:', error.message);
  }
}

function checkAndSyncTikTokAPI(cards) {
  // Configurable from localStorage or window config in future
  const clientKey = localStorage.getItem('lqk_tiktok_client_key');
  const accessToken = localStorage.getItem('lqk_tiktok_access_token');
  if (clientKey && accessToken) {
    syncTikTokFeedFromAPI({ clientKey, accessToken, cards });
  }
}





