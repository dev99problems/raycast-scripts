require_relative 'utils'

class DataFetcher # :nodoc:
  include Utils

  def initialize(is_local)
    @is_local = is_local
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

  def active_subs
    subs = get_data
    active_subs = subs.select { |item| item['status'] and item['multi_per_year'] != 1 }
    active_subs
  end
end
