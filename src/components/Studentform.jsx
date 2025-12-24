import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ TextInput component outside so it doesn't recreate each render
const TextInput = React.forwardRef(({ name, label, value, onChange }, ref) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}:
    </label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      autoComplete="off"
      ref={ref} // Forwarded ref
      className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm 
                 focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
  </div>
));

const StudentForm = () => {
  const [formData, setFormData] = useState({
    medium: "English",
    studentName: "",
    rollNo: "",
    course: "",
    motherName: "",
    gender: "",
    cast: "General",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Ref for Student Name input
  const studentNameRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isFormComplete = Object.values(formData).every((v) => v !== "");
    if (!isFormComplete) {
      toast.warn("Please fill all required fields before submitting.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://vidya-vedas-backend.vercel.app/api/student/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit student data");

      toast.success(`Enrollment successful for ${formData.studentName}!`);
      console.log("Student submitted:", data);

      // ✅ Reset form
      setFormData({
        medium: "English",
        studentName: "",
        rollNo: "",
        course: "",
        motherName: "",
        gender: "",
        cast: "General",
      });

      // ✅ Focus Student Name input after reset
      studentNameRef.current.focus();
    } catch (error) {
      console.error("Error submitting student:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 relative">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Student Enrollment
      </h2>

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Medium */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medium:
          </label>
          <div className="flex space-x-4">
            {["English", "Hindi", "Marathi"].map((m) => (
              <label key={m} className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  name="medium"
                  value={m}
                  checked={formData.medium === m}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Text Inputs */}
        <TextInput
          name="studentName"
          label="Student Name"
          value={formData.studentName}
          onChange={handleChange}
          ref={studentNameRef} // attach ref here
        />
        <TextInput
          name="rollNo"
          label="Roll No"
          value={formData.rollNo}
          onChange={handleChange}
        />
        <TextInput
          name="course"
          label="Course"
          value={formData.course}
          onChange={handleChange}
        />
        <TextInput
          name="motherName"
          label="Mother's Name"
          value={formData.motherName}
          onChange={handleChange}
        />

        {/* Gender */}
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm 
                       focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Cast */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cast Category:
          </label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["General", "EWS", "OBC", "SC", "ST"].map((caste) => (
              <label key={caste} className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  name="cast"
                  value={caste}
                  checked={formData.cast === caste}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">{caste}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded 
                     hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Register Student"}
        </button>
      </form>

      {/* Toast Notifications */}
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
};

export default StudentForm;
