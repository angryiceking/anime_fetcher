defmodule AnimeFetcher.Anime do
  use AnimeFetcher.Web, :model

  schema "anime" do
    field :name, :string
    field :img_src, :string
    field :details, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :img_src, :details])
    |> validate_required([:name, :img_src, :details])
  end
end
