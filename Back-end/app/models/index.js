const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.rate = require("./rate.model");
db.course = require("./course.model");
db.chat = require("./chat.model");
db.message = require("./message.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;