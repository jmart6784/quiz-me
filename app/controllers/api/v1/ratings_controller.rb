class Api::V1::RatingsController < ApplicationController
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
end
