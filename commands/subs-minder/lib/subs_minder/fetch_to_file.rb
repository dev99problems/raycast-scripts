require_relative 'utils'

include Utils

def fetch_to_file
  raw_data = fetch_data
  converted = prepare_data raw_data
  save_to_file(raw_data, converted)
end

fetch_to_file
