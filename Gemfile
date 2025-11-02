# frozen_string_literal: true

source 'https://rubygems.org'

gem 'base64'
gem 'csv'
gem 'jekyll', '~> 4.3.0'
gem 'logger'

group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.12'
  gem 'jekyll-paginate', '~> 1.1'
  gem 'jekyll_picture_tag'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap', '~> 1.4'
  gem 'liquid_reading_time'
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '>= 1', '< 3'
  gem 'tzinfo-data'
end

gem 'http_parser.rb', '~> 0.6.0', platforms: [:jruby]
gem 'wdm', '~> 0.1.1', platforms: %i[mingw x64_mingw mswin]

group :development, :test do
  gem 'rspec', '~> 3.12'
  gem 'rubocop', '~> 1.50', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rspec', require: false
end
