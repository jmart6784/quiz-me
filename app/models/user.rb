class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :quizzes
  has_many :questions

  has_one_attached :avatar

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
end
