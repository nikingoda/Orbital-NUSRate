import { useState } from "react";
import PropTypes from "prop-types";
import "./Component.css";

const urlRating = "http://localhost:5173/api/submitRating";
// const urlCourseCode="http://localhost:5173/api/moduleCode"

function Component({ courseModule }) {
  // const moduleCode = "CS3230";
  // const title = "Design and Analysis of Algorithms";
  // const professorNames = [
  //   "Prof. Diptarka Chakraborty",
  //   "Prof. Steven Halim",
  //   "Prof. Sanjay Jain",
  // ];
  // const courseDescription =
  //   "This course introduces different techniques of designing and analysing algorithms. Students will learn about the framework for algorithm analysis, for example, lower bound arguments, average case analysis, and the theory of NP-completeness. In addition, students are exposed to various algorithm design paradigms. The course serves two purposes: to improve the students' ability to design algorithms in different areas, and to prepare students for the study of more advanced algorithms. The course covers lower and upper bounds, recurrences, basic algorithm paradigms (such as prune-and-search, dynamic programming, branch-and-bound, graph traversal, and randomised approaches), amortized analysis, NP-completeness, and some selected advanced topics.";
  const { moduleCode, title, description } = courseModule;
  const [rating, setRating] = useState(0);

  const handleRate = async () => {
    const ratingData = { moduleCode, rating };
    try {
      const response = await fetch(urlRating, {
        method: "POST",
        headers: { "Course-Type": "application/json" },
        body: JSON.stringify(ratingData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Rating submitted successfully:", responseData);
        alert("Rating submitted successfully!");
      } else {
        console.error("Failed to submit rating:", response.statusText);
        alert("Failed to submit rating.");
      }
    } catch (error) {
      console.error("Error submitting rating: ", error);
      alert("Error submitting rating.");
    }
    console.log("Rating submitted:", rating);
  };

  return (
    <div className="course-card">
      <h2 className="course-code">{moduleCode}</h2>
      <h3 className="course-name">{title}</h3>
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
      <p className="course-description">{description}</p>
      <button className="rate-button" onClick={handleRate}>
        Rate
      </button>
    </div>
  );
}

Component.propTypes = {
  courseModule: PropTypes.shape({
    moduleCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Component;
