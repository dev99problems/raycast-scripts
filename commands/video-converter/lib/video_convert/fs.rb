# frozen_string_literal: true

module FS # :nodoc:
  def self.safe_children(dirname)
    !Dir.exist?(dirname) && Dir.mkdir(dirname)
    Dir.children(dirname)
  end
end
