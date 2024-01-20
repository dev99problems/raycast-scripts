#!/usr/bin/env ruby
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title video:convert
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.icon 📹

# Documentation:
# @raycast.author Eugene Chulkov
# @raycast.authorURL https://github.com/dev99problems

# frozen_string_literal: true

INPUT = "./input"
OUTPUT = "./output"

require_relative "lib/video_convert"

converter = VideoConvert::Converter.new(INPUT, OUTPUT)
converter.convert_all
