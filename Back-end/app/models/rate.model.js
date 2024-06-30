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
        courseCode: String,
        commonRating: Number,
        difficulty: Number,
        usefulness: Number,
        workload: Number,
        review: String,
        date: Date
    })
);

module.exports = Rate;