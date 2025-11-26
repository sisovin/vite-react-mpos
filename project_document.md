# 📘 Project Document: POS System (React + Node)

## 1. Overview

- **Name:** MPOS (Minimal POS / m-pos)
- **Goal:** A modern POS system prototype demonstrating product browsing, cart management, and a simple checkout/invoice flow.
- **Architecture:** Frontend in Vite + React 19.2 + Tailwind CSS; Backend in Node.js + Express that proxies product APIs and contains a demo checkout endpoint.
- **Data source:** Dummy Products API (dev) and optionally WooCommerce REST API (prod). The backend proxies external APIs so client secrets don't leak into the browser.

---

## 2. High-Level Architecture & Flows

- Frontend (Vite + React): SPA. Uses React Router and a global cart via `CartContext`.
- Backend (Express): Provides proxy routes under `/api/*` that return normalized product object shapes for the frontend.
- Product fetching flow: Frontend calls `/api/products` → Backend fetches from the configured `DATA_SOURCE` → Backend normalizes and returns products.
- Checkout flow (demo): Frontend posts items to `/api/checkout`, backend responds with total; the frontend renders a printable invoice and uses `window.print()`.

---

## 3. Key Features

- Product grid with responsive layout and product cards.
- Client-side cart (context/state) with add/remove/increment/decrement.
- Sticky cart sidebar on desktop (25% width) and floating modal/cart on mobile.
- Print-friendly invoice (basic) and demo `/api/checkout` endpoint.
- Backend proxy for Dummy Products (dev) vs WooCommerce (prod) with env-driven switch.

---

## 4. Project Structure (Overview)

```
vite-react-mpos
├─ frontend/                # Vite + React frontend
│  ├─ index.html
│  ├─ package.json
│  ├─ postcss.config.cjs
│  ├─ tailwind.config.cjs
│  ├─ vite.config.js
│  ├─ public/
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ hooks/
│     │  └─ useProducts.js
│     ├─ context/
│     │  └─ CartContext.jsx
│     ├─ components/
│     │  ├─ ProductCard.jsx
│     │  ├─ Products.jsx
│     │  ├─ Cart.jsx
│     │  ├─ CartSummary.jsx
│     │  ├─ CheckoutForm.jsx
│     │  └─ ... other components
│     ├─ pages/
│     │  ├─ Dashboard.jsx
│     │  ├─ ProductsDashboard.jsx
│     │  ├─ Checkout.jsx
│     │  ├─ PlaceOrder.jsx
│     │  ├─ Onboarding.jsx
│     │  ├─ Signin.jsx
│     │  └─ Signup.jsx
│     └─ styles/
│        ├─ index.css
│        └─ tailwind stuff
└─ server/                  # Node/Express API proxy (dev/prod switching)
   ├─ index.js              # Express app with /api routes
   └─ package.json
```

---

## 5. Backend: Endpoints & Behavior

- GET /api/products
  - Description: Returns a list of available products.
  - Behavior: In dev `DATA_SOURCE=dummy` the backend calls `DUMMY_API_URL` (defaults to `https://dummyjson.com/products`). In `woocommerce` mode it proxies WooCommerce REST API and adds authentication params.

- GET /api/products/:id
  - Description: Returns a single product by ID.

- POST /api/checkout
  - Description: Demo checkout endpoint; calculates and returns the total. In prod this would typically create a payment session.

Helper: The backend normalizes product objects using `toClientProduct(p)` to ensure frontend receives consistent fields: `{ id, title, price, description, thumbnail }`.

---

## 6. Frontend: Key Components & Responsibilities

- `CartContext.jsx` — Global cart context using `useReducer`.
  - Actions: ADD, REMOVE, INCREMENT, DECREMENT, CLEAR.
  - Exposes: `items`, `add`, `remove`, `clear`, `increment`, `decrement`.

- `useProducts.js` — Fetches `/api/products` and returns products.

- `Products.jsx` — Fetches products with `useProducts` and renders `ProductCard` components in a responsive grid.

- `ProductCard.jsx` — Displays single product info with an "Add to cart" button.

