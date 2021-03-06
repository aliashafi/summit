class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        @user.photo.attach(io: File.open("#{Rails.root}/db/images/indigo.jpg"), filename: "indigo.jpg")
        @user_follow = User.find_by(username: "aliashafi")
        if @user.save 
            Follow.create!(user_id: @user.id, follower_id: @user_follow.id)
            Follow.create!(user_id: @user_follow.id, follower_id: @user.id)
            login(@user)
            
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end

    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    def index
        # all_users = [current_user.id]
        # current_user.following.each {|follow| all_users.push(follow.id)}
        # current_user.followers.each {|follow| all_users.push(follow.id)}
        # @users = User.where(id: all_users).to_a
        @users = User.all()
       
    end
    
    private 
    def user_params
        params.require(:user).permit(
            :username, :password, :first_name, :last_name,
            :country, :city, :state, :sex)
    end

end
