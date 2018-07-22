defmodule AnimeFetcher.Anime do
  use AnimeFetcher.Web, :model

  schema "anime" do
    field :name, :string
    field :img_src, :string
    field :details, :string
    field :img_url, :string
    field :status, :string
    field :ref_url, :string
    field :score, :string
    field :thumbnail_img, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :img_src, :details, :img_url, :status, :ref_url, :score, :thumbnail_img])
    |> validate_required([:name, :img_src, :details, :img_url, :status, :ref_url, :score, :thumbnail_img])
  end
end
