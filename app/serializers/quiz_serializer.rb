class QuizSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :cover
  belongs_to :user
  def cover
    if object.cover.attached?
      {
        url: rails_blob_url(object.cover)
      }
    end
  end
end
