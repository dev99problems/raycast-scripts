# frozen_string_literal: true

$LOAD_PATH.unshift File.expand_path("../lib", __dir__)
require "video_convert"

require "minitest/reporters"
require "minitest/autorun"

Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new
