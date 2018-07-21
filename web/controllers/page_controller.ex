defmodule AnimeFetcher.PageController do
  use AnimeFetcher.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def hello(conn, _params) do
  	json conn, _params
  end
end
