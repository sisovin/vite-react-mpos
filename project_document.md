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
