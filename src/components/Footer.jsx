import React from 'react'

const Footer = () => {
  return (
    <div>
       <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 text-sm">
          
          {/* Column 1: Brand & Description */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">MySchool</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              The digital platform designed to simplify school administration and maximize educational impact.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-blue-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Resources & Access */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-blue-300">Access & Forms</h4>
            <ul className="space-y-2">
              <li><a href="/studentform" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">Student Enrollment</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">Admin Dashboard</a></li>
              <li><a href="/register" className="text-gray-400 hover:text-blue-400 transition-colors no-underline">Sign Up</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h4 className="text-md font-semibold mb-4 text-blue-300">Support</h4>
            <p className="text-gray-400 text-sm mb-2">Email: support@myschool.com</p>
            <p className="text-gray-400 text-sm">Phone: (555) 123-4567</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MySchool. All rights reserved.
          </p>
        </div>
      </footer>
      
    </div>
  )
}

export default Footer
