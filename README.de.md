# SexyJekyll Theme

Ein modernes, funktionsreiches Jekyll-Theme, das für professionelle Blogs und persönliche Websites entwickelt wurde. Gebaut mit Fokus auf Barrierefreiheit, Leistung und Benutzererfahrung.

![SexyJekyll Theme](screenshot.png)

## Funktionen

### Design und Benutzererfahrung
- **Modernes Design**: Saubere, minimalistische Ästhetik
- **Vollständig responsiv**: Mobile-first Design, das auf allen Geräten funktioniert
- **Lesefortschritt**: Visueller Indikator für den Leseffortschritt von Artikeln
- **Druckstile**: Optimierte Layouts zum Ausdrucken

### Inhalts- und Navigationsfunktionen
- **Erweiterte Suche**: Sofortige clientseitige Suche mit Keyword-Hervorhebung
- **Verwandte Beiträge**: Intelligente Beitragsempfehlungen basierend auf Kategorien und Tags
- **Kategorien**: Kategoriebasierte Filterung und Organisation
- **Paginierung**: Anpassbare Beitragspaginierung

### SEO und Soziale Medien
- **SEO-optimiert**: Meta-Tags, Open Graph, Twitter Cards
- **Strukturierte Daten**: JSON-LD Schema für besseres Verständnis durch Suchmaschinen
- **RSS-Feed**: Automatische Feed-Generierung
- **Sitemap**: Automatisch generierte Sitemap für Suchmaschinen

### Barrierefreiheit
- **WCAG 2.1 Level AA**: Umfassende Unterstützung für Barrierefreiheit
- **Skip to Content**: Hilfen zur Tastaturnavigation
- **Semantisches HTML**: Richtige HTML5-Landmarks und Struktur
- **ARIA-Labels**: Bildschirmleser-freundlich
- **Reduced Motion**: Respektiert Voreinstellungen des Benutzers für Bewegungsanimationen
- **Hoher Kontrast**: Ausgezeichnete Farbkontrastverhältnisse

### Leistung
- **Responsive Bilder**: WebP-Format mit mehreren Größen
- **Lazy Loading**: Bilder werden bei Bedarf geladen
- **Optimiertes CSS/JS**: Minifizierter und effizienter Code
- **Schnelle Ladezeiten**: Optimiert für Leistung

### Entwickler-Funktionen
- **Syntax-Hervorhebung**: Code-Blöcke mit Zeilennummern (Rouge)
- **Lesezeit**: Automatische Schätzung der Lesezeit
- **Mehrsprachig**: Vollständiges i18n-System mit Unterstützung für Englisch, Italienisch, Deutsch, Französisch und Spanisch
- **Anpassbar**: Einfache Konfiguration über `_config.yml`
- **Gut dokumentiert**: Umfassende Dokumentation enthalten

### KI und LLM-Funktionen
- **llms.txt-Unterstützung**: Automatische Generierung von KI-freundlichen Inhaltszusammenfassungen
- **Pro-Beitrag llms.txt**: Jeder Blogbeitrag generiert seine eigene llms.txt-Datei unter `/blog/YYYY/MM/DD/post-slug/llms.txt`
- **Seitenebene llms.txt**: Hauptdatei llms.txt im Root-Verzeichnis mit Siteübersicht und Inhaltsstruktur
- **Strukturierter Inhalt**: Saubere, semantische HTML5-Markierung, optimiert für KI-Crawler
- **JSON-LD Schema**: Umfangreiche strukturierte Daten für besseres Inhaltsverständnis
- **KI-Crawler-freundlich**: Willkommener Zugang zur KI-Indexierung mit klaren Anweisungen

## Installation

### Als Ruby Gem (empfohlen)

Fügen Sie diese Zeile zur `Gemfile` Ihrer Jekyll-Website hinzu:

```ruby
gem "sexyjekyll-theme"
```

Und fügen Sie diese Zeile zu Ihrer Jekyll-Website `_config.yml` hinzu:

```yaml
theme: sexyjekyll-theme
```

Führen Sie dann folgendes aus:

```bash
bundle install
```

### Remote Theme (GitHub Pages)

Wenn Sie GitHub Pages verwenden, fügen Sie dies zu Ihrer `_config.yml` hinzu:

```yaml
remote_theme: amargiovanni/sexyjekyll-theme
```

### Manuelle Installation

1. Laden Sie dieses Repository herunter oder klonen Sie es
2. Kopieren Sie die Dateien auf Ihre Jekyll-Website
3. Aktualisieren Sie Ihre `_config.yml` mit den Theme-Einstellungen

## Schnelleinstieg

1. **Installieren Sie das Theme** mit einer der oben genannten Methoden

2. **Konfigurieren Sie** Ihre `_config.yml`:

```yaml
# Siteeinstellungen
title: Your Name
email: your.email@example.com
description: Your site description
baseurl: ""
url: "https://yoursite.com"
lang: de  # Optionen: en, it, de, fr, es

# Autoreninfos
author:
  name: Your Name
  email: your.email@example.com
  linkedin: https://www.linkedin.com/in/yourprofile/
  bluesky: https://bsky.app/profile/yourhandle

# Navigationslogo
nav_logo:
  type: text  # 'text' oder 'image'
  text: YN    # Ihre Initialen oder Text
  # image: /assets/img/logo.png  # Oder Pfad zum Logo-Bild
  # alt: Your Logo

# Hero-Sektion
hero:
  name: Your Name
  role: Your Role
  subtitle: Your Company or Tagline
  tagline: Your personal tagline
  description: A brief description about you

# Blog-Sektion
blog:
  title: Blog
  description: Your blog description

# Kontakt-Sektion
contact:
  title: Get In Touch
  description: Contact page description
  links:
    - name: Email
      url: mailto:your.email@example.com
      type: email
    - name: LinkedIn
      url: https://www.linkedin.com/in/yourprofile/
      type: linkedin
```

