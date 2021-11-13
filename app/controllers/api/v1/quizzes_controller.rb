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

    # question = Question.new(quiz_params[:questions_attributes])

    if quiz.save
      render json: quiz
    else
      render json: quiz.errors
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
    quiz&.update(quiz_params)
    render json: {id: quiz.id, message: 'Quiz edited!'}
  end

  def destroy
    quiz&.destroy
    render json: { message: 'Quiz deleted!' }
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