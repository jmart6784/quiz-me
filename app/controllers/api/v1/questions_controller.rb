class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [ :update, :destroy ]
  before_action :set_question, only: [:update, :destroy]

  def update
    
  end
  
  def destroy
    
  end

  private

  def question_params
    params.require(:question).permit(
      :question_type, :question, :option_1, 
      :option_2, :option_3, :option_4, 
      :option_5, :option_6, :option_7, 
      :option_8, :option_9, :option_10, :answer
    )
  end

  def question
    @question ||= Question.find(params[:id])
  end

  def set_question
    unless question.user === current_user
      render json: {message: "Action not permitted"}, status: 401
    end
  end
end
