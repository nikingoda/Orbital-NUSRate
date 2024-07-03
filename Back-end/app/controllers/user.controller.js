const db = require("../models");
const User = db.user;
const Rate = db.rate;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.query.username}).exec();
        if(!user) {
            res.status(404).send({message: "User not found!"});
        } else {
            const ratings = await Rate.find({user: user._id});
            res.status(200).send({
                userID: user._id,
                ratings: ratings,
                participationDate: user.participationDate
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}