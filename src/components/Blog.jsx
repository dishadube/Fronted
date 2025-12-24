// CreateBlog.jsx
// React component (Tailwind CSS) for creating a blog post.
// - Title and content fields
// - Author ID auto-filled from logged-in user stored in localStorage as { _id, name, token }
// - Sends POST to /api/blogs with Authorization: Bearer <token>
// - Copy this file into your React project (e.g. src/components/CreateBlog.jsx)

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Blog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  // try to load logged-in user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const user = JSON.parse(raw);
      if (user && user._id) setForm((p) => ({ ...p, author: user._id }));
    } catch (err) {
      console.warn("Failed to read user from localStorage", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("Please add both title and content");
      return;
    }

    setLoading(true);
    try {
      const token = (() => {
        try {
          const raw = localStorage.getItem("user");
          if (!raw) return null;
          const user = JSON.parse(raw);
          return user?.token ?? null;
        } catch (err) { return null; }
      })();

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

     await axios.post("http://localhost:5000/api/blogs/create", form, {
  headers: { Authorization: `Bearer ${token}` }
});
      // on success, navigate to blog list or detail
      alert("Blog created successfully");
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.msg || error.message || "Failed to create blog";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-4">Create a new blog</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Write a short, catchy title"
            required
          />

          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            className="w-full p-3 border rounded-lg mb-4 resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Tell your story..."
            required
          />

          <label className="block mb-2 text-sm font-medium">Author ID (auto-filled)</label>
          <input
            name="author"
            value={form.author}
            readOnly
            className="w-full p-3 border rounded-lg mb-6 bg-gray-100"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg shadow-sm bg-indigo-600 text-white disabled:opacity-60"
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

