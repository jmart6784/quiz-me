class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :quiz_results, dependent: :destroy
  has_one_attached :cover

  accepts_nested_attributes_for :questions

  validate :cover_type
  validates :name, presence: true, length: {minimum: 1, maximum: 50}
  validates :description, presence: true, length: {minimum: 1, maximum: 1000}
  validates :time, numericality: { 
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 86400 
  }

  before_create :set_default_cover

  def set_default_cover
    unless self.cover.attached?
      random_image = "cover_#{(1..15).to_a.sample}.jpg"

      self.cover.attach(
        io: File.open(
          Rails.root.join(
            'app', 'assets', 'images', 'default_quiz_cover', random_image
          )
        ), 
        filename: random_image, 
        content_type: 'image/jpg'
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
