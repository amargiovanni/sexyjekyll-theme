# frozen_string_literal: true

require 'spec_helper'
require_relative '../../_plugins/category_generator'

RSpec.describe Jekyll::CategoryPageGenerator do
  let(:site) do
    Jekyll::Site.new(
      Jekyll.configuration(
        'source' => File.expand_path('../..', __dir__),
        'lang' => 'en'
      )
    )
  end

  let(:generator) { described_class.new }

  before do
    # Create mock posts with categories
    post1 = instance_double(
      'Jekyll::Document',
      data: { 'categories' => ['ruby', 'jekyll'] }
    )
    post2 = instance_double(
      'Jekyll::Document',
      data: { 'categories' => ['ruby', 'testing'] }
    )
    post3 = instance_double(
      'Jekyll::Document',
      data: { 'categories' => ['javascript'] }
    )

    allow(site).to receive(:posts).and_return(
      instance_double('Jekyll::Posts', docs: [post1, post2, post3])
    )
    allow(site).to receive(:pages).and_return([])
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

      categories = pages_created.map { |p| p.data['category'] }.compact
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

    it 'generates correct permalink' do
      expect(category_page.data['permalink']).to eq('/categories/ruby/')
    end
  end
end
