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
    <nav className="bg-opacity-80 w-full">
      <div className="fixed z-[999] w-full px-20 py-5 bg-slate-500 flex justify-between items-center transition duration-200">
        <div className="logo">
          <Link to="/dashboard">
            <img className="w-18 h-12" src="https://static.thenounproject.com/png/789273-200.png" alt="logo" />
          </Link>
        </div>
        <div className="flex gap-10 justify-center text-white">
          <Link to="#about" className="hover:text-orange-200 rounded-md transition duration-200">About</Link>
          <Link to="#cars" className="hover:text-orange-200 rounded-md transition duration-200">Car's</Link>
          <Link to="#parts" className="hover:text-orange-200 rounded-md transition duration-200">Spare Part's</Link>
          <Link to="#contact" className="hover:text-orange-200 rounded-md transition duration-200">Contact</Link>
          <Link to="/Art" className="hover:text-orange-200 rounded-md transition duration-200">Art & Culture</Link>
        </div>
        <div className="flex gap-8 h-10">
          {isLogin ? (
            <>
              <Link to="/cart" className="flex text-2xl rounded-md transition duration-200 hover:text-white">
                Cart
              </Link>
              <button
                onClick={handleDashboardRedirect}
                className="flex text-2xl rounded-md transition duration-200 hover:text-white"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex text-2xl rounded-md transition duration-200 hover:text-white"
                disabled={loading}
              >
                {loading ? <Loader /> : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/Signup" className="flex text-2xl rounded-md transition duration-200 hover:text-white">
                Register
              </Link>
              <Link to="/Login" className="flex text-2xl hover:text-white rounded-md transition duration-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-5 right-5 z-[1000] text-white focus:outline-none"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-slate-500 z-[1000] flex flex-col items-center justify-center">
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <Link to="#about" className="text-white text-xl my-2" onClick={toggleMenu}>About</Link>
          <Link to="#cars" className="text-white text-xl my-2" onClick={toggleMenu}>Car's</Link>
          <Link to="#parts" className="text-white text-xl my-2" onClick={toggleMenu}>Spare Part's</Link>
          <Link to="#contact" className="text-white text-xl my-2" onClick={toggleMenu}>Contact</Link>
          <Link to="/Art" className="text-white text-xl my-2" onClick={toggleMenu}>Art & Culture</Link>
          {isLogin ? (
            <>
              <Link to="/cart" className="text-white text-xl my-2" onClick={toggleMenu}>Cart</Link>
              <button
                onClick={() => {
                  handleDashboardRedirect();
                  toggleMenu();
                }}
                className="text-white text-xl my-2"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="text-white text-xl my-2"
                disabled={loading}
              >
                {loading ? <Loader /> : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/Signup" className="text-white text-xl my-2" onClick={toggleMenu}>Register</Link>
              <Link to="/Login" className="text-white text-xl my-2" onClick={toggleMenu}>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;