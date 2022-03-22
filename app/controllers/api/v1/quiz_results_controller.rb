class Api::V1::QuizResultsController < ApplicationController
  def index
    quiz_results = QuizResult.all.order(created_at: :desc)
    render json: quiz_results, status: 200
  end
end
