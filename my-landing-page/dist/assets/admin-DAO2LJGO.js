import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as m,l as i,a as u,b as g,u as x}from"./admin-store-8O71uxC0.js";let s=[];document.addEventListener("DOMContentLoaded",async()=>{m(),document.getElementById("admin-logout-btn").addEventListener("click",i),s=await u(),c(s),document.getElementById("search-input").addEventListener("input",l),document.getElementById("category-filter").addEventListener("change",l)});function l(){const t=document.getElementById("search-input").value.toLowerCase().trim(),n=document.getElementById("category-filter").value,a=s.filter(e=>{const d=n==="all"||e.category===n,r=!t||e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t);return d&&r});c(a)}function c(t){const n=document.getElementById("admin-products-grid"),a=document.getElementById("total-count-heading");if(a&&(a.textContent=`Danh Sách Sản Phẩm (${t.length})`),!!n){if(t.length===0){n.innerHTML=`
          <div class="col-span-full py-12 text-center text-slate-400 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <span class="material-symbols-outlined text-4xl mb-2 text-slate-500">inventory_2</span>
            <p class="text-sm font-bold text-white">Không có sản phẩm nào</p>
          </div>
        `;return}n.innerHTML=t.map(e=>`
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3.5 flex flex-col justify-between gap-3 shadow-md hover:border-slate-600 transition-all">
          <div class="flex gap-3">
            <div class="w-20 h-24 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
              <img src="${e.images[0]}" alt="${e.name}" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">${e.categoryName||e.category}</span>
                <h3 class="text-xs font-bold text-white truncate mt-1">${e.name}</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">Mã: ${e.code||"SP"}</p>
              </div>

              <div class="mt-2">
                <span class="text-sm font-extrabold text-amber-400">${e.price.toLocaleString("vi-VN")}đ</span>
                ${e.originalPrice?`<span class="text-[11px] text-slate-500 line-through ml-1">${e.originalPrice.toLocaleString("vi-VN")}đ</span>`:""}
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-700/50 flex items-center justify-between gap-2">
            <a href="edit-product.html?id=${e.id}" class="flex-1 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
              <span class="material-symbols-outlined text-[16px]">edit</span>
              <span>Chỉnh Sửa</span>
            </a>
            <button data-id="${e.id}" class="delete-product-btn w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      `).join(""),n.querySelectorAll(".delete-product-btn").forEach(e=>{e.addEventListener("click",()=>{const d=e.getAttribute("data-id");confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi website?")&&(s=s.filter(r=>r.id!==d),g(s),l())})})}}const o=document.getElementById("change-pass-btn");o&&o.addEventListener("click",()=>{const t=prompt("🔑 Nhập mật khẩu Admin mới (tối thiểu 6 ký tự):");if(t!==null){const n=x(t);alert(n.message),n.success&&i()}});
