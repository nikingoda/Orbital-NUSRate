import { useState, useEffect } from "react";
import StarRatingComponent from "react-rating-stars-component";
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

  const handleRatingChange = (category, nextValue) => {
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
          <StarRatingComponent
            name={`${category}Rating`}
            starCount={5}
            value={ratings[category]}
            onStarClick={(nextValue) => handleRatingChange(category, nextValue)}
          />
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
