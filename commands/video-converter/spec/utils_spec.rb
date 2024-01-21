# frozen_string_literal: true

require_relative "helper"
require_relative "../lib/video_convert/utils"

INPUT_DIR = "./input"
OUTPUT_DIR = "./output"

dirs = [INPUT_DIR, OUTPUT_DIR]

describe "VideoConvert" do
  describe "Utils.created_today" do
    it "should do something" do
      # Utils.created_today?
      skip
    end
  end

  describe "Utils.get_file_paths" do
    it "calculate proper file input & output paths" do
      input, output = Utils.get_file_paths(dirs, "new_video.mov")

      value(input).must_equal "./input/new_video.mov"
      value(output).must_equal "./output/new_video.mov"
    end
  end
end
