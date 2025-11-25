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
