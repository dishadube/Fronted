import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Hero Section - Optimized for Mobile Headings */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-inner rounded-b-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Simplify School Management with <span className="text-blue-600">MySchool</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your one-stop solution for managing student enrollments, communication, and academic tracking efficiently.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl text-lg 
                       hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg no-underline"
          >
            Get Started Today
          </a>
        </div>
      </section>

      {/* 2. Key Features Section - Grid adapted for 1 or 2 columns on tablets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose MySchool?
          </h2>
          
          {/* Grid layout: 1 column on mobile, 2 columns on small screens, 3 on medium+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Feature 1: Enrollment */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-500">
              <div className="text-blue-500 mb-4">
                {/* Inline SVG for Enrollment Icon (Document/Form) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM6 20V4H13V9H18V20H6ZM10 13H14V15H10V13ZM10 16H14V18H10V16Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Streamlined Enrollment</h3>
              <p className="text-gray-600">
                Collect student data easily with our centralized application form. Say goodbye to messy paper forms and scattered spreadsheets.
              </p>
            </div>

            {/* Feature 2: Communication */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-green-500">
              <div className="text-green-500 mb-4">
                {/* Inline SVG for Communication Icon (Chat/Messages) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H6L2 22V6C2 4.89543 2.89543 4 4 4ZM4 6V18.196L5.15814 17.1581L5.35338 17H20V6H4Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Parent Connect</h3>
              <p className="text-gray-600">
                Facilitate smooth communication between administrators, teachers, and parents with integrated messaging and notification tools.
              </p>
            </div>

            {/* Feature 3: Analytics */}
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-yellow-500">
              <div className="text-yellow-500 mb-4">
                {/* Inline SVG for Analytics Icon (Chart) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 20H22V22H2V20ZM4 18V6H8V18H4ZM10 14V6H14V18H10ZM16 10V6H20V18H16V10Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Insights</h3>
              <p className="text-gray-600">
                Access crucial data and reports instantly. Track student performance, attendance, and fee status from a unified dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Secondary CTA / Information */}
      <section className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 mt-10 rounded-t-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Whether you're looking to enroll a student or require administrative access, we have a solution for you.
          </p>
          {/* Button stacking for mobile is ensured by 'flex-col' and 'space-y-4' */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="/studentform" 
              className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl text-lg 
                         hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg no-underline"
            >
              Fill Out Student Form
            </a>
            <a 
              href="/contact" 
              className="inline-block border border-white text-white font-semibold px-8 py-3 rounded-xl text-lg 
                         hover:bg-black hover:text-gray-800 transition-all duration-300 no-underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
      
     
    </div>
  )
}

export default Home