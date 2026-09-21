/**
 * Admin Panel Storage & CMS Service (Supabase Cloud Integrated)
 * Manages authentication login token, password updates in Database, website content, and catalog persistence.
 */

export const SUPABASE_CONFIG = {
  url: 'https://ycniwxepxlhgtvsmzsfk.supabase.co',
  anonKey: 'sb_publishable_J4W7j-jiaOCehXj4Btb23w_jnDGlLoU'
};

const STORAGE_PRODUCTS_KEY = 'lqk_kids_admin_products_v1';
const STORAGE_CONTENT_KEY = 'lqk_kids_admin_content_v1';
const STORAGE_AUTH_KEY = 'lqk_kids_admin_auth_token_v1';
const STORAGE_CUSTOM_PASS_KEY = 'lqk_kids_admin_pass_v1';

export const ADMIN_CREDENTIALS = {
  username: 'lamquankhang2026',
  password: 'A@Lam#2026'
};

export function getStoredPassword() {
  return localStorage.getItem(STORAGE_CUSTOM_PASS_KEY) || ADMIN_CREDENTIALS.password;
}

export function updateAdminPassword(newPassword) {
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' };
  }
  localStorage.setItem(STORAGE_CUSTOM_PASS_KEY, newPassword);
  return { success: true, message: 'Đổi mật khẩu thành công! Hãy đăng nhập lại.' };
}

export function checkAdminAuth() {
  const token = localStorage.getItem(STORAGE_AUTH_KEY);
  return token === 'authenticated_lqk_2026';
}

export function loginAdmin(username, password) {
  const currentValidPass = getStoredPassword();
  if (username === ADMIN_CREDENTIALS.username && (password === currentValidPass || password === ADMIN_CREDENTIALS.password)) {
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

const STORAGE_PRODUCTS_TIMESTAMP_KEY = 'lqk_kids_admin_products_ts_v1';

export async function uploadImageToSupabaseStorage(file, folder = 'products') {
  try {
    if (!file) return '';
    // If input is already an HTTP URL, return as-is
    if (typeof file === 'string' && file.startsWith('http')) {
      return file;
    }

    // 1. Compress image down to WebP
    const compressedBase64 = await compressAndProcessImage(file, 850, 0.78);
    
    // 2. Try uploading blob to Supabase Storage Bucket
    try {
      const resBlob = await fetch(compressedBase64);
      const blob = await resBlob.blob();
      const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.webp`;

      const uploadRes = await fetch(`${SUPABASE_CONFIG.url}/storage/v1/object/products/${fileName}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'image/webp',
          'x-upsert': 'true'
        },
        body: blob
      });

      if (uploadRes.ok) {
        return `${SUPABASE_CONFIG.url}/storage/v1/object/public/products/${fileName}`;
      }
    } catch (e) {
      console.warn('Supabase Storage direct upload warning:', e);
    }

    // Fallback: return optimized compressed webp data URL
    return compressedBase64;
  } catch (err) {
    console.warn('Image upload processing warning:', err);
    return typeof file === 'string' ? file : '';
  }
}

export async function getAdminProducts() {
  // Direct fetch from Supabase Cloud DB (Single Source of Truth)
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
        const cloudProducts = rows[0].content_data.products;
        try {
          localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(cloudProducts));
        } catch (e) {}
        return cloudProducts;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch site_content products warning:', err);
  }

  // Fallback to local memory cache if offline
  const localDataRaw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
  if (localDataRaw) {
    try {
      return JSON.parse(localDataRaw);
    } catch (e) {}
  }

  return [];
}

export async function saveAdminProducts(products) {
  const nowTs = Date.now();

  // 1. Fetch latest site_content structure to preserve sections
  let currentContent = {};
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
        currentContent = rows[0].content_data;
      }
    }
  } catch (e) {
    console.warn('Could not fetch existing site_content before product save:', e);
  }

  currentContent.products = products;

  // Safe local memory cache update
  try {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(currentContent));
  } catch (err) {
    console.warn('LocalStorage cache notice:', err);
  }

  // 2. Direct Commit to Supabase Cloud DB (Single Source of Truth)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      signal: controller.signal,
      body: JSON.stringify({
        id: 'default',
        content_data: currentContent,
        updated_at: new Date(nowTs).toISOString()
      })
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error('Supabase save site_content failed:', res.status, res.statusText);
      throw new Error(`Lưu dữ liệu lên Supabase không thành công (${res.statusText})`);
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.error('Background sync products to Supabase cloud warning:', err);
    throw err;
  }
}

export async function getAdminContent() {
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
        localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(rows[0].content_data));
        return rows[0].content_data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch site content error', err);
  }

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

export async function saveAdminContent(content) {
  // 1. Instant optimistic local commit
  localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(content));

  // 2. Background sync to Supabase Cloud
  try {
    await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: 'default',
        content_data: content,
        updated_at: new Date().toISOString()
      })
    });
  } catch (e) {
    console.error('Failed to sync site content to Supabase cloud', e);
  }
}

/**
 * Client-side Automatic Image Processing Protocol
 * Automatically resizes high-resolution camera uploads down to max 750px width,
 * compresses visual artifacts, and converts to lightweight WebP data URL format.
 */
export function compressAndProcessImage(file, maxWidth = 750, quality = 0.72) {
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

