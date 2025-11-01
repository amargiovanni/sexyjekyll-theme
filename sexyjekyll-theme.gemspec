# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "sexyjekyll-theme"
  spec.version       = "1.0.0"
  spec.authors       = ["Andrea Margiovanni"]
  spec.email         = ["hello@margiovanni.it"]

  spec.summary       = "A modern, feature-rich Jekyll theme with advanced capabilities"
  spec.description   = "SexyJekyll is a professional Jekyll theme featuring advanced search, reading progress, related posts, structured data, responsive design, comprehensive accessibility support, and AI-friendly llms.txt generation."
  spec.homepage      = "https://github.com/amargiovanni/sexyjekyll-theme"
  spec.license       = "MIT"

  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/amargiovanni/sexyjekyll-theme/issues",
    "changelog_uri"     => "https://github.com/amargiovanni/sexyjekyll-theme/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://github.com/amargiovanni/sexyjekyll-theme#readme",
    "homepage_uri"      => "https://github.com/amargiovanni/sexyjekyll-theme",
    "source_code_uri"   => "https://github.com/amargiovanni/sexyjekyll-theme",
  }

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|css|js|_layouts|_includes|_plugins|_sass|LICENSE|README|CHANGELOG|\.md$)}i)
  end

  spec.required_ruby_version = ">= 2.7.0"

  # Core dependencies
  spec.add_runtime_dependency "jekyll", "~> 4.3"

  # Plugin dependencies
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.8"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "liquid_reading_time", "~> 1.1"
  spec.add_runtime_dependency "jekyll_picture_tag", "~> 2.0"

  # Development dependencies
  spec.add_development_dependency "bundler", ">= 1.16"
  spec.add_development_dependency "rake", "~> 13.0"
end
