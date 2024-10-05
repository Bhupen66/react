import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Page/Signup"; // Import Signup component
import Login from "./Page/Login"; // Import Login component
import Dashboard from "./Page/Dashboard"; // Import Dashboard component
import Art from "./Components/Art";

// Import the additional components for the new routes
// import Home from "./Page/Home";
// import Shop from "./Page/Shop";
// import AboutUs from "./Page/AboutUs";
// import Feedback from "./Page/Feedback";

function App() {
  return (
    <div className="App">
      {/* Add the Navbar so it appears on every page */}
      <Dashboard />


      {/* Define routes to navigate to different pages */}
      <Routes>
        {/* Existing Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/Art" element={<Art />} />
        {/* New Routes for Home, Shop, About Us, and Feedback */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/feedback" element={<Feedback />} /> */}

        {/* You can add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
