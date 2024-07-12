import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/reducer/AuthReducer";
import { toast } from "react-toastify";
import { handleLoginNavigation } from "../general/Common";

const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    const response = await dispatch(logout());
    if (response?.payload?.success) {
      toast.success("Logged out successfully!", { position: "top-center" });
      handleLoginNavigation("/", navigate);
    } else {
      toast.error("Failed to log out!");
    }
  };
  return (
    <div>
      <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
        Profile
      </Link>
      <button
        onClick={() => onLogout()}
        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
