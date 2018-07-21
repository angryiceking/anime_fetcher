defmodule AnimeFetcher.AnimeController do
  use AnimeFetcher.Web, :controller
  use HTTPoison.Base

  alias AnimeFetcher.Anime

  def index(conn, _params) do
    anime = Repo.all(Anime)
    json conn, %{
        "name" => anime.name,
        "details" => anime.details,
        "img_src" => anime.img_src,
    }
  end

  def new(conn, _params) do
    changeset = Anime.changeset(%Anime{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"anime" => anime_params}) do
    changeset = Anime.changeset(%Anime{}, anime_params)

    case Repo.insert(changeset) do
      {:ok, _anime} ->
        conn
        |> put_flash(:info, "Anime created successfully.")
        |> redirect(to: anime_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    anime = Repo.get!(Anime, id)
    json conn, %{
        "anime" => %{
          "name" => anime.name,
          "details" => anime.details,
          "img_src" => anime.img_src,
        }
    }
  end

  def poison(conn, %{"search" => search}) do
    HTTPoison.start
    url = "https://myanimelist.net/search/prefix.json?type=anime&keyword="<>String.trim(search)<>"";
    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        text conn, body
      {:error, %HTTPoison.Error{reason: reason}} ->
        text conn, url
    end
  end

  def get(conn, %{"name" => name}) do
    anime = Repo.all(from a in Anime, where: like(a.name, ^("%#{name}%")), select: [a.name, a.img_src, a.details])
    json conn, anime
  end

  def edit(conn, %{"id" => id}) do
    anime = Repo.get!(Anime, id)
    changeset = Anime.changeset(anime)
    render(conn, "edit.html", anime: anime, changeset: changeset)
  end

  def update(conn, %{"id" => id, "anime" => anime_params}) do
    anime = Repo.get!(Anime, id)
    changeset = Anime.changeset(anime, anime_params)

    case Repo.update(changeset) do
      {:ok, anime} ->
        conn
        |> put_flash(:info, "Anime updated successfully.")
        |> redirect(to: anime_path(conn, :show, anime))
      {:error, changeset} ->
        render(conn, "edit.html", anime: anime, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    anime = Repo.get!(Anime, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(anime)

    conn
    |> put_flash(:info, "Anime deleted successfully.")
    |> redirect(to: anime_path(conn, :index))
  end
end
