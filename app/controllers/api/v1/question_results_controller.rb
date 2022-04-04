class Api::V1::QuestionResultsController < ApplicationController
  before_action :set_question_result, only: [:update, :destroy]

  def index
    question_results = QuestionResult.all.order(created_at: :desc)
    render json: question_results, status: 200
  end

  def show
    if question_result
      render json: question_result
    else
      render json: question_result.errors
    end
  end

  def create
    question_result = QuestionResult.new(question_result_params)
    question_result.user_id = current_user.id

    if question_result.save
      render json: question_result
    else
      render json: question_result.errors, status: 422
    end
  end

  def update
    if question_result.update(question_result_params)
      render json: {id: question_result.id, message: "Question results updated"}
    else
      render json: {id: question_result.id, message: 'Error: Cannot update question results'}, status: 422
    end
  end

  def destroy
    question_result&.destroy
    render json: { message: 'Question Result deleted' }
  end

  def quiz_question_results
    quiz_result = QuizResult.find(params[:quiz_result_id])

    question_results = QuestionResult.where(
      user_id: current_user.id,
      quiz_id: quiz_result.quiz_id,
      quiz_result_id: quiz_result.id,
    )

    render json: question_results
  end

  private

  def question_result_params
    params.require(:question_result).permit(:correct, :answer, :question_id, :quiz_id, :quiz_result_id)
  end

  def question_result
    @question_result ||= QuestionResult.find(params[:id])
  end

  def set_question_result
    unless question_result.user === current_user
      render json: {}, status: 401
    end
  end
end
