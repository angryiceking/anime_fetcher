defmodule AnimeFetcher.Repo.Migrations.Anime do
  use Ecto.Migration

  def change do
	alter table(:anime) do
      add :thumbnail_img, :string
      add :img_url, :string
      add :score, :string
      add :status, :string
      add :ref_url, :string
    end
  end
end
