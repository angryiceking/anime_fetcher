defmodule AnimeFetcher.Repo.Migrations.CreateAnime do
  use Ecto.Migration

  def change do
    create table(:anime) do
      add :name, :string
      add :img_src, :string
      add :details, :string
      add :thumbnail_img, :string
      add :img_url, :string
      add :score, :string
      add :status, :string
      add :ref_url, :string

      timestamps()
    end

  end
end
