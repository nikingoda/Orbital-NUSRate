import { useState } from "react";
import PropTypes from "prop-types";
import "./Component.css";

const urlRating = "http://localhost:5173/api/submitRating";
// const urlCourseCode="http://localhost:5173/api/moduleCode"

function Component({ course }) {
  // const { moduleCode, title, description } = course;
  const moduleCode = course.courseCode;
  const title = course.courseName;
  const description = course.courseDescription;
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
