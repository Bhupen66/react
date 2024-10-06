import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      navigate("/admindashboard");
    } else {
      navigate("/home");
    }
  };

  return (

    <>
    
    
    <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    Car Dealer
                </div>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a></li>
                    <li><a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Cars</a></li>
                    <li><a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Parts</a></li>
                    <li><a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Help</a></li>
                    <li><a href="#" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Contact</a></li>
                    <li><a href="#" className="text-white hover:bg-red-600 px-3 py-2 rounded">Logout</a></li>
                </ul>
            </div>
        </nav>
  
  </>
  );
};

export default Navbar;
