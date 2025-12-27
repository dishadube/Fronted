// CreateBlog.jsx
// Uses fetch() instead of axios
// Matches backend fields exactly (title + description)
// Author comes from JWT token (secure)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Get token from localStorage
      const raw = localStorage.getItem("user");
      if (!raw) throw new Error("User not logged in");

      const { token } = JSON.parse(raw);
      if (!token) throw new Error("Token missing");

      const response = await fetch(
        "https://vidya-vedas-backend.vercel.app/api/blogs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title,
            description: form.content, // ✅ backend expects "description"
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.msg || "Failed to create blog");
      }

      alert("Blog created successfully ✅");
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter blog title"
            required
          />

          {/* Content */}
          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            className="w-full p-3 border rounded-lg mb-6 resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Write your blog content..."
            required
          />

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white shadow disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>

            <button
              type="button"
              className="text-sm text-gray-600 underline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
