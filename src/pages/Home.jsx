import { BookmarkPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import MovieCard from "../components/Card";
import LoadingSpinner from "../components/loader";

const apiUrl = "http://www.omdbapi.com";
const API_KEY = "841a04a5";
const Home = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log({ data, title });
  const getMovieList = async (title) => {
    setData([]);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/?s=${title}&apikey=${API_KEY}&`);
      const resData = await res.json();
      if (resData?.Response) {
        resData.Search.forEach((item, index) => {
          getMovieListByIds(item?.imdbID);
        });
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const getMovieListByIds = async (mId) => {
    try {
      const res = await fetch(`${apiUrl}/?i=${mId}&apikey=${API_KEY}&`);

      const resData = await res.json();
      setData((prevData) => [...prevData, resData]);
      return;
    } catch (error) {
      console.log("error", error);
      return;
    }
  };

  const onSearchData = async (title) => {
    setData([]);
    setLoading(true);
    try {
      const movieTitle = title.trim();
      const res = await fetch(`${apiUrl}/?s=${movieTitle}&apikey=${API_KEY}&`);
      const resData = await res.json();
      if (resData?.Response) {
        resData.Search.forEach((item, index) => {
          getMovieListByIds(item?.imdbID);
        });
      } else {
        setData([]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-black">
            Welcome to <span className="text-red-600">Watchlists</span>
          </h1>
          <p className="text-gray-700 mt-4 text-2xl">
            Browse movies, add them to watchlists and share them with friends.
          </p>
          <p className="inline-flex items-center text-gray-700 text-2xl">
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

      {data.length <= 0 ? (
        <>
          {loading ? (
            <div className="h-[50%]">
              <LoadingSpinner loadingText={"loading..."} />
            </div>
          ) : (
            <div className="items-center mt-[80px] ">
              <h1> Movies not found!!</h1>
            </div>
          )}
        </>
      ) : (
        <div className="p-4 w-[92%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.map((item, idx) => {
            const movie = {
              title: item.Title,
              year: item.Year,
              poster: item.Poster, // Replace with actual URL
              rating: parseInt(item.imdbRating) * 10,
            };
            return (
              <div key={`${item?.Title}-${idx}`}>
                <MovieCard key={idx} movie={movie} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
