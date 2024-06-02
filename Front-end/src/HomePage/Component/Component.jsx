import { useState } from "react";
import "./Component.css";

function Component() {
  const courseCode = "CS3230";
  const courseName = "Design and Analysis of Algorithms";
  const professorNames = [
    "Prof. Diptarka Chakraborty",
    "Prof. Steven Halim",
    "Prof. Sanjay Jain",
  ];
  const courseDescription =
    "This course introduces different techniques of designing and analysing algorithms. Students will learn about the framework for algorithm analysis, for example, lower bound arguments, average case analysis, and the theory of NP-completeness. In addition, students are exposed to various algorithm design paradigms. The course serves two purposes: to improve the students' ability to design algorithms in different areas, and to prepare students for the study of more advanced algorithms. The course covers lower and upper bounds, recurrences, basic algorithm paradigms (such as prune-and-search, dynamic programming, branch-and-bound, graph traversal, and randomised approaches), amortized analysis, NP-completeness, and some selected advanced topics.";

  const [rating, setRating] = useState(0);

  const handleRate = () => {
    // Logic to handle rating submission
    console.log("Rating submitted:", rating);
  };

  return (
    <div className="course-card">
      <h2 className="course-code">{courseCode}</h2>
      <h3 className="course-name">{courseName}</h3>
      <div className="professor-names">
        {professorNames.map((professor, index) => (
          <h4 key={index} className="professor-name">
            {professor}
          </h4>
        ))}
      </div>
      <div className="course-rating">
        <span>Course Rating: </span>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={star <= rating ? "star-filled" : "star-empty"}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p className="course-description">{courseDescription}</p>
      <button className="rate-button" onClick={handleRate}>
        Rate
      </button>
    </div>
  );
}

export default Component;
