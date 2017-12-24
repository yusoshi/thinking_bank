Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/password"
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'ideas#index'
  resources :ideas, only: [:new, :create, :destroy]
end
