class Api::ActivitiesController < ApplicationController

    def index 
        @activities = Activity.all()
    end

    def show 
        @activity = Activity.find(params[:id])
        coordinates = JSON.parse(@activity.coordinates)
        @activity.coordinates = coordinates.values
        render :show
    end

    private 
    def activity_params
        params.require(:activity).permit(
            :title, :description, :elevation, :coordinates,
            :time, :distance, :average_speed, :elapse_time)
    end
end
