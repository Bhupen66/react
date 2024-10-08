import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Loader = () => (
  <div className="flex flex-row gap-2">
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce animation-delay-300ms"></div>
    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce animation-delay-500ms"></div>
  </div>
);

const Navbar = () => {
  const { isLogin, user, logout, setIsLogin, setUser } = useContext(AppContext);
  const [setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      setIsLogin(true);
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin, setUser]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
      toast.success("Logged out successfully!");
      navigate("/");
    }, 2000);
  };

  const handleDashboardRedirect = () => {
    if (user.email === "admin@gmail.com") {
      navigate("/Admindashboard");
    } else {
      navigate("/home");
    }
  };

  return (

    <>


      <nav className=" bg-gray-800 w-full fixed p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="text-white text-2xl font-bold">
            Car Dealer
          </div>

          {/* Center: Navigation Links */}
          <ul className="flex space-x-4">
            <li><a href="/home" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a></li>
            <li><a href="/Car" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Cars</a></li>
            <li><a href="/Part" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Parts</a></li>
            <li><a href="/Contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</a></li>
          </ul>

          {/* Right side: Logout Button */}
          <div className="flex space-x-4">
            <a href="/Cart" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Cart
            </a>
            <a href="/" className="text-white hover:bg-red-600 px-3 py-2 rounded">
              Logout
            </a>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
