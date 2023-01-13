require 'deep_cover/builtin_takeover'
require 'simplecov'
SimpleCov.start

require "paperclip/matchers"
require 'capybara/rspec'
require "pundit/rspec"


RSpec.configure do |config|
  config.include Paperclip::Shoulda::Matchers

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.after(:each) { DatabaseCleaner.strategy = :truncation; DatabaseCleaner.clean }
end
