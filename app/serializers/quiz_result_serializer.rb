class QuizResultSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :completed_at, :finished, :user_id, :quiz_id
  belongs_to :user
  belongs_to :quiz
  has_many :question_results

  def question_results
    final = {question_results: object.question_results, questions: []}

    final[:question_results].each { |r| final[:questions] << r.question }

    final
  end
end
