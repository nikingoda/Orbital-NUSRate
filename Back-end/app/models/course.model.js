const mongoose = require('mongoose');

const Course = mongoose.model(
    "Course",
    new mongoose.Schema({
        courseCode: String,
        courseName: String,
        courseDescription: String,
        professors: [{
            type: String,
            ref: "professors"
        }],
        courseCredit: Number,
        department: String,
        faculty: String,
        gradingBasisDescription: String
    })
);

module.exports = Course;