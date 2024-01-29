const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//
//Route handlers

async function list(req, res, next) {
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
