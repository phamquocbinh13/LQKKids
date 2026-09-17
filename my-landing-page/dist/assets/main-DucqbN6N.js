import"./modulepreload-polyfill-B5Qt9EMX.js";async function j(){try{let e=null;const t=localStorage.getItem("lqk_kids_admin_content_v1");if(t)try{e=JSON.parse(t)}catch(n){console.error("Failed to parse admin content",n)}if(!e){const n=await fetch("./src/data/content.json");if(!n.ok)throw new Error(`Failed to load content.json: ${n.statusText}`);e=await n.json()}return H(e),e}catch(e){console.error("Content rendering error:",e)}}function C(e,t){return t.split(".").reduce((n,o)=>n&&n[o]!==void 0?n[o]:null,e)}function H(e){document.querySelectorAll("[data-cms]").forEach(a=>{const r=a.getAttribute("data-cms"),i=C(e,r);i!==null&&typeof i=="string"&&(a.textContent=i)}),document.querySelectorAll("[data-cms-img]").forEach(a=>{const r=a.getAttribute("data-cms-img"),i=C(e,r);i&&(a.src=i)}),document.querySelectorAll("[data-cms-href]").forEach(a=>{const r=a.getAttribute("data-cms-href"),i=C(e,r);i&&(a.href=i)})}function M(){const e=document.getElementById("menu-toggle"),t=document.getElementById("mobile-menu"),n=document.querySelectorAll(".nav-link");e&&t&&(e.addEventListener("click",()=>{const o=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!o),t.classList.toggle("hidden")}),n.forEach(o=>{o.addEventListener("click",()=>{t.classList.contains("hidden")||(t.classList.add("hidden"),e.setAttribute("aria-expanded","false"))})})),document.querySelectorAll('a[href^="#"]').forEach(o=>{o.addEventListener("click",function(a){const r=this.getAttribute("href");if(r==="#")return;const i=document.querySelector(r);i&&(a.preventDefault(),i.scrollIntoView({behavior:"smooth",block:"start"}))})})}function O(){const e=document.getElementById("consultation-form"),t=document.getElementById("form-feedback");if(!e)return;e.addEventListener("submit",async o=>{o.preventDefault();const a=new FormData(e),r=Object.fromEntries(a.entries());if(!r.gender||!r.age||!r.weight||!r.phone){n("Vui lòng điền đầy đủ các thông tin cần thiết!","error");return}const i=e.querySelector('button[type="submit"]'),s=i.innerHTML;try{i.disabled=!0,i.innerHTML=`
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>ĐANG GỬI THÔNG TIN...</span>
      `,await new Promise(l=>setTimeout(l,1200)),n("Gửi yêu cầu tư vấn thành công! LQK Kids sẽ liên hệ lại qua Zalo/SĐT trong 15 phút.","success"),e.reset()}catch(l){console.error("Form submission error:",l),n("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng nhắn trực tiếp qua Zalo hoặc Hotline!","error")}finally{i.disabled=!1,i.innerHTML=s}});function n(o,a){t&&(t.textContent=o,t.className=`p-3 rounded-2xl text-sm text-center font-medium mt-3 transition-all ${a==="success"?"bg-tertiary-fixed/40 text-on-tertiary-fixed-variant border border-tertiary-fixed":"bg-error-container text-on-error-container border border-error/30"}`,t.classList.remove("hidden"))}}const S="lqk_kids_cart_v1";class _{constructor(){this.cart=this.loadCart(),this.listeners=[]}loadCart(){try{const t=localStorage.getItem(S);return t?JSON.parse(t):[]}catch(t){return console.error("Failed to load cart from localStorage:",t),[]}}saveCart(){try{localStorage.setItem(S,JSON.stringify(this.cart)),this.notifyListeners()}catch(t){console.error("Failed to save cart to localStorage:",t)}}subscribe(t){this.listeners.push(t),t(this.cart)}notifyListeners(){this.listeners.forEach(t=>t(this.cart))}getCartCount(){return this.cart.reduce((t,n)=>t+(n.quantity||1),0)}getCartTotal(){return this.cart.reduce((t,n)=>t+n.price*(n.quantity||1),0)}addToCart(t,n="",o="",a=1){var l,c,d;const r=n||((c=(l=t.sizeOptions)==null?void 0:l[0])==null?void 0:c.size)||"Chưa chọn size",i=o||((d=t.colors)==null?void 0:d[0])||"Mặc định",s=this.cart.findIndex(f=>f.id===t.id&&f.selectedSize===r&&f.selectedColor===i);s>-1?this.cart[s].quantity+=a:this.cart.push({id:t.id,code:t.code,name:t.name,price:t.price,originalPrice:t.originalPrice,image:t.images[0],selectedSize:r,selectedColor:i,quantity:a}),this.saveCart()}updateQuantity(t,n){if(n<=0){this.removeFromCart(t);return}this.cart[t]&&(this.cart[t].quantity=n,this.saveCart())}updateSize(t,n){this.cart[t]&&(this.cart[t].selectedSize=n,this.saveCart())}removeFromCart(t){t>=0&&t<this.cart.length&&(this.cart.splice(t,1),this.saveCart())}clearCart(){this.cart=[],this.saveCart()}}const x=new _;let u=null,y="",g="",m=1;function D(){const e=document.getElementById("product-modal-close"),t=document.getElementById("product-modal-overlay");e&&e.addEventListener("click",w),t&&t.addEventListener("click",r=>{r.target===t&&w()});const n=document.getElementById("size-chart-modal"),o=document.getElementById("size-chart-modal-close"),a=document.getElementById("size-chart-modal-overlay");o&&o.addEventListener("click",()=>n.classList.add("hidden")),a&&a.addEventListener("click",()=>n.classList.add("hidden"))}function G(e){var n,o,a;u=e,y=((o=(n=e.sizeOptions)==null?void 0:n[0])==null?void 0:o.size)||"",g=((a=e.colors)==null?void 0:a[0])||"",m=1,K();const t=document.getElementById("product-modal");t&&(t.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function w(){const e=document.getElementById("product-modal");e&&(e.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function K(){const e=document.getElementById("product-modal-body");if(!e||!u)return;const t=u.price.toLocaleString("vi-VN")+"đ",n=u.originalPrice?u.originalPrice.toLocaleString("vi-VN")+"đ":"";e.innerHTML=`
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
        ${u.images.map((o,a)=>`
          <button data-img="${o}" class="detail-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${a===0?"border-primary ring-2 ring-primary/30":"border-transparent opacity-70"}">
            <img src="${o}" class="w-full h-full object-cover" />
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
        <span class="text-2xl font-extrabold text-primary tracking-tight">${t}</span>
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
        ${u.colors.map(o=>`
          <button data-color="${o}" class="color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${o===g?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            ${o}
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
        ${u.sizeOptions.map(o=>`
          <button data-size="${o.size}" class="size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${o.size===y?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}">
            <span class="text-xs font-extrabold">${o.size}</span>
            <span class="text-[11px] opacity-90">${o.weight}</span>
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
  `,F()}function F(){const e=document.getElementById("product-modal-body");if(!e)return;const t=document.getElementById("open-size-chart-btn");t&&t.addEventListener("click",()=>{const s=document.getElementById("size-chart-modal");s&&s.classList.remove("hidden")}),e.querySelectorAll(".detail-thumb-btn").forEach(s=>{s.addEventListener("click",()=>{const l=s.getAttribute("data-img"),c=document.getElementById("detail-main-image");c&&(c.src=l),e.querySelectorAll(".detail-thumb-btn").forEach(d=>{d.classList.remove("border-primary","ring-2","ring-primary/30"),d.classList.add("border-transparent","opacity-70")}),s.classList.remove("border-transparent","opacity-70"),s.classList.add("border-primary","ring-2","ring-primary/30")})}),e.querySelectorAll(".color-option-btn").forEach(s=>{s.addEventListener("click",()=>{g=s.getAttribute("data-color");const l=document.getElementById("selected-color-label");l&&(l.textContent=g),e.querySelectorAll(".color-option-btn").forEach(c=>{c.className=`color-option-btn px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${c.getAttribute("data-color")===g?"bg-primary text-on-primary border-primary shadow-xs":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})}),e.querySelectorAll(".size-option-btn").forEach(s=>{s.addEventListener("click",()=>{y=s.getAttribute("data-size"),e.querySelectorAll(".size-option-btn").forEach(l=>{const c=l.getAttribute("data-size")===y;l.className=`size-option-btn p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${c?"bg-secondary-container text-on-secondary-container border-secondary-container shadow-xs ring-2 ring-secondary":"bg-surface-container-low text-on-surface border-surface-container-high hover:bg-surface-container"}`})})});const n=document.getElementById("qty-minus"),o=document.getElementById("qty-plus"),a=document.getElementById("qty-display");n&&o&&a&&(n.addEventListener("click",()=>{m>1&&(m--,a.textContent=m)}),o.addEventListener("click",()=>{m++,a.textContent=m}));const r=document.getElementById("add-to-cart-modal-btn");r&&r.addEventListener("click",()=>{x.addToCart(u,y,g,m),w(),V("Đã thêm sản phẩm vào giỏ hàng!")});const i=document.getElementById("order-now-zalo-btn");i&&i.addEventListener("click",()=>{x.addToCart(u,y,g,m),w();const s=document.getElementById("cart-drawer");s&&s.classList.remove("hidden")})}function V(e){let t=document.getElementById("app-toast");t||(t=document.createElement("div"),t.id="app-toast",t.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none",document.body.appendChild(t)),t.textContent=e,t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),setTimeout(()=>{t.classList.remove("opacity-100"),t.classList.add("opacity-0","pointer-events-none")},2200)}let $=[],L="all",v=1;const Z=8;function R(e){$=e,N(),E(),Q()}function N(){const e=document.getElementById("category-tabs");if(!e)return;const t=[{id:"all",label:"Tất cả",icon:"widgets"},{id:"be-trai",label:"Bé Trai",icon:"boy",color:"text-primary"},{id:"be-gai",label:"Bé Gái",icon:"girl",color:"text-secondary"},{id:"set",label:"Set Đồ",icon:"checkroom",color:"text-tertiary"},{id:"phu-kien",label:"Phụ Kiện",icon:"shopping_basket",color:"text-primary-container"}];e.innerHTML=t.map(n=>{const o=L===n.id;return`
      <button 
        data-category="${n.id}"
        class="category-tab-btn shrink-0 flex items-center gap-1.5 px-4 h-9 rounded-full text-xs font-bold transition-all active:scale-95 ${o?"bg-secondary-container text-on-secondary-container shadow-xs":"bg-surface-container-low hover:bg-surface-container text-on-surface font-medium"}"
      >
        <span class="material-symbols-outlined text-[18px] ${n.color||""}">${n.icon}</span>
        <span>${n.label}</span>
      </button>
    `}).join(""),e.querySelectorAll(".category-tab-btn").forEach(n=>{n.addEventListener("click",()=>{L=n.getAttribute("data-category"),v=1,N(),E()})})}function Q(){const e=document.getElementById("catalog-search-input"),t=document.getElementById("clear-search-btn");e&&e.addEventListener("input",()=>{v=1,E()}),t&&e&&t.addEventListener("click",()=>{e.value="",v=1,E()})}function E(){const e=document.getElementById("catalog-search-input"),t=e?e.value.toLowerCase().trim():"",n=$.filter(o=>{const a=L==="all"||o.category===L,r=!t||o.name.toLowerCase().includes(t)||o.description.toLowerCase().includes(t);return a&&r});P(n)}function P(e){const t=document.getElementById("product-grid"),n=document.getElementById("product-count-badge");if(n&&(n.textContent=`${e.length} sản phẩm`),!t)return;if(e.length===0){t.innerHTML=`
      <div class="col-span-full py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
        <p class="text-sm font-bold text-on-surface">Không tìm thấy sản phẩm phù hợp</p>
        <p class="text-xs text-on-surface-variant mt-1">Vui lòng thử chọn danh mục khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    `,B();return}const o=e.slice(0,v*Z);t.innerHTML=o.map((a,r)=>{const i=a.price.toLocaleString("vi-VN")+"đ",s=a.originalPrice?a.originalPrice.toLocaleString("vi-VN")+"đ":"",l=r<4;return`
      <article class="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-surface-container-high/40 group transition-all duration-300 hover:shadow-md">
        <div class="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden cursor-pointer product-card-trigger" data-id="${a.id}">
          <img 
            src="${a.images[0]}" 
            alt="${a.name} LQK Kids - Thời trang trẻ em" 
            loading="${l?"eager":"lazy"}" 
            decoding="async" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          />
          <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span class="px-2.5 py-0.5 rounded-full bg-${a.badgeColor==="error"?"error-container text-on-error-container":a.badgeColor==="tertiary"?"tertiary-fixed text-on-tertiary-fixed":"secondary-container text-on-secondary-container"} text-[11px] font-extrabold shadow-xs">
              ${a.badge}
            </span>
          </div>
          <button 
            aria-label="Thêm vào yêu thích ${a.name}" 
            class="wishlist-btn absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-xs active:scale-90"
            onclick="event.stopPropagation(); this.classList.toggle('text-error');"
          >
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        </div>

        <div class="p-3 flex flex-col flex-1 justify-between gap-2">
          <div class="flex flex-col cursor-pointer product-card-trigger" data-id="${a.id}">
            <h3 class="text-xs sm:text-sm font-bold leading-snug text-on-surface line-clamp-2 hover:text-primary transition-colors">
              ${a.name}
            </h3>
            <div class="flex items-center gap-1 mt-1 text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px] text-secondary-container" style="font-variation-settings: 'FILL' 1;">star</span>
              <span class="text-xs font-bold text-on-surface">${a.rating}</span>
              <span class="text-[11px] text-outline">• ${a.soldCount} đã bán</span>
            </div>
          </div>

          <div class="pt-1 flex flex-col gap-2">
            <div class="flex items-baseline gap-1.5 flex-wrap">
              <span class="text-sm sm:text-base text-primary font-extrabold">${i}</span>
              ${s?`<span class="text-[11px] text-outline line-through">${s}</span>`:""}
            </div>
            <button 
              data-id="${a.id}"
              class="quick-add-btn w-full h-8 rounded-full bg-primary-fixed hover:bg-primary-container text-on-primary-container text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
            >
              <span class="material-symbols-outlined text-[15px]">add</span>
              <span>Xem size & Chọn mua</span>
            </button>
          </div>
        </div>
      </article>
    `}).join(""),o.length<e.length?U(()=>{v++,P(e)}):B(),t.querySelectorAll(".product-card-trigger, .quick-add-btn").forEach(a=>{a.addEventListener("click",r=>{r.stopPropagation();const i=a.getAttribute("data-id"),s=$.find(l=>l.id===i);s&&G(s)})})}function U(e){let t=document.getElementById("load-more-wrapper");if(!t){const n=document.getElementById("catalog-section");t=document.createElement("div"),t.id="load-more-wrapper",t.className="mt-6 flex justify-center",n.appendChild(t)}t.innerHTML=`
    <button id="load-more-btn" class="px-6 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95">
      <span class="material-symbols-outlined text-[18px]">expand_more</span>
      <span>Xem Thêm Sản Phẩm Khác</span>
    </button>
  `,document.getElementById("load-more-btn").addEventListener("click",e)}function B(){const e=document.getElementById("load-more-wrapper");e&&e.remove()}const J="modulepreload",W=function(e){return"/"+e},T={},Y=function(t,n,o){let a=Promise.resolve();if(n&&n.length>0){let i=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=i(n.map(c=>{if(c=W(c),c in T)return;T[c]=!0;const d=c.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${f}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":J,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((h,I)=>{p.addEventListener("load",h),p.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return a.then(i=>{for(const s of i||[])s.status==="rejected"&&r(s.reason);return t().catch(r)})},z="0934498685";function X(){const e=document.getElementById("cart-drawer-close"),t=document.getElementById("cart-drawer-overlay");document.querySelectorAll(".cart-trigger-btn").forEach(o=>{o.addEventListener("click",tt)}),e&&e.addEventListener("click",A),t&&t.addEventListener("click",o=>{o.target===t&&A()}),x.subscribe(et)}function tt(){const e=document.getElementById("cart-drawer");e&&(e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))}function A(){const e=document.getElementById("cart-drawer");e&&(e.classList.add("hidden"),document.body.classList.remove("overflow-hidden"))}function et(e){const t=document.querySelectorAll(".cart-counter-badge"),n=x.getCartCount();t.forEach(l=>{l.textContent=n,n>0?l.classList.remove("hidden"):l.classList.add("hidden")});const o=document.getElementById("cart-drawer-items"),a=document.getElementById("cart-drawer-footer"),r=document.getElementById("cart-items-count-text");if(r&&(r.textContent=`${n} món`),!o)return;if(e.length===0){o.innerHTML=`
      <div class="py-12 flex flex-col items-center justify-center text-center">
        <span class="material-symbols-outlined text-5xl text-outline mb-3">shopping_bag</span>
        <p class="text-sm font-bold text-on-surface">Giỏ hàng của bé đang trống</p>
        <p class="text-xs text-on-surface-variant mt-1 max-w-xs">Hãy chọn những bộ trang phục thật đẹp cho bé yêu nhé!</p>
      </div>
    `,a&&a.classList.add("hidden");return}a&&a.classList.remove("hidden");const s=x.getCartTotal().toLocaleString("vi-VN")+"đ";o.innerHTML=`
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
      ${e.map((l,c)=>{const d=(l.price*l.quantity).toLocaleString("vi-VN")+"đ",f=l.price.toLocaleString("vi-VN")+"đ";return`
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
        <span class="font-bold text-on-surface">${s}</span>
      </div>
      <div class="flex items-center justify-between text-xs text-on-surface-variant">
        <span>Phí vận chuyển:</span>
        <span class="font-bold text-tertiary">Freeship / Tư vấn Zalo</span>
      </div>
      <div class="pt-2 border-t border-surface-container-low flex items-center justify-between">
        <span class="text-sm font-bold text-on-surface">Tổng cộng thanh toán:</span>
        <span class="text-xl font-extrabold text-primary">${s}</span>
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
  `,nt(o)}function nt(e){e.querySelectorAll(".remove-cart-item-btn").forEach(a=>{a.addEventListener("click",()=>{const r=parseInt(a.getAttribute("data-index"));x.removeFromCart(r)})}),e.querySelectorAll(".update-qty-btn").forEach(a=>{a.addEventListener("click",()=>{const r=parseInt(a.getAttribute("data-index")),i=parseInt(a.getAttribute("data-qty"));x.updateQuantity(r,i)})});const t=document.getElementById("download-order-image-btn");t&&t.addEventListener("click",async()=>{const a=k();if(a){t.disabled=!0,t.innerHTML=`
        <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>
        <span>ĐANG TẠO ẢNH HÓA ĐƠN...</span>
      `;try{const{default:r}=await Y(async()=>{const{default:i}=await import("./html2canvas.esm-QH1iLAAe.js");return{default:i}},[]);await at(a,r),b("Đã lưu ảnh đơn hàng! Hãy đính kèm ảnh này gửi Zalo cho shop nhé 📸")}catch(r){console.error("Failed to generate image:",r),b("Không thể tạo ảnh, vui lòng bấm Copy đơn hàng!")}finally{t.disabled=!1,t.innerHTML=`
          <span class="material-symbols-outlined text-[18px]">image</span>
          <span>📸 LƯU ORDER VÀO ẢNH (GỬI ZALO)</span>
        `}}});const n=document.getElementById("copy-order-text-btn");n&&n.addEventListener("click",()=>{const a=k();if(!a)return;const r=q(a);navigator.clipboard.writeText(r).then(()=>{b("📋 Đã sao chép nội dung đơn hàng! Bố mẹ mở Zalo dán gửi shop nhé.")}).catch(()=>{b("Không thể tự động copy. Vui lòng bấm mở Zalo!")})});const o=document.getElementById("zalo-checkout-form");o&&o.addEventListener("submit",a=>{a.preventDefault();const r=k();if(!r)return;const i=q(r),s=encodeURIComponent(i),c=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?`https://zalo.me/${z}?text=${s}`:`https://zalo.me/${z}`;navigator.clipboard&&navigator.clipboard.writeText(i).catch(()=>{}),window.open(c,"_blank"),b("Đã mở Zalo! Nội dung đơn đã được tự động copy vào bộ nhớ tạm.")})}function k(){const e=document.getElementById("cust-name"),t=document.getElementById("cust-phone"),n=document.getElementById("cust-address"),o=document.getElementById("cust-note");if(!e||!t||!n)return null;const a=e.value.trim(),r=t.value.trim(),i=n.value.trim(),s=o?o.value.trim():"";return!a||!r||!i?(b("Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ nhận hàng!"),null):{name:a,phone:r,address:i,note:s,cart:x.cart,total:x.getCartTotal()}}function q(e){let t=`🛒 *ĐƠN HÀNG LQK KIDS*
`;return t+=`👤 *Khách hàng:* ${e.name}
`,t+=`📞 *SĐT Zalo:* ${e.phone}
`,t+=`📍 *Địa chỉ:* ${e.address}
`,e.note&&(t+=`📝 *Ghi chú bé:* ${e.note}
`),t+=`-------------------------
`,t+=`📦 *DANH SÁCH MÓN:* 
`,e.cart.forEach((n,o)=>{t+=`${o+1}. ${n.name} (${n.selectedColor}, ${n.selectedSize}) x${n.quantity} = ${(n.price*n.quantity).toLocaleString("vi-VN")}đ
`}),t+=`-------------------------
`,t+=`💰 *TỔNG CỘNG:* ${e.total.toLocaleString("vi-VN")}đ (Freeship)
`,t+="Cảm ơn LQK Kids! Nhờ shop check kho và xác nhận size giúp mình nhé!",t}async function at(e,t){const n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.left="-9999px",n.style.width="480px",n.style.backgroundColor="#fff8f5",n.style.fontFamily="'Plus Jakarta Sans', sans-serif",n.style.padding="24px",n.style.borderRadius="24px",n.style.boxShadow="0 10px 30px rgba(0,0,0,0.1)";const o=new Date().toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),a=d=>new Promise(f=>{const p=new Image;p.crossOrigin="Anonymous",p.onload=()=>{const h=document.createElement("canvas");h.width=p.naturalWidth||p.width,h.height=p.naturalHeight||p.height,h.getContext("2d").drawImage(p,0,0),f(h.toDataURL("image/png"))},p.onerror=()=>f(d),p.src=d}),r=await a("./assets/images/logo.png"),i=await Promise.all(e.cart.map(async d=>({...d,base64Image:d.image?await a(d.image):r})));n.innerHTML=`
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
            <p style="font-size: 10px; color: #717880; margin: 2px 0 0 0;">${o}</p>
          </td>
        </tr>
      </table>

      <div style="background: #fff1ea; border-radius: 14px; padding: 12px; margin-bottom: 16px; border: 1px solid #ffe3d3;">
        <p style="font-size: 12px; font-weight: 700; color: #136299; margin: 0 0 6px 0; text-transform: uppercase;">THÔNG TIN KHÁCH HÀNG</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Mẹ/Ba:</strong> ${e.name}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>SĐT Zalo:</strong> ${e.phone}</p>
        <p style="font-size: 12px; margin: 2px 0; color: #27180f;"><strong>Địa chỉ:</strong> ${e.address}</p>
        ${e.note?`<p style="font-size: 12px; margin: 2px 0; color: #785a00;"><strong>Ghi chú bé:</strong> ${e.note}</p>`:""}
      </div>

      <p style="font-size: 12px; font-weight: 700; color: #27180f; margin: 0 0 8px 0; text-transform: uppercase;">CHI TIẾT ĐƠN HÀNG (${e.cart.length} món)</p>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
        ${i.map(d=>`
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
        <span style="font-size: 18px; font-weight: 800; color: #136299;">${e.total.toLocaleString("vi-VN")}đ</span>
      </div>

      <div style="text-align: center; font-size: 10px; color: #717880;">
        <p style="margin: 0;">Hotline / Zalo Shop: <strong>0934 498 685</strong> - <strong>0925 333 999</strong></p>
        <p style="margin: 2px 0 0 0;">Địa chỉ: Phố Hoa Lâm, Phường Việt Hưng, Quận Long Biên, Hà Nội</p>
      </div>
    </div>
  `,document.body.appendChild(n);const s=await t(n,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#fff8f5"});document.body.removeChild(n);const l=s.toDataURL("image/png"),c=document.createElement("a");c.download=`LQK-Kids-Order-${Date.now()}.png`,c.href=l,c.click()}function b(e){let t=document.getElementById("app-toast");t||(t=document.createElement("div"),t.id="app-toast",t.className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] max-w-sm text-center px-4 py-2.5 rounded-full bg-on-surface text-surface text-xs font-bold shadow-lg transition-all transform duration-300 opacity-0 pointer-events-none",document.body.appendChild(t)),t.textContent=e,t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),setTimeout(()=>{t.classList.remove("opacity-100"),t.classList.add("opacity-0","pointer-events-none")},3e3)}document.addEventListener("DOMContentLoaded",async()=>{await j(),M(),O();try{let e=null;const t=localStorage.getItem("lqk_kids_admin_products_v1");if(t)try{e=JSON.parse(t)}catch(n){console.error("Failed to parse admin products",n)}if(!e){const n=await fetch("./src/data/products.json");if(!n.ok)throw new Error("Failed to load products.json");e=await n.json()}R(e),D(),X()}catch(e){console.error("App initialization error:",e)}});
