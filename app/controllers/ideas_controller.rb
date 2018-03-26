class IdeasController < ApplicationController
  def index
    @ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).includes(:user)
    @latest_ideas = Idea.where(user_id: current_user).order(updated_at: :DESC).limit(10).includes(:user)
    @idea = Idea.new
    respond_to do |format|
      format.html {
        monthSelect = 'current'
        show_selected_calendar('', monthSelect)
      }
      format.json {
        render json: show_selected_calendar(params[:captionMonth], params[:monthSelect])
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

  def insert_idea_to_current_month_idea(idea)
    @current_month_ideas << idea
  end

  def show_selected_calendar(captionMonth, monthSelect)
  # 前月を見るときの@todayを定義
    if monthSelect == 'current'
      @today = Date.today
    elsif monthSelect == 'back'
      @today = Date.strptime(captionMonth, '%Y-%m-%d') - 1.month
    end
  # 次月を見るときの@todayを定義しましょう。
    @month = @today.strftime("%m")
  # @d = 今月の最初の日付が所属する週の最初の日付データ
    @d = @today.at_beginning_of_month.at_beginning_of_week(:sunday)

  # 今月のideaを取得
    # 今月を取得 ex."2018-01"
    month_of_current_year = @today.year.to_s + '-' + @month.to_s

    # 今月のideaを配列に入れる。※同じ日に２つ以上のideaがある場合は、最新のideaのみ入れる。
    @current_month_ideas = []


    i = 0
    @ideas.each do |idea|
    # ideaが今月のものであるか？
      if idea.updated_at.to_s.match(/#{month_of_current_year.to_s}/)
       # 今月のideaは最新のものを1個のみ取得する
      # ideaが既にcurrent_month_ideasに入っていたら、既に入っているideaを削除し、新しいのideaを入れる。
        if i == 0
          insert_idea_to_current_month_idea(idea)
          i = 1
        else
          already_exist_idea = @current_month_ideas.last
            # idea.updated_atの「日」とcurrent_month_idea.updated_atの「日」が同じならば、current_ideaを削除し、ideaを@current_month_ideaにいれる。
          date_of_idea = idea.updated_at.to_s[8..9]
          date_of_already_exist_idea = already_exist_idea.updated_at.to_s[8..9]
          if date_of_idea == date_of_already_exist_idea
            next
          else
            insert_idea_to_current_month_idea(idea)
          end
        end
      end
    end
    return @current_month_ideas, @today, @month, @d
  end
end
