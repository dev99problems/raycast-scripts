require 'json'
require_relative 'env'

module Utils # :nodoc:
  def to_snake_case(word)
    word
      .to_s
      .gsub(/::/, '/')
      .gsub(/([A-Z]+)([A-Z][a-z])/, '\1_\2')
      .gsub(/([a-z\d])([A-Z])/, '\1_\2')
      .gsub(/\s/, '_')
      .tr('-', '_')
      .downcase
  end

  def fetch_data
    base = 'https://api.airtable.com/v0'
    `curl -s '#{base}/#{Env::BASE}/#{Env::TABLE}?maxRecords=40&view=Grid%20view' \
    -H 'Authorization: Bearer #{Env::KEY}' \
    | jq`
  end

  def prepare_data(raw)
    parsed = JSON.parse(raw)

    data = parsed['records'].map do |item|
      fields = item['fields']
      subscription = {}
      fields.each_pair { |k, v| subscription[to_snake_case(k)] = v }
      subscription
    end
  end

  def save_to_file(raw, converted)
    File.write("#{__dir__}/raw_response.json", raw)
    File.write("#{__dir__}/data.json", JSON.pretty_generate(converted))
  end
end
