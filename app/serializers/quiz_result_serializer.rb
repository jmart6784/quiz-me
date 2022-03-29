class QuizResultSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :completed_at, :finished, :user_id, :quiz_id
end
