class QuizResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :question_results, dependent: :destroy

  validates :start, :end, :quiz_id, :user_id, presence: true
  validates :finished, inclusion: [true, false]
end
