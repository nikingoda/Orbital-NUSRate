const db = require("../models");
// const ROLES = db.ROLES;
const User = db.user;

async function checkValidNameOrEmail(req, res, next) {
    try {
        // Check if the email has a valid NUS domain
        if (!checkValidEmail(req.body.email)) {
          return res.status(400).send({ message: "Register failed! Email must end with @u.nus.edu" });
        }
    
        // Check if username is already in use
        let user = await User.findOne({ username: req.body.username }).exec();
        if (user) {
          return res.status(400).send({ message: "Register failed! Username is already in use!" });
        }
    
        // Check if email is already in use
        user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
          return res.status(400).send({ message: "Register failed! Email is already in use!" });
        }
    
        // Proceed to the next middleware/function
        next();
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
}

function checkValidPassword(req, res, next) {
    const password = req.body.password;
    const passwordAgain = req.body.passwordAgain;
    if(password.length < 8 && !/[0-9]/.test(password) && !/[a-z]/.test(password)) {
        res.status(400).send({message: "Register failed! Password must contain a number and a letter and at least 8 characters."});
        return;
    }

    if(password !== passwordAgain) {
        res.status(400).send({message: "Register failed! Your password confirm does not match."})
        return;
    }
    next();
}

function checkValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@u\.nus\.edu$/;
  return emailRegex.test(email);
}

const verifySignUp = {checkValidNameOrEmail, checkValidPassword};
module.exports = verifySignUp;