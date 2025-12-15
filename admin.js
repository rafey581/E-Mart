// Product Management System using LocalStorage
// productsData is loaded from products-data.js

// Initialize products in localStorage if not exists
function initializeProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(productsData));
    }
}

// Get all products from localStorage
function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

// Save products to localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Get next product ID
function getNextId() {
    const products = getProducts();
    if (products.length === 0) return 1;
    return Math.max(...products.map(p => p.id)) + 1;
}

// Add new product
function addProduct(productData) {
    const products = getProducts();
    const newProduct = {
        id: getNextId(),
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock)
    };
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
}

// Update product
function updateProduct(id, productData) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...productData,
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock)
        };
        saveProducts(products);
        return products[index];
    }
    return null;
}

// Delete product
function deleteProduct(id) {
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    saveProducts(filteredProducts);
    return filteredProducts;
}

// Display products in table
function displayProducts() {
    const products = getProducts();
    const tbody = document.getElementById('products-table-body');

    if (!tbody) return;

    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">No products found. Add your first product!</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="font-medium">${product.id}</td>
            <td>
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='./assets/icons/image.png'">
            </td>
            <td class="font-medium">${product.name}</td>
            <td><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${product.category}</span></td>
            <td>${product.brand}</td>
            <td class="font-semibold text-green-600">Rs.${product.price.toFixed(2)}</td>
            <td>
                <span class="${product.stock < 10 ? 'text-red-600 font-semibold' : 'text-gray-700'}">${product.stock}</span>
            </td>
            <td>
                <div class="flex gap-2">
                    <button onclick="editProduct(${product.id})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                    <button onclick="confirmDelete(${product.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update dashboard statistics
function updateDashboard() {
    const products = getProducts();

    // Total products
    const totalProductsEl = document.getElementById('total-products');
    if (totalProductsEl) totalProductsEl.textContent = products.length;

    // Total categories
    const categories = [...new Set(products.map(p => p.category))];
    const totalCategoriesEl = document.getElementById('total-categories');
    if (totalCategoriesEl) totalCategoriesEl.textContent = categories.length;

    // Low stock items
    const lowStock = products.filter(p => p.stock < 10).length;
    const lowStockEl = document.getElementById('low-stock');
    if (lowStockEl) lowStockEl.textContent = lowStock;

    // Recent products (last 5)
    const recentProducts = products.slice(-5).reverse();
    const recentList = document.getElementById('recent-products-list');

    if (recentList) {
        recentList.innerHTML = recentProducts.map(p => `
            <div class="flex items-center gap-4  border-b last:border-b-0 hover:bg-gray-50" style="padding: 1rem;" >
                <img src="${p.image}" alt="${p.name}" class="w-12 h-12 object-cover rounded" onerror="this.onerror=null; this.src='./assets/icons/image.png'">
                <div class="flex-1">
                    <h4 class="font-medium">${p.name}</h4>
                    <p class="text-sm text-gray-500">${p.category} - ${p.brand}</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold text-green-600">Rs.${p.price.toFixed(2)}</p>
                    <p class="text-sm text-gray-500">Stock: ${p.stock}</p>
                </div>
            </div>
        `).join('');
    }
}

// Tab switching
window.switchTab = function (tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.classList.add('active');

    // Add active class to clicked button
    if (event && event.target) event.target.classList.add('active');

    // Refresh data based on tab
    if (tabName === 'dashboard') {
        updateDashboard();
    } else if (tabName === 'products') {
        displayProducts();
    }
}

// Edit product
window.editProduct = function (id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);

    if (!product) return;

    // Fill form
    document.getElementById('edit-product-id').value = product.id;
    document.getElementById('edit-product-name').value = product.name;
    document.getElementById('edit-product-category').value = product.category;
    document.getElementById('edit-product-brand').value = product.brand;
    document.getElementById('edit-product-price').value = product.price;
    document.getElementById('edit-product-stock').value = product.stock;
    document.getElementById('edit-product-image').value = product.image;
    document.getElementById('edit-product-description').value = product.description;

    // Show modal
    document.getElementById('edit-modal').classList.add('active');
}

// Close edit modal
window.closeEditModal = function () {
    document.getElementById('edit-modal').classList.remove('active');
}

// Delete product with confirmation
window.confirmDelete = function (id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);

    if (!product) return;

    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        deleteProduct(id);
        alert('✓ Product deleted successfully!');
        displayProducts();
        updateDashboard();
    }
}

