const controller = require("../controllers/course.controller");

module.exports = app => {
    app.use((req, res, next) => {
      res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/getCourse", controller.course);
}