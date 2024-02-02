# frozen_string_literal: true

require_relative "helper"

describe "VideoConvert::VERSION" do
  it "has a version number" do
    value(::VideoConvert::VERSION).wont_be_nil
  end
end
