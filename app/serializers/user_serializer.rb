class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :first_name, :last_name, :username, :bio, :avatar

  def avatar
    if object.avatar.attached?
      # development enviornment
      # {
      #   url: rails_blob_url(object.avatar)
      # }
      # Production
      {
        url: object.avatar.url
      }
    end
  end
end
