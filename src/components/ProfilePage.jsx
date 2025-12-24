import React, { useContext } from "react";
import { UserContext } from "../Context/userContext";


export default function ProfilePage() {
 
  const { formData } = useContext(UserContext);
  const containerClasses = "min-h-screen flex items-start justify-center p-4 bg-gray-50";
  
  
  const cardClasses = "w-full max-w-lg bg-white shadow-xl rounded-xl p-6 md:p-8 mt-10 space-y-4";
  

  const titleClasses = "text-3xl font-extrabold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4";
  const detailClasses = "text-lg text-gray-700 flex flex-col md:flex-row md:items-center";
  const labelClasses = "font-bold text-gray-900 w-full md:w-1/4 mr-2 mb-1 md:mb-0";
  const valueClasses = "font-medium text-gray-600 truncate overflow-hidden";
  

  const signInMessageClasses = "text-xl font-semibold text-red-600 p-6 bg-red-50 rounded-lg shadow-md";

  if (!formData?.email) {
    return (
      <div className={containerClasses}>
        <div className={cardClasses.replace('mt-10 space-y-4', 'mt-10')}>
          <h1 className={signInMessageClasses}>
            Please sign in to check your profile.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <h1 className={titleClasses}>User Profile</h1>
        <div className={detailClasses}>
          <strong className={labelClasses}>Email:</strong>
          <span className={valueClasses} title={formData.email}>
            {formData.email}
          </span>
        </div>
      </div>
    </div>
  );
}
