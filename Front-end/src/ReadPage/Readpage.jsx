import { useState, useEffect } from "react";
import axios from "axios";
import "./ReadPage.css";

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ratings");
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="ratings-page">
      <h1>REVIEW RATINGS</h1>
      <div className="ratings-list">
        {ratings.map((rating, index) => (
          <div key={index} className="rating-item">
            <p>
              <strong>User:</strong> {rating.user}
            </p>
            <p>
              <strong>Course Code:</strong> {rating.courseCode}
            </p>
            <p>
              <strong>Rating:</strong> {rating.commonRating}
            </p>
            <p>
              <strong>Review:</strong> {rating.review}
            </p>
            <p>
              <strong>Categories:</strong> {rating.categories.join(", ")}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(rating.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingsPage;
