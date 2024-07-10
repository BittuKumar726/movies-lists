import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import Home from "./pages/Home";
import { FavoritesContextProvider } from "./components/ContextApi";

const App = () => {
  return (
    // Provide the FavoritesContext to the entire application
    <FavoritesContextProvider>
      <Router>
        <div className="flex app-background min-h-screen w-full">
          <div className="w-[22%]">
            <SideNavBar />
          </div>

          {/* Main content area */}
          <div className="flex-1 w-[78%]">
            <Home />
          </div>
        </div>
      </Router>
    </FavoritesContextProvider>
  );
};

export default App;
