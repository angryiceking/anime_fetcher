defmodule AnimeFetcher.Router do
  use AnimeFetcher.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AnimeFetcher do
    pipe_through :browser # Use the default browser stack

    post "/add", AnimeController, :add_to_model

    get "/", PageController, :index
    resources "/anime", AnimeController
  end

  scope "/get", AnimeFetcher do
    pipe_through :api

    get "/sample", AnimeController, :sample
    get "/api/:name", AnimeController, :get
    get "/poison/:search", AnimeController, :poison
  end

  # Other scopes may use custom stacks.
  # scope "/api", AnimeFetcher do
  #   pipe_through :api
  # end
end
