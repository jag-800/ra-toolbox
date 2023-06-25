require 'rest-client'
require 'json'

class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  def index
    @todos = Todo.all
  end

  def show
  end

  def new
    @todo = Todo.new
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      redirect_to @todo, notice: 'Todo was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @todo.update(todo_params)
      redirect_to @todo, notice: 'Todo was successfully updated.'
    else
      render :edit
    end
  end

  def destroy_confirmation
      @todo = Todo.find(params[:id])
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    redirect_to todos_path, notice: 'メモが削除されました。'
  end

  def translation
    text = params[:text]
    target_lang = params[:target_lang]
    api_key = '19a6c6b7-4405-5c0e-7d8d-2271740b31bd:fx'
    if text.present?
      puts "API Request: #{text} (Target Language: #{target_lang})"
      response = RestClient.post(
        'https://api-free.deepl.com/v2/translate',
        { text: text, target_lang: target_lang, auth_key: api_key, alternatives: 1 }
      )
      translation_data = JSON.parse(response.body)


      if translation_data['translations'].present? && translation_data['translations'].first.present?
        translation = translation_data['translations'].first['text']
        alternatives = translation_data['translations'].first['alternativeTranslations']&.map { |alternative| alternative['text'] }
        render json: { translation: translation, alternatives: alternatives }
        puts translation_data.inspect
      else
        render json: { error: 'No translation data found.' }, status: :bad_request
      end
    else
      render json: { error: 'Text is required.' }, status: :bad_request
    end
  end
  
  



  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :select, :category, :description)
  end
end
