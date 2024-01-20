# frozen_string_literal: true

module Utils # :nodoc:
  def self.created_today?(date)
    today = Time.now
    date.day == today.day && date.month == today.month
  end

  def self.get_path(filename)
    # NOTE: you should have this INPUT/OUTPUT passed in initialize
    input_filepath = "#{INPUT}/#{filename}"
    output_filepath = "#{OUTPUT}/#{filename}"

    [input_filepath, output_filepath]
  end
end
