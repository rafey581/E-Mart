# E-Mart - E-Commerce Platform

E-Mart is a modern, responsive, and lightweight e-commerce web application. It features a rich user interface, a comprehensive product catalog, a shopping cart, a wishlist, and a fully functional admin dashboard for managing products.

👉 [**View Full Documentation on Google Drive**](https://docs.google.com/document/d/1qB2uPtC5o4i-8cpz3XnqrASOJY4G-pDOwPB-ZNItIYk/edit?usp=sharing
)
👉 [**View Figma Design on Figma**](https://www.figma.com/design/o8PvXqEpR0nWjis6p6R4fo/Untitled?node-id=171-6&t=HvYP5P5624VLJCLK-0)


## 🚀 Features

### For Users
*   **Modern Design**: Built with Tailwind CSS for a sleek, responsive, and mobile-friendly experience.
*   **Product Browsing**: Browse a wide range of products across categories (Electronics, Fashion, Home, Sports).
*   **Dynamic Search**: Real-time search functionality to find products instantly.
*   **Shopping Cart**: Add products to the cart, manage quantities, and view totals.
*   **Wishlist**: Save favorite items for later.
*   **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
*   **Responsive**: Fully optimized for desktops, tablets, and mobile devices.

### For Admins
*   **Dashboard**: View key metrics like total products, categories, low stock alerts, and recent additions.
*   **Product Management**: 
    *   **Add**: Create new products with details like name, category, price, stock, and images.
    *   **Edit**: Update existing product details.
    *   **Delete**: Remove products from the catalog.
*   **Secure Access**: Protected by an authentication system (see `LOGIN_CREDENTIALS.md`).

---

## 🛠 Technology Stack

*   **Frontend Structure**: HTML5
*   **Styling**: Tailwind CSS (via CDN) & Custom CSS (`style.css`)
*   **Logic**: Vanilla JavaScript (ES6+)
*   **Data Persistence**: 
    *   **LocalStorage**: Used for user preferences (Dark Mode, Cart, Wishlist) and dynamic product updates.
    *   **Static Data**: `products-data.js` serves as the initial database seed, ensuring products populate on any device.

---

## 📂 Project Structure

```
E-Mart/
├── assets/                 # Images and icons
│   ├── icons/              # UI icons (cart, heart, search, etc.)
│   └── images/             # Product images and banners
├── api/                    # JSON data fallbacks
├── products-data.js        # Core static database of products (Seeder)
├── index.html              # Home page
├── search-results.html     # Search results display page
├── cart.html               # Shopping cart page
├── whishlist.html          # Wishlist page
├── admin.html              # Admin dashboard interface
├── main.js                 # Core application logic (Cart, Wishlist, UI)
├── admin.js                # Admin dashboard logic (CRUD operations)
├── admin-auth.js           # Admin authentication logic
└── style.css               # Global custom styles and animations
```

---

## ⚙️ How It Works (Data Architecture)

E-Mart uses a **Hybrid Data Approach** to ensure reliability and persistence:

1.  **Static Seed Data**: The file `products-data.js` contains the "hardcoded" list of base products. This ensures that when you share this project folder with others (or open it on a new laptop), the products **always** appear.
2.  **LocalStorage Overlay**: When the site loads, it checks `localStorage` (the browser's internal memory). 
    *   If you add/edit products via the Admin Panel, these changes are saved to `localStorage`.
    *   The system merges the Static Seed Data with your LocalStorage changes.
    *   **Crucial Note**: If you add a product via the Admin Panel, it is saved *only on that specific computer/browser*. To add products permanently for *everyone*, you edits `products-data.js`.

---

## 🖼️ How to Add Images Manually

Since this is a client-side application (no backend server), images must be added to the project folder to be visible on all devices.

1.  **Save the Image**: Place your image file (e.g., `watch.jpg`) into the `assets/images/` folder.
2.  **Link the Image**:
    *   Open `products-data.js` in your code editor.
    *   Find the product you want to update.
    *   Change the `image` field to point to your file:
        ```javascript
        {
          id: 1,
          name: "Smart Watch",
          // ...
          image: "./assets/images/watch.jpg" 
        }
        ```
    *   Save the file. The image will now appear on all devices that have this project folder.

---

## 🔑 Admin Access

To access the Admin Panel (`admin.html`), you need to log in.
Please refer to the file `LOGIN_CREDENTIALS.md` for the default username and password.

---

## 🚀 Getting Started

1.  **Download/Clone** the project folder.
2.  **Open `index.html`** in any modern web browser (Chrome, Edge, Firefox).
3.  **Enjoy!** No installation (npm/node) is strictly required to run the basic site, as it uses CDN links for Tailwind.

---

*Created by Abdul Rafey, Jawad Ashraf, Muhammad Zeeshan - Bano Qabil Sahiwal*