3. **Erstellen Sie Ihren ersten Beitrag** in `_posts/`:

```markdown
---
layout: post
title: "Your First Post"
subtitle: "Optional subtitle"
date: 2025-11-01
categories: blog tech
---

Your post content here...
```

4. **Führen Sie Jekyll aus**:

```bash
bundle exec jekyll serve
```

Besuchen Sie `http://localhost:4000`, um Ihre Site zu sehen!

## Konfiguration

### Verfügbare Layouts

- `default` - Basis-Layout für alle Seiten
- `home` - Startseite mit Hero-Sektion
- `blog` - Blog-Auflistungsseite
- `post` - Einzelner Blogbeitrag
- `about` - Über-Seite
- `contact` - Kontaktseite mit Social-Links
- `category` - Kategoriespezifische Beitragsauflistung
- `404` - Benutzerdefinierte 404-Fehlerseite

### Plugins

Das Theme verwendet diese Jekyll-Plugins:

**Standard-Plugins:**
- `jekyll-feed` - RSS-Feed-Generierung
- `jekyll-seo-tag` - SEO Meta-Tags
- `jekyll-paginate` - Beitragspaginierung
- `jekyll-sitemap` - Sitemap-Generierung
- `liquid_reading_time` - Schätzung der Lesezeit
- `jekyll_picture_tag` - Responsive Bilder

**Benutzerdefinierte Plugins:**
- `llms_txt_generator` - Generiert automatisch llms.txt-Dateien für jeden Blogbeitrag und erstellt KI-freundliche Inhaltszusammenfassungen
- `auto_related_posts` - Intelligentes Beitragsempfehlungssystem basierend auf Kategorien, Tags und Inhaltsähnlichkeit mit TF-IDF-ähnlichem Algorithmus
- `category_generator` - Erstellt automatisch dedizierte Seiten für jede Kategorie mit gefilterten Beitragsauflistungen
- `localized_date` - Liquid-Filter zur Formatierung von Daten entsprechend der ausgewählten Sprache (z.B. "15 January 2025" auf Englisch, "15 gennaio 2025" auf Italienisch, "15 Januar 2025" auf Deutsch)

### Anpassung

#### Farben und Stile

Bearbeiten Sie `css/style.css`, um Farben, Schriftarten und Stile anzupassen.

#### Social Links

Konfigurieren Sie Social Links in `_config.yml` unter `contact.links`. Unterstützte Typen:
- email, linkedin, bluesky, twitter, github, instagram, facebook
- youtube, mastodon, telegram, whatsapp, medium, reddit
- discord, tiktok, twitch, slack

## Dokumentation

Ausführliche Dokumentation ist in den folgenden Dateien verfügbar:

- [I18N.md](docs/I18N.md) - Internationalisierungssystem und Sprachunterstützung
- [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) - Barrierefreiheitsfunktionen und Tests
- [SEARCH.md](docs/SEARCH.md) - Suchfunktionalität
- [READING_PROGRESS.md](docs/READING_PROGRESS.md) - Lesefortschrittsindikator
- [STRUCTURED_DATA.md](docs/STRUCTURED_DATA.md) - SEO strukturierte Daten
- [SOCIAL_SHARE.md](SOCIAL_SHARE.md) - Wie man Teilen in sozialen Medien hinzufügt (optional)
- [COMMENTS.md](docs/COMMENTS.md) - Wie man Kommentare hinzufügt (optional)
- [CHANGELOG.md](CHANGELOG.md) - Versionsverlauf
- [PUBLISHING.md](PUBLISHING.md) - Anleitung zum Veröffentlichen Ihres Themes

### In mehreren Sprachen verfügbar

- 🇬🇧 [README.md](README.md) - Englisch
- 🇮🇹 [README.it.md](README.it.md) - Italienisch
- 🇩🇪 [README.de.md](README.de.md) - Deutsch
- 🇫🇷 [README.fr.md](README.fr.md) - Französisch
- 🇪🇸 [README.es.md](README.es.md) - Spanisch

## Browserunterstützung

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)
- Mobile-Browser (iOS Safari, Chrome Mobile)

## Beiträge

Beiträge sind willkommen! Bitte reichen Sie gerne einen Pull Request ein. Für größere Änderungen öffnen Sie bitte zuerst ein Issue, um zu besprechen, was Sie ändern möchten.

1. Forken Sie das Repository
2. Erstellen Sie Ihren Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## Support

Wenn Sie auf Probleme stoßen oder Fragen haben:

- Öffnen Sie ein Issue auf [GitHub](https://github.com/amargiovanni/sexyjekyll-theme/issues)
- Überprüfen Sie die [Dokumentation](https://github.com/amargiovanni/sexyjekyll-theme#readme)

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## Mitwirkende

Erstellt von [Andrea Margiovanni](https://margiovanni.it)

## Danksagungen

- Gebaut mit [Jekyll](https://jekyllrb.com/)
- Syntax-Hervorhebung von [Rouge](https://github.com/rouge-ruby/rouge)
- Symbole und Design-Inspiration von modernen Web-Design-Trends

---

Wenn Sie dieses Theme nützlich finden, ziehen Sie bitte in Betracht, ihm einen Stern auf GitHub zu geben!
