class QuestionResult < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  belongs_to :question
  belongs_to :quiz_result
end
