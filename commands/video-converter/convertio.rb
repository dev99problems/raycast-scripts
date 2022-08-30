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

INPUT = './input'
OUTPUT = './output'

module Helpers
  def created_today?(date)
    today = Time.now
    date.day == today.day && date.month == today.month
  end
end

include Helpers

def get_path(filename)
  input_filepath = "#{INPUT}/#{filename}",
  output_filepath = "#{OUTPUT}/#{filename}"
end

def convert(filename)
  input, output = get_path(filename)
  command = "ffmpeg -i #{input} -hide_banner -loglevel error -vf scale=1920:1024 -preset slow -crf 18 #{output} -y"
  # async
  fork { exec(command) }
end

input_files = Dir.children(INPUT)
output_files = Dir.children(OUTPUT)

def get_files_in_scope(input_files, output_files)
  res = input_files.select do |filename|
    input, _ = get_path(filename)

    creation_date = File.birthtime(input)
    already_converted = output_files.include?(filename)
    is_directory = File.directory?(input)

    is_in_scope = created_today?(creation_date) && (!already_converted) && (!is_directory)
    filename if is_in_scope
  end
end

scope = get_files_in_scope(input_files, output_files)

if scope.empty?
  puts "Nothing to convert!"
else
  puts "Files to be converted:"
end

scope.each do |filename|
  p filename
  convert filename
end
