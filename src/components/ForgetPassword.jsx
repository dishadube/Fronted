// ForgetPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://vidya-vedas-backend.vercel.app/api/auth';

const EmailInputForm = ({ email, setEmail, isLoading, handleSendEmail }) => (
  <form onSubmit={handleSendEmail} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading || !email || !email.includes('@')}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        'Send Verification Code'
      )}
    </button>
    <div className="text-center">
      <Link to="/login">Back to login</Link>
    </div>
  </form>
);

const OtpInputForm = ({ otp, setOtp, isLoading, handleVerifyOtp, handleSendEmail, setStep, setMessage, email }) => (
  <form onSubmit={handleVerifyOtp} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
        One-Time Password (OTP)
      </label>
      <input
        type="text"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit code"
        required
        maxLength="6"
        className="w-full px-4 py-2 text-center border border-gray-300 rounded-lg tracking-widest text-lg font-bold focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading || otp.length !== 6}
    >
      {isLoading ? 'Verifying...' : 'Verify Code'}
    </button>

    <div className="flex justify-between text-sm">
      <button
        type="button"
        onClick={() => handleSendEmail()} // call without event
        disabled={isLoading || !email}
        className="text-blue-600 hover:text-blue-500 disabled:opacity-50"
      >
        Resend Code
      </button>
      <button
        type="button"
        onClick={() => { setStep('email'); setMessage(null); }}
        className="text-gray-500 hover:text-gray-700"
      >
        Change Email
      </button>
    </div>
  </form>
);

const ResetPasswordForm = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, isLoading, handleResetPassword }) => (
  <form onSubmit={handleResetPassword} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
        New Password (Min 10 chars)
      </label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
        minLength="10"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
        disabled={isLoading}
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirm New Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
        minLength="10"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
        disabled={isLoading}
      />
    </div>

    <button
      type="submit"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading || newPassword.length < 10 || newPassword !== confirmPassword}
    >
      {isLoading ? 'Resetting...' : 'Reset Password'}
    </button>
  </form>
);

const ForgetPassword = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMessageClasses = (type) => {
    if (type === 'success') {
      return 'bg-green-100 border-green-400 text-green-700';
    }
    if (type === 'error') {
      return 'bg-red-100 border-red-400 text-red-700';
    }
    return '';
  };

  // --- 1. SEND OTP Handler (works as form submit or direct call)
  const handleSendEmail = async (e) => {
    // Prevent default if called as form submit
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    setMessage(null);
    setIsLoading(true);

    // Basic client-side validation
    const trimmedEmail = (email || '').trim();
    if (!trimmedEmail) {
      setIsLoading(false);
      return setMessage({ type: 'error', text: 'Please enter an email address.' });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();
      console.log('sendOTP response:', data);

      if (response.ok) {
        setMessage({ type: 'success', text: data.msg || 'OTP sent! Check your inbox.' });
        setStep('otp'); // Move to OTP input
        setOtp(''); // clear any previous OTP value
      } else {
        setMessage({ type: 'error', text: data.msg || 'Error sending OTP. Please check your email.' });
      }
    } catch (error) {
      console.error('Error in sendOTP:', error);
      setMessage({ type: 'error', text: 'Network error. Could not connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. VERIFY OTP Handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.msg || 'OTP verified! Proceed to set new password.' });
        setStep('reset'); // Move to reset password
      } else {
        setMessage({ type: 'error', text: data.msg || 'Invalid or expired OTP. Please try again.' });
      }
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      setMessage({ type: 'error', text: 'Network error. Could not verify OTP.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. RESET PASSWORD Handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return setMessage({ type: 'error', text: 'Passwords do not match.' });
    }
    if (newPassword.length < 10) {
      setIsLoading(false);
      return setMessage({ type: 'error', text: 'Password must be at least 10 characters.' });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.msg || 'Password successfully reset! You can now log in.' });
        setTimeout(() => {
          setStep('email');
          setEmail('');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setMessage(null);
        }, 2500);
      } else {
        setMessage({ type: 'error', text: data.msg || 'Failed to reset password.' });
      }
    } catch (error) {
      console.error('Error in resetPassword:', error);
      setMessage({ type: 'error', text: 'Network error. Could not reset password.' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render logic
  const renderForm = () => {
    switch (step) {
      case 'email':
        return (
          <EmailInputForm
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            handleSendEmail={handleSendEmail}
          />
        );
      case 'otp':
        return (
          <OtpInputForm
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoading}
            handleVerifyOtp={handleVerifyOtp}
            handleSendEmail={handleSendEmail}
            setStep={setStep}
            setMessage={setMessage}
            email={email}
          />
        );
      case 'reset':
        return (
          <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={isLoading}
            handleResetPassword={handleResetPassword}
          />
        );
      default:
        return null;
    }
  };

  const getHeaderContent = () => {
    switch (step) {
      case 'email':
        return { title: 'Forgot Your Password?', subtitle: 'Enter your email address to receive a verification code.' };
      case 'otp':
        return { title: 'Enter Verification Code', subtitle: `Please enter the 6-digit code sent to ${email || '[your email]'}.` };
      case 'reset':
        return { title: 'Set New Password', subtitle: 'Choose a strong, new password for your account.' };
      default:
        return { title: 'Forgot Password?', subtitle: 'Start the recovery process.' };
    }
  };

  const header = getHeaderContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        {/* Header */}
        <header className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{header.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{header.subtitle}</p>
        </header>

        {/* Feedback */}
        {message && (
          <div className={`p-3 border rounded-md text-sm ${getMessageClasses(message.type)}`} role="alert">
            {message.text}
          </div>
        )}

        {/* Form */}
        {renderForm()}
      </div>
    </div>
  );
};

export default ForgetPassword;
