defmodule AnimeFetcher.AnimeControllerTest do
  use AnimeFetcher.ConnCase

  alias AnimeFetcher.Anime
  @valid_attrs %{details: "some content", img_src: "some content", name: "some content"}
  @invalid_attrs %{}

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, anime_path(conn, :index)
    assert html_response(conn, 200) =~ "Listing anime"
  end

  test "renders form for new resources", %{conn: conn} do
    conn = get conn, anime_path(conn, :new)
    assert html_response(conn, 200) =~ "New anime"
  end

  test "creates resource and redirects when data is valid", %{conn: conn} do
    conn = post conn, anime_path(conn, :create), anime: @valid_attrs
    assert redirected_to(conn) == anime_path(conn, :index)
    assert Repo.get_by(Anime, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, anime_path(conn, :create), anime: @invalid_attrs
    assert html_response(conn, 200) =~ "New anime"
  end

  test "shows chosen resource", %{conn: conn} do
    anime = Repo.insert! %Anime{}
    conn = get conn, anime_path(conn, :show, anime)
    assert html_response(conn, 200) =~ "Show anime"
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, anime_path(conn, :show, -1)
    end
  end

  test "renders form for editing chosen resource", %{conn: conn} do
    anime = Repo.insert! %Anime{}
    conn = get conn, anime_path(conn, :edit, anime)
    assert html_response(conn, 200) =~ "Edit anime"
  end

  test "updates chosen resource and redirects when data is valid", %{conn: conn} do
    anime = Repo.insert! %Anime{}
    conn = put conn, anime_path(conn, :update, anime), anime: @valid_attrs
    assert redirected_to(conn) == anime_path(conn, :show, anime)
    assert Repo.get_by(Anime, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    anime = Repo.insert! %Anime{}
    conn = put conn, anime_path(conn, :update, anime), anime: @invalid_attrs
    assert html_response(conn, 200) =~ "Edit anime"
  end

  test "deletes chosen resource", %{conn: conn} do
    anime = Repo.insert! %Anime{}
    conn = delete conn, anime_path(conn, :delete, anime)
    assert redirected_to(conn) == anime_path(conn, :index)
    refute Repo.get(Anime, anime.id)
  end
end
