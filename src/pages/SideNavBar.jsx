import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  List,
  Heart,
  Shuffle,
  Info,
  Search,
  Bookmark,
} from "react-feather";
import { UserCircle } from "lucide-react";

const SideNavBar = () => {
  return (
    // Main container with full height
    <div className="flex h-screen">
      <div className="fixed inset-y-0 left-0 z-50 flex flex-col w-[22%] border-r-2 border-gray-300">
        <div className="flex items-center justify-center h-16 px-4">
          <h1 className="text-red-600 text-4xl font-bold">Watchlists</h1>
        </div>

        <nav className="flex-grow mt-4 flex flex-col items-center gap-7">
          <div className="flex items-center rounded-md border-2 border-gray-300 py-2 w-[80%]">
            <Search className="text-gray-500 mr-2 ml-4" />
            <input
              type="text"
              placeholder="Search"
              className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
            />
          </div>

          <Link
            to="/"
            className="flex items-center py-2.5 px-4 rounded-md border-1 w-[80%] cursor-pointer bg-red-500"
          >
            <Home className="text-white mr-2" size={20} />
            <span className={`text-white ml-1`}>Home</span>
          </Link>

          <div className="border-b-2 border-gray-300 w-[80%]"></div>
          <Link
            to="/favorites"
            className="flex items-center py-2.5 px-4 rounded-md border-1 w-[80%] cursor-pointer bg-gray-200"
          >
            <Bookmark fill="red" className="text-red-500 mr-2" size={20} />
            <span className={`text-gray-800 ml-1`}>Favorites Movies List</span>
          </Link>

          <div className="flex items-center px-4 rounded-md border-1 w-[80%] cursor-pointer">
            <h1 className="text-2xl">My Lists</h1>
          </div>
        </nav>

        <div className="mt-auto px-1 mb-8 flex items-center justify-center w-full">
          <div className="flex items-center rounded-md border-2 border-gray-300 py-2 w-[80%]">
            <UserCircle className="text-gray-500 mr-2 ml-4" />
            <span className="text-gray-700 ml-1">Guest User</span>
            <div className="ml-auto mr-4 cursor-pointer">•••</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