// Switch between image URL and upload tabs
window.switchImageTab = function (tabType) {
    const urlSection = document.getElementById('url-input-section');
    const uploadSection = document.getElementById('upload-input-section');
    const urlInput = document.getElementById('product-image-url');
    const uploadInput = document.getElementById('product-image-upload');
    const hiddenInput = document.getElementById('product-image');
    const preview = document.getElementById('image-preview');
    const buttons = document.querySelectorAll('.image-tab-btn');

    // Update button styles
    buttons.forEach(btn => {
        if (btn.textContent.includes('URL') && tabType === 'url') {
            btn.style.background = '#3b82f6';
            btn.style.color = 'white';
            btn.style.borderColor = '#3b82f6';
            btn.classList.add('active');
        } else if (btn.textContent.includes('Upload') && tabType === 'upload') {
            btn.style.background = '#3b82f6';
            btn.style.color = 'white';
            btn.style.borderColor = '#3b82f6';
            btn.classList.add('active');
        } else {
            btn.style.background = 'white';
            btn.style.color = '#6b7280';
            btn.style.borderColor = '#e5e7eb';
            btn.classList.remove('active');
        }
    });

    // Show/hide sections and clear inputs
    if (tabType === 'url') {
        urlSection.style.display = 'block';
        uploadSection.style.display = 'none';
        uploadInput.value = '';
        hiddenInput.value = urlInput.value || '';
    } else {
        urlSection.style.display = 'none';
        uploadSection.style.display = 'block';
        urlInput.value = '';
        hiddenInput.value = '';
    }

    // Reset preview
    if (preview) {
        preview.innerHTML = '<span>Image preview will appear here</span>';
        preview.classList.add('empty');
    }
}

// Reset form
window.resetForm = function () {
    const form = document.getElementById('add-product-form');
    if (form) form.reset();
    const preview = document.getElementById('image-preview');
    if (preview) {
        preview.innerHTML = '<span>Image preview will appear here</span>';
        preview.classList.add('empty');
    }
    // Reset image tab to URL mode
    switchImageTab('url');
}

// Logout
window.logout = function () {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Admin panel loaded');

    initializeProducts();
    updateDashboard();
    displayProducts();

    // Handle add product form submission
    const addForm = document.getElementById('add-product-form');
    if (addForm) {
        console.log('Add product form found, attaching event listener');
        addForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Form submitted!');

            const formData = new FormData(e.target);
            const productData = {
                name: formData.get('name'),
                category: formData.get('category'),
                brand: formData.get('brand'),
                price: formData.get('price'),
                stock: formData.get('stock'),
                image: formData.get('image'),
                description: formData.get('description')
            };

            console.log('Product data:', productData);

            try {
                const newProduct = addProduct(productData);
                console.log('Product added:', newProduct);
                alert('✓ Product added successfully!');
                e.target.reset();
                const preview = document.getElementById('image-preview');
                if (preview) {
                    preview.innerHTML = '<span>Image preview will appear here</span>';
                    preview.classList.add('empty');
                }

                // Switch to products tab
                switchTab('products');
                const productsTabBtn = document.querySelector('[onclick="switchTab(\'products\')"]');
                if (productsTabBtn) productsTabBtn.classList.add('active');
            } catch (error) {
                console.error('Error adding product:', error);
                alert('✗ Error adding product: ' + error.message);
            }
        });
    } else {
        console.error('Add product form not found!');
    }

    // Image URL preview
    const imageUrlInput = document.getElementById('product-image-url');
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', function (e) {
            const preview = document.getElementById('image-preview');
            const hiddenInput = document.getElementById('product-image');
            const url = e.target.value;

            if (url) {
                preview.innerHTML = `<img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML='<span>Invalid image URL</span>'">`;
                preview.classList.remove('empty');
                hiddenInput.value = url;
            } else {
                preview.innerHTML = '<span>Image preview will appear here</span>';
                preview.classList.add('empty');
                hiddenInput.value = '';
            }
        });
    }

    // Image file upload preview
    const imageUploadInput = document.getElementById('product-image-upload');
    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', function (e) {
            const preview = document.getElementById('image-preview');
            const hiddenInput = document.getElementById('product-image');
            const file = e.target.files[0];

            if (file) {
                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('⚠️ File size must be less than 5MB');
                    e.target.value = '';
                    return;
                }

                // Check file type
                if (!file.type.startsWith('image/')) {
                    alert('⚠️ Please select a valid image file');
                    e.target.value = '';
                    return;
                }

                // Convert to base64 and preview
                const reader = new FileReader();
                reader.onload = function (event) {
                    const base64Image = event.target.result;
                    preview.innerHTML = `<img src="${base64Image}" alt="Preview">`;
                    preview.classList.remove('empty');
                    hiddenInput.value = base64Image;
                };
                reader.readAsDataURL(file);
            } else {
                preview.innerHTML = '<span>Image preview will appear here</span>';
                preview.classList.add('empty');
                hiddenInput.value = '';
            }
        });
    }

    // Handle edit form submission
    const editForm = document.getElementById('edit-product-form');
    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const id = parseInt(document.getElementById('edit-product-id').value);
            const formData = new FormData(e.target);

            const productData = {
                name: formData.get('name'),
                category: formData.get('category'),
                brand: formData.get('brand'),
                price: formData.get('price'),
                stock: formData.get('stock'),
                image: formData.get('image'),
                description: formData.get('description')
            };

            try {
                updateProduct(id, productData);
                alert('✓ Product updated successfully!');
                closeEditModal();
                displayProducts();
                updateDashboard();
            } catch (error) {
                alert('✗ Error updating product: ' + error.message);
            }
        });
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
        icon.classList.remove('text-gray-800');
        icon.classList.add('text-white');
    } else {
        // Moon icon for light mode (to switch to dark)
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
        icon.classList.add('text-gray-800');
        icon.classList.remove('text-white');
    }
}

// Initialize Dark Mode on load
const isDark = localStorage.getItem('darkMode') === 'true';
if (isDark) {
    document.body.classList.add('dark-mode');
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', () => {
        updateThemeIcon(true);
    });
}
