# LQK Kids Landing Page (2026 Production Standard)

Modern, high-performance, responsive landing page for **LQK Kids - Thời trang trẻ em**. Built with Vite, Tailwind CSS v4, and a Decoupled CMS-Ready Architecture where all content, image references, and action URLs are hydrated dynamically from `src/data/content.json`.

---

## 🛠 Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev/) (Vanilla JS ES Modules template)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Architecture:** Decoupled JSON Data-Driven (CMS & Admin Panel Ready)
- **Icons:** Google Material Symbols Outlined

---

## 📁 Project Structure

```
my-landing-page/
├── package.json              # Project dependencies & npm scripts
├── vite.config.js            # Vite setup with Tailwind v4 plugin
├── index.html                # Semantic HTML5 entry point with SEO metadata
├── src/
│   ├── css/
│   │   └── main.css          # Tailwind CSS imports & custom theme tokens
│   ├── data/
│   │   └── content.json      # Central JSON data file (Dynamic content)
│   ├── js/
│   │   ├── modules/
│   │   │   ├── content-renderer.js # CMS Hydration logic (data-cms attributes)
│   │   │   ├── form-handler.js     # Form validation & async submission handler
│   │   │   └── mobile-menu.js      # Mobile menu toggle & smooth scroll
│   │   └── main.js           # Main JS entry module
│   └── assets/
│       ├── images/           # Local image assets
│       └── icons/            # SVG / icon assets
└── README.md                 # Setup & running guide
```

---

## 🚀 Quick Start (Local Testing)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL output by Vite).

### 3. Build for Production
```bash
npm run build
```

---

## 💡 How CMS Decoupled Data Works

All text headings, descriptions, image paths, contact numbers, and social links are managed inside `src/data/content.json`.

In `index.html`, elements are tagged using `data-cms` attributes:
- **Text Content:** `<h1 data-cms="hero.headline"></h1>`
- **Images:** `<img data-cms-img="hero.image" alt="..." />`
- **Links:** `<a data-cms-href="site.zaloUrl"></a>`

When the page loads, `content-renderer.js` fetches `content.json` and automatically hydrates the DOM elements. To update any copy or link on the site, simply modify `src/data/content.json` without altering HTML code!
