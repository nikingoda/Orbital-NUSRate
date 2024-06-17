const express = require("express");
const cors = require("cors");
const data = require("./courseDetails.json");

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to NUSRate." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models"); 
const Role = db.role;
const Course = db.course;

const dbConfig = require("./app/config/db.config");

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
      for(let i of data) {
        await new Course( {
          courseCode: i.moduleCode,
          courseName: i.title,
          courseDescription: i.description,
          professors: [],
          courseCredit: i.moduleCredit,
          department: i.department,
          faculty: i.faculty,
          gradingBasisDescription: i.gradingBasisDescription
        }).save();
      }
    }
    console.log("number of course: " + countCourse);

  } catch (err) {
    console.error("Error during initialization", err);
  }
}

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    initial();
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error!", err)
    process.exit();
  });
