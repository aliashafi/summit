class Api::RoutesController < ApplicationController

    def index
    end

    def show
    end

    def create
    end

    def edit
    end

    private
    def route_params
        params.require(:route).permit(
            :title, :user_id, :coordinates)
    end
end
