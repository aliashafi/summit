class ApplicationController < ActionController::Base
    helper_method :logged_in?, :current_user
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login(user)
        session[:session_token] = user.reset_session_token!
    end

    def logged_in?
        !!current_user
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil
    end

    def require_logged_in
        if !logged_in?
            render json: ['already logged in']
        end
    end
end
