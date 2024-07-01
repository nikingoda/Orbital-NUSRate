import { useState, useEffect } from "react";
import axios from "axios";
import readpageStyles from "./ReadPage.module.css";
import StarRatingComponent from "react-rating-stars-component";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";

const url = "http://localhost:8080";
const ReadPage = () => {
  const { courseCode } = useParams();
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${url}/api/ratings?courseCode=${courseCode}`);
        setRatings(response.data.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError("Failed to fetch ratings. Please try again later.");
      }
    };

    fetchRatings();
  }, []);

  console.log(ratings);

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
              <strong>User:</strong> nikingoda
            </p>
            <p>
              <strong>Course Code:</strong> {rating.courseCode}
            </p>
            <p>
              <strong>Professor: </strong> {rating.professor}
            </p>
            <p>
              <strong>Rating:</strong> {rating.commonRating}
            </p>
            <p>
              <strong>Review:</strong> {rating.review}
            </p>
            {/* <div>
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
            </div> */}
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
