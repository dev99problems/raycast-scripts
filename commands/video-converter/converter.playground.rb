INPUT = './input'
OUTPUT = './output'

module Helpers
  def created_today?(date)
    today = Time.now
    date.day == today.day && date.month == today.month
  end

  def make_readable_size(size_in_bytes)
    suffix = %W(B KB MB)
    idx = 0
    rest = 0
    size = size_in_bytes

    while size / 1024 > 1
      idx += 1
      new_size = size / 1024
      rest = size - new_size * 1024
      size = new_size
    end

    "#{size}.#{rest / 10} #{suffix[idx]}"
  end

  def get_size(filename)
    File.exist?(filename) ? make_readable_size(File.size(filename)) : 'NA'
  end
end

include Helpers

def get_path(filename)
  input_filepath = "#{INPUT}/#{filename}",
  output_filepath = "#{OUTPUT}/#{filename}"
end

def convert(filename)
  input, output = get_path(filename)
  command = "ffmpeg -i #{input.inspect} -hide_banner -loglevel error -vf scale=1536:1024 -preset slow -crf 18 #{output.inspect} -y"
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

    is_in_scope = created_today?(creation_date) && not(already_converted)
    filename if is_in_scope
  end
end

scope = get_files_in_scope(input_files, output_files)

if scope.empty?
  puts "Nothing to convert!"
else
  puts "Files to convert:"
end

scope.each do |filename|
  p filename
  # convert filename
end
