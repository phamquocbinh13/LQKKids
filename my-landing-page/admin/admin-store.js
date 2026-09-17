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

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
