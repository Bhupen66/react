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
    
    
     <nav className="bg-opacity-80 w-full">

     <div className=' fixed z-[999] w-full px-20 py-5 rounded-full  bg-transparent flex justify-between items-center  hover:bg-slate-700  transition duration-200'>
                <div className='logo'>
                    <a href='#home'>
                        <img href='#home' className='w-18 h-12' src="https://static.thenounproject.com/png/789273-200.png" alt="logo" /> 
                    </a>
                </div>
            <nav className='flex gap-10 justify-center text-white '>
                <ul className=' hover:text-orange-200 rounded-md transition duration-200'>
                    <li>
                        <a href='#about'>About</a>
                    </li>
                </ul>
                <ul className=' hover:text-orange-200 rounded-md transition duration-200'>
                    <li>
                        <a href='/Cars'>Car's</a>
                    </li>
                </ul>
                <ul className=' hover:text-orange-200 rounded-md transition duration-200'>
                    <li>
                        <a href='/Spare_Parts'>Spare Part's</a>
                    </li>
                </ul>
                <ul className=' hover:text-orange-200 rounded-md transition duration-200'>
                    <li>
                        <a href='/Countact'>Countact</a>
                    </li>
                </ul>
                <ul className=' hover:text-orange-200 rounded-md transition duration-200'> 
                    <li>
                        <a href='/Art_Culture'>Art & Culture</a>
                    </li>
                </ul>
            
            </nav>
            
            <div className='flex gap-8 h-10'>

                <a href="/Dashboard"  className= 'flex text-2xl  hover:text-white rounded-md transition duration-200'>Dashboard</a>
            </div>
        </div>

      
    </nav>
  
  </>
  );
};

export default Navbar;
