class Api::V1::QuizzesController < ApplicationController
  def index
    quizzes = Quiz.all.order(created_at: :desc)
    render json: quizzes, status: 200
  end

  def create
  end

  def show
    if quiz
      render json: quiz
    else
      render json: quiz.errors
    end
  end

  def destroy
  end

  private

  def quiz_params
    params.require(:quiz).permit(:name, :description)
  end

  def quiz
    @quiz ||= Quiz.find(params[:id])
  end
end