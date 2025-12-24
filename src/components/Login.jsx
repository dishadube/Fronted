import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/userContext";

function LoginForm() {
  const navigate = useNavigate();
  const { setFormData } = useContext(UserContext);

  const [localFormData, setLocalFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = localFormData;

  const handleChange = (e) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please enter all fields");
      return;
    }

    try {
      const response = await fetch("https://vidya-vedas-backend.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg || "Login failed");
        return;
      }

     
      toast.success("Login successful!");

   
      setFormData({ email: data.email || email, token: data.token });
      setTimeout(() => {
        navigate("/profilePage");
      }, 1500); 

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
        <p className="text-center mt-4 text-gray-600">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/forgetpassword")}
          >
            Forget Password?
          </span>
        </p>  
      </div>
    </div>
  );
}
export default LoginForm;

