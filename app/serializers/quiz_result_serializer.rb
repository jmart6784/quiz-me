class QuizResultSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :completed_at, :finished, :user_id, :quiz_id
  belongs_to :user
  belongs_to :quiz
  has_many :question_results
end
