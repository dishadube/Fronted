import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllstudentDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(
        "https://vidya-vedas-backend.vercel.app/api/student/get"
      );

      if (!res.ok) throw new Error("Failed to fetch students");

      const data = await res.json();
      setStudents(data);

      data.length
        ? toast.success(`${data.length} student(s) loaded successfully!`)
        : toast.info("No students found.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="p-6 text-center text-gray-700">
        Loading student data...
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        All Students
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">No students found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border divide-y">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Roll No",
                    "Name",
                    "Medium",
                    "Course",
                    "Mother's Name",
                    "Gender",
                    "Cast",
                  ].map((head) => (
                    <th key={head} className="px-4 py-2 text-left text-sm">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{s.rollNo}</td>
                    <td className="px-4 py-2">{s.studentName}</td>
                    <td className="px-4 py-2">{s.medium}</td>
                    <td className="px-4 py-2">{s.course}</td>
                    <td className="px-4 py-2">{s.motherName}</td>
                    <td className="px-4 py-2">{s.gender}</td>
                    <td className="px-4 py-2">{s.cast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {students.map((s) => (
              <div key={s._id} className="p-4 border rounded bg-white">
                {[
                  ["Roll No", s.rollNo],
                  ["Name", s.studentName],
                  ["Medium", s.medium],
                  ["Course", s.course],
                  ["Mother's Name", s.motherName],
                  ["Gender", s.gender],
                  ["Cast", s.cast],
                ].map(([label, value]) => (
                  <p key={label}>
                    <span className="font-semibold">{label}:</span> {value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        theme="colored"
      />
    </div>
  );
}

export default AllstudentDetails;
