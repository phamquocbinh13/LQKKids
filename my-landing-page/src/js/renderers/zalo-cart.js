/**
 * Zalo Cart & Checkout View Renderer Module
 * Renders full reactive cart drawer/modal, customer info form, size switcher,
 * HTML order receipt image generator (Lưu order vào ảnh - Lazy loaded), and Zalo fallback ordering.
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
        <p class="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">Không cần thanh toán online! Lưu hóa đơn ảnh đẹp mắt để gửi qua Zalo hoặc copy thông tin nhắn shop.</p>
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
                <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" class="w-full h-full object-cover" />
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

        <!-- Action Buttons Stack -->
        <div class="flex flex-col gap-2 mt-2">
          <!-- Button 1: Save Order as Image -->
          <button type="button" id="download-order-image-btn" class="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:brightness-105 active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[18px]">image</span>
            <span>📸 LƯU ORDER VÀO ẢNH (GỬI ZALO)</span>
          </button>

          <!-- Button 2: Copy Order Text -->
          <button type="button" id="copy-order-text-btn" class="w-full min-h-[40px] px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-bold text-xs flex items-center justify-center gap-2 border border-surface-container-highest hover:bg-surface-container-highest active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[16px]">content_copy</span>
            <span>📋 SAO CHÉP NỘI DUNG ĐƠN HÀNG</span>
          </button>

          <!-- Button 3: Open Zalo App / Web -->
          <button type="submit" class="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[18px]">chat_bubble</span>
            <span>💬 MỞ CHAT ZALO (0934 498 685)</span>
          </button>
        </div>
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

  // 1. Download Order Image Action (Dynamic Import html2canvas on demand)
  const downloadImgBtn = document.getElementById('download-order-image-btn');
  if (downloadImgBtn) {
    downloadImgBtn.addEventListener('click', async () => {
      const info = getFormData();
      if (!info) return;

      downloadImgBtn.disabled = true;
      downloadImgBtn.innerHTML = `
        <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>
        <span>ĐANG TẠO ẢNH HÓA ĐƠN...</span>
      `;

      try {
        // Dynamic import html2canvas library only when clicked
        const { default: html2canvas } = await import('html2canvas');
        await generateAndDownloadReceiptImage(info, html2canvas);
        showToast('Đã lưu ảnh đơn hàng! Hãy đính kèm ảnh này gửi Zalo cho shop nhé 📸');
      } catch (err) {
        console.error('Failed to generate image:', err);
        showToast('Không thể tạo ảnh, vui lòng bấm Copy đơn hàng!');
      } finally {
        downloadImgBtn.disabled = false;
        downloadImgBtn.innerHTML = `
          <span class="material-symbols-outlined text-[18px]">image</span>
          <span>📸 LƯU ORDER VÀO ẢNH (GỬI ZALO)</span>
        `;
      }
    });
  }

  // 2. Copy Order Text Action
  const copyBtn = document.getElementById('copy-order-text-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const info = getFormData();
      if (!info) return;

      const messageText = buildOrderMessage(info);
      navigator.clipboard.writeText(messageText).then(() => {
        showToast('📋 Đã sao chép nội dung đơn hàng! Bố mẹ mở Zalo dán gửi shop nhé.');
      }).catch(() => {
        showToast('Không thể tự động copy. Vui lòng bấm mở Zalo!');
      });
    });
  }

  // 3. Form Zalo Submission
  const checkoutForm = document.getElementById('zalo-checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const info = getFormData();
      if (!info) return;

      const message = buildOrderMessage(info);
      const encodedMsg = encodeURIComponent(message);

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const zaloUrl = isMobile 
        ? `https://zalo.me/${SHOP_ZALO_PHONE}?text=${encodedMsg}`
        : `https://zalo.me/${SHOP_ZALO_PHONE}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).catch(() => {});
      }

      window.open(zaloUrl, '_blank');
      showToast('Đã mở Zalo! Nội dung đơn đã được tự động copy vào bộ nhớ tạm.');
    });
  }
}

function getFormData() {
  const nameEl = document.getElementById('cust-name');
  const phoneEl = document.getElementById('cust-phone');
  const addressEl = document.getElementById('cust-address');
  const noteEl = document.getElementById('cust-note');

  if (!nameEl || !phoneEl || !addressEl) return null;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const address = addressEl.value.trim();
  const note = noteEl ? noteEl.value.trim() : '';

  if (!name || !phone || !address) {
    showToast('Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ nhận hàng!');
    return null;
  }

  return { name, phone, address, note, cart: store.cart, total: store.getCartTotal() };
}

function buildOrderMessage(info) {
  let message = `🛒 *ĐƠN HÀNG LQK KIDS*\n`;
  message += `👤 *Khách hàng:* ${info.name}\n`;
  message += `📞 *SĐT Zalo:* ${info.phone}\n`;
  message += `📍 *Địa chỉ:* ${info.address}\n`;
  if (info.note) message += `📝 *Ghi chú bé:* ${info.note}\n`;
  message += `-------------------------\n`;
  message += `📦 *DANH SÁCH MÓN:* \n`;

  info.cart.forEach((item, idx) => {
    message += `${idx + 1}. ${item.name} (${item.selectedColor}, ${item.selectedSize}) x${item.quantity} = ${(item.price * item.quantity).toLocaleString('vi-VN')}đ\n`;
  });

  message += `-------------------------\n`;
  message += `💰 *TỔNG CỘNG:* ${info.total.toLocaleString('vi-VN')}đ (Freeship)\n`;
  message += `Cảm ơn LQK Kids! Nhờ shop check kho và xác nhận size giúp mình nhé!`;

  return message;
}

/**
 * Creates an offscreen high-resolution receipt card matching website aesthetics and downloads as PNG image
 */
