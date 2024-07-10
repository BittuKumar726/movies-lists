import { createContext, useContext, useState } from "react";

// Create a context for managing favorites
const FavouriteContext = createContext();

// Context provider component to wrap around the app
export const FavoritesContextProvider = ({ children }) => {
  // State to store the list of favorite meals
  const [favourites, setFavourites] = useState([]);

  // Function to toggle a meal as a favorite
  const toggleFavourite = (meal) => {
    // Check if the meal is already in the favorites list
    if (favourites.some((fav) => fav.idMeal === meal.idMeal)) {
      // If it is, remove it from the list
      setFavourites(favourites.filter((fav) => fav.idMeal !== meal.idMeal));
    } else {
      // If it isn't, add it to the list
      setFavourites([...favourites, meal]);
    }
  };

  // Function to check if a meal is in the favorites list
  const isFavorite = (itemId) => {
    return favourites.some((item) => item?.idMeal === itemId);
  };

  return (
    // Provide the favorites data and functions to children components
    <FavouriteContext.Provider
      value={{ favourites, toggleFavourite, isFavorite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
  return useContext(FavouriteContext);
};
