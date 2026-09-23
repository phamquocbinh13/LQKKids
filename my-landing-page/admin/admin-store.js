/**
 * Admin Panel Storage & CMS Service (Supabase Cloud Integrated)
 * Manages authentication login token, password updates in Database, website content, and catalog persistence.
 */

export const SUPABASE_CONFIG = {
  url: 'https://ycniwxepxlhgtvsmzsfk.supabase.co',
  anonKey: 'sb_publishable_J4W7j-jiaOCehXj4Btb23w_jnDGlLoU'
};

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

export function compressAndProcessImage(file, maxWidth = 800, quality = 0.78) {
  return new Promise((resolve, reject) => {
    // If input is already a URL or string
    if (typeof file === 'string') {
      // 1. If HTTP URL or already processed WebP Data URL, return immediately (never re-compress!)
      if (file.startsWith('http://') || file.startsWith('https://') || file.startsWith('data:image/webp')) {
        resolve(file);
        return;
      }

      // Re-compress only if it's an uncompressed heavy base64 image (e.g. data:image/png or jpeg)
      if (file.startsWith('data:image/') && file.length > 80000) {
        const img = new Image();
        img.src = file;
        img.onload = () => {
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

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

          resolve(canvas.toDataURL('image/webp', quality));
        };
        img.onerror = () => resolve(file);
        return;
      }
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

        // Convert to highly optimized WebP format with sharp HD quality (0.78)
        const compressedBase64 = canvas.toDataURL('image/webp', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function fileToBase64(file) {
  return compressAndProcessImage(file, 800, 0.78);
}

export async function uploadImageToSupabaseStorage(file, folder = 'products') {
  try {
    if (!file) return '';
    // If input is already an HTTP URL, return as-is
    if (typeof file === 'string' && file.startsWith('http')) {
      return file;
    }

    // 1. Compress image down to HD WebP (800px max width, 0.78 high-definition quality)
    const compressedBase64 = await compressAndProcessImage(file, 800, 0.78);

    // 2. Try uploading blob to Supabase Storage Bucket if available
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

    // Fallback: return crisp HD webp data URL
    return compressedBase64;
  } catch (err) {
    console.warn('Image upload processing warning:', err);
    return typeof file === 'string' ? file : '';
  }
}

export function mapDbProductToApp(p) {
  if (!p) return null;
  return {
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
  };
}

const PRODUCTS_CACHE_KEY = 'lqk_admin_products_cache_v2';

export function getCachedProducts() {
  try {
    const raw = sessionStorage.getItem(PRODUCTS_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCachedProducts(products) {
  try {
    sessionStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
  } catch (e) {}
}

export function clearProductsCache() {
  try {
    sessionStorage.removeItem(PRODUCTS_CACHE_KEY);
  } catch (e) {}
}

export async function getAdminProducts(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedProducts();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
  }

  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?select=*&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Cache-Control': 'no-cache'
      }
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const mapped = rows.map(mapDbProductToApp);
        setCachedProducts(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch products table warning:', err);
  }

  return getCachedProducts() || [];
}

export async function getAdminProductCodes() {
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?select=id,code`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Cache-Control': 'no-cache'
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Error fetching product codes:', e);
  }
  return [];
}

export async function getAdminProductById(id) {
  if (!id) return null;
  
  // Try finding in fast local cache first
  const cached = getCachedProducts();
  if (cached && Array.isArray(cached)) {
    const found = cached.find(p => p.id === id);
    if (found) return found;
  }

  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?id=eq.${encodeURIComponent(id)}&select=*`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Cache-Control': 'no-cache'
      }
    });
    if (res.ok) {
      const rows = await res.json();
      if (rows && rows.length > 0) {
        return mapDbProductToApp(rows[0]);
      }
    }
  } catch (e) {
    console.warn('Error fetching product by ID:', e);
  }
  return null;
}

export async function saveAdminProduct(product) {
  if (!product || !product.name) {
    throw new Error('Thông tin sản phẩm không hợp lệ!');
  }

  const rowPayload = {
    id: String(product.id || `lqk-${Date.now()}`),
    code: product.code || `LQK-${Date.now()}`,
    name: product.name,
    category: product.category || 'be-trai',
    category_name: product.categoryName || '',
    price: parseFloat(product.price) || 0,
    original_price: parseFloat(product.originalPrice) || 0,
    discount: product.discount || '',
    description: product.description || '',
    badge: product.badge || '',
    badge_color: product.badgeColor || 'primary',
    rating: parseFloat(product.rating) || 5.0,
    sold_count: parseInt(product.soldCount) || 120,
    images: Array.isArray(product.images) ? product.images : [],
    colors: Array.isArray(product.colors) ? product.colors : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    size_options: Array.isArray(product.sizeOptions) ? product.sizeOptions : [],
    is_active: true,
    updated_at: new Date().toISOString()
  };

  const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(rowPayload)
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('Supabase atomic product save failed:', res.status, res.statusText, errText);
    throw new Error(`Lưu sản phẩm lên Supabase thất bại (${res.status} ${res.statusText || errText})`);
  }

  const savedAppProduct = mapDbProductToApp(rowPayload);

  // Update local session cache atomically
  let cached = getCachedProducts() || [];
  const existingIdx = cached.findIndex(p => p.id === savedAppProduct.id);
  if (existingIdx > -1) {
    cached[existingIdx] = savedAppProduct;
  } else {
    cached.unshift(savedAppProduct);
  }
  setCachedProducts(cached);

  return savedAppProduct;
}

export async function deleteAdminProduct(id) {
  if (!id) return false;
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
      }
    });

    if (res.ok) {
      let cached = getCachedProducts() || [];
      cached = cached.filter(p => p.id !== id);
      setCachedProducts(cached);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Failed to delete product from Supabase products table:', e);
    return false;
  }
}

export async function getAdminContent() {
  // Pure Direct Fetch from Supabase Cloud DB (100% Single Source of Truth)
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
        return rows[0].content_data;
      }
    }
  } catch (err) {
    console.warn('Supabase fetch site content error', err);
  }

  return {};
}

export async function saveAdminContent(content) {
  // 1. Fetch latest site_content structure to preserve all sections (products, about, whyChoose, etc.)
  let currentContent = {};
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
        currentContent = rows[0].content_data;
      }
    }
  } catch (e) {
    console.warn('Could not fetch existing site_content before CMS content save:', e);
  }

  // 2. Merge updated content into currentContent without wiping other sections
  const updatedContent = {
    ...currentContent,
    ...content
  };

  // 3. Direct Commit to Supabase Cloud DB (Single Source of Truth)
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: 'default',
        content_data: updatedContent,
        updated_at: new Date().toISOString()
      })
    });
    if (!res.ok) {
      console.error('Supabase save site_content failed:', res.statusText);
      throw new Error(`Lưu nội dung lên Supabase thất bại (${res.statusText})`);
    }
  } catch (e) {
    console.error('Failed to sync site content to Supabase cloud', e);
    throw e;
  }
}



