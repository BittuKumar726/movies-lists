import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SideNavBar from "./pages/SideNavBar";
import Home from "./pages/Home";
import { FavoritesContextProvider } from "./api/ContextApi";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();
  const hideSideNavBar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex app-background min-h-screen w-full">
      {!hideSideNavBar && (
        <div className="lg:w-[22%] md:w-[2%]">
          <SideNavBar />
        </div>
      )}
      <div className={hideSideNavBar ? "w-full" : "flex-1 w-[78%]"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <FavoritesContextProvider>
      <Router>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </Router>
    </FavoritesContextProvider>
  );
};

export default App;
