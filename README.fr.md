# Thème SexyJekyll

Un thème Jekyll moderne et riche en fonctionnalités, conçu pour les blogs professionnels et les sites personnels. Construit en gardant à l'esprit l'accessibilité, les performances et l'expérience utilisateur.

![Thème SexyJekyll](screenshot.png)

## Fonctionnalités

### Design et Expérience Utilisateur
- **Design Moderne** : Esthétique propre et minimaliste
- **Entièrement Réactif** : Design mobile-first qui fonctionne sur tous les appareils
- **Indicateur de Lecture** : Indicateur visuel montrant la progression de la lecture de l'article
- **Styles d'Impression** : Mises en page optimisées pour l'impression

### Contenu et Navigation
- **Recherche Avancée** : Recherche client instantanée avec mise en évidence des mots-clés
- **Articles Connexes** : Recommandations intelligentes basées sur les catégories et les étiquettes
- **Catégories** : Filtrage et organisation basés sur les catégories
- **Pagination** : Pagination des articles personnalisable

### SEO et Réseaux Sociaux
- **Optimisé pour le SEO** : Balises meta, Open Graph, Twitter Cards
- **Données Structurées** : Schéma JSON-LD pour une meilleure compréhension par les moteurs de recherche
- **Flux RSS** : Génération automatique du flux
- **Plan du Site** : Sitemap auto-généré pour les moteurs de recherche

### Accessibilité
- **WCAG 2.1 Niveau AA** : Support d'accessibilité complet
- **Ignorer vers le Contenu** : Aides à la navigation au clavier
- **HTML Sémantique** : Points de repère HTML5 et structure appropriés
- **Étiquettes ARIA** : Adapté aux lecteurs d'écran
- **Mouvement Réduit** : Respecte les préférences de mouvement de l'utilisateur
- **Contraste Élevé** : Excellents rapports de contraste des couleurs

### Performance
- **Images Réactives** : Format WebP avec plusieurs tailles
- **Chargement Paresseux** : Les images se chargent selon les besoins
- **CSS/JS Optimisés** : Code minifié et efficace
- **Temps de Chargement Rapides** : Optimisé pour les performances

### Fonctionnalités pour les Développeurs
- **Coloration Syntaxique** : Blocs de code avec numéros de ligne (Rouge)
- **Temps de Lecture** : Estimation automatique du temps de lecture
- **Multi-langue** : Système i18n complet prenant en charge l'anglais, l'italien, l'allemand, le français et l'espagnol
- **Personnalisable** : Configuration facile via `_config.yml`
- **Bien Documenté** : Documentation complète incluse

### Fonctionnalités IA et LLM
- **Support llms.txt** : Génération automatique de résumés de contenu adapté aux IA
- **llms.txt par Article** : Chaque article de blog génère son propre fichier llms.txt dédié à `/blog/YYYY/MM/DD/post-slug/llms.txt`
- **llms.txt au Niveau du Site** : Fichier llms.txt principal à la racine avec aperçu du site et structure du contenu
- **Contenu Structuré** : Balisage HTML5 sémantique et propre optimisé pour les crawlers IA
- **Schéma JSON-LD** : Données structurées enrichies pour une meilleure compréhension du contenu
- **Adapté aux Crawlers IA** : Approche accueillante de l'indexation par IA avec des instructions claires

## Installation

### En tant que Gemme Ruby (Recommandé)

Ajoutez cette ligne au `Gemfile` de votre site Jekyll :

```ruby
gem "sexyjekyll-theme"
```

Et ajoutez cette ligne à votre `_config.yml` Jekyll :

```yaml
theme: sexyjekyll-theme
```

Puis exécutez :

```bash
bundle install
```

### Thème Distant (GitHub Pages)

Si vous utilisez GitHub Pages, ajoutez ceci à votre `_config.yml` :

```yaml
remote_theme: amargiovanni/sexyjekyll-theme
```

### Installation Manuelle

1. Téléchargez ou clonez ce dépôt
2. Copiez les fichiers sur votre site Jekyll
3. Mettez à jour votre `_config.yml` avec les paramètres du thème

## Démarrage Rapide

1. **Installez le thème** en utilisant l'une des méthodes ci-dessus

2. **Configurez** votre `_config.yml` :

```yaml
# Paramètres du site
title: Votre Nom
email: votre.email@example.com
description: Description de votre site
baseurl: ""
url: "https://votresite.com"
lang: fr  # Options: en, it, de, fr, es

# Informations de l'auteur
author:
  name: Votre Nom
  email: votre.email@example.com
  linkedin: https://www.linkedin.com/in/votreprofil/
  bluesky: https://bsky.app/profile/votrehandle

# Logo de navigation
nav_logo:
  type: text  # 'text' ou 'image'
  text: VN    # Vos initiales ou texte
  # image: /assets/img/logo.png  # Ou chemin vers l'image du logo
  # alt: Votre Logo

# Section héros
hero:
  name: Votre Nom
  role: Votre Rôle
  subtitle: Votre Entreprise ou Slogan
  tagline: Votre slogan personnel
  description: Une brève description à votre sujet

# Section blog
blog:
  title: Blog
  description: Description de votre blog

# Section contact
contact:
  title: Nous Contacter
  description: Description de la page de contact
  links:
    - name: Email
      url: mailto:votre.email@example.com
      type: email
    - name: LinkedIn
      url: https://www.linkedin.com/in/votreprofil/
      type: linkedin
```

