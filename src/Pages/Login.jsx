import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import image from '../assets/signup.png';

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
  const [showResetPassword, setShowResetPassword] = useState(false);

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
      setShowResetPasswordPopup(true);
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

  const handleResendToken = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {
        email: forgotPasswordEmail,
      });
      setSuccessMessage(res.data.message || 'Password reset email sent. Please check your inbox.');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to resend reset email. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div
        className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center rounded-r-2xl text-white flex-col justify-center p-10"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Empower your learning journey</h1>
        <p className="text-lg">Unlock new skills, anytime, anywhere</p>
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back to LMS!</h2>

        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
        {successMessage && !showForgotPasswordPopup && !showResetPasswordPopup && !showSuccessPopup && (
          <div className="text-center">
            <p className="text-green-500 mb-4">{successMessage}</p>
            <button
              onClick={() => {
                setSuccessMessage('');
                setIsLogin(true);
              }}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="flex mb-6">
          <button
            className={`px-6 py-2 text-white rounded-l-md ${isLogin ? 'bg-teal-500' : 'bg-teal-300'}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            className={`px-6 py-2 text-white rounded-r-md ${!isLogin ? 'bg-teal-500' : 'bg-teal-300'}`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        <div className="w-full max-w-sm">
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-teal-500 rounded-md"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-teal-500 rounded-md pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-12 text-gray-600 hover:text-gray-800"
                >
                  {showLoginPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-center mb-5">
                <button
                  type="submit"
                  className="py-3 px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600"
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
                  className="text-teal-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <a
                href="https://adminn-lms.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600"
              >
                Login as Admin
              </a>
              <a
                href="https://lmsinstructor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600 mt-1"
              >
                Login as Instructor
              </a>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              {['firstName', 'lastName', 'email', 'phone'].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    value={registerData[field]}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-teal-500 rounded-md"
                    required
                  />
                </div>
              ))}
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2 capitalize">Password</label>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full p-3 border border-teal-500 rounded-md pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute right-3 top-11 text-gray-600 hover:text-gray-800"
                >
                  {showRegisterPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Verify Your Email</h3>
            <p className="mb-4 text-gray-600">Enter the OTP sent to <strong>{registeredEmail}</strong></p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
            />
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleVerifyOtp}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Verify
              </button>
              <button
                onClick={() => {
                  setShowOtpPopup(false);
                  setErrorMessage('');
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showForgotPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            {successMessage ? (
              <>
                <p className="text-green-500 mb-4">{successMessage}</p>
                <button
                  onClick={() => {
                    setShowForgotPasswordPopup(false);
                    setShowResetPasswordPopup(true);
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Proceed to Reset Password
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Reset Your Password</h3>
                <p className="mb-4 text-gray-600">Enter your email to receive a password reset link</p>
                <form onSubmit={handleForgotPassword}>
                  <input
                    type="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                  {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                  <div className="flex justify-center gap-4">
                    <button
                      type="submit"
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
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
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {showResetPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Set New Password</h3>
            <p className="mb-4 text-gray-600">
              Enter the token from the reset email and your new password
            </p>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Reset Token</label>
                <input
                  type="text"
                  name="token"
                  value={resetPasswordData.token}
                  onChange={handleResetPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter token from email"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type={showResetPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={handleResetPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10"
                  placeholder="Enter new password (min 8 characters)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="absolute right-3 top-11 text-gray-600 hover:text-gray-800"
                >
                  {showResetPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type={showResetPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={resetPasswordData.confirmPassword}
                  onChange={handleResetPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="absolute right-3 top-11 text-gray-600 hover:text-gray-800"
                >
                  {showResetPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 mb-4">
                  {errorMessage}
                  {errorMessage.includes('token') && (
                    <span>
                      {' '}
                      <button
                        type="button"
                        onClick={handleResendToken}
                        className="text-teal-600 hover:underline"
                      >
                        Resend token
                      </button>
                    </span>
                  )}
                </p>
              )}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResetPasswordPopup(false);
                    setResetPasswordData({ token: '', newPassword: '', confirmPassword: '' });
                    setForgotPasswordEmail('');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Success</h3>
            <p className="text-green-500 mb-4">Password updated successfully! You can now log in with your new password.</p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setIsLogin(true);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;