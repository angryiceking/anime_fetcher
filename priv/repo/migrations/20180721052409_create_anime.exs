defmodule AnimeFetcher.Repo.Migrations.CreateAnime do
  use Ecto.Migration

  def change do
    create table(:anime) do
      add :name, :string
      add :img_src, :string
      add :details, :string

      timestamps()
    end

  end
end
