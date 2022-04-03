class QuestionResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  belongs_to :question
  belongs_to :quiz_result

  validates :correct, :answer, :user_answer, :question_id, :quiz_id, :quiz_result_id, :user_id, presence: true

  validates :correct, inclusion: [true, false]
end
