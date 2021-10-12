class Api::V1::UsersController < ApplicationController

  def user_info
    if user_signed_in?
      render json: current_user
    else
      render json: {}, status: 401
    end
  end

end