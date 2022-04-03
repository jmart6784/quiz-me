class QuizResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :start, :end, :quiz_id, :user_id, presence: true
  validates :finished, inclusion: [true, false]
end
