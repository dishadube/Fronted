import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/userContext";

export default function Profile() {
  const { formData, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!formData?.email) return null;

  // Derive initials for the avatar
  const initials = formData.email
    ? formData.email.charAt(0).toUpperCase()
    : "U";

  const signOut = () => {
    setIsDropdownOpen(false);
    // Assuming 'logout' function handles context cleanup
    logout();
    toast.success("Logged out successfully! 👋");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-right">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="User Profile Menu"
      >
        <span className="text-md sm:text-lg">{initials}</span>
        </button>
        <div
        className={`absolute mt-2 w-56 origin-top-right rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-50 right-0 max-w-[calc(100vw-2rem)] transform transition-all duration-200 ease-out
        ${isDropdownOpen ? "opacity-100 scale-100": "opacity-0 scale-95 pointer-events-none"}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {/* User Email/Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs sm:text-sm font-medium text-gray-900">
              Signed in as:
            </p>
            <p className="text-sm truncate text-indigo-600 font-semibold">
              {formData.email}
            </p>
          </div>
          <ul>
            <li>
              <Link
                to="/usersettings"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition duration-150 ease-in-out"
                role="menuitem"
                tabIndex="-1"
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Profile Settings
                </span>
              </Link>
            </li>
          </ul>
          {/* Divider */}
          <div className="my-1 border-t border-gray-100"></div>
          {/* Logout Button */}{" "}
          <ul>
            {" "}
            <li>
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-150 ease-in-out rounded-b-xl"
                role="menuitem"
                tabIndex="-1"
              >
                <span className="flex items-center">
                  {" "}
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
