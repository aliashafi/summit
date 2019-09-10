class Api::ActivitiesController < ApplicationController

    def index 
        ids = []
        current_user.followed_user.each do |follow|
            ids << follow.user_id
        end
        ids << current_user.id
        @activities = Activity.where(user_id: ids)
    end

    def show 
        @activity = Activity.find(params[:id])
        coordinates = JSON.parse(@activity.coordinates)
        @activity.coordinates = coordinates.values
        @activities.time = JSON.parse(@activity.time)
        @center = Activity.find_midpoint(coordinates.values)
        render :show
    end

    private 
    def activity_params
        params.require(:activity).permit(
            :title, :description, :elevation, :coordinates,
            :time, :distance, :average_speed, :elapse_time)
    end
end
