import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Categories from "./Categories/Categories";
import "./RatePage.css";

const RatePage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleRatingChange = (nextValue) => {
    setRating(nextValue);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // TEST INFORMATION
  const courseCode = "CS3230";
  const courseName = "Design and Analysis of Algorithms";
  const professorNames = [
    "Prof. Diptarka Chakraborty",
    "Prof. Steven Halim",
    "Prof. Sanjay Jain",
  ];
  const courseDescription =
    "This course introduces different techniques of designing and analysing algorithms. Students will learn about the framework for algorithm analysis, for example, lower bound arguments, average case analysis, and the theory of NP-completeness. In addition, students are exposed to various algorithm design paradigms. The course serves two purposes: to improve the students' ability to design algorithms in different areas, and to prepare students for the study of more advanced algorithms. The course covers lower and upper bounds, recurrences, basic algorithm paradigms (such as prune-and-search, dynamic programming, branch-and-bound, graph traversal, and randomised approaches), amortized analysis, NP-completeness, and some selected advanced topics.";

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
            value={rating}
            onStarClick={handleRatingChange}
          />
        </div>
        <div className="comment-field">
          <textarea
            placeholder="Comment"
            value={comment}
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
