
// Kattali Textile Ltd. - Main JavaScript
// Enhanced with mobile menu, smooth scrolling, and animations

document.addEventListener('DOMContentLoaded', function() {
  console.log('🏭 KTL Corporate Website Loaded');
  
  // Initialize all features
  initMobileMenu();
  initScrollAnimations();
  initSmoothScrolling();
  initNavScroll();
  
  // Load page-specific features
  if (window.location.pathname.includes('stocks.html')) {
    initStockDashboard();
  }
});

// Mobile Menu Functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  const body = document.body;
  
  if (!menuToggle || !mobileDropdown) return;
  
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileDropdown.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileDropdown.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileDropdown.classList.remove('active');
      body.style.overflow = '';
    }
  });
  
  // Close menu when clicking a link
  const mobileLinks = mobileDropdown.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDropdown.classList.remove('active');
      body.style.overflow = '';
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReduced) {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
      
      revealElements.forEach(element => {
        observer.observe(element);
      });
    }
  } else {
    // For users who prefer reduced motion, show everything immediately
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 100; // Account for sticky nav
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navigation Scroll Behavior
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateNav() {
    const currentScrollY = window.scrollY;
    
    // Hide nav when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.classList.add('hide');
    } else {
      nav.classList.remove('hide');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  function requestNavUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestNavUpdate, { passive: true });
}

// Stock Dashboard Functionality
function initStockDashboard() {
  console.log('📈 Initializing Stock Dashboard');
  
  let stockChart = null;
  const stockData = {
    symbol: 'KTLBD',
    price: 0,
    change: 0,
    changePercent: 0,
    volume: 0,
    lastUpdate: new Date()
  };
  
  // Mock stock data generator (replace with real API)
  function generateMockStockData() {
    const basePrice = 125.50;
    const volatility = 0.02; // 2% volatility
    
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = basePrice * (1 + randomChange);
    const change = newPrice - basePrice;
    const changePercent = (change / basePrice) * 100;
    
    return {
      symbol: 'KTLBD',
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 50000) + 10000,
      lastUpdate: new Date()
    };
  }
  
  // Update stock display
  function updateStockDisplay(data) {
    const priceElement = document.querySelector('.stock-price');
    const changeElement = document.querySelector('.stock-change');
    const volumeElement = document.querySelector('.stock-volume');
    const updateElement = document.querySelector('.last-update');
    
    if (priceElement) {
      priceElement.textContent = `৳${data.price}`;
      priceElement.className = `stock-price ${data.change >= 0 ? 'price-positive' : 'price-negative'}`;
    }
    
    if (changeElement) {
      const sign = data.change >= 0 ? '+' : '';
      changeElement.textContent = `${sign}${data.change} (${sign}${data.changePercent}%)`;
      changeElement.className = `stock-change ${data.change >= 0 ? 'change-positive' : 'change-negative'}`;
    }
    
    if (volumeElement) {
      volumeElement.textContent = data.volume.toLocaleString();
    }
    
    if (updateElement) {
      updateElement.textContent = data.lastUpdate.toLocaleTimeString();
    }
  }
  
  // Fetch stock data (mock implementation)
  async function fetchStockData() {
    try {
      // In production, replace this with actual API calls to CSE/DSE
      const data = generateMockStockData();
      Object.assign(stockData, data);
      updateStockDisplay(stockData);
      updateChart(stockData);
      
      console.log('📊 Stock data updated:', stockData);
      
    } catch (error) {
      console.error('❌ Error fetching stock data:', error);
      
      // Show error state
      const priceElement = document.querySelector('.stock-price');
      if (priceElement) {
        priceElement.textContent = 'Error loading data';
        priceElement.className = 'stock-price';
      }
    }
  }
  
  // Initialize and update chart
  function updateChart(data) {
    // This is a placeholder for chart implementation
    // In production, integrate with Chart.js or similar library
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer && !chartContainer.querySelector('.chart-placeholder')) {
      chartContainer.innerHTML = `
        <div class="chart-placeholder" style="
          height: 100%;
          background: linear-gradient(135deg, #1e40af22 0%, #059669aa 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-weight: 600;
        ">
          📈 Live Chart Coming Soon<br>
          <small style="margin-top: 0.5rem; opacity: 0.7;">Current: ৳${data.price}</small>
        </div>
      `;
    }
  }
  
  // Auto-refresh functionality
  function startAutoRefresh() {
    const refreshBtn = document.querySelector('.refresh-btn');
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<span class="loading"></span> Refreshing...';
        
        setTimeout(() => {
          fetchStockData();
          refreshBtn.innerHTML = '🔄 Refresh';
        }, 1000);
      });
    }
    
    // Auto refresh every 60 seconds
    setInterval(fetchStockData, 60000);
  }
  
  // Initialize stock dashboard
  fetchStockData();
  startAutoRefresh();
}

// Utility Functions
function formatCurrency(amount, currency = 'BDT') {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Performance monitoring
if ('performance' in window && 'measure' in window.performance) {
  window.addEventListener('load', () => {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
  });
}

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ ServiceWorker registered successfully');
      })
      .catch(error => {
        console.log('❌ ServiceWorker registration failed');
      });
  });
}

// Export functions for external use
window.KTL = {
  fetchStockData: typeof fetchStockData !== 'undefined' ? fetchStockData : null,
  formatCurrency,
  formatDate
};
