
// Kattali Textile Ltd. - Main JavaScript
// Enhanced with mobile menu, smooth scrolling, and animations

document.addEventListener('DOMContentLoaded', function() {
  console.log('🏭 KTL Corporate Website Loaded');
  
  // Initialize all features
  initDarkMode();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScrolling();
  initNavScroll();
  initMicroInteractions();
  initPageTransitions();
  initTypingEffect();
  
  // Load page-specific features
  if (window.location.pathname.includes('stocks.html')) {
    initStockDashboard();
  }
});

// Dark Mode Functionality
function initDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Load saved theme or use system preference
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition effect
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

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


// Modern Micro-Interactions
function initMicroInteractions() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Add ripple effect to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Page Transitions
function initPageTransitions() {
  // Add CSS for page transitions
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
    
    .page-transition {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .stagger-animation {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .stagger-animation:nth-child(1) { animation-delay: 0.1s; }
    .stagger-animation:nth-child(2) { animation-delay: 0.2s; }
    .stagger-animation:nth-child(3) { animation-delay: 0.3s; }
    .stagger-animation:nth-child(4) { animation-delay: 0.4s; }
    .stagger-animation:nth-child(5) { animation-delay: 0.5s; }
    .stagger-animation:nth-child(6) { animation-delay: 0.6s; }
  `;
  document.head.appendChild(style);
  
  // Apply stagger animation to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('stagger-animation'));
}

// Typing Effect for Hero
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero h1');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  const words = text.split(' ');
  let currentWord = 0;
  
  function typeWords() {
    if (currentWord < words.length) {
      heroTitle.innerHTML = words.slice(0, currentWord + 1).join(' ') + 
        '<span style="opacity: 0.7;">|</span>';
      currentWord++;
      setTimeout(typeWords, 200);
    } else {
      heroTitle.innerHTML = text; // Remove cursor
    }
  }
  
  // Only run on homepage
  if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    heroTitle.textContent = '';
    setTimeout(typeWords, 1000);
  }
}

// Enhanced Stock Dashboard with Real-time Features
function initEnhancedStockDashboard() {
  if (!document.querySelector('.stock-dashboard')) return;
  
  const socket = new WebSocket('wss://api.example.com/stock-feed'); // Replace with actual feed
  
  socket.onmessage = function(event) {
    const stockData = JSON.parse(event.data);
    if (stockData.symbol === 'KTLBD') {
      updateStockDisplay(stockData);
      addStockAlert(stockData);
    }
  };
  
  function addStockAlert(data) {
    const changePercent = Math.abs(data.changePercent);
    if (changePercent > 5) {
      showNotification(`KTLBD ${data.change > 0 ? 'surged' : 'dropped'} ${changePercent.toFixed(2)}%`);
    }
  }
  
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--gradient-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }
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
if ('performance' in window && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      if (loadTime > 0) {
        console.log(`⚡ Page loaded in ${loadTime}ms`);
      }
    }, 100);
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

// Contact Form Handling
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        background: var(--accent-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        font-weight: 600;
      `;
      successMsg.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
      
      this.appendChild(successMsg);
      this.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove success message after 5 seconds
      setTimeout(() => successMsg.remove(), 5000);
      
      console.log('📧 Contact form submitted:', data);
    }, 2000);
  });
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Export functions for external use
window.KTL = {
  fetchStockData: typeof fetchStockData !== 'undefined' ? fetchStockData : null,
  formatCurrency,
  formatDate,
  initContactForm
};
