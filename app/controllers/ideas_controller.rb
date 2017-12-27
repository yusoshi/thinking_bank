class IdeasController < ApplicationController
  def index
    respond_to do |format|
      format.html {
        @ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).includes(:user)
        @latest_ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).limit(10).includes(:user)
        @idea = Idea.new

      }
      format.json {
        render json: @idea = Idea.find(params[:id])
      }
    end
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

  def update
    @idea = Idea.find(params[:id])
    if @idea.update(create_params)
      respond_to do |format|
        format.json {
          render json: @idea }
      end
    else
      flash.now[:alert] = "保存できませんでした。"
      render action: :index
    end
  end

  def destroy
    @idea = Idea.find(params[:id])
    if @idea.destroy
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
