import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loader";

const Menu = () => {
  // State to store categories
  const [categories, setCategories] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Fetch categories from the API
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        // Filter out "Beef" category
        setCategories(
          response.data.categories.filter((item) => item.strCategory !== "Beef")
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Page title */}
      <h1 className="text-3xl text-center font-bold text-white">Menu</h1>

      {/* Display loading spinner or categories */}
      {loading ? (
        <LoadingSpinner loadingText={"Loading..."} />
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render each category as a link */}
          {categories.map((category) => (
            <Link
              to={`/category/${category.strCategory}`}
              key={category.idCategory}
              className="bg-gray-200 p-4 rounded"
            >
              <h2 className="text-xl">{category.strCategory}</h2>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="mt-2"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