- `Cart.jsx` — Mobile cart modal with a table and actions to edit/remove items; checkout navigates to the checkout page.

- `CartSummary.jsx` — Sticky desktop sidebar (25%) with cart table and actions; includes `checkout` which prints invoice HTML.

- `Checkout.jsx` / `PlaceOrder.jsx` — UI for collecting billing/payment info and triggering `POST /api/checkout` and finalizing the order.

---

## 7. UI & Layout Notes

- Desktop: 75% / 25% split (main product grid and sticky cart sidebar). Use grid layout in `App.jsx` and utility classes in Tailwind: `md:grid-cols-4` and `md:col-span-*`.
- Mobile: Floating cart button (bottom) opens a modal `Cart.jsx` that contains the same actions.

---

## 8. Developer Workflow & Local Setup

1. Clone the repo.
2. Start backend and frontend (two terminals):
   - `cd server && npm install && npm run dev`
   - `cd frontend && npm install && npm run dev`
3. Visit `http://localhost:5173` to use the frontend (Vite default)

Env config (server/.env):

```env
DATA_SOURCE=dummy
DUMMY_API_URL=https://dummyjson.com/products
WOO_BASE_URL=https://your-shop.com
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx
PORT=3000
```

---

## 9. Testing & Debugging

- The frontend relies on `fetch('/api/products')`. Confirm backend is running on `PORT` and Vite `proxy` (configured in `frontend/vite.config.js`) routes `/api` requests to `http://localhost:3000`.
- Simulate error conditions by changing `DATA_SOURCE` in `.env`.

---

## 10. Roadmap & Improvements

- Add persistent orders with a database (Postgres/Mongo).
- Add authentication & user session handling (JWT + cookies).
- Add real checkout via Stripe integration on the backend.
- Improve UI accessibility and add unit/e2e tests.

---

## 11. Prompt Frameworks & Copilot Hints

Use the following when adding new features or files with Copilot:

```
Role: Frontend Developer
Task: Implement [feature]
Details: Use Tailwind CSS and React 19.x. Ensure mobile-first responsive layout; add tests and TypeScript where applicable.
Output: Full code file(s), component(s) and changes required.
```

For backend work:

```
Role: Backend Developer
Task: Implement/Extend API [endpoint]
Details: Use Express, env-based config, and node-fetch for 3rd-party endpoints.
Output: `server/index.js` changes, new tests, updated env variables.
```

---

## 12. Contribution & Review Workflow

- Use feature branches with descriptive names (feature/cart-improvements, fix/api-proxy).
- Add tests and keep PRs small and focused.
- Run `npm run lint` (if added) and `npm test` before raising a PR.

---

## 13. Notes

- This project is intentionally minimal; it focuses on a clean, approachable demo of a Vite + React POS flow and a small express backend.
- Consider adding CI, tests, and a production build pipeline if you intend to run the app in real environments.

---

If you’d like, I can now add instructions for a specific deployment (Netlify / Vercel / Azure Static Web App, and Node backend host), or scaffold Stripe integration for a production checkout flow.

---

Last updated: November 26, 2025
# 📘 Project Document: POS System (React + Node)

## 1. Project Overview

- **Goal:** Build a cloud-based POS (Point of Sale) system with item browsing, cart, and checkout functionality.  
- **Tech Stack:**  
  - **Frontend:** Vite + React 19.2, Tailwind CSS  
  - **Backend:** Node.js + Express (proxy API)  
  - **Data Source:**  
    - **Dev:** Dummy Products API  
    - **Prod:** WooCommerce REST API  

---

## 2. Prompt Framework for Copilot

Each prompt follows the **Role → Task → Details → Output** format.  
Use these inside VS Code when working with Copilot.

---

### 🔹 Prompt 1: Product Listing Page

**Role:** Frontend Developer  
**Task:** Create a React page to display products fetched from `/api/products`.  
**Details:**  

