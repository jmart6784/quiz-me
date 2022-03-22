class Api::V1::QuizResultsController < ApplicationController
  def index
    quiz_results = QuizResult.all.order(created_at: :desc)
    render json: quiz_results, status: 200
  end

  def create
    quiz_result = QuizResult.new(quiz_result_params)
    quiz_result.user_id = current_user.id

    if quiz_result.save
      render json: quiz_result
    else
      render json: quiz_result.errors, status: 422
    end
  end

  def show
    quiz_result ? render json: quiz_result : render json: quiz_result.errors
  end
  
  def update
    if quiz_result.update(quiz_result_params)
      render json: {id: quiz_result.id, message: "Results updated"}
    else
      render json: {id: quiz_result.id, message: 'Error: Cannot update results'}, status: 422
    end
  end

  def destroy
    quiz_result&.destroy
    render json: { message: 'Results deleted' }
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
