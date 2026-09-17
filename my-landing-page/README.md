# LQK Kids Unified Web Application (2026 Production Standard)

Unified, responsive Kids Fashion E-Commerce Landing & Catalog Web Application integrating **Product Catalog ("danh muc san pham")**, **Product Detail Modal ("chi tiet san pham")**, and **Zalo Cart / Checkout Flow ("gio hang Zalo")**.

---

## 🛠 Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev/) (Vanilla ES Modules template)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** Decoupled JSON Data-Driven Architecture + Reactive LocalStorage Store
- **Icons:** Google Material Symbols Outlined

---

## 📁 Architecture & Folder Map

```
my-landing-page/
├── package.json
├── vite.config.js
├── index.html                # Unified HTML entry point containing Catalog Grid, Detail Modal & Zalo Cart Drawer
├── src/
│   ├── css/
│   │   └── main.css          # Tailwind CSS imports & color theme tokens
│   ├── data/
│   │   ├── content.json      # Site copy & branding text metadata
│   │   └── products.json     # Central product catalog data file
│   ├── js/
│   │   ├── store.js          # Reactive cart store & localStorage persistence
│   │   ├── renderers/
│   │   │   ├── product-list.js   # Category filtering & search grid renderer
│   │   │   ├── product-detail.js # Product detail modal & size/color selector
│   │   │   └── zalo-cart.js      # Cart drawer, customer info form & Zalo deep-link redirect
│   │   └── main.js           # Main application entry point
│   └── assets/
│       └── images/           # Local product images
└── README.md
```

---

## 🔗 Integrated Features & User Flows

1. **Product Category Filtering (`product-list.js`)**:
   - Filter catalog dynamically by: **Tất cả**, **Bé Trai**, **Bé Gái**, **Set Đồ**, **Phụ Kiện**.
   - Live interactive search bar filtering product titles and descriptions without reloading.

2. **Product Detail View (`product-detail.js`)**:
   - Clicking any product card opens a smooth modal showing image gallery thumbnails, color selector, weight-based size selector, and quantity stepper.

3. **Zalo Cart & Order Flow (`zalo-cart.js`)**:
   - Items added to cart are stored reactively in `localStorage`.
   - Cart Drawer summarizes items, subtotal, and collects customer shipping information (*Tên, SĐT Zalo, Địa chỉ, Ghi chú bé*).
   - Submitting the form formats a clean Zalo order message and redirects directly to Zalo chat via `https://zalo.me/0934498685?text=...`.

---

## 🚀 Local Testing Commands

```bash
cd my-landing-page
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.
