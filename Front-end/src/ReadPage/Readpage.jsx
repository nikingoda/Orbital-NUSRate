import { useState, useEffect } from "react";
import axios from "axios";
import readpageStyles from "./ReadPage.module.css";
import StarRatingComponent from "react-star-rating-component";
import NavBar from "../NavBar/NavBar";

const ReadPage = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ratings");
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError("Failed to fetch ratings. Please try again later.");
      }
    };

    fetchRatings();
  }, []);

  if (error) {
    return <div className={readpageStyles.error}>{error}</div>;
  }

  return (
    <div className={readpageStyles.ratingspage}>
      <NavBar />
      <h1>REVIEW RATINGS</h1>
      <div className={readpageStyles.ratingslist}>
        {ratings.map((rating, index) => (
          <div key={index} className={readpageStyles.ratingitem}>
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
            <div>
              <strong>Categories:</strong>
              {Object.keys(rating.categoryRatings).map((category) => (
                <div key={category} className={readpageStyles.categoryRating}>
                  <p>{category}:</p>
                  <StarRatingComponent
                    name={`${category}Rating`}
                    starCount={5}
                    value={rating.categoryRatings[category]}
                    editing={false}
                  />
                </div>
              ))}
            </div>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(rating.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Favorite Count:</strong> {rating.favoriteCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadPage;
