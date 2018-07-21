defmodule AnimeFetcher do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(AnimeFetcher.Repo, []),
      # Start the endpoint when the application starts
      supervisor(AnimeFetcher.Endpoint, []),
      # Start your own worker by calling: AnimeFetcher.Worker.start_link(arg1, arg2, arg3)
      supervisor(AnimeFetcher.Presence, []),
      # worker(AnimeFetcher.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AnimeFetcher.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    AnimeFetcher.Endpoint.config_change(changed, removed)
    :ok
  end
end
