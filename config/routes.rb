Rails.application.routes.draw do
  root "homepage#index"
  get '/*path' => 'homepage#index'

  namespace :api do
    namespace :v1 do
      get '/quizzes/index'
      post '/quizzes/create'
      get '/show/:id', to: 'quizzes#show'
      delete '/destroy/:id', to: 'quizzes#destroy'
      put '/update/:id', to: 'quizzes#update'
    end
  end
end
