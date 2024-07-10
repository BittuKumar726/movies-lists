import React from "react";
import { useFavorites } from "../components/ContextApi";
import CardComponent from "../components/Card";

const Favorites = () => {
  // Retrieve the favorites meals from the context
  const { favourites } = useFavorites();

  return (
    // Main container with responsive width, padding, and relative positioning
    <div className="h-full container mx-auto p-4 relative">
      {/* Page title */}
      <h1 className="text-3xl text-center font-bold text-white">
        Favorite Meals
      </h1>

      {favourites.length > 0 ? (
        // If there are favorite meals, display them in a grid
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favourites.map((meal) => (
            // Wrap each favorite meal in a div with a unique key
            <div key={meal.idMeal}>
              <CardComponent meal={meal} />
            </div>
          ))}
        </div>
      ) : (
        // If no favorite meals, display a message
        <div className="text-3xl text-center font-bold text-gray-800 flex justify-center items-center">
          No Favourites Meal found!!
        </div>
      )}
    </div>
  );
};

export default Favorites;
