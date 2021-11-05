class QuizSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :cover
  belongs_to :user
  def cover
    if object.cover.attached?
      {
        url: ""
      }
    end
  end
end
