# AnimeFetcher

A simple anime search engine using Elixir with Phoenix framework and an API.

credits to MyAnimeList.net for the API.

To start your Phoenix app:

  * Install dependencies with 
  $ `mix deps.get`
  * Create and migrate your database with 
  $ `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with 
  $ `npm install`
  * Start Phoenix endpoint with 
  $ `mix phoenix.server`

  * configure your database connection in config/dev.exs


  * create database in your postgresql
  $ `mix phoenix.get.schema anime name:string img_src:string details:string thumbnail_img:string img_url:string score:string status:string ref_url:string`
  // more info at [https://hexdocs.pm/phoenix/ecto.html#the-repo]
  * run octo migrate
  $ `mix octo.migrate`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Simple Guide on How to use.

1.) Once you started your server and its running, go to localhost:4000 to go to the index page

2.) Search any anime you want using their anime titles as search parameters and it will run through the script searching MyAnimeList with the same title. Once successful, a list of result will be shown.

3.) If you click in one of the result, it will display more info about the anime at the right corner, at the same time, the anime chosen will be saved to the database so that once searched again, it will not make request to the API avoiding slower search results.

4.) There you have it, you can enjoy free APIs when you access this urls

/get/api/:name - where name = the search param. it will search items in your created database.
/get/poison/:search - where search = the search param. it will search items in the MAL API.


#```self notes```

run server @ Elixir/anime_fetcher && mix phoenix.server
check all routes @ mix phoenix.routes
migrate if you made changes in the model @ mix ecto.migrate

enter postgresql to windows
install postgresql
open pgadmin
login to the database

thru cmd
go to psql.exe inside PostgreSQL folder, usually found on C:/ProgramFiles/PostgreSQL
run
psql (database of anime, which is anime_fetcher_dev) postgres
enter password