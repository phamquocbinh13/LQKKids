/**
 * Product Detail Modal & View Renderer Module
 * Displays detailed product info, size option chart image modal, color choice, and cart operations.
 */

import { store } from '../store.js';

let currentProduct = null;
let selectedSize = '';
let selectedColor = '';
let currentQuantity = 1;

export function initProductDetailModal() {
  const modalCloseBtn = document.getElementById('product-modal-close');
  const modalOverlay = document.getElementById('product-modal-overlay');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductDetail);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProductDetail();
    });
  }

  // Size chart modal close events
  const sizeChartModal = document.getElementById('size-chart-modal');
  const sizeChartClose = document.getElementById('size-chart-modal-close');
  const sizeChartOverlay = document.getElementById('size-chart-modal-overlay');

  if (sizeChartClose) {
    sizeChartClose.addEventListener('click', () => sizeChartModal.classList.add('hidden'));
  }
  if (sizeChartOverlay) {
    sizeChartOverlay.addEventListener('click', () => sizeChartModal.classList.add('hidden'));
  }
}

export function openProductDetail(product) {
  currentProduct = product;
  selectedSize = product.sizeOptions?.[0]?.size || '';
  selectedColor = product.colors?.[0] || '';
  currentQuantity = 1;

  renderModalContent();

  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

export function closeProductDetail() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function renderModalContent() {
  const container = document.getElementById('product-modal-body');
  if (!container || !currentProduct) return;

  const formattedPrice = currentProduct.price.toLocaleString('vi-VN') + 'đ';
  const formattedOriginalPrice = currentProduct.originalPrice ? currentProduct.originalPrice.toLocaleString('vi-VN') + 'đ' : '';

  container.innerHTML = `
    <!-- Top Live Banner -->
    <a href="https://www.tiktok.com/@LQKKIDS" target="_blank" rel="noopener" class="px-4 py-2.5 bg-gradient-to-r from-error-container via-surface-container-high to-secondary-fixed rounded-2xl shadow-xs flex items-center justify-between transition-transform active:scale-98">
      <div class="flex items-center gap-2 min-w-0">
        <span class="relative flex h-3 w-3 shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-error"></span>
        </span>
        <span class="text-xs font-bold text-on-error-container truncate">
          🔴 Đang Live tư vấn mẫu này trên TikTok
        </span>
      </div>
      <span class="shrink-0 text-[11px] font-bold text-on-surface bg-surface-container-lowest/90 px-2.5 py-1 rounded-full flex items-center gap-0.5">
        Xem Live
        <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </span>
    </a>

    <!-- Product Image Carousel Container -->
    <div id="detail-main-image-wrapper" class="relative w-full aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden shadow-sm group touch-pan-y select-none">
      <img id="detail-main-image" src="${currentProduct.images[0]}" alt="${currentProduct.name}" class="w-full h-full object-cover transition-opacity duration-200" />
      
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span class="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-extrabold rounded-full shadow-xs flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          ${currentProduct.badge}
        </span>
        ${currentProduct.discount ? `
          <span class="px-2.5 py-0.5 bg-tertiary text-on-tertiary text-[11px] font-bold rounded-full shadow-xs w-fit">
            ${currentProduct.discount} HÔM NAY
          </span>
        ` : ''}
      </div>

      ${currentProduct.images.length > 1 ? `
        <!-- Chevron Navigation Arrows -->
        <button type="button" id="prev-detail-img-btn" aria-label="Ảnh trước" class="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest/85 text-on-surface backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all shadow-md z-10 active:scale-90">
          <span class="material-symbols-outlined text-[22px]">chevron_left</span>
        </button>
        <button type="button" id="next-detail-img-btn" aria-label="Ảnh tiếp theo" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container-lowest/85 text-on-surface backdrop-blur-md flex items-center justify-center opacity-80 hover:opacity-100 transition-all shadow-md z-10 active:scale-90">
          <span class="material-symbols-outlined text-[22px]">chevron_right</span>
        </button>

        <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-white text-[11px] font-extrabold backdrop-blur-md border border-white/20 shadow-xs flex items-center gap-1 z-10 pointer-events-none">
          <span class="material-symbols-outlined text-[13px]">photo_library</span>
          <span id="detail-img-counter-text">1/${currentProduct.images.length}</span>
        </span>
      ` : ''}
    </div>

    <!-- Thumbnails Gallery -->
    ${currentProduct.images.length > 1 ? `
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        ${currentProduct.images.map((img, idx) => `
          <button data-img="${img}" data-idx="${idx}" class="detail-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${idx === 0 ? 'border-primary ring-2 ring-primary/30' : 'border-transparent opacity-70'}">
            <img src="${img}" class="w-full h-full object-cover" />
          </button>
        `).join('')}
      </div>
    ` : ''}

    <!-- Title & Pricing Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-base sm:text-lg font-extrabold text-on-surface leading-snug">${currentProduct.name}</h2>
        <span class="text-xs font-bold text-outline shrink-0">Mã: ${currentProduct.code}</span>
      </div>

      <div class="flex items-baseline gap-2.5 mt-1">
        <span class="text-2xl font-extrabold text-primary tracking-tight">${formattedPrice}</span>
        ${formattedOriginalPrice ? `<span class="text-xs text-outline line-through">${formattedOriginalPrice}</span>` : ''}
        <span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold rounded-full">Tiết kiệm 45k</span>
      </div>

      <div class="flex items-center gap-3 pt-2 border-t border-surface-container-low text-xs text-on-surface-variant">
        <div class="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full text-secondary">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">star</span>
          <span class="font-bold">${currentProduct.rating}</span>
        </div>
        <span>•</span>
        <span class="font-semibold text-on-surface">Đã bán ${String(currentProduct.soldCount || 120).endsWith('+') ? currentProduct.soldCount : currentProduct.soldCount + '+'}</span>
        <span>•</span>
        <span class="text-tertiary font-bold flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[14px]">inventory_2</span> Sẵn kho
        </span>
      </div>
    </div>

    <!-- Color Selector -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2.5">
      <label class="text-xs font-bold text-on-surface">Màu sắc: <span id="selected-color-label" class="text-primary font-normal">${selectedColor}</span></label>
      <div class="flex flex-wrap gap-2">
        ${currentProduct.colors.map(color => `
          <button data-color="${color}" class="color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${color === selectedColor ? 'bg-primary text-on-primary border-primary shadow-xs' : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'}">
            ${color}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Size Options Selector & Inline Size Chart Image -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
      <label class="text-xs font-bold text-on-surface">Kích thước (Size cho bé):</label>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${currentProduct.sizeOptions.map(opt => `
          <button data-size="${opt.size}" class="size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${opt.size === selectedSize ? 'bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary' : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'}">
            <span class="text-xs font-extrabold">${opt.size}</span>
            <span class="text-[11px] opacity-90">${opt.weight}</span>
          </button>
        `).join('')}
      </div>

      <!-- Direct Size Chart Image Preview -->
      <div class="mt-2 pt-3 border-t border-surface-container-high/50 flex flex-col gap-2">
        <div class="flex items-center gap-1.5 text-xs font-bold text-primary">
          <span class="material-symbols-outlined text-[18px]">straighten</span>
          <span>Bảng Size Chuẩn LQK Kids:</span>
        </div>
        <div class="w-full rounded-2xl overflow-hidden bg-surface-container-low border border-surface-container-high shadow-xs">
          <img src="./assets/images/size-chart.jpg" data-cms-img="site.sizeChart" alt="Bảng Size Quần Áo Trẻ Em LQK Kids" class="w-full h-auto object-contain" />
        </div>
      </div>
    </div>

    <!-- Description Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <h3 class="text-xs font-bold text-on-surface uppercase tracking-wider">Mô tả sản phẩm</h3>
      <div class="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line font-normal">${currentProduct.description}</div>
    </div>

    <!-- Bottom Actions Stack -->
    <div class="pt-2 flex items-center gap-3">
      <div class="flex items-center bg-surface-container-low rounded-full px-3 py-2 border border-surface-container-high">
        <button id="qty-minus" class="w-7 h-7 flex items-center justify-center text-on-surface font-bold text-lg hover:text-primary active:scale-90">-</button>
        <span id="qty-display" class="w-8 text-center font-bold text-xs">${currentQuantity}</span>
        <button id="qty-plus" class="w-7 h-7 flex items-center justify-center text-on-surface font-bold text-lg hover:text-primary active:scale-90">+</button>
      </div>

      <button id="add-to-cart-modal-btn" class="flex-1 h-12 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-98 transition-all">
        <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
        <span>THÊM VÀO GIỎ HÀNG</span>
      </button>

      <button id="order-now-zalo-btn" class="flex-1 h-12 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-105 active:scale-98 transition-all">
        <span class="material-symbols-outlined text-[18px]">chat_bubble</span>
        <span>ĐẶT ZALO NGAY</span>
      </button>
    </div>
  `;

  setupModalInteractions();
}

function setupModalInteractions() {
  const container = document.getElementById('product-modal-body');
  if (!container) return;

  // Size chart modal view
  const openSizeChartBtn = document.getElementById('open-size-chart-btn');
  if (openSizeChartBtn) {
    openSizeChartBtn.addEventListener('click', () => {
      const sizeChartModal = document.getElementById('size-chart-modal');
      if (sizeChartModal) sizeChartModal.classList.remove('hidden');
    });
  }

  let currentImgIdx = 0;

  function setDetailImageIndex(idx) {
    if (!currentProduct || !currentProduct.images || currentProduct.images.length === 0) return;
    if (idx < 0) idx = currentProduct.images.length - 1;
    if (idx >= currentProduct.images.length) idx = 0;

    currentImgIdx = idx;
    const mainImg = document.getElementById('detail-main-image');
    if (mainImg) mainImg.src = currentProduct.images[idx];

    const counterText = document.getElementById('detail-img-counter-text');
    if (counterText) counterText.textContent = `${idx + 1}/${currentProduct.images.length}`;

    container.querySelectorAll('.detail-thumb-btn').forEach(b => {
      const bIdx = parseInt(b.getAttribute('data-idx'));
      if (bIdx === idx) {
        b.classList.remove('border-transparent', 'opacity-70');
        b.classList.add('border-primary', 'ring-2', 'ring-primary/30');
        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        b.classList.remove('border-primary', 'ring-2', 'ring-primary/30');
        b.classList.add('border-transparent', 'opacity-70');
      }
    });
  }

  // Thumbnails click
  container.querySelectorAll('.detail-thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx')) || 0;
      setDetailImageIndex(idx);
    });
  });

  // Touch Swipe & Chevron Navigation
  const imgWrapper = document.getElementById('detail-main-image-wrapper');
  if (imgWrapper && currentProduct && currentProduct.images && currentProduct.images.length > 1) {
    let touchStartX = 0;
    let touchEndX = 0;

    imgWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imgWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 35) {
        if (diff < 0) {
          setDetailImageIndex(currentImgIdx + 1); // Next image
        } else {
          setDetailImageIndex(currentImgIdx - 1); // Previous image
        }
      }
    }, { passive: true });

    const prevBtn = document.getElementById('prev-detail-img-btn');
    const nextBtn = document.getElementById('next-detail-img-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setDetailImageIndex(currentImgIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setDetailImageIndex(currentImgIdx + 1);
      });
    }
  }

  // Colors
  container.querySelectorAll('.color-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedColor = btn.getAttribute('data-color');
      const colorLabel = document.getElementById('selected-color-label');
      if (colorLabel) colorLabel.textContent = selectedColor;

      container.querySelectorAll('.color-option-btn').forEach(b => {
        b.className = `color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
          b.getAttribute('data-color') === selectedColor
            ? 'bg-primary text-on-primary border-primary shadow-xs'
            : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
        }`;
      });
    });
  });

  // Sizes
  container.querySelectorAll('.size-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSize = btn.getAttribute('data-size');
      container.querySelectorAll('.size-option-btn').forEach(b => {
        const isSelected = b.getAttribute('data-size') === selectedSize;
        b.className = `size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
          isSelected 
            ? 'bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary'
            : 'bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container'
        }`;
      });
    });
  });

  // Stepper
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyDisplay = document.getElementById('qty-display');

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener('click', () => {
      if (currentQuantity > 1) {
        currentQuantity--;
        qtyDisplay.textContent = currentQuantity;
      }
    });
    qtyPlus.addEventListener('click', () => {
      currentQuantity++;
      qtyDisplay.textContent = currentQuantity;
    });
  }

  // Add to cart
  const addToCartBtn = document.getElementById('add-to-cart-modal-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      store.addToCart(currentProduct, selectedSize, selectedColor, currentQuantity);
      closeProductDetail();
      showToast('Đã thêm sản phẩm vào giỏ hàng!');
    });
  }

  // Order Zalo
  const orderZaloBtn = document.getElementById('order-now-zalo-btn');
  if (orderZaloBtn) {
    orderZaloBtn.addEventListener('click', () => {
      store.addToCart(currentProduct, selectedSize, selectedColor, currentQuantity);
      closeProductDetail();
      const cartDrawer = document.getElementById('cart-drawer');
      if (cartDrawer) cartDrawer.classList.remove('hidden');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2200);
}
