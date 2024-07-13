import { BookmarkPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import MovieCard from "../components/Card";
import LoadingSpinner from "../components/loader";
import { omdbApiById, omdbApiByTitle } from "../services/omdbapi";

const Home = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovieList = async (title) => {
    setData([]);
    setLoading(true);
    try {
      const res = await omdbApiByTitle(title);
      const resData = await res.json();
      if (resData?.Response === "True") {
        const moviePromises = resData.Search.map((item) =>
          getMovieListByIds(item.imdbID)
        );
        const movieResults = await Promise.all(moviePromises);
        const validMovies = movieResults
          .filter((result) => result.success)
          .map((result) => result.resData);
        setData(validMovies);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching movie list:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Delay of 2 seconds
    }
  };

  const getMovieListByIds = async (mId) => {
    try {
      const res = await omdbApiById(mId);
      const resData = await res.json();
      return {
        success: true,
        resData: resData,
      };
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
      return {
        success: false,
        resData: null,
      };
    }
  };

  const onSearchData = async (title) => {
    setData([]);
    setLoading(true);
    try {
      const movieTitle = title.trim();
      const res = await omdbApiByTitle(title);
      const resData = await res.json();
      if (resData?.Response === "True") {
        const moviePromises = resData.Search.map((item) =>
          getMovieListByIds(item.imdbID)
        );
        const movieResults = await Promise.all(moviePromises);
        const validMovies = movieResults
          .filter((result) => result.success)
          .map((result) => result.resData);
        setData(validMovies);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error searching for movies:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Delay of 2 seconds
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchData(title);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="flex justify-evenly flex-col items-center container w-full mt-8">
      <div className="p-4">
        <div className="border-2 border-red-700 rounded-md p-6">
          <h1 className="lg:text-4xl text-2xl font-bold text-black">
            Welcome to <span className="text-red-600">Watchlists</span>
          </h1>
          <p className="text-gray-700 mt-4 lg:text-2xl text-xl">
            Browse movies, add them to watchlists and share them with friends.
          </p>
          <p className="flex flex-col md:flex-row lg:inline-flex items-center text-gray-700 lg:text-2xl text-xl">
            Just click the{" "}
            <span>
              <BookmarkPlus size={40} strokeWidth={1} />
            </span>
            to add a movie, the poster to see more details or add to mark the
            movie as watched.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center rounded-md border-2 border-gray-300 w-[100%] py-2 px-4">
            <Search className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter movie name or actor name"
              className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="bg-red-600 text-white py-1 px-3 rounded-md ml-2"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner loadingText="Loading..." />
        </div>
      ) : (
        <div className="p-4 w-[92%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.length > 0 ? (
            data.map((item, idx) => {
              const movie = {
                title: item.Title,
                year: item.Year,
                poster: item.Poster,
                rating: parseInt(item.imdbRating) * 10,
                imdbID: item.imdbID,
              };
              return (
                <div key={`${item?.Title}-${idx}`}>
                  <MovieCard movie={movie} />
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center">
              <h1>No movies found!!</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
