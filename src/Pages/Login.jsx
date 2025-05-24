import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import image from '../assets/monst.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://lms-backend-flwq.onrender.com/api/v1';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showResetLinkSentPopup, setShowResetLinkSentPopup] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPasswordData, setResetPasswordData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract token from URL query parameters on component mount
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setResetPasswordData((prev) => ({ ...prev, token }));
      setShowResetPasswordPopup(true);
    }
  }, [searchParams]);

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleResetPasswordChange = (e) => {
    setResetPasswordData({ ...resetPasswordData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        ...registerData,
        role: 'student',
      });
      setRegisteredEmail(registerData.email);
      setShowOtpPopup(true);
      setErrorMessage('');
      setSuccessMessage('Registration successful! Please check your email for the OTP.');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/verify-email`, {
        email: registeredEmail,
        otp,
      });
      setSuccessMessage('Email verified successfully!');
      setIsLogin(true);
      setShowOtpPopup(false);
      setRegisterData({ firstName: '', lastName: '', email: '', phone: '', password: '' });
      setOtp('');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      localStorage.setItem('token', res.data.data.token);
      setErrorMessage('');
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail.match(/^\S+@\S+\.\S+$/)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email: forgotPasswordEmail,
      });
      setSuccessMessage(res.data.message || 'Password reset email sent. Please check your inbox.');
      setErrorMessage('');
      setShowForgotPasswordPopup(false);
      setShowResetLinkSentPopup(true);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to send reset email. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!resetPasswordData.token || resetPasswordData.token.split('.').length !== 3) {
      setErrorMessage('Please enter a valid JWT token (format: xxx.yyy.zzz).');
      return;
    }
    if (resetPasswordData.newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/auth/reset-password`, {
        token: resetPasswordData.token,
        password: resetPasswordData.newPassword,
      });
      setShowSuccessPopup(true);
      setShowResetPasswordPopup(false);
      setResetPasswordData({ token: '', newPassword: '', confirmPassword: '' });
      setForgotPasswordEmail('');
      setErrorMessage('');
      setSuccessMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Password reset failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen font-sans">
      {/* Image Section */}
      <div
        className="hidden sm:flex sm:w-1/2 bg-cover bg-center rounded-r-2xl text-white flex-col justify-center p-6 sm:p-10 md:p-8 lg:p-10"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Empower your learning journey</h1>
        <p className="text-base sm:text-lg">Unlock new skills, anytime, anywhere</p>
      </div>

      {/* Form Section */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">Welcome back to LMS!</h2>

        {errorMessage && <p className="text-red-500 mb-4 text-center text-sm sm:text-base">{errorMessage}</p>}
        {successMessage && !showForgotPasswordPopup && !showResetPasswordPopup && !showSuccessPopup && !showResetLinkSentPopup && (
          <div className="text-center">
            <p className="text-green-500 mb-4 text-sm sm:text-base">{successMessage}</p>
            <button
              onClick={() => {
                setSuccessMessage('');
                setIsLogin(true);
              }}
              className="bg-teal-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-teal-600 text-sm sm:text-base"
            >
              Back to Login
            </button>
          </div>
        )}

        {/* Login/Register Toggle */}
        <div className="flex mb-4 sm:mb-6">
          <button
            className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-l-md ${isLogin ? 'bg-teal-500' : 'bg-teal-300'} text-sm sm:text-base`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-r-md ${!isLogin ? 'bg-teal-500' : 'bg-teal-300'} text-sm sm:text-base`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-xs sm:max-w-sm">
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3 sm:mb-4">
                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
                  required
                />
              </div>
              <div className="mb-3 sm:mb-4 relative">
                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-2 sm:p-3 border border-teal-500 rounded-md pr-8 sm:pr-10 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-2 sm:right-3 top-9 sm:top-11 text-gray-600 hover:text-gray-800"
                >
                  {showLoginPassword ? (
                    <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-between items-center mb-4 sm:mb-5">
                <button
                  type="submit"
                  className="py-2 px-4 sm:py-3 sm:px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm sm:text-base"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordPopup(true);
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-teal-600 hover:underline text-sm sm:text-base"
                >
                  Forgot Password?
                </button>
              </div>
              <a
                href="https://adminn-lms.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600 text-sm sm:text-base"
              >
                Login as Admin
              </a>
              <a
                href="https://lmsinstructor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600 mt-1 text-sm sm:text-base"
              >
                Login as Instructor
              </a>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              {['firstName', 'lastName', 'email', 'phone'].map((field, idx) => (
                <div className="mb-3 sm:mb-4" key={idx}>
                  <label className="block text-gray-700 mb-1 sm:mb-2 capitalize text-sm sm:text-base">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={registerData[field]}
                    onChange={handleRegisterChange}
                    className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
                    required
                  />
                </div>
              ))}
              <div className="mb-3 sm:mb-4 relative">
                <label className="block text-gray-700 mb-1 sm:mb-2 capitalize text-sm sm:text-base">Password</label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-2 sm:p-3 border border-teal-500 rounded-md pr-8 sm:pr-10 text-sm sm:text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute right-2 sm:right-3 top-8 sm:top-11 text-gray-600 hover:text-gray-800"
                >
                  {showRegisterPassword ? (
                    <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm sm:text-base"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-xs sm:max-w-sm text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Verify Your Email</h3>
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
              Enter the OTP sent to <strong>{registeredEmail}</strong>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-3 sm:mb-4 p-2 border border-gray-300 rounded-md text-sm sm:text-base"
              placeholder="Enter OTP"
            />
            {errorMessage && <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{errorMessage}</p>}
            <div className="flex justify-center gap-3 sm:gap-4">
              <button
                onClick={handleVerifyOtp}
                className="bg-teal-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-teal-600 text-sm sm:text-base"
              >
                Verify
              </button>
              <button
                onClick={() => {
                  setShowOtpPopup(false);
                  setErrorMessage('');
                }}
                className="bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 rounded hover:bg-gray-400 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-xs sm:max-w-sm text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Reset Your Password</h3>
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
              Enter your email to receive a password reset link
            </p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="w-full mb-3 sm:mb-4 p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
              {errorMessage && <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{errorMessage}</p>}
              <div className="flex justify-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-teal-600 text-sm sm:text-base"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPasswordPopup(false);
                    setForgotPasswordEmail('');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 rounded hover:bg-gray-400 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Link Sent Popup */}
      {showResetLinkSentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-xs sm:max-w-sm text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Reset Link Sent</h3>
            <p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
              OTP verification link has been sent to <strong>{forgotPasswordEmail}</strong>. Please check your inbox.
            </p>
            <button
              onClick={() => {
                setShowResetLinkSentPopup(false);
                setIsLogin(true);
                setForgotPasswordEmail('');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="bg-teal-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-teal-600 text-sm sm:text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;