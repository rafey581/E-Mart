
// ==========================================
// Authentication & Security Logic
// ==========================================

// Credentials (Obfuscated)
const AUTH_USER = 'YWRtaW5AZW1hcnQuY29t';
const AUTH_PASS = 'YWRtaW4xMjM=';

// Security: Disable Right Click & Inspect
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function (e) {
    if (e.keyCode == 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Ctrl+Shift+I
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { // Ctrl+Shift+C
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { // Ctrl+Shift+J
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { // Ctrl+U
        return false;
    }
}

// Check Authentication on Load
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const loginModal = document.getElementById('login-modal');

    if (isLoggedIn) {
        // User is logged in, hide modal
        if (loginModal) {
            loginModal.style.display = 'none';
            loginModal.classList.remove('active'); // Just in case
        }
    } else {
        // User is not logged in, show modal (it should be shown by default via inline style)
        if (loginModal) {
            loginModal.style.display = 'flex';
        }
    }
}

function handleLogin(e) {
    e.preventDefault();

    const emailInput = document.getElementById('admin-email');
    const passInput = document.getElementById('admin-password');
    const errorMsg = document.getElementById('login-error');

    // Simple obfuscation check (Base64)
    // In a real app, use a backend!
    const emailEncoded = btoa(emailInput.value);
    const passEncoded = btoa(passInput.value);

    if (emailEncoded === AUTH_USER && passEncoded === AUTH_PASS) {
        // Success
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('login-modal').style.display = 'none';
        if (errorMsg) errorMsg.classList.add('hidden');
        alert('✓ Login Successful!');
    } else {
        // Failure
        if (errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.textContent = 'Invalid email or password';
        }
        // Shake animation or visual feedback could be added here
        passInput.value = '';
    }
}

// Override Logout
const originalLogout = window.logout;
window.logout = function () {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.reload(); // Reloads the page, which triggers the login modal check
    }
}
