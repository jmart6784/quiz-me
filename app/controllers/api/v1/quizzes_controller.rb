class Api::V1::QuizzesController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]
  before_action :set_quiz, only: [:update, :destroy]

  def index
    quizzes = Quiz.all.order('created_at DESC')
    render json: quizzes, status: 200
  end

  def create
    quiz = Quiz.new(quiz_params.except(:questions_attributes))
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
    if quiz.update(quiz_params.except(:questions_attributes))
      render json: {id: quiz.id, message: 'Quiz edited!'}
    else
      render json: {id: quiz.id, message: 'Error: Cannot edit quiz'}, status: 422
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
      question["answer"] = JSON.generate(question["answer"])
      question["quiz_id"] = quiz_id
      question["user_id"] = current_user.id

      ques = Question.new(question)

      unless ques.valid?
        questions_valid = false
        parent_quiz.destroy
      end
    end

    questions.each { |question| Question.create(question) } if questions_valid

    questions_valid
  end

  def quizzes_by_user
    quizzes = Quiz.where(user_id: params[:user_id])
    render json: quizzes
  end

  private

  def quiz_params
    params.require(:quiz).permit(
      :name, :description, :cover, :time, questions_attributes: [:questions]
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