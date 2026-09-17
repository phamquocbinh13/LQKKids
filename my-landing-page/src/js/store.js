/**
 * Global Cart & App Reactive State Manager
 * Handles local Storage persistence, item manipulation, size selection & modal state listeners.
 */

const STORAGE_KEY = 'lqk_kids_cart_v1';

class StoreManager {
  constructor() {
    this.cart = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
      this.notifyListeners();
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.cart); // Immediate initial call
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.cart));
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  addToCart(product, selectedSize = '', selectedColor = '', quantity = 1) {
    const size = selectedSize || (product.sizeOptions?.[0]?.size || 'Chưa chọn size');
    const color = selectedColor || (product.colors?.[0] || 'Mặc định');

    const existingIndex = this.cart.findIndex(
      item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        selectedSize: size,
        selectedColor: color,
        quantity: quantity
      });
    }

    this.saveCart();
  }

  updateQuantity(index, newQty) {
    if (newQty <= 0) {
      this.removeFromCart(index);
      return;
    }
    if (this.cart[index]) {
      this.cart[index].quantity = newQty;
      this.saveCart();
    }
  }

  updateSize(index, newSize) {
    if (this.cart[index]) {
      this.cart[index].selectedSize = newSize;
      this.saveCart();
    }
  }

  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}

export const store = new StoreManager();
