class QuestionResultSerializer < ActiveModel::Serializer
  attributes :id, :correct, :answer, :user_answer, :question_id, :quiz_id, :quiz_result_id, :user_id

  belongs_to :quiz_result
  belongs_to :question
  belongs_to :user
  belongs_to :quiz
end
