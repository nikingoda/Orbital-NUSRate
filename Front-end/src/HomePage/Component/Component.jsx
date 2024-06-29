import { useState } from "react";
import PropTypes from "prop-types";
import component from "./Component.module.css";

const urlRating = "http://localhost:5173/api/submitRating";

function Component({ course }) {
  const { courseCode, courseName, courseDescription } = course;
  const [rating, setRating] = useState(0);

  const handleRate = async () => {
    const ratingData = { moduleCode: courseCode, rating };
    try {
      const response = await fetch(urlRating, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className={component.coursecard}>
      <h2 className={component.coursecode}>{courseCode}</h2>
      <h3 className={component.coursename}>{courseName}</h3>
      <div className={component.courserating}>
        <span>Course Rating: </span>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            className={
              star <= rating ? component.starfilled : component.starempty
            }
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p className={component.coursedescription}>{courseDescription}</p>
      <button className={component.ratebutton} onClick={handleRate}>
        Rate
      </button>
    </div>
  );
}

Component.propTypes = {
  course: PropTypes.shape({
    courseCode: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
    courseDescription: PropTypes.string.isRequired,
  }).isRequired,
};

export default Component;
