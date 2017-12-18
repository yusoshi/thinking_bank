class IdeasController < ApplicationController
  def index
    @ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).includes(:user)
    @idea = Idea.new
  end

  def create
    @idea = Idea.new(create_params)
    if @idea.save
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @idea }
      end
      else
        @ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).includes(:user)
        flash.now[:alert] = "保存できませんでした。"
        render action: :index
    end
  end

  private

  def create_params
    params.require(:idea).permit(:title, :body).merge(user_id: current_user.id)
  end
end
