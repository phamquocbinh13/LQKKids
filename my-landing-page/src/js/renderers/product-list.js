/**
 * Product List Renderer Module
 * Handles category tab filtering, search, dynamic grid rendering, and progressive pagination.
 */

import { openProductDetail } from './product-detail.js';

let allProducts = [];
let currentCategory = 'all';
let currentPage = 1;
const PAGE_SIZE = 8; // Render initial 8 products for ultra-fast LCP & INP

export function initProductList(products) {
  allProducts = products;
  renderCategoryTabs();
  filterAndRenderGrid();
  setupSearchAndSort();
}

function renderCategoryTabs() {
  const tabsContainer = document.getElementById('category-tabs');
  if (!tabsContainer) return;

  const categories = [
    { id: 'all', label: 'Tất cả', icon: 'widgets' },
    { id: 'be-trai', label: 'Bé Trai', icon: 'boy', color: 'text-primary' },
    { id: 'be-gai', label: 'Bé Gái', icon: 'girl', color: 'text-secondary' },
    { id: 'set', label: 'Set Đồ', icon: 'checkroom', color: 'text-tertiary' },
    { id: 'phu-kien', label: 'Phụ Kiện', icon: 'shopping_basket', color: 'text-primary-container' }
  ];

  tabsContainer.innerHTML = categories.map(cat => {
    const isActive = currentCategory === cat.id;
    return `
      <button 
        data-category="${cat.id}"
        class="category-tab-btn shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-bold transition-all active:scale-95 ${
          isActive 
            ? 'bg-secondary-container text-on-secondary-container shadow-xs' 
            : 'bg-surface-container-low hover:bg-surface-container text-on-surface font-medium'
        }"
      >
        <span class="material-symbols-outlined text-[18px] ${cat.color || ''}">${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `;
  }).join('');

  tabsContainer.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      currentPage = 1; // reset pagination on filter change
      renderCategoryTabs();
      filterAndRenderGrid();
    });
  });
}

function setupSearchAndSort() {
  const searchInput = document.getElementById('catalog-search-input');
  const clearBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentPage = 1;
      filterAndRenderGrid();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentPage = 1;
      filterAndRenderGrid();
    });
  }
}

function filterAndRenderGrid() {
  const searchInput = document.getElementById('catalog-search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = allProducts.filter(p => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  renderGrid(filtered);
}

function renderGrid(products) {
  const gridContainer = document.getElementById('product-grid');
  const countBadge = document.getElementById('product-count-badge');

  if (countBadge) {
    countBadge.textContent = `${products.length} sản phẩm`;
  }

  if (!gridContainer) return;

  if (products.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <p class="text-sm font-bold text-on-surface">Không tìm thấy sản phẩm phù hợp</p>
        <p class="text-xs text-on-surface-variant mt-1">Vui lòng thử chọn danh mục khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    `;
    removeLoadMoreButton();
    return;
  }

  // Progressive rendering slice
  const paginatedProducts = products.slice(0, currentPage * PAGE_SIZE);

  gridContainer.innerHTML = paginatedProducts.map((product, idx) => {
    const formattedPrice = product.price.toLocaleString('vi-VN') + 'đ';
    const formattedOriginalPrice = product.originalPrice ? product.originalPrice.toLocaleString('vi-VN') + 'đ' : '';

    // First 4 cards load eager, remainder load lazy for fast LCP
    const isEager = idx < 4;

    return `
      <article class="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container-high/40 group transition-all duration-300 hover:shadow-md">
        <div class="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden cursor-pointer product-card-trigger" data-id="${product.id}">
          <img 
            src="${product.images[0]}" 
            alt="${product.name} LQK Kids - Thời trang trẻ em" 
            loading="${isEager ? 'eager' : 'lazy'}" 
            decoding="async" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          />
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span class="px-2.5 py-0.5 rounded-full bg-${product.badgeColor === 'error' ? 'error-container text-on-error-container' : product.badgeColor === 'tertiary' ? 'tertiary-fixed text-on-tertiary-fixed' : 'secondary-container text-on-secondary-container'} text-[11px] font-extrabold shadow-xs">
              ${product.badge}
            </span>
          </div>
          <button 
            aria-label="Thêm vào yêu thích ${product.name}" 
            class="wishlist-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-xs active:scale-90"
            onclick="event.stopPropagation(); this.classList.toggle('text-error');"
          >
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        </div>

        <div class="p-3 flex flex-col flex-1 justify-between gap-2">
          <div class="flex flex-col cursor-pointer product-card-trigger" data-id="${product.id}">
            <h3 class="text-xs sm:text-sm font-bold leading-snug text-on-surface line-clamp-2 hover:text-primary transition-colors">
              ${product.name}
            </h3>
            <div class="flex items-center gap-1 mt-1 text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px] text-secondary-container" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="text-xs font-bold text-on-surface">${product.rating}</span>
              <span class="text-[11px] text-outline">• ${product.soldCount} đã bán</span>
            </div>
          </div>

          <div class="pt-1 flex flex-col gap-2">
            <div class="flex items-baseline gap-1.5 flex-wrap">
              <span class="text-sm sm:text-base text-primary font-extrabold">${formattedPrice}</span>
              ${formattedOriginalPrice ? `<span class="text-[11px] text-outline line-through">${formattedOriginalPrice}</span>` : ''}
            </div>
            <button 
              data-id="${product.id}"
              class="quick-add-btn w-full h-8 rounded-full bg-primary-fixed hover:bg-primary-container text-on-primary-container text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <span class="material-symbols-outlined text-[15px]">add</span>
              <span>Xem size & Chọn mua</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Handle Load More Button
  if (paginatedProducts.length < products.length) {
    renderLoadMoreButton(() => {
      currentPage++;
      renderGrid(products);
    });
  } else {
    removeLoadMoreButton();
  }

  // Attach card click handlers
  gridContainer.querySelectorAll('.product-card-trigger, .quick-add-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.getAttribute('data-id');
      const product = allProducts.find(p => p.id === id);
      if (product) openProductDetail(product);
    });
  });
}

function renderLoadMoreButton(onClick) {
  let loadMoreWrapper = document.getElementById('load-more-wrapper');
  if (!loadMoreWrapper) {
    const catalogSection = document.getElementById('catalog-section');
    loadMoreWrapper = document.createElement('div');
    loadMoreWrapper.id = 'load-more-wrapper';
    loadMoreWrapper.className = 'mt-6 flex justify-center';
    catalogSection.appendChild(loadMoreWrapper);
  }

  loadMoreWrapper.innerHTML = `
    <button id="load-more-btn" class="px-6 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95">
      <span class="material-symbols-outlined text-[18px]">expand_more</span>
      <span>Xem Thêm Sản Phẩm Khác</span>
    </button>
  `;

  document.getElementById('load-more-btn').addEventListener('click', onClick);
}

function removeLoadMoreButton() {
  const wrapper = document.getElementById('load-more-wrapper');
  if (wrapper) wrapper.remove();
}
