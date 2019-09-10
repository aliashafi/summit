class Api::FollowsController < ApplicationController

    def index
        @followers = current_user.followers
        @following = current_user.following
    end

end
