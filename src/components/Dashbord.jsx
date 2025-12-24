import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleStudentForm = () => {
    navigate("/studentform"); // Redirect to Student Form page
  };

  const handleAllStudents = () => {
    navigate("/allstudentdetails");
  };

 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to your Dashboard 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          You are successfully logged in. Explore your student portal and manage your information.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleStudentForm}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Student Form
          </button>
          <button
            onClick={handleAllStudents}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            All Students
          </button>
         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
