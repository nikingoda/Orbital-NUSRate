const db = require("../models");
const Rate = db.rate;

exports.ratings = async (req, res) => {
    try {
        const data = await Rate.find({courseCode: req.query.courseCode}).exec();
        res.status(200).send({data: data});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}