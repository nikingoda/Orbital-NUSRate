import { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Categories from "./Categories/Categories";
import "./RatePage.css";
import { Await, useNavigate, useParams } from "react-router-dom";
// import { course } from "../../../Back-end/app/models";

const url = "http://localhost:8080";
const RatePage = () => {
  const { courseCode } = useParams();
  // const [courseName, setCourseName] = useState(null);
  // const [professorNames, setProfessorNames] = useState(null);
  // const [courseDescription, setCourseDescription] = useState(null);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [commonRating, setCommonRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const loginInfo = localStorage.getItem("loginInfo");
  const date = new Date();

  const handleRatingChange = (nextValue) => {
    setCommonRating(nextValue);
  };

  const handleCommentChange = (event) => {
    setReview(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
        const res = await fetch(url + "/api/rate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            commonRating,
            review,
            selectedCategory,
            categories,
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
      const response = await fetch(`${url}/api/getCourse?courseCode=${courseCode}`, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
  
      if (response.status === 200) {
        console.log('Course found!');
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch course:' + response.statusText);
        return undefined;
      }
    } catch (error) {
      console.error('There was an error with the fetch operation:' + error.message);
      return undefined;
    }
  };

  useEffect(() => {
    fetchCourse(url, courseCode)
      .then(data => {
        if (data) {
          console.log('Course data:', data);
          setCourse(data);
        } else {
          console.log('No course data found');
        }
      })
      .catch(error => {
        console.error('Error getting course data:', error);
        setError(error);
      });
  }, [url, courseCode]);

  // useEffect(() => {
  //   if (course) {
  //     setCourseName(course.courseName);
  //     setCourseDescription(course.courseDescription);
  //     setProfessorNames(course.professors);
  //   }
  // }, [course]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  if(course) {
    console.log('Course data:', course);
  } else {
    console.log("Course not found!");
    // navigate("/");
    return <div></div>;
  }
  
  const professorNames = course.professors;
  const courseName = course.courseName;
  const courseDescription = course.courseDescription;

  return (
    <div className="rate-page">
      <h1>RATE COURSE</h1>
      <div className="course-information">
        <h2 className="course-code">{courseCode}</h2>
        <h3 className="course-name">{courseName}</h3>
        <span className="professor-names">
          {professorNames.map((professor, index) => (
            <h4 key={index} className="professor-name">
              {professor}
            </h4>
          ))}
        </span>
        <p className="course-description">{courseDescription}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          <StarRatingComponent
            name="courseRating"
            starCount={5}
            value={commonRating}
            onStarClick={handleRatingChange}
          />
        </div>
        <div className="comment-field">
          <textarea
            placeholder="Comment"
            value={review}
            onChange={handleCommentChange}
          />
        </div>

        <div className="">
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Optional Categories</option>
            <option value="Difficulty">Difficulty</option>
            <option value="Usefulness">Usefulness</option>
            <option value="Workload">Workload</option>
          </select>
          <button
            type="button"
            className="add-categories"
            onClick={handleAddCategory}
          >
            ADD CATEGORIES
          </button>
          <Categories
            categories={categories}
            // onUpdateRating={handleUpdateRating}
            onRemoveCategory={handleRemoveCategory}
          />
        </div>

        <input
          type="checkbox"
          className="btn-check"
          id="btn-check-outlined"
          autoComplete="off"
        />
        <label className="btn btn-outline-primary" htmlFor="btn-check-outlined">
          FAVORITE COURSE
        </label>

        <button className="submit" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default RatePage;
