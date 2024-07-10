import React from "react";
import { useFavorites } from "../api/ContextApi";
import CardComponent from "../components/Card";

const Favorites = () => {
  const { favourites } = useFavorites();

  return (
    <div className="h-full container mx-auto p-4 relative">
      <h1 className="text-3xl text-center font-bold text-white">
        Favorite Movies
      </h1>

      {favourites.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {favourites.map((movie) => (
            <div key={movie.imdbId}>
              <CardComponent movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-3xl text-center font-bold text-gray-800 flex justify-center items-center">
          No Favourites movies found!!
        </div>
      )}
    </div>
  );
};

export default Favorites;
