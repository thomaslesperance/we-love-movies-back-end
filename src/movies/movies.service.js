const knex = require("../db/connection");

function list() {
  return knex("movies")
    .select("*")
    .then((movieArray) => {
      return movieArray.map(
        ({ id, title, runtime_in_minutes, rating, description, image_url }) => {
          const reformattedMovieObject = {
            id,
            title,
            runtime_in_minutes,
            rating,
            description,
            image_url,
          };
          return reformattedMovieObject;
        }
      );
    });
}

module.exports = {
  list,
};
