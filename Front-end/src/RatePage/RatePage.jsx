import { useEffect, useState } from "react";
import StarRatingComponent from "react-rating-stars-component";
import Categories from "./Categories/Categories";
import ratepageStyles from "./RatePage.module.css";
import { Await, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { CiHeart } from "react-icons/ci";
// import { course } from "../../../Back-end/app/models";

const url = "http://localhost:8080";
const RatePage = () => {
  const { courseCode } = useParams();
  // const [courseName, setCourseName] = useState(null);
  // const [professorNames, setProfessorNames] = useState(null);
  // const [courseDescription, setCourseDescription] = useState(null);
  const [storedRatings, setStoredRatings] = useState({
    Difficulty: 0,
    Usefulness: 0,
    Workload: 0,
  });
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [commonRating, setCommonRating] = useState(null);
  const [review, setReview] = useState(null);
  const [professorName, setProfessorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const loginInfo = localStorage.getItem("loginInfo");
  const date = new Date();

  const handleRatingChange = (event) => {
    setCommonRating(parseInt(event.target.value, 10));
  };
  const handleProfessorChange = (event) => {
    setProfessorName(event.target.value);
  };
  const handleCommentChange = (event) => {
    setReview(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFavourite = () => {
    setFavourite(!favourite);
  };

  const handleAddCategory = () => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  const handleUpdateRating = (category, rating) => {
    setStoredRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!loginInfo) {
        window.alert("Please login again!");
        navigate("/login");
      } else {
        const user = JSON.parse(loginInfo).userID;
        const userName = JSON.parse(loginInfo).username;
        const res = await fetch(url + "/api/rate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            courseCode,
            userName,
            commonRating,
            review,
            categoryRatings: storedRatings,
            professorName,
            date,
          }),
        });

        const data = await res.json();
        if (res.status === 201) {
          window.alert("Rate and review submitted successfully!");
          navigate("/");
        } else {
          window.alert(data.message);
        }
      }
    } catch (err) {
      throw new Error(
        "There has been a problem with your fetch operation:",
        err
      );
    }
  };

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (course) {
    console.log("Course data:", course);
  } else {
    console.log("Course not found!");
    // navigate("/");
    return <div></div>;
  }

  // const professorNames = course.professors;
  const courseName = course.courseName;
  const courseDescription = course.courseDescription;

  return (
    <div className={ratepageStyles.ratepage}>
      <NavBar />
      <h1>RATE COURSE</h1>
      <div className={ratepageStyles.courseinformation}>
        <h2 className={ratepageStyles.coursecode}>{courseCode}</h2>
        <h3 className={ratepageStyles.coursename}>{courseName}</h3>
        {/* <span className={ratepageStyles.professornames}>
          {professorNames.map((professor, index) => (
            <h4 key={index} className={ratepageStyles.professorname}>
              {professor}
            </h4>
          ))}
        </span> */}
        <p className={ratepageStyles.coursedescription}>{courseDescription}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={ratepageStyles.ratingbar}>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={commonRating}
            onChange={handleRatingChange}
            className={ratepageStyles.ratinginput}
          />
          <output>{commonRating}</output>
        </div>
        <textarea
          placeholder="Professor Name"
          value={professorName}
          onChange={handleProfessorChange}
          className={ratepageStyles.profname}
        />
        <div className={ratepageStyles.commentfield}>
          <textarea
            placeholder="Comment"
            value={review}
            onChange={handleCommentChange}
          />
        </div>

        <div className="">
          <select
            className={ratepageStyles.formselect}
            aria-label="Default select example"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Optional Categories</option>
            <option value="Difficulty">Difficulty</option>
            <option value="Usefulness">Usefulness</option>
            <option value="Workload">Workload (hrs)</option>
          </select>
          <button
            type="button"
            className={ratepageStyles.addcategories}
            onClick={handleAddCategory}
          >
            ADD CATEGORIES
          </button>
          <Categories
            categories={categories}
            onUpdateRating={handleUpdateRating}
            onRemoveCategory={handleRemoveCategory}
          />
        </div>

        {/* <input
          type="checkbox"
          className={ratepageStyles.btncheck}
          id="btn-check-outlined"
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">
          FAVORITE COURSE
        </label> */}
        <div>
          <button
            className={ratepageStyles.fav}
            type="button"
            onClick={handleFavourite}
          >
            <CiHeart
              className={
                favourite
                  ? ratepageStyles.CiHeartActive
                  : ratepageStyles.CiHeart
              }
            />
          </button>
          <label>FAVORITE COURSE</label>
        </div>

        <button
          className={ratepageStyles.submit}
          type="submit"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default RatePage;
