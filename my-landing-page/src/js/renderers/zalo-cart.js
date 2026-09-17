/**
 * Zalo Cart & Checkout View Renderer Module
 * Renders full reactive cart drawer/modal, customer info form, size switcher, and Zalo deep-link redirect.
 */

import { store } from '../store.js';

const SHOP_ZALO_PHONE = '0934498685';

export function initCartDrawer() {
  const closeBtn = document.getElementById('cart-drawer-close');
  const overlay = document.getElementById('cart-drawer-overlay');
  const cartTriggerBtns = document.querySelectorAll('.cart-trigger-btn');

  cartTriggerBtns.forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  // Subscribe renderer to store updates
  store.subscribe(renderCartContent);
}

export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function renderCartContent(cart) {
  // Update header badges
  const badges = document.querySelectorAll('.cart-counter-badge');
  const count = store.getCartCount();

  badges.forEach(b => {
    b.textContent = count;
    if (count > 0) {
      b.classList.remove('hidden');
    } else {
      b.classList.add('hidden');
    }
  });

  const cartContainer = document.getElementById('cart-drawer-items');
  const cartFooter = document.getElementById('cart-drawer-footer');
  const cartCountText = document.getElementById('cart-items-count-text');

  if (cartCountText) {
    cartCountText.textContent = `${count} món`;
  }

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-5xl text-outline mb-3">shopping_bag</span>
        <p class="text-sm font-bold text-on-surface">Giỏ hàng của bé đang trống</p>
        <p class="text-xs text-on-surface-variant mt-1 max-w-xs">Hãy chọn những bộ trang phục thật đẹp cho bé yêu nhé!</p>
      </div>
    `;
    if (cartFooter) cartFooter.classList.add('hidden');
    return;
  }

  if (cartFooter) cartFooter.classList.remove('hidden');

  const total = store.getCartTotal();
  const formattedTotal = total.toLocaleString('vi-VN') + 'đ';

  cartContainer.innerHTML = `
    <!-- Top Notice Banner -->
    <div class="bg-surface-container-low p-3.5 rounded-2xl flex items-start gap-3 border border-secondary-container/40 mb-4">
      <span class="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-on-surface">Tư vấn & Đặt hàng trực tiếp qua Zalo</p>
        <p class="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">Không cần thanh toán online! Giá niêm yết rõ ràng, LQK Kids xác nhận size chuẩn và giao hàng tận nơi cho mẹ.</p>
      </div>
    </div>

    <!-- Items List -->
    <div class="flex flex-col gap-3">
      ${cart.map((item, idx) => {
        const itemTotal = (item.price * item.quantity).toLocaleString('vi-VN') + 'đ';
        const formattedPrice = item.price.toLocaleString('vi-VN') + 'đ';

        return `
          <div class="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
            <div class="flex gap-3">
              <div class="w-20 h-20 rounded-xl bg-surface-container-low shrink-0 overflow-hidden relative border border-surface-container-high/40">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
                <span class="absolute bottom-1 left-1 bg-surface-container-lowest/90 px-1 py-0.2 rounded font-mono text-[9px] text-on-surface-variant font-bold">${item.code || 'LQK'}</span>
              </div>

              <div class="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="text-xs font-bold text-on-surface truncate">${item.name}</h4>
                    <button data-index="${idx}" class="remove-cart-item-btn text-outline hover:text-error p-0.5 -mr-1">
                      <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Màu: ${item.selectedColor}</p>
                </div>

                <div class="flex items-baseline justify-between mt-1">
                  <span class="text-xs font-bold text-primary">${formattedPrice}</span>
                  <span class="text-xs font-extrabold text-on-surface">${itemTotal}</span>
                </div>
              </div>
            </div>

            <!-- Size Badge & Stepper Row -->
            <div class="bg-surface-container-low/70 p-2 rounded-xl flex items-center justify-between gap-2 border border-surface-container-high/30">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="material-symbols-outlined text-tertiary text-[16px] shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="text-xs font-bold text-on-tertiary-container truncate">${item.selectedSize}</span>
              </div>

              <div class="flex items-center bg-surface-container-lowest rounded-full px-2 py-0.5 shadow-xs border border-surface-container-high/40 shrink-0">
                <button data-index="${idx}" data-qty="${item.quantity - 1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">-</button>
                <span class="w-5 text-center text-xs font-bold">${item.quantity}</span>
                <button data-index="${idx}" data-qty="${item.quantity + 1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">+</button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Total Price Summary Box -->
    <div class="mt-4 p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Tạm tính hàng:</span>
        <span class="font-bold text-on-surface">${formattedTotal}</span>
      </div>
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Phí vận chuyển:</span>
        <span class="font-bold text-tertiary">Freeship / Tư vấn Zalo</span>
      </div>
      <div class="pt-2 border-t border-surface-container-low flex items-center justify-between">
        <span class="text-sm font-bold text-on-surface">Tổng cộng thanh toán:</span>
        <span class="text-xl font-extrabold text-primary">${formattedTotal}</span>
      </div>
    </div>

    <!-- Customer Shipping Info Form -->
    <div class="mt-4 p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
      <h3 class="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
        Thông tin giao hàng cho bé
      </h3>

      <form id="zalo-checkout-form" class="flex flex-col gap-2.5">
        <div>
          <label class="block text-[11px] font-bold text-on-surface mb-1">Tên của mẹ / ba (*)</label>
          <input type="text" id="cust-name" placeholder="Ví dụ: Chị Lan" required class="w-full h-9 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label class="block text-[11px] font-bold text-on-surface mb-1">Số điện thoại dùng Zalo (*)</label>
          <input type="tel" id="cust-phone" placeholder="Ví dụ: 0934498685" required class="w-full h-9 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label class="block text-[11px] font-bold text-on-surface mb-1">Địa chỉ nhận hàng (*)</label>
          <input type="text" id="cust-address" placeholder="Số nhà, tên đường, phường/xã, quận/huyện..." required class="w-full h-9 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <div>
          <label class="block text-[11px] font-bold text-on-surface mb-1">Ghi chú (Cân nặng & Chiều cao của bé)</label>
          <input type="text" id="cust-note" placeholder="Ví dụ: Bé trai 3 tuổi, 15kg, 95cm tư vấn thêm size" class="w-full h-9 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <button type="submit" class="w-full min-h-[48px] mt-2 px-4 py-3 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-98 transition-all">
          <span class="material-symbols-outlined text-[20px]">chat_bubble</span>
          <span>GỬI ĐƠN HÀNG QUA ZALO NGAY</span>
        </button>
      </form>
    </div>
  `;

  // Attach Cart item button events
  setupCartItemEvents(cartContainer);
}

function setupCartItemEvents(container) {
  // Remove item
  container.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      store.removeFromCart(idx);
    });
  });

  // Quantity updates
  container.querySelectorAll('.update-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      const qty = parseInt(btn.getAttribute('data-qty'));
      store.updateQuantity(idx, qty);
    });
  });

  // Form Zalo submission
  const checkoutForm = document.getElementById('zalo-checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cust-name').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const address = document.getElementById('cust-address').value.trim();
      const note = document.getElementById('cust-note').value.trim();

      const cart = store.cart;
      if (cart.length === 0) return;

      // Construct formatted Zalo message
      let message = `🛒 *ĐƠN HÀNG LQK KIDS*\n`;
      message += `👤 *Khách hàng:* ${name}\n`;
      message += `📞 *SĐT Zalo:* ${phone}\n`;
      message += `📍 *Địa chỉ:* ${address}\n`;
      if (note) message += `📝 *Ghi chú bé:* ${note}\n`;
      message += `-------------------------\n`;
      message += `📦 *DANH SÁCH MÓN:* \n`;

      cart.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} = ${(item.price * item.quantity).toLocaleString('vi-VN')}đ\n`;
      });

      message += `-------------------------\n`;
      message += `💰 *TỔNG CỘNG:* ${store.getCartTotal().toLocaleString('vi-VN')}đ (Freeship)\n`;
      message += `Cảm ơn LQK Kids! Nhờ shop check kho và xác nhận size giúp mình nhé!`;

      // Format Zalo Web URL
      const encodedMsg = encodeURIComponent(message);
      const zaloUrl = `https://zalo.me/${SHOP_ZALO_PHONE}?text=${encodedMsg}`;

      // Open Zalo chat directly
      window.open(zaloUrl, '_blank');
    });
  }
}
