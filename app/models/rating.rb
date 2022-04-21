class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :value, :user_id, :quiz_id, presence: true

  validates :value, numericality: { 
    only_integer: true,
    greater_than_or_equal_to: 5,
    less_than_or_equal_to: 1 
  }
end