- Use Tailwind CSS for styling.  
- Display product cards with image, name, and price.  
- Add "Add to Cart" button.  
**Output:**  
- `ProductList.jsx` React component.  
- Tailwind-based layout.  
- Fetch logic using `fetch('/api/products')`.  

**Prompt Example for Copilot:**  

```
Role: Frontend Developer
Task: Generate a React component that fetches products from /api/products and displays them in a grid.
Details: Use Tailwind CSS for styling. Each card shows image, name, price, and an Add to Cart button.
Output: Full code for ProductList.jsx with Tailwind classes and fetch logic.
```

---

### 🔹 Prompt 2: Minimal Cart Functionality

**Role:** Frontend Developer  
**Task:** Implement a client-side cart.  
**Details:**  

- Use React state (`useState` or context).  
- Add items when "Add to Cart" is clicked.  
- Show cart items in a sidebar or modal.  
- Allow removing items.  
**Output:**  
- `CartContext.jsx` for global state.  
- `Cart.jsx` component for rendering cart.  

**Prompt Example for Copilot:**  

```
Role: Frontend Developer
Task: Implement a minimal client-side cart in React.
Details: Use context for global state. Add items when clicked, show cart in sidebar, allow removal.
Output: Code for CartContext.jsx and Cart.jsx components.
```

---

### 🔹 Prompt 3: Checkout Functionality

**Role:** Frontend Developer  
**Task:** Add checkout button to print bill.  
**Details:**  

- Button at end of cart section.  
- On click, open a print-friendly invoice and call `window.print()` (we generate invoice HTML and open a print window).  
- Ensure bill formatting is printer-friendly (we use simple invoice formatting in the print window).  
**Output:**  
- Updated `CartSummary.jsx` to open a print-friendly invoice on checkout.  
- Added `Cart.jsx` for a sidebar/modal cart UI.

### 🔹 Prompt 5: UI Layout & Cart Table

**Role:** Frontend Developer
**Task:** Rework layout to a 75/25 split and display cart with columns No.|Product|Qty|Price
**Details:**

- Desktop: left 75% shows product grid, right 25% shows CartSummary as a sticky sidebar with a table including No., Product Name, Quantity (with +/-), and Price; includes remove, clear, and checkout buttons.
- Mobile: a floating 'Cart' button opens the `Cart.jsx` modal with the same table and controls.
**Output:**
- `App.jsx` updated to use a grid layout (75/25) via `md:grid-cols-4` + `md:col-span-*`.
- `CartSummary.jsx` UI updated to list cart items in a table with Qty +/- buttons and remove action.

**Prompt Example for Copilot:**  

```
Role: Frontend Developer
Task: Add checkout button to cart that prints the bill.
Details: Place button at end of cart. On click, trigger window.print(). Ensure Tailwind print styles.
Output: Updated Cart.jsx and Tailwind print classes.
```

---

### 🔹 Prompt 4: Backend Proxy Setup

**Role:** Backend Developer  
**Task:** Create Node/Express server that proxies `/api/products`.  
**Details:**  

- In **dev**, fetch from Dummy Products API.  
- In **prod**, fetch from WooCommerce REST API.  
- Use environment variables to switch sources.  
**Output:**  
- `server.js` with Express routes.  
- `.env` config for API URLs.  

**Prompt Example for Copilot:**  

```
Role: Backend Developer
Task: Create Node/Express backend that proxies /api/products.
Details: In dev, fetch from Dummy Products API. In prod, fetch from WooCommerce REST API. Use env variables.
Output: Code for server.js with Express routes and .env config.
```

---

## 3. Workflow with Copilot in VS Code

1. Open `pos-react.md` alongside this project document.  
2. Copy the relevant **prompt block** into VS Code when starting a new file.  
3. Let Copilot generate the code.  
4. Review, test, and refine iteratively.  
5. Use the **Role → Task → Details → Output** framework for every new feature.  

---

## 4. Expansion Ideas

- Add user authentication (JWT + React Router).  
- Add sales reports (charts with Recharts or Chart.js).  
- Add inventory management (stock levels synced with WooCommerce).  
- Add payment integration (Stripe, PayPal).  

---
