# frozen_string_literal: true

require_relative "utils"
require_relative "fs"

module VideoConvert
  class Converter # :nodoc:
    include Utils
    include FS

    def initialize(input, output)
      @input = input
      @output = output
      @input_files = FS.safe_children @input
      @output_files = FS.safe_children @output
      @scope = get_files_in_scope(@input_files, @output_files)
    end

    def convert(filename)
      input, output = Utils.get_file_paths([@input, @output], filename)
      # scale=1920:-2 needed because of wish to set only one side.
      # usually the ommited side will be set as -1, but some codecs needs a value multiple to 2,
      # so -2 is the answer http://trac.ffmpeg.org/wiki/Scaling#KeepingtheAspectRatio
      params = "-hide_banner -loglevel error -vf scale=1920:-2 -preset slow -crf 18"
      command = "ffmpeg -i #{input.inspect} #{params} #{output.inspect} -y"
      # async
      fork { exec(command) }
    end

    def get_files_in_scope(input_files, output_files)
      input_files.select do |filename|
        input, = Utils.get_file_paths([@input, @output], filename)

        creation_date = File.birthtime(input)
        already_converted = output_files.include?(filename)
        is_directory = File.directory?(input)

        is_in_scope = Utils.created_today?(creation_date) && !already_converted && !is_directory
        filename if is_in_scope
      end
    end

    def convert_all
      if @scope.empty?
        puts "Nothing to convert!"
      else
        puts "Files to be converted:"
      end

      @scope.each do |filename|
        p filename
        convert filename
      end
    end
  end
end
