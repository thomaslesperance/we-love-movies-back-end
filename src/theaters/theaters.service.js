const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("t.theater_id", {
  movie_id: ["movies", null, "m.movie_id"],
  title: ["movies", null, "m.title"],
  runtime_in_minutes: ["movies", null, "m.runtime_in_minutes"],
  rating: ["movies", null, "m.rating"],
  description: ["movies", null, "m.description"],
  image_url: ["movies", null, "m.image_url"],
  created_at: ["movies", null, "m.created_at"],
  updated_at: ["movies", null, "m.updated_at"],
  is_showing: ["movies", null, "mt.is_showing"],
  theater_id: ["movies", null, "mt.theater_id"],
});

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.*", "mt.is_showing", "mt.theater_id")
    .then(reduceMovies);
}

module.exports = list;
