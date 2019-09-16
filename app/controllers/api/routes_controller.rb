class Api::RoutesController < ApplicationController

    def index
        @routes = Route.all()
    end

    def show
        @route = Route.find(params[:id])
    end

    def create
        @route = Route.new(route_params)
        debugger
        if @route.save
            render :show
        else
            render json: @routes.errors.full_messages
        end
    end

    def edit
        @route = route.find(params[:id])
        if @route.update(route_params) && @route.user_id == current_user.id
            render :show
        else
            render json: @routes.errors.full_messages
        end

    end

    def destroy
        @route = route.find(params[:id])
        if @route.user_id == current_user.id
            @route.destroy()
            render :index
        else
            render json: ["cannot delete another users route"]
        end
    end

    private
    def route_params
        params.require(:route).permit(
            :title, :user_id, :coordinates, :route_type, :description)
    end
end
