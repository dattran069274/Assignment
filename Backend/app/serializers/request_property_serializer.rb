# == Schema Information
#
# Table name: request_properties
#
#  id                :bigint           not null, primary key
#  request_type      :integer
#  description       :string
#  reason            :string
#  status            :integer
#  requester_id      :integer
#  approver_id       :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  group_property_id :bigint
#
class RequestPropertySerializer < BaseSerializer
  attributes  :id,
              :status,
              :request_type,
              :reason,
              :description,
              :requester,
              :approver,
              :group_property,
              :created_at,
              :updated_at

  attribute :comments
end
