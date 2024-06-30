const db = require("../models");
const Rate = db.rate;

exports.rate = async (req, res) => {
    try {
        if (!req.body.user && !req.body.product && req.body.commomRating == null && req.body.review == null) {
            return res.status(400).send({ message: "Content cannot be empty!" });
        }

        const user = req.body.user;
        const course = req.body.course;

        await Rate.deleteMany({user, course});

        const rate = new Rate({
            course: req.body.course,
            user: req.body.user,
            commonRating: req.body.commonRating,
            courseCode: req.body.courseCode,
            // usefulness: req.body.usefulness,
            // difficulty: req.body.difficulty,
            // workload: req.body.workload,
            review: req.body.review,
            date: req.body.date
        });

        const difficulty = req.body.categoryRatings.Difficulty;
        const workload = req.body.categoryRatings.Workload;
        const usefulness = req.body.categoryRatings.Usefulness;

        if(difficulty !== 0) {
            rate.difficulty = difficulty;
        }

        if(workload !== 0) {
            rate.workload = workload;
        }

        if(usefulness !== 0) {
            rate.usefulness = usefulness;
        }
        
        //submit rate and review categories like: difficulty, usefulness, workload, review. 
        //Also save information like date, user and course

        await rate.save();

        res.status(201).send({message: "Review submitted successfully!"})
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}