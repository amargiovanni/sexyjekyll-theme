// =======================
// Main JavaScript
// =======================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initSmoothScroll();
  initNavigation();
  initAnimatedBackground();
  initSearch();
  initReadingProgress();
  initExternalLinks();
  initPageAnimations();
});

// =======================
// Dark Mode (Always Active)
// =======================

function initDarkMode() {
  // Set dark mode permanently
  document.documentElement.setAttribute('data-theme', 'dark');

  // Force dark syntax highlighting
  const darkLink = document.querySelector('link[href*="syntax-dark"]');
  const lightLink = document.querySelector('link[href*="syntax-light"]');

  if (darkLink && lightLink) {
    darkLink.removeAttribute('disabled');
    darkLink.media = 'all';
    lightLink.setAttribute('disabled', 'disabled');
    lightLink.media = 'not all';
  }
}

// =======================
// Smooth Scroll
// =======================

function initSmoothScroll() {
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default if href is just "#"
      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =======================
// Navigation (Always Visible)
// =======================

function initNavigation() {
  // Active nav link highlighting
  highlightActiveSection();
}

// =======================
// Active Section Highlighting
// =======================

function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -70% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// =======================
// Utility Functions
// =======================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// =======================
// Performance Monitoring
// =======================

// Log performance metrics (optional, for development)
if (window.performance && console.debug) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;

    console.debug('Page Load Time:', pageLoadTime + 'ms');
    console.debug('Connect Time:', connectTime + 'ms');
    console.debug('Render Time:', renderTime + 'ms');
  });
}

// =======================
// Error Handling
// =======================

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // You can add error reporting service here (e.g., Sentry)
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You can add error reporting service here
});

// =======================
// Animated Background
// =======================

function initAnimatedBackground() {
  const blobs = document.querySelectorAll('.gradient-blob');

  // Add mouse move parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 50;
      const y = (mouseY - 0.5) * speed * 50;

      blob.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add random color shift over time
  function shiftColors() {
    const colors = [
      { name: 'purple', value: '#a855f7' },
      { name: 'pink', value: '#ec4899' },
      { name: 'blue', value: '#3b82f6' },
      { name: 'cyan', value: '#06b6d4' },
      { name: 'orange', value: '#f97316' },
      { name: 'yellow', value: '#facc15' }
    ];

    blobs.forEach((blob, index) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const currentBg = blob.style.background || '';

      // Subtle color changes without jarring transitions
      if (Math.random() > 0.7) {
        blob.style.background = `radial-gradient(circle, ${randomColor.value} 0%, transparent 70%)`;
      }
    });
  }

  // Shift colors every 10 seconds
  setInterval(shiftColors, 10000);
}

// =======================
// Search Functionality
// =======================

