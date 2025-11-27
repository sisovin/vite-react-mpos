# MPOS — Minimal POS (Vite + React + Node)

>A minimal, modern Point-of-Sale (POS) demo built with Vite, React 19.2, Tailwind CSS, and a tiny Express backend that proxies product APIs. It demonstrates product browsing, client-side cart management, and a simple printable invoice flow.

---

## ⚡ Quick Links

- Frontend: `frontend/` (Vite + React 19.2)
- Backend: `server/` (Node + Express, proxy API)
- Local frontend dev URL: http://localhost:5173
- Local backend dev URL: http://localhost:3000

---

## 🚀 Features

- Product grid with responsive cards and images
- Client-side cart with sidebar (desktop) and modal (mobile)
- Quantity controls, remove item, clear cart
- Print-friendly invoice UI via `window.open()` + `window.print()`
- Express backend that proxies DummyJSON (dev) and WooCommerce REST API (prod)

---

## 🧩 Tech Stack

- Frontend: Vite, React 19.2, React Router, Tailwind CSS
- Backend: Node.js + Express, node-fetch
- Optional: WooCommerce REST API as a production source

---

## 📦 Getting started

Prerequisites:

- Node 18+ (or >=16 depending on your environment)
- npm (or yarn)

### Install & Run

Run the backend and the frontend in separate terminals:

1) Backend

```pwsh
cd server
npm install
# copy or create server/.env with required variables
npm run dev
```

2) Frontend

```pwsh
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` to view the app.

If product fetching fails, ensure the backend is running and the Vite proxy points to the backend port.

---

## 📁 Project structure

```
vite-react-mpos
├─ frontend/              # Vite + React (client)
│  ├─ index.html
│  ├─ package.json
│  └─ src/
├─ server/                # Node + Express (API proxy)
│  ├─ index.js
│  └─ package.json
├─ project_document.md
└─ README.md
```

Key frontend files
- `src/App.jsx` - Top-level Router + layout, contains CartProvider wrapper.
- `src/context/CartContext.jsx` - Cart state management (reducer + actions).
- `src/hooks/useProducts.js` - Fetches `/api/products` and returns a list of products.
- `src/components/Products.jsx` - Product grid that renders `ProductCard`.
- `src/components/ProductCard.jsx` - Shows product details and add-to-cart action.
- `src/components/CartSummary.jsx` and `src/components/Cart.jsx` - Desktop and mobile cart UIs.

Key backend files
- `server/index.js` - Express app with these routes:
  - GET `/api/products`
  - GET `/api/products/:id`
  - POST `/api/checkout`

---

## 🔌 Backend / API details

- GET `/api/products`
  - Description: proxies to either a Dummy JSON source or WooCommerce API depending on `DATA_SOURCE` env value.
  - Returns: Array of normalized products { id, title, price, description, thumbnail }

- GET `/api/products/:id`
  - Description: returns a single normalized product

- POST `/api/checkout`
  - Description: demo endpoint that calculates the total and returns a success object.

### server/.env (example)

```env
DATA_SOURCE=dummy
DUMMY_API_URL=https://dummyjson.com/products
WOO_BASE_URL=https://your-shop.com
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx
PORT=3000
```

Note: Do not commit `.env` containing secrets. Keep WooCommerce keys on the server only.

---

## 🧪 Testing

There are no automated tests in this example. Suggested next steps:
- Add unit tests for the cart reducer and helper utilities (Jest + React Testing Library)
- Add e2e tests to validate UI flows with Cypress

---

## 🛠️ Development Tips

- Vite hot-reloads on frontend changes. Changes in `server/index.js` require a restart (use nodemon).
- If `window.open()` for printing is blocked, allow popups or change browser settings for local dev.
- Use `DATA_SOURCE=dummy` for fast local dev without WooCommerce credentials.

---

## 🔭 Roadmap (Ideas)

- Add persistent orders and a database (PostgreSQL/MongoDB)
- Add authentication and user management
- Integrate production payment provider (Stripe/PayPal)
- Add tests and CI integration

---

## 🤝 Contributing

Contributions are welcome — open an issue or a PR with a short description and the changes. Keep PRs focused and add tests where possible.

---

