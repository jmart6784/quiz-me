class Api::V1::UsersController < ApplicationController

  def index
    users = User.all.order(created_at: :desc)
    render json: users, status: 200
  end

  def show
    if user
      render json: user
    else
      render json: {}, status: 404
    end
  end

  def user_info
    if user_signed_in?
      render json: {current_user: current_user, user_signed_in: user_signed_in?}
    else
      render json: {}, status: 401
    end
  end

  private

  def user
    @user ||= User.find(params[:id])
  end
end