Rails.application.routes.draw do
  root "homepage#index"

  namespace :api do
    namespace :v1 do
      get '/quizes/index'
      post '/quizes/create'
      get '/show/:id', to: 'quizes#show'
      delete '/destroy/:id', to: 'quizes#destroy'
      put '/update/:id', to: 'quizes#update'
    end
  end
end
