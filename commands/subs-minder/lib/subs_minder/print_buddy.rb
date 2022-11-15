require 'date'

class String
  def colorize(color_code)
    "\e[#{color_code}m#{self}\e[0m"
  end

  def green
    colorize(32)
  end

  def yellow
    colorize(33)
  end

  def blue
    colorize(34)
  end

  def light_blue
    colorize(36)
  end
end

class PrintBuddy # :nodoc:
  attr_reader :total

  ROW_LEN = 50

  def initialize
    @total = 0
  end

  def print_horiz_line
    puts "#{'-' * ROW_LEN}".light_blue
  end

  def convert_date(date)
    date = Date.parse(date)
    date.strftime('%d %b')
  end

  def print_subs_table(active_subs)
    rows = active_subs.map do |sub|
      name = sub['name']
      price = sub['price']
      valid_through = convert_date(sub['valid_through'])
      @total += price

      valid_output = "#{valid_through} "
      price_output = format('%0.2f💲', price)
      name_output = name.ljust(ROW_LEN - price_output.length - valid_output.length)
      row = valid_output.green + name_output.light_blue + price_output.green
    end

    rows.sort.each { |row| puts row}
  end

  def print_total
    puts(' '.ljust(ROW_LEN - (@total.to_s.length + 1)) << "#{@total}💲".green)
  end

  def print_month_payout(active_subs)
    puts "Current monthly active subs: #{active_subs.length}".light_blue
    print_horiz_line
    print_subs_table(active_subs)
    print_horiz_line
    print_total
  end
end
