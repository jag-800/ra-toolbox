Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'todos/:id/destroy_confirmation', to: 'todos#destroy_confirmation', as: 'destroy_confirmation'
  get "todos/text"
  get "todos/translate"
  post "todos/translation", to: "todos#translation"

  # Defines the root path route ("/")
  # root "articles#index"

  resources :todos
  root to: "todos#home"

end
