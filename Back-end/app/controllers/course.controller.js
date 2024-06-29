const db = require("../models");
const Course = db.course;

exports.course = async (req, res) => {
    try {
        const course = await Course.findOne({courseCode: req.query.courseCode}).exec();
        if(!course) {
            res.status(404).send({message: "Course not found!"});
            console.log(req.query.courseCode);
        } else {
            res.status(200).send({
                message: "Course found!", 
                courseCode: course.courseCode, 
                courseName: course.courseName, 
                courseDescription: course.courseDescription,
                courseCredit: course.courseCredit,
                professors: course.professors,
                department: course.department,
                faculty: course.faculty,
                gradingBasisDescription: course.gradingBasisDescription
            });
        }
    } catch (err) {
        res.status(500).send({message: err});
    }
}
