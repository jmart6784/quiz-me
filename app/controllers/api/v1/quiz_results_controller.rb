class Api::V1::QuizResultsController < ApplicationController
  before_action :set_quiz_result, only: [:update, :destroy]

  def index
    quiz_results = QuizResult.all.order(created_at: :desc)
    render json: quiz_results, status: 200
  end

  def create
    quiz = Quiz.find(quiz_result_params[:quiz_id])

    on_going_quiz = QuizResult.where(user_id: current_user.id, quiz_id: quiz.id)

    quiz_result = QuizResult.new(
      start: DateTime.now,
      end: DateTime.now + quiz.time.seconds,
      quiz_id: quiz_result_params[:quiz_id],
      user_id: current_user.id
    )

    if on_going_quiz.empty?
      if quiz_result.save
        render json: quiz_result
      else
        render json: quiz_result.errors, status: 422
      end
    else
      if on_going_quiz.last.end < DateTime.now
        if quiz_result.save
          render json: quiz_result
        else
          render json: quiz_result.errors, status: 422
        end
      else
        render json: on_going_quiz.last
      end
    end
  end

  def show
    if quiz_result
      render json: quiz_result
    else
      render json: quiz_result.errors
    end
  end
  
  def update
    finished = quiz_result.quiz.questions.length === QuestionResult.where(
      user_id: current_user.id,
      quiz_result_id: quiz_result.id,
      quiz_id: quiz_result.quiz_id
    ).length

    if quiz_result.update(completed_at: DateTime.now, finished: finished)
      render json: {id: quiz_result.id, message: "Results updated"}
    else
      render json: {id: quiz_result.id, message: 'Error: Cannot update results'}, status: 422
    end
  end

  def destroy
    quiz_result&.destroy
    render json: { message: 'Results deleted' }
  end

  def quiz_results_by_quiz_id
        
  end

  private

  def quiz_result_params
    params.require(:quiz_result).permit(:quiz_id, :completed_at)
  end

  def quiz_result
    @quiz_result ||= QuizResult.find(params[:id])
  end

  def set_quiz_result
    return if quiz_result.user_id.nil?

    unless quiz_result.user === current_user
      render json: {}, status: 401
    end
  end
end
