class Api::V1::RatingsController < ApplicationController
  before_action :set_rating, only: [:update]

  def create
    rating = Rating.new(rating_params)
    rating.user_id = current_user.id

    if rating.save
      render json: rating
    else
      render json: rating.errors, status: 422
    end
  end

  def show
    
  end

  def update
    
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