3. **Créez votre premier article** dans `_posts/` :

```markdown
---
layout: post
title: "Votre Premier Article"
subtitle: "Sous-titre optionnel"
date: 2025-11-01
categories: blog tech
---

Le contenu de votre article ici...
```

4. **Exécutez Jekyll** :

```bash
bundle exec jekyll serve
```

Visitez `http://localhost:4000` pour voir votre site !

## Configuration

### Mises en Page Disponibles

- `default` - Mise en page de base pour toutes les pages
- `home` - Page d'accueil avec section héros
- `blog` - Page de listing du blog
- `post` - Article de blog individuel
- `about` - Page à propos
- `contact` - Page de contact avec liens sociaux
- `category` - Listing des articles spécifiques à une catégorie
- `404` - Page d'erreur 404 personnalisée

### Plugins

Le thème utilise ces plugins Jekyll :

**Plugins Standard :**
- `jekyll-feed` - Génération de flux RSS
- `jekyll-seo-tag` - Balises meta SEO
- `jekyll-paginate` - Pagination des articles
- `jekyll-sitemap` - Génération du sitemap
- `liquid_reading_time` - Estimation du temps de lecture
- `jekyll_picture_tag` - Images réactives

**Plugins Personnalisés :**
- `llms_txt_generator` - Génère automatiquement les fichiers llms.txt pour chaque article de blog et crée des résumés de contenu adaptés aux IA
- `auto_related_posts` - Système intelligent de recommandation d'articles basé sur les catégories, les étiquettes et la similarité du contenu utilisant un algorithme de type TF-IDF
- `category_generator` - Crée automatiquement des pages dédiées pour chaque catégorie avec des listings d'articles filtrés
- `localized_date` - Filtre Liquid pour formater les dates selon la langue sélectionnée (par exemple, "15 January 2025" en anglais, "15 gennaio 2025" en italien, "15 janvier 2025" en français)

### Personnalisation

#### Couleurs et Styles

Modifiez `css/style.css` pour personnaliser les couleurs, les polices et les styles.

#### Liens Sociaux

Configurez les liens sociaux dans `_config.yml` sous `contact.links`. Types pris en charge :
- email, linkedin, bluesky, twitter, github, instagram, facebook
- youtube, mastodon, telegram, whatsapp, medium, reddit
- discord, tiktok, twitch, slack

## Documentation

Une documentation détaillée est disponible dans les fichiers suivants :

- [I18N.md](docs/I18N.md) - Système d'internationalisation et support multilingue
- [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) - Fonctionnalités d'accessibilité et tests
- [SEARCH.md](docs/SEARCH.md) - Fonctionnalité de recherche
- [READING_PROGRESS.md](docs/READING_PROGRESS.md) - Indicateur de progression de lecture
- [STRUCTURED_DATA.md](docs/STRUCTURED_DATA.md) - Données structurées SEO
- [SOCIAL_SHARE.md](SOCIAL_SHARE.md) - Comment ajouter le partage social (optionnel)
- [COMMENTS.md](docs/COMMENTS.md) - Comment ajouter des commentaires (optionnel)
- [CHANGELOG.md](CHANGELOG.md) - Historique des versions
- [PUBLISHING.md](PUBLISHING.md) - Guide pour publier votre thème

### Disponible en Plusieurs Langues

- 🇬🇧 [README.md](README.md) - Anglais
- 🇮🇹 [README.it.md](README.it.md) - Italien
- 🇩🇪 [README.de.md](README.de.md) - Allemand
- 🇫🇷 [README.fr.md](README.fr.md) - Français
- 🇪🇸 [README.es.md](README.es.md) - Espagnol

## Support des Navigateurs

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)
- Navigateurs mobiles (iOS Safari, Chrome Mobile)

## Contribuer

Les contributions sont bienvenues ! N'hésitez pas à soumettre une Pull Request. Pour les changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous aimeriez changer.

1. Créez un fork du dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/FonctionnaliteFormidable`)
3. Validez vos modifications (`git commit -m 'Ajoutez une FonctionnaliteFormidable'`)
4. Poussez vers la branche (`git push origin feature/FonctionnaliteFormidable`)
5. Ouvrez une Pull Request

## Support

Si vous rencontrez des problèmes ou avez des questions :

- Ouvrez une issue sur [GitHub](https://github.com/amargiovanni/sexyjekyll-theme/issues)
- Consultez la [documentation](https://github.com/amargiovanni/sexyjekyll-theme#readme)

## Licence

Ce projet est licencié sous la Licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Crédits

Créé par [Andrea Margiovanni](https://margiovanni.it)

## Remerciements

- Construit avec [Jekyll](https://jekyllrb.com/)
- Coloration syntaxique par [Rouge](https://github.com/rouge-ruby/rouge)
- Icônes et inspiration de conception des tendances modernes du design web

---

Si vous trouvez ce thème utile, veuillez envisager de lui donner une étoile sur GitHub !
