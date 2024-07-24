import { useState } from "react";
import PropTypes from "prop-types";
import component from "./Component.module.css";
import { useNavigate } from "react-router-dom";

const urlRating = "https://orbital-nusrate.onrender.com/api/submitRating";

function Component({ course }) {
  const navigate = useNavigate();
  const { moduleCode, title, courseDescription } = course;
  const [rating, setRating] = useState(0);

  const handleRate = () => {
    // const ratingData = { moduleCode: moduleCode, rating };
    // try {
    //   const response = await fetch(urlRating, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(ratingData),
    //   });
    //   if (response.ok) {
    //     const responseData = await response.json();
    //     console.log("Rating submitted successfully:", responseData);
    //     alert("Rating submitted successfully!");
    //   } else {
    //     console.error("Failed to submit rating:", response.statusText);
    //     alert("Failed to submit rating.");
    //   }
    // } catch (error) {
    //   console.error("Error submitting rating: ", error);
    //   alert("Error submitting rating.");
    // }
    // console.log("Rating submitted:", rating);
    navigate("/rate/" + moduleCode);
  };
  const handleReadReview = () => {
    // change to Readpage
    navigate("/course/" + moduleCode);
  };

  return (
    <div className={component.coursecard}>
      <h2 className={component.coursecode}>{moduleCode}</h2>
      <h3 className={component.coursename}>{title}</h3>
      <div className={component.courserating}>
        {/* <span>Course Rating: </span>
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
        ))} */}
      </div>
      <p className={component.coursedescription}>{courseDescription}</p>
      <div className={component.buttons}>
        <button className={component.ratebutton} onClick={handleRate}>
          Review Course
        </button>
        <button
          className={component.readreviewbutton}
          onClick={handleReadReview}
        >
          Read Review
        </button>
      </div>
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
