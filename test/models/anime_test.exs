defmodule AnimeFetcher.AnimeTest do
  use AnimeFetcher.ModelCase

  alias AnimeFetcher.Anime

  @valid_attrs %{details: "some content", img_src: "some content", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Anime.changeset(%Anime{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Anime.changeset(%Anime{}, @invalid_attrs)
    refute changeset.valid?
  end
end
