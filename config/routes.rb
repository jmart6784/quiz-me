Rails.application.routes.draw do
  devise_for :users
  root "homepage#index"

  namespace :api do
    namespace :v1 do
      get '/quizzes/index', to: 'quizzes#index'
      post '/quizzes/create', to: 'quizzes#create'
      get 'quizzes/show/:id', to: 'quizzes#show'
      delete '/destroy/:id', to: 'quizzes#destroy'
      put '/update/:id', to: 'quizzes#update'

      get '/users/user_info', to: 'users#user_info'
    end
  end
end
