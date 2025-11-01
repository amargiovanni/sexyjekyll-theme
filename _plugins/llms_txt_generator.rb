module Jekyll
  class LLMSTxtGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Check if llms.txt layout exists
      return unless site.layouts.key?('llms')

      # Generate llms.txt for each post
      site.posts.docs.each do |post|
        # Create a new page for the llms.txt file
        site.pages << LLMSTxtPage.new(site, post)
      end
    end
  end

  class LLMSTxtPage < Page
    def initialize(site, post)
      @site = site
      @base = site.source

      # Get the post's directory path
      # Posts have permalink like /blog/2025/10/28/post-title/
      # We want to create llms.txt in the same directory
      @dir = post.url.chomp('/')
      @name = 'llms.txt'

      self.process(@name)

      # Initialize data hash and copy post data
      self.data = {}
      self.data.merge!(post.data)

      # Set the content from the post
      self.content = post.content

      # Use the llms layout
      self.data['layout'] = 'llms'

      # Ensure the file is treated as a page to be processed
      self.data['permalink'] = File.join(post.url, 'llms.txt')
    end
  end
end
