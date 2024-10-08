import { useState, useEffect } from "react";
import axios from "axios";
import readpageStyles from "./ReadPage.module.css";
import StarRatingComponent from "react-rating-stars-component";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { FaRegGrinHearts } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

const url = "https://orbital-nusrate.onrender.com";
const devurl = "http://localhost:8080";
const ReadPage = () => {
  const { courseCode } = useParams();
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [commonRating, setCommonRating] = useState(undefined);
  const [difficultyRating, setDifficultyRating] = useState(undefined);
  const [usefullnessRating, setUsefullnessRating] = useState(undefined);
  const [workloadRating, setWorkloadRating] = useState(undefined);
  const [favourite, setFavourite] = useState(0);

  const fetchCourse = async (url, courseCode) => {
    try {
      const response = await fetch(
        `${url}/api/getCourse?courseCode=${courseCode}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Course found!");
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch course:" + response.statusText);
        return undefined;
      }
    } catch (error) {
      console.error(
        "There was an error with the fetch operation:" + error.message
      );
      return undefined;
    }
  };

  const fetchAverageRating = async (url, courseCode) => {
    try {
      const response = await fetch(
        `${url}/api/averageRating?courseCode=${courseCode}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Course found!");
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch course:" + response.statusText);
        return undefined;
      }
    } catch (error) {
      console.error(
        "There was an error with the fetch operation:" + error.message
      );
      return undefined;
    }
  };

  const fetchFavourite = async (url, courseCode) => {
    try {
      const response = await fetch(
        `${url}/api/getFavourite?courseCode=${courseCode}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Course found!");
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch course:" + response.statusText);
        return undefined;
      }
    } catch (error) {
      console.error(
        "There was an error with the fetch operation:" + error.message
      );
      return undefined;
    }
  };

  useEffect(() => {
    fetchCourse(url, courseCode)
      .then((data) => {
        if (data) {
          console.log("Course data:", data);
          setCourse(data);
        } else {
          console.log("No course data found");
        }
      })
      .catch((error) => {
        console.error("Error getting course data:", error);
        setError(error);
      });
  }, [url, courseCode]);

  useEffect(() => {
    fetchAverageRating(url, courseCode)
      .then((data) => {
        if (data) {
          console.log("Course data:", data);
          setCommonRating(data.commonRating);
          setDifficultyRating(data.difficultyRating);
          setUsefullnessRating(data.usefulnessRating);
          setWorkloadRating(data.workloadRating);
        } else {
          console.log("No course data found");
        }
      })
      .catch((error) => {
        console.error("Error getting course data:", error);
        setError(error);
      });
    
    fetchFavourite(url, courseCode)
      .then((data) => {
        if (data) {
          console.log("Fav data: ", data);
          setFavourite(data.favourite);
        } else {
          console.log("No course fav found")
        }
      })
      .catch((err) => {
        console.error("Error getting course fav data:", err);
        setError(err);
      });
  }, [url, courseCode]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `${url}/api/ratings?courseCode=${courseCode}`
        );
        setRatings(response.data.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError("Failed to fetch ratings. Please try again later.");
      }
    };

    fetchRatings();
  }, [courseCode]);
  const handleLike = async (ratingId) => {
    try {
      await axios.post(`${url}/api/likeRating`, { ratingId });
      // Replace ...
      setRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating._id === ratingId
            ? { ...rating, likes: rating.likes + 1 }
            : rating
        )
      );
    } catch (error) {
      console.error("Error liking rating:", error);
    }
  };

  const handleDislike = async (ratingId) => {
    try {
      await axios.post(`${url}/api/dislikeRating`, { ratingId });
      // Replace ...
      setRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating._id === ratingId
            ? { ...rating, dislikes: rating.dislikes + 1 }
            : rating
        )
      );
    } catch (error) {
      console.error("Error disliking rating:", error);
    }
  };
  const courseName = course ? course.courseName : "";
  const courseDescription = course ? course.courseDescription : "";

  if (error) {
    return <div className={readpageStyles.error}>{error}</div>;
  }

  return (
    <div className={readpageStyles.ratingspage}>
      <NavBar />
      <h1>
        <strong>REVIEW RATINGS</strong>
      </h1>
      <div className={readpageStyles.coursedetails}>
        <h2>{courseCode}</h2>
        <h3>{courseName}</h3>
        <p>{courseDescription}</p>
      </div>
      <p>
        <div className={readpageStyles.ratingbar}>
          <strong>Average Overall Rating: </strong>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={commonRating === undefined ? 0 : commonRating}
            className={readpageStyles.ratinginput}
          />
          <output>
            {commonRating === undefined ? "No data" : commonRating}
          </output>
        </div>

        <div className={readpageStyles.ratingbar}>
          <strong>Average Difficulty Rating: </strong>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={
              difficultyRating === null || difficultyRating === undefined
                ? 0
                : difficultyRating
            }
            className={readpageStyles.ratinginput}
          />
          <output>
            {difficultyRating === null || difficultyRating === undefined
              ? "No data"
              : difficultyRating}
          </output>
        </div>

        <div className={readpageStyles.ratingbar}>
          <strong>Average Usefullness Rating: </strong>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={usefullnessRating === undefined ? 0 : usefullnessRating}
            className={readpageStyles.ratinginput}
          />
          <output>
            {usefullnessRating === undefined ? "No data" : usefullnessRating}
          </output>
        </div>

        <div className={readpageStyles.ratingbar}>
          <strong>Average workload(hours): </strong>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={
              workloadRating === null || workloadRating === undefined
                ? 0
                : workloadRating
            }
            className={readpageStyles.ratinginput}
          />
          <output>
            {workloadRating === null || workloadRating === undefined
              ? "No data"
              : workloadRating}
          </output>
        </div>
        <div className={readpageStyles.ratingbar}>
          {/* Replace 0 with variable */}
          <strong>There are </strong>{" "}
          <strong className={readpageStyles.numberlove}>{favourite}</strong>
          <strong> people love this course </strong>
          <FaRegGrinHearts />
          <span>{readpageStyles.favoriteCount}</span>
        </div>
      </p>
      <div className={readpageStyles.ratingslist}>
        {ratings.map((rating, index) => (
          <div key={index} className={readpageStyles.ratingitem}>
            <p className={readpageStyles.usernamestyle}>
              <strong></strong> {rating.userName}
            </p>
            <p>
              <strong>Professor: </strong> {rating.professorName}
            </p>
            {/* Overall Rating */}
            <p>
              <div className={readpageStyles.ratingbar}>
                <strong>Overall Rating: </strong>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={rating.commonRating}
                  className={readpageStyles.ratinginput}
                />
                <output>{rating.commonRating}</output>
              </div>
            </p>

            {/* Difficulty Rating */}
            <p>
              <div className={readpageStyles.ratingbar}>
                <strong>Difficulty Rating: </strong>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={
                    rating.difficulty === undefined ? 0 : rating.difficulty
                  }
                  className={readpageStyles.ratinginput}
                />
                <output>
                  {rating.difficulty === undefined
                    ? "No rating"
                    : rating.difficulty}
                </output>
              </div>
            </p>

            {/* Usefullness Rating */}
            <p>
              <div className={readpageStyles.ratingbar}>
                <strong>Usefullness Rating: </strong>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={
                    rating.usefulness === undefined ? 0 : rating.usefulness
                  }
                  className={readpageStyles.ratinginput}
                />
                <output>
                  {rating.usefulness === undefined
                    ? "No rating"
                    : rating.usefulness}
                </output>
              </div>
            </p>

            {/* Workload Rating */}
            <p>
              <div className={readpageStyles.ratingbar}>
                <strong>Workload(hours) Rating: </strong>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={rating.workload === undefined ? 0 : rating.workload}
                  className={readpageStyles.ratinginput}
                />
                <output>
                  {rating.workload === undefined
                    ? "No rating"
                    : rating.workload}
                </output>
              </div>
            </p>
            <p>
              <strong></strong> {rating.review}
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
            {/* <div className={readpageStyles.ratingactions}>
              <button
                onClick={() => handleLike(rating._id)}
                className={readpageStyles.likebutton}
              >
                <span>{rating.likes}</span> <AiFillLike />
              </button>
              <button
                onClick={() => handleDislike(rating._id)}
                className={readpageStyles.dislikebutton}
              >
                <span>{rating.dislikes}</span> <AiFillDislike />
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadPage;
