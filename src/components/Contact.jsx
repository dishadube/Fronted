import React, { useState } from 'react' 

const Contact = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    message: '',
  });

  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { name, email, phone_no, message } = formData;

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    if (!name || !email || !message) {
        setError("Name, Email, and Message fields are required.");
        setIsSubmitting(false);
        return;
    }

    try {
      const res = await fetch("https://vidya-vedas-backend.vercel.app/api/contact/newContact", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Something went wrong. Please try again.');
        return; 
      }
      setSuccess(true);
      setError(null);
      setFormData({
        name: '',
        email: '',
        phone_no: '',
        message: '',
      });

    } catch (err) {
     
      console.error(' Frontend error:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
        setIsSubmitting(false);
    }
  };
  
  React.useEffect(() => {
    let timer;
    if (success) {
        timer = setTimeout(() => setSuccess(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [success]);


  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 border-b-2 pb-2 border-blue-500">
          Get in Touch
        </h2>   
        {error && (
          <div className="text-red-700 text-center mb-4 p-3 bg-red-100 border border-red-300 rounded-lg animate-fadeIn">{error}</div>
        )} 
        {success && (
            <div className="text-green-700 text-center mb-4 p-3 bg-green-100 border border-green-300 rounded-lg shadow-md animate-slideDown">
                Message sent successfully! We'll be in touch soon.
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-shadow"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email Address"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-shadow"
            required
          />
          <input
            type="tel"
            name="phone_no"
            value={phone_no}
            placeholder="Phone Number (Optional)"
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-shadow"
          />
          <textarea
            name="message"
            value={message}
            placeholder="What can we help you with?"
            onChange={handleChange}
            rows="5"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-shadow resize-none"
            required
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-[1.01]"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      </div>
      <style>{`
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
            animation: slideDown 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Contact
