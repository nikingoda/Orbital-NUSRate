import { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import "./Categories.css";

const Categories = (categories, onRemoveCategory) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const initialRatings = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});
    setRatings(initialRatings);
  }, [categories]);

  const handleRatingChange = (category, nextValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: nextValue,
    }));
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <div key={category} className="category">
          <h5>{category}</h5>
          <StarRatingComponent
            name={`${category}Rating`}
            starCount={5}
            value={ratings[category]}
            onStarClick={(nextValue) => handleRatingChange(category, nextValue)}
          />
          <button
            className="remove-category"
            onClick={() => onRemoveCategory(category)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;


