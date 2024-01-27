# frozen_string_literal: true

require "timecop"
require_relative "helper"
require_relative "../lib/video_convert/utils"

INPUT_DIR = "./input"
OUTPUT_DIR = "./output"

dirs = [INPUT_DIR, OUTPUT_DIR]

describe "VideoConvert" do
  describe "Utils.created_today" do
    before do
      Timecop.freeze(Date.new(2024, 11, 20))
    end

    after do
      Timecop.return
    end

    it "return true, if passed date matches today" do
      res = Utils.created_today?(Date.new(2024, 11, 20))

      expect(res).must_equal true
    end

    it "return false, if passed date doesn't match today" do
      res = Utils.created_today?(Date.new(2024, 11, 21))

      expect(res).must_equal false
    end
  end

  describe "Utils.get_file_paths" do
    it "calculate proper file input & output paths" do
      input, output = Utils.get_file_paths(dirs, "new_video.mov")

      expect(input).must_equal "./input/new_video.mov"
      expect(output).must_equal "./output/new_video.mov"
    end
  end
end
