# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 50.times do
#   Department.create(
#     name: Faker::Lorem.sentence,
#     description: Faker::Lorem.paragraph
#   )
# end

# 10.times do
#   Position.create(
#     name: Faker::Lorem.sentence,
#     description: Faker::Lorem.paragraph,
#     department_id: rand(1..50)
#   )
# end

# 1.times do
#   staff = Staff.create(
#     fullname: Faker::Name.name,
#     contract_name: Faker::Lorem.paragraph,
#     date_of_birth: Date.new,
#     start_contract: Date.new,
#     gender: 'men',
#     contract_term: Date.new,
#     status: rand(0..2),
#     position_id: rand(1..10),
#     department_id: rand(1..10),
#     staff_id: nil
#   )
# end

# 10.times do
#   GroupProperty.create(
#     name: Faker::Commerce.brand,
#     description: Faker::Lorem.paragraph
#   )
# end

20.times do
  Property.create(
    code_seri: Faker::Code.nric,
    name: Faker::Name.name,
    brand: Faker::Commerce.brand,
    group_property_id: rand(1..10),
    price: rand(10000..100000000),
    date_buy: Faker::Date.in_date_period(month: 2),
    number_of_repairs: rand(0..5),
    status: 0
  )
end

# i = 0
# 20.times do
#   i+=1
#   ProvideAsset.create(
#     provider_id: 16,
#     receiver_id: rand(17..25),
#     asset_id: i,
#     date_provide: Faker::Date.in_date_period(month: 10),
#     date_recall: nil,
#     type_provide: 'ca nhan',
#   )
# end