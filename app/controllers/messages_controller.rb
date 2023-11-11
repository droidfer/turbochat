class MessagesController < ApplicationController
    before_action :set_room, only: [:create , :new]

    def new
      @message = @room.messages.new
    end
  
    def create
      @message = @room.messages.new(message_params)
      @message.user_id = current_user.id
      @message.save
  
      respond_to do |format|
          format.turbo_stream
          format.html { redirect_to @room}
      end
    end
  
    private
      def set_room
        @room = Room.find(params[:room_id])
      end
  
      def message_params
        params.require(:message).permit(:content)
      end
  end