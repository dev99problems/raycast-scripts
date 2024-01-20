# frozen_string_literal: true

require_relative "lib/video_convert/version"

# For more information and examples about making a new gem, check out our
# guide at: https://bundler.io/guides/creating_gem.html
Gem::Specification.new do |spec|
  spec.name = "video_convert"
  spec.version = VideoConvert::VERSION
  spec.authors = ["Eugene Chulkov"]
  spec.email = ["genechulkov@gmail.com"]

  spec.summary = ""
  spec.description = ""
  spec.homepage = "https://github.com/dev99problems/raycast-scripts"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["homepage_uri"] = spec.homepage

  spec.require_paths = ["lib"]
end
