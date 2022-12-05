require_relative 'subs_minder/fetch'
require_relative 'subs_minder/print_buddy'

duration = 'monthly'
active_subs = DataFetcher.new(local: true).active_subs

p = PrintBuddy.new(duration: duration)
p.print_active_payouts(active_subs)
