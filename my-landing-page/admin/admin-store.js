/**
 * Admin Panel Storage & CMS Service
 * Manages authentication login token, website content, link configurations, and product catalog persistence.
 */

const STORAGE_PRODUCTS_KEY = 'lqk_kids_admin_products_v1';
const STORAGE_CONTENT_KEY = 'lqk_kids_admin_content_v1';
const STORAGE_AUTH_KEY = 'lqk_kids_admin_auth_token_v1';

export const ADMIN_CREDENTIALS = {
  username: 'lamquankhang2026',
  password: 'A@Lam#2026'
};

export function checkAdminAuth() {
  const token = localStorage.getItem(STORAGE_AUTH_KEY);
  return token === 'authenticated_lqk_2026';
}

export function loginAdmin(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(STORAGE_AUTH_KEY, 'authenticated_lqk_2026');
    return true;
  }
  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(STORAGE_AUTH_KEY);
  window.location.href = 'login.html';
}

export function requireAdminAuth() {
  if (!checkAdminAuth()) {
    window.location.href = 'login.html';
  }
}

export async function getAdminProducts() {
  const localData = localStorage.getItem(STORAGE_PRODUCTS_KEY);
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error('Error parsing admin products from localStorage', e);
    }
  }

  try {
    const res = await fetch('../src/data/products.json');
    const defaultProducts = await res.json();
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  } catch (e) {
    console.error('Error fetching default products.json', e);
    return [];
  }
}

export function saveAdminProducts(products) {
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
}

export async function getAdminContent() {
  const localData = localStorage.getItem(STORAGE_CONTENT_KEY);
  if (localData) {
    try {
      return JSON.parse(localData);
    } catch (e) {
      console.error('Error parsing admin content from localStorage', e);
    }
  }

  try {
    const res = await fetch('../src/data/content.json');
    const defaultContent = await res.json();
    localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(defaultContent));
    return defaultContent;
  } catch (e) {
    console.error('Error fetching default content.json', e);
    return {};
  }
}

export function saveAdminContent(content) {
  localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(content));
}

/**
 * Client-side Automatic Image Processing Protocol
 * Automatically resizes high-resolution camera uploads down to max 1000px,
 * compresses visual artifacts, and converts to lightweight WebP data URL format.
 */
export function compressAndProcessImage(file, maxWidth = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    // If input is already a string URL or data URL
    if (typeof file === 'string') {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate responsive scaling aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to highly optimized WebP format (or fall back to JPEG if WebP unsupported)
        const compressedBase64 = canvas.toDataURL('image/webp', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function fileToBase64(file) {
  return compressAndProcessImage(file);
}
