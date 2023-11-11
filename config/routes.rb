Rails.application.routes.draw do
  devise_for :users
  
  resources :rooms do
    resources :messages
  end

  root 'rooms#index'
end
