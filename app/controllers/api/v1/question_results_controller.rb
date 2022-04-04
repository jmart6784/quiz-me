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
    quiz_result = QuizResult.find(question_result_params[:quiz_result_id])
    question = Question.find(question_result_params[:question_id])

    existing_ques_result = QuestionResult.find_by(
      question_id: question.id,
      quiz_result_id: quiz_result.id,
      quiz_id: quiz_result.quiz_id,
      user_id: current_user.id
    )

    ua_ary = JSON.parse(question_result_params[:user_answer])

    unless existing_ques_result.nil?
      existing_answer = JSON.parse(existing_ques_result.user_answer)

      if question.question_type === "one answer"
        existing_answer = JSON.parse(question_result_params[:user_answer])
      elsif question.question_type === "multiple answers"
        if existing_answer.include?(ua_ary[0])
          existing_answer.delete(ua_ary[0])
        else
          existing_answer << ua_ary[0]
        end
      end

      existing_answer = existing_answer.to_set.to_a.map(&:to_i).sort.map(&:to_s)

      if existing_ques_result.update(correct: JSON.parse(question.answer) === existing_answer, user_answer: JSON.generate(existing_answer))
        render json: QuestionResult.where(
          user_id: current_user.id,
          quiz_id: quiz_result.quiz_id,
          quiz_result_id: quiz_result.id,
        )
      else
        render json: {
          id: existing_ques_result.id, 
          message: 'Error: Cannot update question results'
        }, status: 422
      end
    else
      question_result = QuestionResult.new(
        correct: JSON.parse(question.answer) === ua_ary,
        user_answer: question_result_params[:user_answer],
        answer: question.answer,
        quiz_result_id: quiz_result.id,
        question_id: question.id,
        quiz_id: quiz_result.quiz_id,
        user_id: current_user.id
      )

      if question_result.save
        render json: QuestionResult.where(
          user_id: current_user.id,
          quiz_id: quiz_result.quiz_id,
          quiz_result_id: quiz_result.id,
        )
      else
        render json: question_result.errors, status: 422
      end
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
    params.require(:question_result).permit(:user_answer, :question_id, :quiz_result_id)
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
