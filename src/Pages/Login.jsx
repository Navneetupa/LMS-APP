import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetPasswordData, setResetPasswordData] = useState({
    token: '',
    newPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

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
      await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/register', {
        ...registerData,
        role: 'student',
      });
      setRegisteredEmail(registerData.email);
      setShowOtpPopup(true);
      setErrorMessage('');
      alert('Registration successful! Please check your email for the OTP.');
    } catch (err) {
      setErrorMessage('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/verify-email', {
        email: registeredEmail,
        otp,
      });
      alert('Email verified successfully!');
      setIsLogin(true);
      setShowOtpPopup(false);
      setRegisterData({ firstName: '', lastName: '', email: '', phone: '', password: '' });
      setOtp('');
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('OTP verification failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/login', loginData);
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.data.token);
      setErrorMessage('');
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setErrorMessage('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/forgot-password', {
        email: forgotPasswordEmail,
      });
      console.log('Forgot password response:', res.data);
      setSuccessMessage('Email sent successfully');
      setErrorMessage('');
    } catch (err) {
      console.error('Forgot password error:', err.response?.data || err.message);
      setErrorMessage('Password reset request failed: ' + (err.response?.data?.message || err.message));
      setSuccessMessage('');
    }
  };
const handleResetPassword = async (e) => {
  e.preventDefault();

  // Validate token (must be non-empty and have JWT structure: three parts separated by dots)
  if (!resetPasswordData.token || resetPasswordData.token.split('.').length !== 3) {
    setErrorMessage('Please enter a valid JWT token (format: xxx.yyy.zzz)');
    return;
  }

  if (!resetPasswordData.newPassword || resetPasswordData.newPassword.length < 6) {
    setErrorMessage('New password must be at least 6 characters long');
    return;
  }

  try {
    // ✅ Primary endpoint with corrected 'password' field
    const res = await axios.put('https://lms-backend-flwq.onrender.com/api/v1/auth/reset-password', {
      email: forgotPasswordEmail,
      token: resetPasswordData.token,
      password: resetPasswordData.newPassword,
    });

    console.log('Reset password response:', res.data);

    if (res.data.success && res.data.message === 'Password updated successfully') {
      setSuccessMessage('Password updated successfully! You can now log in with your new password.');
      setErrorMessage('');
      setShowResetPasswordPopup(false);
      setResetPasswordData({ token: '', newPassword: '' });
      setForgotPasswordEmail('');
      setIsLogin(true);
    } else {
      setErrorMessage('Unexpected response from server. Please try again.');
      setSuccessMessage('');
    }

  } catch (err) {
    console.error('Reset password error:', err.response?.data || err.message);

    // Try fallback endpoint with token in query
    if (err.response?.status === 404) {
      try {
        const fallbackRes = await axios.put(
          `https://lms-backend-flwq.onrender.com/reset-password?token=${encodeURIComponent(resetPasswordData.token)}`,
          {
            email: forgotPasswordEmail,
            password: resetPasswordData.newPassword,
          }
        );

        console.log('Fallback reset password response:', fallbackRes.data);

        if (fallbackRes.data.success && fallbackRes.data.message === 'Password updated successfully') {
          setSuccessMessage('Password updated successfully! You can now log in with your new password.');
          setErrorMessage('');
          setShowResetPasswordPopup(false);
          setResetPasswordData({ token: '', newPassword: '' });
          setForgotPasswordEmail('');
          setIsLogin(true);
        } else {
          setErrorMessage('Unexpected response from fallback endpoint. Please try again.');
          setSuccessMessage('');
        }

      } catch (fallbackErr) {
        console.error('Fallback reset password error:', fallbackErr.response?.data || fallbackErr.message);
        setErrorMessage('Password reset endpoint not found. Please check the API URL or contact support.');
        setSuccessMessage('');
      }

    } else {
      setErrorMessage('Password reset failed: ' + (err.response?.data?.message || err.message));
      setSuccessMessage('');
    }
  }
};

  const handleResendToken = async () => {
    try {
      const res = await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/forgot-password', {
        email: forgotPasswordEmail,
      });
      console.log('Resend token response:', res.data);
      setSuccessMessage('Email sent successfully');
      setErrorMessage('');
      setShowResetPasswordPopup(false);
      setShowForgotPasswordPopup(true);
    } catch (err) {
      console.error('Resend token error:', err.response?.data || err.message);
      setErrorMessage('Failed to resend token: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div
        className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center rounded-r-3xl text-white flex-col justify-center p-10"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2018/09/10/12/19/school-3666924_1280.jpg')",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Empower your learning journey</h1>
        <p className="text-lg">Unlock new skills, anytime, anywhere</p>
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back to LMS!</h2>

        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
        {successMessage && !showForgotPasswordPopup && !showResetPasswordPopup && (
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
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-teal-500 rounded-md"
                  required
                />
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
              {['firstName', 'lastName', 'email', 'phone', 'password'].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={registerData[field]}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-teal-500 rounded-md"
                    required
                  />
                </div>
              ))}
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
                  OK
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Reset Your Password</h3>
                <p className="mb-4 text-gray-600">Enter your email to receive a password reset token</p>
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
              Enter the JWT token from the email sent to <strong>{forgotPasswordEmail}</strong> (e.g., copy from the reset link) and your new password
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
                  placeholder="Enter JWT token (e.g., eyJhbGci...)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={resetPasswordData.newPassword}
                  onChange={handleResetPasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter new password (min 6 characters)"
                  required
                />
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
              {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Verify and Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResetPasswordPopup(false);
                    setResetPasswordData({ token: '', newPassword: '' });
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
    </div>
  );
};

export default AuthComponent;