class Quiz < ApplicationRecord
  belongs_to :user
  has_one_attached :cover
  validate :cover_type

  private

  def cover_type
    if cover.attached?
      if !cover.content_type.in?(%('image/jpeg image/jpg image/png'))
        errors.add(:cover, "needs to be JPG or PNG")
      end
    end
  end
end
