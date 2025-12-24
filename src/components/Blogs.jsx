// src/components/Blogs.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://vidya-vedas-backend.vercel.app/api/blogs");
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      const data = await res.json();
      // expect data.blogs (controller returns { blogs: [...] })
      const list = data.blogs ?? data; // fallback if your API returns array directly
      setBlogs(list);

      if (!list || list.length === 0) {
        toast.info("No blogs found.");
      } else {
        toast.success(`${list.length} blog(s) loaded successfully!`);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(err);
      toast.error(`Failed to load blogs: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6 text-center text-gray-700">Loading blogs...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found.</p>
      ) : (
        <>
          {/* Table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Content</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Author</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{blog.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {blog.content?.length > 200 ? blog.content.slice(0, 200) + "…" : blog.content}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {blog.author?.name || blog.author?.email || blog.author || "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="md:hidden space-y-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="p-4 border border-gray-200 rounded shadow-sm bg-white">
                <h5 className="font-semibold mb-2">{blog.title}</h5>
                <p className="mb-3 text-gray-700">
                  {blog.content?.length > 300 ? blog.content.slice(0, 300) + "…" : blog.content}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Author:</strong> {blog.author?.name || blog.author?.email || blog.author || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created:</strong> {blog.createdAt ? new Date(blog.createdAt).toLocaleString() : "—"}
                </p>
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
