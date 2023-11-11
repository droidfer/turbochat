class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user
  validates :user_id , presence: true

  broadcasts_to :room
end
