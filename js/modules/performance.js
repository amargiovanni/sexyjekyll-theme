// =======================
// Performance Monitoring Module
// =======================

export function initPerformanceMonitoring() {
  // Log performance metrics only in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    if (window.performance && console.debug) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.debug('Page Load Time:', `${pageLoadTime}ms`);
        console.debug('Connect Time:', `${connectTime}ms`);
        console.debug('Render Time:', `${renderTime}ms`);
      });
    }
  }
}

export function initErrorHandling() {
  // Global error handler (only log in development, report in production)
  window.addEventListener('error', (event) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.error('Global error:', event.error);
    }
    // You can add error reporting service here (e.g., Sentry) for production
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.error('Unhandled promise rejection:', event.reason);
    }
    // You can add error reporting service here for production
  });
}
