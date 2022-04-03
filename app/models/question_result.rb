class QuestionResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  belongs_to :question
  belongs_to :quiz_result

  validates :answer, :user_answer, :question_id, :quiz_id, :quiz_result_id, :user_id, presence: true

  validates :correct, inclusion: [true, false]

  validate :answer_type

  private

  def answer_type
    answer_col = JSON.parse(answer)
    user_answer_col = JSON.parse(user_answer)
    throw :abort unless answer_col.class == Array && user_answer_col.class == Array
  end
end