function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchResults = document.getElementById('search-results');
  const searchResultsCount = document.getElementById('search-results-count');
  const regularPosts = document.getElementById('regular-posts');
  const pagination = document.getElementById('pagination');

  // Only initialize if we're on a page with search
  if (!searchInput) return;

  // Load Simple Jekyll Search library
  const script = document.createElement('script');
  script.src = '/js/simple-jekyll-search.min.js';
  script.onload = () => {
    // Initialize Simple Jekyll Search
    window.simpleJekyllSearch = SimpleJekyllSearch({
      searchInput: searchInput,
      resultsContainer: searchResults,
      json: '/search.json',
      searchResultTemplate: `
        <article class="blog-post-card">
          <div class="post-card-content">
            <time class="post-date" datetime="{date}">{date}</time>
            <h2 class="post-card-title">
              <a href="{url}">{title}</a>
            </h2>
            <p class="post-card-excerpt">{excerpt}</p>
            <div class="post-card-footer">
              <div class="post-categories">
                <span class="post-category">{category}</span>
              </div>
              <a href="{url}" class="read-more">Leggi →</a>
            </div>
          </div>
        </article>
      `,
      noResultsText: `
        <div class="search-no-results">
          <h3>Nessun risultato trovato</h3>
          <p>Prova con parole chiave diverse o sfoglia tutti gli articoli qui sotto.</p>
        </div>
      `,
      limit: 20,
      fuzzy: false,
      exclude: []
    });
  };
  document.head.appendChild(script);

  // Handle search input
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.trim();

    if (query.length > 0) {
      // Show clear button
      searchClear.style.display = 'flex';

      // Show search results, hide regular posts and pagination
      searchResults.style.display = 'grid';
      if (regularPosts) regularPosts.style.display = 'none';
      if (pagination) pagination.style.display = 'none';

      // Count results after a short delay to let Simple Jekyll Search finish
      setTimeout(() => {
        const resultCount = searchResults.children.length;
        if (resultCount > 0 && !searchResults.querySelector('.search-no-results')) {
          searchResultsCount.style.display = 'block';
          searchResultsCount.innerHTML = `Trovat${resultCount !== 1 ? 'i' : 'o'} <strong>${resultCount}</strong> risultat${resultCount !== 1 ? 'i' : 'o'} per "<strong>${escapeHtml(query)}</strong>"`;
        } else {
          searchResultsCount.style.display = 'none';
        }
      }, 100);
    } else {
      clearSearch();
    }
  }, 300));

  // Handle clear button
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    clearSearch();
  });

  // Clear search on Escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      clearSearch();
    }
  });

  function clearSearch() {
    searchClear.style.display = 'none';
    searchResults.style.display = 'none';
    searchResultsCount.style.display = 'none';
    if (regularPosts) regularPosts.style.display = 'grid';
    if (pagination) pagination.style.display = 'flex';
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// =======================
// Reading Progress Bar
// =======================

function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress-bar');
  const progressContainer = progressBar?.parentElement;

  // Only initialize on blog post pages
  if (!progressBar || !progressContainer) return;

  // Get the main content element
  const mainContent = document.querySelector('.post-content');
  if (!mainContent) return;

  // Function to calculate and update progress
  function updateProgress() {
    // Get the bounding rectangles
    const contentRect = mainContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate the start and end points for reading
    // Start when content top reaches viewport top
    const startPoint = contentRect.top + window.scrollY - windowHeight * 0.2;
    // End when content bottom reaches viewport bottom
    const endPoint = contentRect.bottom + window.scrollY - windowHeight * 0.8;

    // Calculate total scrollable distance
    const totalDistance = endPoint - startPoint;

    // Current scroll position relative to start
    const currentScroll = window.scrollY - startPoint;

    // Calculate percentage (0-100)
    let percentage = (currentScroll / totalDistance) * 100;

    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    // Update the progress bar width
    progressBar.style.width = `${percentage}%`;

    // Show progress bar when user starts scrolling
    if (window.scrollY > 100) {
      progressContainer.classList.add('visible');
    } else {
      progressContainer.classList.remove('visible');
    }
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initial calculation
  updateProgress();

  // Update on scroll with throttling
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Update on resize (in case content reflows)
  window.addEventListener('resize', debounce(() => {
    updateProgress();
  }, 250));
}

// =======================
// Table of Contents
// =======================

function initTableOfContents() {
  const tocContainer = document.getElementById('toc-container');
  const tocList = document.getElementById('toc-list');
  const tocEmpty = document.getElementById('toc-empty');
  const tocToggle = document.getElementById('toc-toggle');

  // Only initialize if TOC container exists
  if (!tocContainer || !tocList) return;

  // Get all H2 and H3 headings from post content
  const content = document.querySelector('.post-content');
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');

  // If no headings found, show empty message
  if (headings.length === 0) {
    tocEmpty.style.display = 'block';
    document.getElementById('toc-nav').style.display = 'none';
    return;
  }

  // Generate TOC items
  headings.forEach((heading, index) => {
    // Create unique ID if heading doesn't have one
    if (!heading.id) {
      heading.id = `heading-${index}-${slugify(heading.textContent)}`;
    }

    // Create TOC item
    const tocItem = document.createElement('li');
    tocItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

    const tocLink = document.createElement('a');
    tocLink.className = 'toc-link';
    tocLink.href = `#${heading.id}`;
    tocLink.textContent = heading.textContent;
    tocLink.setAttribute('data-heading-id', heading.id);

    // Smooth scroll on click
    tocLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(heading.id);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without jumping
        history.pushState(null, null, `#${heading.id}`);
      }
    });

    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });

  // Handle toggle button
  if (tocToggle) {
    tocToggle.addEventListener('click', () => {
      tocContainer.classList.toggle('collapsed');
      const isCollapsed = tocContainer.classList.contains('collapsed');
      tocToggle.setAttribute('aria-expanded', !isCollapsed);
    });
  }

  // Highlight active section on scroll
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const tocLink = tocList.querySelector(`[data-heading-id="${id}"]`);

      if (entry.isIntersecting) {
        // Remove active from all links
        tocList.querySelectorAll('.toc-link').forEach(link => {
          link.classList.remove('active');
        });

        // Add active to current link
        if (tocLink) {
          tocLink.classList.add('active');

          // Scroll TOC to show active item
          const tocNav = document.getElementById('toc-nav');
          if (tocNav) {
            const linkRect = tocLink.getBoundingClientRect();
            const navRect = tocNav.getBoundingClientRect();

            if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
              tocLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        }
      }
    });
  }, observerOptions);

  // Observe all headings
  headings.forEach(heading => {
    observer.observe(heading);
  });
}

