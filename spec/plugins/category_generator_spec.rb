# frozen_string_literal: true

require 'spec_helper'
require_relative '../../_plugins/category_generator'

RSpec.describe Jekyll::CategoryPageGenerator do
  let(:site) do
    Jekyll::Site.new(
      Jekyll.configuration(
        'source' => File.expand_path('../..', __dir__),
        'lang' => 'en',
        'plugins' => []
      )
    )
  end

  let(:generator) { described_class.new }

  before do
    # Mock the layouts to include 'category' layout
    allow(site).to receive(:layouts).and_return({ 'category' => double('layout') })

    # Mock read_yaml method for CategoryPage instances to avoid file system access
    allow_any_instance_of(Jekyll::CategoryPage).to receive(:read_yaml) do |instance|
      instance.data ||= {}
      instance.data['layout'] = 'category'
    end

    # Create mock posts with categories
    post1 = instance_double(
      Jekyll::Document,
      data: { 'categories' => %w[ruby jekyll] }
    )
    post2 = instance_double(
      Jekyll::Document,
      data: { 'categories' => %w[ruby testing] }
    )
    post3 = instance_double(
      Jekyll::Document,
      data: { 'categories' => ['javascript'] }
    )

    # Mock categories hash - Jekyll builds this from posts
    categories_hash = {
      'ruby' => [post1, post2],
      'jekyll' => [post1],
      'testing' => [post2],
      'javascript' => [post3]
    }

    allow(site).to receive_messages(
      posts: double('posts', docs: [post1, post2, post3]),
      pages: [],
      categories: categories_hash
    )
  end

  describe '#generate' do
    it 'creates category pages for each unique category' do
      expect(site.pages).to receive(:<<).exactly(4).times

      generator.generate(site)
    end

    it 'creates pages with correct category names' do
      pages_created = []
      allow(site.pages).to receive(:<<) do |page|
        pages_created << page
      end

      generator.generate(site)

      categories = pages_created.filter_map { |p| p.data['category'] }
      expect(categories).to contain_exactly('ruby', 'jekyll', 'testing', 'javascript')
    end
  end

  describe Jekyll::CategoryPage do
    let(:category) { 'ruby' }
    let(:category_page) { described_class.new(site, site.source, category) }

    it 'sets the category layout' do
      expect(category_page.data['layout']).to eq('category')
    end

    it 'sets the category title' do
      expect(category_page.data['category']).to eq('ruby')
    end

    it 'generates correct directory path' do
      expect(category_page.instance_variable_get(:@dir)).to eq('categories/ruby')
    end
  end
end
