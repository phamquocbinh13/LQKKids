(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();async function j(){try{let t=null;const e=localStorage.getItem("lqk_kids_admin_content_v1");if(e)try{t=JSON.parse(e)}catch(n){console.error("Failed to parse admin content",n)}if(!t){const n=await fetch("./src/data/content.json");if(!n.ok)throw new Error(`Failed to load content.json: ${n.statusText}`);t=await n.json()}return H(t),t}catch(t){console.error("Content rendering error:",t)}}function C(t,e){return e.split(".").reduce((n,a)=>n&&n[a]!==void 0?n[a]:null,t)}function H(t){document.querySelectorAll("[data-cms]").forEach(o=>{const r=o.getAttribute("data-cms"),s=C(t,r);s!==null&&typeof s=="string"&&(o.textContent=s)}),document.querySelectorAll("[data-cms-img]").forEach(o=>{const r=o.getAttribute("data-cms-img"),s=C(t,r);s&&(o.src=s)}),document.querySelectorAll("[data-cms-href]").forEach(o=>{const r=o.getAttribute("data-cms-href"),s=C(t,r);s&&(o.href=s)})}function O(){const t=document.getElementById("menu-toggle"),e=document.getElementById("mobile-menu"),n=document.querySelectorAll(".nav-link");t&&e&&(t.addEventListener("click",()=>{const a=t.getAttribute("aria-expanded")==="true";t.setAttribute("aria-expanded",!a),e.classList.toggle("hidden")}),n.forEach(a=>{a.addEventListener("click",()=>{e.classList.contains("hidden")||(e.classList.add("hidden"),t.setAttribute("aria-expanded","false"))})})),document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener("click",function(o){const r=this.getAttribute("href");if(r==="#")return;const s=document.querySelector(r);s&&(o.preventDefault(),s.scrollIntoView({behavior:"smooth",block:"start"}))})})}function M(){const t=document.getElementById("consultation-form"),e=document.getElementById("form-feedback");if(!t)return;t.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(t),r=Object.fromEntries(o.entries());if(!r.gender||!r.age||!r.weight||!r.phone){n("Vui lòng điền đầy đủ các thông tin cần thiết!","error");return}const s=t.querySelector('button[type="submit"]'),i=s.innerHTML;try{s.disabled=!0,s.innerHTML=`
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>ĐANG GỬI THÔNG TIN...</span>
      `,await new Promise(l=>setTimeout(l,1200)),n("Gửi yêu cầu tư vấn thành công! LQK Kids sẽ liên hệ lại qua Zalo/SĐT trong 15 phút.","success"),t.reset()}catch(l){console.error("Form submission error:",l),n("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng nhắn trực tiếp qua Zalo hoặc Hotline!","error")}finally{s.disabled=!1,s.innerHTML=i}});function n(a,o){e&&(e.textContent=a,e.className=`p-3 rounded-2xl text-sm text-center font-medium mt-3 transition-all ${o==="success"?"bg-tertiary-fixed/40 text-on-tertiary-fixed-variant border border-tertiary-fixed":"bg-error-container text-on-error-container border border-error/30"}`,e.classList.remove("hidden"))}}const S="lqk_kids_cart_v1";class _{constructor(){this.cart=this.loadCart(),this.listeners=[]}loadCart(){try{const e=localStorage.getItem(S);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load cart from localStorage:",e),[]}}saveCart(){try{localStorage.setItem(S,JSON.stringify(this.cart)),this.notifyListeners()}catch(e){console.error("Failed to save cart to localStorage:",e)}}subscribe(e){this.listeners.push(e),e(this.cart)}notifyListeners(){this.listeners.forEach(e=>e(this.cart))}getCartCount(){return this.cart.reduce((e,n)=>e+(n.quantity||1),0)}getCartTotal(){return this.cart.reduce((e,n)=>e+n.price*(n.quantity||1),0)}addToCart(e,n="",a="",o=1){var l,c,d;const r=n||((c=(l=e.sizeOptions)==null?void 0:l[0])==null?void 0:c.size)||"Chưa chọn size",s=a||((d=e.colors)==null?void 0:d[0])||"Mặc định",i=this.cart.findIndex(f=>f.id===e.id&&f.selectedSize===r&&f.selectedColor===s);i>-1?this.cart[i].quantity+=o:this.cart.push({id:e.id,code:e.code,name:e.name,price:e.price,originalPrice:e.originalPrice,image:e.images[0],selectedSize:r,selectedColor:s,quantity:o}),this.saveCart()}updateQuantity(e,n){if(n<=0){this.removeFromCart(e);return}this.cart[e]&&(this.cart[e].quantity=n,this.saveCart())}updateSize(e,n){this.cart[e]&&(this.cart[e].selectedSize=n,this.saveCart())}removeFromCart(e){e>=0&&e<this.cart.length&&(this.cart.splice(e,1),this.saveCart())}clearCart(){this.cart=[],this.saveCart()}}const x=new _;let u=null,y="",g="",m=1;function D(){const t=document.getElementById("product-modal-close"),e=document.getElementById("product-modal-overlay");t&&t.addEventListener("click",w),e&&e.addEventListener("click",r=>{r.target===e&&w()});const n=document.getElementById("size-chart-modal"),a=document.getElementById("size-chart-modal-close"),o=document.getElementById("size-chart-modal-overlay");a&&a.addEventListener("click",()=>n.classList.add("hidden")),o&&o.addEventListener("click",()=>n.classList.add("hidden"))}function G(t){var n,a,o;u=t,y=((a=(n=t.sizeOptions)==null?void 0:n[0])==null?void 0:a.size)||"",g=((o=t.colors)==null?void 0:o[0])||"",m=1,K();const e=document.getElementById("product-modal");e&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function w(){const t=document.getElementById("product-modal");t&&(t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function K(){const t=document.getElementById("product-modal-body");if(!t||!u)return;const e=u.price.toLocaleString("vi-VN")+"đ",n=u.originalPrice?u.originalPrice.toLocaleString("vi-VN")+"đ":"";t.innerHTML=`
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
    <div class="relative w-full aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden shadow-sm">
      <img id="detail-main-image" src="${u.images[0]}" alt="${u.name}" class="w-full h-full object-cover" />
      
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span class="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-extrabold rounded-full shadow-xs flex items-center gap-1">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          ${u.badge}
        </span>
        ${u.discount?`
          <span class="px-2.5 py-0.5 bg-tertiary text-on-tertiary text-[11px] font-bold rounded-full shadow-xs w-fit">
            ${u.discount} HÔM NAY
          </span>
        `:""}
      </div>
    </div>

    <!-- Thumbnails Gallery -->
    ${u.images.length>1?`
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        ${u.images.map((a,o)=>`
          <button data-img="${a}" class="detail-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${o===0?"border-primary ring-2 ring-primary/30":"border-transparent opacity-70"}">
            <img src="${a}" class="w-full h-full object-cover" />
          </button>
        `).join("")}
      </div>
    `:""}

    <!-- Title & Pricing Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-base sm:text-lg font-extrabold text-on-surface leading-snug">${u.name}</h2>
        <span class="text-xs font-bold text-outline shrink-0">Mã: ${u.code}</span>
      </div>

      <div class="flex items-baseline gap-2.5 mt-1">
        <span class="text-2xl font-extrabold text-primary tracking-tight">${e}</span>
        ${n?`<span class="text-xs text-outline line-through">${n}</span>`:""}
        <span class="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold rounded-full">Tiết kiệm 45k</span>
      </div>

      <div class="flex items-center gap-3 pt-2 border-t border-surface-container-low text-xs text-on-surface-variant">
        <div class="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full text-secondary">
          <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">star</span>
          <span class="font-bold">${u.rating}</span>
        </div>
        <span>•</span>
        <span class="font-semibold text-on-surface">Đã bán ${u.soldCount}+</span>
        <span>•</span>
        <span class="text-tertiary font-bold flex items-center gap-0.5">
          <span class="material-symbols-outlined text-[14px]">inventory_2</span> Sẵn kho
        </span>
      </div>
    </div>

    <!-- Color Selector -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2.5">
      <label class="text-xs font-bold text-on-surface">Màu sắc: <span id="selected-color-label" class="text-primary font-normal">${g}</span></label>
      <div class="flex flex-wrap gap-2">
        ${u.colors.map(a=>`
          <button data-color="${a}" class="color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${a===g?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            ${a}
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Size Options Selector & Size Chart Modal Trigger -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <label class="text-xs font-bold text-on-surface">Kích thước (Size cho bé):</label>
        <button type="button" id="open-size-chart-btn" class="text-xs font-bold text-secondary flex items-center gap-1 hover:underline cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">straighten</span> Bảng Size Chuẩn LQK Kids 📐
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${u.sizeOptions.map(a=>`
          <button data-size="${a.size}" class="size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${a.size===y?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            <span class="text-xs font-extrabold">${a.size}</span>
            <span class="text-[11px] opacity-90">${a.weight}</span>
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Description Card -->
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <h3 class="text-xs font-bold text-on-surface uppercase tracking-wider">Mô tả sản phẩm</h3>
      <p class="text-xs text-on-surface-variant leading-relaxed">${u.description}</p>
    </div>

    <!-- Bottom Actions Stack -->
    <div class="pt-2 flex items-center gap-3">
      <div class="flex items-center bg-surface-container-low rounded-full px-3 py-2 border border-surface-container-high">
        <button id="qty-minus" class="w-7 h-7 flex items-center justify-center text-on-surface font-bold text-lg hover:text-primary active:scale-90">-</button>
        <span id="qty-display" class="w-8 text-center font-bold text-xs">${m}</span>
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
  `,F()}function F(){const t=document.getElementById("product-modal-body");if(!t)return;const e=document.getElementById("open-size-chart-btn");e&&e.addEventListener("click",()=>{const i=document.getElementById("size-chart-modal");i&&i.classList.remove("hidden")}),t.querySelectorAll(".detail-thumb-btn").forEach(i=>{i.addEventListener("click",()=>{const l=i.getAttribute("data-img"),c=document.getElementById("detail-main-image");c&&(c.src=l),t.querySelectorAll(".detail-thumb-btn").forEach(d=>{d.classList.remove("border-primary","ring-2","ring-primary/30"),d.classList.add("border-transparent","opacity-70")}),i.classList.remove("border-transparent","opacity-70"),i.classList.add("border-primary","ring-2","ring-primary/30")})}),t.querySelectorAll(".color-option-btn").forEach(i=>{i.addEventListener("click",()=>{g=i.getAttribute("data-color");const l=document.getElementById("selected-color-label");l&&(l.textContent=g),t.querySelectorAll(".color-option-btn").forEach(c=>{c.className=`color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${c.getAttribute("data-color")===g?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})}),t.querySelectorAll(".size-option-btn").forEach(i=>{i.addEventListener("click",()=>{y=i.getAttribute("data-size"),t.querySelectorAll(".size-option-btn").forEach(l=>{const c=l.getAttribute("data-size")===y;l.className=`size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${c?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})});const n=document.getElementById("qty-minus"),a=document.getElementById("qty-plus"),o=document.getElementById("qty-display");n&&a&&o&&(n.addEventListener("click",()=>{m>1&&(m--,o.textContent=m)}),a.addEventListener("click",()=>{m++,o.textContent=m}));const r=document.getElementById("add-to-cart-modal-btn");r&&r.addEventListener("click",()=>{x.addToCart(u,y,g,m),w(),V("Đã thêm sản phẩm vào giỏ hàng!")});const s=document.getElementById("order-now-zalo-btn");s&&s.addEventListener("click",()=>{x.addToCart(u,y,g,m),w();const i=document.getElementById("cart-drawer");i&&i.classList.remove("hidden")})}function V(t){let e=document.getElementById("app-toast");e||(e=document.createElement("div"),e.id="app-toast",e.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none",document.body.appendChild(e)),e.textContent=t,e.classList.remove("opacity-0","pointer-events-none"),e.classList.add("opacity-100"),setTimeout(()=>{e.classList.remove("opacity-100"),e.classList.add("opacity-0","pointer-events-none")},2200)}let k=[],L="all",v=1;const Z=8;function R(t){k=t,N(),E(),Q()}function N(){const t=document.getElementById("category-tabs");if(!t)return;const e=[{id:"all",label:"Tất cả",icon:"widgets"},{id:"be-trai",label:"Bé Trai",icon:"boy",color:"text-primary"},{id:"be-gai",label:"Bé Gái",icon:"girl",color:"text-secondary"},{id:"set",label:"Set Đồ",icon:"checkroom",color:"text-tertiary"},{id:"phu-kien",label:"Phụ Kiện",icon:"shopping_basket",color:"text-primary-container"}];t.innerHTML=e.map(n=>{const a=L===n.id;return`
      <button 
        data-category="${n.id}"
        class="category-tab-btn shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-bold transition-all active:scale-95 ${a?"bg-secondary-container text-on-secondary-container shadow-xs":"bg-surface-container-low hover:bg-surface-container text-on-surface font-medium"}"
      >
        <span class="material-symbols-outlined text-[18px] ${n.color||""}">${n.icon}</span>
        <span>${n.label}</span>
      </button>
    `}).join(""),t.querySelectorAll(".category-tab-btn").forEach(n=>{n.addEventListener("click",()=>{L=n.getAttribute("data-category"),v=1,N(),E()})})}function Q(){const t=document.getElementById("catalog-search-input"),e=document.getElementById("clear-search-btn");t&&t.addEventListener("input",()=>{v=1,E()}),e&&t&&e.addEventListener("click",()=>{t.value="",v=1,E()})}function E(){const t=document.getElementById("catalog-search-input"),e=t?t.value.toLowerCase().trim():"",n=k.filter(a=>{const o=L==="all"||a.category===L,r=!e||a.name.toLowerCase().includes(e)||a.description.toLowerCase().includes(e);return o&&r});P(n)}function P(t){const e=document.getElementById("product-grid"),n=document.getElementById("product-count-badge");if(n&&(n.textContent=`${t.length} sản phẩm`),!e)return;if(t.length===0){e.innerHTML=`
      <div class="col-span-full py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <p class="text-sm font-bold text-on-surface">Không tìm thấy sản phẩm phù hợp</p>
        <p class="text-xs text-on-surface-variant mt-1">Vui lòng thử chọn danh mục khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    `,B();return}const a=t.slice(0,v*Z);e.innerHTML=a.map((o,r)=>{const s=o.price.toLocaleString("vi-VN")+"đ",i=o.originalPrice?o.originalPrice.toLocaleString("vi-VN")+"đ":"",l=r<4;return`
      <article class="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container-high/40 group transition-all duration-300 hover:shadow-md">
        <div class="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden cursor-pointer product-card-trigger" data-id="${o.id}">
          <img 
            src="${o.images[0]}" 
            alt="${o.name} LQK Kids - Thời trang trẻ em" 
            loading="${l?"eager":"lazy"}" 
            decoding="async" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          />
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span class="px-2.5 py-0.5 rounded-full bg-${o.badgeColor==="error"?"error-container text-on-error-container":o.badgeColor==="tertiary"?"tertiary-fixed text-on-tertiary-fixed":"secondary-container text-on-secondary-container"} text-[11px] font-extrabold shadow-xs">
              ${o.badge}
            </span>
          </div>
          <button 
            aria-label="Thêm vào yêu thích ${o.name}" 
            class="wishlist-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-xs active:scale-90"
            onclick="event.stopPropagation(); this.classList.toggle('text-error');"
          >
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        </div>

        <div class="p-3 flex flex-col flex-1 justify-between gap-2">
          <div class="flex flex-col cursor-pointer product-card-trigger" data-id="${o.id}">
            <h3 class="text-xs sm:text-sm font-bold leading-snug text-on-surface line-clamp-2 hover:text-primary transition-colors">
              ${o.name}
            </h3>
            <div class="flex items-center gap-1 mt-1 text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px] text-secondary-container" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="text-xs font-bold text-on-surface">${o.rating}</span>
              <span class="text-[11px] text-outline">• ${o.soldCount} đã bán</span>
            </div>
          </div>

          <div class="pt-1 flex flex-col gap-2">
            <div class="flex items-baseline gap-1.5 flex-wrap">
              <span class="text-sm sm:text-base text-primary font-extrabold">${s}</span>
              ${i?`<span class="text-[11px] text-outline line-through">${i}</span>`:""}
            </div>
            <button 
              data-id="${o.id}"
              class="quick-add-btn w-full h-8 rounded-full bg-primary-fixed hover:bg-primary-container text-on-primary-container text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <span class="material-symbols-outlined text-[15px]">add</span>
              <span>Xem size & Chọn mua</span>
            </button>
          </div>
        </div>
      </article>
    `}).join(""),a.length<t.length?U(()=>{v++,P(t)}):B(),e.querySelectorAll(".product-card-trigger, .quick-add-btn").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const s=o.getAttribute("data-id"),i=k.find(l=>l.id===s);i&&G(i)})})}function U(t){let e=document.getElementById("load-more-wrapper");if(!e){const n=document.getElementById("catalog-section");e=document.createElement("div"),e.id="load-more-wrapper",e.className="mt-6 flex justify-center",n.appendChild(e)}e.innerHTML=`
    <button id="load-more-btn" class="px-6 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95">
      <span class="material-symbols-outlined text-[18px]">expand_more</span>
      <span>Xem Thêm Sản Phẩm Khác</span>
    </button>
  `,document.getElementById("load-more-btn").addEventListener("click",t)}function B(){const t=document.getElementById("load-more-wrapper");t&&t.remove()}const J="modulepreload",W=function(t){return"/"+t},T={},Y=function(e,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));o=s(n.map(c=>{if(c=W(c),c in T)return;T[c]=!0;const d=c.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":J,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((h,I)=>{p.addEventListener("load",h),p.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(s){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s}return o.then(s=>{for(const i of s||[])i.status==="rejected"&&r(i.reason);return e().catch(r)})},z="0934498685";function X(){const t=document.getElementById("cart-drawer-close"),e=document.getElementById("cart-drawer-overlay");document.querySelectorAll(".cart-trigger-btn").forEach(a=>{a.addEventListener("click",ee)}),t&&t.addEventListener("click",A),e&&e.addEventListener("click",a=>{a.target===e&&A()}),x.subscribe(te)}function ee(){const t=document.getElementById("cart-drawer");t&&(t.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function A(){const t=document.getElementById("cart-drawer");t&&(t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function te(t){const e=document.querySelectorAll(".cart-counter-badge"),n=x.getCartCount();e.forEach(l=>{l.textContent=n,n>0?l.classList.remove("hidden"):l.classList.add("hidden")});const a=document.getElementById("cart-drawer-items"),o=document.getElementById("cart-drawer-footer"),r=document.getElementById("cart-items-count-text");if(r&&(r.textContent=`${n} món`),!a)return;if(t.length===0){a.innerHTML=`
      <div class="py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-5xl text-outline mb-3">shopping_bag</span>
        <p class="text-sm font-bold text-on-surface">Giỏ hàng của bé đang trống</p>
        <p class="text-xs text-on-surface-variant mt-1 max-w-xs">Hãy chọn những bộ trang phục thật đẹp cho bé yêu nhé!</p>
      </div>
    `,o&&o.classList.add("hidden");return}o&&o.classList.remove("hidden");const i=x.getCartTotal().toLocaleString("vi-VN")+"đ";a.innerHTML=`
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
      ${t.map((l,c)=>{const d=(l.price*l.quantity).toLocaleString("vi-VN")+"đ",f=l.price.toLocaleString("vi-VN")+"đ";return`
          <div class="bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-surface-container-high/40 flex flex-col gap-3">
            <div class="flex gap-3">
              <div class="w-20 h-20 rounded-xl bg-surface-container-low shrink-0 overflow-hidden relative border border-surface-container-high/40">
                <img src="${l.image}" alt="${l.name}" loading="lazy" decoding="async" class="w-full h-full object-cover" />
                <span class="absolute bottom-1 left-1 bg-surface-container-lowest/90 px-1 py-0.2 rounded font-mono text-[9px] text-on-surface-variant font-bold">${l.code||"LQK"}</span>
              </div>

              <div class="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="text-xs font-bold text-on-surface truncate">${l.name}</h4>
                    <button data-index="${c}" class="remove-cart-item-btn text-outline hover:text-error p-0.5 -mr-1">
                      <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <p class="text-[11px] text-on-surface-variant mt-0.5">Màu: ${l.selectedColor}</p>
                </div>

                <div class="flex items-baseline justify-between mt-1">
                  <span class="text-xs font-bold text-primary">${f}</span>
                  <span class="text-xs font-extrabold text-on-surface">${d}</span>
                </div>
              </div>
            </div>

            <!-- Size Badge & Stepper Row -->
            <div class="bg-surface-container-low/70 p-2 rounded-xl flex items-center justify-between gap-2 border border-surface-container-high/30">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="material-symbols-outlined text-tertiary text-[16px] shrink-0" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                <span class="text-xs font-bold text-on-tertiary-container truncate">${l.selectedSize}</span>
              </div>

              <div class="flex items-center bg-surface-container-lowest rounded-full px-2 py-0.5 shadow-xs border border-surface-container-high/40 shrink-0">
                <button data-index="${c}" data-qty="${l.quantity-1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">-</button>
                <span class="w-5 text-center text-xs font-bold">${l.quantity}</span>
                <button data-index="${c}" data-qty="${l.quantity+1}" class="update-qty-btn w-5 h-5 flex items-center justify-center text-on-surface font-bold text-xs active:scale-90">+</button>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>

    <!-- Total Price Summary Box -->
    <div class="mt-4 p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 flex flex-col gap-2">
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Tạm tính hàng:</span>
        <span class="font-bold text-on-surface">${i}</span>
      </div>
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Phí vận chuyển:</span>
        <span class="font-bold text-tertiary">Freeship / Tư vấn Zalo</span>
      </div>
      <div class="pt-2 border-t border-surface-container-low flex items-center justify-between">
        <span class="text-sm font-bold text-on-surface">Tổng cộng thanh toán:</span>
        <span class="text-xl font-extrabold text-primary">${i}</span>
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
  `,ne(a)}function ne(t){t.querySelectorAll(".remove-cart-item-btn").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.getAttribute("data-index"));x.removeFromCart(r)})}),t.querySelectorAll(".update-qty-btn").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.getAttribute("data-index")),s=parseInt(o.getAttribute("data-qty"));x.updateQuantity(r,s)})});const e=document.getElementById("download-order-image-btn");e&&e.addEventListener("click",async()=>{const o=$();if(o){e.disabled=!0,e.innerHTML=`
        <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>
        <span>ĐANG TẠO ẢNH HÓA ĐƠN...</span>
      `;try{const{default:r}=await Y(async()=>{const{default:s}=await import("./html2canvas.esm-QH1iLAAe.js");return{default:s}},[]);await oe(o,r),b("Đã lưu ảnh đơn hàng! Hãy đính kèm ảnh này gửi Zalo cho shop nhé 📸")}catch(r){console.error("Failed to generate image:",r),b("Không thể tạo ảnh, vui lòng bấm Copy đơn hàng!")}finally{e.disabled=!1,e.innerHTML=`
          <span class="material-symbols-outlined text-[18px]">image</span>
          <span>📸 LƯU ORDER VÀO ẢNH (GỬI ZALO)</span>
        `}}});const n=document.getElementById("copy-order-text-btn");n&&n.addEventListener("click",()=>{const o=$();if(!o)return;const r=q(o);navigator.clipboard.writeText(r).then(()=>{b("📋 Đã sao chép nội dung đơn hàng! Bố mẹ mở Zalo dán gửi shop nhé.")}).catch(()=>{b("Không thể tự động copy. Vui lòng bấm mở Zalo!")})});const a=document.getElementById("zalo-checkout-form");a&&a.addEventListener("submit",o=>{o.preventDefault();const r=$();if(!r)return;const s=q(r),i=encodeURIComponent(s),c=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?`https://zalo.me/${z}?text=${i}`:`https://zalo.me/${z}`;navigator.clipboard&&navigator.clipboard.writeText(s).catch(()=>{}),window.open(c,"_blank"),b("Đã mở Zalo! Nội dung đơn đã được tự động copy vào bộ nhớ tạm.")})}function $(){const t=document.getElementById("cust-name"),e=document.getElementById("cust-phone"),n=document.getElementById("cust-address"),a=document.getElementById("cust-note");if(!t||!e||!n)return null;const o=t.value.trim(),r=e.value.trim(),s=n.value.trim(),i=a?a.value.trim():"";return!o||!r||!s?(b("Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ nhận hàng!"),null):{name:o,phone:r,address:s,note:i,cart:x.cart,total:x.getCartTotal()}}function q(t){let e=`🛒 *ĐƠN HÀNG LQK KIDS*
`;return e+=`👤 *Khách hàng:* ${t.name}
`,e+=`📞 *SĐT Zalo:* ${t.phone}
`,e+=`📍 *Địa chỉ:* ${t.address}
`,t.note&&(e+=`📝 *Ghi chú bé:* ${t.note}
`),e+=`-------------------------
`,e+=`📦 *DANH SÁCH MÓN:* 
`,t.cart.forEach((n,a)=>{e+=`${a+1}. ${n.name} (${n.selectedColor}, ${n.selectedSize}) x${n.quantity} = ${(n.price*n.quantity).toLocaleString("vi-VN")}đ
`}),e+=`-------------------------
`,e+=`💰 *TỔNG CỘNG:* ${t.total.toLocaleString("vi-VN")}đ (Freeship)
`,e+="Cảm ơn LQK Kids! Nhờ shop check kho và xác nhận size giúp mình nhé!",e}async function oe(t,e){const n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.left="-9999px",n.style.width="480px",n.style.backgroundColor="#fff8f5",n.style.fontFamily="'Plus Jakarta Sans', sans-serif",n.style.padding="24px",n.style.borderRadius="24px",n.style.boxShadow="0 10px 30px rgba(0,0,0,0.1)";const a=new Date().toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),o=d=>new Promise(f=>{const p=new Image;p.crossOrigin="Anonymous",p.onload=()=>{const h=document.createElement("canvas");h.width=p.naturalWidth||p.width,h.height=p.naturalHeight||p.height,h.getContext("2d").drawImage(p,0,0),f(h.toDataURL("image/png"))},p.onerror=()=>f(d),p.src=d}),r=await o("./assets/images/logo.png"),s=await Promise.all(t.cart.map(async d=>({...d,base64Image:d.image?await o(d.image):r})));n.innerHTML=`
    <div style="background: #ffffff; border-radius: 20px; padding: 20px; border: 1px solid #ffe3d3; color: #27180f;">
      <table style="width: 100%; border-collapse: collapse; border-bottom: 2px dashed #faddcd; padding-bottom: 12px; margin-bottom: 16px;">
        <tr>
          <td style="vertical-align: middle; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; overflow: hidden; background: #fff8f5; border: 1px solid #ffe3d3; padding: 2px; box-sizing: border-box;">
                <img src="${r}" alt="LQK Kids Logo" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
              </div>
              <div>
                <h2 style="font-size: 18px; font-weight: 800; color: #136299; margin: 0; line-height: 1.2;">LQK KIDS</h2>
                <p style="font-size: 11px; font-weight: 600; color: #785a00; margin: 2px 0 0 0;">THỜI TRANG BÉ YÊU</p>
              </div>
            </div>
          </td>
          <td style="vertical-align: middle; text-align: right; padding-bottom: 12px;">
            <p style="font-size: 12px; font-weight: 700; color: #136299; margin: 0;">ĐƠN HÀNG MỚI</p>
            <p style="font-size: 10px; color: #717880; margin: 2px 0 0 0;">${a}</p>
          </td>
        </tr>
      </table>

      <div style="background: #fff1ea; border-radius: 14px; padding: 12px; margin-bottom: 16px; border: 1px solid #ffe3d3;">
        <p style="font-size: 12px; font-weight: 700; color: #136299; margin: 0 0 6px 0; text-transform: uppercase;">THÔNG TIN KHÁCH HÀNG</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Mẹ/Ba:</strong> ${t.name}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>SĐT Zalo:</strong> ${t.phone}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Địa chỉ:</strong> ${t.address}</p>
        ${t.note?`<p style="font-size: 12px; margin: 2px 0; color: #785a00;"><strong>Ghi chú bé:</strong> ${t.note}</p>`:""}
      </div>

      <p style="font-size: 12px; font-weight: 700; color: #27180f; margin: 0 0 8px 0; text-transform: uppercase;">CHI TIẾT ĐƠN HÀNG (${t.cart.length} món)</p>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
        ${s.map(d=>`
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #fff1ea; padding-bottom: 8px; gap: 10px;">
            <div style="width: 48px; height: 48px; min-width: 48px; border-radius: 8px; overflow: hidden; background: #f3f4f6; border: 1px solid #e5e7eb;">
              <img src="${d.base64Image}" alt="${d.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
            <div style="flex: 1;">
              <p style="font-size: 12px; font-weight: 700; margin: 0; color: #27180f;">${d.name}</p>
              <p style="font-size: 11px; color: #41474f; margin: 2px 0 0 0;">Màu: ${d.selectedColor} | Size: <strong>${d.selectedSize}</strong></p>
            </div>
            <div style="text-align: right; min-width: 70px;">
              <p style="font-size: 12px; font-weight: 700; margin: 0; color: #136299;">x${d.quantity}</p>
              <p style="font-size: 11px; font-weight: 700; color: #27180f; margin: 2px 0 0 0;">${(d.price*d.quantity).toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="background: #cfe5ff; border-radius: 14px; padding: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 13px; font-weight: 700; color: #001d33;">TỔNG CỘNG THANH TOÁN:</span>
        <span style="font-size: 18px; font-weight: 800; color: #136299;">${t.total.toLocaleString("vi-VN")}đ</span>
      </div>

      <div style="text-align: center; font-size: 10px; color: #717880;">
        <p style="margin: 0;">Hotline / Zalo Shop: <strong>0934 498 685</strong> - <strong>0925 333 999</strong></p>
        <p style="margin: 2px 0 0 0;">Địa chỉ: Phố Hoa Lâm, Phường Việt Hưng, Quận Long Biên, Hà Nội</p>
      </div>
    </div>
  `,document.body.appendChild(n);const i=await e(n,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#fff8f5"});document.body.removeChild(n);const l=i.toDataURL("image/png"),c=document.createElement("a");c.download=`LQK-Kids-Order-${Date.now()}.png`,c.href=l,c.click()}function b(t){let e=document.getElementById("app-toast");e||(e=document.createElement("div"),e.id="app-toast",e.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-sm text-center px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none",document.body.appendChild(e)),e.textContent=t,e.classList.remove("opacity-0","pointer-events-none"),e.classList.add("opacity-100"),setTimeout(()=>{e.classList.remove("opacity-100"),e.classList.add("opacity-0","pointer-events-none")},3e3)}document.addEventListener("DOMContentLoaded",async()=>{await j(),O(),M();try{let t=null;const e=localStorage.getItem("lqk_kids_admin_products_v1");if(e)try{t=JSON.parse(e)}catch(n){console.error("Failed to parse admin products",n)}if(!t){const n=await fetch("./src/data/products.json");if(!n.ok)throw new Error("Failed to load products.json");t=await n.json()}R(t),D(),X()}catch(t){console.error("App initialization error:",t)}});
