# SexyJekyll Theme

<a href="https://jekyll-themes.com/amargiovanni/sexyjekyll-theme">
  <img
    src="https://img.shields.io/badge/featured%20on-JT-red.svg"
    height="20"
    alt="Jekyll Themes Shield"
  />
</a>

Un tema Jekyll moderno e ricco di funzionalità, progettato per blog
professionali e siti web personali. Costruito con attenzione all'accessibilità,
alle prestazioni e all'esperienza utente.

> [English version](README.md) | **Versione Italiana**

![SexyJekyll Theme](assets/screens/1.png)

<div align="center">
  <table>
    <tr>
      <td width="33%"><img src="assets/screens/2.png" alt="Feature 2"/></td>
      <td width="33%"><img src="assets/screens/3.png" alt="Feature 3"/></td>
      <td width="33%"><img src="assets/screens/4.png" alt="Feature 4"/></td>
    </tr>
    <tr>
      <td width="33%"><img src="assets/screens/5.png" alt="Feature 5"/></td>
      <td width="33%"><img src="assets/screens/6.png" alt="Feature 6"/></td>
      <td width="33%"><img src="assets/screens/7.png" alt="Feature 7"/></td>
    </tr>
  </table>
</div>

## Caratteristiche Principali

### Design & Esperienza Utente

- **Design Moderno**: Estetica pulita e minimalista
- **Completamente Responsive**: Design mobile-first che funziona su tutti i
  dispositivi
- **Indicatore di Lettura**: Indicatore visivo del progresso di lettura
  dell'articolo
- **Stili per Stampa**: Layout ottimizzati per la stampa

### Contenuto & Navigazione

- **Ricerca Avanzata**: Ricerca istantanea lato client con evidenziazione parole
  chiave
- **Indice dei Contenuti**: Generazione automatica del TOC per gli articoli con
  scroll smooth
- **Articoli Correlati**: Raccomandazioni intelligenti basate su categorie e tag
- **Categorie**: Filtri e organizzazione basata su categorie
- **Paginazione**: Paginazione personalizzabile dei post

### SEO & Social

- **Ottimizzato SEO**: Meta tag, Open Graph, Twitter Cards
- **Dati Strutturati**: Schema JSON-LD per migliore comprensione dai motori di
  ricerca
- **Feed RSS**: Generazione automatica feed
- **Sitemap**: Sitemap auto-generata per i motori di ricerca

### Accessibilità

- **WCAG 2.1 Livello AA**: Supporto accessibilità completo
- **Skip to Content**: Helper per navigazione da tastiera
- **HTML Semantico**: Struttura e landmark HTML5 appropriati
- **Etichette ARIA**: Compatibile con screen reader
- **Movimento Ridotto**: Rispetta le preferenze utente per il movimento
- **Alto Contrasto**: Eccellenti rapporti di contrasto dei colori

### Prestazioni

- **Immagini Responsive**: Formato WebP con dimensioni multiple
- **Lazy Loading**: Le immagini si caricano quando necessario
- **CSS/JS Ottimizzati**: Codice minificato ed efficiente
- **JavaScript Modulare**: Moduli ES6 per migliore manutenibilità e tree-shaking
- **Tempi di Caricamento Veloci**: Ottimizzato per le prestazioni

### Funzionalità per Sviluppatori

- **Syntax Highlighting**: Blocchi di codice con numeri di riga (Rouge)
- **Tempo di Lettura**: Stima automatica del tempo di lettura
- **Multi-lingua**: Sistema i18n completo con supporto per inglese, italiano,
  tedesco, francese e spagnolo
- **Architettura Modulare**: Chiara separazione delle responsabilità con moduli
  ES6
- **Conforme CSP**: Nessun event handler inline per maggiore sicurezza
- **Personalizzabile**: Configurazione semplice tramite `_config.yml`
- **Ben Documentato**: Documentazione completa inclusa

### Funzionalità AI & LLM

- **Supporto llms.txt**: Generazione automatica di riassunti dei contenuti
  ottimizzati per AI
- **llms.txt per Post**: Ogni articolo del blog genera il proprio file llms.txt
  dedicato in `/blog/YYYY/MM/DD/post-slug/llms.txt`
- **llms.txt a Livello Sito**: File llms.txt principale nella root con
  panoramica del sito e struttura dei contenuti
- **Contenuto Strutturato**: Markup HTML5 semantico pulito ottimizzato per i
  crawler AI
- **Schema JSON-LD**: Dati strutturati ricchi per una migliore comprensione dei
  contenuti
- **Friendly per AI Crawler**: Approccio accogliente all'indicizzazione AI con
  istruzioni chiare

## Installazione

### Come Ruby Gem (Raccomandato)

Aggiungi questa riga al `Gemfile` del tuo sito Jekyll:

```ruby
gem "sexyjekyll-theme"
```

E aggiungi questa riga al `_config.yml` del tuo sito Jekyll:

```yaml
theme: sexyjekyll-theme
```

Poi esegui:

```bash
bundle install
```

### Remote Theme (GitHub Pages)

Se usi GitHub Pages, aggiungi questo al tuo `_config.yml`:

```yaml
remote_theme: amargiovanni/sexyjekyll-theme
```

## Avvio Rapido

1. **Installa il tema** usando uno dei metodi sopra

2. **Configura** il tuo `_config.yml` (vedi `_config.example.yml` per
   riferimento):

