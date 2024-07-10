import React, { useState } from "react";
import { Tooltip } from "./Tooltip"; // Assume you have a Tooltip component
import { BookmarkPlus } from "lucide-react";
import { useFavorites } from "../api/ContextApi";
import { Bookmark } from "react-feather";

const MovieCard = ({ movie }) => {
  const { toggleFavourite, isFavorite } = useFavorites();

  // State to manage tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-2 h-full">
      <div className="relative">
        {/* Movie poster */}
        <img
          className="w-full"
          style={{ height: "285px" }}
          src={movie.poster}
          alt={movie.title}
        />

        {/* Add to favorite icon with tooltip */}
        <div className="absolute top-2 left-2">
          <div
            onMouseOver={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative flex items-center"
          >
            {showTooltip && (
              <Tooltip
                text={
                  isFavorite(movie?.imdbID)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                position="top-8 left-0"
              />
            )}

            {isFavorite(movie?.imdbID) ? (
              <Bookmark
                className="text-red-500 cursor-pointer"
                size={30}
                onClick={() => toggleFavourite(movie)}
                fill="red"
              />
            ) : (
              <BookmarkPlus
                className="text-white cursor-pointer"
                size={30}
                absoluteStrokeWidth
                onClick={() => toggleFavourite(movie)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center px-4 py-2 w-full">
        <span className="ml-auto flex items-center">
          <span className="text-green-500">
            {movie.rating >= 80 ? <>&#128526;</> : <>&#128578;</>}
          </span>
          <span className="ml-2 text-gray-700 font-bold">
            {movie.rating ? movie.rating : 78}
          </span>
          <span className="text-gray-500">/100</span>
        </span>
      </div>

      {/* Movie information */}
      <div className="px-4 py-2">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">({movie.year})</p>
      </div>
    </div>
  );
};

export default MovieCard;
