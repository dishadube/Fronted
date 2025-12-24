import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllstudentDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/student/students');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setStudents(jsonData);

        if (jsonData.length === 0) {
          toast.info('No students found.');
        } else {
          toast.success(`${jsonData.length} student(s) loaded successfully!`);
        }
      } catch (err) {
        setError(err);
        toast.error(`Failed to load students: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-700">Loading student data...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">All Students</h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">No students found.</p>
      ) : (
        <>
          {/* Table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Roll No</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Medium</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Course</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mother's Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cast</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{student.rollNo}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.studentName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.medium}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.course}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.motherName}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.gender}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{student.cast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="md:hidden space-y-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="p-4 border border-gray-200 rounded shadow-sm bg-white"
              >
                <p><span className="font-semibold">Roll No:</span> {student.rollNo}</p>
                <p><span className="font-semibold">Name:</span> {student.studentName}</p>
                <p><span className="font-semibold">Medium:</span> {student.medium}</p>
                <p><span className="font-semibold">Course:</span> {student.course}</p>
                <p><span className="font-semibold">Mother's Name:</span> {student.motherName}</p>
                <p><span className="font-semibold">Gender:</span> {student.gender}</p>
                <p><span className="font-semibold">Cast:</span> {student.cast}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AllstudentDetails;
