class Question < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :question, :option_1, :option_2, :answer, :quiz_id, :user_id, presence: true

  validates :question, :option_1, :option_2, length: {minimum: 1, maximum: 300}

  validates :option_3, :option_4, :option_5, 
    :option_6, :option_7, :option_8, :option_9, :option_10, 
    length: {minimum: 1, maximum: 300}, allow_blank: true, allow_nil: true

  validate :answer_type

  before_create :check_question_count

  def check_question_count
    throw :abort unless Quiz.find(self.quiz_id).questions.count < 50
  end

  private

  def answer_type
    throw :abort unless JSON.parse(answer).class == Array
  end
end
