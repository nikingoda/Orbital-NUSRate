import { useState, useEffect } from "react";
import categoriesStyles from "./Categories.module.css";

const Categories = ({ categories, onRemoveCategory, onUpdateRating }) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const initialRatings = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});
    setRatings(initialRatings);
  }, [categories]);

  const handleRatingChange = (category, event) => {
    const nextValue = parseInt(event.target.value, 10);
    onUpdateRating(category, nextValue);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: nextValue,
    }));
  };

  return (
    <div className={categoriesStyles.categories}>
      {categories.map((category) => (
        <div key={category} className={categoriesStyles.category}>
          <h5>{category}</h5>
          <div className={categoriesStyles.ratingbar}>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={ratings[category]}
              onChange={(event) => handleRatingChange(category, event)}
              className={categoriesStyles.ratinginput}
            />
            <output>{ratings[category]}</output>
          </div>
          <button
            className={categoriesStyles.removecategory}
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
