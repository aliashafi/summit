Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do

    resources :users, only: [:create, :show, :index] do 
      resources :routes, only: [:create, :destroy, :index, :show, :edit]
    end

    resource :session, only: [:create, :destroy]

    resources :activities do 
      resources :comments, only: [:index]
      resources :kudos, only: [:index]
    end

    resources :kudos, only: [:create, :show, :destroy]

    resources :comments, only: [:create, :destroy, :show]


    resources :pages, only: [:show] do 
      resources :activities, only: [:index]
    end


    resources :follows, only: [:index]
  end
  
  root to: "static_pages#root"

end
