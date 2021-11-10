class Question < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :question, :option_1, :option_2, :answer, :quiz_id, :user_id, presence: true

  validates :question, :option_1, :option_2, :option_3, :option_4, :option_5,
    :option_6, :option_7, :option_8, :option_9, :option_10, 
    length: {minimum: 1, maximum: 300}
end
