// Function to display products on the homepage
export function showProductContainer(products) {
    const productSection = document.getElementById('product-container');

    if (!productSection) {
        console.error('Product container not found');
        return;
    }

    // Clear existing products
    productSection.innerHTML = '';

    // Create product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productSection.appendChild(productCard);
    });
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300';

    card.innerHTML = `
    <div class="relative h-64 overflow-hidden bg-gray-100">
      <img 
        src="${product.image || '/assets/images/placeholder.png'}" 
        alt="${product.name}"
        class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        onerror="this.src='/assets/images/placeholder.png'"
      >
      ${product.stock < 10 ? '<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">Low Stock</span>' : ''}
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-1">${product.name}</h3>
        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${product.category}</span>
      </div>
      <p class="text-sm text-gray-600 mb-2 line-clamp-2">${product.description || 'No description available'}</p>
      <div class="flex justify-between items-center mb-3">
        <span class="text-sm text-gray-500">${product.brand}</span>
        <span class="text-xs text-gray-400">Stock: ${product.stock}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
        <button 
          onclick="addToCart(${product.id})"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `;

    return card;
}

// Add to cart function (placeholder)
window.addToCart = function (productId) {
    console.log('Adding product to cart:', productId);
    // TODO: Implement cart functionality
    alert('Product added to cart! (Cart functionality coming soon)');
}