If you want, I can also add deployment guides for Vercel/Netlify + Render/Heroku or scaffold Stripe checkout/Order persistence.

````markdown
# MPOS — Minimal POS (Vite + React + Node)

> A minimal, modern Point-of-Sale (POS) demo built with Vite, React 19.2, Tailwind CSS, and a tiny Express backend that proxies product APIs. It demonstrates product browsing, client-side cart management, and a simple printable invoice flow.

---

## ⚡ Quick Links

- Frontend: `frontend/` (Vite + React 19.2)
- Backend: `server/` (Node + Express, proxy API)
- Local frontend dev URL: http://localhost:5173
- Local backend dev URL: http://localhost:3000

---

## 🚀 Features

- Product grid with responsive cards and images
- Client-side cart with sidebar (desktop) and modal (mobile)
- Quantity controls, remove item, clear cart
- Print-friendly invoice UI via `window.open()` + `window.print()`
- Express backend that proxies DummyJSON (dev) and WooCommerce REST API (prod)

---

## 🧩 Tech Stack

- Frontend: Vite, React 19.2, React Router, Tailwind CSS
- Backend: Node.js + Express, Node-Fetch
- Optional: WooCommerce REST API as a production source

---

## 📦 Getting started

Prerequisites:

- Node 18+ (or Node 16+ depending on environment)
- npm (included with Node) or yarn

### Install & Run (two terminals)

1. Backend (server):

```pwsh
cd server
npm install
cp .env.example .env  # or create .env and add values
npm run dev
```

2. Frontend (Vite):

```pwsh
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`.

If you run into CORS, verify server is running on `http://localhost:3000` and the proxy in `vite.config.js` is configured.

---

## 📁 Project structure

```
vite-react-mpos
├─ frontend/              # Vite + React
│  ├─ index.html
│  ├─ package.json
│  ├─ src/
│  └─ styles/
└─ server/                # Node/Express proxy
  ├─ index.js
  └─ package.json
```

Key frontend files
- `src/App.jsx` - Top-level routing and layout, wraps app with `CartProvider`.
- `src/context/CartContext.jsx` - Global cart using reducer.
- `src/hooks/useProducts.js` - Product fetching hook using `/api/products`.
- `src/components/Products.jsx` - Product grid.
- `src/components/ProductCard.jsx` - Product card and `Add to cart` action.
- `src/components/CartSummary.jsx` - Desktop sidebar cart and checkout print flow.
- `src/components/Cart.jsx` - Mobile cart modal.

Key backend files
- `server/index.js` - Minimal Express server to proxy product endpoints and demo checkout.

---

## 🔌 Backend / API

- GET `/api/products` — returns list of products.
- GET `/api/products/:id` — returns single product by ID.
- POST `/api/checkout` — demo endpoint that calculates total and returns { ok, total }.

### Backend env

Create `server/.env` with:

```env
DATA_SOURCE=dummy
DUMMY_API_URL=https://dummyjson.com/products
WOO_BASE_URL=https://your-shop.com
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx
PORT=3000
```

In `DATA_SOURCE=woocommerce` mode the server uses WooCommerce API credentials.

---

## 🧪 Notes on Tests

This repository has no automated test suite currently. Ideas:

- Add unit tests for reducers and helper functions (Jest + React Testing Library)
- Add end-to-end tests (Cypress) for the flow: add to cart, increment, checkout and print.

---

## 🛠 Development Tips & Troubleshooting

- If product fetch fails, check server logs and verify env values.
- Ensure the frontend proxy is routing `/api` to your backend (see `frontend/vite.config.js`).
- Allow popups for the print flow to open.

---

## 🔁 CI (GitHub Actions)

- This repository includes a simple GitHub Actions workflow at `.github/workflows/ci.yml` that runs on pushes and pull requests to `main`.
  - What the workflow checks:
  - Frontend build: installs frontend dependencies (including dev dependencies) and runs `npm --prefix frontend run build`.
  - Backend smoke test: installs server dependencies, starts the server, and calls `/api/products` to ensure the backend responds.

You can extend the workflow later to add lints, tests, and more thorough validations.

## 🔭 Roadmap