// Helper function to create URL-friendly slugs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start
    .replace(/-+$/, '');         // Trim - from end
}

// =======================
// External Links Handler
// =======================

function initExternalLinks() {
  // Get all links in the post content
  const postContent = document.querySelector('.post-content');
  if (!postContent) return;

  const links = postContent.querySelectorAll('a[href]');

  links.forEach(link => {
    const href = link.getAttribute('href');

    // Check if link is external (starts with http:// or https://)
    // and doesn't link to the current domain
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(href).hostname;

      if (linkDomain !== currentDomain) {
        // Add target="_blank" and security attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Add external link icon if not already present
        if (!link.querySelector('.external-link-icon')) {
          const icon = document.createElement('span');
          icon.className = 'external-link-icon';
          icon.setAttribute('aria-label', '(si apre in una nuova scheda)');
          icon.innerHTML = '↗';
          link.appendChild(icon);
        }
      }
    }
  });
}

// =======================
// Page Load Animations
// =======================

function initPageAnimations() {
  // Animate hero section if present (home page)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('hero-animate');
    // Animate hero children
    const heroChildren = hero.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-description, .hero-cta');
    heroChildren.forEach(child => child.classList.add('animate-on-load'));
  }

  // Animate post hero section if present
  const postHero = document.querySelector('.post-hero');
  if (postHero) {
    postHero.classList.add('post-hero-animate');
    // Animate post hero children
    const postHeroChildren = postHero.querySelectorAll('.post-hero-overlay, .post-hero-date, .post-hero-categories, .post-hero-title, .post-hero-subtitle, .post-hero-reading-time');
    postHeroChildren.forEach(child => child.classList.add('animate-on-load'));
  }

  // Animate post header if present (posts without hero image)
  const postHeader = document.querySelector('.post-header');
  if (postHeader) {
    postHeader.classList.add('post-header-animate');
    // Animate post header children
    const postHeaderChildren = postHeader.querySelectorAll('.post-date, .post-categories, .post-title, .post-subtitle, .post-meta');
    postHeaderChildren.forEach(child => child.classList.add('animate-on-load'));
  }

  // Animate navigation
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.classList.add('nav-animate', 'animate-on-load');
  }

  // Animate main content sections
  const mainContent = document.querySelector('#main-content, main');
  if (mainContent) {
    mainContent.classList.add('content-animate', 'animate-on-load');
  }

  // Animate blog post cards with stagger effect
  const blogCards = document.querySelectorAll('.blog-post-card, .post-card');
  blogCards.forEach((card, index) => {
    card.classList.add('card-animate', 'animate-on-load');
    // Add staggered delay for each card (max 8 cards with visible delay)
    if (index < 8) {
      card.classList.add(`delay-${index + 1}`);
    }
  });

  // Animate footer
  const footer = document.querySelector('.footer');
  if (footer) {
    // Use Intersection Observer for footer animation when it comes into view
    if ('IntersectionObserver' in window) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up', 'animate-on-load');
            footerObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      footerObserver.observe(footer);
    }
  }

  // Animate sections on scroll using Intersection Observer
  const animateSections = document.querySelectorAll('.blog-section, .contact-section, .category-section, section');

  if ('IntersectionObserver' in window && animateSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });

    animateSections.forEach(section => {
      // Skip sections that already have animations
      if (!section.classList.contains('hero') && !section.querySelector('.hero')) {
        sectionObserver.observe(section);
      }
    });
  }

  // Animate post content elements on scroll
  const postContent = document.querySelector('.post-content');
  if (postContent && 'IntersectionObserver' in window) {
    const contentElements = postContent.querySelectorAll('h2, h3, p, ul, ol, blockquote, pre, img, .highlight');

    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          contentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    contentElements.forEach((element, index) => {
      // Add small staggered delay for consecutive elements
      element.style.opacity = '0';
      element.style.animationDelay = `${Math.min(index * 0.05, 0.3)}s`;
      contentObserver.observe(element);
    });
  }
}

