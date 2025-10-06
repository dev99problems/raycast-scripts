# frozen_string_literal: true

module Utils # :nodoc:
  def self.created_today?(date)
    today = Time.now
    date.day == today.day && date.month == today.month && date.year == today.year
  end

  def self.get_file_paths(dirs, filename)
    input_dir, output_dir = dirs

    input_filepath = "#{input_dir}/#{filename}"
    output_filepath = "#{output_dir}/#{filename}"

    [input_filepath, output_filepath]
  end
end
