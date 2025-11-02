# frozen_string_literal: true

module Jekyll
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      return unless site.layouts.key? 'category'

      site.categories.each_key do |category|
        site.pages << CategoryPage.new(site, site.source, category)
      end
    end
  end

  class CategoryPage < Page
    def initialize(site, base, category)
      @site = site
      @base = base
      @dir = File.join('categories', category)
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'category.html')
      data['category'] = category
      data['title'] = category.tr('-', ' ').capitalize.to_s
    end
  end
end
