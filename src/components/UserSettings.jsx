import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/userContext";

export default function UserSettings() {
 
    const { user, isLoading: isContextLoading, updateProfile } = useContext(UserContext); 
    const [formData, setFormData] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            await updateProfile(formData); 
            toast.success("Profile updated successfully!");
            
        } catch (error) {
            toast.error(error.message || "Failed to save profile.");
            console.error("Profile update failed:", error);
        } finally {
            setIsSaving(false);
        }
    };
    if (isContextLoading) {
        return (
            <div className="text-center p-10">
                <p className="text-xl font-medium text-indigo-600">Loading user profile...</p>
            </div>
        );
    }
    if (!user) {
         return (
            <div className="text-center p-10">
                <p className="text-xl font-medium text-red-600">Error: User data not available. Please log in.</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10">
                
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b pb-3">
                    User Settings
                </h1>
                <p className="text-gray-500 mb-8">
                    Manage your personal information and preferences.
                </p>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-xl font-bold text-indigo-700 mb-4">Personal Information</h2>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isSaving}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address (Read-only)
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="border-b border-gray-200 pb-6">
                        <h2 className="text-xl font-bold text-indigo-700 mb-4">About Me</h2>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                Bio/Description
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="3"
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={isSaving}
                                placeholder="Tell us a little about yourself..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                "Update Settings"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}