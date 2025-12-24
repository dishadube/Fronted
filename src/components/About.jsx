import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. About Hero / Mission & Vision */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 shadow-md rounded-b-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Our Mission at <span className="text-blue-600">MySchool</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            We believe that modern education requires modern tools. MySchool was founded to bridge the gap between traditional school administration and digital efficiency.
          </p>
          <div className="border-t-2 border-blue-100 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-lg text-gray-600">
              To be the leading platform that empowers educators, engages students, and connects parents, creating a cohesive, data-driven learning ecosystem for all.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Core Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            
            {/* Value 1: Innovation */}
            <div className="p-6 rounded-xl border border-gray-200 hover:bg-blue-50 transition-colors duration-300">
              <div className="text-blue-500 mb-3 text-3xl font-extrabold">I</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Continuously improving our platform with the latest technology to meet evolving educational needs.
              </p>
            </div>

            {/* Value 2: Transparency */}
            <div className="p-6 rounded-xl border border-gray-200 hover:bg-green-50 transition-colors duration-300">
              <div className="text-green-500 mb-3 text-3xl font-extrabold">T</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">
                Providing clear, accessible insights into student progress and administrative processes.
              </p>
            </div>

            {/* Value 3: Simplicity */}
            <div className="p-6 rounded-xl border border-gray-200 hover:bg-yellow-50 transition-colors duration-300">
              <div className="text-yellow-500 mb-3 text-3xl font-extrabold">S</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplicity</h3>
              <p className="text-gray-600 text-sm">
                Designing intuitive tools that save time, not complicate it.
              </p>
            </div>

            {/* Value 4: Community */}
            <div className="p-6 rounded-xl border border-gray-200 hover:bg-red-50 transition-colors duration-300">
              <div className="text-red-500 mb-3 text-3xl font-extrabold">C</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">
                Fostering strong connections between home, classroom, and administration.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Existing Features Section (Renamed to focus on Benefits) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Benefits for Our Users
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: Enrollment */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
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
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
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
            <div className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-yellow-500">
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

      {/* 4. Final CTA */}
      <section className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 mt-10 rounded-t-3xl">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl font-medium mb-6">
            Join the schools transforming their administration process today.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl text-lg 
                       hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg no-underline"
          >
            Start Managing Better
          </a>
        </div>
      </section>
      
    </div>
  )
}

export default About
