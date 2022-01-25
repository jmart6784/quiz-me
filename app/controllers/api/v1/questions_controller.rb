class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [ :update, :destroy ]
  before_action :set_question, only: [:update, :destroy]

  def show
    if question
      render json: question
    else
      render json: question.errors
    end    
  end

  def update
    if question.update(question_params)
      render json: {id: question.quiz.id, message: 'Question edited'}
    else
      render json: {message: 'Unable to edit question'}
    end
  end
  
  def destroy
    if question.quiz.questions.count > 1
      question&.destroy
      render json: { message: 'Question deleted' }
    else
      render json: {message: 'Error: Quiz must have at least one question'}
    end
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
