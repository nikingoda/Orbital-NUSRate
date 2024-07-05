const db = require("../models");
const Rate = db.rate;

exports.getAverageRating = async (req, res) => {
    try {
        const courseCode = req.query.courseCode;
        if(!courseCode) {
            res.status(404).send({message: "Course not found!"});
            // console.log(req.query.courseCode);
        } else {
            const result = await Rate.aggregate([
                {
                  $match: {
                    courseCode: courseCode
                  }
                },
                {
                  $group: {
                    _id: null,
                    averageCommonRating: { $avg: "$commonRating" },
                    averageDifficulty: { $avg: "$difficulty" },
                    averageUsefulness: { $avg: "$usefulness" },
                    averageWorkload: { $avg: "$workload" }
                  }
                }
             ]).exec();
             if(result.length > 0) {
              console.log(result[0]);
                res.status(200).send({
                  commonRating: result[0].averageCommonRating,
                  difficultyRating: result[0].averageDifficulty,
                  usefulnessRating: result[0].averageUsefulness,
                  workloadRating: result[0].averageWorkload
                })
             } else {
                res.status(200).send({
                    commonRating: undefined,
                    difficultyRating: undefined,
                    usefulnessRating: undefined,
                    workloadRating: undefined
                })
             }
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}