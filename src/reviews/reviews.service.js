const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  const criticData = knex("critics as c")
    .select("c.*")
    .where({ "c.critic_id": updatedReview.critic_id })
    .first();

  return knex("reviews as r")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at as rev_created_at",
      "r.updated_at as rev_updated_at",
      "r.critic_id as rev_critic_id",
      "r.movie_id"
    )
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, [
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at as rev_created_at",
      "r.updated_at as rev_updated_at",
      "r.critic_id as rev_critic_id",
      "r.movie_id",
    ])
    .then((updatedRecords) => updatedRecords[0])
    .then((updatedRecord) => {
      const reviewAndCritic = { ...criticData, ...updatedRecord };
      return reviewAndCritic;
    })
    .then(addCritic)
    .then((formattedReview) => {
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
}

function destroy(review_id) {
  return knex("reviews").select("*").where({ review_id }).del();
}

//

module.exports = { read, update, destroy };
