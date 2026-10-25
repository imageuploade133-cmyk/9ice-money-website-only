/**
 * 9ICE MONEY - Shared UI Components & Shell Manager
 * Handles reusable navigation header, top banner, footer, modals, and toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTopBanner();
    initHeader();
    initFooter();
    initModals();
    initToasts();
});

function getActivePage() {
    const path = window.location.pathname;
    if (path.includes('about.html')) return 'about';
    if (path.includes('products.html')) return 'products';
    if (path.includes('services.html')) return 'services';
    if (path.includes('support.html')) return 'support';
    return 'home';
}

function initTopBanner() {
    const bannerContainer = document.getElementById('top-banner-container');
    if (!bannerContainer) return;

    bannerContainer.innerHTML = `
    <div class="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-xs py-2 px-4 border-b border-amber-500/20 text-center font-medium text-amber-200/90 flex justify-center items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
            <i class="fa-solid fa-crown text-[10px]"></i> Luxury Banking
        </span>
        <span>Experience 9ice Money Black Edition • Enjoy up to 18% Annual Yield & VIP Concierge</span>
        <a href="products.html" class="underline hover:text-white font-bold ml-1 transition-colors">Explore Vaults <i class="fa-solid fa-arrow-right text-[10px]"></i></a>
    </div>`;
}

function initHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const activePage = getActivePage();

    const navItems = [
        { key: 'home', label: 'Home', href: 'index.html', icon: 'fa-house' },
        { key: 'about', label: 'About Us', href: 'about.html', icon: 'fa-building' },
        { key: 'products', label: 'Products', href: 'products.html', icon: 'fa-gem' },
        { key: 'services', label: 'Services', href: 'services.html', icon: 'fa-concierge-bell' },
        { key: 'support', label: 'Support', href: 'support.html', icon: 'fa-headset' }
    ];

    const desktopNavHtml = navItems.map(item => {
        const isActive = activePage === item.key;
        const activeClasses = isActive
            ? 'px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 transition-all flex items-center gap-2'
            : 'px-4 py-2 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all flex items-center gap-2';
        const iconColor = isActive ? '' : 'text-gray-400';
        return `<a href="${item.href}" class="${activeClasses}">
            <i class="fa-solid ${item.icon} text-[11px] ${iconColor}"></i> ${item.label}
        </a>`;
    }).join('');

    const mobileNavHtml = navItems.map(item => {
        const isActive = activePage === item.key;
        const activeClasses = isActive
            ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-semibold text-sm border border-emerald-500/20'
            : 'flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-900 transition-all text-sm font-medium';
        return `<a href="${item.href}" class="${activeClasses}">
            <i class="fa-solid ${item.icon} text-emerald-400"></i> ${item.label}
        </a>`;
    }).join('');

    headerContainer.innerHTML = `
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-emerald-500/10 shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-3 group">
                    <div class="relative">
                        <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-brand-500 to-amber-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 group-hover:scale-105 transition-all duration-300">
                            <i class="fa-solid font-black text-slate-950 text-xl tracking-tighter">9</i>
                        </div>
                        <span class="absolute -top-1 -right-1 flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                            9ICE <span class="gradient-text">MONEY</span>
                        </span>
                        <span class="text-[9px] uppercase tracking-widest text-amber-400/80 font-bold -mt-1">Private Wealth</span>
                    </div>
                </a>

                <!-- Desktop Navigation Links -->
                <nav class="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-900/60 p-1.5 rounded-full border border-gray-800/80 backdrop-blur-md">
                    ${desktopNavHtml}
                </nav>

                <!-- Action Buttons -->
                <div class="hidden md:flex items-center space-x-3">
                    <button type="button" onclick="toggleModal('loginModal')" class="text-xs font-semibold text-gray-300 hover:text-white px-4 py-2.5 rounded-xl border border-gray-800 hover:border-gray-700 bg-slate-900/50 hover:bg-slate-800/80 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-lock text-[11px] text-brand-400"></i> Sign In
                    </button>
                    <button type="button" onclick="toggleModal('downloadModal')" class="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-brand-500 to-amber-400 p-[1px] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all">
                        <div class="bg-slate-950 group-hover:bg-transparent px-5 py-2.5 rounded-[11px] transition-all flex items-center gap-2">
                            <i class="fa-solid fa-download text-xs text-amber-400 group-hover:text-slate-950 transition-colors"></i>
                            <span class="text-xs font-bold text-white group-hover:text-slate-950 transition-colors">Get App</span>
                        </div>
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button type="button" id="mobileMenuBtn" aria-label="Toggle Navigation Menu" class="md:hidden text-gray-300 hover:text-white focus:outline-none p-2 rounded-xl bg-slate-900 border border-gray-800">
                    <i class="fa-solid fa-bars text-xl"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobileMenu" class="hidden md:hidden border-t border-gray-800/80 bg-slate-950/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3">
            <div class="grid grid-cols-1 gap-1">
                ${mobileNavHtml}
            </div>

            <div class="pt-4 border-t border-gray-800 flex flex-col gap-3">
                <button type="button" onclick="toggleModal('loginModal')" class="w-full text-center font-semibold text-gray-200 py-3 rounded-xl border border-gray-800 bg-slate-900 text-sm flex items-center justify-center gap-2">
                    <i class="fa-solid fa-lock text-brand-400"></i> Sign In
                </button>
                <button type="button" onclick="toggleModal('downloadModal')" class="w-full text-center font-bold text-gray-950 bg-gradient-to-r from-emerald-400 via-brand-500 to-amber-400 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                    <i class="fa-solid fa-download"></i> Get 9ice Money App
                </button>
            </div>
        </div>
    </header>`;

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function initFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer class="border-t border-gray-800 bg-slate-950 pt-16 pb-12 text-gray-400 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

                <!-- Brand Info -->
                <div class="col-span-2 space-y-4">
                    <a href="index.html" class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center font-bold text-slate-950">
                            9
                        </div>
                        <span class="text-xl font-extrabold text-white">9ICE <span class="gradient-text">MONEY</span></span>
                    </a>
                    <p class="text-gray-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                        Official 9ice Money payment app. Fast, secure money transfers, daily high-yield savings, and virtual cards for digital life.
                    </p>
                    <div class="flex space-x-4 text-gray-400 pt-2">
                        <a href="#" aria-label="Twitter" class="hover:text-brand-400 text-lg transition"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" aria-label="Facebook" class="hover:text-brand-400 text-lg transition"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" aria-label="Instagram" class="hover:text-brand-400 text-lg transition"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" aria-label="LinkedIn" class="hover:text-brand-400 text-lg transition"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>

                <!-- Column 1 -->
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
                    <ul class="space-y-2.5 text-xs">
                        <li><a href="index.html" class="hover:text-brand-400 transition">Home</a></li>
                        <li><a href="about.html" class="hover:text-brand-400 transition">About Us</a></li>
                        <li><a href="products.html" class="hover:text-brand-400 transition">Products & Vaults</a></li>
                        <li><a href="services.html" class="hover:text-brand-400 transition">Bespoke Services</a></li>
                        <li><a href="support.html" class="hover:text-brand-400 transition">Help & Support</a></li>
                    </ul>
                </div>

                <!-- Column 2 -->
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Products</h4>
                    <ul class="space-y-2.5 text-xs">
                        <li><a href="products.html#transfers" class="hover:text-brand-400 transition">Instant Transfers</a></li>
                        <li><a href="products.html#savings" class="hover:text-brand-400 transition">High-Yield Savings</a></li>
                        <li><a href="products.html#cards" class="hover:text-brand-400 transition">Virtual Dollar Cards</a></li>
                        <li><a href="products.html#services" class="hover:text-brand-400 transition">Corporate Treasury</a></li>
                    </ul>
                </div>

                <!-- Column 3 -->
                <div>
                    <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
                    <ul class="space-y-2.5 text-xs">
                        <li><a href="#" class="hover:text-brand-400 transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-brand-400 transition">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-brand-400 transition">NDPR Compliance</a></li>
                        <li><a href="#" class="hover:text-brand-400 transition">Security Policy</a></li>
                    </ul>
                </div>

            </div>

            <!-- Disclaimer & Copyright -->
            <div class="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center space-y-4 md:space-y-0 text-xs text-gray-500">
                <p>© <span id="currentYear">${new Date().getFullYear()}</span> 9ICE MONEY. All rights reserved.</p>
                <p>9ice Money is a financial technology platform licensed by CBN & NDIC Insured.</p>
            </div>
        </div>
    </footer>`;
}

function initModals() {
    const modalsContainer = document.getElementById('modals-container');
    if (!modalsContainer) return;

    modalsContainer.innerHTML = `
    <!-- App Download Modal -->
    <div id="downloadModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 relative border border-brand-500/30">
            <button type="button" onclick="toggleModal('downloadModal')" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>

            <div class="text-center space-y-4">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-slate-950 text-2xl font-bold mx-auto shadow-lg shadow-brand-500/30">
                    9
                </div>
                <h3 class="text-2xl font-extrabold text-white">Get 9ice Money App</h3>
                <p class="text-xs text-gray-300">Scan the QR code or select your store to download immediately.</p>

                <div class="p-4 bg-white rounded-2xl max-w-[180px] mx-auto shadow-inner">
                    <svg class="w-full h-auto" viewBox="0 0 100 100" fill="black">
                        <rect width="100" height="100" fill="white"/>
                        <path d="M10 10h30v30H10zM15 15v20h20V15zM20 20h10v10H20zM60 10h30v30H60zM65 15v20h20V15zM70 20h10v10H70zM10 60h30v30H10zM15 65v20h20V65zM20 70h10v10H20zM50 10h5v10h-5zM50 30h5v10h-5zM40 50h10v5H40zM60 50h10v5H60zM80 50h10v10H80zM50 70h20v5H50zM70 80h20v10H70zM50 90h10v10H50z"/>
                    </svg>
                </div>

                <div class="pt-2 flex flex-col gap-3">
                    <button type="button" onclick="showToast('App Store redirect initialized', 'info')" class="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 border border-gray-700">
                        <i class="fa-brands fa-apple text-xl"></i> Download for iOS
                    </button>
                    <button type="button" onclick="showToast('Google Play Store redirect initialized', 'info')" class="w-full py-3 bg-brand-500 hover:bg-brand-600 text-gray-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
                        <i class="fa-brands fa-google-play text-xl"></i> Download for Android
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div id="loginModal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div class="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 relative border border-gray-700">
            <button type="button" onclick="toggleModal('loginModal')" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>

            <div class="space-y-6">
                <div class="text-center space-y-2">
                    <h3 class="text-2xl font-extrabold text-white">Sign In to 9ice Money</h3>
                    <p class="text-xs text-gray-400">Enter your credentials to access your Web Portal</p>
                </div>

                <form id="loginForm" onsubmit="handleLoginSubmit(event)" class="space-y-4">
                    <div>
                        <label for="loginAccountInput" class="block text-xs font-semibold text-gray-300 mb-1">Phone Number or Email</label>
                        <input type="text" id="loginAccountInput" required autocomplete="username" placeholder="e.g. 09012345678" class="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white focus:outline-none focus:border-brand-500 text-sm">
                    </div>

                    <div>
                        <label for="loginPasswordInput" class="block text-xs font-semibold text-gray-300 mb-1">Passcode / Password</label>
                        <input type="password" id="loginPasswordInput" required autocomplete="current-password" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white focus:outline-none focus:border-brand-500 text-sm">
                    </div>

                    <div class="flex justify-between items-center text-xs">
                        <label class="flex items-center text-gray-400 gap-2 cursor-pointer">
                            <input type="checkbox" class="accent-brand-500 rounded"> Remember Me
                        </label>
                        <a href="#" class="text-brand-400 hover:underline">Forgot Passcode?</a>
                    </div>

                    <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-brand-500 to-emerald-400 text-gray-950 font-bold rounded-xl shadow-lg shadow-brand-500/20 hover:opacity-95 transition">
                        Sign In Now
                    </button>
                </form>
            </div>
        </div>
    </div>`;
}

function initToasts() {
    if (!document.getElementById('toast-container')) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast-container';
        toastDiv.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
        document.body.appendChild(toastDiv);
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container') || document.body;
    const toast = document.createElement('div');
    const colorClass = type === 'success'
        ? 'border-emerald-500/50 text-emerald-300 bg-slate-900/95'
        : 'border-amber-500/50 text-amber-300 bg-slate-900/95';
    const icon = type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-info text-amber-400';

    toast.className = `glass-card p-4 rounded-2xl border ${colorClass} shadow-2xl flex items-center gap-3 transition-all transform translate-y-2 opacity-0 pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-lg"></i> <span class="text-xs font-bold">${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    toggleModal('loginModal');
    showToast('Web Portal login demo simulated successfully.', 'success');
}
