# frozen_string_literal: true

require_relative "lib/video_convert"

INPUT = "./input"
OUTPUT = "./output"

converter = VideoConvert::Converter.new(INPUT, OUTPUT)
converter.convert_all
