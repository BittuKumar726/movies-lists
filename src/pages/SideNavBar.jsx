import { UserCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Bookmark, Home, Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../store/reducer/AuthReducer";
import Logout from "./Logout";

const SideNavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
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
        </nav>

        <div className="mt-auto px-1 mb-8 flex items-center justify-center w-full">
          {isLoggedIn ? (
            <div className="relative flex items-center rounded-md border-2 border-gray-300 py-2 w-[80%]">
              {currentUser?.avatar ? (
                <Avatar size="30" src={currentUser.avatar} round={true} />
              ) : (
                <UserCircle className="text-gray-500 mr-2 ml-4" />
              )}

              <span className="text-gray-700 ml-1">
                {currentUser?.fullName ? currentUser.fullName : "Guest User"}
              </span>
              <div
                className="ml-auto mr-4 cursor-pointer"
                onClick={toggleDropdown}
              >
                •••
              </div>

              {dropdownVisible && (
                <div className="absolute right-0 bottom-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  <Logout />
                </div>
              )}
            </div>
          ) : (
            <div className="flex-grow mt-4 flex items-center gap-4 w-[50%] pr-6 pl-6">
              <Link
                to="/login"
                className="flex justify-center items-center py-2.5 px-4 rounded-md border-1 w-[50%] cursor-pointer bg-gray-200"
              >
                <span className={`text-red-500 ml-1`}>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex justify-center items-center py-2.5 px-4 rounded-md border-1 w-[50%] cursor-pointer bg-gray-200"
              >
                <span className={`text-red-500 ml-1`}>Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
