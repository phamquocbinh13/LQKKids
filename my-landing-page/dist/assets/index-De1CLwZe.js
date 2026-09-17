(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();async function I(){try{const t=await fetch("./src/data/content.json");if(!t.ok)throw new Error(`Failed to load content.json: ${t.statusText}`);const e=await t.json();return q(e),e}catch(t){console.error("Content rendering error:",t)}}function v(t,e){return e.split(".").reduce((a,n)=>a&&a[n]!==void 0?a[n]:null,t)}function q(t){document.querySelectorAll("[data-cms]").forEach(r=>{const s=r.getAttribute("data-cms"),o=v(t,s);o!==null&&typeof o=="string"&&(r.textContent=o)}),document.querySelectorAll("[data-cms-img]").forEach(r=>{const s=r.getAttribute("data-cms-img"),o=v(t,s);o&&(r.src=o)}),document.querySelectorAll("[data-cms-href]").forEach(r=>{const s=r.getAttribute("data-cms-href"),o=v(t,s);o&&(r.href=o)})}function B(){const t=document.getElementById("menu-toggle"),e=document.getElementById("mobile-menu"),a=document.querySelectorAll(".nav-link");t&&e&&(t.addEventListener("click",()=>{const n=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!n),e.classList.toggle("hidden")}),a.forEach(n=>{n.addEventListener("click",()=>{e.classList.contains("hidden")||(e.classList.add("hidden"),t.setAttribute("aria-expanded","false"))})})),document.querySelectorAll('a[href^="#"]').forEach(n=>{n.addEventListener("click",function(r){const s=this.getAttribute("href");if(s==="#")return;const o=document.querySelector(s);o&&(r.preventDefault(),o.scrollIntoView({behavior:"smooth",block:"start"}))})})}function A(){const t=document.getElementById("consultation-form"),e=document.getElementById("form-feedback");if(!t)return;t.addEventListener("submit",async n=>{n.preventDefault();const r=new FormData(t),s=Object.fromEntries(r.entries());if(!s.gender||!s.age||!s.weight||!s.phone){a("Vui lòng điền đầy đủ các thông tin cần thiết!","error");return}const o=t.querySelector('button[type="submit"]'),l=o.innerHTML;try{o.disabled=!0,o.innerHTML=`
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>ĐANG GỬI THÔNG TIN...</span>
      `,await new Promise(i=>setTimeout(i,1200)),a("Gửi yêu cầu tư vấn thành công! LQK Kids sẽ liên hệ lại qua Zalo/SĐT trong 15 phút.","success"),t.reset()}catch(i){console.error("Form submission error:",i),a("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng nhắn trực tiếp qua Zalo hoặc Hotline!","error")}finally{o.disabled=!1,o.innerHTML=l}});function a(n,r){e&&(e.textContent=n,e.className=`p-3 rounded-2xl text-sm text-center font-medium mt-3 transition-all ${r==="success"?"bg-tertiary-fixed/40 text-on-tertiary-fixed-variant border border-tertiary-fixed":"bg-error-container text-on-error-container border border-error/30"}`,e.classList.remove("hidden"))}}const L="lqk_kids_cart_v1";class T{constructor(){this.cart=this.loadCart(),this.listeners=[]}loadCart(){try{const e=localStorage.getItem(L);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load cart from localStorage:",e),[]}}saveCart(){try{localStorage.setItem(L,JSON.stringify(this.cart)),this.notifyListeners()}catch(e){console.error("Failed to save cart to localStorage:",e)}}subscribe(e){this.listeners.push(e),e(this.cart)}notifyListeners(){this.listeners.forEach(e=>e(this.cart))}getCartCount(){return this.cart.reduce((e,a)=>e+(a.quantity||1),0)}getCartTotal(){return this.cart.reduce((e,a)=>e+a.price*(a.quantity||1),0)}addToCart(e,a="",n="",r=1){var i,u,m;const s=a||((u=(i=e.sizeOptions)==null?void 0:i[0])==null?void 0:u.size)||"Chưa chọn size",o=n||((m=e.colors)==null?void 0:m[0])||"Mặc định",l=this.cart.findIndex(d=>d.id===e.id&&d.selectedSize===s&&d.selectedColor===o);l>-1?this.cart[l].quantity+=r:this.cart.push({id:e.id,code:e.code,name:e.name,price:e.price,originalPrice:e.originalPrice,image:e.images[0],selectedSize:s,selectedColor:o,quantity:r}),this.saveCart()}updateQuantity(e,a){if(a<=0){this.removeFromCart(e);return}this.cart[e]&&(this.cart[e].quantity=a,this.saveCart())}updateSize(e,a){this.cart[e]&&(this.cart[e].selectedSize=a,this.saveCart())}removeFromCart(e){e>=0&&e<this.cart.length&&(this.cart.splice(e,1),this.saveCart())}clearCart(){this.cart=[],this.saveCart()}}const p=new T;let c=null,g="",x="",f=1;function z(){const t=document.getElementById("product-modal-close"),e=document.getElementById("product-modal-overlay");t&&t.addEventListener("click",b),e&&e.addEventListener("click",a=>{a.target===e&&b()})}function E(t){var a,n,r;c=t,g=((n=(a=t.sizeOptions)==null?void 0:a[0])==null?void 0:n.size)||"",x=((r=t.colors)==null?void 0:r[0])||"",f=1,j();const e=document.getElementById("product-modal");e&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function b(){const t=document.getElementById("product-modal");t&&(t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function j(){const t=document.getElementById("product-modal-body");if(!t||!c)return;const e=c.price.toLocaleString("vi-VN")+"đ",a=c.originalPrice?c.originalPrice.toLocaleString("vi-VN")+"đ":"";t.innerHTML=`
    <!-- Top Live Banner -->
    <a href="https://www.tiktok.com" target="_blank" rel="noopener" class="px-4 py-2.5 bg-gradient-to-r from-error-container via-surface-container-high to-secondary-fixed rounded-2xl shadow-xs flex items-center justify-between transition-transform active:scale-98">
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

    <!-- Product Image & Gallery -->
    <div class="relative w-full aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden shadow-sm">
      <img id="detail-main-image" src="${c.images[0]}" alt="${c.name}" class="w-full h-full object-cover" />
      
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span class="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-extrabold rounded-full shadow-xs flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          ${c.badge}
        </span>
        ${c.discount?`
          <span class="px-2.5 py-0.5 bg-tertiary text-on-tertiary text-[11px] font-bold rounded-full shadow-xs w-fit">
            ${c.discount} HÔM NAY
          </span>
        `:""}
      </div>
    </div>

    <!-- Thumbnail Selector -->
    ${c.images.length>1?`
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        ${c.images.map((n,r)=>`
          <button data-img="${n}" class="detail-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${r===0?"border-primary ring-2 ring-primary/30":"border-transparent opacity-70"}">
            <img src="${n}" class="w-full h-full object-cover" />
          </button>
        `).join("")}
      </div>
    `:""}

    <!-- Title & Pricing Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-base sm:text-lg font-extrabold text-on-surface leading-snug">${c.name}</h2>
        <span class="text-xs font-bold text-outline shrink-0">Mã: ${c.code}</span>
      </div>

      <div class="flex items-baseline gap-2.5 mt-1">
        <span class="text-2xl font-extrabold text-primary tracking-tight">${e}</span>
        ${a?`<span class="text-xs text-outline line-through">${a}</span>`:""}
        <span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold rounded-full">Tiết kiệm 45k</span>
      </div>

      <div class="flex items-center gap-3 pt-2 border-t border-surface-container-low text-xs text-on-surface-variant">
        <div class="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full text-secondary">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">star</span>
          <span class="font-bold">${c.rating}</span>
        </div>
        <span>•</span>
        <span class="font-semibold text-on-surface">Đã bán ${c.soldCount}+</span>
        <span>•</span>
        <span class="text-tertiary font-bold flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[14px]">inventory_2</span> Sẵn kho
        </span>
      </div>
    </div>

    <!-- Color Selector -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2.5">
      <label class="text-xs font-bold text-on-surface">Màu sắc: <span id="selected-color-label" class="text-primary font-normal">${x}</span></label>
      <div class="flex flex-wrap gap-2">
        ${c.colors.map(n=>`
          <button data-color="${n}" class="color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${n===x?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            ${n}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Size Options Selector -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <label class="text-xs font-bold text-on-surface">Kích thước (Size cho bé):</label>
        <span class="text-[11px] font-semibold text-secondary flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">straighten</span> Bảng size theo cân nặng
        </span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${c.sizeOptions.map(n=>`
          <button data-size="${n.size}" class="size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${n.size===g?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            <span class="text-xs font-extrabold">${n.size}</span>
            <span class="text-[11px] opacity-90">${n.weight}</span>
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Description Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <h3 class="text-xs font-bold text-on-surface uppercase tracking-wider">Mô tả sản phẩm</h3>
      <p class="text-xs text-on-surface-variant leading-relaxed">${c.description}</p>
    </div>

    <!-- Sticky Bottom Action Footer in Modal -->
    <div class="pt-2 flex items-center gap-3">
      <div class="flex items-center bg-surface-container-low rounded-full px-3 py-2 border border-surface-container-high">
        <button id="qty-minus" class="w-7 h-7 flex items-center justify-center text-on-surface font-bold text-lg hover:text-primary active:scale-90">-</button>
        <span id="qty-display" class="w-8 text-center font-bold text-xs">${f}</span>
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
  `,N()}function N(){const t=document.getElementById("product-modal-body");if(!t)return;t.querySelectorAll(".detail-thumb-btn").forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-img"),i=document.getElementById("detail-main-image");i&&(i.src=l),t.querySelectorAll(".detail-thumb-btn").forEach(u=>{u.classList.remove("border-primary","ring-2","ring-primary/30"),u.classList.add("border-transparent","opacity-70")}),o.classList.remove("border-transparent","opacity-70"),o.classList.add("border-primary","ring-2","ring-primary/30")})}),t.querySelectorAll(".color-option-btn").forEach(o=>{o.addEventListener("click",()=>{x=o.getAttribute("data-color");const l=document.getElementById("selected-color-label");l&&(l.textContent=x),t.querySelectorAll(".color-option-btn").forEach(i=>{i.className=`color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${i.getAttribute("data-color")===x?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})}),t.querySelectorAll(".size-option-btn").forEach(o=>{o.addEventListener("click",()=>{g=o.getAttribute("data-size"),t.querySelectorAll(".size-option-btn").forEach(l=>{const i=l.getAttribute("data-size")===g;l.className=`size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${i?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})});const e=document.getElementById("qty-minus"),a=document.getElementById("qty-plus"),n=document.getElementById("qty-display");e&&a&&n&&(e.addEventListener("click",()=>{f>1&&(f--,n.textContent=f)}),a.addEventListener("click",()=>{f++,n.textContent=f}));const r=document.getElementById("add-to-cart-modal-btn");r&&r.addEventListener("click",()=>{p.addToCart(c,g,x,f),b(),P("Đã thêm sản phẩm vào giỏ hàng!")});const s=document.getElementById("order-now-zalo-btn");s&&s.addEventListener("click",()=>{p.addToCart(c,g,x,f),b();const o=document.getElementById("cart-drawer");o&&o.classList.remove("hidden")})}function P(t){let e=document.getElementById("app-toast");e||(e=document.createElement("div"),e.id="app-toast",e.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none",document.body.appendChild(e)),e.textContent=t,e.classList.remove("opacity-0","pointer-events-none"),e.classList.add("opacity-100"),setTimeout(()=>{e.classList.remove("opacity-100"),e.classList.add("opacity-0","pointer-events-none")},2200)}let h=[],y="all";function M(t){h=t,C(),k(h),F()}function C(){const t=document.getElementById("category-tabs");if(!t)return;const e=[{id:"all",label:"Tất cả",icon:"widgets"},{id:"be-trai",label:"Bé Trai",icon:"boy",color:"text-primary"},{id:"be-gai",label:"Bé Gái",icon:"girl",color:"text-secondary"},{id:"set",label:"Set Đồ",icon:"checkroom",color:"text-tertiary"},{id:"phu-kien",label:"Phụ Kiện",icon:"shopping_basket",color:"text-primary-container"}];t.innerHTML=e.map(a=>{const n=y===a.id;return`
      <button 
        data-category="${a.id}"
        class="category-tab-btn shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-bold transition-all active:scale-95 ${n?"bg-secondary-container text-on-secondary-container shadow-xs":"bg-surface-container-low hover:bg-surface-container text-on-surface font-medium"}"
      >
        <span class="material-symbols-outlined text-[18px] ${a.color||""}">${a.icon}</span>
        <span>${a.label}</span>
      </button>
    `}).join(""),t.querySelectorAll(".category-tab-btn").forEach(a=>{a.addEventListener("click",n=>{y=a.getAttribute("data-category"),C(),w()})})}function F(){const t=document.getElementById("catalog-search-input"),e=document.getElementById("clear-search-btn");t&&t.addEventListener("input",()=>{w()}),e&&t&&e.addEventListener("click",()=>{t.value="",w()})}function w(){const t=document.getElementById("catalog-search-input"),e=t?t.value.toLowerCase().trim():"";let a=h.filter(n=>{const r=y==="all"||n.category===y,s=!e||n.name.toLowerCase().includes(e)||n.description.toLowerCase().includes(e);return r&&s});k(a)}function k(t){const e=document.getElementById("product-grid"),a=document.getElementById("product-count-badge");if(a&&(a.textContent=`${t.length} sản phẩm`),!!e){if(t.length===0){e.innerHTML=`
      <div class="col-span-2 py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <p class="text-sm font-bold text-on-surface">Không tìm thấy sản phẩm phù hợp</p>
        <p class="text-xs text-on-surface-variant mt-1">Vui lòng thử chọn danh mục khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    `;return}e.innerHTML=t.map(n=>{const r=n.price.toLocaleString("vi-VN")+"đ",s=n.originalPrice?n.originalPrice.toLocaleString("vi-VN")+"đ":"";return`
      <article class="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container-high/40 group transition-all duration-300 hover:shadow-md">
        <div class="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden cursor-pointer product-card-trigger" data-id="${n.id}">
          <img 
            src="${n.images[0]}" 
            alt="${n.name}" 
            loading="lazy" 
            decoding="async" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          />
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span class="px-2.5 py-0.5 rounded-full bg-${n.badgeColor==="error"?"error-container text-on-error-container":n.badgeColor==="tertiary"?"tertiary-fixed text-on-tertiary-fixed":"secondary-container text-on-secondary-container"} text-[11px] font-extrabold shadow-xs">
              ${n.badge}
            </span>
          </div>
          <button 
            aria-label="Thêm vào yêu thích" 
            class="wishlist-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-xs active:scale-90"
            onclick="event.stopPropagation(); this.classList.toggle('text-error');"
          >
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        </div>

        <div class="p-3 flex flex-col flex-1 justify-between gap-2">
          <div class="flex flex-col cursor-pointer product-card-trigger" data-id="${n.id}">
            <h3 class="text-xs sm:text-sm font-bold leading-snug text-on-surface line-clamp-2 hover:text-primary transition-colors">
              ${n.name}
            </h3>
            <div class="flex items-center gap-1 mt-1 text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px] text-secondary-container" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="text-xs font-bold text-on-surface">${n.rating}</span>
              <span class="text-[11px] text-outline">• ${n.soldCount} đã bán</span>
            </div>
          </div>

          <div class="pt-1 flex flex-col gap-2">
            <div class="flex items-baseline gap-1.5 flex-wrap">
              <span class="text-sm sm:text-base text-primary font-extrabold">${r}</span>
              ${s?`<span class="text-[11px] text-outline line-through">${s}</span>`:""}
            </div>
            <button 
              data-id="${n.id}"
              class="quick-add-btn w-full h-8 rounded-full bg-primary-fixed hover:bg-primary-container text-on-primary-container text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <span class="material-symbols-outlined text-[15px]">add</span>
              <span>Chọn mua</span>
            </button>
          </div>
        </div>
      </article>
    `}).join(""),e.querySelectorAll(".product-card-trigger").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-id"),s=h.find(o=>o.id===r);s&&E(s)})}),e.querySelectorAll(".quick-add-btn").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation();const s=n.getAttribute("data-id"),o=h.find(l=>l.id===s);o&&E(o)})})}}const O="0934498685";function H(){const t=document.getElementById("cart-drawer-close"),e=document.getElementById("cart-drawer-overlay");document.querySelectorAll(".cart-trigger-btn").forEach(n=>{n.addEventListener("click",G)}),t&&t.addEventListener("click",$),e&&e.addEventListener("click",n=>{n.target===e&&$()}),p.subscribe(_)}function G(){const t=document.getElementById("cart-drawer");t&&(t.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function $(){const t=document.getElementById("cart-drawer");t&&(t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function _(t){const e=document.querySelectorAll(".cart-counter-badge"),a=p.getCartCount();e.forEach(i=>{i.textContent=a,a>0?i.classList.remove("hidden"):i.classList.add("hidden")});const n=document.getElementById("cart-drawer-items"),r=document.getElementById("cart-drawer-footer"),s=document.getElementById("cart-items-count-text");if(s&&(s.textContent=`${a} món`),!n)return;if(t.length===0){n.innerHTML=`
      <div class="py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-5xl text-outline mb-3">shopping_bag</span>
        <p class="text-sm font-bold text-on-surface">Giỏ hàng của bé đang trống</p>
        <p class="text-xs text-on-surface-variant mt-1 max-w-xs">Hãy chọn những bộ trang phục thật đẹp cho bé yêu nhé!</p>
      </div>
    `,r&&r.classList.add("hidden");return}r&&r.classList.remove("hidden");const l=p.getCartTotal().toLocaleString("vi-VN")+"đ";n.innerHTML=`
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
      ${t.map((i,u)=>{const m=(i.price*i.quantity).toLocaleString("vi-VN")+"đ",d=i.price.toLocaleString("vi-VN")+"đ";return`
          <div class="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
            <div class="flex gap-3">
              <div class="w-20 h-20 rounded-xl bg-surface-container-low shrink-0 overflow-hidden relative border border-surface-container-high/40">
                <img src="${i.image}" alt="${i.name}" class="w-full h-full object-cover" />
                <span class="absolute bottom-1 left-1 bg-surface-container-lowest/90 px-1 py-0.2 rounded font-mono text-[9px] text-on-surface-variant font-bold">${i.code||"LQK"}</span>
              </div>

              <div class="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="text-xs font-bold text-on-surface truncate">${i.name}</h4>
                    <button data-index="${u}" class="remove-cart-item-btn text-outline hover:text-error p-0.5 -mr-1">
                      <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Màu: ${i.selectedColor}</p>
                </div>

                <div class="flex items-baseline justify-between mt-1">
                  <span class="text-xs font-bold text-primary">${d}</span>
                  <span class="text-xs font-extrabold text-on-surface">${m}</span>
                </div>
              </div>
            </div>

            <!-- Size Badge & Stepper Row -->
            <div class="bg-surface-container-low/70 p-2 rounded-xl flex items-center justify-between gap-2 border border-surface-container-high/30">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="material-symbols-outlined text-tertiary text-[16px] shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="text-xs font-bold text-on-tertiary-container truncate">${i.selectedSize}</span>
              </div>

              <div class="flex items-center bg-surface-container-lowest rounded-full px-2 py-0.5 shadow-xs border border-surface-container-high/40 shrink-0">
                <button data-index="${u}" data-qty="${i.quantity-1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">-</button>
                <span class="w-5 text-center text-xs font-bold">${i.quantity}</span>
                <button data-index="${u}" data-qty="${i.quantity+1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">+</button>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>

    <!-- Total Price Summary Box -->
    <div class="mt-4 p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Tạm tính hàng:</span>
        <span class="font-bold text-on-surface">${l}</span>
      </div>
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Phí vận chuyển:</span>
        <span class="font-bold text-tertiary">Freeship / Tư vấn Zalo</span>
      </div>
      <div class="pt-2 border-t border-surface-container-low flex items-center justify-between">
        <span class="text-sm font-bold text-on-surface">Tổng cộng thanh toán:</span>
        <span class="text-xl font-extrabold text-primary">${l}</span>
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
  `,V(n)}function V(t){t.querySelectorAll(".remove-cart-item-btn").forEach(a=>{a.addEventListener("click",()=>{const n=parseInt(a.getAttribute("data-index"));p.removeFromCart(n)})}),t.querySelectorAll(".update-qty-btn").forEach(a=>{a.addEventListener("click",()=>{const n=parseInt(a.getAttribute("data-index")),r=parseInt(a.getAttribute("data-qty"));p.updateQuantity(n,r)})});const e=document.getElementById("zalo-checkout-form");e&&e.addEventListener("submit",a=>{a.preventDefault();const n=document.getElementById("cust-name").value.trim(),r=document.getElementById("cust-phone").value.trim(),s=document.getElementById("cust-address").value.trim(),o=document.getElementById("cust-note").value.trim(),l=p.cart;if(l.length===0)return;let i=`🛒 *ĐƠN HÀNG LQK KIDS*
`;i+=`👤 *Khách hàng:* ${n}
`,i+=`📞 *SĐT Zalo:* ${r}
`,i+=`📍 *Địa chỉ:* ${s}
`,o&&(i+=`📝 *Ghi chú bé:* ${o}
`),i+=`-------------------------
`,i+=`📦 *DANH SÁCH MÓN:* 
`,l.forEach((d,S)=>{i+=`${S+1}. ${d.name} (${d.selectedColor}, ${d.selectedSize}) x${d.quantity} = ${(d.price*d.quantity).toLocaleString("vi-VN")}đ
`}),i+=`-------------------------
`,i+=`💰 *TỔNG CỘNG:* ${p.getCartTotal().toLocaleString("vi-VN")}đ (Freeship)
`,i+="Cảm ơn LQK Kids! Nhờ shop check kho và xác nhận size giúp mình nhé!";const u=encodeURIComponent(i),m=`https://zalo.me/${O}?text=${u}`;window.open(m,"_blank")})}document.addEventListener("DOMContentLoaded",async()=>{await I(),B(),A();try{const t=await fetch("./src/data/products.json");if(!t.ok)throw new Error("Failed to load products.json");const e=await t.json();M(e),z(),H()}catch(t){console.error("App initialization error:",t)}});
