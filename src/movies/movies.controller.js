const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//
//Middleware

async function movieExists(req, res, next) {
  const movie = await service.readMovies(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

//
//Route handlers

async function readMovies(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters(req, res) {
  const data = await service.readTheaters(req.params.movieId);
  res.json({ data });
}

async function readReviews(req, res) {
  const data = await service.readReviews(req.params.movieId);
  res.json({ data });
}

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({ data });
}

module.exports = {
  readMovies: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovies)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
  list: asyncErrorBoundary(list),
};
