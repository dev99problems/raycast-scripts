require_relative 'utils'

class DataFetcher # :nodoc:
  include Utils

  def initialize(opts)
    @is_local = opts[:is_local]
  end

  def fetch_local
    data = File.read("#{__dir__}/data.json")
    parsed = JSON.parse(data)
    subs = parsed
  end

  def fetch_remote
    raw_data = fetch_data
    subs = prepare_data(raw_data)
  end

  def get_data
    if @is_local
      fetch_local
    else
      fetch_remote
    end
  end

  def active_subs(duration = 'monthly')
    subs = get_data
    subs.select { |item| item['active'] and item['duration'] == duration }
  end
end
