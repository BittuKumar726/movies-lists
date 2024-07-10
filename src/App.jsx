import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./pages/SideNavBar";
import Home from "./pages/Home";
import { FavoritesContextProvider } from "./api/ContextApi";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    // Provide the FavoritesContext to the entire application
    <FavoritesContextProvider>
      <Router>
        <div className="flex app-background min-h-screen w-full">
          <div className="w-[22%]">
            <SideNavBar />
          </div>

          <div className="flex-1 w-[78%]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FavoritesContextProvider>
  );
};

export default App;
