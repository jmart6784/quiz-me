class Api::V1::RatingsController < ApplicationController
  before_action :set_rating, only: [:update]

  def create
    
  end

  def show
    
  end

  def update
    
  end

  private

  def rating_params
    params.require(:rating).permit(:value, :user_id, :quiz_id)
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