async function generateAndDownloadReceiptImage(info, html2canvas) {
  const receiptContainer = document.createElement('div');
  receiptContainer.style.position = 'absolute';
  receiptContainer.style.top = '-9999px';
  receiptContainer.style.left = '-9999px';
  receiptContainer.style.width = '480px';
  receiptContainer.style.backgroundColor = '#fff8f5';
  receiptContainer.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
  receiptContainer.style.padding = '24px';
  receiptContainer.style.borderRadius = '24px';
  receiptContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';

  const formattedDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  receiptContainer.innerHTML = `
    <div style="background: #ffffff; border-radius: 20px; padding: 20px; border: 1px solid #ffe3d3; color: #27180f;">
      <div style="display: flex; items-center; justify-between; border-bottom: 2px dashed #faddcd; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 800; color: #136299; margin: 0; line-height: 1.2;">LQK KIDS</h2>
          <p style="font-size: 11px; font-weight: 600; color: #785a00; margin: 2px 0 0 0;">THỜI TRANG BÉ YÊU</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10px; font-weight: 700; background: #feca4a; color: #725500; padding: 4px 10px; border-radius: 20px; display: inline-block;">ĐƠN HÀNG ZALO</span>
          <p style="font-size: 10px; color: #717880; margin: 4px 0 0 0;">${formattedDate}</p>
        </div>
      </div>

      <div style="background: #fff1ea; border-radius: 14px; padding: 12px; margin-bottom: 16px; border: 1px solid #ffe3d3;">
        <p style="font-size: 12px; font-weight: 700; color: #136299; margin: 0 0 6px 0; text-transform: uppercase;">THÔNG TIN KHÁCH HÀNG</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Mẹ/Ba:</strong> ${info.name}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>SĐT Zalo:</strong> ${info.phone}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Địa chỉ:</strong> ${info.address}</p>
        ${info.note ? `<p style="font-size: 12px; margin: 2px 0; color: #785a00;"><strong>Ghi chú bé:</strong> ${info.note}</p>` : ''}
      </div>

      <p style="font-size: 12px; font-weight: 700; color: #27180f; margin: 0 0 8px 0; text-transform: uppercase;">CHI TIẾT ĐƠN HÀNG (${info.cart.length} món)</p>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
        ${info.cart.map(item => `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #fff1ea; padding-bottom: 8px;">
            <div style="flex: 1; padding-right: 8px;">
              <p style="font-size: 12px; font-weight: 700; margin: 0; color: #27180f;">${item.name}</p>
              <p style="font-size: 11px; color: #41474f; margin: 2px 0 0 0;">Màu: ${item.selectedColor} | Size: <strong>${item.selectedSize}</strong></p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 12px; font-weight: 700; margin: 0; color: #136299;">x${item.quantity}</p>
              <p style="font-size: 11px; font-weight: 700; color: #27180f; margin: 2px 0 0 0;">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: #cfe5ff; border-radius: 14px; padding: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 13px; font-weight: 700; color: #001d33;">TỔNG CỘNG THANH TOÁN:</span>
        <span style="font-size: 18px; font-weight: 800; color: #136299;">${info.total.toLocaleString('vi-VN')}đ</span>
      </div>

      <div style="text-align: center; font-size: 10px; color: #717880;">
        <p style="margin: 0;">Hotline / Zalo Shop: <strong>0934 498 685</strong> - <strong>0925 333 999</strong></p>
        <p style="margin: 2px 0 0 0;">Địa chỉ: Phố Hoa Lâm, Phường Việt Hưng, Quận Long Biên, Hà Nội</p>
      </div>
    </div>
  `;

  document.body.appendChild(receiptContainer);

  const canvas = await html2canvas(receiptContainer, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#fff8f5'
  });

  document.body.removeChild(receiptContainer);

  const imageURI = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `LQK-Kids-Order-${Date.now()}.png`;
  link.href = imageURI;
  link.click();
}

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-sm text-center px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3000);
}
