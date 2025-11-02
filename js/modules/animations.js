// =======================
// Page Animations Module
// =======================

export function initPageAnimations() {
  // Animate hero section if present (home page)
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('hero-animate');
    // Animate hero children
    const heroChildren = hero.querySelectorAll(
      '.hero-title, .hero-subtitle, .hero-tagline, .hero-description, .hero-cta'
    );
    heroChildren.forEach((child) => child.classList.add('animate-on-load'));
  }

  // Animate post hero section if present
  const postHero = document.querySelector('.post-hero');
  if (postHero) {
    postHero.classList.add('post-hero-animate');
    // Animate post hero children
    const postHeroChildren = postHero.querySelectorAll(
      '.post-hero-overlay, .post-hero-date, .post-hero-categories, .post-hero-title, .post-hero-subtitle, .post-hero-reading-time'
    );
    postHeroChildren.forEach((child) => child.classList.add('animate-on-load'));
  }

  // Animate post header if present (posts without hero image)
  const postHeader = document.querySelector('.post-header');
  if (postHeader) {
    postHeader.classList.add('post-header-animate');
    // Animate post header children
    const postHeaderChildren = postHeader.querySelectorAll(
      '.post-date, .post-categories, .post-title, .post-subtitle, .post-meta'
    );
    postHeaderChildren.forEach((child) => child.classList.add('animate-on-load'));
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
      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in-up', 'animate-on-load');
              footerObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      footerObserver.observe(footer);
    }
  }

  // Animate sections on scroll using Intersection Observer
  const animateSections = document.querySelectorAll(
    '.blog-section, .contact-section, .category-section, section'
  );

  if ('IntersectionObserver' in window && animateSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    animateSections.forEach((section) => {
      // Skip sections that already have animations
      if (!section.classList.contains('hero') && !section.querySelector('.hero')) {
        sectionObserver.observe(section);
      }
    });
  }

  // Animate post content elements on scroll
  const postContent = document.querySelector('.post-content');
  if (postContent && 'IntersectionObserver' in window) {
    const contentElements = postContent.querySelectorAll(
      'h2, h3, p, ul, ol, blockquote, pre, img, .highlight'
    );

    const contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            contentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    contentElements.forEach((element, index) => {
      // Add small staggered delay for consecutive elements
      element.style.opacity = '0';
      element.style.animationDelay = `${Math.min(index * 0.05, 0.3)}s`;
      contentObserver.observe(element);
    });
  }
}
