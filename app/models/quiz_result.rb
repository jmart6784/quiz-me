class QuizResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :start, :end, :completed_at, :finished, :quiz_id, :user_id, presence: true
end
