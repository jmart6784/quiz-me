class Question < ApplicationRecord
  belongs_to :user
  belongs_to :quiz

  validates :question, :option_1, :option_2, :answer, :quiz_id, :user_id, presence: true

  validates :question, :option_1, :option_2, length: {minimum: 1, maximum: 300}

  validates :option_3, :option_4, :option_5, 
    :option_6, :option_7, :option_8, :option_9, :option_10, 
    length: {minimum: 1, maximum: 300}, allow_blank: true, allow_nil: true

  before_create :check_question_count
  before_destroy :one_question_minimum, prepend: true

  def check_question_count
    Quiz.find(self.quiz_id).questions.count < 50 ? true : false
  end

  def one_question_minimum
    throw :abort if Quiz.find(self.quiz_id).questions.count === 1
  end
end
