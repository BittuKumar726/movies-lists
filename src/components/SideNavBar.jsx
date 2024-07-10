import React from "react";
import { Link } from "react-router-dom";
import { Home, List, Heart, Shuffle, Info, Search } from "react-feather";
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

          <div className="flex items-center py-2.5 px-4 rounded-md border-1 w-[80%] cursor-pointer bg-red-500">
            <Home className="text-gray-100 mr-2" size={20} />
            <span className={`text-gray-100 ml-1`}>Home Page</span>
          </div>

          <div className="border-b-2 border-gray-300 w-[80%]"></div>

          <div className="flex items-center px-4 rounded-md border-1 w-[80%] cursor-pointer">
            <h1 className="text-4xl">My Lists</h1>
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