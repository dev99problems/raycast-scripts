require_relative 'subs_minder/fetch'
require_relative 'subs_minder/print_buddy'

local = true
# local = false
@active_subs = DataFetcher.new(local).active_subs

p = PrintBuddy.new
p.print_month_payout(@active_subs)
