import { createContext, useContext, useState } from "react";

// Create a context for managing favorites
const FavouriteContext = createContext();

// Context provider component to wrap around the app
export const FavoritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (movie) => {
    if (favourites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavourites(favourites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavourites([...favourites, movie]);
    }
  };

  const isFavorite = (itemId) => {
    return favourites.some((item) => item?.imdbID === itemId);
  };

  return (
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
