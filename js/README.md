# JavaScript Modules Architecture

## Overview

Il codice JavaScript è stato refactorizzato da un singolo file monolitico a una struttura modulare ES6 per migliorare:
- Manutenibilità
- Testabilità
- Riutilizzabilità
- Separazione delle responsabilità

## Structure

```
js/
├── main.js                          # Entry point principale
└── modules/
    ├── animations.js               # Animazioni pagina e scroll
    ├── animated-background.js      # Effetti background animato
    ├── dark-mode.js               # Gestione tema scuro
    ├── external-links.js          # Handler link esterni
    ├── navigation.js              # Navigazione e highlighting
    ├── performance.js             # Monitoring performance ed error handling
    ├── reading-progress.js        # Barra progresso lettura
    ├── search.js                  # Funzionalità ricerca
    ├── smooth-scroll.js           # Scroll fluido
    ├── table-of-contents.js       # Indice dei contenuti
    └── utils.js                   # Funzioni utility condivise
```

## Modules Description

### main.js
Entry point che importa e inizializza tutti i moduli. Gestisce l'ordine di inizializzazione e il binding degli event listeners DOM.

### animations.js
Gestisce tutte le animazioni on-load e on-scroll usando Intersection Observer API per performance ottimali.

### animated-background.js
Effetti parallax e animazioni del background con gradient blobs.

### dark-mode.js
Gestione permanente del tema scuro e syntax highlighting.

### external-links.js
Aggiunge automaticamente `target="_blank"` e `rel="noopener noreferrer"` ai link esterni, con icona visiva.

### navigation.js
Highlighting automatico della sezione attiva nella navigazione usando Intersection Observer.

### performance.js
- Monitoring delle performance (solo in dev mode)
- Global error handling
- Unhandled promise rejection handling

### reading-progress.js
Barra di progresso lettura per i post, con calcolo percentuale scroll ottimizzato.

### search.js
Integrazione con Simple Jekyll Search per ricerca client-side con debouncing e i18n support.

### smooth-scroll.js
Scroll fluido per anchor links con offset per fixed header.

### table-of-contents.js
Generazione dinamica dell'indice e highlighting della sezione corrente.

### utils.js
Funzioni utility condivise:
- `debounce()` - Rate limiting per eventi frequenti
- `throttle()` - Rate limiting alternativo
- `slugify()` - Generazione URL-friendly slugs
- `escapeHtml()` - Prevenzione XSS

## Browser Support

I moduli ES6 sono supportati nativamente da:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

Per browser più vecchi, considera l'uso di un bundler come Webpack o Rollup con Babel.

## Performance

Vantaggi dell'architettura modulare:
- ✅ Tree-shaking automatico dei moduli non usati
- ✅ Loading parallelo dei moduli
- ✅ Better caching granulare
- ✅ Code splitting più facile

## Development

### Aggiungere un nuovo modulo

1. Crea il file in `js/modules/nome-modulo.js`
2. Esporta le funzioni pubbliche con `export`
3. Importa nel `main.js`
4. Inizializza nel `DOMContentLoaded` handler

Esempio:

```javascript
// js/modules/feature.js
export function initFeature() {
  // Implementation
}

// js/main.js
import { initFeature } from './modules/feature.js';

document.addEventListener('DOMContentLoaded', () => {
  initFeature();
});
```

## Testing

Per testare i moduli individualmente, importali direttamente:

```javascript
import { debounce } from './modules/utils.js';

// Test
const fn = debounce(() => console.log('test'), 300);
```

## CSP Compliance

Tutti gli event handlers sono registrati programmaticamente (no inline handlers), rendendo il codice compatibile con Content Security Policy strict.

## Backup

Il file originale monolitico è stato salvato come `main.js.bak` per riferimento.
