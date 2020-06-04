Rails.application.routes.draw do
  root 'posts#new'
  post '/', to: 'posts#create'
  resources :posts, only: [:show]
end
