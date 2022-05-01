Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
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
      get '/quiz_results/quiz_results_by_quiz_id/:quiz_id', to: 'quiz_results#quiz_results_by_quiz_id'

      get '/question_results/index', to: 'question_results#index'
      get '/question_results/show/:id', to: 'question_results#show'
      post '/question_results/create', to: 'question_results#create'
      put '/question_results/update/:id', to: 'question_results#update'
      delete '/question_results/destroy/:id', to: 'question_results#destroy'
      get '/question_results/quiz_question_results/:quiz_result_id', to: 'question_results#quiz_question_results'

      post '/ratings/create', to: 'ratings#create'
      get '/ratings/show/:id', to: 'ratings#show'
      get '/rating_show_by_quiz/:quiz_id', to: 'ratings#rating_show_by_quiz'
      get '/rating_data/:quiz_id', to: 'ratings#rating_data'
    end
  end
end
