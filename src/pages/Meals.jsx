import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardComponent from "../components/Card";
import LoadingSpinner from "../components/loader";

const Meals = () => {
  // Get the category from the URL parameters
  const { category } = useParams();
  // State to store meals
  const [meals, setMeals] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Fetch meals from the API whenever the category changes
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        // Set the fetched meals to state
        setMeals(response.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
      setLoading(false);
    })();
  }, [category]);

  return (
    <>
      {loading ? (
        // Display loading spinner if loading
        <LoadingSpinner loadingText={"Loading..."} />
      ) : (
        <div className="container mx-auto p-4 relative">
          {/* Header section with back link and category title */}
          <div className="flex items-center justify-between mb-4 bg-gray-600 p-2 sticky top-0 z-20">
            <Link to="/menu" className="text-white">
              &larr; Back
            </Link>
            <h1 className="text-3xl text-center font-bold text-white">
              {category} Meals
            </h1>
            <div></div>
          </div>

          {/* Grid of meal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {meals.map((meal) => (
              <div key={meal.idMeal}>
                <CardComponent meal={{ ...meal, strCategory: category }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Meals;