- Add real payments: Stripe or PayPal integration
- Persistent user sessions and orders (DB)
- Admin dashboard for product management
- Accessibility improvements

---

## 📣 Contributing

Small changes are welcome: fork, open PR with a clear description, and add tests if possible. Keep PRs small.

---

## 🔐 .gitignore updates

- The `.gitignore` file has been expanded to include common artifacts and generated files such as `dist/`, `build/`, `.DS_Store`, editor folders, and more. This keeps the repository clean and prevents committing environment-specific files.

---

## 📜 License

This example is provided as-is for learning/demo purposes. Add a LICENSE if you intend to reuse components in production.

---

If you'd like, I can also add a deployment guide for Vercel, Netlify (frontend) + Render or Azure for the Node backend — tell me where you'd like to deploy.

---

## ⚙️ Deploying to Vercel

- This repository includes a `vercel.json` that ensures Vercel installs devDependencies for the `frontend` package before building (so Vite and Tailwind are available during the production build). If you prefer not to commit `vercel.json`, configure Vercel Project Settings instead:

  - Install command: `npm --prefix frontend install --include=dev`
  - Build command: `npm --prefix frontend run build`
  - Output directory: `frontend/dist`

⚠️ If your `vercel.json` contains a `builds` array, Vercel ignores the Build & Development Settings in the Project Settings (you'll see a warning in the Vercel UI). Prefer setting `root` + `installCommand`/`buildCommand` in `vercel.json` or configure Project Settings for the `frontend` workspace root.

💡 Note: Vercel runs installs with NODE_ENV=production by default; adding `--include=dev` ensures build tools like Vite and plugins are installed and available during build.
````
# Vite + React EShop (Example)

This example demonstrates a minimal Vite + React 19.2 app with Tailwind CSS and a Node/Express backend that proxies product APIs. In dev, the backend fetches product data from a Dummy Products API. In production, it proxies WooCommerce API (your store) to keep API credentials secret.

Features implemented:

- Vite + React 19.2 frontend
- Tailwind CSS for styling
- Minimal cart (client-side) with a sidebar (`CartSummary.jsx`) and a cart summary control (`CartSummary.jsx`). The sidebar shows a table (No. | Product | Qty with +/- | Price). On mobile a `Cart.jsx` modal provides the same controls.
- Node/Express backend that proxies /api/products from Dummy Products (dev) or WooCommerce (prod).

Usage

1) Copy `.env.example` to `.env` in `server/` and change settings as needed:

```
# server/.env
DATA_SOURCE=dummy
DUMMY_API_URL=https://dummyjson.com/products
WOO_BASE_URL=https://your-shop.com
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx
PORT=3000
```

2) Install packages and start backend and frontend (two terminals):

Terminal 1 (server):

```pwsh
cd server
npm install
npm run dev
```

Terminal 2 (frontend):

```pwsh
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` to see the frontend (Vite default). The frontend will proxy `/api/*` requests to `http://localhost:3000` per `vite.config.js`.

Development flow and production notes

- Development (Dummy): Set `DATA_SOURCE=dummy` in `server/.env`.
- Production (WooCommerce): Set `DATA_SOURCE=woocommerce` and configure the WooCommerce credentials. The backend will call the WooCommerce REST API and return sanitized data to the frontend.

Security

- API keys and secrets must never be placed inside client code or committed to source control.
- Use HTTPS in production.
- Add caching, rate-limiting, and token rotation for production usage.

Integrating Shadcn UI

- To use ShadCN UI, follow the project instructions from <https://ui.shadcn.com/docs/primitives/installation>
- Typically: install the `shadcn/ui` package and required Radix packages, then import components or generated components and style with Tailwind.

Tip: If you see an error like "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin", install the new PostCSS plugin and re-install frontend deps:

```pwsh
cd frontend
npm install @tailwindcss/postcss
npm install
npm run dev
```

Next steps / Improvements

- Add product details page, server-cached product endpoints.
- Add a server endpoint to create Stripe checkout sessions for real purchases.
- Add user sessions and save orders to a database (MongoDB / PostgreSQL).

Enjoy the example — tell me if you'd like me to add Stripe checkout or a WooCommerce demo connection flow (server-only) and I can implement it for you.
