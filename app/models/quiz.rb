class Quiz < ApplicationRecord
  belongs_to :user
  has_one_attached :cover
end
