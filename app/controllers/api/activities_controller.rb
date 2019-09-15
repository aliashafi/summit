class Api::ActivitiesController < ApplicationController

    def index 
        ids = []
        current_user.followers.each do |follow|
            ids << follow.id
        end
        current_user.following.each do |follow|
            ids << follow.id
        end
        ids << current_user.id
        
        if params[:page_id]
            @activities = Activity.where(user_id: ids)
            .order("activities.time DESC").page(params[:page_id]).per(5)
            @max = @activities.length
        else
            @activities = Activity.where(user_id: current_user.id)
        end
        
        
    end

    def show 
        @activity = Activity.find(params[:id])
        render :show
    end

    private 
    def activity_params
        params.require(:activity).permit(
            :title, :description, :elevation, :coordinates,
            :time, :distance, :average_speed, :elapse_time)
    end
end
