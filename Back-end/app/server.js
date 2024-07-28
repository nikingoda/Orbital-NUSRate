const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const data = require("../courseDetails.json");
const env = require("dotenv");
console.log(env);
env.config();
console.log(env);
const linkToMongo = process.env.mongoUrl;

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NUSRate." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/course.route")(app);
require("./routes/rate.route")(app);
require("./routes/ratings.route")(app);

// Endpoint to serve courses data
app.get("/api/course", (req, res) => {
  res.json(data);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const Role = db.role;
const Course = db.course;

const dbConfig = require("./config/db.config");

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount().exec();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("added 'admin' to roles collection");
    }

    const countCourse = await Course.estimatedDocumentCount().exec();
    if (countCourse === 0) {
      let d = app.get("https://api.nusmods.com/v2/2023-2024/moduleInfo.json");
      for (let i of data) {
        await new Course({
          courseCode: i.moduleCode,
          courseName: i.title,
          courseDescription: i.description,
          professors: [],
          courseCredit: i.moduleCredit,
          department: i.department,
          faculty: i.faculty,
          gradingBasisDescription: i.gradingBasisDescription,
        }).save();
      }
    }
    console.log("number of course: " + countCourse);
  } catch (err) {
    console.error("Error during initialization", err);
  }
}

db.mongoose
  .connect("mongodb+srv://ngoducanh6a01:ngoducanhNUSCS2327@cluster0.cnkccio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    initial();
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error!", err);
    process.exit();
  });

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
//   .then(() => {
//     initial();
//     console.log("Successfully connect to MongoDB.");
//   })
//   .catch((err) => {
//     console.error("Connection error!", err);
//     process.exit();
//   });
