// Simple non-module version for compatibility
(async function () {
  // Initialize products in localStorage if not exists or needs update
  async function initializeProducts() {
    let localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    let hasUpdates = false;

    // Try to use global productsData (loaded from products-data.js) if available
    if (typeof productsData !== 'undefined' && Array.isArray(productsData)) {
      console.log('Checking for updates from products-data.js');

      // 1. Identify products from productsData that are completely missing in localStorage
      const missingProducts = productsData.filter(pData =>
        !localProducts.some(pLocal => pLocal.id === pData.id)
      );

      if (missingProducts.length > 0) {
        console.log(`Adding ${missingProducts.length} new default products to localStorage`);
        localProducts = [...localProducts, ...missingProducts];
        hasUpdates = true;
      }

      // 2. Check for updates to existing products (specifically images)
      localProducts = localProducts.map(pLocal => {
        const pData = productsData.find(p => p.id === pLocal.id);
        if (pData && pData.image && (!pLocal.image || pLocal.image === "")) {
          console.log(`Updating image for product: ${pLocal.name}`);
          hasUpdates = true;
          return { ...pLocal, image: pData.image };
        }
        return pLocal;
      });

      if (hasUpdates) {
        localStorage.setItem('products', JSON.stringify(localProducts));
      }
      return;
    }

    // Fallback: If localStorage is totally empty and no global data, try fetch
    if (localProducts.length === 0) {
      try {
        const response = await fetch('./api/products.json');
        if (response.ok) {
          const fetchedData = await response.json();
          localStorage.setItem('products', JSON.stringify(fetchedData));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  }

  // Get products from localStorage
  function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }

  // Create individual product card
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300';

    card.innerHTML = `
            <div class="relative overflow-hidden bg-gray-100 cursor-pointer">
                <img 
                    src="${product.image || './assets/icons/image.png'}" 
                    alt="${product.name}"
                    class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onerror="this.onerror=null; this.src='./assets/icons/image.png'"
                >
                ${product.stock < 10 ? '<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">Low Stock</span>' : ''}
            </div>
            <div style="padding: 1rem; cursor-pointer">
                <div class="flex justify-between items-start mb-2">
                    <h3 class=" md:text-lg text-sm    font-semibold text-gray-800 line-clamp-1">${product.name}</h3>
                    <span class="text-xs  bg-blue-100 text-blue-800 px-2 py-1 rounded">${product.category}</span>
                </div>
                <p class=" md:text-sm text-xs  text-gray-600 mb-2 line-clamp-2">${product.description || 'No description available'}</p>
                <div class="flex justify-between items-center mb-3">
                    <span class=" md:text-sm text-xs  text-gray-500">${product.brand}</span>
                    <span class="text-xs text-gray-400">Stock: ${product.stock}</span>
                </div>
            <div class="flex justify-between items-center">
                    <span class=" md:text-2xl text-lg font-bold text-blue-600 cursor-pointer">Rs. ${Math.round(product.price)}</span>
                    <div class="flex gap-2 items-center">
                        <button 
                            onclick="window.addToWishlist(${product.id})" 
                            class="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                            title="Add to Wishlist"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button 
                            onclick="window.addToCart(${product.id})" style="padding: 0.2rem 0.5rem; cursor-pointer"
                            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-xs md:text-sm font-medium"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

    return card;
  }

  // Cart and Wishlist Logic
  window.addToCart = function (productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        alert(`${product.name} quantity updated in cart`);
      } else {
        cart.push({ ...product, quantity: 1 });
        alert(`${product.name} added to cart`);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      // Dispatch event for UI updates if needed
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  window.addToWishlist = function (productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (!wishlist.some(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.name} added to wishlist`);
      } else {
        alert('Item already in wishlist');
      }
    }
  };

  // Function to display products on the homepage
  function showProductContainer(products) {
    const productSection = document.getElementById('product-container');

    if (!productSection) {
      console.error('Product container not found');
      return;
    }

    // Clear existing products
    productSection.innerHTML = '';

    if (!products || products.length === 0) {
      productSection.innerHTML = '<p class="text-center text-gray-500 col-span-full">No products available</p>';
      return;
    }

    // Create product cards
    products.forEach(product => {
      const productCard = createProductCard(product);
      productSection.appendChild(productCard);
    });
  }

  // Initialize and display products
  await initializeProducts();
  let products = getProducts();

  console.log('Loaded products:', products.length, 'items');

  // Display products on the page
  // Check if we are on the search results page
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');

  // If on search results page and have a query
  if (window.location.pathname.includes('search-results.html') && searchQuery) {
    const term = searchQuery.toLowerCase().trim();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      (product.category && product.category.toLowerCase().includes(term))
    );

    const countElement = document.getElementById('search-results-count');
    if (countElement) {
      countElement.textContent = `Found ${filteredProducts.length} results for "${searchQuery}"`;
    }

    showProductContainer(filteredProducts);
  } else if (!window.location.pathname.includes('search-results.html')) {
    // If on homepage (or other pages), show all products by default
    showProductContainer(products);
  }

  // Search Input Event Listener (Handles redirection)
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    // Pre-fill search input if on search page
    if (searchQuery) {
      searchInput.value = searchQuery;
    }

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const term = e.target.value.trim();
        if (term) {
          window.location.href = `search-results.html?q=${encodeURIComponent(term)}`;
        }
      }
    });
  }

  // Refresh products when localStorage changes
  window.addEventListener('storage', function (e) {
    if (e.key === 'products') {
      products = getProducts();
      // Re-apply filter if on search page
      if (window.location.pathname.includes('search-results.html') && searchQuery) {
        const term = searchQuery.toLowerCase().trim();
        const filteredProducts = products.filter(product =>
          product.name.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term))
        );
        showProductContainer(filteredProducts);
      } else if (!window.location.pathname.includes('search-results.html')) {
        showProductContainer(products);
      }
    }
  });

  // Dark Mode Logic
  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateThemeIcon(isDark);
  };

  function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;

    if (isDark) {
      // Sun icon for dark mode (to switch back to light)
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    } else {
      // Moon icon for light mode (to switch to dark)
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
    }
  }

  // Initialize Dark Mode on load
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
    // We might need to wait for DOM to update icon if script runs too early, but usually main.js is at end of body
    updateThemeIcon(true);
  }

})();
