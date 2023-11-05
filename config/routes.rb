Rails.application.routes.draw do
  resources :rooms do
    resources :messages
  end
end
