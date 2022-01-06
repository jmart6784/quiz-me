class Api::V1::QuizzesController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]
  before_action :set_quiz, only: [:update, :destroy]

  def index
    quizzes = Quiz.all.order(created_at: :desc)
    render json: quizzes, status: 200
  end

  def create
    quiz = Quiz.new(name: quiz_params[:name], description: quiz_params[:description])
    quiz.user_id = current_user.id

    if quiz.save
      if create_questions(quiz.id)
        render json: quiz
      end
    else
      render json: quiz.errors, status: 422
    end
  end

  def show
    if quiz
      render json: quiz
    else
      render json: quiz.errors
    end
  end

  def update
    quiz.name = quiz_params[:name]
    quiz.description = quiz_params[:description]

    if quiz.valid? && update_questions(quiz.id)
      quiz.save
      render json: {id: quiz.id, message: 'Quiz edited!'}
    else
      render json: {id: quiz.id, message: 'Quiz edited!'}, status: 422
    end
  end

  def destroy
    quiz&.destroy
    render json: { message: 'Quiz deleted!' }
  end

  def create_questions(quiz_id)
    questions = JSON.parse(quiz_params[:questions_attributes][:questions])
    parent_quiz = Quiz.find(quiz_id)

    questions_valid = true

    if questions.length === 0
      questions_valid = false
      parent_quiz.destroy
    end

    questions.each do |question|
      unless Question.new(
        question_type: question["question_type"],
        question: question["question"],
        option_1: question["option_1"],
        option_2: question["option_2"],
        option_3: question["option_3"],
        option_4: question["option_4"],
        option_5: question["option_5"],
        option_6: question["option_6"],
        option_7: question["option_7"],
        option_8: question["option_8"],
        option_9: question["option_9"],
        option_10: question["option_10"],
        answer: JSON.generate(question["answer"]),
        quiz_id: quiz_id,
        user_id: current_user.id
      ).valid?
        questions_valid = false
        parent_quiz.destroy
      end
    end

    if questions_valid
      questions.each do |question|
        Question.create(
          question_type: question["question_type"],
          question: question["question"],
          option_1: question["option_1"],
          option_2: question["option_2"],
          option_3: question["option_3"],
          option_4: question["option_4"],
          option_5: question["option_5"],
          option_6: question["option_6"],
          option_7: question["option_7"],
          option_8: question["option_8"],
          option_9: question["option_9"],
          option_10: question["option_10"],
          answer: JSON.generate(question["answer"]),
          quiz_id: quiz_id,
          user_id: current_user.id
        )
      end
    end

    return questions_valid
  end

  def update_questions(quiz_id)
    quiz_questions = Quiz.find(quiz_id).questions
    questions = JSON.parse(quiz_params[:questions_attributes][:questions])

    questions_valid = true

    questions_valid = false unless questions.length > 0 && questions.length < 51

    quiz_questions.each do |q_ques|
      questions.each do |question|
        q_ques.question_type = question["question_type"]
        q_ques.question = question["question"]
        q_ques.option_1 = question["option_1"]
        q_ques.option_2 = question["option_2"]
        q_ques.option_3 = question["option_3"]
        q_ques.option_4 = question["option_4"]
        q_ques.option_5 = question["option_5"]
        q_ques.option_6 = question["option_6"]
        q_ques.option_7 = question["option_7"]
        q_ques.option_8 = question["option_8"]
        q_ques.option_9 = question["option_9"]
        q_ques.option_10 = question["option_10"]
        q_ques.answer = JSON.generate(question["answer"])

        questions_valid = false unless q_ques.valid?
      end
    end

    if questions_valid
      quiz_questions.each do |q_ques|
        questions.each do |question|
          q_ques.update(
            question_type: question["question_type"],
            question: question["question"],
            option_1: question["option_1"],
            option_2: question["option_2"],
            option_3: question["option_3"],
            option_4: question["option_4"],
            option_5: question["option_5"],
            option_6: question["option_6"],
            option_7: question["option_7"],
            option_8: question["option_8"],
            option_9: question["option_9"],
            option_10: question["option_10"],
            answer: JSON.generate(question["answer"])
          )
        end
      end
    end

    return questions_valid
  end

  private

  def quiz_params
    params.require(:quiz).permit(
      :name, :description, :cover, questions_attributes: [:questions]
    )
  end

  def quiz
    @quiz ||= Quiz.find(params[:id])
  end

  def set_quiz
    unless quiz.user === current_user
      render json: {}, status: 401
    end
  end
end