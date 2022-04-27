class Api::V1::RatingsController < ApplicationController
  before_action :set_rating, only: [:update]
  before_action :authenticate_user!, only: [:create, :rating_show_by_quiz]

  def create
    rating = Rating.find_by(user_id: current_user.id, quiz_id: rating_params[:quiz_id])

    if rating.nil?
      rating = Rating.new(rating_params)
      rating.user_id = current_user.id

      if rating.save
        render json: rating
      else
        render json: rating.errors, status: 422
      end
    else
      return unless rating.user === current_user

      if rating.update(value: rating_params[:value])
        render json: rating
      else
        render json: rating.errors, status: 422
      end
    end
  end

  def show
    
  end

  def rating_show_by_quiz
    rate = Rating.find_by(quiz_id: params[:quiz_id].to_i, user_id: current_user.id)
    
    unless rate.nil?
      render json: rate
    else
      render json: {}
    end
  end

  def rating_data
    ratings = Rating.where(quiz_id: params[:quiz_id])

    if ratings.length === 0
      render json: {
        average: 0.0, 
        value_1: 0, 
        value_2: 0, 
        value_3: 0, 
        value_4: 0, 
        value_5: 0
      }
    else
      render json: {
        average: ratings.pluck('avg(value)').first.to_f.round(1),
        value_1: ratings.where(value: 1).count,
        value_2: ratings.where(value: 2).count,
        value_3: ratings.where(value: 3).count,
        value_4: ratings.where(value: 4).count,
        value_5: ratings.where(value: 5).count,
      }
    end
  end

  private

  def rating_params
    params.require(:rating).permit(:value, :quiz_id)
  end

  def rating
    @rating ||= Rating.find(params[:id])
  end

  def set_rating
    unless rating.user === current_user
      render json: {}, status: 401
    end
  end
end
