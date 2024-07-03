const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
    try {
        const role = await Role.findOne({ name: "user" }).exec();
        if (!role) {
            return res.status(500).send({ message: "Role not found!" });
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            roles: [role._id],
            participationDate: new Date()
        });

        // Save the user
        await user.save();

        res.status(201).send({ message: "Registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    const checkPassword = (user) => {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send({message: "Incorrect password!"});
            return;
        }

        const token = jwt.sign( { id: user.id }
            , config.secret
            , { 
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 3600
            });
    
        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name);
        }
        //waiting for developing the role (like admin, moderator, student, etc.)

        res.status(200).send({
            id: user.id,
            username: user.username,
            roles: authorities,
            accessToken: token
        });
    }

    const findUser = async (usernameOrEmail) => {
        let user = await User.findOne({ username: usernameOrEmail }).populate("roles", "__v").exec();
        if (!user) {
          user = await User.findOne({ email: usernameOrEmail }).populate("roles", "__v").exec();
        }
        return user;
    };

    try {
        const user = await findUser(req.body.usernameOrEmail);
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        } 
        checkPassword(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}
