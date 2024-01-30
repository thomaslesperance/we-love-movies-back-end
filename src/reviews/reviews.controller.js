const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//

async function reviewExists(req, res) {
  const response = await service.read(req.params.reviewId);
  if (response) {
    res.locals.review = response;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

//

async function destroy(req, res) {
  await service.destroy(res.locals.review.reviewId);
  res.sendStatus(204);
}

//

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
