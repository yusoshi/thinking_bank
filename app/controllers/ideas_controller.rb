class IdeasController < ApplicationController
  def index
    @ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).includes(:user)
  end
end
