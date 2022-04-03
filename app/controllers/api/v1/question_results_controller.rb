class Api::V1::QuestionResultsController < ApplicationController
  def index
    question_results = QuestionResult.all.order(created_at: :desc)
    render json: question_results, status: 200
  end

  def show
    
  end

  def create
    
  end

  def update
    
  end

  def destroy
    
  end
end
