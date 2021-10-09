class Api::V1::QuizzesController < ApplicationController
  def index
    quiz = Quiz.all.order(created_at: :desc)
    render json: quiz, status: 200
  end

  def create
  end

  def show
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