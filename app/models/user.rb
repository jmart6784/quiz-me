class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :quizzes, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :quiz_results, dependent: :destroy
  has_many :ratings, dependent: :destroy

  has_one_attached :avatar, dependent: :destroy

  VALID_USERNAME_REGEX = /\A[a-zA-Z0-9]+\z/
  validates :username, uniqueness: true, presence: true, length: {minimum: 4, maximum: 16}, format: { with: VALID_USERNAME_REGEX }
  validates :first_name, :last_name, presence: true, length: { minimum: 1, maximum: 60 }
  validates :bio, length: { maximum: 150 }
  validate :avatar_type

  after_create :set_default_avatar

  def set_default_avatar
    unless self.avatar.attached?
      self.avatar.attach(
        io: File.open(
          Rails.root.join(
            'app', 'assets', 'images', 'default_avatar.png'
          )
        ), 
        filename: 'default_avatar.png', 
        content_type: 'image/png'
      )
    end
  end

  private

  def avatar_type
    if avatar.attached?
      if !avatar.content_type.in?(%('image/jpeg image/jpg image/png'))
        errors.add(:avatar, "needs to be JPG or PNG")
      end
    end
  end
end
