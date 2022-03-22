Rails.application.routes.draw do
  devise_for :users
  root "homepage#index"

  namespace :api do
    namespace :v1 do
      get '/quizzes/index', to: 'quizzes#index'
      post '/quizzes/create', to: 'quizzes#create'
      get '/quizzes/show/:id', to: 'quizzes#show'
      delete '/quizzes/destroy/:id', to: 'quizzes#destroy'
      put '/quizzes/update/:id', to: 'quizzes#update'

      get '/questions/show/:id', to: 'questions#show'
      post '/questions/create', to: 'questions#create'
      put '/questions/update/:id', to: 'questions#update'
      delete '/questions/destroy/:id', to: 'questions#destroy'

      get '/users/user_info', to: 'users#user_info'
      get '/users/index', to: 'users#index'
      get '/users/show/:id', to: 'users#show'

      get '/quiz_results/index', to: 'quiz_results#index'
      get '/quiz_results/show/:id', to: 'quiz_results#show'
      post '/quiz_results/create', to: 'quiz_results#create'
      put '/quiz_results/update/:id', to: 'quiz_results#update'
      delete '/quiz_results/destroy/:id', to: 'quiz_results#destroy'
    end
  end
end
