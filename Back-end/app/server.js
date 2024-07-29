const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const data = require("../courseDetails.json");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const linkToMongo = process.env.mongoUrl;
const frontEndDomain = process.env.frontEndDomain;
console.log(frontEndDomain);
console.log(linkToMongo);

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://orbital-nusrate-y0wt.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-access-token"],
  },
});

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

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const db = require("./models");
const Role = db.role;
const Course = db.course;
const Chat = db.chat;
const User = db.user;

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

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinChat', (chatCode) => {
      socket.join(chatCode);
      console.log(`Client joined chat ${chatCode}`);
    });
  
    socket.on('sendMessage', async ({ chatId, message }) => {
      try {
        //get the sender details
        const user = await User.findById(message.sender);
    
  
        const fullMessage = {
          ...message,
          sender: {
            _id: user._id,
            username: user.username
          }
        };
    
        // Save the message to the database
        const chat = await Chat.findById(chatId);
        chat.messages.push(fullMessage);
        await chat.save();
    
        // Emit the full message
        io.to(chatId).emit('message', fullMessage);
        io.emit('updateChatList');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
