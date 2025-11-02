// =======================
// Search Module
// =======================

import { debounce, escapeHtml } from './utils.js';

export function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchResults = document.getElementById('search-results');
  const searchResultsCount = document.getElementById('search-results-count');
  const regularPosts = document.getElementById('regular-posts');
  const pagination = document.getElementById('pagination');

  // Only initialize if we're on a page with search
  if (!searchInput) {
    return;
  }

  // Get i18n translations from data attributes
  const searchContainer = document.querySelector('.search-container');
  const i18n = {
    readMore: searchContainer?.dataset.i18nReadMore || 'Read →',
    noResults: searchContainer?.dataset.i18nNoResults || 'No results found',
    noResultsHelp:
      searchContainer?.dataset.i18nNoResultsHelp ||
      'Try different keywords or browse all articles below.',
    searchResultsSingular:
      searchContainer?.dataset.i18nSearchResultsSingular ||
      'Found <strong>{count}</strong> result for "<strong>{query}</strong>"',
    searchResultsPlural:
      searchContainer?.dataset.i18nSearchResultsPlural ||
      'Found <strong>{count}</strong> results for "<strong>{query}</strong>"',
    externalLinkLabel: searchContainer?.dataset.i18nExternalLinkLabel || '(opens in a new tab)',
  };

  // Load Simple Jekyll Search library
  const script = document.createElement('script');
  script.src = '/js/simple-jekyll-search.min.js';
  script.onload = () => {
    // Initialize Simple Jekyll Search
    // eslint-disable-next-line no-undef
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
              <a href="{url}" class="read-more">${i18n.readMore}</a>
            </div>
          </div>
        </article>
      `,
      noResultsText: `
        <div class="search-no-results">
          <h3>${i18n.noResults}</h3>
          <p>${i18n.noResultsHelp}</p>
        </div>
      `,
      limit: 20,
      fuzzy: false,
      exclude: [],
    });
  };
  document.head.appendChild(script);

  // Handle search input
  searchInput.addEventListener(
    'input',
    debounce((e) => {
      const query = e.target.value.trim();

      if (query.length > 0) {
        // Show clear button
        searchClear.style.display = 'flex';

        // Show search results, hide regular posts and pagination
        searchResults.style.display = 'grid';
        if (regularPosts) {
          regularPosts.style.display = 'none';
        }
        if (pagination) {
          pagination.style.display = 'none';
        }

        // Count results after a short delay to let Simple Jekyll Search finish
        setTimeout(() => {
          const resultCount = searchResults.children.length;
          if (resultCount > 0 && !searchResults.querySelector('.search-no-results')) {
            searchResultsCount.style.display = 'block';
            const template =
              resultCount === 1 ? i18n.searchResultsSingular : i18n.searchResultsPlural;
            searchResultsCount.innerHTML = template
              .replace('{count}', resultCount)
              .replace('{query}', escapeHtml(query));
          } else {
            searchResultsCount.style.display = 'none';
          }
        }, 100);
      } else {
        clearSearch();
      }
    }, 300)
  );

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
    if (regularPosts) {
      regularPosts.style.display = 'grid';
    }
    if (pagination) {
      pagination.style.display = 'flex';
    }
  }
}
