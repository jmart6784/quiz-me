class Api::V1::UsersController < ApplicationController

  def user_info
    if user_signed_in?
      render json: {current_user: current_user, user_signed_in: user_signed_in?}
    else
      render json: {}, status: 401
    end
  end

end