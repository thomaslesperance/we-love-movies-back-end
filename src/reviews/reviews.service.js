const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

//

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function reformattedReview({ review_id }) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "*",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ review_id })
    .first()
    .then((r) => {
      return {
        review_id: r.review_id,
        content: r.content,
        score: r.score,
        created_at: r.created_at,
        updated_at: r.updated_at,
        critic_id: r.critic_id,
        movie_id: r.movie_id,
        critic: {
          critic_id: r.critic_id,
          preferred_name: r.preferred_name,
          surname: r.surname,
          organization_name: r.organization_name,
          created_at: r.critic_created_at,
          updated_at: r.critic_updated_at,
        },
      };
    });
}

function destroy(review_id) {
  return knex("reviews").select("*").where({ review_id }).del();
}

//

module.exports = {
  read,
  update,
  reformattedReview,
  destroy,
};
