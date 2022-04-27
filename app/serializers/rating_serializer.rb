class RatingSerializer < ActiveModel::Serializer
  attributes :id, :value, :user_id, :quiz_id
  belongs_to :user
end
