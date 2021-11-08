class Quiz < ApplicationRecord
  belongs_to :user
  has_one_attached :cover
  validate :cover_type

  before_create :set_default_cover

  def set_default_cover
    unless self.cover.attached?
      random_image = "cover_#{(1..10).to_a.sample}.jpg"

      self.cover.attach(
        io: File.open(
          Rails.root.join(
            'app', 'assets', 'images', 'default_quiz_cover', random_image
          )
        ), 
        filename: random_image, 
        content_type: 'image/png'
      )
    end
  end

  private

  def cover_type
    if cover.attached?
      if !cover.content_type.in?(%('image/jpeg image/jpg image/png'))
        errors.add(:cover, "needs to be JPG or PNG")
      end
    end
  end
end
