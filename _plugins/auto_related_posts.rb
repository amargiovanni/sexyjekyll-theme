require 'set'

module Jekyll
  class AutoRelatedPostsGenerator < Generator
    safe true
    priority :low

    # Common words to ignore (Italian and English stop words)
    STOP_WORDS = Set.new(%w[
      il la i le lo gli un una dei delle degli di da in con su per tra fra
      a e o ma se come quando perché dove chi che cosa cui qual quale
      questo questa questi queste quello quella quelli quelle
      essere avere fare dare stare andare venire dire potere dovere volere
      molto poco più meno anche ancora solo sempre mai già
      the be to of and a in that have it for not on with he as you do at
      this but his by from they we say her she or an will my one all would
      there their what so up out if about who get which go me when make can
      like time no just him know take people into year your good some could
      them see other than then now look only come its over think also back
      after use two how our work first well way even new want because any
      these give day most us
    ])

    # Minimum word length to consider
    MIN_WORD_LENGTH = 4

    def generate(site)
      return if site.posts.docs.empty?

      # Extract keywords from all posts
      posts_keywords = {}
      site.posts.docs.each do |post|
        posts_keywords[post] = extract_keywords(post)
      end

      # Calculate related posts for each post
      site.posts.docs.each do |post|
        related = calculate_related_posts(post, site.posts.docs, posts_keywords)

        # Store in post data for use in templates
        post.data['auto_related_posts'] = related.take(6).map { |r| r[:post] }
        post.data['auto_related_scores'] = related.take(6).map { |r| r[:score] }
      end
    end

    private

    def extract_keywords(post)
      # Combine title, subtitle, categories, and content
      text = [
        post.data['title'],
        post.data['subtitle'],
        post.data['categories']&.join(' '),
        post.data['tags']&.join(' '),
        post.content
      ].compact.join(' ')

      # Extract words, clean and filter
      words = text
        .downcase
        .gsub(/<[^>]*>/, ' ')  # Remove HTML tags
        .gsub(/[^a-zàèéìòùäöüß\s]/, ' ')  # Keep only letters (including Italian/German)
        .split
        .select { |w| w.length >= MIN_WORD_LENGTH && !STOP_WORDS.include?(w) }

      # Count word frequency
      word_freq = Hash.new(0)
      words.each { |word| word_freq[word] += 1 }

      # Boost title and category words
      title_words = post.data['title'].to_s.downcase.split
      post.data['categories']&.each do |cat|
        cat.downcase.split(/[-_\s]/).each do |word|
          word_freq[word] *= 3 if word.length >= MIN_WORD_LENGTH
        end
      end

      title_words.each do |word|
        word_freq[word] *= 2 if word.length >= MIN_WORD_LENGTH
      end

      # Return top keywords
      word_freq.sort_by { |_, v| -v }.take(20).to_h
    end

    def calculate_related_posts(current_post, all_posts, posts_keywords)
      current_keywords = posts_keywords[current_post]
      current_categories = Set.new(current_post.data['categories'] || [])
      current_tags = Set.new(current_post.data['tags'] || [])

      related = []

      all_posts.each do |other_post|
        next if other_post.url == current_post.url

        score = 0

        # Category matching (high weight)
        other_categories = Set.new(other_post.data['categories'] || [])
        shared_categories = current_categories & other_categories
        score += shared_categories.size * 10

        # Tag matching (medium weight)
        other_tags = Set.new(other_post.data['tags'] || [])
        shared_tags = current_tags & other_tags
        score += shared_tags.size * 5

        # Keyword matching (calculated by TF-IDF-like similarity)
        other_keywords = posts_keywords[other_post]
        keyword_score = calculate_keyword_similarity(current_keywords, other_keywords)
        score += keyword_score

        # Time proximity bonus (recent posts get small boost)
        days_diff = (current_post.date - other_post.date).abs / 86400
        if days_diff < 30
          score += 2
        elsif days_diff < 90
          score += 1
        end

        related << { post: other_post, score: score } if score > 0
      end

      # Sort by score descending
      related.sort_by { |r| -r[:score] }
    end

    def calculate_keyword_similarity(keywords1, keywords2)
      return 0 if keywords1.empty? || keywords2.empty?

      # Calculate overlap score
      shared_keywords = keywords1.keys & keywords2.keys
      return 0 if shared_keywords.empty?

      # Weight by frequency in both documents
      score = 0
      shared_keywords.each do |keyword|
        # Multiply frequencies and take square root for normalization
        freq_product = keywords1[keyword] * keywords2[keyword]
        score += Math.sqrt(freq_product)
      end

      # Normalize by document lengths
      magnitude1 = Math.sqrt(keywords1.values.map { |v| v * v }.sum)
      magnitude2 = Math.sqrt(keywords2.values.map { |v| v * v }.sum)

      return 0 if magnitude1 == 0 || magnitude2 == 0

      # Cosine similarity, scaled to be comparable with category scores
      (score / (magnitude1 * magnitude2)) * 20
    end
  end
end
