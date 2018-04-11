Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    passwords: "users/passwords"
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'ideas#index'

  resources :ideas, except: [:new, :edit, :show]

  get 'whats/thinking_bank', to: 'whats#thinking_bank'
  get 'whats/help', to: 'whats#help'
end
