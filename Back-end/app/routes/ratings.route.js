const controller = require("../controllers/ratings.controller");
const averageRatingController = require("../controllers/getAverageRatings.controller").getAverageRating;

module.exports = app => {
    app.use((req, res, next) => {
      res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/ratings", controller.ratings);

    app.get("/api/averageRating", averageRatingController);
}