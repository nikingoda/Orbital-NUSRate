const mongoose = require('mongoose');

const Rate = mongoose.model(
    "Rate/Review",
    new mongoose.Schema({
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userName: String,
        courseCode: String,
        commonRating: Number,
        difficulty: Number,
        usefulness: Number,
        workload: Number,
        review: String,
        professorName: String,
        date: Date
    })
);

module.exports = Rate;