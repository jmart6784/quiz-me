class QuizSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :cover, :time, :rating_data
  belongs_to :user
  has_many :questions

  def cover
    if object.cover.attached?
      {
        url: rails_blob_url(object.cover)
      }
    end
  end

  def rating_data
    ratings = Rating.where(quiz_id: object.id)
    h = {}

    if ratings.length === 0
      h = {
        average: 0.0, 
        value_1: 0, 
        value_2: 0, 
        value_3: 0, 
        value_4: 0, 
        value_5: 0
      }
    else
      h = {
        average: ratings.pluck('avg(value)').first.to_f.round(1),
        value_1: ratings.where(value: 1).count,
        value_2: ratings.where(value: 2).count,
        value_3: ratings.where(value: 3).count,
        value_4: ratings.where(value: 4).count,
        value_5: ratings.where(value: 5).count,
      }
    end
  end

  def questions
    object.questions.order( 'created_at ASC' )
  end
end
