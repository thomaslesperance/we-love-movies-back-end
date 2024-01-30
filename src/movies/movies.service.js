const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function readMovies(movie_id) {
  return knex("movies as m")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ movie_id })
    .first();
}

function readTheaters(movie_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at",
      "mt.is_showing",
      "m.movie_id"
    )
    .where({ "m.movie_id": movie_id });
}

function readReviews(movie_id) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at as rev_created_at",
      "r.updated_at as rev_updated_at",
      "r.critic_id as rev_critic_id",
      "r.movie_id",
      "c.*"
    )
    .where({ "m.movie_id": movie_id })
    .then((initialArray) => initialArray.map(addCritic))
    .then((formattedArray) => {
      return formattedArray.map((formattedReview) => {
        const {
          review_id,
          content,
          score,
          movie_id,
          rev_created_at,
          rev_updated_at,
          critic: { critic_id },
        } = formattedReview;
        const { critic } = formattedReview;
        const finalReview = {
          review_id,
          content,
          score,
          movie_id,
          created_at: rev_created_at,
          updated_at: rev_updated_at,
          critic_id,
          critic,
        };
        return finalReview;
      });
    });
}

function list(is_showing = false) {
  if (is_showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
      )
      .where({ "mt.is_showing": true });
  } else {
    return knex("movies").select(
      "movie_id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    );
  }
}

module.exports = {
  readMovies,
  readTheaters,
  readReviews,
  list,
};