```yaml
# Impostazioni sito
title: Il Tuo Nome
email: tua.email@esempio.it
description: Descrizione del tuo sito
baseurl: ''
url: 'https://tuosito.it'
lang: it # Opzioni: en, it, de, fr, es

# Informazioni autore
author:
  name: Il Tuo Nome
  email: tua.email@esempio.it
  linkedin: https://www.linkedin.com/in/tuoprofilo/
  bluesky: https://bsky.app/profile/tuohandle
```

3. **Crea il tuo primo post** in `_posts/`:

```markdown
---
layout: post
title: 'Il Tuo Primo Post'
subtitle: 'Sottotitolo opzionale'
date: 2025-11-01
categories: blog tech
toc: true # Opzionale: imposta false per disabilitare il TOC per questo post
---

Il contenuto del tuo post qui...
```

**Nota:** L'Indice dei Contenuti (TOC) viene generato automaticamente dai titoli
H2, H3 e H4 nei tuoi post. Puoi:

- Disabilitare il TOC globalmente impostando `table_of_contents.enabled: false`
  in `_config.yml`
- Disabilitare il TOC per un post specifico aggiungendo `toc: false` al front
  matter del post

4. **Esegui Jekyll**:

```bash
bundle exec jekyll serve
```

Visita `http://localhost:4000` per vedere il tuo sito!

## Documentazione

Documentazione dettagliata disponibile in:

- [TABLE_OF_CONTENTS.md](docs/TABLE_OF_CONTENTS.md) - Configurazione e
  personalizzazione dell'Indice dei Contenuti
- [I18N.md](docs/I18N.md) - Sistema di internazionalizzazione e supporto lingue
- [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) - Funzionalità di accessibilità
- [TESTING.md](docs/TESTING.md) - Guida testing e quality assurance
- [GIT_HOOKS.md](docs/GIT_HOOKS.md) - Controlli di qualità automatici con Git
  hooks
- [JAVASCRIPT_ARCHITECTURE.md](docs/JAVASCRIPT_ARCHITECTURE.md) - Architettura
  modulare JavaScript
- [SEARCH.md](docs/SEARCH.md) - Funzionalità di ricerca
- [READING_PROGRESS.md](docs/READING_PROGRESS.md) - Indicatore progresso lettura
- [STRUCTURED_DATA.md](docs/STRUCTURED_DATA.md) - Dati strutturati SEO
- [SOCIAL_SHARE.md](SOCIAL_SHARE.md) - Come aggiungere condivisione social
  (opzionale)
- [COMMENTS.md](docs/COMMENTS.md) - Come aggiungere commenti (opzionale)
- [CHANGELOG.md](CHANGELOG.md) - Cronologia versioni
- [PUBLISHING.md](PUBLISHING.md) - Guida pubblicazione tema

### Disponibile in Più Lingue

- 🇬🇧 [README.md](README.md) - Inglese
- 🇮🇹 [README.it.md](README.it.md) - Italiano
- 🇩🇪 [README.de.md](README.de.md) - Tedesco
- 🇫🇷 [README.fr.md](README.fr.md) - Francese
- 🇪🇸 [README.es.md](README.es.md) - Spagnolo

## Layout Disponibili

- `default` - Layout base per tutte le pagine
- `home` - Homepage con sezione hero
- `blog` - Pagina elenco blog
- `post` - Singolo post del blog
- `about` - Pagina about
- `contact` - Pagina contatti con link social
- `category` - Elenco post per categoria
- `404` - Pagina errore 404 personalizzata

## Plugin Utilizzati

**Plugin Standard:**

- `jekyll-feed` - Generazione feed RSS
- `jekyll-seo-tag` - Tag meta SEO
- `jekyll-paginate` - Paginazione post
- `jekyll-sitemap` - Generazione sitemap
- `liquid_reading_time` - Stima tempo di lettura
- `jekyll_picture_tag` - Immagini responsive

**Plugin Custom:**

- `llms_txt_generator` - Genera automaticamente file llms.txt per ogni articolo
  del blog e crea riassunti dei contenuti ottimizzati per AI
- `auto_related_posts` - Sistema intelligente di raccomandazione articoli basato
  su categorie, tag e similarità del contenuto con algoritmo tipo TF-IDF
- `category_generator` - Crea automaticamente pagine dedicate per ogni categoria
  con elenchi di post filtrati
- `localized_date` - Filtro Liquid per formattare le date in base alla lingua
  selezionata (es. "15 January 2025" in inglese, "15 gennaio 2025" in italiano)

## Supporto Browser

- Chrome (ultima versione)
- Firefox (ultima versione)
- Safari (ultima versione)
- Edge (ultima versione)
- Browser mobile (iOS Safari, Chrome Mobile)

## Contribuire

I contributi sono benvenuti! Sentiti libero di inviare una Pull Request. Per
modifiche importanti, apri prima un issue per discutere cosa vorresti cambiare.

Vedi [CONTRIBUTING.md](CONTRIBUTING.md) per dettagli.

## Supporto

Se incontri problemi o hai domande:

- Apri un issue su
  [GitHub](https://github.com/amargiovanni/sexyjekyll-theme/issues)
- Consulta la
  [documentazione](https://github.com/amargiovanni/sexyjekyll-theme#readme)

## Licenza

Questo progetto è concesso in licenza con Licenza MIT - vedi il file
[LICENSE](LICENSE) per dettagli.

## Crediti

Creato da [Andrea Margiovanni](https://margiovanni.it)

## Ringraziamenti

- Costruito con [Jekyll](https://jekyllrb.com/)
- Syntax highlighting di [Rouge](https://github.com/rouge-ruby/rouge)
- Ispirazione design dalle tendenze moderne del web design

---

Se trovi questo tema utile, considera di dargli una stella su GitHub!
