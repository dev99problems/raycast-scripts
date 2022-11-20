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

ROW_LEN = 50
EMOJI_LEN = 2

class Row # :nodoc:
  include Enumerable

  attr_reader :data

  def initialize(sub)
    @data = {}

    @data['name'] = sub['name']
    @data['price'] = sub['price']
    @data['valid_to'] = sub['valid_through']
    @data['valid_to_formatted'] = convert_date(sub['valid_through'])
    @data['is_paid'] = Date.parse(@data['valid_to']) <= DateTime.now
  end

  def convert_date(date)
    date = Date.parse(date)
    date.strftime('%d %b')
  end

  def to_s
    valid_output = "#{@data['valid_to_formatted']} "
    price_output = format('%0.1f$', @data['price'])
    name_output = data['name'].ljust(ROW_LEN - EMOJI_LEN - price_output.length - valid_output.length)

    valid_output.green + name_output.light_blue + price_output.green
  end

  def <=>(other)
    other.data['valid_to_formatted'] <=> data['valid_to_formatted']
  end
end

class PrintBuddy # :nodoc:
  attr_reader :total

  def initialize
    @total = 0
  end

  def print_horiz_line
    puts "#{'-' * ROW_LEN}".light_blue
  end

  def table_rows(active_subs)
    rows = active_subs.map do |sub|
      row = Row.new(sub)
      @total += row.data['price']
      row
    end
  end

  def wrap_with_emojis(rows)
    recent_paid_sub_idx = rows.index { |row| row.data['is_paid'] == true } || 0
    next_payment_idx = [recent_paid_sub_idx - 1, 0].max

    rows.map.with_index do |row, idx|
      if row.data['is_paid']
        "✅#{row}"
      elsif next_payment_idx == idx
        "➡️#{row}"
      else
        ' ' * EMOJI_LEN + row.to_s
      end
    end
  end

  def print_subs_table(active_subs)
    rows = table_rows(active_subs)
    table_data = wrap_with_emojis(rows.sort)

    table_data.each { |row| puts row }
  end

  def print_total
    puts(' '.ljust(ROW_LEN - (@total.to_s.length + 1)) << "#{@total}$".green)
  end

  def print_month_payout(active_subs)
    puts "Current monthly active subs: #{active_subs.length}".light_blue
    print_horiz_line
    print_subs_table(active_subs)
    print_horiz_line
    print_total
  end
end
