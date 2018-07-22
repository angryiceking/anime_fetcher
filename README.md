# AnimeFetcher

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
