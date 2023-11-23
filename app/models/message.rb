class Message < ApplicationRecord
  belongs_to :room
  belongs_to :user
  validates :user_id , presence: true

  has_one_attached :image

  after_create_commit { broadcast_to_room }

  private
  def broadcast_to_room
    broadcast_append_to room, target: 'messages', partial: 'messages/message', 
                         locals: { message: self, user: }
  end
end
