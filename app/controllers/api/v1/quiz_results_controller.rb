class Api::V1::QuizResultsController < ApplicationController
  def index
    quiz_results = QuizResult.all.order(created_at: :desc)
    render json: quiz_results, status: 200
  end
  
  private

  def quiz_result_params
    params.require(:quiz_result).permit(
      :start, :end, :completed_at, :finished, :quiz_id
    )
  end

  def quiz_result
    @quiz_result ||= QuizResult.find(params[:id])
  end
end
