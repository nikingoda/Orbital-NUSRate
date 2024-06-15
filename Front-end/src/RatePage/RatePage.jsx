import { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Categories from "./Categories/Categories";
import "./RatePage.css";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://localhost:8080";
const RatePage = () => {
  const param = useParams();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(!loginInfo) {
        window.alert("Please login again!");
        navigate('/login');
      } else {
        const user = loginInfo.userID;
        const res = await fetch(url + "/api/rate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: user, commonRating, review, selectedCategory, categories, date
          })
        });
  
        const data = await res.json();
        if(res.status === 201) {
          window.alert("Rate and review submitted successfully!");
          navigate("/");
        } else {
          window.alert(data.message);
        }
      }
    } catch (err) {
      throw new Error('There has been a problem with your fetch operation:', err);
    }
  };

  // TEST INFORMATION
  const courseCode = param.courseCode;
  let courseName;
  let professorNames;
  let courseDescription;
  try {
    const course = fetch(url + "/api/course", {
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }).then(res => {
      if(res.status === 200) {
        return res.json();
      }
      return undefined;
    })

    if(course === undefined) {
      window.alert("Course not found!");
      navigate("/");
      return;
    }
    courseName = course.title;
    professorNames = param.professorNames;
    courseDescription = param.courseDescription;
  } catch (err) {
    throw new Error('There has been a problem with your fetch operation (Course finding):', err);
  }

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
