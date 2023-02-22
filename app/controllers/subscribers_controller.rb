# frozen_string_literal: true

class SubscribersController < ApplicationController
  include PaginationMethods

  def get_total_subscriber_count
    subscribers = Subscriber.all
    return pagination(subscribers.count)
  end

  ##
  # GET /api/subscribers
  def index
    @subscribers = Subscriber.all
    limited_subscribers = @subscribers.drop(offset).first(limit)

    render json: {subscribers: limited_subscribers, pagination: get_total_subscriber_count}, formats: :json
  end

  def create
    subscriber = Subscriber.new(email: params['email'], name: params['name'], status: false)

    if subscriber.save
      render json: {subscriber: subscriber, pagination: get_total_subscriber_count, message: "Subscriber created successfully"}, formats: :json, status: :created
    else
      render json: {message: "Subscriber exists already"}, formats: :json, status: :not_acceptable
    end
  end

  def update
    subscriber = Subscriber.find(params['id'])

    if subscriber.update(subscriber_params)   
      @subscribers = Subscriber.all
      limited_subscribers = @subscribers.drop(offset).first(limit)

      render json: {subscribers: limited_subscribers, message: "Subscriber updated successfully"}, formats: :json, status: :ok
    else
      render json: {message: "We're sorry... something happened. The subscriber could not be updated at this time"}, formats: :json, status: :not_acceptable
    end
  end

  private
  def subscriber_params
    params.require(:subscriber).permit(:email, :name, :status)
  end
end
