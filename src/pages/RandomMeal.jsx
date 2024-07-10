import axios from "axios";
import React, { useEffect, useState } from "react";
import { RefreshCw } from "react-feather";
import CardComponent from "../components/Card";

const RandomMeal = ({ toggleFavorite, favorites }) => {
  // State to store the meal data
  const [meal, setMeal] = useState(null);
  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Function to fetch a random meal
  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      // If the meal category is "Beef", fetch another random meal
      if (response.data.meals[0]?.strCategory === "Beef") {
        fetchRandomMeal();
      } else {
        setMeal(response.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
    setLoading(false);
  };

  // Fetch a random meal on component mount
  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div
      className="flex justify-center flex-col items-center container mx-auto p-5"
      style={{ minHeight: "90%" }}
    >
      {/* Title */}
      <div className="text-3xl text-center font-bold text-white">
        Random Meal Generator
      </div>

      {/* Display the meal if it exists */}
      {meal && <CardComponent meal={meal} />}

      {/* Button to fetch a new random meal */}
      <div>
        <button
          onClick={fetchRandomMeal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-3xl"
        >
          {loading ? (
            <span className="flex">
              <RefreshCw className="animate-spin h-5 w-5 mr-3" />
              Generate...
            </span>
          ) : (
            <span>Generate</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RandomMeal;
