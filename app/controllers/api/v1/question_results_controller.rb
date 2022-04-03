class Api::V1::QuestionResultsController < ApplicationController
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
    
  end

  def destroy
    
  end

  private

  def question_result_params
    params.require(:question_result).permit(:correct, :answer, :question_id, :quiz_id, :quiz_result_id)
  end

  def question_result
    @question_result ||= QuestionResult.find(params[:id])
  end
end
