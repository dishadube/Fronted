import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom"; 

import Profile from './Profile'; 
import { UserContext } from '../Context/userContext';

// --- SVG Icons (No changes) ---
const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}>
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
);

const getLinkClasses = (path, currentPath) => {
    const baseClasses = "px-3 py-2 rounded-lg text-sm font-semibold transition-colors no-underline";
    const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";
    const activeClasses = "bg-indigo-600 text-white shadow-lg"; 

    return `${baseClasses} ${currentPath === path ? activeClasses : inactiveClasses}`;
};

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { formData } = useContext(UserContext);
  const location = useLocation(); 

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMobileMenu = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-2xl sticky top-0 z-[100]"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Desktop links (No change) */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-extrabold text-indigo-400 no-underline tracking-wide">VidyaVedas</Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            <Link to="/home" className={getLinkClasses("/home", location.pathname)} >Home</Link>
            <Link to="/about" className={getLinkClasses("/about", location.pathname)}>About</Link>
            <Link to="/contact" className={getLinkClasses("/contact", location.pathname)}>Contact</Link>
             <Link to="/blog" className={getLinkClasses("/contact", location.pathname)}>Blog</Link>
            {formData && <Link to="/dashboard" className={getLinkClasses("/dashboard", location.pathname)}>Dashboard</Link>}
            
            <Link to="/studentform" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-500 transition-colors shadow-md no-underline">
                Student Form
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {formData ? (
              <Profile /> 
            ) : (
              <>
                <Link to="/login" className="bg-blue-600  px-4 py-2 rounded-lg text-sm text-white font-semibold text-gray-300 hover:bg-gray-700 transition-colors no-underline">
                    Login
                </Link>
                <Link to="/register" className="bg-blue-600 px-4 py-2 rounded-lg text-sm text-white  font-semibold hover:bg-gray-700 transition-colors shadow-md no-underline">
                    Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle (No change) */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
                onClick={toggleNav} 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
                aria-label="Main menu"
            >
              {isNavOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Improved UI) */}
      <div 
        className={`md:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-2xl transition-all duration-300 ease-in-out transform 
        ${isNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`} 
        id="mobile-menu"
      >
        {/* FIX: Added max-h-[calc(100vh-4rem)] and overflow-y-auto */}
        <div className="px-5 pt-3 pb-5 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Main Links */}
          <Link to="/home" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">Home</Link>
          <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">About</Link>
          <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">Contact</Link>
           <Link to="/blog" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">Blog</Link>
          
          <hr className="border-gray-700 my-2" />

          {/* Action Button: Student Form */}
          <Link to="/studentform" onClick={closeMobileMenu} className="block bg-green-600 text-white px-4 py-3 rounded-lg text-base font-bold text-center hover:bg-green-500 transition-colors no-underline shadow-md">
            Student Form
          </Link>
          
          {/* Authenticated Links/Actions */}
          {formData ? (
            <>
              <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">Dashboard</Link>
              
              {/* Profile Component for Logout/Profile Page Access */}
              <div className="pt-4 pb-2 px-4 border-t border-gray-700 flex justify-center">
                  <Profile /> 
              </div>
            </>
          ) : (
            /* Unauthenticated Links/Actions */
            <div className='space-y-3'>
                <Link to="/login" onClick={closeMobileMenu} className="bg-blue-600 text-center font-bold  block px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:bg-gray-700 no-underline">Login</Link>
                <Link to="/register" onClick={closeMobileMenu} className="block bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-bold text-center hover:bg-blue-500 transition-colors no-underline shadow-md">
                    Sign Up
                </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;