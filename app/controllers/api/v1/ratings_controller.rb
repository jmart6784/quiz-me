class Api::V1::RatingsController < ApplicationController
  before_action :set_rating, only: [:update]
  before_action :authenticate_user!, only: [:create]

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
      if rating.update(value: rating_params[:value])
        render json: rating
      else
        render json: rating.errors, status: 422
      end
    end
  end

  def show
    
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
