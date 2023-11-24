class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user
  validates :user_id , presence: true

  has_one_attached :image

  broadcasts_to :room

end
