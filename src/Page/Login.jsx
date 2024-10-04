import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation (optional)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Handle form submission (e.g., call API to login user)
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setIsLogin(true);
        setUser(JSON.stringify(result.user));
        // On successful login, navigate to another page (e.g., dashboard or home)
        navigate("/home"); // Change to your desired route
      } else {
        // Set error if login failed
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
  <form
    onSubmit={handleLogin}
    className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-2xl backdrop-blur-lg transform transition-all duration-500 hover:scale-105"
  >
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Login
    </h2>
    {error && (
      <p className="text-red-500 mb-4 text-center">{error}</p>
    )}
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        required
      />
    </div>
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
    >
      Login
    </button>
  </form>
</div>

  
  );
}

export default Login;
