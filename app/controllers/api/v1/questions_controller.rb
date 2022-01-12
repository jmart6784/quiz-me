class Api::V1::QuestionsController < ApplicationController
  def update
    
  end
  
  def destroy
    
  end

  private

  def question
    @question ||= Question.find(params[:id])
  end
end
